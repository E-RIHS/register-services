<script setup>

const cordraBaseUrl = import.meta.env.VITE_CORDRA_BASE_URL

import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
import { useToast} from 'primevue/usetoast'
import Toast from 'primevue/toast'

import { useAuthStore } from '@/stores/AuthStore'


// status messages
const toast = useToast()

// define component props
const props = defineProps({
    type: String,
    columns: Array,
    searchMode: Boolean
})

// get "my" objects from cordra
const objects = reactive([])

const getObjects = (query, token) => {
    console.log("GET: " + query)
    const url = `${cordraBaseUrl}/objects?query=${query}`
    axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => {
            objects.push(...response.data.results)
        })
        .catch(error => {
            if (error.response.status === 401) {    // 401 Unauthorized: token expired!
                console.error("Cordra API returned 401 - Unauthorized; token may be expired?")
                toast.add({ 
                    severity: 'warn', 
                    summary: 'Connection error.', 
                    detail: 'Your session has expired. Please log in again.',
                    life: 3000 
                })
                // clear token
                auth.$patch({ 
                    accessToken: null,
                    userId: null,
                    username: null,
                    groupIds: null
                })
            } else {
                console.error("Cordra API returned " + error.response.status + " - " + error.response.data.message)
                toast.add({ 
                    severity: 'error', 
                    summary: 'Connection error.', 
                    detail: 'Failed to fetch data. (' + error.response.status + '-' + error.response.data.message + ')',
                    life: 3000 
                })
            }
        })
}

// subscribe to auth store to get userId and accessToken
const auth = useAuthStore()
const keywords = ref(null)
const query = ref(null)

const search = () => {
    objects.splice(0)
    // two types of queries: search and my objects
    if (!props.searchMode) {
        const q = `type:"${props.type}" AND (metadata/createdBy:"${auth.userId}" OR acl/writers/_:"${auth.userId}")`
        query.value = q
        getObjects(q, auth.accessToken)
    } else if (keywords.value) {
        // split keywords by space
        keywords.value = keywords.value.trim()
        keywords.value = keywords.value.replace(/,|;/g, ' ') // replace commas and semicolons with space
        keywords.value = keywords.value.replace(/\s+/g, ' ') // replace multiple spaces with single space
        let words = keywords.value.split(' ')
        // append * to each word
        words = words.map(word => `"${word}*"`)
        // join words with AND
        const q = `type:"${props.type}" AND ${words.join(' AND ')}`
        query.value = q
        getObjects(q, auth.accessToken)
    } else {
        query.value = null
    }
}

onMounted(() => {
    // set interval to check if the tab has regained focus
    let trigger = true      // boolean to trigger a refresh
    setInterval(() => {
        if (document.hasFocus()) {
            if (trigger) {
                trigger = false
                search()
            }
        } else {
            trigger = true
        }
    }, 500)
})

</script>

<template>
    <div v-if="props.searchMode" >
        <p class="mb-4 mt-2">
            Search for one or more keywords in the descriptions. The search is case-insensitive and
            searches for exact matches. A keyword can be the (first) part of a word. If you supply multiple keywords,
            all of them must be present in the description.
        </p>
        <p class="mb-4">
            You do not necessarily have write-access to the descriptions.
        </p>
        <div class="flex flex-row">
            <div class="xl:basis-1/4 md:basis-1/2 basis-full my-4">
                <InputGroup>
                    <InputText v-model="keywords" placeholder="Keywords (space separated)" />
                    <Button icon="pi pi-search" @click="search" />
                </InputGroup>
            </div>
        </div>
    </div>

    <DataTable :value="objects" tableStyle="min-width: 25rem" stripedRows class="pb-2">
        <Column field="id" header="Handle">
            <template #body="{ data }">
                <a :href="`${cordraBaseUrl}/#objects/${data.id}`" target="_blank">
                    <span class="pi pi-external-link" style="color: 'rgb(var(--primary-500))'" />
                    {{ data.id }}
                </a>
            </template>
        </Column>
        <Column v-for="c in props.columns" :key="c.field" :field="c.field" :header="c.header" />
    </DataTable>

    <p>
        <a href="#" @click="search" class="mr-4 text-xs">
            <span class="pi pi-refresh" />
            Refresh
        </a>
        <a 
            v-if="query"
            :href="`${cordraBaseUrl}/#objects/?query=${query}`" 
            target="_blank" 
            class="mr-4 text-xs"
        >
            <span class="pi pi-external-link" />
            Show this query directly in {{cordraBaseUrl}}
        </a>
    </p>

</template>
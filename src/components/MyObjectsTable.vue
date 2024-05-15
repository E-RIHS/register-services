<script setup>

const cordraBaseUrl = import.meta.env.VITE_CORDRA_BASE_URL

import axios from 'axios'
import { ref, reactive } from 'vue'

import { useAuthStore } from '@/stores/AuthStore'
import { useMessageStore } from '@/stores/MessageStore'


// define component props
const props = defineProps({
    type: String,
    columns: Array
})

// get "my" objects from cordra
const query = ref(null)
const myObjects = reactive([])

const getMyObjects = (query, token) => {
    console.log("GET: " + query)
    const url = `${cordraBaseUrl}/objects?query=${query}`
    axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => {
            myObjects.push(...response.data.results)
        })
        .catch(error => {
            if (error.response.status === 401) {    // 401 Unauthorized: token expired!
                console.error("Cordra API returned 401 - Unauthorized; token may be expired?")
                messages.list.push({
                    id: Math.floor(Math.random() * 4294967296),
                    severity: 'warn',
                    detail: 'Your session has expired. Please log in again.'
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
                messages.list.push({
                    severity: 'error',
                    detail: 'Failed to fetch data. (' + error.response.status + '-' + error.response.data.message + ')'
                })
            }
        })
}

// subscribe to auth store to get userId and accessToken
// fetch organisations when these values are set
const auth = useAuthStore()
auth.$subscribe((mutation, state) => {
    if (state.accessToken && state.userId) {
        query.value = `type:"${props.type}" AND (metadata/createdBy:"${state.userId}" OR acl/writers/_:"${state.userId}")`
        getMyObjects(query.value, state.accessToken)
    } else {
        query.value = null
        myObjects.splice(0)
    }
})

const refresh = () => {
    // clear existing data
    myObjects.splice(0)
    // re-run query
    query.value = `type:"${props.type}" AND (metadata/createdBy:"${auth.userId}" OR acl/writers/_:"${auth.userId}")`
    getMyObjects(query.value, auth.accessToken)
}

onMounted(() => {
    // set interval to check if the tab has regained focus
    let trigger = true      // boolean to trigger a refresh
    setInterval(() => {
        if (document.hasFocus()) {
            if (trigger) {
                trigger = false
                refresh()
            } else {
                trigger = true
            }
        }
    }, 3000)
})

// define message store
// which will allow to create messages if something goes wrong during the api request
const messages = useMessageStore()

</script>

<template>
    <DataTable 
        :value="myObjects" 
        tableStyle="min-width: 25rem" 
        stripedRows 
        class="pb-2"
    >
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

    <a href="#" @click="refresh" class="mr-4 text-xs">
        <span class="pi pi-refresh" />
        Refresh
    </a>
    <a :href="`${cordraBaseUrl}/#objects/?query=${query}`" target="_blank" class="mr-4 text-xs">
        <span class="pi pi-external-link" />
        Show this query directly in {{cordraBaseUrl}}
    </a>

    <div
        v-if="query" 
        class="pb-6 pl-4 "
    >

    </div>
</template>
<script setup>

const CORDRA_BASE_URL = "https://data.e-rihs.io"

import axios from 'axios'
import { ref, reactive } from 'vue'
import 'primeicons/primeicons.css'

import { useAuthStore } from '@/stores/AuthStore'


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
    const url = `${CORDRA_BASE_URL}/objects?query=${query}`
    axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => {
            myObjects.push(...response.data.results)
        })
        .catch(error => {
            console.error(error)
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
    query.value = `type:"${props.type}" AND (metadata/createdBy:"${auth.userId}" OR acl/writers/_:"${auth.userId}")`
    getMyObjects(query.value, auth.accessToken)
}

refresh()

</script>

<template>
    <DataTable :value="myObjects" tableStyle="min-width: 25rem" stripedRows class="pb-2">
        <Column field="id" header="Handle">
            <template #body="{ data }">
                <a :href="`${CORDRA_BASE_URL}/#objects/${data.id}`" target="_blank">
                    <span class="pi pi-external-link" style="color: 'rgb(var(--primary-500))'" />
                    {{ data.id }}
                </a>
            </template>
        </Column>
        <Column v-for="c in props.columns" :key="c.field" :field="c.field" :header="c.header" />
    </DataTable>

    <a href="#" @click="refresh" class="mr-4 text-xs">
        <span class="pi pi-refresh" />
        Re-run query
    </a>
    <a :href="`${CORDRA_BASE_URL}/#objects/?query=${query}`" target="_blank" class="mr-4 text-xs">
        <span class="pi pi-external-link" />
        Show this query directly in {{CORDRA_BASE_URL}}
    </a>

    <div
        v-if="query" 
        class="pb-6 pl-4 "
    >

    </div>
</template>
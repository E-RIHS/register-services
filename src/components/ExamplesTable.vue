<script setup>

const cordraBaseUrl = import.meta.env.VITE_CORDRA_BASE_URL
const githubBaseUrl = import.meta.env.VITE_GITHUB_EXAMPLES_BASE_URL

import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
import { useToast} from 'primevue/usetoast'


// status messages
const toast = useToast()

// define component props
const props = defineProps({
    type: String,
})

// get examples from github
const objects = reactive([])

const getObjects = () => {
    console.log("GET: " + query)
    const type = props.type.toLowerCase()
    const url = `${githubBaseUrl}/${type}`
    axios.get(url)
        .then(response => {
            console.log(response.data)
            objects.push(...response.data)
        })
        .catch(error => {
            console.error("GitHub returned " + error.response.status + " - " + error.response.data.message)
            toast.add({ 
                severity: 'error', 
                summary: 'Connection error.', 
                detail: 'Failed to fetch data. (' + error.response.status + '-' + error.response.data.message + ')',
                life: 3000 
            })
        })
}

onMounted(() => {
    getObjects()
})

</script>

<template>
    
    <DataTable :value="objects" tableStyle="min-width: 25rem" stripedRows class="pb-2">
        <Column field="id" header="Handle">
            <template #body="{ data }">
                <a :href="`${cordraBaseUrl}/#objects/${data.id}`" target="_blank">
                    <span class="pi pi-external-link" style="color: 'rgb(var(--primary-500))'" />
                    {{ data.id }}
                </a>
            </template>
        </Column>
        <Column field="name" header="Name" />
        <Column field="description" header="Description" />
    </DataTable>

    <p>
        <a href="#" @click="search" class="mr-4 text-xs">
            <span class="pi pi-refresh" />
            Refresh
        </a>
    </p>

</template>
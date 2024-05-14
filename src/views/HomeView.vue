<script setup>

const CORDRA_BASE_URL = "https://data.e-rihs.io"

import axios from 'axios'
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'


// get "my" organisations from cordra
const myOrgs = reactive([])

const getMyOrgs = (token, userId) => {
    console.log("fetching organisations for user: " + userId)
    // get organisations created by the user; add bearer token to headers
    const query = `type:organisation AND (metadata/createdBy:"${userId}" OR acl/writers/_:"${userId}")`
    const url = `${CORDRA_BASE_URL}/objects?query=${query}`
    axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => {
            myOrgs.push(... response.data.results)
        })
        .catch(error => {
            console.error(error)
        })
}

// subscribe to auth store to get userId and accessToken
// fetch organisations when these values are set
const auth = useAuthStore()
auth.$subscribe((mutation, state) => {
    console.log("auth state changed: " + state.userId + " " + state.accessToken)
    if (state.accessToken && state.userId) {
        getMyOrgs(state.accessToken, state.userId)
    } else {
        myOrgs.splice(0)
    }
})


</script>

<template>
    <main class="container m-4 xl:mx-64">

        <h3 
            class="py-6 text-xl font-bold">
            My organisations
        </h3>

        <DataTable 
            :value="myOrgs" 
            tableStyle="min-width: 25rem" 
            stripedRows
            class="pb-6"
        >
            <Column 
                field="id" 
                header="Handle"
            >
                <template #body="{ data }">
                    <a 
                        :href="`${CORDRA_BASE_URL}/#objects/${data.id}`" 
                        target="_blank"
                    >
                        {{ data.id }}
                    </a>
                </template>
            </Column>
            <Column 
                field="content.display_name" 
                header="Name"
            ></Column>
        </DataTable>

        <Button 
            :href="`${CORDRA_BASE_URL}/#create/Organisation`" 
            target="_blank"
        >
            Create new organisation
        </Button>

    </main>
</template>

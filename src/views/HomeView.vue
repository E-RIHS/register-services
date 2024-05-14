<script setup>

const CORDRA_BASE_URL = "https://data.e-rihs.io"

import axios from 'axios'
import { ref, reactive } from 'vue'

// if logged in, get user id and access token from sessionStorage
// TODO: find a better way to pass these values between components
const userId = ref(null)
const accessToken = ref(null)

const storedAuth = sessionStorage.getItem("auth")
if (storedAuth) {
    const storedAuthObj = JSON.parse(storedAuth)
    userId.value = storedAuthObj.userId
    accessToken.value = storedAuthObj.accessToken
}

// get "my" organisations from cordra
const myOrgs = reactive([])

const getMyOrgs = () => {
    // get organisations created by the user; add bearer token to headers
    const query = `type:organisation AND (metadata/createdBy:"${userId.value}" OR acl/readers/_:"${userId.value}" OR acl/writers/_:"${userId.value}")`
    const url = `${CORDRA_BASE_URL}/objects?query=${query}`
    axios.get(url, {
        headers: {
            "Authorization": `Bearer ${accessToken.value}`
        }
    })
        .then(response => {
            myOrgs.push(... response.data.results)
        })
        .catch(error => {
            console.error(error)
        })
}

if (userId.value && accessToken.value) {
    getMyOrgs()
}

</script>

<template>
    <main>
    <div class="md:container md:mx-auto">
        <h3>My organisations</h3>
        <DataTable :value="myOrgs" tableStyle="min-width: 50rem" stripedRows>
            <Column field="id" header="Handle">
                <template #body="{ data }">
                    <a :href="`${CORDRA_BASE_URL}/#objects/${data.id}`" target="_blank">{{ data.id }}</a>
                </template>
            </Column>
            <Column field="content.display_name" header="Name"></Column>
        </DataTable>
        <Button :href="`${CORDRA_BASE_URL}/#create/Organisation`" target="_blank">Create new organisation</Button>
    </div>

    </main>
</template>

<script setup>

import axios from "axios"
//import { reactive } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'

const OAUTH2_AUTHORIZATION_URL = "https://orcid.org/oauth/authorize"
const OAUTH2_CLIENT_ID = "APP-EM6F9ZHFG0CVCENH"
const OAUTH2_REDIRECT_URL = "https://test.e-rihs.io:5173"

const CORDRA_AUTH_TOKEN = "https://data.e-rihs.io/auth/token"
const CORDRA_AUTH_REVOKE = "https://data.e-rihs.io/auth/revoke"


const openOrcidAuth = () => {
    const url = OAUTH2_AUTHORIZATION_URL
        + "?client_id=" + OAUTH2_CLIENT_ID
        + "&redirect_uri=" + OAUTH2_REDIRECT_URL
        + "&response_type=id_token"         // implicit flow
        + "&scope=openid"
        + "&nonce=123456"          // todo: generate and verify random nonces
    window.open(url, "_self")
}

const getOrcidToken = () => {
    console.log("getting ORCID idToken from hash")
    let idToken = null
    if (window.location.hash) {
        let hash = window.location.hash.substring(1)
        // get "id_token" from hash
        hash = hash.replace("#", "")
        const hashParts = hash.split("&")
        hashParts.forEach(part => {
            const keyValue = part.split("=")
            if (keyValue[0] === "id_token") {
                idToken = keyValue[1]
            }
        })
        console.log("idToken: " + idToken)
    }
    return idToken
}

const requestCordraAccessToken = (idToken) => {
    console.log("requesting Cordra access token")
    // build POST request (https://www.cordra.org/documentation/api/rest-api.html#create-a-new-access-token)
    const data = {
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": idToken
    }
    // get access token from Cordra using POST request (Axios) with the ORCID idToken
    axios.post(CORDRA_AUTH_TOKEN, data)
        .then(response => {
            auth.$patch({
                accessToken: response.data.access_token,
                userId: response.data.userId,
                username: response.data.username,
                groupIds: response.data.groupIds
            })
            console.log("access token: " + auth.accessToken)
        })
        .catch(error => {
            console.error(error)
        })
}

const logout = () => {
    // remove auth from store
    auth.$patch({
                accessToken: null,
                userId: null,
                username: null,
                groupIds: null
            })
    // revoke access token
    axios.post(CORDRA_AUTH_REVOKE, { "token": auth.accessToken })
        .then(response => {
            console.log("Access token revoked")
        })
        .catch(error => {
            console.error(error)
        })
}

// use pinia store to store token, userId, username, groupIds
const auth = useAuthStore()
console.log("stored token: " + auth.accessToken)

if (auth.accessToken === null && window.location.hash) {
    let idToken = getOrcidToken()
    if (idToken) {
        requestCordraAccessToken(idToken)
    }
}

// remove hash from url, if any
window.history.pushState("", document.title, window.location.pathname + window.location.search)


</script>

<template>
    <Button v-if="!auth.accessToken" @click="openOrcidAuth" label="Log in with ORCID id" raised></Button>

    <div v-else>
        {{ auth.username }}
        <Button @click="logout">Logout</Button>
    </div>

</template>

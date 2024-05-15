<script setup>

import axios from "axios"
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useMessageStore } from '@/stores/MessageStore'

const oauth2AuthorizationUrl = import.meta.env.VITE_OAUTH2_AUTHORIZATION_URL
const oauth2ClientId = import.meta.env.VITE_OAUTH2_CLIENT_ID
//const oauth2RedirectUrl = import.meta.env.VITE_OAUTH2_REDIRECT_URL // use window.location.href

const cordraAuthTokenUrl = import.meta.env.VITE_CORDRA_AUTH_TOKEN_URL
const cordraAuthRevokeUrl = import.meta.env.VITE_CORDRA_AUTH_REVOKE_URL

const openOrcidAuth = () => {
    const url = oauth2AuthorizationUrl
        + "?client_id=" + oauth2ClientId
        + "&redirect_uri=" + window.location.href.split('#')[0]
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
        //console.log("idToken: " + idToken)
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
    axios.post(cordraAuthTokenUrl, data)
        .then(response => {
            auth.$patch({
                accessToken: response.data.access_token,
                userId: response.data.userId,
                username: response.data.username,
                groupIds: response.data.groupIds
            })
            //console.log("access token: " + auth.accessToken)
        })
        .catch(error => {
            if (error.response.status === 500) {        // 500 Internal Server Error is returned if the ORCID idToken is invalid
                console.error("Cordra API returned 500 - Internal Server Error; login failed")
                messages.list.push({
                    id: Math.floor(Math.random() * 4294967296),
                    severity: 'error',
                    detail: 'Failed to verify your ORCID iD! Has your ORCID iD been registered in the Knowledge base (see step 2)?'
                })
            } else {
                console.error("Cordra API returned " + error.response.status + " - " + error.response.data.message)
                messages.list.push({
                    severity: 'error',
                    detail: 'Log in failed! (' + error.response.status + '-' + error.response.data.message + ')'
                })
            }
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
    axios.post(cordraAuthRevokeUrl, { "token": auth.accessToken })
        .then(response => {
            console.log("Access token revoked")
        })
        .catch(error => {
            //console.error(error)  // TODO: cordra always returns an error - wrong API request?
        })
    // display message
    messages.list.push({
        id: Math.floor(Math.random() * 4294967296),
        severity: 'info',
        detail: 'You have been logged out.'
    })
}

// use pinia store to store token, userId, username, groupIds
const auth = useAuthStore()

onMounted(() => {
    if (window.location.hash) {
        let idToken = getOrcidToken()
        if (idToken) {
            requestCordraAccessToken(idToken)
        }
    }

    // remove hash from url, if any
    window.history.pushState("", document.title, window.location.href.split('#')[0])
})

// define message store
// which will allow to create messages if something goes wrong during the authentication process
const messages = useMessageStore()

</script>

<template>
    <Button v-if="!auth.accessToken" @click="openOrcidAuth" label="Log in with ORCID id" raised></Button>

    <div v-else>
        <span class="mr-2 inline-block align-[10px]">{{ auth.username }}</span>
        <Button @click="logout" icon="pi pi-sign-out" rounded />
    </div>

</template>

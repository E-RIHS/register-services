<script setup>

import { ref } from "vue"

import { useAuthStore } from '@/stores/AuthStore'

// subscribe to auth store to see if a user is logged in (and thus has already registered)
const auth = useAuthStore()

// toggle visibility of the registration form
const showRegistrationForm = ref(false)
const googleFormsUrl = import.meta.env.VITE_GOOGLE_FORMS_URL

</script>

<template>

    <h2 class="py-6 text-4xl font-bold">
        Register your account for the E-RIHS KnowledgeBase
    </h2>

    <InlineMessage 
        v-if="auth.userId"
        severity="success"
        class="mb-6"
    >
        You are already registered and logged in.
    </InlineMessage>

    <p class="mb-4">
        Logging into this administration system, to directly add, modify and delete digital objects, is achieved using an ORCID iD.
    </p>
    <p class="mb-4">
        However, users need to be pre-registered in the system before they can login; having an ORCID iD is not sufficient.
        <strong>You can request an account using the button below, which will open a form (Google Forms).</strong> 
        Alternatively, you can also request an account by e-mail (wim[dot]fremout[at]kikirpa[dot]be), specifying your first and last name, 
        ORCID iD, primary e-mail address and details of your primary affiliation/organisation (full name, acronym, country of operation).
    </p>
    <p class="mb-4">
        A user account will be set up for you, along with details of you as a person and your related organisation. 
        <strong>You will be notified by e-mail when this is done</strong>. From that moment you be able to login using your ORCID iD.
    </p>

    <p v-if="!auth.userId" class="mb-4">
        <Button 
            label="Request account" 
            icon="pi pi-user-plus"
            @click="showRegistrationForm = true" 
        />

        <Dialog 
            v-model:visible="showRegistrationForm" 
            modal 
            header="Registration form" 
            :style="{ width: '685px' }"
        >
            <iframe :src="googleFormsUrl" width="640" height="797" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
        </Dialog>
    </p>

</template>

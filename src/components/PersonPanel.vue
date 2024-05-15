<script setup>

import { ref } from 'vue'

const cordraBaseUrl = import.meta.env.VITE_CORDRA_BASE_URL

const columns = [
    { field: "content.full_name", header: "Name" },
    { field: "content.mbox", header: "E-mail address" },
]

const showDialog = ref(false)
const infoButton = ref(false)

const toggleDialog = (info) => {
    showDialog.value = true
    infoButton.value = info
}

// check if the dialog has been shown before in this session
const shownDialogBefore = ref(true)
if (sessionStorage.getItem('shownDialogBefore') === null) {
    shownDialogBefore.value = false
}

const openLink = () => {
    shownDialogBefore.value = true
    sessionStorage.setItem('shownDialogBefore', 'true')
    showDialog.value = false
    window.open(`${cordraBaseUrl}/#create/Person`, '_blank')
}

</script>

<template>

        <h2 class="py-6 text-4xl font-bold">
            People
        </h2>

        <p class="mb-4">
            During the registration process, a "person" will be created by the administrators if does not already exist.
            It will be associated with your account and you will be able to manage it. 
            However, newly created persons will only be minimally populated with information. Please update your own details as soon as possible.
        </p>

        <p  class="mb-4">
            You can be associated with multiple organisations. This is done from within the person details; if you are not yet affiliated with an organisation you are working for, you can add it here.
            In the previous step, the concept of parent organisations was introduced. If you are not directly employed by the parent organisation, it is preferable not to add an affiliation to your person details.
        </p>

        <p  class="mb-4">
            In this step, you should add all other people that are involved in the service(s) that you will be registering: team members, operators, contact persons, etc. 
            Note that these people could already be in the system. To avoid duplicates, please check if they are already in the system before adding them. 
            They can be linked with your account if you have added them yourself previously (and as such, they will be listed below), but they can be added by other people (or by themself) as well. 
        </p>

        <p class="my-6">
            <Button 
                v-if="shownDialogBefore"
                label="Create new person" 
                icon="pi pi-file-edit" 
                @click="openLink"
            />
            <Button 
                v-else
                label="Create new person" 
                icon="pi pi-file-edit" 
                @click="toggleDialog(false)"
            />
            <Button 
                v-if="shownDialogBefore"
                icon="pi pi-info-circle" 
                aria-label="Filter" 
                severity="secondary" 
                class="ml-2" 
                @click="toggleDialog(true)" 
            />
        </p>

        <h3 class="py-6 text-xl font-bold">
            My team
        </h3>

        <p  class="mb-4">
            Below is a list of people that are either defined in the system by you, or to which you have been granted write-access.
        </p>

        <MyObjectsTable type="Person" :columns="columns" />

        <Dialog 
            v-model:visible="showDialog" 
            modal 
            header="The E-RIHS Knowledge Base" 
            :style="{ width: '35rem' }"
        >
            <CordraDialogContent />

            <p class="my-6" v-if="!infoButton">
                <Button label="Create new person" icon="pi pi-file-edit" @click="openLink"/>
            </p>
        </Dialog>

</template>

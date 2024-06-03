<script setup>

import { ref } from "vue"

const cordraBaseUrl = import.meta.env.VITE_CORDRA_BASE_URL

const columns = [
    { field: "content.acronym", header: "Acronym" },
    { field: "content.name", header: "Name" },
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
    window.open(`${cordraBaseUrl}/#create/Organisation`, '_blank')
}

</script>

<template>

    <h2 class="py-6 text-4xl font-bold">
        Organisations
    </h2>

    <p class="mb-4">
        During the registration process, your organisation will be created by the administrators if does not already
        exist.
        It will be associated with your account and you will be able to manage it.
        However, newly created organisations will only be minimally populated with information. Please update the
        organisation details as soon as possible.
    </p>

    <p class="mb-4">
        You can be associated with multiple organisations. If the other organisations you are associated with are not
        listed here, you can check if those organisations exist in the system.
        If they do, you probably won't have the necessary permissions to edit them. In the next step, however, you will
        be able to link this organisation as an affiliation in your person details.
    </p>

    <p class="mb-4">
        Organisations can be linked hierarchically. Examples are "CNR" and "CNR-ISTI", or "FORTH" and "FORTH-ICS". If a
        parent organisation is not listed, you can create it here.
        Within the "child" organisation, you can link the parent organisation(s).
    </p>

    <p class="my-6">
        <Button v-if="shownDialogBefore" label="Create new organisation" icon="pi pi-file-edit" @click="openLink" />
        <Button v-else label="Create new organisation" icon="pi pi-file-edit" @click="toggleDialog(false)" />
        <Button v-if="shownDialogBefore" icon="pi pi-info-circle" aria-label="Filter" severity="secondary" class="ml-2"
            @click="toggleDialog(true)" />
    </p>

    <TabView>
        <TabPanel header="My organisations">
            <p class="mb-4 mt-2">
                Below is a list of organisations that are either created by you, or to which you have been granted
                write-access.
            </p>
            <MyObjectsTable type="Organisation" :columns="columns" />
        </TabPanel>
        <TabPanel header="Search organisations">
            <MyObjectsTable type="Organisation" :columns="columns" search-mode />
        </TabPanel>
        <TabPanel header="Examples">
            <ExamplesTable type="Organisation" />
        </TabPanel>
    </TabView>

    <Dialog v-model:visible="showDialog" modal header="The E-RIHS Knowledge Base" :style="{ width: '35rem' }">
        <CordraDialogContent />

        <p class="my-6" v-if="!infoButton">
            <Button label="Create new organisation" icon="pi pi-file-edit" @click="openLink" />
        </p>
    </Dialog>

</template>

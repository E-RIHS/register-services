<script setup>

import { ref } from "vue"

const cordraBaseUrl = import.meta.env.VITE_CORDRA_BASE_URL

const columns = [
    { field: "content.title", header: "Title" },
    { field: "content.version", header: "Version" },
    { field: "content.version_date", header: "Version date" },
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
    window.open(`${cordraBaseUrl}/#create/Service`, '_blank')
}

</script>

<template>

        <h2 class="py-6 text-4xl font-bold">
            Services
        </h2>

        <p class="mb-4">
            In this step you can describe the services that you offer. A service is a combination of methods, equipment and software that you offer to the users to answer specific research questions.
            Services ar the top level entities that will be listed in the catalogue(s) of service.
        </p>

        <p class="my-6">
            <Button 
                v-if="shownDialogBefore"
                label="Create new service" 
                icon="pi pi-file-edit" 
                @click="openLink"
            />
            <Button 
                v-else
                label="Create new service" 
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

        <TabView>
            <TabPanel header="My services">
                <p class="mb-4 mt-2">
                    Below is a list of services that are either created by you, or to which you have been granted write-access.
                </p>
                <MyObjectsTable type="Service" :columns="columns" />
            </TabPanel>
            <TabPanel header="Search services">
                <MyObjectsTable type="Service" :columns="columns" search-mode />
            </TabPanel>
        </TabView>

        <Dialog 
            v-model:visible="showDialog" 
            modal 
            header="The E-RIHS Knowledge Base" 
            :style="{ width: '35rem' }"
        >
            <CordraDialogContent />

            <p class="my-6" v-if="!infoButton">
                <Button label="Create new service" icon="pi pi-file-edit" @click="openLink"/>
            </p>
        </Dialog>

</template>

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
        The primary Organisation for the registered user will have been created as part of the initial registration process, but this should be checked and enhanced as needed. Additional organisations may need to be added depending on your service and team members.
    </p>

    <p class="mb-4">
        You can be associated with multiple organisations. If the other organisations you are associated with are not listed here, you can check if those organisations exist in the system. If they do, you probably won't have the necessary permissions to edit them. In the next step, however, you will be able to link this organisation as an affiliation in your person details.
    </p>

    <p class="mb-4">
        When organisations which are part of larger organisations users may need to define the relevant parent or parents as well. Examples are "CNR" and "CNR-ISTI", or "FORTH" and "FORTH-ICS". When organisations which are part of larger organisations users may need to define the relevant parent or parents as well. Within the "child" organisation, you can link the parent organisation(s).
    </p>

    <p class="mb-2">
        When creating a new organisation, you will be asked to provide the following information:
    </p>

    <ul class="list-disc ml-6 mb-4">
        <li>Organisation <strong>Acronym</strong> and <strong>Name</strong></li>
        <li>Any existing <strong>external persistent identifiers</strong>. It is recommended that if there is a <a href="https://ror.org/" target="_blank" class="underline">ROR</a> or <a href="https://www.wikidata.org/" target="_blank" class="underline">Wikidata</a> entry for your organisation then these should be provided to link in additional data, such as locations. External references should be provided as URLs.</li>
        <li>Relevant <strong>contact details</strong> and <strong>website</strong> links</li>
        <li>Consider the <strong>research disciplines</strong> covered by the Organisation - at least one is required - there is a big drop down list but you can also see the current full list <a href="https://hdl.handle.net/21.11158/0002-9dc3-7d05-b211?urlappend=%26simple" target="_blank" class="underline">here</a></li>
        <li>If the organisation needs to be referenced in a particular form, such as EU project requiring a grant number to be included, you can include this information.</li>
        <li>You will be asked for some dates relating to when the organisation started working in this field and when it began to work with the E-RIHS community.</li>
        <li>A short <strong>bio</strong> is also useful.</li>
    </ul>

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

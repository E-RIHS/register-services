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
            The primary user will already have had a person record created for them as part of the initial registration process, but this should be checked and enhanced as needed. All people involved with a service team will need to be entered as people into the E-RIHS knowledge base. This is important for future E-RIHS service users to be able to see the range and experience of the services team when they are selecting E-RIHS services.
        </p>

        <p  class="mb-4">
            A person can be associated with multiple organisations. This is done from within the person details; if you are not yet affiliated with an organisation you are working for, you can add it here.
            In the previous step, the concept of parent organisations was introduced. If you are not directly employed by the parent organisation, it is preferable not to add an affiliation to your person details to the parent organisation.
        </p>

        <p  class="mb-4">
            In this step, you should add all other people that are involved in the service(s) that you will be registering: team members, operators, contact persons, etc. 
            Note that these people could already be in the system. To avoid duplicates, please check if they are already in the system before adding them. 
            They can be linked with your account if you have added them yourself previously (and as such, they will be listed below), but they can be added by other people (or by themself) as well. 
        </p>

        <p  class="mb-1">
            When creating a new person, you will be asked to provide the following information:
        </p>

        <ul class="list-disc ml-6 mb-4">
            <li>The person's <strong>Title</strong> and <strong>Name</strong></li>
            <li>Any existing <strong>external persistent identifiers</strong>. Providing the <a href="https://orcid.org/" target="_blank" class="underline">ORCID</a> entry for the person is higly recommended. PIDs should be formatted as URLs</li>
            <li>Their <strong>affiliations</strong> with any defined Organisations and the date they started working with them.</li>
            <li>Relevant <strong>contact details</strong> and <strong>website</strong> links</li>
            <li>Consider the <strong>research disciplines</strong> covered by the Person - there is a big drop down list but you can also see the current full list <a href="https://hdl.handle.net/21.11158/0002-9dc3-7d05-b211?urlappend=%26simple" target="_blank" class="underline">here</a>
            </li>
            <li>The date they started working in this field.</li>
            <li>A short <strong>bio</strong> is also useful.</li>
        </ul>

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

        <TabView>
            <TabPanel header="My team">
                <p class="mb-4 mt-2">
                    Below is a list of people that are either defined in the system by you, or to which you have been granted write-access.
                </p>
                <MyObjectsTable type="Person" :columns="columns" />
            </TabPanel>
            <TabPanel header="Search people">
                <MyObjectsTable type="Person" :columns="columns" search-mode />
            </TabPanel>
            <TabPanel header="Examples">
                <ExamplesTable type="Person" />
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
                <Button label="Create new person" icon="pi pi-file-edit" @click="openLink"/>
            </p>
        </Dialog>

</template>

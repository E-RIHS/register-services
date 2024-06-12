<script setup>

import { ref } from "vue"

const cordraBaseUrl = import.meta.env.VITE_CORDRA_BASE_URL

const columns = [
    { field: "content.preferred_label", header: "Title" },
    { field: "content.method_type", header: "Method type" },
    { field: "content.method_version", header: "Method version" },
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
    window.open(`${cordraBaseUrl}/#create/Method`, '_blank')
}

</script>

<template>
        <h2 class="py-6 text-4xl font-bold">
            Methods
        </h2>

        <p class="mb-4">
            In this step you can manage the standard Methods (or standard protocols) that describe how you will apply techniques, equipment and software in a service. It does not intend to describe the specific approach for a given experiment or piece of analysis; this will be done in the documentation of an access visit. A method is a detailed description of the steps that are taken to perform a specific analysis or experiment
            in a service. A service can have multiple methods. 
        </p>

        <p class="mb-4">
            Also please note, a Method can range from a simple text description of the usual activities within an ARCHLAB service to a detailed set of key parameters needed within complex systems used within MOLAB or FIXLAB. A detailed textual description of the steps carried out within a Method can be directly included in the form or referenced as an external document as needed.
        </p>

        <p class="mb-2">
            The description of a standard method will need to have the following information provided:
        </p>

        <ul class="list-disc ml-6 mb-4">
            <li>
                A unique <strong>title</strong>, which should relate to your own Method rather than a general name. A good approach will be to start with the acronym of your organisation followed by a short descriptive phrase and potentially a date or version number. Some examples:
                <ul class="list-disc ml-6">
                    <li><em>NG Lux Allowance Method 2024</em></li>
                    <li><em>KIK-IRPA Raman analysis of paint cross sections v1</em></li>
                    <li><em>KIK-IRPA Archival research</em></li>
                </ul>
            </li>
            <li>Alternative shorter <strong>acronyms</strong> can also be entered, such as “KIK-IRPA Raman 2024”</li>
            <li>The relevant <strong>technique</strong>. This can be selected from a big controlled list (<a href="https://hdl.handle.net/21.11158/0002-d6f1-f86f-d248?urlappend=%26simple" target="_blank" class="underline">link</a>) but “<em>other</em>” more specialised techniques can also be defined.</li>
            <li>A <strong>version number</strong> for the method; this can be a simple number, more complex semantic versioning, or even just the year the method was created.</li>
            <li><strong>Creation date</strong></li>
            <li>Relevant <strong>author details</strong>; this will need to be a referenced person or organisation already in the E-RIHS Knowledge base.</li>
            <li>The related <strong>tools</strong> (software or equipment previously registered in the E-RIHS knowledge base) should be listed along with their role within the method.</li>
            <li>A textual description of the Method can be added as free text or linked as an existing published document.</li>
            <li>A list of <strong>key parameters</strong> can then be added, each one will have value, unit, and type. They can also be linked to specific (previously registered) tools if a method is related to a complex multi-tool setup. The parameter type and unit dropboxes give a number of options, but you can add your own or adjust an existing term if required. The purpose of this list of parameters is to define the key terms needed for data interpretation and or to aid future searches for relevant data sets. It does not need to be an exhaustive list of every possible parameter used within a system.</li>
        </ul>

        <p class="my-6">
            <Button 
                v-if="shownDialogBefore"
                label="Create new method" 
                icon="pi pi-file-edit" 
                @click="openLink"
            />
            <Button 
                v-else
                label="Create new method" 
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
            <TabPanel header="My methods">
                <p class="mb-4 mt-2">
                    Below is a list of methods that are either created by you, or to which you have been granted write-access.
                </p>
                <MyObjectsTable type="Method" :columns="columns" />
            </TabPanel>
            <TabPanel header="Search methods">
                <MyObjectsTable type="Method" :columns="columns" search-mode />
            </TabPanel>
            <TabPanel header="Examples">
                <ExamplesTable type="Method" />
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
                <Button label="Create new method" icon="pi pi-file-edit" @click="openLink"/>
            </p>
        </Dialog>

</template>

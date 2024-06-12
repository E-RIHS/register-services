<script setup>

import { ref } from "vue"

const cordraBaseUrl = import.meta.env.VITE_CORDRA_BASE_URL

const columns = [
    { field: "content.name", header: "Name" },
    { field: "content.version", header: "Version"},
    { field: "content.developer", header: "Developer" },
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
    window.open(`${cordraBaseUrl}/#create/Software`, '_blank')
}

</script>

<template>

        <h2 class="py-6 text-4xl font-bold">
            Software
        </h2>

        <p class="mb-4">
            <InlineMessage 
                severity="info"
            >
            For ARCHLAB services, the descriptions of equiments and software are optional. For the other platforms, they are considered mandatory.
            </InlineMessage>
        </p>

        <p class="mb-4">
            In the this step and the next, you can create descriptions of software and equipment that you use in your service. Only the key pieces of equipment and software for your services need to be defined.
        </p>

        <p class="mb-2">
            Software and equipment are collectively called "tools". The set-up of tools offered in a service can range from simple or complex. A simple setup involves a simple software or equipment offered that can be directly described here. In case of more complex setups, there are two approaches that can be used: 
        </p>

        <ul class="list-disc ml-6 mb-4">
            <li>Describing “main” tools and "components". This can be a combination of software and equipment, and can be linked to individual software and equipment descriptions. As an example, a scanning electron microscope is an equipment that can be equiped with multiple detectors. Each detector, especially those from a different manufacturer can be considered as a separate equipment. Both the microscope and the detectors can be linked to software that is used to control them, and your lab might combine these proprietary software with open-source software for data analysis. The best approach is start with discription of the the individual software and equipment components, and building up towards the combined/main tool description.</li>
            <li>Describing individual, stand-alone software and equipment that are mentioned in the method description (see next <em>7 - Methods</em>).</li>
        </ul>

        <p class="mb-2">
            Software will need to have the following information provided:
        </p>

        <ul class="list-disc ml-6 mb-4">
            <li>A unique <strong>title</strong> and a <strong>description</strong>. The title should relate to your own setup rather than a simple model name. A good approach is to start with the acronym of your organisation, such as “NG Lux Calculator v1.0”</li>
            <li>You will need to enter the relevant general <strong>data output or input types</strong>. The dropboxes give a number of options, but you can add your own or adjust an existing term if required. At this stage the only details, within the software description, covering the input and output data, used by software, is the general class or type, such as “2d dataset” or “RGB  image”. Detailed information relating to formats, file sizes etc. can all be added later in relation to a Method statement or as part of a Data Management Plan</li>
            <li>You will also need relevant <strong>developer/company</strong> details, <strong>licence type</strong>, <strong>version number</strong> and <strong>release date</strong>.</li>
            <li>It is also very useful to include <strong>relevant links</strong> to code, documentation, forums, etc.</li>
            <li>A <strong>last checked date</strong> is also required, this is related to checking a system is working, but for the initial definition this will generally be the current date.</li>
        </ul>

        <p class="my-6">
            <Button 
                v-if="shownDialogBefore"
                label="Create new software" 
                icon="pi pi-file-edit" 
                @click="openLink"
            />
            <Button 
                v-else
                label="Create new software" 
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
            <TabPanel header="My software">
                <p class="mb-4 mt-2">
                    Below is a list of software descriptions that are either created by you, or to which you have been granted write-access.
                </p>
                <MyObjectsTable type="Software" :columns="columns" />
            </TabPanel>
            <TabPanel header="Search software">
                <MyObjectsTable type="Software" :columns="columns" search-mode />
            </TabPanel>
            <TabPanel header="Examples">
                <ExamplesTable type="Software" />
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
                <Button label="Create new software" icon="pi pi-file-edit" @click="openLink"/>
            </p>
        </Dialog>

</template>

<script setup>

import { ref } from "vue"

const cordraBaseUrl = import.meta.env.VITE_CORDRA_BASE_URL

const columns = [
    { field: "content.name", header: "Name" },
    { field: "content.manufacturer", header: "Manufacturer" },
    { field: "content.model", header: "Model" },
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
    window.open(`${cordraBaseUrl}/#create/Equipment`, '_blank')
}

</script>

<template>

        <h2 class="py-6 text-4xl font-bold">
            Equipment
        </h2>

        <p class="mb-4">
            <InlineMessage 
                severity="info"
            >
            For ARCHLAB services, the descriptions of equiments and software are optional. For the other platforms, they are considered mandatory.
            </InlineMessage>
        </p>

        <p class="mb-4">
            In the this step and the next, you can create descriptions of the equipment(s) that you use in your service. An equipment is a physical and particular device in your lab, defined by a name, a manufacturer and a model. It should not be mistaken with the concept of a "technique", which is a more abstract concept that can be implemented by multiple equipments, and which will be selected in the method and service descriptions.
        </p>

        <p class="mb-2">
            Software and equipment are collectively called "tools". The set-up of tools offered in a service can range from simple or complex. A simple setup involves a simple software or equipment offered that can be directly described here. In case of more complex setups, there are two approaches that can be used: 
        </p>

        <ul class="list-disc ml-6 mb-4">
            <li>Describing “main” tools and "components". This can be a combination of software and equipment, and can be linked to individual software and equipment descriptions. As an example, a scanning electron microscope is an equipment that can be equiped with multiple detectors. Each detector, especially those from a different manufacturer can be considered as a separate equipment. Both the microscope and the detectors can be linked to software that is used to control them, and your lab might combine these proprietary software with open-source software for data analysis. The best approach is start with discription of the the individual software and equipment components, and building up towards the combined/main tool description.</li>
            <li>Describing individual, stand-alone software and equipment that are mentioned in the method description (see next <em>7 - Methods</em>).</li>
        </ul>

        <p class="mb-2">
            Equipment will need to have the following information provided:
        </p>

        <ul class="list-disc ml-6 mb-4">
            <li>A unique <strong>title</strong> and a <strong>description</strong>. The title should relate to your own setup rather than a simple model name. A good approach is to start with the acronym of your organisation, such as “KIK-IRPA Raman 785/532 No1”</li>
            <li>You will need to enter the relevant general <strong>data output types</strong>, if applicable. The dropboxes give a number of options, but you can add your own or adjust an existing term if required. At this stage the only details, within the equipment description, covering the output data, used by the equipment, is the general class or type, such as “2d dataset” or “RGB  image”. Detailed information relating to formats, file sizes etc. can all be added later in relation to a Method statement or as part of a Data Management Plan</li>
            <li>You will also need relevant <strong>Manufacturer</strong> details, <strong>model number</strong>, <strong>serial number</strong> and <strong>calibration date</strong>.</li>
            <li>You will also be asked to select a <strong>working distance range</strong> and indicate the possible <strong>impact</strong> the equipment might have on an object or sample.</li>
            <li>Details of possible <strong>acquisition or target areas</strong> are also required. The dropbox gives a number of options, but you can add your own or adjust an existing term if required.</li>
            <li>It is also very useful to include <strong>relevant links</strong> to documentation or equipment websites.</li>
        </ul>

        <p class="my-6">
            <Button 
                v-if="shownDialogBefore"
                label="Create new equipment" 
                icon="pi pi-file-edit" 
                @click="openLink"
            />
            <Button 
                v-else
                label="Create new equipment" 
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
            <TabPanel header="My equipment">
                <p class="mb-4 mt-2">
                    Below is a list of equipment descriptions that are either created by you, or to which you have been granted write-access.
                </p>
                <MyObjectsTable type="Equipment" :columns="columns" />
            </TabPanel>
            <TabPanel header="Search equipment">
                <MyObjectsTable type="Equipment" :columns="columns" search-mode />
            </TabPanel>
            <TabPanel header="Examples">
                <ExamplesTable type="Equipment" />
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
                <Button label="Create new equipment" icon="pi pi-file-edit" @click="openLink"/>
            </p>
        </Dialog>

</template>

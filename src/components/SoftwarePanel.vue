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
            In the this step and the next, you can create descriptions of software and equipment that you use in your service.
        </p>

        <p  class="mb-4">
            Software and equipment are collectively called "tools" and can be linked to each other: a tool can consist of disctinctive components 
            that can itself be either other equipment or software. As an example, a scanning electron microscope is an equipment that 
            can be equiped with multiple detectors. Each detector, especially those from a different manufacturer can be considered 
            as a separate equipment. Both the microscope and the detectors can be linked to software that is used to control them, 
            and your lab might combine these proprietary software with open-source software for data analysis. Whether you want 
            to describe the microscope, the detectors and the software individually or as one single tool, depends on the tool itself, 
            the way it is being used within the service and your preference. If you choose to describe them individually, the best 
            approach is start with the individual software and equipment descriptions, and building up towards the combined/main tool 
            description.
        </p>

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

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
            Services ar the top level entities that will be listed in the catalogue(s) of service. Key metadata directly describing the service relates to the technology/technique used, the Access platform (MOLAB, FIXLAB, ARCHLAB, DIGILAB) to which it belongs, domains or disciplines a given service has worked within or has experience within, the types of objects or data to which it applies (research focus),  the precise functions it can offer, the materials or properties for which it provides information
        </p>

        <p class="mb-2">
            The following pieces of information may need to be considered or created before starting to define your service:
        </p>

        <ul class="list-disc ml-6 mb-4">
            <li>A unique <strong>title</strong>, which should relate to your Service rather than just a technique or piece of equipment. A good approach will be to start with the acronym of your organisation followed by a short descriptive phrase, for example “Access to KIK-IRPA Archives”</li>
            <li>A <strong>service summary</strong>: this should be a very short paragraph that defines the service. This is intended to be displayed in lists of services, rather than to provide too much detail. It can include concepts like using X to identify or study Y, or “providing access to and collaborative research support for archive X.</li>
            <li>A full <strong>service description</strong>: this is a full general description of your service. It is intended to explain the scope of what the service is for as well as describing what is special or unique to your service and why relevant users want to apply for it.</li>
            <li><strong>Service Readiness Level</strong>: this is a simple drop-down list, is your service fully functional or experimental, etc. Most fully functioning services are expected to be levels 7-9, but experimental or new services can be lower depending on their stage or development.</li>
            <li><strong>Support activities</strong>: This is an optional subform which allows you to acknowledge or describe external support being provided to your service, the support might relate to access, administration, development or maintenance. You need to define the type of support, which (previously defined) organisation is providing it, give a description of the support and indicate when the support started and if needed ended. THis allows a service to acknowledge financial support, activity collaboration,or even general maintenance support. As noted, this is intended to acknowledge external support, it does not need to be used to indicate support from your own organisation, or probably even a parent organisation (unless required to do so).</li>
            <li>The relevant <strong>technique</strong>: this can be selected from a big controlled list (https://hdl.handle.net/21.11158/0002-d6f1-f86f-d248?urlappend=%26simple) but “other” more specialised techniques can also be defined.</li>
            <li>Consider the main research disciplines covered by the Service - at least one is required. There is a big drop-down list but you can also see the current full list at <a href="https://hdl.handle.net/21.11158/0002-9dc3-7d05-b211?urlappend=%26simple" target="_blank" class="underline">here<span class="pi pi-external-link ml-1 mr-1" /></a>. The list is quite long but additional or narrower disciplines can also be added. These are intended to define general areas of research rather than specific activities. The following two fields will help cover that.</li>
            <li><strong>Research Questions</strong>:  are meant to capture the typical or general research questions a service is designed to answer. It is a free text field at the moment, but try to keep the entries short as they will be used to create a drop down at a later stage. This field is intended to help non specialist users link services to their own research questions. Some possible examples are given:  ‘What pigments are present in my sample?’, ‘What is my archaeological pottery made of?’, ‘What ancient organic materials are present in my sample?’, ‘What are the safe environmental limits for my specific object?’, ‘What tools should I use to manage my collection?’, etc.</li>
            <li>The <strong>service function</strong> field is also intended to help non specialist users link services to their own research questions. IT should also be short and descriptive, but it is intended to define a service’s practical level activities, what has a service been used for, what is it intended for. E.g. 'Identification of Inorganic Pigments', 'Materials Analysis', 'Dye Analysis', 'De-convolution XRF Spectra', 'Calculating Light Exposure Allowance'.</li>
            <li>If a service actually <strong>measures properties</strong> of certain materials these can also be listed to aid searches. For a given service one can enter multiple properties and the relevant <strong>materials</strong> as required.</li>
            <li><strong>Service Links</strong>: These can be used to provide a range of further information as needed, such as the location of a service can be defined by adding a “<strong>geolocation</strong>” link. To add a “geolocation” link it is recommended that one tries <a href="https://www.geonames.org/" target="_blank" class="underline">GeoNames<span class="pi pi-external-link ml-1 mr-1" /></a> first but if a record can not be found then a simple Google Maps URL can be used.</li>
            <li>Some services can provide access to specific <strong>research resources</strong> such as heritage collections, objects, samples, archives, etc. these can be described with simple text or referenced with a URL.</li>
            <li><strong>Service Limitations</strong>: this is an optional text field to describe any limitations a given service might have. This could relate to sample or object size/weight, perhaps the available environmental conditions, or even limited opening hours. As more services are defined this field will be re-assessed to determine if some for of controlled list might be more useful, or even if further information might be required.</li>
            <li>There is an option to reference <strong>example output data</strong> (or input data for DIGILAB) via a URL (DOI). A further text field is also provided later in the form to allow service providers to describe in more detail the outputs or results of a service, what reports, images, datasets will be produced and in what formats. Similarly for digital services details if required digital inputs can also be described.</li>
            <li>A <strong>service version</strong> can be defined - this is important to help distinguish between data produced by a single “service” but at different times with potentially different team members or equipment.</li>
            <li>A <strong>service creation date</strong> can also be defined - this relates to when the service has actually been offered as a service. This can have been before E-RIHS was formed in a previous EU project or even at a more local National or Institutional level. This field is intended to help potential service users understand the experience behind a given service.</li>
            <li>As E-RIHS develops, making use of clear <strong>Data Management Plans</strong> will become increasingly important. This will ensure that potential users understand how created data will be managed, sustained and shared. The initial E-RIHS DMP will be published soon which will provide general E-RIHS data management procedures and options. But it is anticipated that a more specific local or service level DMP will need to be defined. At this time DMP can be either entered as simple text or linked to record as a separate published document. The following field, related to “Variation from E-RIHS DMP” is intended for service providers to highlight any key differences relating to data publication, embargoes, selected repositories, etc. It does not need to be an exhaustive comparison, just an aid to ensure that potential service users know where they stand.</li>
            <li>An optional <strong>data flow diagram</strong> can also be included for more complex services involving multiple stages or pieces of equipment, or a variety of data processing steps.</li>
            <li>A series of <strong>keywords</strong> can be attached to a given service, these can also be important for helping the process of service discovery by future users, so a small selection of appropriate keywords can be important.</li>
            <li>The final few fields are more administrative and relating to the <strong>access period</strong>: the period of time used to define the length of a service access, and a potential <strong>unit cost</strong> of a service per period. This has traditionally been in days or hours, but when considering future digital services smaller time periods may be required.</li>
        </ul>

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
            <TabPanel header="Examples">
                <ExamplesTable type="Service" />
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

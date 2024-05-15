<script setup>

const cordraBaseUrl = import.meta.env.VITE_CORDRA_BASE_URL

const columns = [
    { field: "content.name", header: "Name" },
    { field: "content.manufacturer", header: "Manufacturer" },
    { field: "content.model", header: "Model" },
]

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
            In the this step and the next, you can create descriptions of the equipment(s) that you use in your service.
            An equipment is a physical and particular device in your lab, defined by a name, a manufacturer and a model. 
            It should not be mistaken with the concept of a "technique", which is a more abstract concept that can be 
            implemented by multiple equipments, and which will be selected in the method and service descriptions.
        </p>

        <p  class="mb-4">
            Similarly as for software, equipment can be linked to each other: a piece of equipment can consist of disctinctive components.
            This is optional, but can be useful to describe the equipment and its different components in more detail. An example is given in 
            the previous step. If you choose to describe the equipment and its components individually, the best approach is start with the
            individual software and equipment component descriptions, and building up towards the combined/main equipment description.
        </p>

        <p class="my-6">
            <a :href="`${cordraBaseUrl}/#create/Equipment`" target="_blank">
                <Button label="Create new equipment" icon="pi pi-file-edit" />
            </a>
        </p>

        <h3 class="py-6 text-xl font-bold">
            My equipment
        </h3>

        <p  class="mb-4">
            Below is a list of equipment descriptions that are either created by you, or to which you have been granted write-access.
        </p>

        <MyObjectsTable type="Equipment" :columns="columns" />

</template>

<script setup>

const cordraBaseUrl = import.meta.env.VITE_CORDRA_BASE_URL

const columns = [
    { field: "content.name", header: "Name" },
    { field: "content.version", header: "Version"},
    { field: "content.developer", header: "Developer" },
]

</script>

<template>

        <h2 class="py-6 text-4xl font-bold">
            Software
        </h2>

        <p class="mb-4">
            In the this step and the next, you can create descriptions of software and equipment that you use in your service.
        </p>

        <p class="mb-4">
            <Tag icon="pi pi-info-circle" severity="info" value="Note" /> 
            For ARCHLAB services, the descriptions of equiments and software are optional. For the other platforms, they are considered mandatory.
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
            <a :href="`${cordraBaseUrl}/#create/Software`" target="_blank">
                <Button label="Create new software" />
            </a>
        </p>

        <h3 class="py-6 text-xl font-bold">
            My software
        </h3>

        <p  class="mb-4">
            Below is a list of software descriptions that are either created by you, or to which you have been granted write-access.
        </p>

        <MyObjectsTable type="Software" :columns="columns" />

</template>

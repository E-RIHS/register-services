<script setup>

const cordraBaseUrl = import.meta.env.VITE_CORDRA_BASE_URL

const columns = [
    { field: "content.preferred_label", header: "Title" },
    { field: "content.method_type", header: "Method type" },
    { field: "content.method_version", header: "Method version" },
]

</script>

<template>

        <h2 class="py-6 text-4xl font-bold">
            Methods
        </h2>

        <p class="mb-4">
            In this step you can manage the default methods that describe how you will apply the software and equipment
            in your service. A service can have multiple methods.
        </p>

        <p class="mb-4">
            A default method is the general approach or workflow that you will use to answer a research question.
            A method should be given a distinct title, which preferably starts with the acronym of the organisation that offers the service,
            followed a short description of the method. If you have distinct methods for different materials that can be analysed, it could be
            useful to add the material. Optionally, the title can also contain a version number or a year, which allows you to create updated methods.
            The main purpose of the title, is to allow you to easily identify the method in the list of methods.
            Examples of titles are:
        </p>

        <ul class="list-disc ml-6 mb-4">
            <li>NG Lux Allowance Method 2024</li>
            <li>KIK-IRPA SEM-EDS on cross sections of paint samples v1</li>
            <li>KIK-IRPA Archival research</li>
        </ul>

        <p class="mb-4">
            A default method gives a potential user of the service an idea of how the service is performed. 
            You can describe parameters and instrumental settings in the default method, but you can also refer to a more detailed method description 
            (in either a text box or an external document). The protocol and parameters described in the default method are not written in stone. During
            an access visit, you can evidently deviate from the default method in order to better answer the research questions.
        </p>

        <p class="my-6">
            <a :href="`${cordraBaseUrl}/#create/Method`" target="_blank">
                <Button label="Create new method" />
            </a>
        </p>

        <h3 class="py-6 text-xl font-bold">
            My methods
        </h3>

        <p  class="mb-4">
            Below is a list of methods that are either created by you, or to which you have been granted write-access.
        </p>

        <MyObjectsTable type="Method" :columns="columns" />

</template>

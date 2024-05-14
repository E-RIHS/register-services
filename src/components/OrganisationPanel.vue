<script setup>

const CORDRA_BASE_URL = "https://data.e-rihs.io"

const columns = [
    { field: "content.acronym", header: "Acronym" },
    { field: "content.name", header: "Name" },
]

</script>

<template>

        <h2 class="py-6 text-4xl font-bold">
            Organisations
        </h2>

        <p class="mb-4">
            During the registration process, your organisation will be created by the administrators if does not already exist.
            It will be associated with your account and you will be able to manage it. 
            However, newly created organisations will only be minimally populated with information. Please update the organisation details as soon as possible.
        </p>

        <p  class="mb-4">
            You can be associated with multiple organisations. If the other organisations you are associated with are not listed here, you can check if those organisations exist in the system. 
            If they do, you probably won't have the necessary permissions to edit them. In the next step, however, you will be able to link this organisation as an affiliation in your person details.
        </p>

        <p  class="mb-4">
            Organisations can be linked hierarchically. Examples are "CNR" and "CNR-ISTI", or "FORTH" and "FORTH-ICS". If a parent organisation is not listed, you can create it here. 
            Within the "child" organisation, you can link the parent organisation(s).
        </p>

        <p class="my-6">
            <a :href="`${CORDRA_BASE_URL}/#create/Organisation`" target="_blank">
                <Button label="Create new organisation" />
            </a>
        </p>

        <h3 class="py-6 text-xl font-bold">
            My organisations
        </h3>

        <p  class="mb-4">
            Below is a list of organisations that are either created by you, or to which you have been granted write-access.
        </p>

        <MyObjectsTable type="Organisation" :columns="columns" />

</template>

<script setup>

const CORDRA_BASE_URL = "https://data.e-rihs.io"

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
            ...
        </p>

        <p  class="mb-4">
            Note: for ARCHLAB services, the descriptions of equiments and software are optional.
        </p>

        <p class="my-6">
            <a :href="`${CORDRA_BASE_URL}/#create/Equipment`" target="_blank">
                <Button label="Create new equipment" />
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

<script setup>

const CORDRA_BASE_URL = "https://data.e-rihs.io"

const columns = [
    { field: "content.title", header: "Title" },
    { field: "content.version", header: "Version" },
    { field: "content.version_date", header: "Version date" },
]

</script>

<template>

        <h2 class="py-6 text-4xl font-bold">
            Services
        </h2>

        <p class="mb-4">
            ...
        </p>

        <p class="my-6">
            <a :href="`${CORDRA_BASE_URL}/#create/Service`" target="_blank">
                <Button label="Create new service" />
            </a>
        </p>

        <h3 class="py-6 text-xl font-bold">
            My services
        </h3>

        <p  class="mb-4">
            Below is a list of services that are either created by you, or to which you have been granted write-access.
        </p>

        <MyObjectsTable type="Service" :columns="columns" />

</template>

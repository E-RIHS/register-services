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
            ...
        </p>

        <p  class="mb-4">
            Note: for ARCHLAB services, the descriptions of equiments and software are optional.
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

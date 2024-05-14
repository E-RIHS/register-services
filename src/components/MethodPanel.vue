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
            ...
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

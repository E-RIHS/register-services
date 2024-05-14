<script setup>

const CORDRA_BASE_URL = "https://data.e-rihs.io"

const columns = [
    { field: "content.acronym", header: "Acronym" },
    { field: "content.name", header: "Name" },
]

</script>

<template>
    <main class="container m-4 xl:mx-64">

        <h3 class="py-6 text-xl font-bold">
            My organisations
        </h3>

        <MyObjectsTable type="Organisation" :columns="columns" />


        <a :href="`${CORDRA_BASE_URL}/#create/Organisation`" target="_blank" class="mt-6">
            <Button label="Create new organisation" />
        </a>

    </main>
</template>

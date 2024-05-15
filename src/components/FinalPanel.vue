<script setup>

const cordraBaseUrl = import.meta.env.VITE_CORDRA_BASE_URL

const columns = [
    { field: "content.title", header: "Title" },
    { field: "content.version", header: "Version" },
    { field: "content.version_date", header: "Version date" },
]

</script>

<template>

        <h2 class="py-6 text-4xl font-bold">
            My Services
        </h2>

        <p class="mb-4">
            Below you can find the list of services that you have created. You can at any time edit them, or create new ones.
            If you want to propose some or all of these services to be offered by E-RIHS (on the European level), you can copy them and send them to your national coordinator, who will forward them to the E-RIHS office.
        </p>

        <MyObjectsTable type="Service" :columns="columns" />

        <p class="mb-4">
            Note: in the future we might add support for creating national calagolues of services, or even institutional or personal catalogues. This can already be done within the E-RIHS Knowledge Base.
        </p>

</template>

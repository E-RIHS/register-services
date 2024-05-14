<script setup>
import Authenticate from './Authenticate.vue'

</script>

<template>

    <Menubar class="container m-4 xl:mx-64">
        <template #start>
            <Image src="https://data.e-rihs.io/img/e-rihs-kb-logo.png" width="200" />
            <span class="text-2xl font-bold ml-6 inline-block align-[6px]">Service registration tool</span>
        </template>
        <template #end>
            <div class="flex align-items-center gap-2">
                <Authenticate />
            </div>
        </template>
    </Menubar>

</template>
<script setup>
import Authenticate from './Authenticate.vue'

</script>

<template>

    <Menubar class="container m-4 xl:mx-64">
        <template #start >
            <div class="flex flex-row w-full gap-4">
                <div class="basis-fit content-center">
                    <img src="@/assets/e-rihs-kb-logo.png" class="object-contain object-left h-10 w-45" />
                </div>
                <div class="basis-auto content-center">
                    <span class="xl:text-2xl text-lg font-bold">Service registration tool</span>
                </div>
            </div>
        </template>
        <template #end>
            <div class="flex align-items-center gap-2">
                <Authenticate />
            </div>
        </template>
    </Menubar>

</template>
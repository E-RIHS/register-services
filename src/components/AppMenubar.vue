<script setup>
import Authenticate from './Authenticate.vue'

</script>

<template>

    <Menubar class="container m-4 xl:mx-64">
        <template #end>
            <div class="flex align-items-center gap-2">
                <Authenticate />
            </div>
        </template>
    </Menubar>

</template>
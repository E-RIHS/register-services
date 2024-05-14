<script setup>
import Authenticate from './Authenticate.vue'

</script>

<template>

    <Menubar>
        <template #end>
            <div class="flex align-items-center gap-2">
                <Authenticate />
            </div>
        </template>
    </Menubar>

</template>
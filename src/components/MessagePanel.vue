<script setup>

import { useMessageStore } from '@/stores/MessageStore'

const messages = useMessageStore()

</script>

<template>
    <div class="container m-4 xl:mx-64">
        <Message 
            v-for="msg of messages.list" 
            :key="msg.id" 
            :severity="msg.severity"
            class="my-4">
            {{ msg.detail }}
        </Message>
    </div>
</template>
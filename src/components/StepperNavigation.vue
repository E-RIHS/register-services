<script setup>

import { ref } from "vue"

// define component props
const props = defineProps({
    step: Number
})

const active = ref(props.step)

const items = ref([
    {
        label: 'About'
    },
    {
        label: 'Registration'
    },
    {
        label: 'Organisations'
    },
    {
        label: 'People'
    },
    {
        label: 'Equipment'
    },
    {
        label: 'Software'
    },
    {
        label: 'Method'
    },
    {
        label: 'Services'
    },
    {
        label: 'All done'
    }
])

</script>


<template>

</template>
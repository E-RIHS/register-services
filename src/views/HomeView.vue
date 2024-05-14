<script setup>
import StepperNavigation from '@/components/StepperNavigation.vue'
import { ref, watch } from "vue"

import { useAuthStore } from '@/stores/AuthStore'

const CORDRA_BASE_URL = "https://data.e-rihs.io"

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

const activeStep = ref(0)

// check if authenticated (to be able to hide steps 2-8)
const auth = useAuthStore()


</script>

<template>
    <main class="container m-4 xl:mx-64">

        <Card class="my-6">
            <template #content>
                <Steps :model="items" v-model:activeStep="activeStep" :readonly="false" />
            </template>
        </Card>

        <Organisations v-if="activeStep == 2 && auth.accessToken"/>

        <div v-else>
            You are not authenticated. Please authenticate to proceed.
        </div>

    </main>
</template>

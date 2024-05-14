<script setup>
import { ref, watch } from "vue"
import { useAuthStore } from '@/stores/AuthStore'


const CORDRA_BASE_URL = "https://data.e-rihs.io"


const items = ref([
    {
        label: 'Start'
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

        <AboutPanel v-if="activeStep === 0"/>
        <RegistrationPanel v-else-if="activeStep === 1"/>
        <OrganisationPanel v-else-if="activeStep === 2 && auth.accessToken"/>
        <PersonPanel v-else-if="activeStep === 3 && auth.accessToken"/>

        <div v-else>
            You are not authenticated. Please authenticate to proceed.
        </div>

        <Button v-if="activeStep !== 8" label="Next" @click="activeStep++" class="mt-6"/>

    </main>
</template>

<script setup>
import { ref, watch, onMounted } from "vue"
import { useRoute } from "vue-router"

import { useAuthStore } from '@/stores/AuthStore'


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
        label: 'Software'
    },
    {
        label: 'Equipment'
    },
    {
        label: 'Method'
    },
    {
        label: 'Services'
    },
    {
        label: 'Overview'
    }
])

// active step
const activeStep = ref(0)

// update route on activeStep change and vice versa
const route = useRoute()

onMounted(() => {
    if (route.params.id)
        activeStep.value = parseInt(route.params.id) - 1
    // check for ?step= query parameter
    const step = route.query.step
    if (step) {
        activeStep.value = parseInt(step) - 1
    }
    // remove hash and query parameters from url, if any
    let url = window.location.href.split('#')[0]
    if (url.includes('?')) url = url.split('?')[0]
    window.history.pushState("", document.title, url)
})

watch(() => activeStep.value, (newStep, oldStep) => {
    // update route
    window.history.pushState({}, '', `${import.meta.env.VITE_APP_BASE_URL}/${newStep + 1}`)
})

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

        <AboutPanel v-if="activeStep === 0" />
        <RegistrationPanel v-else-if="activeStep === 1" />
        <OrganisationPanel v-else-if="activeStep === 2 && auth.accessToken" />
        <PersonPanel v-else-if="activeStep === 3 && auth.accessToken" />
        <SoftwarePanel v-else-if="activeStep === 4 && auth.accessToken" />
        <EquipmentPanel v-else-if="activeStep === 5 && auth.accessToken" />
        <MethodPanel v-else-if="activeStep === 6 && auth.accessToken" />
        <ServicePanel v-else-if="activeStep === 7 && auth.accessToken" />
        <FinalPanel v-else-if="activeStep === 8 && auth.accessToken" />

        <div v-else>
            <InlineMessage 
                severity="warn"
                class="my-6"
            >
                You are not authenticated. Please authenticate to proceed.
            </InlineMessage>
        </div>

        <Button 
            v-if="activeStep !== 0" 
            icon="pi pi-chevron-left"
            label="Previous" 
            severity="secondary"
            @click="activeStep--" 
            class="mt-6 mr-2"
        />
        <Button 
            v-if="activeStep !== 8" 
            icon="pi pi-chevron-right"
            label="Next" 
            @click="activeStep++" 
            class="mt-6 mr-2"
        />

    </main>
</template>

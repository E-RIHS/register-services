<script setup>
import { ref } from "vue"
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

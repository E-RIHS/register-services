<script setup>
import 'primeicons/primeicons.css'
</script>

<template>

        <h2 class="py-6 text-4xl font-bold">
            Registering Services in the E-RIHS KnowledgeBase
        </h2>

        <h3 class="py-6 text-xl font-bold">
            About the E-RIHS KnowledgeBase
        </h3>

        <p class="mb-4">
            The E-RIHS Knowledge Base (<a href="https://data.e-rihs.io" class="underline" target="_blank">data.e-rihs.io<span class="pi pi-external-link ml-1 mr-1" /></a>) is a repository of information about the E-RIHS infrastructure, services, and resources. 
            It is designed to support the E-RIHS community in sharing and discovering information about the E-RIHS infrastructure, services, and resources.
        </p>

        <p class="mb-4">
            The Knowledge Base is powered by Cordra, a platform for building and managing digital objects. Cordra is designed to support the creation, 
            management, and sharing of digital objects, and to provide a flexible and extensible platform for building digital repositories.
        </p>

        <h3 class="py-6 text-xl font-bold">
            About the Service Registration tool
        </h3>

        <p class="mb-4">
            The Knowledge Base, empowered by Cordra, provides a very basic user interface for creating, managing, and sharing digital objects. Although extremely powerful, it is primarily intended as an administrative user interface.
            Several user-friendly tools for end users are expected to be developed in the future, which will make underlying use of this Knowledgebase. 
        </p>

        <p class="mb-4">
            The Service Registration tool is intended to facilitate the process of registering services and all related documentation within the Knowledge Base. 
            It guides the service providers through the different steps of the process with a user-friendly interface, and polishes off Cordra's roughest edges.
            It is not designed to be a full-fledged service management tool.
        </p>

        <h3 class="py-6 text-xl font-bold">
            Defining a service
        </h3>

        <p class="mb-4">
            In addition to the key metadata directly describing an actual Service, the full definition of an E-RIHS Service is a combination of the individual definitions of a set of related entities (People, Tools, Techniques, etc), 
            see model diagram, that all need to be defined first in a specific order. More information on the process of defining services and an overview of which information you should keep at hand during the process, can be found <a href="https://github.com/E-RIHS/help/tree/main/defining-services" target="_blank" class="underline">here<span class="pi pi-external-link ml-1 mr-1" /></a>.
        </p>
        <img src="https://data.e-rihs.io/objects/design?payload=defining_services.png" alt="Schematic view of all definitions around the concept 'Service'" class="mb-4">

</template>
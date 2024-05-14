<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>

    <AppMenubar />

    <header>
        <div class="wrapper">
            <!--nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav-->
        </div>
    </header>

    <MessagePanel />

    <RouterView />

</template>

<style scoped></style>

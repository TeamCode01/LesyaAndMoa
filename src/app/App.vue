<template>
    <router-view v-slot="{ Component }">
        <Header />
        <keep-alive>
            <component :is="Component"></component>
        </keep-alive>
        <Footer />
    </router-view>
</template>

<script setup>
import { Header } from '@widgets/AppHeader';
import { Footer } from '@widgets/AppFooter';
</script>

<template>
    <ul class="breadcrumb__list container">
        <app-breadcrumb
            v-for="(breadcrumb, index) in breadcrumbs"
            :key="breadcrumb.path"
            :breadcrumb="breadcrumb"
            :active="index === breadcrumbs.length - 1"
        />
    </ul>
</template>

<script setup lang="ts">
import AppBreadcrumb from './AppBreadcrumb.vue';
import { Breadcrumb } from '@shared/composables/useBreadcrumbs';

interface BreadcrumbsProps {
    breadcrumbs: Breadcrumb[];
}

defineProps<BreadcrumbsProps>();
</script>

<style lang="scss" scoped>
.breadcrumb__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 20px;
    font-family: 'Nunito';
    font-size: 14px;
    line-height: 19.1px;
    font-weight: 400;
    list-style: none;
    color: #A3A3A3;
    padding-top: 40px;

    @media (max-width: 360px) {
        margin-bottom: 20px;
    }
}
</style>

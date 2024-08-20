<template>
    <li :class="classes">
        <router-link
            :to="{
                name: breadcrumb.name,
                params: breadcrumb.params,
                query: breadcrumb.query,
            }"
        >
            {{ breadcrumb.label }}
        </router-link>

        <span v-if="!active" class="breadcrumb__separator">/</span>
    </li>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { BreadcrumbProps } from '../types';

const props = withDefaults(defineProps<BreadcrumbProps>(), {
    active: false,
});

const classes = computed(() => ({
    breadcrumb: true,
    active: props.active,
}));
</script>

<style lang="scss" scoped>
.breadcrumb__separator {
    margin-left: 5px;
    margin-right: 5px;
}

.breadcrumb a {
   color: #A3A3A3;
   text-decoration: none;
}

.breadcrumb.active a {
    color: black;
    background-color: transparent;
    border: none;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    max-width: 600px;
}
</style>

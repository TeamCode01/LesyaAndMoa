<template>
    <div>
        <app-breadcrumbs v-if="!hidden" :breadcrumbs="breadcrumbs" />
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useUserStore } from '@layouts/stores/user';
import { AppBreadcrumbs, useBreadcrumbsStore } from '@shared/index';
import { storeToRefs } from 'pinia';
const { breadcrumbs, hidden } = storeToRefs(useBreadcrumbsStore());
const { toggleHideBreadcrumbs, setHideBreadcrumbs } = useBreadcrumbsStore();

const userStore = useUserStore();

watch(
    () => userStore.currentUser,
    (newId) => {
        if (
            localStorage.getItem('type') === 'индивидуальный' &&
            localStorage.getItem('Token') !== null
        ) {
            userStore.getChildren();
            console.log('getChildren');
        }
        if (
            localStorage.getItem('type') === 'групповой' &&
            localStorage.getItem('Token') !== null
        ) {
            userStore.getGroups();
            console.log('ggg');
        }
         else {
            return false;
        }
    },
);

onMounted(async () => {
    if (localStorage.getItem('Token') !== null) {
        await userStore.getUser();
    }
});
</script>

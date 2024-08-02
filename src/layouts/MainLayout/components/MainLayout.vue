<template>
    <div>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup>
import { useUserStore } from '@layouts/stores/user';
import { onMounted } from 'vue';

const userStore = useUserStore();

onMounted(() => {
    userStore.getUser();
    userStore.getChildren();
})

</script>

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
import { onMounted, watch } from 'vue';

const userStore = useUserStore();

watch(() => userStore.currentUser,
    (newUser) => {
        if (!newUser && userStore.currentUser.tasks_type !== 'индивидуальный') {
            return
        }
        userStore.getChildren();
    })

onMounted(() => {
    if (localStorage.getItem('Token') !== null) {
        userStore.getUser();
    }
})

</script>

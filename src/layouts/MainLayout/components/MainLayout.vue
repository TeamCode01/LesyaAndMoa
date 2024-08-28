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
import { onMounted, watch } from "vue";
import { useUserStore } from "@layouts/stores/user";
import { AppBreadcrumbs, useBreadcrumbsStore } from '@shared/index';
import { storeToRefs } from 'pinia';
const { breadcrumbs, hidden } = storeToRefs(useBreadcrumbsStore());


const userStore = useUserStore();
console.log('hid', hidden.value);

watch(
  () => userStore.currentUser,
  (newId) => {
    if (localStorage.getItem("type") !== "групповой" && localStorage.getItem("Token") !== null) {
      userStore.getChildren();
    } else {
      return false;
    }

  }
);


onMounted(async () => {
  if (localStorage.getItem("Token") !== null) {
    await userStore.getUser();
  }
});
</script>

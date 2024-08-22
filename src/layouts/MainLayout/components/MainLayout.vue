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
import { useUserStore } from "@layouts/stores/user";
import { AppBreadcrumbs, useBreadcrumbsStore } from '@shared/index';
const { breadcrumbs, hidden } = storeToRefs(useBreadcrumbsStore());
import { storeToRefs } from 'pinia';
import { onMounted, watch } from "vue";
const userStore = useUserStore();

watch(
  () => userStore.currentUser,
  (newId) => {
    if (localStorage.getItem("type") === "групповой") {
      return false;
    }
    userStore.getChildren();
  }
);
onMounted(async () => {
  if (localStorage.getItem("Token") !== null) {
    await userStore.getUser();
  }
});
</script>

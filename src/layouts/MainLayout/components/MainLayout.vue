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
import { useUserStore } from "@layouts/stores/user";
import { onMounted, watch } from "vue";

const userStore = useUserStore();

onMounted(async () => {
  if (localStorage.getItem("Token") !== null) {
    await userStore.getUser();
  }
  if (userStore.currentUser.tasks_type === "индивидуальный") {
    await userStore.getChildren();
  }
});
</script>

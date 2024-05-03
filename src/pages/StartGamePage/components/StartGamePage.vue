<template>
  <div class="container">
    <div class="game">
      <Sidebar />
      <div class="game_img">
        <img src="@app/assets/backgrounds/animals.jpg" alt="game">
      </div>
    </div>
  </div>
</template>
<script setup>
import { Sidebar } from "@widgets/SideBarGame";

</script>
<style lang="scss" scoped>
.game {
  display: flex;
  padding: 60px 0px;
}

img {
  @media (max-width: 1024px) {
    height: 470px;
    max-width: 565px;
    width: 100%;
  }
}
</style>
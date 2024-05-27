<template>
  <div class="container-game">
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

.container-game {
  margin: 0px auto;
  padding: 0 120px;
  max-width: 1200px;
  @media (max-width: 1024px) {
    height: 470px;
    max-width: 944px;
    width: 100%;
  }
}

img {
  max-width: 832px;
  width: 100%;
  height: 600px;
  @media (max-width: 1024px) {
    height: 470px;
    max-width: 565px;
    width: 100%;
  }
}
</style>
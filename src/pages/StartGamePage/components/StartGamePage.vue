<template>
  <div class="container-game">
    <div class="game">
      <Sidebar @send-img="sendImg" />
      <div class="game_icons_wrap">
        <div class="game_icons_item"><img src="@app/assets/icons/sound.svg" alt="sound"></div>
        <div class="game_icons_item"><img src="@app/assets/icons/refresh.svg" alt="refresh"></div>
        <div class="game_icons_item"><img src="@app/assets/icons/playGame.svg" alt="play"></div>
      </div>
      <div class="game_img">
        <img class="game_img_bg" id="background-banner"  alt="game">
      </div>
    </div>
  </div>
</template>
<script setup>
import { Sidebar } from "@widgets/SideBarGame";
import { ref, onMounted } from 'vue';

let img = ref('/assets/backgrounds/animals.jpg');


const sendImg = (image) => {
    img.value = image;
    document.getElementById('background-banner').src = image
}

onMounted(() => {
  document.getElementById('background-banner').src = img.value
})

</script>
<style lang="scss" scoped>
.game {
  display: flex;
  padding: 56px 40px 56px 40px;
  margin: 60px 0px 90px 0px;
  background-color: $pink;
  border-radius: 20px;
  position: relative;

  &_img {
    width: 100%;


    &_bg {
      max-width: 100%;
      border-radius: 20px;
      width: 100%;
      height: 530px;

      @media (max-width: 1024px) {
        height: 400px;
        max-width: 100%;
      }
    }
  }

  &_icons {
    &_item {
      width: 40px;
      height: 40px;
      background-color: #E6F2FA;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &_wrap {
      display: flex;
      column-gap: 8px;
      align-items: center;
      position: absolute;
      top: 15px;
      right: 16px;

    }
  }
}

.container-game {
  margin: 0px auto;
  padding: 0 120px;
  max-width: 100%;

  @media (max-width: 1024px) {
    height: 470px;
    max-width: 100%;
  }
}
</style>

<template>
  <div class="container-game">
    <div class="game">
      <Sidebar @send-img="sendImg" @send-audio="sendAudio" />
      <div class="game_icons_wrap">
        <div class="game_icons_item" @click="pause()"><img src="@app/assets/icons/sound.svg" alt="sound"></div>
        <div class="game_icons_item" @click="refresh()"><img src="@app/assets/icons/refresh.svg" alt="refresh"></div>
        <div class="game_icons_item" @click="skip()">
          <img src="@app/assets/icons/playGame.svg" alt="play">
        </div>

      </div>
      <div class="game_img" @click="playSound($event)">
        <img class="game_img_bg" id="background-banner" alt="game">
      </div>
    </div>
  </div>
</template>
<script setup>
import { Sidebar } from "@widgets/SideBarGame";
import { event } from "quasar";
import { ref, onMounted } from 'vue';

let img = ref('/assets/backgrounds/animals.jpg');
let audio = ref('/assets/audio/Task1/11.1_.mp3');


const sendImg = (image) => {
  img.value = image;
  document.getElementById('background-banner').src = image
}

const sendAudio = (music) => {
  audio.value = music;
  console.log(audio.value, music)
}

const pause = (event) => {
  const startAudio = new Audio(audio.value);
  if (startAudio.paused) {
    startAudio.play();
  } else {
    startAudio.pause();
  }
}

const refresh = (event) => {
  const startAudio = new Audio(audio.value);
  startAudio.currentTime = 0;
  startAudio.play()
}

const playSound = (event) => {
  event.preventDefault();
  const startAudio = new Audio(audio.value);
  startAudio.play();
  if (event.target) {
    console.log('sss');
    return false;

  } else {
    console.log('rrrr')

  }

}

onMounted(() => {
  document.getElementById('background-banner').src = img.value
})

</script>
<style lang="scss" scoped>
// .phone {
//   position: absolute;
//   cursor: pointer;
//   width: 20px;
//   height: 20px;
//   background-color: red;
// }
.game {
  display: flex;
  padding: 56px 40px 56px 40px;
  margin: 60px 0px 90px 0px;
  background-color: $pink;
  border-radius: 20px;
  position: relative;

  &_img {
    width: 100%;
    cursor: pointer;

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

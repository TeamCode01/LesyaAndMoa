<template>
  <div class="container-game">
    <div class="game">
      <Sidebar :audio-obj="startAudio" :childId="childId" :show="showBtn" @send-img="sendImg" @send-audio="sendAudio"
        @show="showButton" @hand="showHand" @send-id="getId" />
      <div class="game_icons_wrap">
        <div class="game_icons_item" @click="mute()"><img v-show="isMuted === false" src="@app/assets/icons/sound.svg"
            alt="sound"><img v-show="isMuted === true" src="@app/assets/icons/muted.svg" alt=""></div>
        <div class="game_icons_item" @click="refresh()"><img src="@app/assets/icons/refresh.svg" alt="refresh"></div>
        <div class="game_icons_item" @click="skip()">
          <img src="@app/assets/icons/playGame.svg" alt="play">
        </div>

      </div>
      <img v-show="show_hand === true" class="hand" src="@app/assets/icons/hand.svg" alt="hand">
      <div class="game_img" @click="playSound($event)">

        <img class="game_img_bg" id="background-banner" alt="game">
      </div>
    </div>
  </div>
</template>
<script setup>
import { Sidebar } from "@widgets/SideBarGame";
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { HTTP } from '@app/http';
import gameActions from '@mixins/gameAction';
import { useAnswerStore } from "@layouts/stores/answers";


const { methods } = gameActions;
const { startGameRequest } = methods;
const answerStore = useAnswerStore();
let img = ref('/assets/backgrounds/animals.jpg');
let audio = ref('/assets/audio/Task1/11.1_.mp3');
const ids = ref([1, 2, 3, 4, 5, 6, 7, 8, 16, 18]);
const showBtn = ref(false);
const route = useRoute();
const show_hand = ref(false);
const task_id = ref(0);
let childId = route.params.idChildOrGroup;
const startAudio = ref(new Audio());
// const startAudio_Two = ref(null);
const isPlaying = ref(false);
const isMuted = ref(false);
const sendImg = (image) => {
  img.value = image;
  document.getElementById('background-banner').src = image
}

const sendAudio = (music) => {
  audio.value = music;
}

// const sendAudioV = (music) => {
//   startAudio_Two.value = new Audio();
//   startAudio_Two.value.src = music;
//   console.log('log', music, startAudio_Two.value.src, startAudio_Two.value);
// }

const showButton = (show) => {
  showBtn.value = show;
}

const getId = (id) => {
  task_id.value = id;
}

const showHand = (show) => {
  show_hand.value = show;
}


const mute = () => {
  isMuted.value = !isMuted.value
  if (isMuted.value === true) {
    console.log('1 mute')
    startAudio.value.volume = 0
  } else {
    console.log('2 mute')
    startAudio.value.volume = 1;
  }
}
const skip = () => {
  startAudio.value.src = ''
  showBtn.value = true;
}

const refresh = () => {
  startAudio.value.currentTime = 0;
}

const playSound = () => {
  if (ids.value.includes(task_id.value)) {
    startAudio.value.src = audio.value;
    show_hand.value = false;
    startAudio.value.play();
    startAudio.value.addEventListener('ended', () => {
      showBtn.value = true;
    })
  }
}

watch(
  () => route.params.id,
  (newId) => {
    if (!newId) {
      return;
    }
    childId = newId;
    console.log(childId);
  }
);

onMounted(() => {
  showHand();
  document.getElementById('background-banner').src = img.value
})

</script>
<style lang="scss" scoped>
.hand {
  position: absolute;
  right: 50%;
  bottom: 30%;
  transform: translate(-50%, -50%);
}

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

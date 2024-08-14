<template>
  <div class="container-game" v-show="windowWidth >= 1024">
    <div class="game">
      <Sidebar :childId="childId" :show="showBtn" @send-img="sendImg" @send-audio="sendAudio" @show="showButton" />
      <div class="game_icons_wrap">
        <div class="game_icons_item" @click="mute()"><img v-show="isMuted === false" src="@app/assets/icons/sound.svg"
            alt="sound"><img v-show="isMuted === true" src="@app/assets/icons/muted.svg" alt=""></div>
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
  <div class="container-game_mobile" v-show="windowWidth < 1024">
    <div>
      <div v-for="taskNumber in 18" :key="taskNumber">
        {{`Задание ${taskNumber}`}}
      </div>
    </div>
    <p class="mobile-text">
      Чтобы полноценно использовать игры, необходимо разрешение экрана от 1024 px. Пожалуйста воспользуйтесь планшетом или компьютером. Мы ждем вас на нашем сайте
    </p>

    <img src="@app/assets/img/StartGamePage/MoaStartGamePage.png" alt="" class="mobile-img">
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
const showBtn = ref(false);
const route = useRoute();
let answerId = ref(0);
let childId = route.params.idChildOrGroup;
const startAudio = ref(new Audio());
const isPlaying = ref(false)
const isMuted = ref(false);
const windowWidth = ref(window.innerWidth);
const sendImg = (image) => {
  img.value = image;
  document.getElementById('background-banner').src = image
}



const sendAudio = (music) => {
  audio.value = music;
}

const showButton = (show) => {
  showBtn.value = show;
}

// const startTask = (id) => {
//   let answer = answerStore.answers.find((item) => item.id === id);
//   console.log('answer', answer);
//   startGameRequest(childId, id)
// }

const mute = () => {
  isMuted.value = !isMuted.value
  if (isMuted.value === true) {
    startAudio.value.volume = 0
  } else {
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
  startAudio.value.src = audio.value;
  startAudio.value.play();
  startAudio.value.addEventListener('ended', () => {
    showBtn.value = true;
  })
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

// watch(
//   () => answerStore.answers,
//   (newAnswers) => {
//     if(!newAnswers) {
//       return
//     }
//     answerStore.answers = newAnswers;
//     console.log(answerStore.answers);
//   }
// );


onMounted(() => {

  document.getElementById('background-banner').src = img.value

  window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth
        
    })

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

  &_mobile {
    min-width: 360px;
    width: 100%;
    padding: 0 26px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .mobile-text{
      font-size: 16px;
      font-weight: 400;
      margin-top: 60px;
      text-align: center;
    }

    .mobile-img{
      width: 303px;
    }
  }


}
</style>

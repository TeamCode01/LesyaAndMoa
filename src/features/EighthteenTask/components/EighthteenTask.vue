<template>
  <div class="EighthteenTask">
    <div class="EighthteenTask__wrapper">
      <div class="close" @click="hide">
        <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
      </div>
      <div class="time">
        <Timer :time="15"></Timer>
        <p class="title-h4 EighthteenTask__title">Прочитай текст, запиши его в поле ответа.</p>
      </div>

      <div class="EighthteenTask__task">
        <img src="@app/assets/backgrounds/pictureWords.png"></img>
      </div>
      <input class="EighthteenTask__answer" v-model="answer">
      </input>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Button } from '@shared/components/buttons';
import arrow from '@app/assets/icons/Arrow.svg';
import { Timer } from '@shared/components/timer';
const emit = defineEmits(['close']);

const hide = () => {
  emit('close');
};

const answer = ref('');
</script>
<style lang="scss" scoped>
.time {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 28px;
}
.EighthteenTask {
  position: absolute;
  left: 0;
  right: 0;
  top: 17.4%;
  bottom: 0;
  background-color: white;
  z-index: 999;
  border-radius: 20px;
  background-color: #fff;
  max-height: 600px;

  &__title {
    text-align: center;
    font-size: 24px;
    font-weight: medium;
    font-family: 'Nunito';
  }

  &__task {
    img {
      display: block;
      margin: 40px auto;
    }

  }

  &__wrapper {
    padding: 30px 60px 67px 60px;
  }

  &__answer {
    background-color: $blueGame;
    width: 100%;
    padding: 20px 100px;
    color: #4E3B7F;
    font-size: 22px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    border-radius: 20px;
    margin-top: 20px;
    border: none;
    resize: none;
    overflow-y: hidden;
    outline: none;
    height: 100px;
  }

  &__btn {
    max-width: 280px;
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 32px;
    margin: 0 auto;

    @media (max-width: 1024px) {
      max-width: 212px;
      height: 48px;
      column-gap: 28px;
    }
  }
}

.close {
  cursor: pointer;
}
</style>
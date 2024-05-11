<template>
  <div class="SecondTask">
    <div class="SecondTask__wrapper">
      <div class="close" @click="hide">
        <img class="close-icon" src="@app/assets/icons/icon-close.svg" alt="крест" />
      </div>
      <Timer :time="15"></Timer>
      <h4 class="title-h4 SecondTask__title">Выбери нужный АЛФАВИТ.</h4>
      <div class="SecondTask__wrapper_block">
        <div class="SecondTask__wrapper_block_item"><img src="@app/assets/backgrounds/english.png" alt="english"></div>
        <div class="SecondTask__wrapper_block_item"><img src="@app/assets/backgrounds/russian.png" alt="russian"></div>
        <div class="SecondTask__wrapper_block_item"><img src="@app/assets/backgrounds/arabic.png" alt="arabic"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['close']);

const hide = () => {
  emit('close');
};

</script>
<style lang="scss" scoped>
.SecondTask {
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
    font-weight: 500;
    font-family: 'Nunito', sans-serif;
    max-width: 700px;
    margin: 0px auto;
  }

  .close {
    cursor: pointer;
  }

  &__wrapper {
    padding: 30px 67px 60px 60px;

    &_block {
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 41px;
      margin-top: 68px;
      &_item {
        background-color: #D2EFFF;
        border-radius: 20px;
       width: 316px;
       height: 256px;
       padding: 45.5px 60px;
       cursor: pointer;
       img {
        display: block;
        margin: 0px auto;
       }
      }
    }
  }

}
</style>
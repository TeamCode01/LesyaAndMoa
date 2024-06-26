<template>
  <div class="SecondTask">
    <div class="SecondTask__wrapper">
      <div class="close" @click="hide">
        <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
      </div>
      <div class="time">
        <Timer :end="end"></Timer>
        <p class="title-h4 SecondTask__title">Выбери нужный АЛФАВИТ.</p>
      </div>
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
import { Timer } from '@shared/components/timer';
const emit = defineEmits(['close']);
const props = defineProps({
  end: {
    type: Boolean,
    required: false,
  },
})
const hide = () => {
  emit('close');
};

</script>
<style lang="scss" scoped>
.time {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 28px;
}

.SecondTask {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  border-radius: 20px;
  background-color: #fff;
  width: 100%;
  max-width: 1200px;
  height: 600px;

  @media (max-width: 1024px) {
    height: 470px;
    max-width: 944px;
    width: 100%;
  }

  &__title {
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    font-family: 'Nunito', sans-serif;
    max-width: 700px;

    @media (max-width: 1024px) {
      font-size: 20px;
    }
  }

  .close {
    right: 20px;
    top: 20px;
    position: absolute;
    cursor: pointer;
  }

  &__wrapper {
    padding: 30px 100px;
    position: relative;

    @media (max-width: 1024px) {
      padding: 30px 60px;
    }

    &_block {
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 41px;
      margin-top: 68px;

      &_item {
        background-color: #D2EFFF;
        border-radius: 20px;
        max-width: 316px;
        width: 100%;
        height: 256px;
        padding: 45.5px 60px;
        cursor: pointer;

        @media (max-width: 1024px) {
          max-width: 276px;
          height: 215px;
          padding: 32px 40px;
        }

        img {
          display: block;
          margin: 0px auto;
        }
      }
    }
  }

}
</style>
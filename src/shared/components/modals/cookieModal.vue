<template>
  <div class="cookie">
    <div class="cookie-wrapper">
      <div @click="handleClose" class="close icon-closed cookie-closed">
        <img class="close-icon" src="@app/assets/icons/icon-close.svg" alt="крест" />
      </div>
      <p class="cookie-text">Наш сайт использует куки. Продолжая им пользоваться, вы соглашаетесь на обработку
        персональных данных
        в соответствии с <router-link class="cookie-link" to="/policy-page">политикой конфиденциальности</router-link> 
      </p>
      <Button @click="accept" label="Хорошо, принимаю" class="cookie-btn" />
    </div>
  </div>

</template>
<script setup>
import { Button } from '@shared/components/buttons';

const emit = defineEmits(['close', 'accept']);

const handleClose = () => {
  emit('close');
}
const accept = () => {
  emit('accept');
}

</script>
<style lang="scss" scoped>
.cookie {
  position: fixed;;
  bottom: 20px;
  right: 5vh;
  background-color: white;
  border-radius: 10px;
  z-index: 100;
  max-width: 464px;
  width: 100%;

  &-wrapper {
    padding: 40px;
    position: relative;
  }
  &-closed {
    right: 2%;
  }

  &-text, &-link {
    font-size: 16px;
    font-weight: 400;
    line-height: 21.82px;
    font-family: 'Nunito';
    color: #313131;
  }

  &-btn {
    margin-top: 28px;
    background-color: #4D65E5;
    color: white;
    font-size: 20px;
    font-weight: 600px;
    width: 100%;
  }
}
</style>
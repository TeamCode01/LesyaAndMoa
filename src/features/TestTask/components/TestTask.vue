<template>
  <div class="TestTask">
    <div class="TestTask__wrapper">
      <div class="close" @click="hide">
        <img class="close-icon" src="@app/assets/icons/icon-close.svg" alt="крест" />
      </div>
      <p class="title-h4 TestTask__title"> Вставь пропущенные слова.</p>
      <div class="TestTask__task">
        Необыкновенные пришельцы Леся и Моа, не знающие нашего<br> <input class="answer_input" v-model="answer" maxlength="5" type="text"
          placeholder="_ _ _ _ _">, оказались на нашей планете. Они, словно немые <input class="answer_input"
          v-model="answer_two" type="text"  maxlength="5" placeholder="_ _ _ _ _">,<br> не могут объяснить нам на своём языке, который для
        нас звучит,<br> как <input class="answer_input" v-model="answer_three" type="text"  maxlength="6" placeholder="_ _ _ _ _ _">,
        чего же они хотят. Мы постараемся <input class="answer_input" v-model="answer_four"  maxlength="7" type="text"
          placeholder="_ _ _ _ _ _ _"> стекло<br> недопонимания между нами и <input class="answer_input"
          v-model="answer_five" type="text"  maxlength="6" placeholder="_ _ _ _ _ _ "> им.
      </div>
      <Button class="TestTask__btn" :isImage="true" :image="arrow" label="Ответить" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { Button } from '@shared/components/buttons';
import arrow from '@app/assets/icons/Arrow.svg';
const emit = defineEmits(['close']);

const hide = () => {
  emit('close');
};

const answer = ref('');
const answer_two = ref('');
const answer_three = ref('');
const answer_four = ref('');
const answer_five = ref('');

</script>
<style lang="scss" scoped>
.TestTask {
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
    border: 2px solid #E2D6F9;
    margin: 50px auto;
    padding: 40px;
    color: #4E3B7F;
    font-size: 24px;
    font-family: 'Nunito';
    font-weight: 600;
     max-width: 870px;
    line-height: 40px;

  }

  &__wrapper {
    padding: 30px 60px 67px 60px;
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

.answer_input {
  border: none;
  color: #4E3B7F;
  font-size: 24px;
  font-family: 'Nunito';
  font-weight: 600;
  max-width: 90px;
  line-height: 40px;
  height: 20px;
  outline: none;
}
</style>
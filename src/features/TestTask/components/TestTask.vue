<template>
  <template v-if="endGame === false">
    <div class="TestTask">
      <div class="TestTask__wrapper">
        <div class="close" @click="hide">
          <img class="close-icon" src="@app/assets/icons/icon-close.svg" alt="крест" />
        </div>
        <p class="title-h4 TestTask__title"> Вставь пропущенные слова.</p>
        <div class="TestTask__task">
          Необыкновенные пришельцы Леся и Моа, не знающие нашего<br> <input class="answer_input" v-model="answer"
            maxlength="5" type="text" placeholder="_ _ _ _ _">, оказались на нашей планете. Они, словно немые <input
            class="answer_input" v-model="answer_two" type="text" maxlength="5" placeholder="_ _ _ _ _">,<br> не могут
          объяснить нам на своём языке, который для
          нас звучит,<br> как <input class="answer_input" v-model="answer_three" type="text" maxlength="6"
            placeholder="_ _ _ _ _ _">,
          чего же они хотят. Мы постараемся <input class="answer_input" v-model="answer_four" maxlength="7" type="text"
            placeholder="_ _ _ _ _ _ _"> стекло<br> недопонимания между нами и <input class="answer_input"
            v-model="answer_five" type="text" maxlength="6" placeholder="_ _ _ _ _ _ "> им.
        </div>
        <Button class="TestTask__btn" :isImage="true" :image="arrow" @click="checkAnswer()" label="Ответить" />
      </div>
      <!-- <p v-if="finished === true">{{ correct }}</p> -->
    </div>
  </template>
  <TaskResultBanner :is_test="true"  bg="/assets/backgrounds/Moa.png"
    text="Молодец! Ты полностью справился с заданием. Теперь ты можешь помочь и Лесе с Моа тоже научиться понимать нас."
    v-if="show === true && correct === 5" @hide="hideModal"></TaskResultBanner>
  <TaskResultBanner :is_test="true" bg="/assets/backgrounds/Moa.png"
    text="Здорово! Ты почти всё верно выполнил. Помоги теперь Лесе и Моа научиться понимать нас."
    v-if="show === true && correct === 4" @hide="hideModal"></TaskResultBanner>
  <TaskResultBanner :is_test="true"  bg="/assets/backgrounds/Moa.png"
    text="Неплохо, ты верно выполнил задание больше, чем наполовину. Ты можешь помочь Лесе и Моа научиться понимать нас."
    v-if="show === true && correct === 3" @hide="hideModal"></TaskResultBanner>
  <TaskResultBanner :is_test="true"  bg="/assets/backgrounds/Moa.png"
    text=" Неплохо, ты попробовал понять текст. А Леся и Моа не понимают нас совсем. Только ты можешь помочь им."
    v-if="show === true && (correct === 2 || correct === 1)" @hide="hideModal"></TaskResultBanner>
  <TaskResultBanner :is_test="true"  bg="/assets/backgrounds/Moa.png" text="Попробуй помочь нашим героям! У тебя все получится!"
    v-if="show === true && correct === 0" @hide="hideModal"></TaskResultBanner>
</template>
<script setup>
import { ref } from 'vue';
import { Button } from '@shared/components/buttons';
import arrow from '@app/assets/icons/Arrow.svg';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
const emit = defineEmits(['close']);

const hide = () => {
  emit('close');
  endGame.value = true;
};

const show = ref(false);
const hideModal = () => {
  show.value = false;
}

const answer = ref('');
const answer_two = ref('');
const answer_three = ref('');
const answer_four = ref('');
const answer_five = ref('');
const endGame = ref(false);
const correct = ref(0);

const answer_finish = ref('языка');
const answer_two_finish = ref('рыбы');
const answer_three_finish = ref('музыка');
const answer_four_finish = ref('разбить');
const answer_five_finish = ref('помочь');

const checkAnswer = () => {
  if (answer.value === answer_finish.value) {
    correct.value++;
  }
  if (answer_two.value === answer_two_finish.value) {
    correct.value++;
  }
  if (answer_three.value === answer_three_finish.value) {
    correct.value++;
  }
  if (answer_four.value === answer_four_finish.value) {
    correct.value++;
  }
  if (answer_five.value === answer_five_finish.value) {
    correct.value++;
  }

  endGame.value = true;
  show.value = true;
}

</script>
<style lang="scss" scoped>
.TestTask {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 999;
  border-radius: 20px;
  height: 600px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 1024px) {
    height: 470px;
    max-width: 944px;
    width: 100%;
  }

  &__title {
    text-align: center;
    font-size: 24px;
    font-weight: medium;
    font-family: 'Nunito';

    @media (max-width: 1024px) {
      font-size: 20px;
    }
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
    padding: 30px 0px 73px 0px;
    position: relative;

    @media (max-width: 1024px) {
      padding: 30px 0px 45px 0px;
    }
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

.close {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>
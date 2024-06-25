<template>
  <div class="ElevenTask">
    <div class="ElevenTask__wrapper">

      <img @click="hide" class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />

      <div class="time">
        <Timer :time="15"></Timer>
        <p class="title-h4 ElevenTask__title">
          Собери слова из двух частей, угадай,
          из какой сказки эти герои.
        </p>
      </div>
      <div class="ElevenTask__content">
        <div class="fairy_tales__wrapper hide">
          <div class="fairy_tales__item" @click="chooseFairyTail()" v-for="item in fairytails" :key="item"> <span>«{{
            item.name }}»</span> </div>
        </div>

        <div class="draggable-list">
          <q-btn class="list-group-item item" v-for="(item, index) in syllables" :key="item.id" draggable="true"
            @dragstart="drag($event, item.name, index)" @dragover.prevent :value="item">
            {{ item.name }}
          </q-btn>
        </div>
        <div class="finish_words__wrapper hide">
          <div class="finish_words__item" v-for="item in finish_answers" :key="item">{{ item }}</div>
        </div>
        <div class="inputs">
          <div class="input-group"><input @drop="drop($event, 1, 1)" type="text" class="input-item row1 part1"><input
              @drop="drop($event, 2, 1)" type="text" class="input-item row1 part2">

            <input @drop="drop($event, 1, 2)" type="text" class="input-item row2 part1"><input
              @drop="drop($event, 2, 2)" type="text" class="input-item row2 part2">

            <input @drop="drop($event, 1, 3)" type="text" class="input-item row3 part1"><input
              @drop="drop($event, 2, 3)" type="text" class="input-item row3 part2">

            <input @drop="drop($event, 1, 4)" type="text" class="input-item row4 part1"><input
              @drop="drop($event, 2, 4)" type="text" class="input-item row4 part2"><input @drop="drop($event, 1, 5)"
              type="text" class="input-item row5 part1"><input @drop="drop($event, 2, 5)" type="text"
              class="input-item row5 part2">

            <input @drop="drop($event, 1, 6)" type="text" class="input-item row6 part1"><input
              @drop="drop($event, 2, 6)" type="text" class="input-item row6 part2">
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { Timer } from "@shared/components/timer";
const emit = defineEmits(["close"]);

const hide = () => {
  emit("close");
};


const syllables = ref([{ id: 1, name: 'МЫШ', part: 1 }, { id: 2, name: 'ГУШКА', part: 2 }, { id: 3, name: 'ЛЯ', part: 1 }, { id: 4, name: 'ЧИК', part: 2 }, { id: 5, name: 'ЗАЙ', part: 1 }, { id: 6, name: 'СИЧКА', part: 2 }, { id: 7, name: 'ЛИ', part: 1 }, { id: 8, name: 'КА', part: 2 }, { id: 9, name: 'ВОЛ', part: 1 }, { id: 10, name: 'ВЕДЬ', part: 2 }, { id: 11, name: 'МЕД', part: 1 }, { id: 12, name: 'ЧОК', part: 2 }]);
const dropIndex = ref(syllables.value.length - 1);
const drag = (event, syllable, index) => {
  event.dataTransfer.setData("text", syllable);
  dropIndex.value = index;
}
const finish_answers = ref([]);
const fairytails = ref([{ id: 1, name: 'ТРИ МЕДВЕДЯ', correct: false }, { id: 2, name: 'ТЕРЕМОК', correct: true }, { id: 3, name: 'РЕПКА', correct: false }, { id: 4, name: 'КОЛОБОК', correct: false }, { id: 5, name: 'ГУСИ-ЛЕБЕДИ', correct: false }]);

const answers = ref(['зайчик', 'мышка', 'лягушка', 'лисичка', 'медведь', 'волчок']);


const drop = (event, part, row) => {
  event.preventDefault();
  if (syllables.value[dropIndex.value].part != part) {
    return false
  }
  let text = event.dataTransfer.getData("text");
  let secondPart = part == 1 ? 2 : 1;
  let element = document.querySelector('.row' + row + '.part' + secondPart);
  let firstBlock = document.querySelector('.draggable-list');
  let secondBlock = document.querySelector('.fairy_tales__wrapper');
  let finishAnswer = document.querySelector('.finish_words__wrapper');
  let starterInputs = document.querySelector('.inputs');
  if (!element.value.length) {
    event.target.value = text;
    syllables.value.splice(dropIndex.value, 1);
    event.target.classList.add('item')
  } else {
    let word = part == 1 ? (text + element.value) : (element.value + text);

    if (answers.value.includes(word.toLowerCase())) {
      event.target.value = text;
      finish_answers.value.push(word.toLowerCase());
      syllables.value.splice(dropIndex.value, 1);
      event.target.classList.add('check')
      setTimeout(() => {
        event.target.classList.remove('check')
        event.target.classList.add('item');
      }, 1000)
      if (syllables.value.length == 0) {
        firstBlock.classList.add('hide');
        starterInputs.classList.add('hide');
        secondBlock.classList.remove('hide');
        finishAnswer.classList.remove('hide');
      }
    }
  }
}

const chooseFairyTail = () => {
  const correct = fairytails.value.find((item) => item.correct == true)
  if (correct) {
    setTimeout(() => {
      fairytails.value = fairytails.value.filter((item) => item.correct == true);
    }, 1000)
  } else {
    return false;
  }
}
const allowDrop = (event) => {
  event.preventDefault();
}

</script>
<style lang="scss" scoped>
.fairy_tales__wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}

.finish_words__wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 16px;

}

.finish_words__item {
  background-color: #D2EFFF;
  color: #000000;
  font-size: 20px;
  text-align: center;
  border-radius: 6px;
  font-weight: 500;
  text-align: center;
  font-family: "Nunito", sans-serif;
  height: 52px;
  padding: 13px 88px;
}

.finish_words__item::first-letter {
  text-transform: uppercase;
}

.fairy_tales__item {
  text-align: center;
  font-size: 24px;
  width: fit-content;
  margin: 0px auto;
  font-weight: 700;
  font-family: "Nunito", sans-serif;
  color: #0F5707;
  background-color: #B5F9AD;
  border-radius: 8px;
  padding: 9.5px 20px;
  cursor: pointer;
  border: none;
}

.time {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 28px;
}

.close-icon {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}

.input {
  &-item {
    width: 108px;
    height: 52px;
    border: none;
    background-color: #D2EFFF;
    border-radius: 6px;
    color: transparent;
    text-shadow: 0 0 0 black;
    outline: none;
  }

  &-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 16px;
    column-gap: 8px;
  }
}

.hide {
  display: none;
}

.show {
  display: block;
}

.ElevenTask {
  position: absolute;
  left: 12%;
  right: 0;
  top: 23.5%;
  bottom: 0;
  background-color: white;
  z-index: 999;
  border-radius: 20px;
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
    font-family: "Nunito", sans-serif;
    max-width: 450px;
    @media (max-width: 1024px) {
      font-size: 20px;
    }
  }

  &__content {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    width: 100%;
    column-gap: 160px;
    align-items: center;
    @media (max-width: 1024px) {
      margin-top: 30px;
      column-gap: 120px;
    }
  }

  .close {
    cursor: pointer;
  }

  &__wrapper {
    padding: 30px 76px 76px 76px;
  }
}

.draggable-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 16px;
  column-gap: 8px;

}

.item {
  width: 108px;
  height: 52px;
  background-color: #FFCCE4;
  color: #C62582;
  border-radius: 6px;
  font-size: 24px;
  font-family: 'Nunito';
  font-weight: 700;

  text-align: center;
  border: none;
  cursor: pointer;
}

.check {
  width: 108px;
  height: 52px;
  background-color: #FFCCE4;
  color: #C62582;
  border-radius: 6px;
  font-size: 24px;
  font-family: 'Nunito';
  font-weight: 700;
  text-align: center;
  border: 2px solid #5CCF54;

}

.fail {
  width: 108px;
  height: 52px;
  background-color: #FFCCE4;
  color: #C62582;
  border-radius: 6px;
  font-size: 24px;
  font-family: 'Nunito';
  font-weight: 700;
  text-align: center;
  border: 2px solid red;
}
</style>

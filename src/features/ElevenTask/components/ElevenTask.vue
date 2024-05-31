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
        <div class="draggable-list">
          <q-btn class="list-group-item item" v-for="(item, index) in syllables" :key="item.id" draggable="true"
            @dragstart="drag($event, item.name, index)" @dragover.prevent :value="item">
            {{ item.name }}
          </q-btn>
        </div>
        <div class="input-group"><input @drop="drop($event, 1, 1)" type="text" class="input-item"><input
            @drop="drop($event, 1, 2)" type="text" class="input-item"><input @drop="drop($event, 2, 1)" type="text"
            class="input-item"><input @drop="drop($event, 2, 2)" type="text" class="input-item"><input
            @drop="drop($event, 3, 1)" type="text" class="input-item"><input @drop="drop($event, 3, 2)" type="text"
            class="input-item"><input @drop="drop($event, 4, 1)" type="text" class="input-item"><input
            @drop="drop($event, 4, 2)" type="text" class="input-item"><input @drop="drop($event, 5, 1)" type="text"
            class="input-item"><input @drop="drop($event, 5, 2)" type="text" class="input-item"><input
            @drop="drop($event, 6, 1)" type="text" class="input-item"><input @drop="drop($event, 6, 2)" type="text"
            class="input-item">
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


const syllables = ref([{ id: 1, name: 'МЫШ' }, { id: 2, name: 'ГУШКА' }, { id: 3, name: 'ЛЯ' }, { id: 4, name: 'ЧИК' }, { id: 5, name: 'ЗАЙ' }, { id: 6, name: 'СИЧКА' }, { id: 7, name: 'ЛИ' }, { id: 8, name: 'КА' }, { id: 9, name: 'ВОЛ' }, { id: 10, name: 'ВЕДЬ' }, { id: 11, name: 'МЕД' }, { id: 12, name: 'ЧОК' }]);
const dropIndex = ref(syllables.value.length - 1);
const drag = (event, syllable, index) => {
  event.dataTransfer.setData("text", syllable);
  dropIndex.value = index;
}

const answers = ref({
  1: { 1: { answer: 'зай' }, 2: { answer: 'чик' } },
  2: { 1: { answer: 'мыш' }, 2: { answer: 'ка' } },
  3: { 1: { answer: 'ля' }, 2: { answer: 'гушка' } },
  4: { 1: { answer: 'ли' }, 2: { answer: 'сичка' } },
  5: { 1: { answer: 'мед' }, 2: { answer: 'ведь' } },
  6: { 1: { answer: 'вол' }, 2: { answer: 'чок' } },
});


const drop = (event, word, syl) => {
  event.preventDefault();
  let text = event.dataTransfer.getData("text");
  if (answers.value[word][syl].answer === text.toLowerCase()) {
    event.target.value = text;
    syllables.value.splice(dropIndex.value, 1);
    console.log(text);
    event.target.classList.add('check')
  } else {
    event.target.value = text;
    event.target.classList.add('fail')
    setTimeout(() => {
      event.target.value = '';
      event.target.classList.remove('fail')
    }, 1000)
  }
}


const allowDrop = (event) => {
  event.preventDefault();
}

</script>
<style lang="scss" scoped>
.time {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 28px;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 20px;
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

.ElevenTask {
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
    font-family: "Nunito", sans-serif;
    max-width: 450px;
  }

  &__content {
    margin-top: 48px;
    display: flex;
    justify-content: center;
    column-gap: 160px;
    align-items: center;
  }

  .close {
    cursor: pointer;
  }

  &__wrapper {
    padding: 30px 76px 76px 76px;
    height: 494px;
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

<template>
  <div class="FirstTask">

    <div class="FirstTask__wrapper">
      <div class="close" @click="hide">
        <img class="close-icon" src="@app/assets/icons/icon-close.svg" alt="крест" />
      </div>
      <Timer :time="15"></Timer>
      <h4 class="title-h4 FirstTask__title"> Составь рассказ про АЛФАВИТ из подходящих фраз.</h4>
      <div class="draggable-list ">
        <!-- <div class="list-group FirstTask__wrapper_block">
          <q-btn v-for="(item, index) in words" :key="index" class="list-group-item item" draggable="true"
            @dragstart="drag($event, index)" @dragover.prevent :value="item">
            {{ item }}
          </q-btn>
        </div>
      </div>
      <div class="FirstTask__wrapper_content">
        <q-btn v-for="(item, index) in words_two" :key="index" class="list-group-item item" draggable="true"
          @dragstart="drag($event, index)" @dragover.prevent :value="item">
          {{ item }}
        </q-btn>
      </div>
      <div class="FirstTask__wrapper_block">
        <q-btn v-for="(item, index) in words_three" :key="index" class="list-group-item item" draggable="true"
          @dragstart="drag($event, index)" @dragover.prevent :value="item">
          {{ item }}
        </q-btn>
      </div> -->
        <q-btn v-for="(item, index) in words" :key="index" class="list-group-item item" draggable="true"
          @dragstart="drag($event, index)" @dragover.prevent :value="item">
          {{ item }}
        </q-btn>
        </div>
        <textarea @drop="drop($event)" @dragover="allowDrop($event)" v-model="answer"
          class="FirstTask__wrapper_answer"></textarea>
      </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
const emit = defineEmits(['close']);

const hide = () => {
  emit('close');
};

const words = ref(['медведи и зайцы', 'Вместе они составляют АЛФАВИТ', 'в слоги и в слова.', 'В нашем языке', 'в леса и поля', 'есть иероглифы', 'и складываются', 'явления и предметы', 'есть буквы.', 'Все вместе они образуют МОЗАИКУ']);
const words_two = ref([]);
const words_three = ref([]);
const answer = ref('');
const dropIndex = ref(words.value.length -1);
const drag = (event, index) => {
  event.dataTransfer.setData("text", event.target.value);
  dropIndex.value = index;
}


const drop = (event) => {
  words.value.splice(dropIndex.value, 1);
  answer.value += ' ';
}

const allowDrop = (event) => {
  event.preventDefault();
}

</script>
<style lang="scss" scoped>

.draggable-list {
  display: flex;
  flex-wrap: wrap;
  column-gap: 133px;
  justify-content: center;
  row-gap: 48px;
  width: 100%;
  max-width: 1020px;
  margin: 48px auto;
}
.FirstTask {
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
  }

  &__wrapper {
    padding: 30px 60px 67px 60px;

    &_block {
      display: flex;
      justify-content: space-around;
      margin-top: 48px;
    }

    &_content {
      margin-top: 48px;
      display: flex;
      justify-content: space-between;
    }

    &_answer {
      background-color: $blueGame;
      width: 100%;
      padding: 35px 17px;
      color: #0F5707;
      font-size: 22px;
      font-weight: 700;
      font-family: 'Nunito', sans-serif;
      border-radius: 20px;
      margin-top: 20px;
      border: none;
      resize: none;
      overflow-y: hidden;
      height: 100px;
    }
  }

}

.item {
  background-color: $greenGame;
  padding: 12px 18px;
  color: #0F5707;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Nunito', sans-serif;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.close {
  cursor: pointer;
}
</style>
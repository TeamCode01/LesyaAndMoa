<template>
    <div class="FirstTask">
        <div class="FirstTask__wrapper">
            <div class="close" @click="hide">
                <img
                    class="close-icon"
                    src="@app/assets/icons/close-icon.svg"
                    alt="крест"
                />
            </div>
            <div class="time">
                <Timer :time="15"></Timer>
                <p class="title-h4 FirstTask__title">
                    Составь рассказ про АЛФАВИТ из подходящих фраз.
                </p>
            </div>

    <div class="FirstTask__wrapper">
      <div class="close" @click="hide">
        <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
      </div>
      <div class="time">
        <Timer :end="end"></Timer>
        <p class="title-h4 FirstTask__title"> Составь рассказ про АЛФАВИТ из подходящих фраз.</p>
      </div>

      <div class="draggable-list ">
        <q-btn v-for="(item, index) in words" :key="index.id" class="list-group-item item" draggable="true"
          @dragstart="drag($event, item.name, index)" @dragover.prevent :value="item.name">
          {{ item.name }}
        </q-btn>
      </div>
      <input @drop="drop($event)" @dragover="allowDrop($event)" v-model="answer" class="FirstTask__wrapper_answer"></input>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
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

const words = ref([{ id: 1, name: 'медведи и зайцы', index: 11 }, { id: 2, name: 'Вместе они составляют АЛФАВИТ', index: 2 }, { id: 3, name: 'в слоги и в слова.', index: 5 }, { id: 4, name: 'В нашем языке', index: 0 }, { id: 5, name: 'в леса и поля', index: 22 }, { id: 6, name: 'есть иероглифы', index: 81 }, { id: 7, name: 'и складываются', index: 3 }, { id: 8, name: 'явления и предметы', index: 7 }, { id: 9, name: 'есть буквы.', index: 1 }, { id: 10, name: 'Все вместе они образуют МОЗАИКУ', index: 9 }])
const wordsAnswer = ref([{ id: 1, name: 'В нашем языке', index: 0 }, { id: 2, name: 'есть буквы.', index: 1 }, { id: 3, name: 'Вместе они составляют АЛФАВИТ', index: 2 }, { id: 4, name: 'и складываются', index: 3 }, { id: 5, name: 'в слоги и в слова.', index: 4 }]);
const answer = ref('');
const dropIndex = ref(words.value.length - 1);
const drag = (event, word, index) => {
    event.dataTransfer.setData('text', word);
    dropIndex.value = index;
};

const drop = (event, word) => {
  event.preventDefault();
  let text = event.dataTransfer.getData("text");
  let correct = wordsAnswer.value.find((item) => item.name === text)
  if (correct) {
    words.value.splice(dropIndex.value, 1);
   answer.value += text + ' ';
  } else {
    return false;
  }
}

const allowDrop = (event) => {
    event.preventDefault();
};
</script>
<style lang="scss" scoped>
.time {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 28px;
}

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
    left: 12%;
    right: 0;
    top: 23.5%;
    bottom: 0;
    // background-color: white;
    z-index: 999;
    border-radius: 20px;
    background-color: #fff;
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
        font-weight: 500;
        font-family: 'Nunito', sans-serif;

        @media (max-width: 1024px) {
            font-size: 20px;
        }
    }

    &__wrapper {
        padding: 30px 60px 67px 60px;
        position: relative;
        height: 600px;

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
      text-shadow: 0 0 0 black;
      outline: none;
      resize: none;
      overflow-y: hidden;
      height: 100px;
    }
  }

        &_block {
            display: flex;
            justify-content: space-around;
            margin-top: 48px;

            @media (max-width: 1024px) {
                margin-top: 28px;
            }
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
            color: #0f5707;
            font-size: 22px;
            font-weight: 700;
            font-family: 'Nunito', sans-serif;
            border-radius: 20px;
            margin-top: 20px;
            border: none;
            outline: none;
            resize: none;
            overflow-y: hidden;
            height: 100px;
        }
    }
}

.item {
    background-color: $greenGame;
    padding: 12px 18px;
    color: #0f5707;
    font-size: 16px;
    font-weight: 600;
    font-family: 'Nunito', sans-serif;
    border-radius: 6px;
    border: none;
    cursor: pointer;
}

.close {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
}
</style>

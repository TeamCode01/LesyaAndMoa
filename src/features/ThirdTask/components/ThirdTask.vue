<template>
  <div class="ThirdTask" v-if="open">

    <div class="ThirdTask__wrapper">
      <div class="close" @click="hide">
        <img class="close-icon" src="@app/assets/icons/icon-close.svg" alt="крест" />
      </div>
      <h4 class="title-h4 ThirdTask__title"> Распредели звуки по коробкам на образуемые с помощью только шума, голоса
        и шума, только голоса.</h4>
      <div class="draggable-list ">
        <div class="list-group ThirdTask__wrapper_block">
          <q-btn v-for="(item, index) in letters" :key="index" class="list-group-item item" draggable="true"
            @dragstart="drag($event, index)" @dragover.prevent :value="item">
            {{ item }}
          </q-btn>
        </div>
      </div>
      <div class="ThirdTask__answer">
        <div class="box" @drop="drop($event)" @dragover="allowDrop($event)"></div>
        <div class="box2" @drop="dropTwo($event)" @dragover="allowDrop($event)"></div>
        <div class="box3" @drop="dropThree($event)" @dragover="allowDrop($event)"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next'
const emit = defineEmits(['close']);

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const hide = () => {
  emit('close');
};

const letters = ref(['к', 'ч', 'с', 'о', 'ф', 'з', 'и', 'г', 'д']);
const answer = ref('');
const dropIndex = ref(letters.value.length - 1);
const drag = (event, index) => {
  event.dataTransfer.setData("text", event.target.value);
  dropIndex.value = index;
}

const drop = (event) => {
  letters.value.splice(dropIndex.value, 1);
  answer.value += " " + event.dataTransfer.getData("text");
}

const allowDrop = (event) => {
  event.preventDefault();
}
</script>
<style lang="scss" scoped>
.box {
  background-image: url('@app/assets/creatures/box1.png');
  width: 279px;
  height: 226px;
}

.box2{
  background-image: url('@app/assets/creatures/box2.png');
  width: 279px;
  height: 226px;
}

.box3 {
  background-image: url('@app/assets/creatures/box3.png');
  width: 279px;
  height: 226px;
}

.ThirdTask {
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

  &__answer {
    display: flex;
    justify-content: center;
    column-gap: 50px;
  }

  &__wrapper {
    padding: 30px 67px 60px 60px;

    &_block {
      display: flex;
      justify-content: center;
      column-gap: 40px;
      margin-top: 60px;
      margin-bottom: 88px;
    }
  }

}

.item {
  background-color: $lightPink;
  text-transform: uppercase;
  padding: 9px 17px;
  color: $vihous;
  font-size: 24px;
  font-weight: 800;
  font-family: 'Nunito', sans-serif;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.close {
  cursor: pointer;
}
</style>
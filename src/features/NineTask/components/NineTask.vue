<template>
  <div class="NineTask">
    <div class="NineTask__wrapper">

        <img @click="hide" class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />

      <div class="time">
        <Timer :time="15"></Timer>
        <p class="title-h4 NineTask__title">
          Собери из букв одинакового размера названия предметов, которые встретились
          героям на детской площадке.
        </p>
      </div>
      <div class="NineTask__content">
        <div class="draggable-list">
          <q-btn class="list-group-item item" id="L" draggable="true" @dragstart="drag($event)" @dragover.prevent
            >
            Л
          </q-btn>
          <q-btn class="list-group-item item" id="B" draggable="true" @dragstart="drag($event)" @dragover.prevent
            >
            Б
          </q-btn>
          <q-btn class="list-group-item item" id="G" draggable="true" @dragstart="drag($event, index)" @dragover.prevent
            :value="item">
            Г
          </q-btn>
          <q-btn class="list-group-item item" id="m" draggable="true" @dragstart="drag($event, index)" @dragover.prevent
            :value="item">
            м
          </q-btn>
          <q-btn class="list-group-item item" id="E" draggable="true" @dragstart="drag($event, index)" @dragover.prevent
            :value="item">
            Е
          </q-btn>
          <q-btn class="list-group-item item" id="r" draggable="true" @dragstart="drag($event, index)" @dragover.prevent
            :value="item">
            р
          </q-btn>
          <q-btn class="list-group-item item" id="O" draggable="true" @dragstart="drag($event, index)" @dragover.prevent
            :value="item">
            О
          </q-btn>
          <q-btn class="list-group-item item" id="C" draggable="true" @dragstart="drag($event, index)" @dragover.prevent
            :value="item">
            С
          </q-btn>
          <q-btn class="list-group-item item" id="y" draggable="true" @dragstart="drag($event, index)" @dragover.prevent
            :value="item">
            у
          </q-btn>
          <q-btn class="list-group-item item" id="R" draggable="true" @dragstart="drag($event, index)" @dragover.prevent
            :value="item">
            Р
          </q-btn>
          <q-btn class="list-group-item item" id="E" draggable="true" @dragstart="drag($event, index)" @dragover.prevent
            :value="item">
            Е
          </q-btn>
          <q-btn class="list-group-item item" id="c" draggable="true" @dragstart="drag($event, index)" @dragover.prevent
            :value="item">
            с
          </q-btn>
          <q-btn class="list-group-item item" id="i" draggable="true" @dragstart="drag($event, index)" @dragover.prevent
            >
            ь
          </q-btn>
          <q-btn class="list-group-item item" id="ya" draggable="true" @dragstart="drag($event, index)"
            @dragover.prevent >
            я
          </q-btn>
          <q-btn class="list-group-item item" id="N" draggable="true" @dragstart="drag($event, index)" @dragover.prevent
            :value="item">
            Н
          </q-btn>
          <q-btn class="list-group-item item" id="YA" draggable="true" @dragstart="drag($event, index)"
            @dragover.prevent :value="item">
            я
          </q-btn>
          <q-btn class="list-group-item item" id="k" draggable="true" @dragstart="drag($event, index)" @dragover.prevent
            :value="item">
            К
          </q-btn>
          <q-btn class="list-group-item item" id="K" draggable="true" @dragstart="drag($event, index)" @dragover.prevent
            :value="item">
            К
          </q-btn>
          <q-btn class="list-group-item item" id="a" draggable="true" @dragstart="drag($event, index)" @dragover.prevent
            :value="item">
            А
          </q-btn>
          <q-btn class="list-group-item item" id="CH" draggable="true" @dragstart="drag($event, index)"
            @dragover.prevent :value="item">
            ч
          </q-btn>
          <q-btn class="list-group-item item" id="A" draggable="true" @dragstart="drag($event, index)" @dragover.prevent
            :value="item">
            А
          </q-btn>
        </div>

        <div class="input-group">
          <div class="big-letters">
            <input @drop="drop($event)" type="text" class="input-item" @dragover="allowDrop($event)" v-model="answer"><input type="text" class="input-item"><input type="text"
              class="input-item"><input type="text" class="input-item"><input type="text" class="input-item"><input
              type="text" class="input-item"><input type="text" class="input-item">
          </div>

          <div class="middle-letters"> <input type="text" class="input-item"><input type="text"
              class="input-item"><input type="text" class="input-item"><input type="text" class="input-item"><input
              type="text" class="input-item"><input type="text" class="input-item"></div>

          <div class="pre-middle-letters"> <input type="text" class="input-item"><input type="text"
              class="input-item"><input type="text" class="input-item"><input type="text" class="input-item"><input
              type="text" class="input-item"></div>

          <div class="small-letters">
            <input type="text" class="input-item"><input type="text" class="input-item"><input type="text"
              class="input-item">
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

const answer = ref("");

const drag = (event) => {
  event.dataTransfer.setData("text", event.target.value);
  console.log(event.target.value);
}


const drop = (event) => {
  event.preventDefault();
  let text = event.dataTransfer.getData("text");
  answer.value = text;
  console.log(answer.value);
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
    width: 48px;
    height: 48px;
    border: none;
    background-color: #D2EFFF;
    border-radius: 6px;
  }

  &-group {
    display: flex;
    flex-wrap: wrap;
    max-width: 348px;

    justify-content: center;
    margin: 0px auto;

    column-gap: 2px;
    row-gap: 20px;
  }
}

.NineTask {
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
    max-width: 700px;
  }

  &__content {
    margin-top: 48px;
  }

  .close {
    cursor: pointer;
  }

  &__wrapper {
    padding: 30px 76px 76px 76px;
    height: 494px;
  }
}

.big-letters {
  column-gap: 2px;
  display: flex;
}

.middle-letters {
  column-gap: 2px;
  display: flex;
}

.pre-middle-letters {
  column-gap: 2px;
  display: flex;
}

.small-letters {
  column-gap: 2px;
  display: flex;
}

.draggable-list {
  display: flex;
  justify-content: center;
  column-gap: 2px;
  margin-bottom: 50px;

}

.item {
  width: 40px;
  height: 40px;
  background-color: #B5F9AD;
  color: #0F5707;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

#L {
  font-size: 32px;
  font-family: 'Nunito Sans';
  font-weight: 800;
}

#B {
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 700;
}

#G {
  font-size: 30px;
  font-family: 'Nunito';
  font-style: italic;
  font-weight: 300;
}

#m {
  font-size: 16px;
  font-family: 'Nunito';
  font-style: italic;
  font-weight: 700;
}

#E {
  font-size: 32px;
  font-family: 'Nunito Sans';
  font-weight: 800;
}

#r {
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 700;
}

#O {
  font-size: 30px;
  font-family: 'Nunito';
  font-style: italic;
  font-weight: 300;
}

#C {
  font-size: 32px;
  font-family: 'Nunito Sans';
  font-weight: 800;
}

#y {
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 700;
}

#R {
  font-size: 30px;
  font-family: 'Nunito';
  font-style: italic;
  font-weight: 300;
}

#c {
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 700;
}

#i {
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 700;
}

#ya {
  font-size: 16px;
  font-family: 'Nunito';
  font-style: italic;
  font-weight: 700;
}

#N {
  font-size: 36px;
  font-family: 'Nunito Sans';
  font-weight: 800;
}

#YA {
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 700;
}

#k {
  font-size: 32px;
  font-family: 'Nunito';
  font-style: italic;
  font-weight: 300;
}

#K {
  font-size: 36px;
  font-family: 'Nunito Sans';
  font-weight: 800;
}

#a {
  font-size: 32px;
  font-family: 'Nunito';
  font-style: italic;
  font-weight: 300;
}

#ch {
  font-size: 16px;
  font-family: 'Nunito';
  font-style: italic;
  font-weight: 700;
}

#A {
  font-size: 36px;
  font-family: 'Nunito Sans';
  font-weight: 800;
}
</style>

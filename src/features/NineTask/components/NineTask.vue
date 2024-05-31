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
          <q-btn class="list-group-item item" v-for="(item, index) in letterss" :id="item.id" :key="item.id"
            draggable="true" @dragstart="drag($event, item.name, index)" @dragover.prevent :value="item">
            {{ item.name }}
          </q-btn>
        </div>

        <div class="input-group">
          <div class="big-letters">
            <input @drop="drop($event, 1, 1)" type="text" class="input-item" @dragover="allowDrop($event)">
            <input @drop="drop($event, 1, 2)" @dragover="allowDrop($event)" type="text" class="input-item"><input
              @drop="drop($event, 1, 3)" @dragover="allowDrop($event)" type="text" class="input-item"><input
              @drop="drop($event, 1, 2)" type="text" class="input-item" @dragover="allowDrop($event)"><input
              @drop="drop($event, 1, 5)" @dragover="allowDrop($event)" type="text" class="input-item"><input type="text"
              @drop="drop($event, 1, 6)" @dragover="allowDrop($event)" class="input-item"><input
              @drop="drop($event, 1, 7)" @dragover="allowDrop($event)" type="text" class="input-item">
          </div>

          <div class="middle-letters"> <input type="text" @drop="drop($event, 2, 1)" class="input-item"><input
              type="text" @drop="drop($event, 2, 2)" class="input-item"><input type="text" @drop="drop($event, 2, 3)"
              class="input-item"><input type="text" @drop="drop($event, 2, 4)" class="input-item"><input type="text"
              @drop="drop($event, 2, 5)" class="input-item"><input @drop="drop($event, 2, 6)" type="text"
              class="input-item"></div>

          <div class="pre-middle-letters"> <input type="text" @drop="drop($event, 3, 1)" class="input-item"><input
              type="text" @drop="drop($event, 3, 2)" class="input-item"><input type="text" @drop="drop($event, 3, 3)"
              class="input-item"><input type="text" @drop="drop($event, 3, 4)" class="input-item"><input type="text"
              class="input-item" @drop="drop($event, 3, 5)"></div>

          <div class="small-letters">
            <input type="text" @drop="drop($event, 4, 1)" class="input-item"><input type="text"
              @drop="drop($event, 4, 2)" class="input-item"><input type="text" @drop="drop($event, 4, 3)"
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


const letterss = ref([{ id: 'L', name: 'Л' }, { id: 'B', name: 'Б' }, { id: 'G', name: 'Г' }, { id: 'm', name: 'М' }, { id: 'E', name: 'Е' }, { id: 'r', name: 'Р' }, { id: 'O', name: 'О' }, { id: 'C', name: 'С' }, { id: 'y', name: 'У' }, { id: 'R', name: 'Р' }, { id: 'e', name: 'Е' }, { id: 'c', name: 'С' }, { id: 'i', name: 'Ь' }, { id: 'ya', name: 'Я' }, { id: 'N', name: 'Н' }, { id: 'YA', name: 'Я' }, { id: 'k', name: 'К' }, { id: 'K', name: 'К' }, { id: 'a', name: 'А' }, { id: 'ch', name: 'Ч' }, { id: 'A', name: 'А' }]);
const drag = (event, letter, index) => {
  event.dataTransfer.setData("text", letter);
  dropIndex.value = index;
}
const dropIndex = ref(letterss.value.length - 1);
const arr = ref({
  1: { 1: { answer: 'л', className: 'L' }, 2: { answer: 'е', className: 'E' }, 3: { answer: 'с', className: 'C' }, 4: { answer: 'е', className: 'e' }, 5: { answer: 'н', className: 'N' }, 6: { answer: 'к', className: 'K' }, 7: { answer: 'а', className: 'A' } },
  2: { 1: { answer: 'б', className: 'B' }, 2: { answer: 'р', className: 'r' }, 3: { answer: 'у', className: 'y' }, 4: { answer: 'с', className: 'c' }, 5: { answer: 'ь', className: 'i' }, 6: { answer: 'я', className: 'YA' }},
  3: { 1: { answer: 'г', className: 'G' }, 2: { answer: 'о', className: 'O' }, 3: { answer: 'р', className: 'R' }, 4: { answer: 'к', className: 'k' }, 5: { answer: 'а', className: 'a' }},
  4: { 1: { answer: 'м', className: 'm' }, 2: { answer: 'я', className: 'ya' }, 3: { answer: 'ч', className: 'ch' } }
});


const drop = (event, word, letter) => {
  event.preventDefault();
  let text = event.dataTransfer.getData("text");
  if (arr.value[word][letter].answer === text.toLowerCase()) {
    event.target.value = text;
    letterss.value.splice(dropIndex.value, 1);
    console.log(text);
    event.target.classList.add(arr.value[word][letter].className)
  } else {
    return false;
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
    width: 48px;
    height: 48px;
    border: none;
    background-color: #D2EFFF;
    border-radius: 6px;
    color: transparent;
    text-shadow: 0 0 0 black;
    outline: none;
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

.L {
  background-color: #B5F9AD;
  color: #0F5707;
  font-size: 32px;
  font-family: 'Nunito Sans';
  font-weight: 800;
  text-align: center;
}

#B {
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 700;
}

.B {
  background-color: #B5F9AD;
  color: #0F5707;
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 700;
  text-align: center;
}

#G {
  font-size: 30px;
  font-family: 'Nunito';
  font-style: italic;
  font-weight: 300;
}

.G {
  font-size: 30px;
  font-family: 'Nunito';
  font-style: italic;
  font-weight: 300;
  background-color: #B5F9AD;
  color: #0F5707;
  text-align: center
}

#m {
  font-size: 16px;
  font-family: 'Nunito';
  font-style: italic;
  font-weight: 700;
}

.m {
  background-color: #B5F9AD;
  color: #0F5707;
  font-size: 16px;
  font-family: 'Nunito';
  font-style: italic;
  font-weight: 700;
  text-align: center;
}

#E {
  font-size: 32px;
  font-family: 'Nunito Sans';
  font-weight: 800;
}

.E {
  background-color: #B5F9AD;
  color: #0F5707;
  font-size: 32px;
  font-family: 'Nunito Sans';
  font-weight: 800;
  text-align: center;
}

#e {
  font-size: 32px;
  font-family: 'Nunito Sans';
  font-weight: 800;
}

.e {
  background-color: #B5F9AD;
  color: #0F5707;
  font-size: 32px;
  font-family: 'Nunito Sans';
  font-weight: 800;
  text-align: center;
}

#r {
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 700;
}

.r {
  background-color: #B5F9AD;
  color: #0F5707;
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 700;
  text-align: center;
}

#O {
  font-size: 30px;
  font-family: 'Nunito';
  font-style: italic;
  font-weight: 300;
}

.O {
  background-color: #B5F9AD;
  color: #0F5707;
  font-size: 30px;
  font-family: 'Nunito';
  font-style: italic;
  font-weight: 300;
  text-align: center;
}

#C {
  font-size: 32px;
  font-family: 'Nunito Sans';
  font-weight: 800;
}

.C {
  background-color: #B5F9AD;
  color: #0F5707;
  text-align: center;
  font-size: 32px;
  font-family: 'Nunito Sans';
  font-weight: 800;
}

#y {
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 700;
}

.y {
  background-color: #B5F9AD;
  color: #0F5707;
  text-align: center;
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

.R {
  background-color: #B5F9AD;
  color: #0F5707;
  text-align: center;
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

.c {
  background-color: #B5F9AD;
  color: #0F5707;
  text-align: center;
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 700;
}

#i {
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 700;
}

.i {
  background-color: #B5F9AD;
  color: #0F5707;
  text-align: center;
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

.ya {
  background-color: #B5F9AD;
  color: #0F5707;
  text-align: center;
  font-size: 16px;
  font-family: 'Nunito';
  font-style: italic;
  font-weight: 700;
}

#N {
  font-size: 32px;
  font-family: 'Nunito Sans';
  font-weight: 800;
}

.N {
  background-color: #B5F9AD;
  color: #0F5707;
  text-align: center;
  font-size: 32px;
  font-family: 'Nunito Sans';
  font-weight: 800;
}

#YA {
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 700;
}

.YA {
  background-color: #B5F9AD;
  color: #0F5707;
  text-align: center;
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 700;
}

#k {
  font-size: 32px;
  font-family: 'Nunito';
  font-style: italic;
  line-height: 23px;
  font-weight: 300;
}

.k {
  background-color: #B5F9AD;
  color: #0F5707;
  text-align: center;
  font-size: 32px;
  font-family: 'Nunito';
  font-style: italic;
  line-height: 23px;
  font-weight: 300;
}

#K {
  font-size: 32px;
  font-family: 'Nunito Sans';
  line-height: 25px;
  font-weight: 800;
}

.K {
  background-color: #B5F9AD;
  color: #0F5707;
  text-align: center;
  font-size: 32px;
  font-family: 'Nunito Sans';
  line-height: 25px;
  font-weight: 800;
}

#a {
  font-size: 32px;
  font-family: 'Nunito';
  font-style: italic;
  font-weight: 300;
}

.a {
  background-color: #B5F9AD;
  color: #0F5707;
  text-align: center;
  font-size: 32px;
  font-family: 'Nunito';
  font-style: italic;
  font-weight: 300;
}

#ch {
  font-size: 16px;
  font-family: 'Nunito';
  font-style: italic;
  line-height: 11px;
  font-weight: 700;
}

.ch {
  background-color: #B5F9AD;
  color: #0F5707;
  text-align: center;
  font-size: 16px;
  font-family: 'Nunito';
  font-style: italic;
  line-height: 11px;
  font-weight: 700;
}

#A {
  font-size: 32px;
  font-family: 'Nunito Sans';
  font-weight: 800;
  line-height: 25px;
}

.A {
  background-color: #B5F9AD;
  color: #0F5707;
  text-align: center;
  font-size: 32px;
  font-family: 'Nunito Sans';
  font-weight: 800;
  line-height: 25px;
}
</style>

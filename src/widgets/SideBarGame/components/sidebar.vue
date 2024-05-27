<template>
  <div class="sidebar">
    <p class="sidebar__title">Выбери задание!</p>
    <div class="sidebar__wrapper">
      <div class="sidebar__bg">
        <div @click="switchTask(item.id, item.open)" :class="{ disabled: item.disabled === true }" class="task" v-for="item in tasks" :key="item.id">{{
          item.name
          }} <img class="icon" v-if="item.disabled === false && item.done === false"
            src="@app/assets/icons/play.svg" /><img class="icon"
            v-else-if="item.disabled === true && item.done === false" src="@app/assets/icons/block.svg" /></div>
      </div>

    </div>
    <Button class="start" :isImage="true" @click="openTask(taskId, SeeTask)" :image="arrow" label="Старт" />
    <FirstTask @close="close()" v-show="SeeTask && taskId === 1"></FirstTask>
    <SecondTask @close="close()" v-show="SeeTask && taskId === 2"></SecondTask>
    <ThirdTask @close="close()" v-show="SeeTask && taskId === 3"></ThirdTask>
    <ThirteenthTask @close="close()" v-show="SeeTask && taskId === 13"></ThirteenthTask>
    <EighthteenTask @close="close()" v-show="SeeTask && taskId === 18"></EighthteenTask>
    <NineTask @close="close()" v-show="SeeTask && taskId === 9"></NineTask>

  </div>


</template>
<script setup>
import { Button } from '@shared/components/buttons';
import arrow from '@app/assets/icons/Arrow.svg';
import { ref } from 'vue';
import { FirstTask } from '@features/FirstTask/components';
import { ThirdTask } from '@features/ThirdTask/components'
import { SecondTask } from '@features/SecondTask';
import { ThirteenthTask } from '@features/ThirteenthTask';
import { EighthteenTask } from '@features/EighthteenTask';
import { NineTask } from '@features/NineTask';

const tasks = ref([
  { id: 1, name: 'Задание 1', disabled: false, done: false, open: false },
  { id: 2, name: 'Задание 2', disabled: false, done: false, open: false },
  { id: 3, name: 'Задание 3', disabled: false, done: false, open: false },
  { id: 4, name: 'Задание 4', disabled: true, done: false, open: false },
  { id: 5, name: 'Задание 5', disabled: true, done: false, open: false },
  { id: 6, name: 'Задание 6', disabled: true, done: false, open: false },
  { id: 7, name: 'Задание 7', disabled: true, done: false, open: false },
  { id: 8, name: 'Задание 8', disabled: true, done: false, open: false },
  { id: 9, name: 'Задание 9', disabled: false, done: false, open: false },
  { id: 10, name: 'Задание 10', disabled: true, done: false, open: false },
  { id: 11, name: 'Задание 11', disabled: true, done: false, open: false },
  { id: 12, name: 'Задание 12', disabled: true, done: false, open: false },
  { id: 13, name: 'Задание 13', disabled: false, done: false, open: false },
  { id: 14, name: 'Задание 14', disabled: true, done: false, open: false },
  { id: 15, name: 'Задание 15', disabled: true, done: false, open: false },
  { id: 16, name: 'Задание 16', disabled: true, done: false, open: false },
  { id: 17, name: 'Задание 17', disabled: true, done: false, open: false },
  { id: 18, name: 'Задание 18', disabled: false, done: false, open: false },
])

 const SeeTask = ref(null);
 const taskId = ref(null);

 const close = () => {
  SeeTask.value = false;
 };

const switchTask = (id, openId) => {
  taskId.value = id;
  SeeTask.value = openId;
  // console.log('goo', id, openId);
}

const openTask = (taskId) => {
  SeeTask.value = true;
  // console.log("woo", taskId);
}



</script>
<style lang="scss" scoped>
.icon {
  @media (max-width: 1024px) {
    max-width: 10px;
    width: 100%;
  }
}

.sidebar {
  background-color: $pink;
  border-radius: 20px 0px 0px 20px;
  padding: 40px 40px 0px 48px;
  width: 100%;
  max-width: 362px;
  height: 600px;

  @media (max-width: 1024px) {
    height: 470px;
    max-width: 292px;
    padding: 40px;
  }

  &__wrapper {
    padding: 16px;
    background-color: white;
    border-radius: 20px;
    margin: 45px auto;
    max-height: 312px;

    @media (max-width: 1024px) {
      max-height: 270px;
    }
  }

  &__title {
    font-size: 32px;
    color: $text-primary;
    font-family: 'Nunito', sans-serif;
    font-weight: 500;

    @media (max-width: 1024px) {
      font-size: 22px;
    }
  }

  &__bg {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    height: 255px;
    padding: 8px 0;
    overflow-y: scroll;

    @media (max-width: 1024px) {
      height: 185px;
      padding: 0px;
    }
  }
}

.task {
  border-radius: 30px;
  background-color: $blueGame;
  color: $black;
  max-width: 212px;
  width: 100%;
  padding: 5.5px 24px;
  height: 38px;
  color: $text-primary;
  font-family: 'Nunito', sans-serif;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  @media (max-width: 1024px) {
    max-width: 180px;
    height: 38px;
    font-size: 18px;
  }
}

.start {
  max-width: 280px;
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 32px;

  @media (max-width: 1024px) {
    max-width: 212px;
    height: 48px;
    column-gap: 28px;
  }
}

.disabled {
  background-color: #E6F2FA;
  color: #A5ACB1;
  cursor: not-allowed;
}

.sidebar__bg::-webkit-scrollbar {
  width: 8px;
  max-height: 148px;
}


.sidebar__bg::-webkit-scrollbar-thumb {
  background: #4D65E5;
  border-radius: 7px;
  cursor: pointer;
  max-height: 148px;
  width: 8px;

  @media (max-width: 1024px) {
    background: white;
    border-radius: 0px;
    cursor: pointer;
    max-height: 0px;
    width: 0px;
  }

}

.sidebar__bg::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
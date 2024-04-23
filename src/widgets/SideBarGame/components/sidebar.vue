<template>
  <div class="sidebar">
    <p class="sidebar__title">Выбери задание!</p>
    <div class="sidebar__wrapper">
      <div class="sidebar__bg">
        <div :class="{ disabled: item.disabled === true }" class="task" v-for="item in tasks" :key="item.id">{{
          item.name
        }} <img v-if="item.disabled === false && item.done === false" src="@app/assets/icons/play.svg" /><img
            v-else-if="item.disabled === true && item.done === false" src="@app/assets/icons/block.svg" /></div>
      </div>

    </div>
    <Button class="start" :isImage="true" :image="arrow" label="Старт" />
  </div>


</template>
<script setup>
import { Button } from '@shared/components/buttons';
import arrow from '@app/assets/icons/Arrow.svg';
import { ref } from 'vue';

const tasks = ref([
  { id: 1, name: 'Задание 1', disabled: false, done: false },
  { id: 2, name: 'Задание 2', disabled: true, done: false },
  { id: 3, name: 'Задание 3', disabled: true, done: false },
  { id: 4, name: 'Задание 4', disabled: true, done: false },
  { id: 5, name: 'Задание 5', disabled: true, done: false },
  { id: 6, name: 'Задание 6', disabled: true, done: false },
  { id: 7, name: 'Задание 7', disabled: true, done: false },
  { id: 8, name: 'Задание 8', disabled: true, done: false },
  { id: 9, name: 'Задание 9', disabled: true, done: false },
  { id: 10, name: 'Задание 10', disabled: true, done: false },
])
</script>
<style lang="scss" scoped>
.sidebar {
  background-color: $pink;
  border-radius: 20px 0px 0px 20px;
  padding: 40px 40px 60px 48px;
  width: 100%;
  max-width: 362px;
  height: 600px;

  &__wrapper {
    padding: 16px;
    background-color: white;
    border-radius: 20px;
    margin: 40px auto;
    max-height: 312px;
  }

  &__title {
    font-size: 32px;
    color: $text-primary;
    font-family: 'Nunito', sans-serif;
    font-weight: 500;
  }

  &__bg {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    height: 255px;
    padding: 8px 0;
    overflow-y: scroll;
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
}

.start {
  max-width: 280px;
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 32px;
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
}

.sidebar__bg::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
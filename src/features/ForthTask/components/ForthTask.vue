<template>
    <div class="FourthTask task_block" >
      <div class="task_block__wrapper">
        <div class="close" @click="hide">
            <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
        </div>
        <template v-if="false">
            <div class="task_block__time">
            <Timer :end="end"></Timer>
            <p class="title-h4 task_block__title"> Составь рассказ про АЛФАВИТ из подходящих фраз.</p>
            </div>
            <div class="draggable-list ">
        
            </div>
            <input @drop="drop($event)" @dragover="allowDrop($event)" v-model="answer"
            class="task_block__wrapper_answer"></input>
        </template>
        <TaskResultBanner v-if="true"></TaskResultBanner>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { VueDraggableNext } from 'vue-draggable-next';
  import { Timer } from '@shared/components/timer';
  import { TaskResultBanner } from '@features/TaskResultBanner/components';

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
  
  .FourthTask {
    position: block !important;
   
  
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
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
  
  </style>
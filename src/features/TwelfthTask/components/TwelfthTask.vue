<template>
    <div class="TwelfthTask task_block">
        <div class="task_block__wrapper">
            <template v-if="answersCounter < 11">
                <!-- ВЫХОД ИЗ ИГРЫ -->
                <div class="task_block__close" @click="hide">
                    <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="Выйти из игры" />
                </div>

                <!-- ЗАДАНИЕ И ВРЕМЯ -->
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title TwelfthTask__title">
                        Перетяни слоги на лодочки, чтобы получились слова. Из
                        этих слов получится предложение.
                    </p>
                </div>

                <!-- САМА ИГРА -->
                <div class="draggable-list">
                    <!-- ВАРИАНТЫ ОТВЕТОВ -->
                    <div class="draggable-list__words">
                        <div class="draggable-list__set-words" v-for="row in Task" :key="row">
                            <div class="draggable-list__word" v-for="word in row" :key="word" :class="{void : !word.isActive, item_wrong : word.error == -1 }"
                            :draggable="word.isActive" @dragstart="dragLetter($event, word.id)">
                                {{ word.text }}
                            </div>
                        </div>
                    </div>

                    <!-- ЛОДОЧКИ -->
<!-- TODO Для последующего разраба -->
<!-- TODO Лодочка распилина на 2 части, чтоб удобнее было перекрыть кнопку при ответе. {{}} место для ответа -->
<!-- TODO Скрее всего, это хардкод, но в голове у меня только такое решение созрело -->
                    <div class="draggable-list__answer">
                        <!-- ВЕРХНИЕ ЛОДОЧКИ -->
                        <div class="draggable-list__answer-wrapper">
                            <div class="draggable-list__question-word" v-for="word in Answer[0]" :key="word">
                                <div class="draggable-list__question-block" v-for="letter in word" :key="letter" @dragover.prevent @drop="dropLetter($event, letter.id, letter.isActive)">
                                    <img src="/assets/creatures/TwelfthTask/boat.png" alt="" class="draggable-list__question-boat" draggable="false">
                                    <div class="draggable-list__question-text draggable-list__word" :class="{void : !letter.isActive, item_right : letter.error == 1 }"> {{ letter.text }} </div>
                                    <img src="/assets/creatures/TwelfthTask/frontside.png" alt="" class="draggable-list__question-boat boat-frontside" draggable="false">
                                </div>
                            </div>
                        </div>

                        <!-- ВОДА -->
                        <div>
                            <img class="draggable-list__answer-water" src="/assets/creatures/TwelfthTask/water.png" alt="" draggable="false"/>
                        </div>

                        <!-- НИЖНИЕ ЛОДОЧКИ -->
                        <div class="draggable-list__answer-wrapper" >
                            <div class="draggable-list__question-word" v-for="word in Answer[1]" :key="word">
                                <div class="draggable-list__question-block" v-for="letter in word" :key="letter" @dragover.prevent @drop="dropLetter($event, letter.id, letter.isActive)">
                                    <img src="/assets/creatures/TwelfthTask/boat.png" alt="" class="draggable-list__question-boat" draggable="false">
                                    <div class="draggable-list__question-text draggable-list__word" :class="{void : !letter.isActive, item_right : letter.error == 1 }">
                                        {{ letter.text }}
                                    </div>
                                    <img src="/assets/creatures/TwelfthTask/frontside.png" alt="" class="draggable-list__question-boat boat-frontside" draggable="false">
                                </div>
                            </div>
                        </div>

                        <!-- ВОДА -->
                        <div>
                            <img class="draggable-list__answer-water" src="/assets/creatures/TwelfthTask/water.png" alt="" draggable="false"/>
                        </div>
                    </div>
                </div>
            </template>
            <TaskResultBanner img="/assets/backgrounds/flowers.png" bg="/assets/backgrounds/moa.gif" text="Превосходно!"
                v-if="answersCounter == 11" @next="next" @hide="hide()"></TaskResultBanner>
        </div>
    </div>
</template>





<script setup>
import { ref, onMounted, watch } from 'vue';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';

import { dataTask, dataAnswer } from './task.js'

const emit = defineEmits(['close', 'next-modal']);

const hide = () => {
    emit('close');
    endGame.value = true;
};

const next = () => {
    emit('next-modal');
    endGame.value = true;
}

const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
});

const endGame = ref(false);
const show = ref(false);
const hideModal = () => {
    show.value = false;
}

const Task = ref()
const Answer = ref()

Task.value = structuredClone(dataTask)
Answer.value = structuredClone(dataAnswer)

const answersCounter = ref(0)

watch(answersCounter, (NewValue)=>{
    if (NewValue == 11){
        endGame.value == true
        show.value == true

        console.log(endGame.value, show.value)
    }
    console.log(NewValue)
})

const dragLetter = (event, id) => {
    event.dataTransfer.setData('text', `${id}`);
};

const dropLetter = (event, id, isActive) => {
    let dragid = event.dataTransfer.getData('text')

    if (!isActive) {
        if (dragid == id){
            Answer.value.map((row) =>
                row.map((word) => {
                    word.map((letter) => {
                        if (letter.id == id) {
                            letter.isActive = !letter.isActive;
                            letter.error = 1;
                            setTimeout(()=>{
                                letter.error = 0;
                            }, 1000)
                        }
                    });
                })
            );

            Task.value.map((row) =>
                row.map((word) => {

                    if (word.id == id) {
                        word.isActive = !word.isActive;
                        console.log(word)
                    }
                })
            );

            
            let reactionAudio = new Audio(
                `/assets/audio/Task6/right.${Math.ceil(Math.random() * 3)}.mp3`
            );
            reactionAudio.play();

            setTimeout(() => {
                answersCounter.value += 1;
            }, 2000);
        }
        else {
            Task.value.map((row) =>
                row.map((word) => {

                    if (word.id == dragid) {
                        word.error = -1;
                        setTimeout(()=>{
                            word.error = 0;
                        }, 1000)

                    }
                })
            );
            let reactionAudio = new Audio(
                `/assets/audio/Task6/wrong.${Math.ceil(Math.random() * 3)}.mp3`
            );
            reactionAudio.play();
        }
    }
}
</script>





<style scoped lang='scss'>
*{
    user-select: none;
}

.TwelfthTask {
    width: 1200px;
}

.TwelfthTask__title {
    width: 640px;
    font-weight: 500;
    font-size: 24px;

    @media (max-width: 1024px) {
        width: 550px;
        font-size: 20px;
    }
}

// ВСЯ ИГРЫ
.draggable-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 60px;
    width: 100%;
    height: 386px;
    @media (max-width: 1024px) {
        height: 302px;
        margin-top: 48px;
    }
}

// СЛОГИ
.draggable-list__words {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 889px;
    height: 136px;
    @media (max-width: 1024px) {
        height: 116px;
    }
}

.draggable-list__set-words {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 40px;
    margin-bottom: 40px;

    @media (max-width: 1024px) {
        height: 38px;
        margin-bottom: 16px;
    }
}

.draggable-list__word {
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $puppe;
    color: $violetLetters-game;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: bold;
    border-radius: 6px;
    padding: 8px 16px 8px 16px;
    height: 40px;
    margin-left: 20px;
}

// ЛОДОЧКИ
.draggable-list__answer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 873px;
}

.draggable-list__answer-wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: stretch;
    justify-content: space-evenly;
    height: 49px;
    margin-top: 30px;


    @media (max-width: 1024px) {
        margin-top: 5px;
    }
}

.draggable-list__question-word {
    display: flex;
    flex-direction: row;
}

.draggable-list__question-block {
    margin-left: 8px;
    width: 100px;
    height: 34px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.draggable-list__answer-water {
    position: relative;
    bottom: 20px;
    width: 874px;
    height: 20px;
}

.boat-frontside{
    position: relative;
    bottom: 77px;
}

.draggable-list__question-text{
    position: relative;
    transform: translateY(-65px);
    z-index: -1;
    margin: auto;
}

.item_right {
    border: 2px solid #5ccf54;
}
.item_wrong {
    border: 2px solid #db0000;
}

.void {
    opacity: 0%;
}
</style>

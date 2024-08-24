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
                        <div
                            class="draggable-list__set-words"
                            v-for="row in Task" 
                            :key="row">

                            <VueDraggableNext
                            v-for="word in row" :key="word.id" 
                            :group="{ name: 'words', pull: 'clone', put: false }"
                            :sort="false"
                            :options="{ draggable: word.isActive }"
                            
                            @choose="($event)=>{ if (wordIsActive($event)) dragLetter($event, word.id, word.text)}"
                            @unchoose="($event)=>{checkAnswer($event)}">
                            
                                <div 
                                class="draggable-list__word" 
                                :class="{void : word.isActive == false, item_wrong : word.error == -1 }"
                                :data-word_id="word.id">
                                    {{ word.text }}
                                </div>
                            </VueDraggableNext>
                        </div>
                    </div>

                    <!-- ЛОДОЧКИ -->
                    <!-- TODO Для последующего разраба -->
                    <!-- TODO Лодочка распилина на 2 части, чтоб удобнее было перекрыть кнопку при ответе. {{}} место для ответа -->
                    <!-- TODO Скрее всего, это хардкод, но в голове у меня только такое решение созрело -->
                    <div class="draggable-list__answer">
                        <!-- ВЕРХНИЕ ЛОДОЧКИ -->
                        <div class="draggable-list__answer-wrapper">
                            <div class="draggable-list__question-word" v-for="word in Answer.data[0]" :key="word">

                                <VueDraggableNext :sort="false" :group="{ name: 'answer', pull: false, put: !letter.isActive}" 
                                    class="draggable-list__question-block" 
                                    v-for="letter in word.data" :key="letter.id"
                                    :options="{disabled: false}"
                                    draggable="false"

                                    @add="addLetter($event, letter.id, letter.isActive, letter.text)"
                                    ghost-class="none"
                                    >

                                    <div class="draggable-list__question-boat-wrapper" draggable="false">
                                        <img src="/assets/creatures/TwelfthTask/boat.png" alt="" class="draggable-list__question-boat" draggable="false">
                                        <div class="draggable-list__question-text draggable-list__word" :class="{void : !letter.isActive, item_right : letter.error == 1 }"> {{ letter.text }} </div>
                                        <img src="/assets/creatures/TwelfthTask/frontside.png" alt="" class="draggable-list__question-boat boat-frontside" draggable="false">
                                    </div>
                                </VueDraggableNext>

                            </div>
                        </div>

                        <!-- ВОДА -->
                        <div>
                            <img class="draggable-list__answer-water" src="/assets/creatures/TwelfthTask/water.png" alt="" draggable="false"/>
                        </div>  

                        <!-- НИЖНИЕ ЛОДОЧКИ -->
                        <div class="draggable-list__answer-wrapper" >
                            <div class="draggable-list__question-word" 
                                v-for="word in Answer.data[1]" 
                                :key="word"
                                >
                                    <VueDraggableNext :sort="false" :group="{ name: 'answer', pull: false, put: !letter.isActive}" 
                                    class="draggable-list__question-block" 
                                    v-for="letter in word.data" :key="letter" 
                                    :options="{disabled: false}"
                                    draggable="false"

                                    @add="addLetter($event, letter.id, letter.isActive, letter.text)"
                                    ghost-class="none">

                                        <div class="draggable-list__question-boat-wrapper">
                                            <img src="/assets/creatures/TwelfthTask/boat.png" alt="" class="draggable-list__question-boat" draggable="false">
                                            <div class="draggable-list__question-text draggable-list__word" :class="{void : !letter.isActive, item_right : letter.error == 1 }">
                                                {{ letter.text }}
                                            </div>
                                            <img src="/assets/creatures/TwelfthTask/frontside.png" alt="" class="draggable-list__question-boat boat-frontside" draggable="false">
                                        </div>    
                                    
                                    </VueDraggableNext>
                            </div>
                        </div>

                        <!-- ВОДА -->
                        <div>
                            <img class="draggable-list__answer-water" src="/assets/creatures/TwelfthTask/water.png"
                                alt="" draggable="false" />
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

import { VueDraggableNext } from 'vue-draggable-next';

import { dataTask, dataAnswer } from './task.js'
import audioMap from './audioMap.js'

import gameActions from '@mixins/gameAction';

const { methods } = gameActions;
const { endGameRequest, startGameRequest, getCorrectAnswer } = methods;

const corrValue = ref(0)
const is_correct = ref(null)

onMounted(async () => {
    const correct = await getCorrectAnswer(8, props.childId);
    corrValue.value = correct.correctId;
    is_correct.value = correct.is_correct;
})

const emit = defineEmits(['close', 'next-modal', 'correct', 'open']);

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
    childId: {
        type: Number,
        required: false,
    }
});

const endGame = ref(false);
const show = ref(false);
const hideModal = () => {
    show.value = false;
}
const getImageUrl = (path) => {
    return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};
const Task = ref()
const Answer = ref()

Task.value = structuredClone(dataTask)
Answer.value = structuredClone(dataAnswer)

const answersCounter = ref(0)

const dragAudio = ref(new Audio());
const dataTrans = ref({})

const isTouch = ref(false)

const refWords = ref({})

const isDrag = ref(false);


const dataTransfer = ref({})
const dragLetter = (event, id, text) => {
    //event.dataTransfer.setData('text', `${id}`);
    dataTransfer.value.id = id;
    isDrag.value = true;
    if (dragAudio.value) dragAudio.value.pause();
    dragAudio.value.src = new URL(`/assets/audio/Task12/${audioMap.get(text)}`, import.meta.url).href;
    dragAudio.value.play();
};


const dropLetter = (event, id, isActive) => {
    //let dragid = event.dataTransfer.getData('text')
    let dragid = dataTransfer.value.id
    let audioPath = ''

    console.log('drop', dragid, id, isActive, event)
    //event.target.parentNode.removeChild(event.target)
    
    let taskDOM = document.querySelector('.draggable-list__words')

    if (!isActive && isDrag.value == true) {
        if (dragid == id){
            Answer.value.data.map((row) =>
                row.map((word) => {
                    word.data.map((letter) => {
                        if (letter.id == id) {
                            letter.isActive = !letter.isActive;
                            letter.error = 1;
                            word.answerCounter += 1;

                            if (word.id == 1 && word.answerCounter == 4) {
                                audioPath = new URL('/assets/audio/Task12/з.12 полн.слово веселые.mp3', import.meta.url).href;
                                Answer.value.answerCounter += 1
                            }
                            else if (word.id == 2 && word.answerCounter == 3) {
                                audioPath = new URL('/assets/audio/Task12/з.12 полн.слово ребята.mp3', import.meta.url).href;
                                Answer.value.answerCounter += 1
                            }
                            else if (word.id == 3 && word.answerCounter == 2) {
                                audioPath = new URL('/assets/audio/Task12/з.12 полн.слово наши.mp3', import.meta.url).href;
                                Answer.value.answerCounter += 1
                            }
                            else if (word.id == 4 && word.answerCounter == 2) {
                                audioPath = new URL('/assets/audio/Task12/з.12 полн.слово друзья.mp3', import.meta.url).href;
                                Answer.value.answerCounter += 1
                            }
                            setTimeout(() => {
                                letter.error = 0;
                            }, 1000)
                        }
                    });
                })
            );
            

            Array.from(taskDOM.children).map(row => {
                Array.from(row.children).forEach(word => {
                    let word_block = word.children[0]


                    if (word_block.dataset.word_id == dragid){

                        word_block.classList.add = 'opacity: 0;'
                        word_block.setAttribute('draggable', 'false')
                        word_block.dataset['word_isActive'] = false

                        word.classList.add('void')
                        word.setAttribute('ghost-class', 'none')
                        word.setAttribute('drag-class', 'none')
                        
                    }
                })
            })

            Task.value.map((row) =>
                row.map((word) => {
                    
                    if (word.id == dragid) {
                        word.isActive = !word.isActive;
                        console.log(refWords.value[word.id] == document.querySelectorAll('.draggable-list__word')[1])
                    }
                })
            );

            let reactionPath = new URL(`/assets/audio/Task6/right.${Math.ceil(Math.random() * 3)}.mp3`, import.meta.url).href;
            let reactionAudio = new Audio(
                reactionPath
            );
            reactionAudio.play();

            if (audioPath != '') {
                setTimeout(() => {
                    let audio = new Audio(audioPath);
                    audio.play();
                }, 1000)
            }


            if (Answer.value.answerCounter == 4) {



                setTimeout(() => {

                    if (is_correct.value === false) {
                        endGameRequest(props.childId, corrValue.value);
                        emit('correct');
                        emit('open');
                    }
                    startGame.value = false;

                    let audioPath_4 = new URL('/assets/audio/Task12/з.12 полн.текст Веселые ребята наши друзья.mp3', import.meta.url).href;
                    let audio = new Audio(audioPath_4);
                    audio.play();
                }, 2000)
            }


            setTimeout(() => {
                answersCounter.value += 1;

                if (answersCounter.value == 11) {
                    setTimeout(() => {
                        if (is_correct.value === false) {
                            endGameRequest(props.childId, corrValue.value);
                            emit('correct');
                            emit('open');
                        }
                    }, 1000)
                    let audio_path = new URL('/assets/audio/Task12/368.12_.mp3', import.meta.url).href
                    let audio = new Audio(audio_path);
                    audio.play();
                }

            }, 7000);
        }
        else {

            Array.from(taskDOM.children).map(row => {
                Array.from(row.children).forEach(word => {
                    let word_block = word.children[0]


                    if (word_block.dataset.word_id == dragid){

                        word_block.classList.add('item_wrong')
                        
                        setTimeout(()=>{
                            word_block.classList.remove('item_wrong')
                        }, 1000)
                    }
                })}
            );
            let reactionPath_2 = new URL(`/assets/audio/Task6/wrong.${Math.ceil(Math.random() * 3)}.mp3`, import.meta.url).href;
            let reactionAudio = new Audio( reactionPath_2 );
            reactionAudio.play();
        }
    }

    isDrag.value = false
}

const checkAnswer = (event) => {
    console.log('unchoose')
    if (event.to.className == event.from.className) return true

    else event.to.removeChild(event.item)
    return false
}

const addLetter = (event, id, isActive, text) => {
    console.log('add', event)

    dropLetter(event, id, isActive)
}

const wordIsActive = (event) => {
    if (event.item.dataset['word_isActive'] == 'false') return false
    return true
}


</script>
<style scoped lang='scss'>
* {
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
}

.draggable-list__question-boat-wrapper{
}

.draggable-list__answer-water {
    position: relative;
    bottom: 20px;
    width: 874px;
    height: 20px;
}

.boat-frontside {
    position: relative;
    bottom: 83px;
    margin: auto;
}

.draggable-list__question-text {
    position: relative;
    transform: translateY(-65px);
    z-index: -1;
    margin: auto;
    width: fit-content;
}

.item_right {
    border: 2px solid #5ccf54;
}

.item_wrong {
    border: 2px solid #db0000;
}

.void {
    opacity: 0%;
    cursor: default;
}

.none{
    display: none;
    cursor: default;
}
</style>

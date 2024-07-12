<template>
    <div class="SixTask task_block">
        <div class="task_block__wrapper">
            <template v-if="usedWord.length < 15">
                <div class="task_block__close" @click="hide">
                    <img
                        class="close-icon"
                        src="@app/assets/icons/close-icon.svg"
                        alt="крест"
                    />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title">
                        Найди произносимые слоги.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="draggable-list__items">
                        <div class="draggable-list__item" v-for="row in taskData" :key="row">
                            <button class="draggable-list__button" 
                            :class="{'item_right': (taskWord == word && selectedWord == taskWord && selectedWord != ''), 
                                    'item_wrong': (selectedWord != taskWord && selectedWord != '' && selectedWord == word)}" 
                            v-for="word in row" :key="word"
                            :disabled="word.trim().length < 2" @click="clickItem(word)"
                            >{{ word }}</button>
                        </div>
                    </div>
                    <div v-if="!repeated">
                        <button class="draggable-list__button_final" @click="()=>{playMusic()}">
                            <span class="draggable-list__button-speaker"
                                >Прослушать</span
                            >
                            <img
                                src="@app\assets\icons\speaker.svg"
                                alt="speaker"
                            />
                        </button>
                    </div>
                    <div v-if="repeated">
                        <button class="draggable-list__button_final" @click="playMusic()">
                            <span class="draggable-list__button-repeat"
                                >Повторить</span
                            >
                            <img
                                src="@app\assets\icons\repeat.svg"
                                alt="repeat"
                            />
                        </button>
                    </div>
                </div>
            </template>
            <TaskResultBanner img="/assets/backgrounds/flowers.png" bg="/assets/backgrounds/moa.gif" text="Здорово!"
            v-if="usedWord.length >= 15" @hide="hide()"></TaskResultBanner>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';

import dict from './dict'

const emit = defineEmits(['close']);
const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
});
const hide = () => {
    emit('close');
};

onMounted(()=>{
    let audio = new Audio('/assets/audio/Task6/79.6.mp3')
    audio.play()
    randomMusic()
})

const dictKeys = dict.keys().toArray() // Массив разрешенных значений

let legalWords = []

const taskData  =  [[' ','А','Я','У','Ю','О','Ё','Э','Е','Ы','И'],
                    ['Б',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    ['В',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    ['Г',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    ['Д',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    ['Ж',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']]

for (let row = 1; row in taskData; row++){
    for (let column = 1; column in taskData[row]; column++){
        taskData[row][column] = taskData[row][0] + taskData[0][column]
        if (!dictKeys.includes(taskData[row][column])) {taskData[row][column] = ''}
        else {legalWords.push(taskData[row][column])}
    }
}

const taskWord = ref('') // Заданное слово в текущей итерации

const repeated = ref(false) // Повторяется ли слово в текущий момент

const usedWord = ref([]) // Использованные слова

let audio = new Audio()

const randomMusic = ()=>{

    let randomNumber = Math.floor(Math.random()*legalWords.length)
    let item = dictKeys[randomNumber]
    while (usedWord.value.includes(item)){
        randomNumber = Math.floor(Math.random()*legalWords.length)
        item = dictKeys[randomNumber]
    }

    taskWord.value = item

    let file = dict.get(`${item}`)
    audio = new Audio(`/assets/audio/Task6/${file}`)


    usedWord.value.push(item)
    console.log(usedWord.value)

    repeated.value = false
}

const playMusic = () => {
    repeated.value = true
    audio.play()
}



const lastItem = ref()

const selectedWord = ref()

const clickItem = (word)=>{
    if (word == taskWord.value){
        let reactionAudio = new Audio(`/assets/audio/Task6/right.${Math.ceil(Math.random()*3)}.mp3`)
        reactionAudio.play()
    }
    else {
        let reactionAudio = new Audio(`/assets/audio/Task6/wrong.${Math.ceil(Math.random()*3)}.mp3`)
        reactionAudio.play()
        console.log('неверно')
    }
    selectedWord.value = word
    setTimeout(()=>{
        selectedWord.value = ''
        if (word == taskWord.value) randomMusic()
    }, 1000)
}

</script>
<style lang="scss" scoped>

.draggable-list {
    display: flex;
    gap: 88px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    @media (max-width: 1024px) {
        gap: 60px;
    }
}

.draggable-list__items {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 540px;
    gap: 4px;
    @media (max-width: 1024px) {
        gap: 4px;
    }
}
.draggable-list__item {
    display: flex;
    justify-content: center;
    gap: 4px;
}
.draggable-list__item{
    width: 100%;
    height: 40px;
}


.draggable-list__button {
    text-align: center;
    width: 60px;
    height: 40px;
    background-color: $lightPink;
    color: $vihous;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    letter-spacing: 0;
    border-radius: 6px;
    font-weight: bold;
}

.FourthTask {
    position: block;
}

.draggable-list__button_final {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 271px;
    height: 48px;
    background-color: #fff;
    color: $darkBlue;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    letter-spacing: 0;
    border-radius: 30px;
    font-weight: 400;
    line-height: 48px;
    border: 1.5px solid $darkBlue;
}

.draggable-list__button-speaker,
.draggable-list__button-repeat {
    padding-right: 20px;
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

.item_right{
    border: 2px solid #5CCF54;
}
.item_wrong{
    border: 2px solid #DB0000;
}

.item_unselected{
    border: none;
}
</style>

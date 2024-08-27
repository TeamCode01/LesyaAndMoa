<template>
    <template v-if="endGame === false">
        <div class="NineTask task_block">
            <div class="NineTask__wrapper">
                <div class="task_block__close" @click="hide">
                    <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
                </div>

                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 NineTask__title">
                        Собери из букв одинакового размера названия предметов,
                        которые встретились героям на детской площадке.
                    </p>
                </div>
                <div class="NineTask__content">
                    <div class="draggable-list">
                        <VueDraggableNext v-for="(item, index) in letterss" :key="item.id"
                        :group="{ name: 'letters', pull: 'clone', put: false }" :sort="false"
                        @choose="drag($event, item.name, item.id, index)">
                            <div class="list-group-item item" :id="item.id"
                                @mouseenter="playAudio(item.audio)"
                                @mouseout="stopAudio(item.audio)" 
                                @touchstart="playAudio(item.audio)"
                                @touchcancel="stopAudio(item.audio)"

                                :value="item">
                                {{ item.name }}
                            </div>
                        </VueDraggableNext>
                    </div>

                    <div class="input-group">

                        <div class="big-letters">

                            <VueDraggableNext :group="{ name: 'big-letters', pull: false, put: true }" 
                            :sort="false" v-for="i in 7" :key="i" @add="drop($event, 1, i)" ghost-class="none">
                                <input type="text" class="input-item" />
                            </VueDraggableNext>

                        </div>

                        <div class="middle-letters">

                            <VueDraggableNext :group="{ name: 'middle-letters', pull: false, put: true }" 
                            :sort="false" v-for="i in 6" :key="i" @add="drop($event, 2, i)" ghost-class="none">
                                <input type="text" class="input-item" />
                            </VueDraggableNext>

                        </div>

                        <div class="pre-middle-letters">

                            <VueDraggableNext :group="{ name: 'pre-middle-letters', pull: false, put: true }" 
                            :sort="false" v-for="i in 5" :key="i" @add="drop($event, 3, i)" ghost-class="none">
                                <input type="text" class="input-item" />
                            </VueDraggableNext>

                        </div>

                        <div class="small-letters">

                            <VueDraggableNext :group="{ name: 'small-letters', pull: false, put: true }" 
                            :sort="false" v-for="i in 3" :key="i" @add="drop($event, 4, i)" ghost-class="none">
                                <input type="text" class="input-item" />
                            </VueDraggableNext>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <TaskResultBanner class="end-modal" :img="getImageUrl('Cup.png')" :bg="getImageUrl('lesya.gif')"
        text="Восхитительно!" @next="next()" v-else @hide="hide"></TaskResultBanner>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';

import { VueDraggableNext } from 'vue-draggable-next';
import gameActions from '@mixins/gameAction';

const { methods } = gameActions;
const { endGameRequest, startGameRequest, getCorrectAnswer } = methods;
const emit = defineEmits(['close', 'next-modal', 'correct', 'open']);
const endGame = ref(false);
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
    finish: {
        type: Boolean
    },

    childId: {
        type: Number,
        required: false,
    }
});

const getImageUrl = (path) => {
  return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};

const audio = ref(new Audio());
const is_correct = ref(null);

const playAudio = async (audioPath) => {
    audio.value.src = new URL(`/assets/audio/${audioPath}`, import.meta.url).href;
    if (props.finish === true) {
        await audio.value.play();
    }
}

const playEndAudio = (audioPath) => {
    const end_audio = new Audio();
    end_audio.src = new URL(`/assets/audio/${audioPath}`, import.meta.url).href;
    end_audio.play();
}


const stopAudio = (audioPath) => {
    if (audio.value.paused) {
        //playAudio(audioPath);
    } else {
        audio.value.pause();
    }
}
const corrValue = ref(0);

const letterss = ref([
    { id: 'L', name: 'Л', audio: 'Task9/300.9.mp3' },
    { id: 'B', name: 'Б', audio: 'Task9/301.9.mp3' },
    { id: 'G', name: 'Г', audio: 'Task9/302.9.mp3' },
    { id: 'm', name: 'М', audio: 'Task9/303.9.mp3' },
    { id: 'E', name: 'Е', audio: 'Task9/304.9.mp3' },
    { id: 'r', name: 'Р', audio: 'Task9/305.9.mp3' },
    { id: 'O', name: 'О', audio: 'Task9/306.9.mp3' },
    { id: 'C', name: 'С', audio: 'Task9/307.9.mp3' },
    { id: 'y', name: 'У', audio: 'Task9/308.9.mp3' },
    { id: 'R', name: 'Р', audio: 'Task9/305.9.mp3' },
    { id: 'e', name: 'Е', audio: 'Task9/304.9.mp3' },
    { id: 'c', name: 'С', audio: 'Task9/307.9.mp3' },
    { id: 'i', name: 'Ь', audio: 'Task9/309.9.mp3' },
    { id: 'ya', name: 'Я', audio: 'Task9/310.9.mp3' },
    { id: 'N', name: 'Н', audio: 'Task9/311.9.mp3' },
    { id: 'YA', name: 'Я', audio: 'Task9/310.9.mp3' },
    { id: 'k', name: 'К', audio: 'Task9/312.9.mp3' },
    { id: 'K', name: 'К', audio: 'Task9/312.9.mp3' },
    { id: 'a', name: 'А', audio: 'Task9/314.9.mp3' },
    { id: 'ch', name: 'Ч', audio: 'Task9/313.9.mp3' },
    { id: 'A', name: 'А', audio: 'Task9/314.9.mp3' },
]);

const dataTransfer = ref({})
const drag = (event, letter, id, index) => {
    // event.dataTransfer.setData('text', letter);
    // event.dataTransfer.setData('id', id);

    dataTransfer.value.text = letter
    dataTransfer.value.id = id
    dropIndex.value = index;
};
const dropIndex = ref(letterss.value.length - 1);
const arr = ref({
    1: {
        1: { answer: 'л', className: 'L' },
        2: { answer: 'е', className: 'E' },
        3: { answer: 'с', className: 'C' },
        4: { answer: 'е', className: 'e' },
        5: { answer: 'н', className: 'N' },
        6: { answer: 'к', className: 'K' },
        7: { answer: 'а', className: 'A' },
    },
    2: {
        1: { answer: 'б', className: 'B' },
        2: { answer: 'р', className: 'r' },
        3: { answer: 'у', className: 'y' },
        4: { answer: 'с', className: 'c' },
        5: { answer: 'ь', className: 'i' },
        6: { answer: 'я', className: 'YA' },
    },
    3: {
        1: { answer: 'г', className: 'G' },
        2: { answer: 'о', className: 'O' },
        3: { answer: 'р', className: 'R' },
        4: { answer: 'к', className: 'k' },
        5: { answer: 'а', className: 'a' },
    },
    4: {
        1: { answer: 'м', className: 'm' },
        2: { answer: 'я', className: 'ya' },
        3: { answer: 'ч', className: 'ch' },
    },
});

const drop = (event, word, letter) => {
    // event.preventDefault();
    // let text = event.dataTransfer.getData('text');
    // let id = event.dataTransfer.getData('id');

    let text = dataTransfer.value.text;
    let id = dataTransfer.value.id;
    let elem = document.getElementById(id);

    Array.from(event.to.children).forEach(element => {
        if (element.classList.contains('list-group-item')) {
            event.to.removeChild(element)
        }
    })

    if (arr.value[word][letter].answer === text.toLowerCase()) {
        event.to.children[0].value = text;
        letterss.value.splice(dropIndex.value, 1);
        event.to.children[0].classList.add(arr.value[word][letter].className, 'green');

        setTimeout(() => {
            event.to.children[0].classList.remove('green');
        }, 2000)
        playEndAudio('Common/1.2.mp3');
        if (letterss.value.length === 0) {
            setTimeout(() => {
                if (is_correct.value === false) {
                    endGameRequest(props.childId, corrValue.value);
                    emit('correct');
                    emit('open')
                }
                endGame.value = true;
            }, 1500)
        }
    } else {
        elem.classList.add('red');
        playEndAudio('Common/2.1.mp3');
        setTimeout(() => {
            elem.classList.remove('red');
        }, 2000);
        return false;
    }
};

const allowDrop = (event) => {
    event.preventDefault();
};

onMounted(() => {
    try {
        const correct = getCorrectAnswer(9, props.childId);
        corrValue.value = correct.correctId;
        is_correct.value = correct.is_correct;
    }
    catch (error) {
        console.log(error);
    }
})
</script>
<style lang="scss" scoped>
* {
    user-select: none;
}

.end-modal {
    width: 1200px;
    height: 600px;
}

.input {
    &-item {
        width: 48px;
        height: 48px;
        border: none;
        background-color: #d2efff;
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
    &__content {
        margin-top: 48px;
    }

    &__wrapper {
        padding: 30px 76px 76px 76px;

        @media (max-width: 1024px) {
            padding: 30px 32px 32px 42px;
        }
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
    
    height: 50px;
}

.item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
    text-align: center;
}

#m {
    font-size: 16px;
    font-family: 'Nunito';
    font-style: italic;
    font-weight: 700;
}

.m {
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
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
    background-color: #b5f9ad;
    color: #0f5707;
    text-align: center;
    font-size: 32px;
    font-family: 'Nunito Sans';
    font-weight: 800;
    line-height: 25px;
}

.hidden {  
    opacity: 0%;
}

.none {
    display: none;
}
</style>

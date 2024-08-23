<template>
    <div class="FourteenthTask task_block">
        <div class="task_block__wrapper">
            <template v-if="answersCounter < 4">
                <div class="task_block__close" @click="hide">
                    <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title FourteenthTask__title">
                        Соедини букву, звук и картинку.
                    </p>
                </div>
                <div class="draggable-list" ref="taskBlock">

                    <div class="draggable-list__draggable-items">
                        <div class="draggable-list__words">

                            <VueDraggableNext  v-for="word in Task[0]" :key="word.id" :group="{ name: 'words', pull: 'clone', put: false }" :sort="false"
                            @choose="($event)=>{if (blockIsActive($event.from)) drag($event, word)}" ghost-class="hidden" :drag-class="'block'" data-is-active='true'>
                                
                                <div class="draggable-list__word"
                                :class="{ 'item_right': word.error == 1, 'item_wrong': word.error == -1 }"
                                :id="`draggable-list__word${word.id}`"
                                data-answer="true"
                                @mouseenter="($event)=>{if (blockIsActive($event.target.parentElement)) checkAndPlayAudio(word.audio)}" 
                                @touchstart="($event)=>{if (blockIsActive($event.target.parentElement)) checkAndPlayAudio(word.audio)}">
                                {{ word.text }}
                            </div>

                            </VueDraggableNext>

                            
                        </div>
                        <div class="draggable-list__speakers">
                            
                            <VueDraggableNext v-for="sound in Task[1]" :key="sound.id" :group="{ name: 'speakers', pull: 'clone', put: false }" :sort="false"
                            @choose="($event)=>{if (blockIsActive($event.from)) drag($event, sound)}" :ghost-class="'hidden'" :drag-class="'block'" data-is-active='true'>
                                <div class="draggable-list__speaker"
                                :class="{ 'item_right': sound.error == 1, 'item_wrong': sound.error == -1 }"
                                @mouseenter="($event)=>{if (blockIsActive($event.target.parentElement)) checkAndPlayAudio(sound.audio)}" 
                                @touchstart="($event)=>{if (blockIsActive($event.target.parentElement)) checkAndPlayAudio(sound.audio)}">
                        
                                <img src="/assets/icons/speaker-violet.svg" alt="speaker" class="speaker"
                                        :draggable="sound.isActive" />
                                </div>
                            </VueDraggableNext>

                        </div>
                    </div>
                    <div class="draggable-list__answer-zone">
                        <div class="draggable-list__answer" v-for="answer in Answer" :key="answer">
                            <img :src="getPictureUrl(answer.img)" alt="lesyaandmoa" class="lesyaandmoa" />
                            <div class="draggable-list__subanswer">
                                
                                <VueDraggableNext :group="{ name: 'word', pull: false, put: true }" :sort="false"
                                @add = "drop($event, 'word', answer.id)" :ghost-class="'none'">

                                    <div class="draggable-list__word"
                                    :class="{ 'item_right': answer.word.error == 1, 'item_wrong': answer.word.error == -1 }"
                                    :id="`${answer.id == 1 ? 'draggable-list__word1' : 'draggable-list__word5'}`" 
                                    :data-id="answer.id" :data-type="answer.type">
                                    {{ answer.word.isActive ? answer.word.text : "" }}

                                    </div>

                                </VueDraggableNext>

                                <VueDraggableNext :group="{ name: 'speakers', pull: false, put: true }" :sort="false"
                                @add = "drop($event, 'sound', answer.id)" :ghost-class="'none'" 
                                >

                                    <div class="draggable-list__speaker"
                                    :class="{ 'item_right': answer.sound.error == 1, 'item_wrong': answer.sound.error == -1 }"
                                    :data-id="answer.id" :data-type="answer.type">
                                    <img v-if="answer.sound.isActive" src="/assets/icons/speaker-violet.svg"
                                        alt="speaker" class="speaker" />
                                    </div>

                                </VueDraggableNext>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <TaskResultBanner :bg="getImageUrl('moa.gif')" text="Друзья заметили, что письменная б (БЭ), которая звучит,
            как [б] или [б'] похожа на белку с поднятым хвостом. В слове «белка» звучит [б']. А письменная д, которая звучит, как [д] или [д'], похожа на дятла,
            у которого хвостик вниз. В слове «дятел» звучит [д']." v-else @next="next()" @hide="hide()">
            </TaskResultBanner>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
import DragndropComponent from './DragndropComponent.vue';

import { dataTask, dataAnswer } from './task';
import draggable from 'vuedraggable';

import gameActions from '@mixins/gameAction';

const { methods } = gameActions;
const { endGameRequest, startGameRequest, getCorrectAnswer } = methods;

// onMounted(() => {
//     const correct = getCorrectAnswer(14, props.childId);
//     corrValue.value = correct.correctId;
//     is_correct.value = correct.is_correct;
// });

const corrValue = ref(0)
const is_correct = ref(null)

const emit = defineEmits(['close', 'next-modal', 'correct', 'open']);
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
const hide = () => {
    emit('close');
};
const next = () => {
    emit('next-modal');
};

const audio = ref(new Audio())
const answersCounter = ref(0)

const Task = ref();
Task.value = structuredClone(dataTask);

const Answer = ref();
Answer.value = structuredClone(dataAnswer);

const taskBlock = ref(null);

const Cords = ref({
    x: 0,
    y: 0,
});

const draggableBlock = ref({
    src: '',
    class: '',
    text: '',
    type: '',
    id: 0,
});
const getPictureUrl = (path) => {
 return new URL(`/assets/img/${path}`, import.meta.url).href;
};
const getImageUrl = (path) => {
 return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};

const isDrag = ref(false);

const cloneBlock = ref()

const dataTransfer = ref({})
const drag = (event, elem) => {
    console.log(elem)
    dataTransfer.elem = elem
    isDrag.value = true
}

const drop = (event, type, id) => {
    event.to.removeChild(event.item)

    console.log(type, id)
    if (isDrag.value == false) return

    isDrag.value = false
    let elem = dataTransfer.elem

    console.log(elem, type, id)

    if (elem.type != type) return 

    if (elem.answer == id){
        if (elem.type == 'word') event.to.children[0].innerHTML = elem.text
        else event.to.children[0].innerHTML = '<img src="/assets/icons/speaker-violet.svg" alt="speaker" class="speaker" />'

        event.from.dataset['isActive'] = 'false'
        event.from.classList.add('hidden')

        event.to.children[0].classList.add('item_right')
        let reactionAudio_path = new URL(`/assets/audio/Task6/right.${Math.ceil(Math.random() * 3)}.mp3`, import.meta.url).href;
        let reactionAudio = new Audio(reactionAudio_path);
        reactionAudio.play();
        
        setTimeout(() => {
            event.to.children[0].classList.remove('item_right')
            answersCounter.value += 1

            if (answersCounter.value == 4) {
                setTimeout(() => {
                    if (is_correct.value === false) {
                        endGameRequest(props.childId, corrValue.value);
                        emit('correct');
                        emit('open');
                    }
                }, 1000)
                let finalaudio_path = new URL('/assets/audio/Task14/388.14.mp3', import.meta.url).href
                let finalaudio = new Audio(finalaudio_path);
                finalaudio.play();
            }
        }, 2000)
    }

    else{
        event.from.children[0].classList.add('item_wrong')
        let reactionAudio_path = new URL(`/assets/audio/Task6/wrong.${Math.ceil(Math.random() * 3)}.mp3`, import.meta.url).href;
        let reactionAudio = new Audio(reactionAudio_path);
        reactionAudio.play();
        
        setTimeout(() => {
            event.from.children[0].classList.remove('item_wrong')
        }, 2000)    
    }


    
}

const blockIsActive = (block) => {
    console.log(block)
    return block.dataset['isActive'] == 'true'
}

const checkAndPlayAudio = (audio) =>{
    playAudio(new URL(`/assets/audio/${audio}`, import.meta.url).href)
}

const playAudio = (audioPath) => {
    if (audioPath != '/') {
        if (audio.value.src) audio.value.pause();
        audio.value.src = audioPath;
        audio.value.play();
    }
}
</script>

<style lang="scss" scoped>
* {
    user-select: none;
}

.FourteenthTask {
    width: 1200px;
}

.FourteenthTask__title {
    width: 389px;

    @media (max-width: 1024px) {
        width: 328px;
        font-weight: 400;
        font-size: 20px;
    }
}

.draggable-list {
    position: relative;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 32px;
    width: 848px;
    height: 448px;

    @media (max-width: 1024px) {
        margin-top: 20px;
        width: 680px;
        height: 341px;
    }
}

.draggable-list__draggable-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 144px;

    @media (max-width: 1024px) {
        height: 108px;
    }
}

.draggable-list__words {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 52px;

    @media (max-width: 1024px) {
        height: 40px;
    }
}

.draggable-list__word {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 108px;
    height: 52px;
    background-color: $blueGame;
    color: $darkBlue;
    border-radius: 6px;
    font-family: 'czizh', sans-serif;
    font-size: 44px;

    @media (max-width: 1024px) {
        width: 80px;
        height: 40px;
        font-size: 36px;
    }
}

#draggable-list__word1 {
    padding-top: 5px;
}

#draggable-list__word2 {
    padding-bottom: 10px;
}

#draggable-list__word3 {
    padding-bottom: 17px;

    @media (max-width: 1024px) {
        padding-bottom: 11px;
    }
}

#draggable-list__word4 {
    padding-top: 5px;
}

#draggable-list__word5 {
    padding-bottom: 23px;

    @media (max-width: 1024px) {
        padding-bottom: 17px;
    }
}

#draggable-list__word6 {
    padding-bottom: 23px;

    @media (max-width: 1024px) {
        padding-bottom: 17px;
    }
}

.draggable-list__speakers {
    display: flex;
    justify-content: space-between;
    width: 552px;
    height: 52px;

    @media (max-width: 1024px) {
        width: 440px;
        height: 40px;
    }
}

.draggable-list__speaker {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 108px;
    height: 52px;
    background-color: $puppe;
    border-radius: 6px;

    @media (max-width: 1024px) {
        width: 80px;
        height: 40px;
    }
}

.speaker {
    width: 32px;
    height: 32px;

    @media (max-width: 1024px) {
        width: 26px;
        height: 26px;
    }
}

.draggable-list__answer-zone {
    display: flex;
    justify-content: space-between;
    width: 576px;
    height: 264px;

    @media (max-width: 1024px) {
        width: 448px;
        height: 205px;
    }
}

.draggable-list__answer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    width: 268px;
    height: 100%;
    border: 1px solid $darkBlue;
    border-radius: 6px;

    @media (max-width: 1024px) {
        width: 204px;
        padding: 16px;
    }
}

.lesyaandmoa {
    width: 228px;
    height: 160px;

    @media (max-width: 1024px) {
        width: 172px;
        height: 121px;
    }
}

.draggable-list__subanswer {
    display: flex;
    justify-content: space-between;
    width: 228px;
    height: 52px;

    @media (max-width: 1024px) {
        width: 172px;
        height: 40px;
    }
}

.item_right {
    border: 2px solid #5ccf54;
}

.item_wrong {
    border: 2px solid #db0000;
}

.none{
    display: none !important;
}

.block {
    display: flex !important;
    opacity: 100% !important;
}

.hidden{
    opacity: 0% !important;
}
</style>
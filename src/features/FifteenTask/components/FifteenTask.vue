<template>
    <div class="SixTask task_block">
        <div class="task_block__wrapper">
            <template v-if="answersCounter < 26">
                <div class="task_block__close" @click="hide">
                    <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title">
                        Расшифруй сообщение.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="draggable-list__items">
                        <div class="draggable-list__item" v-for="row in taskData" :key="row">
                            <VueDraggableNext v-for="word in row" :key="word.text"
                            :group="(word.x == 0 || word.y == 0) ? { name: 'words', pull: false, put: false } : { name: 'words', pull: 'clone', put: false }" :sort="false"
                            @choose="($event)=>{drag($event, word)}" ghost-class="block" :drag-class="`${(word.x == 0 || word.y == 0) ? 'hidden' : 'block'}`" data-is-active='true'>
                                <div class="draggable-list__button" :class="{
                                    'draggable-list__button_main':
                                        word.x == 0 || word.y == 0,
                                    'draggable-list__button_task':
                                        word.x != 0 && word.y != 0,
                                }"
                                    @click="playAudio(word.text)">
                                    {{ word.text }}
                                </div>
                            </VueDraggableNext>
                        </div>
                    </div>
                </div>

                <div class="task_block__list" v-if="true">
                    <div class="task_block__items">
                        <div class="task_block__row" v-for="row in rowsData" :key="row.id">
                            <div class="task_block__word" v-for="word in row.data" :key="word.id">

                                <VueDraggableNext v-for="letter in word.data" :key="letter" :group="{ name: 'speakers', pull: false, put: true }" :sort="false"
                                @add = "dropLetter($event, letter)" :ghost-class="'none'" >

                                    <div class="task_block__letter"
                                    :class="{ task_block__letter_active: letter.isActive}">
                                    {{ letter.text }}
                                </div>

                                </VueDraggableNext>

                                <img class="comma" src="/assets/icons/comma-blue.svg" alt="comma-blue" v-if="
                                    [18].includes(word.data.slice(-1)[0].id) &&
                                    word.data.slice(-1)[0].isActive
                                " />
                                <div class="draggable-list__full-stop" v-if="
                                    [6, 26].includes(
                                        word.data.slice(-1)[0].id
                                    ) && word.data.slice(-1)[0].isActive
                                ">
                                    <img src="/assets/icons/full-stop-blue.svg" alt="full-stop-blue" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <TaskResultBanner :img="getImageUrl('king.png')" :bg="getImageUrl('lesya.gif')" text="Блестяще!"
                v-if="answersCounter == 26" @next="next()" @hide="hide()" class="end-modal"></TaskResultBanner>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';

import { tasksData } from './tasks.js';
import audioMap from './dict.js'

import gameActions from '@mixins/gameAction';
import { tr } from 'vuetify/lib/locale/index.mjs';
import { SvgIcon } from '@shared/components/svgIcon';

const { methods } = gameActions;
const { endGameRequest, startGameRequest, getCorrectAnswer } = methods;



const corrValue = ref(0)
const is_correct = ref(false)

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

const getImageUrl = (path) => {
    return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};


let legalWords = [];

const taskData = ref([]);
const rowsData = ref([]);

const answersCounter = ref(0);
const audio = ref(new Audio());

[taskData.value, rowsData.value] = structuredClone(tasksData);

for (let row = 1; row in taskData; row++) {
    for (let column = 1; column in taskData[row]; column++) {
        legalWords.push(taskData[row][column]);
    }
}

const playAudio = (text) => {
    if (!audio.value.paused) audio.value.pause()
    if (text) {
        audio.value.src = new URL(`/assets/audio/Task15/${audioMap.get(text)}`, import.meta.url).href;
        audio.value.play()
    }
}

const dataTransfer = ref({})

const drag = (event, word) => {
    // event.dataTransfer.setData('text', `${x} ${y} ${text}`);

    dataTransfer.value = word
};

let finalSrc = new URL('/assets/audio/Task15/426.15_.mp3', import.meta.url).href
let finalaudio = new Audio(finalSrc);
const dropLetter = (event, letter) => {
    // let dragx = event.dataTransfer.getData('text').split(' ')[0];
    // let dragy = event.dataTransfer.getData('text').split(' ')[1];
    // let dragtext = event.dataTransfer.getData('text').split(' ')[2];

    event.to.removeChild(event.item)

    let dragx = dataTransfer.value.x;
    let dragy = dataTransfer.value.y;
    let dragtext = dataTransfer.value.text

    let x = letter.x;
    let y = letter.y;
    let id = letter.id;
    let isActive = letter.isActive;


    if (!isActive) {
        if (dragx == x && dragy == y) {
            rowsData.value.map((row) =>
                row.data.map((word) => {
                    word.data.map((letter) => {
                        if (letter.id == id) {
                            letter.text = dragtext;
                            letter.isActive = true;

                            word.answerCounter += 1

                            if (
                                ((word.id == 1 || word.id == 3 || word.id == 8 || word.id == 10 || word.id == 13) && word.answerCounter == 1) ||
                                ((word.id == 2 || word.id == 4 || word.id == 5 || word.id == 6 || word.id == 11 || word.id == 12 || word.id == 14) && word.answerCounter == 2) ||
                                (word.id == 9 && word.answerCounter == 3) ||
                                (word.id == 7 && word.answerCounter == 4)
                            ) {
                                setTimeout(() => {
                                    let audioPath = new URL(`/assets/audio/Task15/${audioMap.get('слово-' + word.id)}`, import.meta.url).href
                                    let word_audio = new Audio(audioPath);
                                    word_audio.play()
                                }, 1000)
                            }
                        }
                    });
                })
            );

            answersCounter.value += 1;
            setTimeout(() => {
                event.target.children[0].classList.add('task_block__letter_right');
            }, 1)
            let reactionAudioSrc = new URL(
                `/assets/audio/Task6/right.${Math.ceil(Math.random() * 3)}.mp3`, import.meta.url).href
            let reactionAudio = new Audio(
                reactionAudioSrc
            );
            reactionAudio.play();

            setTimeout(() => {
                event.target.children[0].classList.remove('task_block__letter_right');

                if (answersCounter.value == 26) {
                    setTimeout(() => {
                        if (is_correct.value === false) {
                            endGameRequest(props.childId, corrValue.value);
                            emit('correct');
                            emit('open');
                        }
                    }, 1000)

                    finalaudio.play();
                }

            }, 2000);
        } else {
            event.target.children[0].classList.add('task_block__letter_wrong');

            let reactionAudioSrc = new URL(
                `/assets/audio/Task6/wrong.${Math.ceil(Math.random() * 3)}.mp3`, import.meta.url).href
            let reactionAudio = new Audio(
                reactionAudioSrc
            );
            reactionAudio.play();

            setTimeout(() => {
                event.target.children[0].classList.remove('task_block__letter_wrong');
            }, 2000);
        }
    }
};

onMounted(async() => {
    try {
        const correct = await getCorrectAnswer(15, props.childId);
        if (correct) {
            corrValue.value = correct.correctId;
            is_correct.value = correct.is_correct;
        } else {
            console.error('getCorrectAnswer returned undefined');
        }
    } catch (err) {
        console.error('Error fetching correct answer:', err);
    }
});

onMounted(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.style.setProperty(
        '--scroll-position',
        `${scrollY}px`,
    );
    document.getElementsByTagName('html')[0].classList.add('no-scroll');
    document.body.classList.add('no-scroll'); /* Прокрутка ставится на паузу */

    console.log('game mount')
});


onBeforeUnmount(() => {
    document.getElementsByTagName('html')[0].classList.remove('no-scroll');
    document.body.classList.remove('no-scroll'); /* Прокрутка возвращается */

    finalaudio.src = "";
    console.log('game unmount')
});

</script>
<style lang="scss" scoped>
* {
    user-select: none;
}

.end-modal {
    width: 1200px;
    height: 600px;


    @media (max-width: 1200px) {
        width: 944px;
        height: 500px;
    }
}

.draggable-list {
    display: flex;
    gap: 88px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;

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
    gap: 2px;

    @media (max-width: 1024px) {
        gap: 2px;
    }
}

.draggable-list__item {
    display: flex;
    justify-content: center;
    gap: 2px;
}

.draggable-list__item {
    width: 100%;
    height: 40px;
}

.draggable-list__button {
    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;
    width: 68px;
    height: 40px;
    background-color: $lightPink;
    color: $vihous;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    letter-spacing: 0;
    border-radius: 6px;
    font-weight: bold;
}

.draggable-list__button_main {
    background: #d2efff;
    color: $darkBlue;
}

.draggable-list__button_task {
    background: #b5f9ad;
    color: #0f5707;
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

.item_right {
    border: 2px solid #5ccf54;
}

.item_wrong {
    border: 2px solid #db0000;
}

.item_unselected {
    border: none;
}

.task_block__list {
    width: 1074px;
    margin-top: 60px;
}

.task_block__items {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.task_block__row {
    display: flex;
    gap: 16px;
    justify-content: center;
}

.task_block__word {
    display: flex;
    gap: 2px;
}

.task_block__letter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 68px;
    height: 40px;
    border-radius: 6px;

    /* background/blue */
    background: rgb(210, 239, 255);

    color: rgb(154, 169, 193);
    font-family: Nunito;
    font-size: 20px;
    font-weight: 700;
    line-height: 27px;
    letter-spacing: 0%;
}

.task_block__letter_active {
    background: rgb(181, 249, 173);
    color: #0f5707;
}

.task_block__letter_wrong {
    border: 2px solid #db0000;
}

.task_block__letter_right {
    border: 2px solid #5ccf54;
}

.draggable-list__full-stop {
    display: flex;
    align-items: flex-end;
    width: 11px;
    height: 40px;

    @media (max-width: 1024px) {
        width: 8px;
        height: 40px;
    }
}

.comma {
    position: relative;
    top: -4px;
    transform: scale(0.85);
    fill: rgb(15, 87, 7);
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

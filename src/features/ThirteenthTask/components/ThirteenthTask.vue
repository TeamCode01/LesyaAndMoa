<template>
    <template v-if="endGame === false">
        <div class="ThirteenthTask task_block">
            <div class="ThirteenthTask__wrapper">
                <div class="task_block__close" @click="hide">
                    <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 ThirteenthTask__title">
                        Дополни предложения недостающими словами.
                    </p>
                </div>

                <div class="draggable-list">
                    <div v-for="(item, index) in words" :id="item.id + '_elem'" :key="index.id"
                        class="list-group-item item" draggable="true" @mouseover="playAudio(item.audio)"
                        @mouseout="stopAudio(item.audio)" @dragstart="drag($event, item.name, item.id, index)"
                        @dragover.prevent :value="item.name">
                        {{ item.name }}
                    </div>
                </div>
                <div class="ThirteenthTask__wrapper_answer" v-show="answer === ''">
                    Мы очень
                    <input readonly :class="{ correct: answer_drop === 'РАДЫ' }" @drop="drop($event)"
                        @dragover="allowDrop($event)" v-model="answer_drop" type="text" />
                    с вами познакомиться.
                </div>
                <div v-show="answer === 'РАДЫ'" class="ThirteenthTask__wrapper_answer">
                    Нам нравится
                    <input readonly :class="{ correct: answer_drop === 'ОБЩАТЬСЯ' }" @drop="drop($event)"
                        @dragover="allowDrop($event)" v-model="answer_drop" type="text" />
                    с вами.
                </div>
                <div v-show="answer === 'ОБЩАТЬСЯ'" class="ThirteenthTask__wrapper_answer">
                    Приходите чаще на
                    <input readonly :class="{ correct: answer_drop === 'ДЕТСКУЮ' }" @drop="drop($event)"
                        @dragover="allowDrop($event)" v-model="answer_drop" type="text" />
                    площадку.
                </div>
            </div>
        </div>
    </template>

    <TaskResultBanner img="/assets/backgrounds/Cup.png" bg="/assets/backgrounds/Lesya.gif" text="Чудесно!" v-else
        class="end-modal" @next="next" @hide="hide"></TaskResultBanner>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';

import { TaskResultBanner } from '@features/TaskResultBanner/components';
import gameActions from '@mixins/gameAction';
const { methods } = gameActions;
const { endGameRequest, startGameRequest, getCorrectAnswer } = methods;
const emit = defineEmits(['close', 'next-modal', 'correct', 'open']);
const endGame = ref(false);
const hide = () => {
    emit('close');
    endGame.value = true;
};
const audio = ref(new Audio());

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

const playAudio = async (audioPath) => {
    audio.value.src = audioPath;
    if (props.finish === true) {
        await audio.value.play();
    }
}

const playEndAudio = (audioPath) => {
    const end_audio = new Audio();
    end_audio.src = audioPath;
    end_audio.play();
}

const stopAudio = (audioPath) => {
    if (audio.value.paused) {
        playAudio(audioPath);
    } else {
        audio.value.pause();
    }
}

const is_correct = ref(null);
const corrValue = ref(0);

const words = ref([
    { id: 1, name: 'РАДЫ', audio: '/assets/audio/Task13/371.13.mp3' },
    { id: 2, name: 'РАССТРОЕНЫ', audio: '/assets/audio/Task13/372.13.mp3' },
    { id: 3, name: 'ДЕТСКУЮ', audio: '/assets/audio/Task13/373.13.mp3' },
    { id: 4, name: 'ВЗРОСЛУЮ', audio: '/assets/audio/Task13/374.13.mp3' },
    { id: 5, name: 'ОБЩАТЬСЯ', audio: '/assets/audio/Task13/375.13.mp3' },
    { id: 6, name: 'РУГАТЬСЯ', audio: '/assets/audio/Task13/376.13.mp3' }
]);
const answer_drop = ref('?');
const answer = ref('');
const answer_two = ref('');
const answer_three = ref('');
const dropIndex = ref(words.value.length - 1);
const drag = (event, word, id, index) => {
    event.dataTransfer.setData('text', word);
    event.dataTransfer.setData('id', id);
    dropIndex.value = index;
};

const drop = (event) => {
    event.preventDefault();
    let text = event.dataTransfer.getData('text');
    let id = event.dataTransfer.getData('id');
    let elem = document.getElementById(id + '_elem');
    if (
        (answer.value === '' && text === 'РАДЫ') ||
        (answer.value === 'РАДЫ' && text === 'ОБЩАТЬСЯ') ||
        (answer.value === 'ОБЩАТЬСЯ' && text === 'ДЕТСКУЮ')
    ) {
        playAudio('/assets/audio/Common/1.2.mp3');
        elem.classList.add('green');
        answer_drop.value = text;
        setTimeout(() => {
            words.value.splice(dropIndex.value, 1);
            elem.classList.remove('green');
            answer.value = text;
            answer_drop.value = '?';
        }, 2000);

        if (text === 'ДЕТСКУЮ') {
            event.target.classList.add('green');

            playAudio('/assets/audio/Common/1.2.mp3');
            setTimeout(() => {
                event.target.classList.remove('green');
                if (is_correct.value === false) {
                    endGameRequest(props.childId, corrValue.value);
                    emit('correct');
                    emit('open');
                }
                endGame.value = true;
            }, 2000)

        }
    }
    else {
        playAudio('/assets/audio/Common/2.1.mp3');
        elem.classList.add('red');
        setTimeout(() => {
            elem.classList.remove('red');
        }, 2000)

        return false;
    }
};

const allowDrop = (event) => {
    event.preventDefault();
};

onMounted(() => {
    const correct = getCorrectAnswer(13, props.childId);
    corrValue.value = correct.correctId;
    is_correct.value = correct.is_correct;
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

.draggable-list {
    display: flex;
    flex-wrap: wrap;
    column-gap: 48px;
    justify-content: center;
    row-gap: 48px;
    width: 100%;
    max-width: 570px;
    margin: 60px auto;
}

.ThirteenthTask {
    &__wrapper {
        padding: 30px 60px 60px;
        position: relative;

        @media (max-width: 1024px) {
            padding: 30px 20px;
        }

        &_answer {
            background-color: $blueGame;
            width: 100%;
            padding: 35px 17px;
            text-align: center;
            color: #4e3b7f;
            margin-top: 120px;
            font-size: 22px;
            font-weight: 700;
            font-family: 'Nunito';
            border-radius: 20px;
            border: none;

            resize: none;
            overflow-y: hidden;
            height: 100px;

            input {
                width: 101px;
                height: 44px;
                border: none;
                border-radius: 6px;
                margin: 0px 27px;
                color: #4e3b7f;
                font-size: 22px;
                font-weight: 700;
                outline: none;
                font-family: 'Nunito';
                text-align: center;

            }
        }
    }
}

.correct {
    background-color: $blueGame;
    text-transform: lowercase;
    margin: 0px !important;
    min-width: 60px !important;
}

.item {
    background-color: #e2d6f9;
    padding: 8.5px 20px;
    color: #4e3b7f;
    font-size: 20px;
    font-weight: Bold;
    font-family: 'Nunito';
    border-radius: 6px;
    border: none;
    cursor: pointer;
}
</style>

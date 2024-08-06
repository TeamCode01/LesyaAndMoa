<template>
    <template v-if="endGame === false">
        <div class="FirstTask task_block">
            <div class="FirstTask__wrapper">
                <div class="task_block__close" @click="hide">
                    <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 FirstTask__title">
                        Составь рассказ про АЛФАВИТ из подходящих фраз.
                    </p>
                </div>

                <div class="draggable-list__wrapper">
                    <div class="draggable-list">
                        <q-btn v-for="(item, index) in words" :key="item.id" :id="item.id + '_elem'"
                            class="list-group-item item" draggable="true" @mouseover="playAudio(item.audio)"
                            @mouseout="stopAudio(item.audio)" @dragstart="drag($event, item.name, item.id, index)"
                            @dragover.prevent :value="item.name">
                            {{ item.name }}
                        </q-btn>
                    </div>
                    <input @drop="drop($event)" @dragover="allowDrop($event)" v-model="answer"
                        class="FirstTask__wrapper_answer" />
                </div>
            </div>
        </div>
    </template>
    <TaskResultBanner img="/assets/backgrounds/flowers.png" bg="/assets/backgrounds/moa.gif" text="Супер!" v-else
       @next="next()" @hide="hide()" class="end-modal"></TaskResultBanner>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { HTTP } from '@app/http';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
import { useAnswerStore } from '@layouts/stores/answers';
import gameActions from '@mixins/gameAction';

const { methods } = gameActions;
const { endGameRequest, startGameRequest } = methods;
const emit = defineEmits(['close', 'next-modal']);
const answerStore = useAnswerStore();
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
const endGame = ref(false);
let is_correct = ref(null);
const hide = () => {
    emit('close');
    endGame.value = true;
};
const next = () => {
    emit('next-modal');
    is_correct.value;
    endGame.value = true;
}


const audio = ref(new Audio());
const playAudio = (audioPath) => {
    audio.value.src = audioPath;
    if (props.finish === true) {
        audio.value.play();
    }

}
let correctId = ref(0);


const stopAudio = (audioPath) => {
    audio.value.src = '';
}
const words = ref([
    { id: 1, name: 'медведи и зайцы', index: 11, audio: '/assets/audio/Task1/13.1.mp3' },
    { id: 2, name: 'Вместе они составляют АЛФАВИТ', index: 2, audio: '/assets/audio/Task1/14.1.mp3' },
    { id: 3, name: 'в слоги и в слова.', index: 5, audio: '/assets/audio/Task1/15.1.mp3' },
    { id: 4, name: 'В нашем языке', index: 0, audio: '/assets/audio/Task1/16.1.mp3' },
    { id: 5, name: 'в леса и поля', index: 22, audio: '/assets/audio/Task1/17.1.mp3' },
    { id: 6, name: 'есть иероглифы', index: 81, audio: '/assets/audio/Task1/18.1.mp3' },
    { id: 7, name: 'и складываются', index: 3, audio: '/assets/audio/Task1/19.1.mp3' },
    { id: 8, name: 'явления и предметы', index: 7, audio: '/assets/audio/Task1/20.1.mp3' },
    { id: 9, name: 'есть буквы.', index: 1, audio: '/assets/audio/Task1/21.1.mp3' },
    { id: 10, name: 'Все вместе они образуют МОЗАИКУ', index: 9, audio: '/assets/audio/Task1/22.1.mp3' },
]);
const wordsAnswer = ref({
    0: { id: 4, name: 'В нашем языке' },
    1: { id: 9, name: 'есть буквы.', },
    2: { id: 2, name: 'Вместе они составляют АЛФАВИТ' },
    3: { id: 7, name: 'и складываются', },
    4: { id: 3, name: 'в слоги и в слова.', },
});
const answer = ref('');

const answer_arr = ref([]);
const dropIndex = ref(words.value.length - 1);
const drag = (event, word, id, index) => {
    event.dataTransfer.setData('text', word);
    event.dataTransfer.setData('id', id);
    dropIndex.value = index;
};

const correctTask = async (child_id, id) => {
    try {
        const resp = await HTTP.patch(`answers/${child_id}/${id}`);
    } catch (e) {
        console.error('Error starting task', e);
    }
}

const drop = (event) => {
    event.preventDefault();
    let text = event.dataTransfer.getData('text');
    let id = event.dataTransfer.getData('id');
    let elem = document.getElementById(id + '_elem')

    if (answer_arr.value.length == 0) {

        if (wordsAnswer.value[0].id == id) {
            words.value.splice(dropIndex.value, 1);
            answer.value += text + ' ';
            answer_arr.value.push(0);
            playAudio('assets/audio/Other/1. общее для разных заданий.mp3');
        } else {
            elem.classList.add('red');
            setTimeout(() => {
                elem.classList.remove('red');
            }, 2000);
            playAudio('assets/audio/Other/2. общее для разных заданий.mp3');
            return false;
        }
    } else {

        let index = answer_arr.value.at(-1) + 1;
        if (wordsAnswer.value[index].id == id) {
            elem.classList.add('green');
            words.value.splice(dropIndex.value, 1);
            answer.value += text + ' ';
            answer_arr.value.push(index);
            playAudio('assets/audio/Other/1. общее для разных заданий.mp3');
        } else {
            elem.classList.add('red');
            setTimeout(() => {
                elem.classList.remove('red');
            }, 2000);
            playAudio('assets/audio/Other/2. общее для разных заданий.mp3');

            return false;
        }
    }
    if (answer_arr.value.length === 5) {
        setTimeout(() => {
            endGameRequest(props.childId, correctId.value);
            endGame.value = true;
        }, 3000)
    }
};

const allowDrop = (event) => {
    event.preventDefault();
};

onMounted(async () => {
    await answerStore.getAnswers(props.childId);
    const correctAnswer = answerStore.answers.find((item) => item.task.id === 1);
    correctId.value = correctAnswer.id;
    is_correct.value = correctAnswer.is_correct;
    if (correctAnswer.is_started === false) {
        startGameRequest(props.childId, 1)
    }
})
</script>
<style lang="scss" scoped>
.end-modal {
    width: 1200px;
    height: 600px;
}

.red {
    border: 2px solid red !important;
}

.green {
    border: 2px solid green !important;
}

.draggable-list {
    display: flex;
    flex-wrap: wrap;
    column-gap: 133px;
    justify-content: center;
    row-gap: 48px;
    width: 100%;
    max-width: 1020px;
    margin: 48px auto;
    max-height: 240px;

    @media (max-width: 1130px) {
        column-gap: 70px;
        row-gap: 30px;
        max-height: 194px;
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 500px;

        @media (max-width: 1130px) {
            width: 904px;
            // height: 322px;
        }

        @media (max-width: 1024px) {

            height: 322px;
        }
    }


}

.FirstTask {
    &__wrapper {
        display: flex;
        flex-direction: column;
        padding: 30px 60px 67px 60px;
        position: relative;
        height: 600px;

        @media (max-width: 1024px) {
            padding: 30px 20px 43px 20px;
        }

        &_block {
            display: flex;
            justify-content: space-around;
            margin-top: 48px;

            @media (max-width: 1024px) {
                margin-top: 28px;
            }
        }

        &_content {
            margin-top: 48px;
            display: flex;
            justify-content: space-between;
        }

        &_answer {
            background-color: $blueGame;
            width: 100%;
            padding: 35px 17px;
            color: #0f5707;
            font-size: 22px;
            font-weight: 700;
            font-family: 'Nunito', sans-serif;
            border-radius: 20px;
            // margin-top: 20px;
            border: none;
            text-shadow: 0 0 0 black;
            outline: none;
            resize: none;
            overflow-y: hidden;
            height: 100px;

            @media(max-width:1024px) {
                min-height: 80px;
            }
        }
    }
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
</style>

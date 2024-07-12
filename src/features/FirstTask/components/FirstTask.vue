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

                <div class="draggable-list">
                    <q-btn  v-for="(item, index) in words" :key="index.id" class="list-group-item item" draggable="true"
                        @dragstart="drag($event, item.name, item.audio, index)" @dragover.prevent :value="item.name">
                        {{ item.name }}
                    </q-btn>
                </div>
                <input @drop="drop($event)" @dragover="allowDrop($event)" v-model="answer"
                    class="FirstTask__wrapper_answer" />
            </div>
        </div>
    </template>
    <TaskResultBanner img="/assets/backgrounds/Cup.png" bg="/assets/backgrounds/Lesya.png" text="Отлично!"
        v-if="show === true" @hide="hideModal"></TaskResultBanner>
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
});
const endGame = ref(false);
const hide = () => {
    emit('close');
    endGame.value = true;
};


const show = ref(false);
const hideModal = () => {
    show.value = false;
}

const playAudio = (audioPath) => {
    const audio = new Audio(audioPath);
    audio.play();
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
const wordsAnswer = ref([
    { id: 1, name: 'В нашем языке', index: 3 },
    { id: 2, name: 'есть буквы.', index: 8 },
    { id: 3, name: 'Вместе они составляют АЛФАВИТ', index: 1 },
    { id: 4, name: 'и складываются', index: 6 },
    { id: 5, name: 'в слоги и в слова.', index: 2 },
]);
const answer = ref('');
const dropIndex = ref(words.value.length - 1);
const drag = (event, word, audio, index) => {
    event.dataTransfer.setData('text', word);
    dropIndex.value = index;
    playAudio(audio);
};

// const drop = (event, word) => {
//     event.preventDefault();
//     let text = event.dataTransfer.getData('text');
//     let correct = wordsAnswer.value.find((item) => item.name === text);
//     if (correct) {
//         words.value.splice(dropIndex.value, 1);
//         answer.value += text + ' ';
//     } else {
//         return false;
//     }
// };
const answerString = wordsAnswer.value.map((item) => item.name).join(' ');

const drop = (event, word) => {
    event.preventDefault();
    let text = event.dataTransfer.getData('text');
    let correct = wordsAnswer.value.find((item) => item.name === text);
    const answerWords = text.trim().split(' ');
    const answerStringWords = answerString.trim().split(' ');
    console.log(answerWords, answerStringWords);

    for (let i = 0; i < answerWords.length; i++) {
        if (answerWords[i].length == answerStringWords[i].length && correct) {
            answer.value += text + ' ';
            words.value.splice(dropIndex.value, 1);
        }
        else {
            alert('Попробуй еще!');
            return false;
        }
    }

    if (answer.value.trim() === answerString.trim()) {
        endGame.value = true;
        show.value = true;
    }
}
const allowDrop = (event) => {
    event.preventDefault();
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

.FirstTask {
    &__wrapper {
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
            margin-top: 20px;
            border: none;
            text-shadow: 0 0 0 black;
            outline: none;
            resize: none;
            overflow-y: hidden;
            height: 100px;
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

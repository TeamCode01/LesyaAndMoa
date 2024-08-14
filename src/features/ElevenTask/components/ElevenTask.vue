<template>
    <template v-if="endGame === false">
        <div class="ElevenTask task_block">
            <div class="ElevenTask__wrapper">
                <div class="task_block__close" @click="hide">
                    <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
                </div>

                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title">
                        Собери слова из двух частей, угадай, из какой сказки эти
                        герои.
                    </p>
                </div>
                <div class="ElevenTask__content">
                    <div class="fairy_tales__wrapper hide">
                        <div class="fairy_tales__item" @click="chooseFairyTail($event, item.correct)"
                            @mouseover="playAudio(item.audio)" @mouseout="stopAudio(item.audio)"
                            v-for="item in fairytails" :key="item.id">
                            «{{ item.name }}»
                        </div>
                    </div>

                    <div class="draggable-list">
                        <div class="list-group-item item" v-for="(item, index) in syllables" :key="item.id"
                            draggable="true" @mouseover="playAudio(item.audio)" @mouseout="stopAudio(item.audio)"
                            @dragstart="drag($event, item.name, item.id, index)" @dragover.prevent :value="item">
                            {{ item.name }}
                        </div>
                    </div>
                    <div class="finish_words__wrapper hide">
                        <div class="finish_words__item" v-for="item in finish_answers" :key="item">
                            {{ item }}
                        </div>
                    </div>
                    <div class="inputs">
                        <div class="input-group">
<<<<<<< HEAD
                            <input @drop="drop($event, 1, 1)" type="text" class="input-item row1 part1" />
                            <input @drop="drop($event, 2, 1)" type="text" class="input-item row1 part2" />
=======
                            <input @drop="drop($event, 1, 1)" type="text" class="input-item row1 part1" /><input
                                @drop="drop($event, 2, 1)" type="text" class="input-item row1 part2" />
>>>>>>> 9df1343790c43fdc1c337adf06fa05503f9c1949

                            <input @drop="drop($event, 1, 2)" type="text" class="input-item row2 part1" />
                            <input @drop="drop($event, 2, 2)" type="text" class="input-item row2 part2" />

                            <input @drop="drop($event, 1, 3)" type="text" class="input-item row3 part1" />
                            <input @drop="drop($event, 2, 3)" type="text" class="input-item row3 part2" />

                            <input @drop="drop($event, 1, 4)" type="text" class="input-item row4 part1" />
                            <input @drop="drop($event, 2, 4)" type="text" class="input-item row4 part2" />
                            
                            <input @drop="drop($event, 1, 5)" type="text" class="input-item row5 part1" />
                            <input @drop="drop($event, 2, 5)" type="text" class="input-item row5 part2" />

                            <input @drop="drop($event, 1, 6)" type="text" class="input-item row6 part1" />
                            <input @drop="drop($event, 2, 6)" type="text" class="input-item row6 part2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>

    <TaskResultBanner img="/assets/backgrounds/king.png" class="end-modal" bg="/assets/backgrounds/Lesya.png"
        text="Молодец!" v-else @next="next" @hide="hide"></TaskResultBanner>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
import gameActions from '@mixins/gameAction';
const { methods } = gameActions;
const { endGameRequest, startGameRequest, getCorrectAnswer } = methods;
const emit = defineEmits(['close', 'next-modal', 'correct']);
const audio = ref(new Audio());
const endGame = ref(false);
const hide = () => {
    emit('close');
    endGame.value = true;
};
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

const next = () => {
    emit('next-modal');
    endGame.value = true;
}

const is_correct = ref(null);
const correctId = ref(0);
const corrValue = ref(0);


const syllables = ref([
    { id: 1, name: 'МЫШ', part: 1, audio: '/assets/audio/Task11/331.11.mp3' },
    { id: 2, name: 'ГУШКА', part: 2, audio: '/assets/audio/Task11/337.11.mp3' },
    { id: 3, name: 'ЛЯ', part: 1, audio: '/assets/audio/Task11/332.11.mp3' },
    { id: 4, name: 'ЧИК', part: 2, audio: '/assets/audio/Task11/338.11.mp3' },
    { id: 5, name: 'ЗАЙ', part: 1, audio: '/assets/audio/Task11/333.11.mp3' },
    { id: 6, name: 'СИЧКА', part: 2, audio: '/assets/audio/Task11/339.11.mp3' },
    { id: 7, name: 'ЛИ', part: 1, audio: '/assets/audio/Task11/334.11.mp3' },
    { id: 8, name: 'КА', part: 2, audio: '/assets/audio/Task11/340.11.mp3' },
    { id: 9, name: 'ВОЛ', part: 1, audio: '/assets/audio/Task11/335.11.mp3' },
    { id: 10, name: 'ВЕДЬ', part: 2, audio: '/assets/audio/Task11/341.11.mp3' },
    { id: 11, name: 'МЕД', part: 1, audio: '/assets/audio/Task11/336.11.mp3' },
    { id: 12, name: 'ЧОК', part: 2, audio: '/assets/audio/Task11/342.11.mp3' },
]);
const dropIndex = ref(syllables.value.length - 1);
const drag = (event, syllable, id, index) => {
    event.dataTransfer.setData('text', syllable);
    event.dataTransfer.setData('id', id);
    dropIndex.value = index;
};
const finish_answers = ref([]);
const fairytails = ref([
    { id: 1, name: 'ТРИ МЕДВЕДЯ', correct: false, audio: '/assets/audio/Task11/343.11.mp3' },
    { id: 2, name: 'ТЕРЕМОК', correct: true, audio: '/assets/audio/Task11/344.11.mp3' },
    { id: 3, name: 'РЕПКА', correct: false, audio: '/assets/audio/Task11/345.11.mp3' },
    { id: 4, name: 'КОЛОБОК', correct: false, audio: '/assets/audio/Task11/346.11.mp3' },
    { id: 5, name: 'ГУСИ-ЛЕБЕДИ', correct: false, audio: '/assets/audio/Task11/347.11.mp3' },
]);

const answers = ref([
    'зайчик',
    'мышка',
    'лягушка',
    'лисичка',
    'медведь',
    'волчок',
]);

const drop = (event, part, row) => {
    event.preventDefault();
    if (syllables.value[dropIndex.value].part != part) {
        playEndAudio('/assets/audio/Common/2.1.mp3');
        return false;
    }
    let text = event.dataTransfer.getData('text');
    let id = event.dataTransfer.getData('id');
    let elem = document.getElementById(id);
    let secondPart = part == 1 ? 2 : 1;
    let element = document.querySelector('.row' + row + '.part' + secondPart);
    let firstBlock = document.querySelector('.draggable-list');
    let secondBlock = document.querySelector('.fairy_tales__wrapper');
    let finishAnswer = document.querySelector('.finish_words__wrapper');
    let starterInputs = document.querySelector('.inputs');
    if (!element.value.length) {
        event.target.value = text;
        syllables.value.splice(dropIndex.value, 1);
        event.target.classList.add('item');
    } else {
        let word = part == 1 ? text + element.value : element.value + text;
        console.log(word);

        if (answers.value.includes(word.toLowerCase())) {
            event.target.value = text;
            finish_answers.value.push(word.toLowerCase());
            syllables.value.splice(dropIndex.value, 1);
            playEndAudio('/assets/audio/Common/1.2.mp3');
            event.target.classList.add('check');
            setTimeout(() => {
                event.target.classList.add('item');
                event.target.classList.remove('check');
            }, 2000);
            if (syllables.value.length == 0) {
                firstBlock.classList.add('hide');
                starterInputs.classList.add('hide');
                secondBlock.classList.remove('hide');
                finishAnswer.classList.remove('hide');
            }
        }
    }
};

const chooseFairyTail = (event, status) => {
    if (status === true) {
        event.target.value = status;
        event.target.classList.add('green');
        playEndAudio('/assets/audio/Common/1.2.mp3');
        fairytails.value = fairytails.value.filter(
            (item) => item.correct == true,
        );
        emit('correct', is_correct.value);
        setTimeout(() => {
            if (is_correct.value === false) {
                endGameRequest(props.childId, corrValue.value);
            }
            endGame.value = true;
            event.target.classList.remove('green');
        }, 2000);
    } else {
        event.target.value = status;
        playEndAudio('/assets/audio/Common/2.1.mp3');
        event.target.classList.add('red');
        setTimeout(() => {
            event.target.classList.remove('red');
        }, 2000);
        return false;
    }
};
const allowDrop = (event) => {
    event.preventDefault();
};

onMounted(async () => {
    const correct = await getCorrectAnswer(11, props.childId);
    corrValue.value = correct;
    await getCorrectAnswer(11, props.childId, correctId.value);
})
</script>
<style lang="scss" scoped>
*{
    user-select: none;
}
.end-modal {
    width: 1200px;
    height: 600px;
}

.fairy_tales__wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
}

.finish_words__wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
}

.finish_words__item {
    background-color: #d2efff;
    color: #000000;
    font-size: 20px;
    text-align: center;
    border-radius: 6px;
    font-weight: 500;
    text-align: center;
    font-family: 'Nunito', sans-serif;
    height: 52px;
    padding: 13px 88px;
}

.finish_words__item::first-letter {
    text-transform: uppercase;
}

.fairy_tales__item {
    text-align: center;
    font-size: 24px;
    width: fit-content;
    margin: 0px auto;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    color: #0f5707;
    background-color: #b5f9ad;
    border-radius: 8px;
    padding: 9.5px 20px;
    cursor: pointer;
    border: none;
}

.input {
    &-item {
        width: 108px;
        height: 52px;
        border: none;
        background-color: #d2efff;
        border-radius: 6px;
        color: transparent;
        text-shadow: 0 0 0 black;
        outline: none;
    }

    &-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: 16px;
        column-gap: 8px;
    }
}

.hide {
    display: none;
}

.show {
    display: block;
}

.ElevenTask {
    &__content {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        width: 100%;
        column-gap: 160px;
        align-items: center;

        @media (max-width: 1024px) {
            margin-top: 30px;
            column-gap: 120px;
        }
    }

    &__wrapper {
        padding: 30px 76px 76px 76px;
    }
}

.draggable-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 16px;
    column-gap: 8px;
}

.item {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 108px;
    height: 52px;
    background-color: #ffcce4;
    color: #c62582;
    border-radius: 6px;
    font-size: 24px;
    font-family: 'Nunito';
    font-weight: 700;

    text-align: center;
    border: none;
    cursor: pointer;
}

.green {
    border: 2px solid #5ccf54;
}

.red {
    border: 2px solid #DB0000
}

.check {
    width: 108px;
    height: 52px;
    background-color: #ffcce4;
    color: #c62582;
    border-radius: 6px;
    font-size: 24px;
    font-family: 'Nunito';
    font-weight: 700;
    text-align: center;
    border: 2px solid #5ccf54;
}

.fail {
    width: 108px;
    height: 52px;
    background-color: #ffcce4;
    color: #c62582;
    border-radius: 6px;
    font-size: 24px;
    font-family: 'Nunito';
    font-weight: 700;
    text-align: center;
    border: 2px solid #DB0000
}
</style>

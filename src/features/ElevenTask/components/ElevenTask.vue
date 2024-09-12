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
                        <VueDraggableNext class="list-group-item item" v-for="(item, index) in syllables" :key="item.id"
                        :group="{ name: 'syllables', pull: 'clone', put: false }" :sort="false"
                        @mouseover="playAudio(item.audio)"
                        @mouseout="stopAudio(item.audio)"
                        @touchstart="playAudio(item.audio)"
                        @choose="drag($event, item.name, item.id, index)">
                            <div :value="item">
                                {{ item.name }}
                            </div>
                        </VueDraggableNext>
                    </div>
                    <div class="finish_words__wrapper hide">
                        <div class="finish_words__item" v-for="item in finish_answers" :key="item">
                            {{ item }}
                        </div>
                    </div>
                    <div class="inputs">
                        <div class="input-group">
                            <VueDraggableNext :group="{ name: 'answers', pull: false, put: true }" :sort="false"
                                @add="drop($event, 1, 1)" ghost-class="none" draggable="false">
                                <input type="text" class="input-item row1 part1" />
                            </VueDraggableNext>
                            <VueDraggableNext :group="{ name: 'answers', pull: false, put: true }" :sort="false"
                                @add="drop($event, 2, 1)" ghost-class="none" draggable="false">
                                <input type="text" class="input-item row1 part2" />
                            </VueDraggableNext>

                            <VueDraggableNext :group="{ name: 'answers', pull: false, put: true }" :sort="false"
                                @add="drop($event, 1, 2)" ghost-class="none" draggable="false">
                                <input type="text" class="input-item row2 part1" />
                            </VueDraggableNext>
                            <VueDraggableNext :group="{ name: 'answers', pull: false, put: true }" :sort="false"
                                @add="drop($event, 2, 2)" ghost-class="none" draggable="false">
                                <input type="text" class="input-item row2 part2" />
                            </VueDraggableNext>

                            <VueDraggableNext :group="{ name: 'answers', pull: false, put: true }" :sort="false"
                                @add="drop($event, 1, 3)" ghost-class="none" draggable="false">
                                <input type="text" class="input-item row3 part1" />
                            </VueDraggableNext>
                            <VueDraggableNext :group="{ name: 'answers', pull: false, put: true }" :sort="false"
                                @add="drop($event, 2, 3)" ghost-class="none" draggable="false">
                                <input type="text" class="input-item row3 part2" />
                            </VueDraggableNext>

                            <VueDraggableNext :group="{ name: 'answers', pull: false, put: true }" :sort="false"
                                @add="drop($event, 1, 4)" ghost-class="none" draggable="false">
                                <input type="text" class="input-item row4 part1" />
                            </VueDraggableNext>
                            <VueDraggableNext :group="{ name: 'answers', pull: false, put: true }" :sort="false"
                                @add="drop($event, 2, 4)" ghost-class="none" draggable="false">
                                <input type="text" class="input-item row4 part2" />
                            </VueDraggableNext>

                            <VueDraggableNext :group="{ name: 'answers', pull: false, put: true }" :sort="false"
                                @add="drop($event, 1, 5)" ghost-class="none" draggable="false">
                                <input type="text" class="input-item row5 part1" />
                            </VueDraggableNext>
                            <VueDraggableNext :group="{ name: 'answers', pull: false, put: true }" :sort="false"
                                @add="drop($event, 2, 5)" ghost-class="none" draggable="false">
                                <input type="text" class="input-item row5 part2" />
                            </VueDraggableNext>

                            <VueDraggableNext :group="{ name: 'answers', pull: false, put: true }" :sort="false"
                                @add="drop($event, 1, 6)" ghost-class="none" draggable="false">
                                <input type="text" class="input-item row6 part1" />
                            </VueDraggableNext>
                            <VueDraggableNext :group="{ name: 'answers', pull: false, put: true }" :sort="false"
                                @add="drop($event, 2, 6)" ghost-class="none" draggable="false">
                                <input type="text" class="input-item row6 part2" />
                            </VueDraggableNext>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>

    <TaskResultBanner :img="getImageUrl('king.png')" :bg="getImageUrl('lesya.gif')" class="end-modal"
        text="Молодец!" v-else @next="next" @hide="hide"></TaskResultBanner>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';

import { VueDraggableNext } from 'vue-draggable-next';
import gameActions from '@mixins/gameAction';
import { SvgIcon } from '@shared/components/svgIcon';

const { methods } = gameActions;
const { endGameRequest, startGameRequest, getCorrectAnswer } = methods;
const emit = defineEmits(['close', 'next-modal', 'correct', 'open']);
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

const getImageUrl = (path) => {
  return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};


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
        playAudio(audioPath);
    } else {
        audio.value.pause();
    }
}

const next = () => {
    emit('next-modal');
    endGame.value = true;
}

const is_correct = ref(false);
const corrValue = ref(0);


const syllables = ref([
    { id: 1, name: 'МЫШ', part: 1, audio: 'Task11/331.11.mp3' },
    { id: 2, name: 'ГУШКА', part: 2, audio: 'Task11/337.11.mp3' },
    { id: 3, name: 'ЛЯ', part: 1, audio: 'Task11/332.11.mp3' },
    { id: 4, name: 'ЧИК', part: 2, audio: 'Task11/338.11.mp3' },
    { id: 5, name: 'ЗАЙ', part: 1, audio: 'Task11/333.11.mp3' },
    { id: 6, name: 'СИЧКА', part: 2, audio: 'Task11/339.11.mp3' },
    { id: 7, name: 'ЛИ', part: 1, audio: 'Task11/334.11.mp3' },
    { id: 8, name: 'КА', part: 2, audio: 'Task11/340.11.mp3' },
    { id: 9, name: 'ВОЛ', part: 1, audio: 'Task11/335.11.mp3' },
    { id: 10, name: 'ВЕДЬ', part: 2, audio: 'Task11/341.11.mp3' },
    { id: 11, name: 'МЕД', part: 1, audio: 'Task11/336.11.mp3' },
    { id: 12, name: 'ЧОК', part: 2, audio: 'Task11/342.11.mp3' },
]);
const dropIndex = ref(syllables.value.length - 1);

const dataTransfer = ref({})
const drag = (event, syllable, id, index) => {
    // event.dataTransfer.setData('text', syllable);
    // event.dataTransfer.setData('id', id);

    dataTransfer.value.syllable = syllable;
    dataTransfer.value.id = id;
    dropIndex.value = index;
};
const finish_answers = ref([]);
const fairytails = ref([
    { id: 1, name: 'ТРИ МЕДВЕДЯ', correct: false, audio: 'Task11/343.11.mp3' },
    { id: 2, name: 'ТЕРЕМОК', correct: true, audio: 'Task11/344.11.mp3' },
    { id: 3, name: 'РЕПКА', correct: false, audio: 'Task11/345.11.mp3' },
    { id: 4, name: 'КОЛОБОК', correct: false, audio: 'Task11/346.11.mp3' },
    { id: 5, name: 'ГУСИ-ЛЕБЕДИ', correct: false, audio: 'Task11/347.11.mp3' },
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
    // event.preventDefault();

    Array.from(event.to.children).forEach(element => {
        if (element.tagName == 'DIV') {
            event.to.removeChild(element)
        }
    })

    if (syllables.value[dropIndex.value].part != part) {
        playEndAudio('Common/2.1.mp3');
        return false;
    }
    // let text = event.dataTransfer.getData('text');
    // let id = event.dataTransfer.getData('id');

    let text = dataTransfer.value.syllable;
    let id = dataTransfer.value.id;

    let elem = document.getElementById(id);
    let secondPart = part == 1 ? 2 : 1;
    let element = document.querySelector('.row' + row + '.part' + secondPart);
    let firstBlock = document.querySelector('.draggable-list');
    let secondBlock = document.querySelector('.fairy_tales__wrapper');
    let finishAnswer = document.querySelector('.finish_words__wrapper');
    let starterInputs = document.querySelector('.inputs');

    if (!element.value.length) {
        event.to.children[0].value = text;
        event.to.children[0].classList.add('item');
        // event.target.value = text;
        syllables.value.splice(dropIndex.value, 1);
        // event.target.classList.add('item');
    } else {
        let word = part == 1 ? text + element.value : element.value + text;

        if (answers.value.includes(word.toLowerCase())) {
            event.to.children[0].value = text;
            finish_answers.value.push(word.toLowerCase());
            syllables.value.splice(dropIndex.value, 1);
            playEndAudio('Common/1.2.mp3');
            event.to.children[0].classList.add('check');
            setTimeout(() => {
                event.to.children[0].classList.add('item');
                event.to.children[0].classList.remove('check');
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
        playEndAudio('Common/1.2.mp3');
        fairytails.value = fairytails.value.filter(
            (item) => item.correct == true,
        );

        setTimeout(() => {
            if (is_correct.value === false) {
                endGameRequest(props.childId, corrValue.value);;
                emit('correct');
                emit('open');
            }
            endGame.value = true;
            event.target.classList.remove('green');
            playAudio('Task11/348.11_.mp3')
        }, 1000);
    } else {
        event.target.value = status;
        playEndAudio('Common/2.1.mp3');
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

onMounted(async() => {
    const correct = await getCorrectAnswer(11, props.childId);
    corrValue.value = correct.correctId;
    is_correct.value = correct.is_correct;
})

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
    console.log('game unmount')
});

</script>
<style lang="scss" scoped>
*{
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

.hidden {
    opacity: 0%;
}

.none {
    display: none;
}

.list-group-item > div{
    width: 100%;
}
</style>

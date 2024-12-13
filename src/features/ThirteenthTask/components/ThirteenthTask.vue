<template>
    <template v-if="endGame === false">
        <div class="ThirteenthTask task_block">
            <div class="ThirteenthTask__wrapper">
                <div
                    class="task_block__close"
                    @click="
                        console.log('hide');
                        hide();
                    "
                >
                    <img
                        class="close-icon"
                        src="@app/assets/icons/close-icon.svg"
                        alt="крест"
                    />
                </div>

                <div class="game_icons_item" @click="mute()">
                    <img
                        v-show="isMuted === false"
                        src="@app/assets/icons/sound.svg"
                        alt="sound"
                    /><img
                        v-show="isMuted === true"
                        src="@app/assets/icons/muted.svg"
                        alt=""
                    />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="ThirteenthTask__title">
                        Дополни предложения недостающими словами.
                    </p>
                </div>

                <div class="draggable-list">
                    <VueDraggableNext
                        v-for="(item, index) in words"
                        :key="index.id"
                        @mouseover="playAudio(item.audio)"
                        @mouseout="stopAudio(item.audio)"
                        @touchstart="playAudio(item.audio)"
                        @choose="drag($event, item.name, item.id, index)"
                        :group="{ name: 'words', pull: 'clone', put: false }"
                        :sort="false"
                    >
                        <div
                            :id="item.id + '_elem'"
                            class="list-group-item item"
                            :value="item.name"
                        >
                            {{ item.name }}
                        </div>
                    </VueDraggableNext>
                </div>
                <div
                    class="ThirteenthTask__wrapper_answer"
                    v-show="answer === ''"
                >
                    Мы очень
                    <VueDraggableNext
                        :group="{ name: 'answer1', pull: false, put: true }"
                        :sort="false"
                        @add="drop($event)"
                        ghost-class="none"
                        draggable="false"
                    >
                        <input
                            readonly
                            :class="{ correct: answer_drop === 'РАДЫ' }"
                            v-model="answer_drop"
                            type="text"
                        />
                    </VueDraggableNext>
                    с вами познакомиться.
                </div>
                <div
                    v-show="answer === 'РАДЫ'"
                    class="ThirteenthTask__wrapper_answer"
                >
                    Нам нравится
                    <VueDraggableNext
                        :group="{ name: 'answer2', pull: false, put: true }"
                        :sort="false"
                        @add="drop($event)"
                        ghost-class="none"
                    >
                        <input
                            readonly
                            :class="{ correct: answer_drop === 'ОБЩАТЬСЯ' }"
                            v-model="answer_drop"
                            type="text"
                        />
                    </VueDraggableNext>
                    с вами.
                </div>
                <div
                    v-show="answer === 'ОБЩАТЬСЯ' || answer === 'ДЕТСКУЮ'"
                    class="ThirteenthTask__wrapper_answer"
                >
                    Приходите чаще на
                    <VueDraggableNext
                        :group="{ name: 'answer3', pull: false, put: true }"
                        :sort="false"
                        @add="drop($event)"
                        ghost-class="none"
                    >
                        <input
                            readonly
                            :class="{ correct: answer_drop === 'ДЕТСКУЮ' }"
                            v-model="answer_drop"
                            type="text"
                        />
                    </VueDraggableNext>
                    площадку.
                </div>
            </div>
        </div>
    </template>
    <TaskResultBanner
        :img="getImageUrl('Cup.png')"
        :bg="getImageUrl('lesya.gif')"
        text="Чудесно!"
        v-else
        class="end-modal"
        @next="next"
        @hide="hide"
    ></TaskResultBanner>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';

import { TaskResultBanner } from '@features/TaskResultBanner/components';
import gameActions from '@mixins/gameAction';

import { SvgIcon } from '@shared/components/svgIcon';

const { methods } = gameActions;
const { endGameRequest, startGameRequest, getCorrectAnswer } = methods;
const emit = defineEmits(['close', 'next-modal', 'correct', 'open', 'hide']);
const endGame = ref(false);
const hide = () => {
    emit('close');
    endGame.value = true;
};
const audio = ref(new Audio());

const next = () => {
    emit('next-modal');
    endGame.value = true;
};

const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
    finish: {
        type: Boolean,
    },

    childId: {
        type: Number,
        required: false,
    },
});

const getImageUrl = (path) => {
    return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};

const isMuted = ref(false);
const mute = () => {
    isMuted.value = !isMuted.value;
    if (isMuted.value === true) {
        audio.value.volume = 0;
        audioQuestion.volume = 0;
    } else {
        audio.value.volume = 1;
        audioQuestion.volume = 1;
    }
};

const playAudio = async (audioPath) => {
    audio.value.src = new URL(
        `/assets/audio/${audioPath}`,
        import.meta.url,
    ).href;
    if (audioPath === 'Task13/377.13_.mp3') {
        audio.value.volume = 1;
    }

    await audio.value.play();
};

const playEndAudio = (audioPath) => {
    if (isMuted.value) return;
    const end_audio = new Audio();
    end_audio.src = new URL(`/assets/audio/${audioPath}`, import.meta.url).href;
    end_audio.play();
};

const stopAudio = (audioPath) => {
    if (audio.value.paused) {
        audio.value.play();
    } else {
        audio.value.pause();
    }
};

const playCorrectAudio = (audioPath) => {
    if (isMuted.value) return;
    const correct_audio = new Audio();
    correct_audio.src = new URL(`/assets/audio/${audioPath}`, import.meta.url).href;
    correct_audio.play();
}

let audioQuestion = new Audio();
const playAudioQuestion = async (audioPath) => {
    if (gameIsClose) return;
    audioQuestion.src = new URL(
        `/assets/audio/${audioPath}`,
        import.meta.url,
    ).href;
    await audioQuestion.play();
};

const is_correct = ref(false);
const corrValue = ref(0);

const words = ref([
    { id: 1, name: 'РАДЫ', audio: 'Task13/371.13.mp3' },
    { id: 2, name: 'РАССТРОЕНЫ', audio: 'Task13/372.13.mp3' },
    { id: 3, name: 'ДЕТСКУЮ', audio: 'Task13/373.13.mp3' },
    { id: 4, name: 'ВЗРОСЛУЮ', audio: 'Task13/374.13.mp3' },
    { id: 5, name: 'ОБЩАТЬСЯ', audio: 'Task13/375.13.mp3' },
    { id: 6, name: 'РУГАТЬСЯ', audio: 'Task13/376.13.mp3' },
]);
const answer_drop = ref('?');
const answer = ref('');
const answer_two = ref('');
const answer_three = ref('');
const dropIndex = ref(words.value.length - 1);

const dataTransfer = ref({});
const drag = (event, word, id, index) => {
    // event.dataTransfer.setData('text', word);
    // event.dataTransfer.setData('id', id);

    dataTransfer.value.text = word;
    dataTransfer.value.id = id;
    dropIndex.value = index;
};

const drop = (event) => {
    // event.preventDefault();
    // let text = event.dataTransfer.getData('text');
    // let id = event.dataTransfer.getData('id');

    let text = dataTransfer.value.text;
    let id = dataTransfer.value.id;
    let elem = document.getElementById(id + '_elem');

    event.to.removeChild(event.item);

    if (
        (answer.value === '' && text === 'РАДЫ') ||
        (answer.value === 'РАДЫ' && text === 'ОБЩАТЬСЯ') ||
        (answer.value === 'ОБЩАТЬСЯ' && text === 'ДЕТСКУЮ')
    ) {
        elem.classList.add('green');
        answer_drop.value = text;

        playCorrectAudio('Common/1.2.mp3');
        setTimeout(() => {
            //words.value.splice(dropIndex.value, 1);
            elem.parentElement.parentElement.removeChild(elem.parentElement);
            elem.classList.remove('green');


            setTimeout(() => {
                let timeout = 4500;

                sentence_audiopath = "";
                secondsentence_audiopath = "";

                if (text === 'РАДЫ') {
                    sentence_audiopath = "Task13/з.13 МЫ ОЧЕНЬ РАДЫ С ВАМИ ПОЗНАКОМИТЬСЯ.mp3"
                    secondsentence_audiopath = "Task13/з.13 Нам нравится_с вами.mp3";
                }
                else if (text === 'ОБЩАТЬСЯ') {
                    sentence_audiopath = 'Task13/з.13 НАМ НРАВИТСЯ ОБЩАТЬСЯ С ВАМИ.mp3';
                    secondsentence_audiopath = "Task13/з.13 Приходите чаще на_площадку.mp3";
                }
                else if (text === 'ДЕТСКУЮ') {
                    sentence_audiopath = 'Task13/з.13 ПРИХОДИТЕ ЧАЩЕ НА ДЕТСКУЮ ПЛОЩАДКУ.mp3';
                }

                {
                    playAudioQuestion(sentence_audiopath);
                }

                setTimeout(() => {
                    answer.value = text;
                    answer_drop.value = answer.value == "ДЕТСКУЮ" ? "ДЕТСКУЮ" : "?";
                    if (text !== 'ДЕТСКУЮ') {
                        playAudioQuestion(secondsentence_audiopath);
                    }

                }, timeout);
            }, 0)
        }, 2000);

        

        if (text === 'ДЕТСКУЮ') {
            event.target.classList.remove('green');
            setTimeout(() => {
                if (is_correct.value === false) {
                    endGameRequest(props.childId, corrValue.value);
                    emit('correct');
                    emit('open');
                }
                endGame.value = true;
                playAudio('Task13/377.13_.mp3');
            }, 7000);
        }
    } else {
        elem.classList.add('red');
        playCorrectAudio('Common/2.1.mp3');
        setTimeout(() => {
            elem.classList.remove('red');
        }, 2000);

        return false;
    }
};

const allowDrop = (event) => {
    event.preventDefault();
};

let sentence_audio = new Audio(); 
let sentence_audiopath = "";
let secondsentence_audiopath = "";



onMounted(async () => {
    try {
        const correct = await getCorrectAnswer(13, props.childId);
        if (correct) {
            corrValue.value = correct.correctId;
            is_correct.value = correct.is_correct;
        } else {
            console.error('getCorrectAnswer returned undefined');
        }
    } catch (err) {
        console.error('Error fetching correct answer:', err);
    }
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.style.setProperty(
        '--scroll-position',
        `${scrollY}px`,
    );
    document.getElementsByTagName('html')[0].classList.add('no-scroll');
    document.body.classList.add('no-scroll'); /* Прокрутка ставится на паузу */

    secondsentence_audiopath = "Task13/з.13 Мы очень_с вами познакомиться.mp3";     

    setTimeout(() => {
        if (!gameIsClose);
        {   
            playAudioQuestion(secondsentence_audiopath);
        }
    }, 3500);


    console.log('game mount');
});
let gameIsClose = false;
onBeforeUnmount(() => {
    document.getElementsByTagName('html')[0].classList.remove('no-scroll');
    document.body.classList.remove('no-scroll'); /* Прокрутка возвращается */
    audio.value.src = "";
    audioQuestion.src = "";
    console.log('game unmount');
    gameIsClose = true;
});


watch(
    () => answer.value,
    (newVal, oldVal) => {
    console.log('answer changed', newVal, oldVal);
})
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
    flex-wrap: wrap;
    column-gap: 48px;
    justify-content: center;
    row-gap: 48px;
    width: 100%;
    max-width: 570px;
    margin: 60px auto;
}

.ThirteenthTask {
    &__title {
        font-size: 24px;
        font-weight: 500;
        line-height: 32.74px;
        font-family: 'Nunito';
        @media (max-width: 1024px) {
            font-size: 20px;
            line-height: 26.67px;
        }
    }
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

            div {
                display: inline-block;
            }

            .none {
                display: none !important;
            }

            input {
                width: 110px;
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
    font-weight: 700;
    font-family: 'Nunito';
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

.game_icons_item{
    top: 16px;
    position: absolute;
    right: 60px;
    z-index: 1000;

    width: 40px;
    height: 40px;
    background-color: #e6f2fa;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

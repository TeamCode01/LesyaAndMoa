<template>
    <template v-if="endGame === false">
        <div class="SecondTask task_block">
            <div class="SecondTask__wrapper">
                <div class="task_block__close" @click="hide">
                    <img
                        class="close-icon"
                        src="@app/assets/icons/close-icon.svg"
                        alt="крест"
                    />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="SecondTask__title">Выбери нужный АЛФАВИТ.</p>
                </div>
                <div class="SecondTask__wrapper_block">
                    <img
                        @mouseover="playAudio(item.audio)"
                        @mouseout="stopAudio(item.audio)"
                        @click="chooseTask($event, item.isCorrect)"
                        v-for="item in alphabets"
                        :key="item.id"
                        :src="getImageUrl(item.src)"
                        alt="alphabet"
                        class="SecondTask__wrapper_block_item"
                    />
                </div>
            </div>
        </div>
    </template>

    <TaskResultBanner
        :img="getImageUrl('Diamond.png')"
        :bg="getImageUrl('moa.gif')"
        text="Так держать!"
        v-else
        @next="next()"
        @hide="hide()"
        class="end-modal"
    ></TaskResultBanner>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { HTTP } from '@app/http';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
import gameActions from '@mixins/gameAction';
import { useAnswerStore } from '@layouts/stores/answers.ts';
import { SvgIcon } from '@shared/components/svgIcon';

const { methods } = gameActions;
const { endGameRequest, startGameRequest, getCorrectAnswer } = methods;
const emit = defineEmits(['close', 'next-modal', 'correct', 'open']);
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
const audio = ref(new Audio());
const hide = () => {
    emit('close');
    endGame.value = true;
};
const answerStore = useAnswerStore();
const corrValue = ref(0);

const next = () => {
    emit('next-modal');
    endGame.value = true;
};

const is_correct = ref(false);
const alphabets = ref([
    { id: 1, src: 'english.png', isCorrect: false, audio: 'Task2/27.2.mp3' },
    { id: 2, src: 'russian.png', isCorrect: true, audio: 'Task2/26.2.mp3' },
    { id: 3, src: 'arabic.png', isCorrect: false, audio: 'Task2/28.2.mp3' },
]);
const endGame = ref(false);

const getImageUrl = (path) => {
    return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};

const playAudio = async (audioPath) => {
    audio.value.src = new URL(
        `/assets/audio/${audioPath}`,
        import.meta.url,
    ).href;
    if (props.finish === true) {
        await audio.value.play();
    }
};

const playEndAudio = (audioPath) => {
    const end_audio = new Audio();
    end_audio.src = new URL(`/assets/audio/${audioPath}`, import.meta.url).href;
    end_audio.play();
};

const stopAudio = (audioPath) => {
    if (audio.value.paused) {
        playAudio(audioPath);
    } else {
        audio.value.pause();
    }
};

const chooseTask = (event, status) => {
    if (status === true) {
        event.target.value = status;
        alphabets.value = alphabets.value.filter(
            (item) => item.isCorrect == true,
        );
        event.target.classList.add('green');
        playEndAudio('Common/1.2.mp3');

        setTimeout(() => {
            // const correct = await getCorrectAnswer(2, props.childId);
            // corrValue.value = correct.correctId;
            // is_correct.value = correct.is_correct;
            endGame.value = true;
            event.target.classList.remove('green');
            playAudio('Task2/29.2_.mp3');
            if (is_correct.value === false) {
                endGameRequest(props.childId, corrValue.value);
                emit('correct');
                emit('open');
            }
        }, 1000);
    } else {
        event.target.value = status;
        playEndAudio('Common/2.1.mp3');
        event.target.classList.add('red');
        setTimeout(() => {
            event.target.classList.remove('red');
        }, 2000);
    }
};

// onMounted(async () => {
//     try {
//         const correct = await getCorrectAnswer(2, props.childId);
//         corrValue.value = localStorage.getItem('correctAnswer');
//     } catch (err) {
//         corrValue.value = localStorage.getItem('correctAnswer');
//     }
// });

onMounted(async() => {
    const correct = await getCorrectAnswer(2, props.childId);
    corrValue.value = correct.correctId;
    is_correct.value = correct.is_correct;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.style.setProperty(
        '--scroll-position',
        `${scrollY}px`,
    );
    document.getElementsByTagName('html')[0].classList.add('no-scroll');
    document.body.classList.add('no-scroll'); /* Прокрутка ставится на паузу */

    console.log('game mount');
});

onBeforeUnmount(() => {
    document.getElementsByTagName('html')[0].classList.remove('no-scroll');
    document.body.classList.remove('no-scroll'); /* Прокрутка возвращается */
    console.log('game unmount');
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

.SecondTask {
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
        padding: 30px 100px;
        position: relative;

        @media (max-width: 1024px) {
            padding: 30px 60px;
        }

        &_block {
            display: flex;
            justify-content: center;
            align-items: center;
            column-gap: 41px;
            margin-top: 68px;

            &_item {
                background-color: #d2efff;
                border-radius: 20px;
                max-width: 316px;
                width: 100%;
                height: 256px;
                padding: 45.5px 60px;
                cursor: pointer;

                @media (max-width: 1024px) {
                    max-width: 276px;
                    height: 215px;
                    padding: 32px 40px;
                }

                img {
                    display: block;
                    margin: 0px auto;
                }
            }
        }
    }
}
</style>

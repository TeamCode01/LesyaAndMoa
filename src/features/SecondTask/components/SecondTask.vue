<template>
    <template v-if="endGame === false">
        <div class="SecondTask task_block">

            <div class="SecondTask__wrapper">
                <div class="task_block__close" @click="hide">
                    <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 SecondTask__title">Выбери нужный АЛФАВИТ.</p>
                </div>
                <div class="SecondTask__wrapper_block">
                    <img @mouseover="playAudio(item.audio)" @mouseout="stopAudio(item.audio)"
                    @click="chooseTask($event, item.isCorrect)" v-for="item in alphabets" :key="item.id"  :src="item.src" alt="alphabet"   class="SecondTask__wrapper_block_item">
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
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
import gameActions from '@mixins/gameAction';

const { methods } = gameActions;
const { endGameRequest, startGameRequest, getCorrectAnswer } = methods;
const emit = defineEmits(['close', 'next-modal', 'correct']);
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
    }
});
const audio = ref(new Audio());
const hide = () => {
    emit('close');
    endGame.value = true;
};

const corrValue = ref(0);

const next = () => {
    emit('next-modal', is_started.value);
    endGame.value = true;

}

const alphabets = ref([{ id: 1, src: '/assets/backgrounds/english.png', isCorrect: false, audio: '/assets/audio/Task2/27.2.mp3' }, { id: 2, src: '/assets/backgrounds/russian.png', isCorrect: true, audio: '/assets/audio/Task2/26.2.mp3' }, { id: 3, src: '/assets/backgrounds/arabic.png', isCorrect: false, audio: '/assets/audio/Task2/28.2.mp3' }])
const endGame = ref(false);

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

let correctId = ref(0);

const chooseTask = (event, status) => {
    if (status === true) {
        event.target.value = status;
        alphabets.value = alphabets.value.filter(
            (item) => item.isCorrect == true,
        );
        event.target.classList.add('green');
        playEndAudio('/assets/audio/Common/1.2.mp3');
        emit('correct',  is_correct.value);
        setTimeout(() => {
            endGameRequest(props.childId, corrValue.value);
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
    }
}

onMounted(async () => {
    const correct = await getCorrectAnswer(2, props.childId);
    corrValue.value = correct.correctId;
    is_correct.value = correct.is_correct;
    is_started.value = correct.is_started;
    await getCorrectAnswer(2, props.childId, correctId.value);
})
</script>
<style lang="scss" scoped>
.end-modal {
    width: 1200px;
    height: 600px;
}

.SecondTask {
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

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
                    <div @mouseover="playAudio(item.audio)" @mouseout="stopAudio(item.audio)"
                        @click="chooseTask($event, item.isCorrect)" v-for="item in alphabets" :key="item.id"
                        class="SecondTask__wrapper_block_item">
                        <img id="image" :src="item.src" alt="alphabet">
                    </div>
                </div>
            </div>
        </div>
    </template>

    <TaskResultBanner img="/assets/backgrounds/flowers.png" bg="/assets/backgrounds/moa.gif" text="Супер!" v-else
    @next="next()" @hide="hide()" class="end-modal"></TaskResultBanner>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
const emit = defineEmits(['close', 'next-modal']);
const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
    finish: {
        type: Boolean,
    }
});
const audio = ref(new Audio());
const hide = () => {
    emit('close');
    endGame.value = true;
};

const next = () => {
    emit('next-modal');
    endGame.value = true;

}
const alphabets = ref([{ id: 1, src: '/assets/backgrounds/english.png', isCorrect: false, audio: '/assets/audio/Task2/27.2.mp3' }, { id: 2, src: '/assets/backgrounds/russian.png', isCorrect: true, audio: '/assets/audio/Task2/26.2.mp3' }, { id: 3, src: '/assets/backgrounds/arabic.png', isCorrect: false, audio: '/assets/audio/Task2/28.2.mp3' }])
const endGame = ref(false);
const isPlaying = ref(false);

const music = ref(null);

const playAudio = (audioPath) => {
    audio.value.src = audioPath;
    if(props.finish === true) {
        audio.value.play();
    }
}

const stopAudio = (audioPath) => {
    audio.value.src = '';
}

const chooseTask = (event, status) => {
    if (status === true) {
        event.target.value = status;
        alphabets.value = alphabets.value.filter(
            (item) => item.isCorrect == true,
        );
        event.target.classList.add('green');
        playAudio('assets/audio/Other/1. общее для разных заданий.mp3');
        setTimeout(() => {
            endGame.value = true;
            event.target.classList.remove('green');
        }, 2000);

    } else {
        event.target.value = status;
        playAudio('assets/audio/Other/2. общее для разных заданий.mp3');
        event.target.classList.add('red');
        setTimeout(() => {
            event.target.classList.remove('red');
        }, 2000);
    }
}
</script>
<style lang="scss" scoped>
.end-modal {
    width: 1200px;
    height: 600px;
}

.green {
    border: 2px solid green;
}

.red {
    border: 2px solid red;
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

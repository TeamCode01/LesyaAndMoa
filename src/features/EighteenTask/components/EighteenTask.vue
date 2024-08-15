<template>
    <template v-if="endGame === false">
        <div class="EighteenTask task_block">
            <div class="EighteenTask__wrapper">
                <div class="task_block__close" @click="hide">
                    <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 EighteenTask__title">
                        Прочитай текст, запиши его в поле ответа.
                    </p>
                </div>

                <div class="EighteenTask__task">
                    <img src="@app/assets/backgrounds/pictureWords.png" />
                </div>
                <textarea class="EighteenTask__answer" id="input" v-model="answer" />
                <Button class="send" :isImage="true" :image="arrow" label="Ответить" @click="sendAnswer" />
            </div>
        </div>
    </template>
    <TaskResultBanner :is_end="true" bg="/assets/backgrounds/bg_end.jpg" class="end-modal" v-else @hide="hide()">
    </TaskResultBanner>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Button } from '@shared/components/buttons';
import arrow from '@app/assets/icons/Arrow.svg';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
import gameActions from '@mixins/gameAction';
const { methods } = gameActions;
const { endGameRequest, startGameRequest, getCorrectAnswer } = methods;
const emit = defineEmits(['close', 'correct']);
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
    childId: {
        type: Number,
        required: false,
    },
});

const audio = ref(new Audio());
const is_correct = ref(null);
const corrValue = ref(0);
const playAudio = (audioPath) => {
    audio.value.src = audioPath;
    audio.value.play();
}

const answer = ref('');
const correct_answer = ref('Я рада была подружиться с ребятами. Они научили нас с Моа понимать их язык. Я узнала много новых слов. Мне нравится на Земле')

const sendAnswer = () => {
    const answer_input = document.getElementById('input');
    if (answer.value === correct_answer.value) {
        answer_input.classList.add('green');
        playAudio('/assets/audio/Other/1. общее для разных заданий.mp3');
        setTimeout(() => {
            answer_input.classList.remove('green');
            endGame.value = true;
            if (is_correct.value === false) {
                endGameRequest(props.childId, corrValue.value);
                emit('correct');
            }

        }, 2000)



    } else {
        answer_input.classList.add('red');
        playAudio('/assets/audio/Other/2. общее для разных заданий.mp3');
        setTimeout(() => {
            answer_input.classList.remove('red');
        }, 2000)
    }
}

onMounted(async () => {
    const correct = await getCorrectAnswer(18, props.childId);
    corrValue.value = correct.correctId;
    is_correct.value = correct.is_correct;
})
</script>
<style lang="scss" scoped>
.end-modal {
    width: 1200px;
    height: 600px;
}

.send {
    max-width: 280px;
    width: 100%;
    margin: 0px auto;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 32px;

    @media (max-width: 1024px) {
        max-width: 212px;
        height: 48px;
        column-gap: 28px;
    }
}

.EighteenTask {
    &__task {
        img {
            display: block;
            margin: 40px auto;
        }
    }

    &__wrapper {
        padding: 30px 60px 57px 60px;

        @media (max-width: 1024px) {
            padding: 30px 20px 50px 20px;
        }
    }

    &__answer {
        background-color: $blueGame;
        width: 100%;
        padding: 20px 100px;
        margin-bottom: 40px;
        color: #4e3b7f;
        font-size: 22px;
        font-weight: 700;
        font-family: 'Nunito', sans-serif;
        border-radius: 20px;
        margin-top: 20px;
        border: none;
        resize: none;
        overflow-y: hidden;
        outline: none;
        height: 100px;
    }

    &__btn {
        max-width: 280px;
        width: 100%;
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 32px;
        margin: 0 auto;

        @media (max-width: 1024px) {
            max-width: 212px;
            height: 48px;
            column-gap: 28px;
        }
    }
}
</style>

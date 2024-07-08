<template>
    <div class="EighteenTask task_block">
        <div class="EighteenTask__wrapper">
            <div class="task_block__close" @click="hide">
                <img
                    class="close-icon"
                    src="@app/assets/icons/close-icon.svg"
                    alt="крест"
                />
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
            <input class="EighteenTask__answer" v-model="answer" />
            <Button
                class="send"
                :isImage="true"
                :image="arrow"
                label="Ответить"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Button } from '@shared/components/buttons';
import arrow from '@app/assets/icons/Arrow.svg';
import { Timer } from '@shared/components/timer';
const emit = defineEmits(['close']);

const hide = () => {
    emit('close');
};

const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
});

const answer = ref('');
</script>
<style lang="scss" scoped>
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

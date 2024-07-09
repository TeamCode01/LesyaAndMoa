<template>
    <div class="SecondTask task_block">
        <TaskResultBanner img="/assets/backgrounds/Diamond.png" bg="/assets/backgrounds/Moa.png" text="Так держать!"
            v-if="endGame === true"></TaskResultBanner>
        <div class="SecondTask__wrapper">
            <div class="task_block__close" @click="hide">
                <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
            </div>
            <div class="task_block__time">
                <Timer :end="end"></Timer>
                <p class="title-h4 SecondTask__title">Выбери нужный АЛФАВИТ.</p>
            </div>
            <div class="SecondTask__wrapper_block">
                <div @click="chooseTask()" class="SecondTask__wrapper_block_item">
                    <img src="@app/assets/backgrounds/english.png" alt="english" />
                </div>
                <div @click="chooseTask()" class="SecondTask__wrapper_block_item">
                    <img src="@app/assets/backgrounds/russian.png" alt="russian" />
                </div>
                <div @click="chooseTask()" class="SecondTask__wrapper_block_item">
                    <img src="@app/assets/backgrounds/arabic.png" alt="arabic" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
const emit = defineEmits(['close']);
const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
});
const hide = () => {
    emit('close');
};

const endGame = ref(false);

const chooseTask = () => {

}
</script>
<style lang="scss" scoped>
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

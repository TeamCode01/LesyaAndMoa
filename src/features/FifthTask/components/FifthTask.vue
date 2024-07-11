<template>
    <div class="FifthTask task_block">
        <div class="task_block__wrapper">
            <template v-if="true">
                <div class="task_block__close" @click="hide">
                    <img
                        class="close-icon"
                        src="@app/assets/icons/close-icon.svg"
                        alt="крест"
                    />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title">
                        Найди произносимые слоги.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="draggable-list__items">
                        <div class="draggable-list__item1">
                            <button class="draggable-list__button">РЕГ</button>
                            <button class="draggable-list__button">МОД</button>
                            <button class="draggable-list__button">ЛЁК</button>
                            <button class="draggable-list__button">ЗИН</button>
                            <button class="draggable-list__button">УПР</button>
                        </div>
                        <div class="draggable-list__item2">
                            <button class="draggable-list__button">ИЗН</button
                            ><button class="draggable-list__button">НОК</button
                            ><button class="draggable-list__button">ВЕТ</button
                            ><button class="draggable-list__button">РИС</button>
                        </div>
                        <div class="draggable-list__item3">
                            <button class="draggable-list__button">ЗАП</button
                            ><button class="draggable-list__button">МЫЙ</button
                            ><button class="draggable-list__button">БУК</button
                            ><button class="draggable-list__button">ОЛЬТ</button
                            ><button class="draggable-list__button">ВЕЦ</button>
                        </div>
                    </div>
                    <div v-if="false">
                        <button class="draggable-list__button_final">
                            <span class="draggable-list__button-speaker"
                                >Прослушать</span
                            >
                            <img
                                src="@app\assets\icons\speaker.svg"
                                alt="speaker"
                            />
                        </button>
                    </div>
                    <div v-if="true">
                        <button class="draggable-list__button_final">
                            <span class="draggable-list__button-repeat"
                                >Повторить</span
                            >
                            <img
                                src="@app\assets\icons\repeat.svg"
                                alt="repeat"
                            />
                        </button>
                    </div>
                </div>
                <input
                    @drop="drop($event)"
                    @dragover="allowDrop($event)"
                    v-model="answer"
                    class="task_block__wrapper_answer"
                />
            </template>
            <TaskResultBanner img="/assets/backgrounds/cup.png" bg="/assets/backgrounds/lesya.gif" text="Прекрасно!"
            v-if="false" @hide="hide()"></TaskResultBanner>
        </div>
    </div>
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
const hide = () => {
    emit('close');
};
</script>
<style lang="scss" scoped>
.draggable-list {
    display: flex;
    gap: 88px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    @media (max-width: 1024px) {
        gap: 60px;
    }
}

.draggable-list__items {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 632px;
    height: 200px;
    gap: 40px;
    @media (max-width: 1024px) {
        height: 184px;
        gap: 32px;
    }
}

.draggable-list__item1,
.draggable-list__item2,
.draggable-list__item3 {
    display: flex;
    justify-content: space-between;
    gap: 60px;
    height: 40px;
}

.draggable-list__item1 {
    width: 613px;
}


.draggable-list__item3 {
    width: 100%;
}

.draggable-list__item2 {
    width: 478px;
}

.draggable-list__button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 40px;
    background-color: $blueGame;
    color: $darkBlue;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    letter-spacing: 0;
    border-radius: 6px;
    font-weight: bold;
    line-height: 40px;
    padding: 8px 16px;
}

.FifthTask {
    position: block;
}

.draggable-list__button_final {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 271px;
    height: 48px;
    background-color: #fff;
    color: $darkBlue;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    letter-spacing: 0;
    border-radius: 30px;
    font-weight: 400;
    line-height: 48px;
    border: 1.5px solid $darkBlue;
}

.draggable-list__button-speaker,
.draggable-list__button-repeat {
    padding-right: 20px;
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

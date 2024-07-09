<template>
    <div class="FourthTask task_block">
        <div class="task_block__wrapper">
            <template v-if="false">
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
                            <button class="draggable-list__button">ШО</button>
                            <button class="draggable-list__button">БА</button>
                            <button class="draggable-list__button">ГЮ</button>
                            <button class="draggable-list__button">ЛЫ</button>
                            <button class="draggable-list__button">ХА</button>
                        </div>
                        <div class="draggable-list__item2">
                            <button class="draggable-list__button">ДЯ</button
                            ><button class="draggable-list__button">ЩИ</button
                            ><button class="draggable-list__button">ФО</button
                            ><button class="draggable-list__button">ЖУ</button>
                        </div>
                        <div class="draggable-list__item3">
                            <button class="draggable-list__button">ЗИ</button
                            ><button class="draggable-list__button">ТЬ</button
                            ><button class="draggable-list__button">ВЕ</button
                            ><button class="draggable-list__button">КЕ</button
                            ><button class="draggable-list__button">РЮ</button>
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
            <!-- <TaskResultBanner v-if="true" @hide="hide()"></TaskResultBanner> -->
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
// import { TaskResultBanner } from '@features/TaskResultBanner/components';

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
    width: 540px;
    height: 200px;
    gap: 40px;
    @media (max-width: 1024px) {
        gap: 32px;
    }
}

.draggable-list__item1,
.draggable-list__item2,
.draggable-list__item3 {
    display: flex;
    justify-content: space-between;
    gap: 60px;
}

.draggable-list__item1,
.draggable-list__item3 {
    width: 100%;
    height: 40px;
}

.draggable-list__item2 {
    width: 420px;
    height: 40px;
}

.draggable-list__button {
    text-align: center;
    width: 60px;
    height: 40px;
    background-color: $lightPink;
    color: $vihous;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    letter-spacing: 0;
    border-radius: 6px;
    font-weight: bold;
    line-height: 40px;
}

.FourthTask {
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

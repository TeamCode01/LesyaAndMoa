<template>
    <div class="FourteenthTask task_block">
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
                    <p class="title-h4 task_block__title FourteenthTask__title">
                        Соедини букву, звук и картинку.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="draggable-list__draggable-items">
                        <div class="draggable-list__words">
                            <div class="draggable-list__word">б</div>
                            <div class="draggable-list__word">а</div>
                            <div class="draggable-list__word">р</div>
                            <div class="draggable-list__word">в</div>
                            <div class="draggable-list__word">д</div>
                            <div class="draggable-list__word">у</div>
                        </div>
                        <div class="draggable-list__speakers"></div>
                    </div>
                </div>
                <input
                    @drop="drop($event)"
                    @dragover="allowDrop($event)"
                    v-model="answer"
                    class="task_block__wrapper_answer"
                />
            </template>
            <TaskResultBanner img="/assets/backgrounds/Diamond.png" bg="/assets/backgrounds/moa.gif" text="Замечательно!"
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
.FourteenthTask {
    width: 1200px;
}

.FourteenthTask__title {
    width: 389px;
    @media (max-width: 1024px) {
        width: 328px;
        font-weight: 400;
        font-size: 20px;
    }
}

.draggable-list {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 32px;
    width: 848px;
    height: 448px;
    @media (max-width: 1024px) {
        margin-top: 20px;
        width: 680px;
        height: 341px;
    }
}

.draggable-list__draggable-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 144px;
    @media (max-width: 1024px) {
        height: 108px;
    }
}

.draggable-list__words {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 52px;
    @media (max-width: 1024px) {
        height: 40px;
    }
}

.draggable-list__word {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 108px;
    height: 52px;
    background-color: $blueGame;
    color: $darkBlue;
    border-radius: 6px;
    font-family: 'czizh', sans-serif;
    @media (max-width: 1024px) {
        width: 80px;
        height: 40px;
    }
}

.draggable-list__speakers {
    display: flex;
    justify-content: space-between;
    width: 552px;
    height: 52px;
    @media (max-width: 1024px) {
        width: 440px;
        height: 40px;
    }
}

















</style>
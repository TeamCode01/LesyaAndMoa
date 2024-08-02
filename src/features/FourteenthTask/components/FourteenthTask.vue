<template>
    <div class="FourteenthTask task_block">
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
                    <p class="title-h4 task_block__title FourteenthTask__title">
                        Соедини букву, звук и картинку.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="draggable-list__draggable-items">
                        <div class="draggable-list__words">
                            <button class="draggable-list__word" id="draggable-list__word1">б</button>
                            <button class="draggable-list__word" id="draggable-list__word2">а</button>
                            <button class="draggable-list__word" id="draggable-list__word3">р</button>
                            <button class="draggable-list__word" id="draggable-list__word4">в</button>
                            <button class="draggable-list__word" id="draggable-list__word5">д</button>
                            <button class="draggable-list__word" id="draggable-list__word6">у</button>
                        </div>
                        <div class="draggable-list__speakers">
                            <button class="draggable-list__speaker">
                                <img src="/assets/icons/speaker-violet.svg" alt="speaker" class="speaker"/>
                            </button>
                            <button class="draggable-list__speaker">
                                <img src="/assets/icons/speaker-violet.svg" alt="speaker" class="speaker"/>
                            </button>
                            <button class="draggable-list__speaker">
                                <img src="/assets/icons/speaker-violet.svg" alt="speaker" class="speaker"/>
                            </button>
                            <button class="draggable-list__speaker">
                                <img src="/assets/icons/speaker-violet.svg" alt="speaker" class="speaker"/>
                            </button>
                        </div>
                    </div>
                    <div class="draggable-list__answer-zone">
                        <div class="draggable-list__answer">
                            <img src="/assets/backgrounds/lesyaandmoasmall.svg" alt="lesyaandmoa" class="lesyaandmoa">
                            <div class="draggable-list__subanswer">
                                <div class="draggable-list__word"></div>
                                <div class="draggable-list__speaker"></div>
                            </div>
                        </div>
                        <div class="draggable-list__answer">
                            <img src="/assets/backgrounds/lesyaandmoasmall.svg" alt="lesyaandmoa" class="lesyaandmoa">
                            <div class="draggable-list__subanswer">
                                <div class="draggable-list__word"></div>
                                <div class="draggable-list__speaker"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <input
                    @drop="drop($event)"
                    @dragover="allowDrop($event)"
                    v-model="answer"
                    class="task_block__wrapper_answer"
                />
            </template>
            <TaskResultBanner img="/assets/backgrounds/Diamond.png" bg="/assets/backgrounds/moa.gif" text="Друзья заметили, что письменная б (БЭ), которая звучит,
            как [б] или [б'] похожа на белку с поднятым хвостом. В слове «белка» звучит [б']. А письменная д, которая звучит, как [д] или [д'], похожа на дятла,
            у которого хвостик вниз. В слове «дятел» звучит [д']."
            v-if="true" @next="next()" @hide="hide()"></TaskResultBanner>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';

const emit = defineEmits(['close', 'next-modal']);
const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
});
const hide = () => {
    emit('close');
};
const next = () => {
    emit('next-modal');
}
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
    font-size: 44px;
    @media (max-width: 1024px) {
        width: 80px;
        height: 40px;
        font-size: 36px;
    }
}

#draggable-list__word1 {
    padding-top: 5px;
}

#draggable-list__word2 {
    padding-bottom: 10px;
}

#draggable-list__word3 {
    padding-bottom: 17px;
    @media (max-width: 1024px) {
        padding-bottom: 11px;
    }
}

#draggable-list__word4 {
    padding-top: 5px;
}

#draggable-list__word5 {
    padding-bottom: 23px;
    @media (max-width: 1024px) {
        padding-bottom: 17px;
    }
}

#draggable-list__word6 {
    padding-bottom: 23px;
    @media (max-width: 1024px) {
        padding-bottom: 17px;
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

.draggable-list__speaker {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 108px;
    height: 52px;
    background-color: $puppe;
    border-radius: 6px;
    @media (max-width: 1024px) {
        width: 80px;
        height: 40px;
    }
}

.speaker {
    width: 32px;
    height: 32px;
    @media (max-width: 1024px) {
        width: 26px;
        height: 26px;
    }
}

.draggable-list__answer-zone {
    display: flex;
    justify-content: space-between;
    width: 576px;
    height: 264px;
    @media (max-width: 1024px) {
        width: 448px;
        height: 205px;
    }
}

.draggable-list__answer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    width: 268px;
    height: 100%;
    border: 1px solid $darkBlue;
    border-radius: 6px;
    @media (max-width: 1024px) {
        width: 204px;
        padding: 16px;
    }
}

.lesyaandmoa {
    width: 228px;
    height: 160px;
    @media (max-width: 1024px) {
        width: 172px;
        height: 121px;
    }
}

.draggable-list__subanswer {
    display: flex;
    justify-content: space-between;
    width: 228px;
    height: 52px;
    @media (max-width: 1024px) {
        width: 172px;
        height: 40px;
    }
}





</style>
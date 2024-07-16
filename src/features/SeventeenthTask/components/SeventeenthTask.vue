<template>
    <div class="SeventeenthTask task_block">
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
                    <p class="title-h4 task_block__title SeventeenthTask__title">
                        Собери слова из двух частей. <br/>
                        Соедини полученные слова с картинками. 
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="draggable-list__words-top" v-if="true">
                        <div class="draggable-list__word-top">
                            <div class="draggable-list__word">Ромашка</div>
                            <img src="assets/creatures/SeventeenthTask/green-circle.svg" alt="green-circle" class="draggable-list__word-top-circle">
                        </div>
                        <div class="draggable-list__word-top">
                            <div class="draggable-list__word">Дерево</div>
                            <img src="assets/creatures/SeventeenthTask/green-circle.svg" alt="green-circle" class="draggable-list__word-top-circle">
                        </div>
                        <div class="draggable-list__word-top">
                            <div class="draggable-list__word">Корова</div>
                            <img src="assets/creatures/SeventeenthTask/green-circle.svg" alt="green-circle" class="draggable-list__word-top-circle">
                        </div>
                        <div class="draggable-list__word-top">
                            <div class="draggable-list__word">Река</div>
                            <img src="assets/creatures/SeventeenthTask/green-circle.svg" alt="green-circle" class="draggable-list__word-top-circle">
                        </div>
                        <div class="draggable-list__word-top">
                            <div class="draggable-list__word">Облака</div>
                            <img src="assets/creatures/SeventeenthTask/green-circle.svg" alt="green-circle" class="draggable-list__word-top-circle">
                        </div>
                    </div>
                    <div class="draggable-list__pictures" v-if="true">
                        <div class="draggable-list__picture">
                            <img src="assets/creatures/SeventeenthTask/green-circle.svg" alt="green-circle" class="draggable-list__word-top-circle">
                            <img src="assets/creatures/SeventeenthTask/lesyaandmoasmall.svg" alt="lesyaandmoa" class="draggable-list__lesyaandmoa">
                        </div>
                        <div class="draggable-list__picture">
                            <img src="assets/creatures/SeventeenthTask/green-circle.svg" alt="green-circle" class="draggable-list__word-top-circle">
                            <img src="assets/creatures/SeventeenthTask/lesyaandmoasmall.svg" alt="lesyaandmoa" class="draggable-list__lesyaandmoa">
                        </div>
                        <div class="draggable-list__picture">
                            <img src="assets/creatures/SeventeenthTask/green-circle.svg" alt="green-circle" class="draggable-list__word-top-circle">
                            <img src="assets/creatures/SeventeenthTask/lesyaandmoasmall.svg" alt="lesyaandmoa" class="draggable-list__lesyaandmoa">
                        </div>
                        <div class="draggable-list__picture">
                            <img src="assets/creatures/SeventeenthTask/green-circle.svg" alt="green-circle" class="draggable-list__word-top-circle">
                            <img src="assets/creatures/SeventeenthTask/lesyaandmoasmall.svg" alt="lesyaandmoa" class="draggable-list__lesyaandmoa">
                        </div>
                        <div class="draggable-list__picture">
                            <img src="assets/creatures/SeventeenthTask/green-circle.svg" alt="green-circle" class="draggable-list__word-top-circle">
                            <img src="assets/creatures/SeventeenthTask/lesyaandmoasmall.svg" alt="lesyaandmoa" class="draggable-list__lesyaandmoa">
                        </div>
                    </div>
                    <div class="draggable-list__syllables" v-if="false">
                        <div class="draggable-list__set-syllables">
                            <div>
                                <img src="assets/creatures/SeventeenthTask/figure-in-ro.svg" alt="figure-in" class="figure-in">
                            </div>
                            <div>
                                <img src="assets/creatures/SeventeenthTask/figure-out-laka.svg" alt="figure-out" class="figure-out">
                            </div>
                            <div>
                                <img src="assets/creatures/SeventeenthTask/figure-out-koro.svg" alt="figure-out" class="figure-out">
                            </div>
                            <div>
                                <img src="assets/creatures/SeventeenthTask/figure-in-vo.svg" alt="figure-in" class="figure-in">
                            </div>
                            <div>
                                <img src="assets/creatures/SeventeenthTask/figure-in-ka.svg" alt="figure-in" class="figure-in">
                            </div>
                        </div>
                        <div class="draggable-list__set-syllables" id="draggable-list__set-syllables-2">
                            <div>
                                <img src="assets/creatures/SeventeenthTask/figure-in-va.svg" alt="figure-in" class="figure-in">
                            </div>
                            <div>
                                <img src="assets/creatures/SeventeenthTask/figure-out-so.svg" alt="figure-out" class="figure-out">
                            </div>
                            <div>
                                <img src="assets/creatures/SeventeenthTask/figure-out-re.svg" alt="figure-out" class="figure-out">
                            </div>
                            <div>
                                <img src="assets/creatures/SeventeenthTask/figure-in-ob.svg" alt="figure-in" class="figure-in">
                            </div>
                        </div>
                        <div class="draggable-list__set-syllables">
                            <div>
                                <img src="assets/creatures/SeventeenthTask/figure-in-ba.svg" alt="figure-in" class="figure-in">
                            </div>
                            <div>
                                <img src="assets/creatures/SeventeenthTask/figure-out-dere.svg" alt="figure-out" class="figure-out">
                            </div>
                            <div>
                                <img src="assets/creatures/SeventeenthTask/figure-out-ta.svg" alt="figure-out" class="figure-out">
                            </div>
                            <div>
                                <img src="assets/creatures/SeventeenthTask/figure-in-mu.svg" alt="figure-in" class="figure-in">
                            </div>
                            <div>
                                <img src="assets/creatures/SeventeenthTask/figure-out-mashka.svg" alt="figure-out" class="figure-out">
                            </div>
                        </div>
                    </div>
                    <div class="draggable-list__words" v-if="false">
                        <div class="draggable-list__word">Ромашка</div>
                        <div class="draggable-list__word">Дерево</div>
                        <div class="draggable-list__word">Корова</div>
                        <div class="draggable-list__word">Река</div>
                        <div class="draggable-list__word">Облака</div>
                    </div>
                </div>
                <input
                    @drop="drop($event)"
                    @dragover="allowDrop($event)"
                    v-model="answer"
                    class="task_block__wrapper_answer"
                />
            </template>
            <TaskResultBanner img="/assets/backgrounds/Cup.png" bg="/assets/backgrounds/lesya.gif" text="Потрясающе!"
            v-if="true" @hide="hide()"></TaskResultBanner>
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

.SeventeenthTask {
    width: 1200px;
}

.SeventeenthTask__title {
    width: 520px;
    @media (max-width: 1024px) {
        width: 440px;
        font-weight: 400;
        font-size: 20px;
    }
}

.draggable-list {
    margin: 0 auto;
    margin-top: 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 1000px;
    height: 414px;
    @media (max-width: 1024px) {
        width: 860px;
        height: 316px;
        margin-top: 16px;
    }
}

.draggable-list__syllables {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 326px;
    @media (max-width: 1024px) {
        height: 236px;
    }
}

.draggable-list__set-syllables {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 90px;
    @media (max-width: 1024px) {
        height: 72px;
    }
}

#draggable-list__set-syllables-2 {
    padding: 0 110px;
    @media (max-width: 1024px) {
        padding: 0 70px;
    }
}

.figure-in {
    cursor: pointer;
    width: 100px;
    height: 90px;
    @media (max-width: 1024px) {
        width: 80px;
        height: 72px;
    }
}

.figure-out {
    cursor: pointer;
    width: 124px;
    height: 90px;
    @media (max-width: 1024px) {
        width: 100px;
        height: 72px;
    }
}

.draggable-list__words {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 48px;
    @media (max-width: 1024px) {
        height: 40px;
    }
}

.draggable-list__word {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $puppe;
    color: $violetLetters-game;
    font-family: 'Nunito', sans-serif;
    font-weight: bold;
    font-size: 24px;
    width: 160px;
    height: 48px;
    border-radius: 6px;
    @media (max-width: 1024px) {
        width: 140px;
        height: 40px;
        font-size: 20px;
    }
}

.draggable-list__words-top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    @media (max-width: 1024px) {
        height: 62px;
    }
}

.draggable-list__word-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 160px;
    height: 100%;
    @media (max-width: 1024px) {
        width: 140px;
    }
}

.draggable-list__word-top-circle {
    @media (max-width: 1024px) {
        width: 14px;
        height: 14px;
    }
}

.draggable-list__pictures {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 152px;
    @media (max-width: 1024px) {
        height: 127px;
    }
}

.draggable-list__picture {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 160px;
    height: 100%;
    @media (max-width: 1024px) {
        width: 140px;
    }
}

.draggable-list__lesyaandmoa {
    width: 160px;
    height: 120px;
    @media (max-width: 1024px) {
        width: 140px;
        height: 105px;
    }
}
</style>
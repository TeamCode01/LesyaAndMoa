<template>
    <div class="SeventhTask task_block">
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
                    <p class="title-h4 task_block__title SeventhTask__title">
                        Верно соотнеси слово, его толкование и картинку.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="draggable-list__words">
                        <div class="draggable-list__word-container">
                            <div class="draggable-list__word" v-if="false">КОНЬ</div>
                            <div class="draggable-list__word" v-if="true">СЕЛ</div>
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle"/>
                        </div>
                        <div class="draggable-list__word-container">
                            <div class="draggable-list__word" v-if="false">ТОПЬ</div>
                            <div class="draggable-list__word" v-if="true">СЪЕЛ</div>
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle"/>
                        </div>
                        <div class="draggable-list__word-container">
                            <div class="draggable-list__word" v-if="false">ТОП</div>
                            <div class="draggable-list__word" v-if="true">МЕЛ</div>
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle"/>
                        </div>
                        <div class="draggable-list__word-container">
                            <div class="draggable-list__word" v-if="false">КОН</div>
                            <div class="draggable-list__word" v-if="true">МЕЛЬ</div>
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle"/>
                        </div>
                    </div>
                    <div class="draggable-list__sentences">
                        <div class="draggable-list__sentence-container">
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle"/>
                            <div class="draggable-list__sentence" v-if="false">одна партия какой-либо игры</div>
                            <div class="draggable-list__sentence" v-if="true">принял пищу, покушал</div>
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle"/>
                        </div>
                        <div class="draggable-list__sentence-container">
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle"/>
                            <div class="draggable-list__sentence" v-if="false">лёгкая женская одежда для верхней половины тела</div>
                            <div class="draggable-list__sentence" v-if="true">принял положение сидя</div>
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle"/>
                        </div>
                        <div class="draggable-list__sentence-container">
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle"/>
                            <div class="draggable-list__sentence" v-if="false">топкое, болотистое место</div>
                            <div class="draggable-list__sentence" v-if="true">неглубокое место в реке, озере или в море</div>
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle"/>
                        </div>
                        <div class="draggable-list__sentence-container">
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle"/>
                            <div class="draggable-list__sentence" v-if="false">то же, что лошадь, вьючное животное</div>
                            <div class="draggable-list__sentence" v-if="true">белый известняк для окраски, писания (на доске)</div>
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle"/>
                        </div>
                    </div>
                    <div class="draggable-list__pictures">
                        <div class="draggable-list__picture-container">
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle"/>
                            <img src="assets/creatures/SeventhTask/lesyaandmoasmall.svg" alt="lesyaandmoa" class="draggable-list__image">
                        </div>
                        <div class="draggable-list__picture-container">
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle"/>
                            <img src="assets/creatures/SeventhTask/food.svg" alt="lesyaandmoa" class="draggable-list__image">
                        </div>
                        <div class="draggable-list__picture-container">
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle"/>
                            <img src="assets/creatures/SeventhTask/lesyaandmoasmall.svg" alt="lesyaandmoa" class="draggable-list__image">
                        </div>
                        <div class="draggable-list__picture-container">
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle"/>
                            <img src="assets/creatures/SeventhTask/lesyaandmoasmall.svg" alt="lesyaandmoa" class="draggable-list__image">
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
            <TaskResultBanner img="/assets/backgrounds/Cup.png" bg="/assets/backgrounds/lesya.gif" text="Далее!"
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

.SeventhTask {
    width: 1200px;
}

.SeventhTask__title {
    width: 597px;
    @media (max-width: 1024px) {
        width: 501px;
        font-weight: 400;
        font-size: 20px;
    }
}

.draggable-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 50px;
    width: 987px;
    height: 380px;
    @media (max-width: 1024px) {
        margin-top: 24px;
        width: 834px;
        height: 324px;
    }
}

.draggable-list__words {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 108px;
    height: 346px;
    @media (max-width: 1024px) {
        width: 102px;
        height: 300px;
    }
}

.draggable-list__word-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 46px;
    @media (max-width: 1024px) {
        height: 42px;
    }
}

.draggable-list__word {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: $puppe;
    width: 80px;
    height: 100%;
    color: $violetLetters-game;
    font-family: 'Nunito', sans-serif;
    font-weight: bold;
    font-size: 20px;
}

.draggable-list__circle {
    width: 16px;
    height: 16px;
    @media (max-width: 1024px) {
        width: 14px;
        height: 14px;
    }
}

.draggable-list__sentences {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 496px;
    height: 346px;
    @media (max-width: 1024px) {
        width: 474px;
        height: 302px;
    }
}

.draggable-list__sentence-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 46px;
    @media (max-width: 1024px) {
        height: 42px;
    }
}

.draggable-list__sentence {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 440px;
    height: 100%;
    border-radius: 6px;
    background-color: $puppe;
    color: $violetLetters-game;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 600;
    @media (max-width: 1024px) {
        width: 430px;
    }
}

.draggable-list__pictures {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 144px;
    height: 380px;
    @media (max-width: 1024px) {
        width: 118px;
        height: 324px;
    }
}

.draggable-list__picture-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80px;
    @media (max-width: 1024px) {
        height: 66px;
    }
}

.draggable-list__image {
    width: 116px;
    height: 100%;
    transform: rotate(180deg);
    @media (max-width: 1024px) {
        width: 96px;
    }
}
</style>
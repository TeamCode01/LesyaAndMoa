<template>
    <div class="TenthTask task_block">
        <div class="task_block__wrapper">
            <template v-if="endGame === false">
                <div class="task_block__close" @click="hide">
                    <img
                        class="close-icon"
                        src="@app/assets/icons/close-icon.svg"
                        alt="крест"
                    />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title TenthTask__title">
                        Дополни предложения недостающими словами.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="draggable-list__words">
                        <div class="draggable-list__set-words">
                            <button class="draggable-list__word">В</button>
                            <button class="draggable-list__word">НА</button>
                            <button class="draggable-list__word">ИЗ</button>
                            <button class="draggable-list__word">ОТ</button>
                            <button class="draggable-list__word">ЧЕРЕЗ</button>
                        </div>
                        <div class="draggable-list__set-words">
                            <button class="draggable-list__word">С</button>
                            <button class="draggable-list__word">ДО</button>
                            <button class="draggable-list__word">ПРИ</button>
                            <button class="draggable-list__word">У</button>
                            <button class="draggable-list__word">ПОД</button>
                        </div>
                    </div>
                    <div class="draggable-list__answer">
                        <div class="draggable-list__answer-wrapper" v-if="false">
                            <p>Мы прилетели</p>
                            <div class="draggable-list__quastion-block">
                                <img src="/assets/icons/quastion.svg" alt="quastion" class="draggable-list__quastion-block-quastion">
                            </div>
                            <p>планеты Музи.</p>
                        </div>
                        <div class="draggable-list__answer-wrapper" v-if="false">
                            <p>Наш межгалактический корабль разбился</p>
                            <div class="draggable-list__quastion-block">
                                <img src="/assets/icons/quastion.svg" alt="quastion" class="draggable-list__quastion-block-quastion">
                            </div>
                            <p>лесу.</p>
                        </div>
                        <div class="draggable-list__answer-wrapper" v-if="false">
                            <p>Мы добрались</p>
                            <div class="draggable-list__quastion-block">
                                <img src="/assets/icons/quastion.svg" alt="quastion" class="draggable-list__quastion-block-quastion">
                            </div>
                            <p>места крушения в город</p>
                            <div class="draggable-list__quastion-block">
                                <img src="/assets/icons/quastion.svg" alt="quastion" class="draggable-list__quastion-block-quastion">
                            </div>
                            <p>поле.</p>
                        </div>
                        <div class="draggable-list__answer-wrapper" v-if="true">
                            <p>И спрятались</p>
                            <div class="draggable-list__quastion-block">
                                <img src="/assets/icons/quastion.svg" alt="quastion" class="draggable-list__quastion-block-quastion">
                            </div>
                            <p>крышей игрового домика</p>
                            <div class="draggable-list__quastion-block">
                                <img src="/assets/icons/quastion.svg" alt="quastion" class="draggable-list__quastion-block-quastion">
                            </div>
                            <p>детской площадке.</p>
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
            <TaskResultBanner img="/assets/backgrounds/Diamond.png" bg="/assets/backgrounds/moa.gif" text="Замечательно!"
            v-else @hide="hide()" @next="next()"></TaskResultBanner>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
const endGame = ref(false);
const emit = defineEmits(['close', 'next-modal']);
const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
});
const hide = () => {
    emit('close');
    endGame.value = true;
};
const next = () => {
    emit('next-modal');
    endGame.value = true;
}
</script>

<style lang="scss" scoped>

.TenthTask {
    width: 1200px;
}

.TenthTask__title {
    width: 573px;
    @media (max-width: 1024px) {
        width: 481px;
        font-weight: 400;
        font-size: 20px;
    }
}

.draggable-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 60px;
    width: 100%;
    height: 356px;
    @media (max-width: 1024px) {
        height: 264px;
        margin-top: 48px;
    }
}

.draggable-list__words {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 642px;
    height: 136px;
    @media (max-width: 1024px) {
        height: 116px;
    }
}

.draggable-list__set-words {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 44px;

    @media (max-width: 1024px) {
        height: 38px;
    }
}

.draggable-list__word {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $puppe;
    color: $violetLetters-game;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: bold;
    border-radius: 6px;
    width: 90px;
    height: 44px;
    @media (max-width: 1024px) {
        height: 38px;
    }
}

.draggable-list__answer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
    border-radius: 20px;
    background-color: $blueGame;
    color: $violetLetters-game;
    font-family: 'Nunito', sans-serif;
    font-size: 22px;
    font-weight: bold;
    @media (max-width: 1024px) {
        height: 80px;
        font-size: 18px;
    }
}

.draggable-list__answer-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.draggable-list__quastion-block {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 28px;
    width: 90px;
    height: 44px;
    background-color: #fff;
    border-radius: 6px;
    @media (max-width: 1024px) {
        height: 44px;
        margin: 0 20px;
    }
}

.draggable-list__quastion-block-quastion {
    width: 17px;
    height: 39px;
    @media (max-width: 1024px) {
        width: 15px;
        height: 34px;
    }
}
</style>
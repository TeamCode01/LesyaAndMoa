<template>
    <div class="EighthTask task_block">
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
                    <p class="title-h4 task_block__title EighthTask__title">
                        Собери слова. Поднимайся по лесенке и добавляй слог с облачка, чтобы получилось целое слово.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="draggable-list__words" v-if="false">
                        <div class="draggable-list__word"><p class="draggable-list__word-text">По</p><p class="draggable-list__word-text">ле</p></div>
                        <div class="draggable-list__word"><p class="draggable-list__word-text">Ле</p><p class="draggable-list__word-text">то</p></div>
                        <div class="draggable-list__word"><p class="draggable-list__word-text">Ве</p><p class="draggable-list__word-text">тер</p></div>
                        <div class="draggable-list__word"><p class="draggable-list__word-text">Тро</p><p class="draggable-list__word-text">па</p></div>
                        <div class="draggable-list__word"><p class="draggable-list__word-text">Ко</p><p class="draggable-list__word-text">рабль</p></div>
                        <div class="draggable-list__word"><p class="draggable-list__word-text">Сол</p><p class="draggable-list__word-text">нце</p></div>
                        <div class="draggable-list__word"><p class="draggable-list__word-text">Тра</p><p class="draggable-list__word-text">ва</p></div>
                        <div class="draggable-list__word"><p class="draggable-list__word-text">Ут</p><p class="draggable-list__word-text">ро</p></div>
                    </div>
                    <div class="draggable-list__steps-wrapper">
                        <div class="draggable-list__steps">
                            <div class="draggable-list__step">
                                <button class="draggable-list__step-button">ПО</button>
                                <div class="draggable-list__substep" id="step1"></div>
                            </div>
                            <div class="draggable-list__step">
                                <button class="draggable-list__step-button">ЛЕ</button>
                                <div class="draggable-list__substep" id="step2"></div>
                            </div>
                            <div class="draggable-list__step">
                                <button class="draggable-list__step-button">ВЕ</button>
                                <div class="draggable-list__substep" id="step3"></div>
                            </div>
                            <div class="draggable-list__step">
                                <button class="draggable-list__step-button">ТРО</button>
                                <div class="draggable-list__substep" id="step4"></div>
                            </div>
                            <div class="draggable-list__step">
                                <button class="draggable-list__step-button">КО</button>
                                <div class="draggable-list__substep" id="step5"></div>
                            </div>
                            <div class="draggable-list__step">
                                <button class="draggable-list__step-button">СОЛ</button>
                                <div class="draggable-list__substep" id="step6"></div>
                            </div>
                            <div class="draggable-list__step">
                                <button class="draggable-list__step-button">ТРА</button>
                                <div class="draggable-list__substep" id="step7"></div>
                            </div>
                            <div class="draggable-list__step">
                                <button class="draggable-list__step-button">УТ</button>
                                <div class="draggable-list__substep" id="step8"></div>
                            </div>
                            <img src="/assets/backgrounds/square.png" alt="square" class="draggable-list__square"/>
                        </div>
                    </div>
                    <div class="draggable-list__right-wrapper">
                        <div class="draggable-list__right-wrapper-cloud">
                            <img class="draggable-list__cloud" src="/assets/backgrounds/cloud.png" alt="cloud">
                            <div class="draggable-list__set-syllables">
                                <div class="draggable-list__set-syllables1">
                                    <button class="draggable-list__syllable">ПА</button>
                                    <button class="draggable-list__syllable">ТЕР</button>
                                    <button class="draggable-list__syllable">РО</button>
                                    <button class="draggable-list__syllable">ЛЕ</button>
                                </div>
                                <div class="draggable-list__set-syllables2">
                                    <button class="draggable-list__syllable">НЦЕ</button>
                                    <button class="draggable-list__syllable">ТО</button>
                                    <button class="draggable-list__syllable">РАБЛЬ</button>
                                    <button class="draggable-list__syllable">ВА</button>
                                </div>
                            </div>
                        </div>
                        <div class="draggable-list__right-wrapper-answer">
                            <div class="draggable-list__right-answer">
                                <div class="draggable-list__right-answer-square"></div>
                                <div class="draggable-list__right-answer-circle"></div>
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
            <TaskResultBanner img="/assets/backgrounds/flowers.png" bg="/assets/backgrounds/moa.gif" text="Супер!"
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

.EighthTask {
    width: 1200px;
}

.EighthTask__title {
    width: 677px;
    @media (max-width: 1024px) {
        width: 560px;
        font-size: 20px;
        font-weight: 400;
    }
}


.draggable-list {
    display: flex;
    justify-content: space-between;
    width: 1100px;
    height: 434px;
    @media (max-width: 1024px) {
        width: 854px;
        height: 325px;  
    }
}

.draggable-list__words {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 134px;
    height: 376px;
    @media (max-width: 1024px) {
        width: 120px;
        height: 266px;
    }
}

.draggable-list__word {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 134px;
    height: 40px;
    border-radius: 6px;
    background-color: $blueGame;
    @media (max-width: 1024px) {
        width: 120px;
        height: 28px;
    }
}

.draggable-list__word-text {
    color: #000;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 600;
    @media (max-width: 1024px) {
        font-size: 16px;
    }
}

.draggable-list__steps-wrapper {
    display: flex;
    align-items: flex-end;
}

.draggable-list__steps {
    display: flex;
    align-items: flex-end;
    width: 654px;
    height: 284px;
    position: relative;
    bottom: 0;
    @media (max-width: 1024px) {
        width: 554px;
        height: 207px;
    }
}

.draggable-list__step {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
}

.draggable-list__step-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    border-radius: 6px;
    background-color: $blueGame;
    color: $darkBlue;
    font-family: 'Nunito', sans-serif;
    font-size: 18px;
    font-weight: bold;
    @media (max-width: 1024px) {
        width: 63px;
        height: 63px;
        font-size: 16px;
    }
}

.draggable-list__substep {
    background-color: #E5935A;
    border-top-left-radius: 6px;
}

#step1 {
    border-bottom-left-radius: 6px;
    width: 80px;
    height: 8px;
    @media (max-width: 1024px) {
        width: 68px;
    }
}

#step2 {
    width: 80px;
    height: 30px;
    @media (max-width: 1024px) {
        width: 68px;
        height: 20px;
    }
}

#step3{
    width: 80px;
    height: 60px;
    @media (max-width: 1024px) {
        width: 68px;
        height: 40px;
    }
}

#step4{
    width: 80px;
    height: 90px;
    @media (max-width: 1024px) {
        width: 68px;
        height: 60px;
    }
}

#step5{
    width: 80px;
    height: 120px;
    @media (max-width: 1024px) {
        width: 68px;
        height: 80px;
    }
}

#step6{
    width: 80px;
    height: 150px;
    @media (max-width: 1024px) {
        width: 68px;
        height: 100px;
    }
}

#step7{
    width: 80px;
    height: 180px;
    @media (max-width: 1024px) {
        width: 68px;
        height: 120px;
    }
}

#step8{
    width: 80px;
    height: 210px;
    @media (max-width: 1024px) {
        width: 68px;
        height: 140px;
    }
}

.draggable-list__square {
    width: 14px;
    height: 210px;
    @media (max-width: 1024px) {
        width: 10px;
        height: 140px;
    }
}

.draggable-list__right-wrapper {
    display: flex;
    width: 415px;
    height: 434px;
    flex-direction: column;
    align-items: center;
    @media (max-width:1024px) {
        width: 284px;
        height: 325px;
    }
}

.draggable-list__right-wrapper-cloud {
    position: relative;
    width: 374px;
    height: 198px;
    @media (max-width: 1024px) {
        width: 284px;
        height: 151px;
    }
}

.draggable-list__cloud {
    position: absolute;
    z-index: -1;
    width: 374px;
    height: 198px;
    @media (max-width: 1024px) {
        width: 284px;
        height: 151px;
    }
}

.draggable-list__set-syllables {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 30px auto 15px auto;
    width: 292px;
    height: 144px;
    @media (max-width: 1024px) {
        width: 264px;
        height: 130px;
    }
}

.draggable-list__set-syllables1,
.draggable-list__set-syllables2 {
    display: flex;
    width: 100%;
    height: 70px;
    justify-content: space-between;
    @media (max-width: 1024px) {
        height: 63px;
    }
}

.draggable-list__syllable {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: $blueGame;
    color: $darkBlue;
    font-family: 'Nunito', sans-serif;
    font-size: 18px;
    font-weight: bold;
    @media (max-width: 1024px) {
        font-size: 16px;
        width: 63px;
        height: 63px;
    }

}

.draggable-list__right-wrapper-answer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 236px;
    @media (max-width: 1024px) {
        height: 174px;
    }
}

.draggable-list__right-answer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    margin-top: 40px;
    width: 160px;
    height: 86px;
    border-radius: 6px;
    border: 2px solid $footer;
    gap: 4px;
    @media (max-width: 1024px) {
        width: 146px;
        height: 79px;
    }
}

.draggable-list__right-answer-square {
    min-width: 70px;
    height: 70px;
    border-radius: 6px;
    background-color: $blueGame;
    @media (max-width: 1024px) {
        min-width: 63px;
        height: 63px;
    }
}

.draggable-list__right-answer-circle {
    min-width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: $blueGame;
    @media (max-width: 1024px) {
        min-width: 63px;
        height: 63px;
    }
}
</style>
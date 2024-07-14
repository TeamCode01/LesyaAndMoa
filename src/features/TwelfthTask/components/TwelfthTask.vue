<template>
    <div class="TwelfthTask task_block">
        <div class="task_block__wrapper">
            <template v-if="endGame === false">
                <!-- ВЫХОД ИЗ ИГРЫ -->
                <div class="task_block__close" @click="hide">
                    <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="Выйти из игры" />
                </div>

                <!-- ЗАДАНИЕ И ВРЕМЯ -->
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title TwelfthTask__title">
                        Перетяни слоги на лодочки, чтобы получились слова. Из
                        этих слов получится предложение.
                    </p>
                </div>

                <!-- САМА ИГРА -->
                <div class="draggable-list">
                    <!-- ВАРИАНТЫ ОТВЕТОВ -->
                    <div class="draggable-list__words">
                        <div class="draggable-list__set-words">
                            <button class="draggable-list__word">ВЕС</button>
                            <button class="draggable-list__word">ВЕ</button>
                            <button class="draggable-list__word">СЁ</button>
                            <button class="draggable-list__word">СЁЛ</button>
                            <button class="draggable-list__word">ЛЫ</button>
                            <button class="draggable-list__word">Е</button>
                            <button class="draggable-list__word">РЕ</button>
                            <button class="draggable-list__word">РЕБ</button>
                            <button class="draggable-list__word">БЯ</button>
                            <button class="draggable-list__word">ЯТА</button>
                            <button class="draggable-list__word">ТА</button>
                        </div>
                        <div class="draggable-list__set-words">
                            <button class="draggable-list__word">НАШ</button>
                            <button class="draggable-list__word">НА</button>
                            <button class="draggable-list__word">ШИ</button>
                            <button class="draggable-list__word">Д</button>
                            <button class="draggable-list__word">ДРУ</button>
                            <button class="draggable-list__word">ЗЬ</button>
                            <button class="draggable-list__word">ЗЬЯ</button>
                        </div>
                    </div>

                    <!-- ЛОДОЧКИ -->
<!-- TODO Для последующего разраба -->
<!-- TODO Лодочка распилина на 2 части, чтоб удобнее было перекрыть кнопку при ответе. {{}} место для ответа -->
<!-- TODO Скрее всего, это хардкод, но в голове у меня только такое решение созрело -->
                    <div class="draggable-list__answer">
                        <!-- ВЕРХНИЕ ЛОДОЧКИ -->
                        <div class="draggable-list__answer-wrapper">
                            <!-- ПЕРВОЕ СЛОВО: "ВЕСЁЛЫЕ" -->
                            <div class="draggable-list__question-word">
                                <!-- ВЕ -->
                                <div class="draggable-list__question-block">
                                    <img src="/assets/creatures/TwelfthTask/boat.png" alt="" class="draggable-list__question-boat">
                                    {{}} 
                                    <img src="/assets/creatures/TwelfthTask/frontside.png" alt="" class="draggable-list__question-boat boat-frontside">
                                </div>

                                <!-- СЁ -->
                                <div class="draggable-list__question-block">
                                     <img src="/assets/creatures/TwelfthTask/boat.png" alt="" class="draggable-list__question-boat">
                                    {{}} 
                                    <img src="/assets/creatures/TwelfthTask/frontside.png" alt="" class="draggable-list__question-boat boat-frontside">   
                                </div>

                                <!-- ЛЫ -->
                                <div class="draggable-list__question-block">
                                    <img src="/assets/creatures/TwelfthTask/boat.png" alt="" class="draggable-list__question-boat">
                                    {{}} 
                                    <img src="/assets/creatures/TwelfthTask/frontside.png" alt="" class="draggable-list__question-boat boat-frontside">
                                </div>

                                <!-- Е -->
                                <div class="draggable-list__question-block">
                                    <img src="/assets/creatures/TwelfthTask/boat.png" alt="" class="draggable-list__question-boat">
                                    {{}} 
                                    <img src="/assets/creatures/TwelfthTask/frontside.png" alt="" class="draggable-list__question-boat boat-frontside">
                                </div>
                            </div>

                            <!-- ВТОРОЕ СЛОВО: "РЕБЯТА" -->
                            <div class="draggable-list__question-word">
                                <!-- РЕ -->
                                <div class="draggable-list__question-block">
                                    <img src="/assets/creatures/TwelfthTask/boat.png" alt="" class="draggable-list__question-boat">
                                    {{}} 
                                    <img src="/assets/creatures/TwelfthTask/frontside.png" alt="" class="draggable-list__question-boat boat-frontside">
                                </div>

                                <!-- БЯ -->
                                <div class="draggable-list__question-block">
                                    <img src="/assets/creatures/TwelfthTask/boat.png" alt="" class="draggable-list__question-boat">
                                    {{}} 
                                    <img src="/assets/creatures/TwelfthTask/frontside.png" alt="" class="draggable-list__question-boat boat-frontside">
                                </div>

                                <!-- ТА -->
                                <div class="draggable-list__question-block">
                                    <img src="/assets/creatures/TwelfthTask/boat.png" alt="" class="draggable-list__question-boat">
                                    {{}} 
                                    <img src="/assets/creatures/TwelfthTask/frontside.png" alt="" class="draggable-list__question-boat boat-frontside">
                                </div>
                            </div>
                        </div>

                        <!-- ВОДА -->
                        <div>
                            <img class="draggable-list__answer-water" src="/assets/creatures/TwelfthTask/water.png" alt="" />
                        </div>

                        <!-- НИЖНИЕ ЛОДОЧКИ -->
                        <div class="draggable-list__answer-wrapper">
                            <!-- ТРЕТЬЕ СЛОВО: "НАШИ" -->
                            <div class="draggable-list__question-word">
                                <!-- НА -->
                                <div class="draggable-list__question-block">
                                    <img src="/assets/creatures/TwelfthTask/boat.png" alt="" class="draggable-list__question-boat">
                                    {{}} 
                                    <img src="/assets/creatures/TwelfthTask/frontside.png" alt="" class="draggable-list__question-boat boat-frontside">
                                </div>

                                <!-- ШИ -->
                                <div class="draggable-list__question-block">
                                    <img src="/assets/creatures/TwelfthTask/boat.png" alt="" class="draggable-list__question-boat">
                                    {{}} 
                                    <img src="/assets/creatures/TwelfthTask/frontside.png" alt="" class="draggable-list__question-boat boat-frontside">
                                </div>
                            </div>

                            <!-- ЧЕТВЁРТОЕ СЛОВО: "ДРУЗЬЯ" -->
                            <div class="draggable-list__question-word">
                                <!-- ДРУ -->
                                <div class="draggable-list__question-block">
                                    <img src="/assets/creatures/TwelfthTask/boat.png" alt="" class="draggable-list__question-boat">
                                    {{}} 
                                    <img src="/assets/creatures/TwelfthTask/frontside.png" alt="" class="draggable-list__question-boat boat-frontside">
                                </div>

                                <!-- ЗЬЯ -->
                                <div class="draggable-list__question-block">
                                    <img src="/assets/creatures/TwelfthTask/boat.png" alt="" class="draggable-list__question-boat">
                                    {{}} 
                                    <img src="/assets/creatures/TwelfthTask/frontside.png" alt="" class="draggable-list__question-boat boat-frontside">
                                </div>
                            </div>
                        </div>

                        <!-- ВОДА -->
                        <div>
                            <img class="draggable-list__answer-water" src="/assets/creatures/TwelfthTask/water.png" alt="" />
                        </div>
                    </div>
                </div>
            </template>
            <TaskResultBanner img="/assets/backgrounds/flowers.png" bg="/assets/backgrounds/moa.gif" text="Превосходно!"
                v-if="show === true" @hide="hideModal"></TaskResultBanner>
        </div>
    </div>
</template>





<script setup>
import { ref, onMounted } from 'vue';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';

const emit = defineEmits(['close']);

const hide = () => {
    emit('close');
    endGame.value = true;
};

const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
});

const endGame = ref(false);
const show = ref(false);
const hideModal = () => {
    show.value = false;
}
</script>





<style scoped lang='scss'>
.TwelfthTask {
    width: 1200px;
}

.TwelfthTask__title {
    width: 640px;
    font-weight: 500;
    font-size: 24px; 

    @media (max-width: 1024px) {
        width: 550px;
        font-size: 20px;
    }
}

// ВСЯ ИГРЫ
.draggable-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 60px;
    width: 100%;
    height: 386px;
    @media (max-width: 1024px) {
        height: 302px;
        margin-top: 48px;
    }
}

// СЛОГИ
.draggable-list__words {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 889px;
    height: 136px;
    @media (max-width: 1024px) {
        height: 116px;
    }
}

.draggable-list__set-words {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 40px;
    margin-bottom: 40px; 

    @media (max-width: 1024px) {
        height: 38px;
        margin-bottom: 16px;
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
    padding: 8px 16px 8px 16px;
    height: 40px;
    margin-left: 20px;
}

// ЛОДОЧКИ
.draggable-list__answer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 873px;
}

.draggable-list__answer-wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: stretch;
    justify-content: space-evenly;
    height: 49px;
    margin-top: 30px; 
    

    @media (max-width: 1024px) {
        margin-top: 5px;
    }
}

.draggable-list__question-word {
    display: flex;
    flex-direction: row;
}

.draggable-list__question-block {
    margin-left: 8px;
    width: 100px;
    height: 34px;
}

.draggable-list__answer-water {
    position: relative;
    bottom: 20px;
    width: 874px;
    height: 20px;
}

.boat-frontside{
    position: relative;
    bottom: 44px;
}
</style>

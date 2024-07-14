<template>
    <div class="TwelfthTask task_block">
        <div class="task_block__wrapper">
            <template v-if="true">
                <!-- ВЫХОД ИЗ ИГРЫ -->
                <div class="task_block__close" @click="hide">
                    <img
                        class="close-icon"
                        src="@app/assets/icons/close-icon.svg"
                        alt="Выйти из игры"
                    />
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
                    <!-- TODO вставить путь src -->
                    <div class="draggable-list__answer">
                        <!-- ВЕРХНИЕ ЛОДОЧКИ -->
                        <div class="draggable-list__answer-wrapper">
                            <!-- ПЕРВОЕ СЛОВО: "ВЕСЁЛЫЕ" -->
                            <div class="draggable-list__question-word">
                                <!-- ВЕ -->
                                <div class="draggable-list__question-block">
                                    
                                </div>

                                <!-- СЁ -->
                                <div class="draggable-list__question-block">
                                    
                                </div>

                                <!-- ЛЫ -->
                                <div class="draggable-list__question-block">
                                    
                                </div>

                                <!-- Е -->
                                <div class="draggable-list__question-block">
                                    
                                </div>
                            </div>

                            <!-- ВТОРОЕ СЛОВО: "РЕБЯТА" -->
                            <div class="draggable-list__question-word">
                                <!-- РЕ -->
                                <div class="draggable-list__question-block">
                                    
                                </div>

                                <!-- БЯ -->
                                <div class="draggable-list__question-block">
                                    
                                </div>

                                <!-- ТА -->
                                <div class="draggable-list__question-block">
                                    
                                </div>
                            </div>

                            <!-- ВОДА -->
                            <div>
                                <img class="" src="" alt="Водичка" />
                            </div>
                        </div>

                        <!-- НИЖНИЕ ЛОДОЧКИ -->
                        <div class="draggable-list__answer-wrapper">
                            <!-- ТРЕТЬЕ СЛОВО: "НАШИ" -->
                            <div class="draggable-list__question-word">
                                <!-- НА -->
                                <div class="draggable-list__question-block">
                                    
                                </div>

                                <!-- ШИ -->
                                <div class="draggable-list__question-block">
                                    
                                </div>
                            </div>

                            <!-- ЧЕТВЁРТОЕ СЛОВО: "ДРУЗЬЯ" -->
                            <div class="draggable-list__question-word">
                                <!-- ДРУ -->
                                <div class="draggable-list__question-block">
                                    
                                </div>

                                <!-- ЗЬЯ -->
                                <div class="draggable-list__question-block">
                                    
                                </div>
                            </div>

                            <!-- ВОДА -->
                            <div>
                                <img class="" src="" alt="Водичка" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <TaskResultBanner
                img="/assets/backgrounds/flowers.png"
                bg="/assets/backgrounds/moa.gif"
                text="Превосходно!"
                v-if="false"
                @hide="hide()"
            ></TaskResultBanner>
        </div>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
</script>

// TODO Прописать стили
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
</style>

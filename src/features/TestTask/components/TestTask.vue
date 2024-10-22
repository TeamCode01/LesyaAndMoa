<template>
    <template v-if="endGame === false">
        <div class="modal-background">
            <div class="TestTask task_block">
                <div class="TestTask__wrapper">
                    <div class="task_block__close" @click="hide">
                        <img
                            class="close-icon"
                            src="@app/assets/icons/icon-close.svg"
                            alt="крест"
                        />
                    </div>
                    <p class="title-h4 TestTask__title">
                        Вставь пропущенные слова.
                    </p>
                    <div class="TestTask__task">
                        Необыкновенные пришельцы Леся и Моа, не знающие
                        нашего<br />
                        <input
                            class="answer_input"
                            v-model="answer"
                            maxlength="5"
                            type="text"
                            placeholder="_ _ _ _ _"
                        />, оказались на нашей планете. Они, словно немые
                        <input
                            class="answer_input"
                            v-model="answer_two"
                            type="text"
                            maxlength="5"
                            placeholder="_ _ _ _ _"
                        />,<br />
                        не могут объяснить нам на своём языке, который для нас
                        звучит,<br />
                        как
                        <input
                            class="answer_input"
                            v-model="answer_three"
                            type="text"
                            maxlength="6"
                            placeholder="_ _ _ _ _ _"
                        />, чего же они хотят. Мы постараемся
                        <input
                            class="answer_input"
                            v-model="answer_four"
                            maxlength="7"
                            type="text"
                            placeholder="_ _ _ _ _ _ _"
                        />
                        стекло<br />
                        недопонимания между нами и
                        <input
                            class="answer_input"
                            v-model="answer_five"
                            type="text"
                            maxlength="6"
                            placeholder="_ _ _ _ _ _ "
                        />
                        им.
                    </div>
                    <Button
                        class="TestTask__btn"
                        :isImage="true"
                        :image="arrow"
                        @click="checkAnswer()"
                        label="Ответить"
                    />
                </div>
            </div>
        </div>
    </template>
    <div v-else class="modal-background">
        <TaskResultBanner
            :progress="100"
            class="end-modal"
            :is-end="false"
            :is_test="true"
            :bg="getImageUrl('Moa.png')"
            text="Молодец! Ты полностью справился с заданием. Теперь ты можешь помочь и Лесе с Моа тоже научиться понимать нас."
            v-if="endGame === true && correct === 5"
            @hide="hide"
        ></TaskResultBanner>
        <TaskResultBanner
            :progress="80"
            class="end-modal"
            :is_test="true"
            :bg="getImageUrl('Moa.png')"
            text="Здорово! Ты почти всё верно выполнил. Помоги теперь Лесе и Моа научиться понимать нас."
            v-else-if="endGame === true && correct === 4"
            @hide="hide"
        ></TaskResultBanner>
        <TaskResultBanner
            :progress="60"
            class="end-modal"
            :is_test="true"
            :bg="getImageUrl('Moa.png')"
            text="Неплохо, ты верно выполнил задание больше, чем наполовину. Ты можешь помочь Лесе и Моа научиться понимать нас."
            v-else-if="endGame === true && correct === 3"
            @hide="hide"
        ></TaskResultBanner>
        <TaskResultBanner
            :progress="30"
            class="end-modal"
            :is_test="true"
            :bg="getImageUrl('Moa.png')"
            text=" Неплохо, ты попробовал понять текст. А Леся и Моа не понимают нас совсем. Только ты можешь помочь им."
            v-else-if="endGame === true && (correct === 2 || correct === 1)"
            @hide="hide"
        ></TaskResultBanner>
        <TaskResultBanner
            class="end-modal"
            :progress="0"
            :is-end="false"
            :is_test="true"
            :bg="getImageUrl('Moa.png')"
            text="Попробуй помочь нашим героям! У тебя все получится!"
            v-else-if="endGame === true && correct === 0"
            @hide="hide"
        ></TaskResultBanner>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { Button } from '@shared/components/buttons';
import arrow from '@app/assets/icons/Arrow.svg';
import { TaskResultBanner } from '@features/TaskResultBanner/components';

import { SvgIcon } from '@shared/components/svgIcon';

const emit = defineEmits(['close']);

const hide = () => {
    emit('close');
    endGame.value = true;
};

const answer = ref('');
const answer_two = ref('');
const answer_three = ref('');
const answer_four = ref('');
const answer_five = ref('');
const endGame = ref(false);
const correct = ref(0);
const getImageUrl = (path) => {
    return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};

const answer_finish = ref('языка');
const answer_two_finish = ref('рыбы');
const answer_three_finish = ref('музыка');
const answer_four_finish = ref('разбить');
const answer_five_finish = ref('помочь');

const checkAnswer = () => {
    if (answer.value.toLowerCase() === answer_finish.value) {
        correct.value++;
    }
    if (
        answer_two.value.toLowerCase() === answer_two_finish.value ||
        answer_two.value.toLowerCase() === 'рыбки'
    ) {
        correct.value++;
    }
    if (answer_three.value.toLowerCase() === answer_three_finish.value) {
        correct.value++;
    }
    if (answer_four.value.toLowerCase() === answer_four_finish.value) {
        correct.value++;
    }
    if (answer_five.value.toLowerCase() === answer_five_finish.value) {
        correct.value++;
    }

    endGame.value = true;
};
</script>
<style lang="scss" scoped>
.modal-background {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
    background-color: #f1fafe;
    z-index: 1;
}

.end-modal {
    width: 1200px;
    height: 600px;
    z-index: 99;
}

.TestTask {
    &__title {
        text-align: center;
        font-size: 24px;
        font-weight: medium;
        font-family: 'Nunito';

        @media (max-width: 1024px) {
            font-size: 20px;
        }
    }

    &__task {
        border: 2px solid #e2d6f9;
        margin: 50px auto;
        padding: 40px;
        color: #4e3b7f;
        font-size: 24px;
        font-family: 'Nunito';
        font-weight: 600;
        max-width: 870px;
        line-height: 40px;
    }

    &__wrapper {
        padding: 30px 0px 73px 0px;
        position: relative;

        @media (max-width: 1024px) {
            padding: 30px 0px 45px 0px;
        }
    }

    &__btn {
        max-width: 280px;
        width: 100%;
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 32px;
        margin: 0 auto;

        @media (max-width: 1024px) {
            max-width: 212px;
            height: 48px;
            column-gap: 28px;
        }
    }
}

.answer_input {
    border: none;
    color: #4e3b7f;
    font-size: 24px;
    font-family: 'Nunito';
    font-weight: 600;
    max-width: 90px;
    line-height: 40px;
    height: 20px;
    outline: none;
}

.close {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
}
</style>

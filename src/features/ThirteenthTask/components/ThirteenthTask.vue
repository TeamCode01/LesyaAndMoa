<template>
    <template v-if="endGame === true">
        <div class="ThirteenthTask task_block">
            <div class="ThirteenthTask__wrapper">
                <div class="task_block__close" @click="hide">
                    <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 ThirteenthTask__title">
                        Дополни предложения недостающими словами.
                    </p>
                </div>

                <div class="draggable-list">
                    <q-btn v-for="(item, index) in words" :key="index" class="list-group-item item" draggable="true"
                        @dragstart="drag($event, index)" @dragover.prevent :value="item">
                        {{ item }}
                    </q-btn>
                </div>
                <div class="ThirteenthTask__wrapper_answer" v-show="answer === ''">
                    Мы очень
                    <input :class="{ correct: answer_drop === 'РАДЫ' }" @drop="drop($event)"
                        @dragover="allowDrop($event)" v-model="answer_drop" type="text" />
                    с вами познакомиться.
                </div>
                <div v-show="answer === 'РАДЫ'" class="ThirteenthTask__wrapper_answer">
                    Нам нравится
                    <input :class="{ correct: answer_drop === 'ОБЩАТЬСЯ' }" @drop="drop($event)"
                        @dragover="allowDrop($event)" v-model="answer_drop" type="text" />
                    с вами.
                </div>
                <div v-show="answer === 'ОБЩАТЬСЯ'" class="ThirteenthTask__wrapper_answer">
                    Приходите чаще на
                    <input :class="{ correct: answer_drop === 'ДЕТСКУЮ' }" @drop="drop($event)"
                        @dragover="allowDrop($event)" v-model="answer_drop" type="text" />
                    площадку.
                </div>
            </div>
        </div>
    </template>

    <TaskResultBanner img="/assets/backgrounds/Cup.png" bg="/assets/backgrounds/Lesya.png" text="Чудесно!"
        v-if="show === true" @hide="hideModal"></TaskResultBanner>
</template>

<script setup>
import { ref } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
const emit = defineEmits(['close']);
const endGame = ref(false);
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


const show = ref(false);
const hideModal = () => {
    show.value = false;
}

const words = ref([
    'РАДЫ',
    'РАССТРОЕНЫ',
    'ДЕТСКУЮ',
    'ВЗРОСЛУЮ',
    'ОБЩАТЬСЯ',
    'РУГАТЬСЯ',
]);
const answer_drop = ref('?');
const answer = ref('');
const answer_two = ref('');
const answer_three = ref('');
const dropIndex = ref(words.value.length - 1);
const drag = (event, index) => {
    event.dataTransfer.setData('text', event.target.value);
    console.log(event.target.value);
    dropIndex.value = index;
};

const drop = (event) => {
    event.preventDefault();
    let text = event.dataTransfer.getData('text');

    if (
        (answer.value === '' && text === 'РАДЫ') ||
        (answer.value === 'РАДЫ' && text === 'ОБЩАТЬСЯ') ||
        (answer.value === 'ОБЩАТЬСЯ' && text === 'ДЕТСКУЮ')
    ) {
        words.value.splice(dropIndex.value, 1);
        answer_drop.value = text;
        setTimeout(() => {
            answer.value = text;
            answer_drop.value = '?';
        }, 2000);

        if (text === 'ДЕТСКУЮ') {
            endGame.value = true;
            show.value = true;
        }
    }
    else {
        return false;
    }
};

const allowDrop = (event) => {
    event.preventDefault();
};
</script>
<style lang="scss" scoped>
.draggable-list {
    display: flex;
    flex-wrap: wrap;
    column-gap: 48px;
    justify-content: center;
    row-gap: 48px;
    width: 100%;
    max-width: 555px;
    margin: 60px auto;
}

.ThirteenthTask {
    &__wrapper {
        padding: 30px 60px 60px;
        position: relative;

        @media (max-width: 1024px) {
            padding: 30px 20px;
        }

        &_answer {
            background-color: $blueGame;
            width: 100%;
            padding: 35px 17px;
            text-align: center;
            color: #4e3b7f;
            margin-top: 120px;
            font-size: 22px;
            font-weight: 700;
            font-family: 'Nunito';
            border-radius: 20px;
            border: none;

            resize: none;
            overflow-y: hidden;
            height: 100px;

            input {
                width: 101px;
                height: 44px;
                border: none;
                border-radius: 6px;
                margin: 0px 27px;
                color: #4e3b7f;
                font-size: 22px;
                font-weight: 700;
                outline: none;
                font-family: 'Nunito';
                text-align: center;
            }
        }
    }
}

.correct {
    background-color: $blueGame;
    text-transform: lowercase;
    margin: 0px !important;
    min-width: 60px !important;
}

.item {
    background-color: #e2d6f9;
    padding: 8.5px 20px;
    color: #4e3b7f;
    font-size: 20px;
    font-weight: Bold;
    font-family: 'Nunito';
    border-radius: 6px;
    border: none;
    cursor: pointer;
}
</style>

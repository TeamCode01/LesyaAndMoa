<template>
    <div class="SixTask task_block">
        <div class="task_block__wrapper">
            <template v-if="answersCounter < 26">
                <div class="task_block__close" @click="hide">
                    <img
                        class="close-icon"
                        src="@app/assets/icons/close-icon.svg"
                        alt="крест"
                    />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title">
                        Расшифруй сообщение.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="draggable-list__items">
                        <div
                            class="draggable-list__item"
                            v-for="row in taskData"
                            :key="row"
                        >
                            <button
                                class="draggable-list__button"
                                :class="{
                                    'draggable-list__button_main':
                                        word.x == 0 || word.y == 0,
                                    'draggable-list__button_task':
                                        word.x != 0 && word.y != 0,
                                }"
                                v-for="word in row"
                                :key="word.text"
                                :disabled="word.x == 0 || word.y == 0"
                                @click="console.log(word.text)"
                                :draggable="word.x != 0 && word.y != 0"
                                @dragstart="
                                    dragLetter(
                                        $event,
                                        word.x,
                                        word.y,
                                        word.text
                                    )
                                "
                            >
                                {{ word.text }}
                            </button>
                        </div>
                    </div>
                </div>

                <div class="task_block__list" v-if="true">
                    <div class="task_block__items">
                        <div
                            class="task_block__row"
                            v-for="row in rowsData"
                            :key="row"
                        >
                            <div
                                class="task_block__word"
                                v-for="word in row"
                                :key="word"
                                @click="console.log(tasksData)"
                            >
                                <div
                                    class="task_block__letter"
                                    v-for="letter in word"
                                    :key="letter"
                                    @drop="
                                        dropLetter(
                                            $event,
                                            letter.x,
                                            letter.y,
                                            letter.id,
                                            letter.isActive
                                        )
                                    "
                                    @dragover.prevent
                                    :class="{
                                        task_block__letter_active:
                                            letter.isActive,
                                    }"
                                    @click="
                                        console.log(
                                            letter.x,
                                            letter.y,
                                            letter.text
                                        )
                                    "
                                >
                                    {{ letter.text }}
                                </div>
                                <img
                                    class="comma"
                                    src="/assets/icons/comma-blue.svg"
                                    alt="comma-blue"
                                    v-if="
                                        [18].includes(word.slice(-1)[0].id) &&
                                        word.slice(-1)[0].isActive
                                    "
                                />
                                <div
                                    class="draggable-list__full-stop"
                                    v-if="
                                        [6, 26].includes(
                                            word.slice(-1)[0].id
                                        ) && word.slice(-1)[0].isActive
                                    "
                                >
                                    <img
                                        src="/assets/icons/full-stop-blue.svg"
                                        alt="full-stop-blue"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <TaskResultBanner
                img="/assets/backgrounds/flowers.png"
                bg="/assets/backgrounds/moa.gif"
                text="Здорово!"
                v-if="answersCounter == 26"
                @hide="hide()"
            ></TaskResultBanner>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';

import { tasksData } from './tasks.js';

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

onMounted(() => {
    let audio = new Audio('/assets/audio/Task6/79.6.mp3');
    audio.play();
});

let legalWords = [];

const taskData = ref([]);
const rowsData = ref([]);

const answersCounter = ref(0);

[taskData.value, rowsData.value] = structuredClone(tasksData);

for (let row = 1; row in taskData; row++) {
    for (let column = 1; column in taskData[row]; column++) {
        legalWords.push(taskData[row][column]);
    }
}

const dragLetter = (event, x, y, text) => {
    event.dataTransfer.setData('text', `${x} ${y} ${text}`);
};

const dropLetter = (event, x, y, id, isActive) => {
    let dragx = event.dataTransfer.getData('text').split(' ')[0];
    let dragy = event.dataTransfer.getData('text').split(' ')[1];
    let dragtext = event.dataTransfer.getData('text').split(' ')[2];

    if (!isActive) {
        if (dragx == x && dragy == y) {
            console.log(dragtext, id);
            rowsData.value.map((row) =>
                row.map((word) => {
                    word.map((letter) => {
                        if (letter.id == id) {
                            letter.text = dragtext;
                            letter.isActive = true;
                        }
                    });
                })
            );

            answersCounter.value += 1;
            event.target.classList.add('task_block__letter_right');
            let reactionAudio = new Audio(
                `/assets/audio/Task6/right.${Math.ceil(Math.random() * 3)}.mp3`
            );
            reactionAudio.play();

            setTimeout(() => {
                event.target.classList.remove('task_block__letter_right');
            }, 2000);
        } else {
            event.target.classList.add('task_block__letter_wrong');

            let reactionAudio = new Audio(
                `/assets/audio/Task6/wrong.${Math.ceil(Math.random() * 3)}.mp3`
            );
            reactionAudio.play();

            setTimeout(() => {
                event.target.classList.remove('task_block__letter_wrong');
            }, 2000);
        }
    }
};
</script>
<style lang="scss" scoped>
.draggable-list {
    display: flex;
    gap: 88px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    @media (max-width: 1024px) {
        gap: 60px;
    }
}

.draggable-list__items {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 540px;
    gap: 2px;
    @media (max-width: 1024px) {
        gap: 2px;
    }
}
.draggable-list__item {
    display: flex;
    justify-content: center;
    gap: 2px;
}
.draggable-list__item {
    width: 100%;
    height: 40px;
}

.draggable-list__button {
    text-align: center;
    width: 68px;
    height: 40px;
    background-color: $lightPink;
    color: $vihous;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    letter-spacing: 0;
    border-radius: 6px;
    font-weight: bold;
}

.draggable-list__button_main {
    background: #d2efff;
    color: $darkBlue;
}

.draggable-list__button_task {
    background: #b5f9ad;
    color: #0f5707;
}

.FourthTask {
    position: block;
}

.draggable-list__button_final {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 271px;
    height: 48px;
    background-color: #fff;
    color: $darkBlue;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    letter-spacing: 0;
    border-radius: 30px;
    font-weight: 400;
    line-height: 48px;
    border: 1.5px solid $darkBlue;
}

.draggable-list__button-speaker,
.draggable-list__button-repeat {
    padding-right: 20px;
}

.item {
    background-color: $greenGame;
    padding: 12px 18px;
    color: #0f5707;
    font-size: 16px;
    font-weight: 600;
    font-family: 'Nunito', sans-serif;
    border-radius: 6px;
    border: none;
    cursor: pointer;
}

.item_right {
    border: 2px solid #5ccf54;
}
.item_wrong {
    border: 2px solid #db0000;
}

.item_unselected {
    border: none;
}

.task_block__list {
    width: 1074px;
    margin-top: 60px;
}
.task_block__items {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.task_block__row {
    display: flex;
    gap: 16px;
    justify-content: center;
}
.task_block__word {
    display: flex;
    gap: 2px;
}
.task_block__letter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 68px;
    height: 40px;
    border-radius: 6px;

    /* background/blue */
    background: rgb(210, 239, 255);

    color: rgb(154, 169, 193);
    font-family: Nunito;
    font-size: 20px;
    font-weight: 700;
    line-height: 27px;
    letter-spacing: 0%;
}

.task_block__letter_active {
    background: rgb(181, 249, 173);
    color: #0f5707;
}

.task_block__letter_wrong {
    border: 2px solid #db0000;
}
.task_block__letter_right {
    border: 2px solid #5ccf54;
}

.draggable-list__full-stop {
    display: flex;
    align-items: flex-end;
    width: 11px;
    height: 40px;
    @media (max-width: 1024px) {
        width: 8px;
        height: 40px;
    }
}
.comma {
    position: relative;
    top: -4px;
    transform: scale(0.85);
    fill: rgb(15, 87, 7);
}
</style>

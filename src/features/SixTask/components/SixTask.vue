<template>
    <div class="SixTask task_block">
        <div class="task_block__wrapper">
            <template v-if="answersCounter < 15">
                <div class="task_block__close" @click="hide">
                    <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title">
                        Найди произносимые слоги.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="draggable-list__items">
                        <div class="draggable-list__item" v-for="row in taskData" :key="row">
                            <button class="draggable-list__button" :class="{
                                item_right:
                                    word.text == taskWord &&
                                    word.text == selectedWord &&
                                    word.text != '',
                                item_wrong:
                                    word.text != taskWord &&
                                    word.text == selectedWord &&
                                    word.text != '',
                            }" v-for="word in row" :key="word.id" :disabled="word.text.trim().length < 2 ||
                                taskWord == '' ||
                                blockButtons == true
                                " @click="clickItem(word)">
                                {{ word.text }}
                            </button>
                        </div>
                    </div>
                    <div v-if="!repeated">
                        <button class="draggable-list__button_final" @click="() => {
                            if (firstMusic) randomMusic();
                            playMusic();
                        }
                            ">
                            <span class="draggable-list__button-speaker">Прослушать</span>
                            <img src="@app\assets\icons\speaker.svg" alt="speaker" />
                        </button>
                    </div>
                    <div v-if="repeated">
                        <button class="draggable-list__button_final" @click="playMusic()"
                            :disabled="blockButtons == true">
                            <span class="draggable-list__button-repeat">Повторить</span>
                            <img src="@app\assets\icons\repeat.svg" alt="repeat" />
                        </button>
                    </div>
                </div>
            </template>
            <TaskResultBanner :img="getImageUrl('Diamond.png')" :bg="getImageUrl('moa.gif')" text="Блистательно!"
                v-if="answersCounter >= 15" @hide="hide()" @next="next()" class="end-modal"></TaskResultBanner>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';

import { tasksData } from './tasks.js';
import dict from './dict.js';

import gameActions from '@mixins/gameAction';
import { SvgIcon } from '@shared/components/svgIcon';

const { methods } = gameActions;
const { endGameRequest, startGameRequest, getCorrectAnswer } = methods;

const emit = defineEmits(['close', 'next-modal', 'correct', 'open']);
const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
    childId: {
        type: Number,
        required: false,
    }
});
const hide = () => {
    emit('close');
    console.log('close')
};

const next = () => {
    emit('next-modal');
};



const getImageUrl = (path) => {
    return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};

const corrValue = ref(0)
const is_correct = ref(false)

const dictKeys = Array.from(dict.keys()); // Массив разрешенных значений

let legalWords = [];

const taskData = structuredClone(
    tasksData[Math.floor(tasksData.length * Math.random())]
);

for (let row = 1; row in taskData; row++) {
    for (let column = 1; column in taskData[row]; column++) {
        taskData[row][column].text =
            taskData[row][0].text + taskData[0][column].text;
        if (!dictKeys.includes(taskData[row][column].text)) {
            taskData[row][column].text = '';
        } else {
            legalWords.push(taskData[row][column].text);
        }
    }
}

const firstMusic = ref(true);

const taskWord = ref(''); // Заданное слово в текущей итерации

const repeated = ref(false); // Повторяется ли слово в текущий момент

const usedWord = ref([]); // Использованные слова

const answersCounter = ref(0)

const blockButtons = ref(true);

let audio = new Audio();

const randomMusic = (first = false) => {
    let randomNumber = Math.floor(Math.random() * legalWords.length);
    let item = legalWords[randomNumber];
    while (usedWord.value.includes(item)) {
        randomNumber = Math.floor(Math.random() * legalWords.length);
        item = legalWords[randomNumber];
    }

    taskWord.value = item;

    let file = dict.get(`${item}`);
    let audioPath3 = new URL(`/assets/audio/Task6/${file}`, import.meta.url).href
    audio = new Audio(audioPath3);
    //audio.play();
    usedWord.value.push(item);

    repeated.value = false;
    firstMusic.value = false;

    console.log(item);
};

const playMusic = () => {
    blockButtons.value = false;
    repeated.value = true;
    audio.play();
};

const lastItem = ref();

const selectedWord = ref();

const clickItem = (word) => {
    if (word.text == taskWord.value) {
        let audioPath = new URL(`/assets/audio/Task6/right.${Math.ceil(Math.random() * 3)}.mp3`, import.meta.url).href;
        let reactionAudio = new Audio(
            audioPath
        );
        reactionAudio.play();
        blockButtons.value = true;
        
        setTimeout(() => {
            answersCounter.value += 1

            if (answersCounter.value == 15) {
                let audioPathSimple = new URL(`/assets/audio/Task6/259.6_.mp3`, import.meta.url).href;
                let audio = new Audio(audioPathSimple);
                audio.play();

                setTimeout(() => {
                    if (is_correct.value === false) {
                        endGameRequest(props.childId, corrValue.value);
                        emit('correct');
                        emit('open');
                    }
                }, 1000)

                console.log('end game')

            }
        }, 1000)

    } else {
        let audioPath2 = new URL(`/assets/audio/Task6/wrong.1.mp3`, import.meta.url).href;
        let reactionAudio = new Audio(
            audioPath2
        );
        reactionAudio.play();
    }

    selectedWord.value = word.text;

    setTimeout(() => {
        selectedWord.value = '';
        if (word.text == taskWord.value) randomMusic();
    }, 2000);
};

onMounted(async () => {
    const correct = await getCorrectAnswer(6, props.childId);
    corrValue.value = correct.correctId;
    is_correct.value = correct.is_correct;
});

onMounted(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.style.setProperty(
        '--scroll-position',
        `${scrollY}px`,
    );
    document.getElementsByTagName('html')[0].classList.add('no-scroll');
    document.body.classList.add('no-scroll'); /* Прокрутка ставится на паузу */

    console.log('game mount')
});


onBeforeUnmount(() => {
    document.getElementsByTagName('html')[0].classList.remove('no-scroll');
    document.body.classList.remove('no-scroll'); /* Прокрутка возвращается */
    console.log('game unmount')
});

</script>
<style lang="scss" scoped>
* {
    user-select: none;
}

.end-modal {
    width: 1200px;
    height: 600px;


    @media (max-width: 1200px) {
        width: 944px;
        height: 500px;
    }
}

.draggable-list {
    display: flex;
    gap: 88px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 60px;

    @media (max-width: 1024px) {
        gap: 60px;
    }
}

.draggable-list__items {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;

    @media (max-width: 1024px) {
        gap: 4px;
    }
}

.draggable-list__item {
    display: flex;
    justify-content: center;
    gap: 4px;
}

.draggable-list__item {
    width: 100%;
    height: 40px;
}

.draggable-list__button {
    text-align: center;
    width: 60px;
    height: 40px;
    background-color: $lightPink;
    color: $vihous;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    letter-spacing: 0;
    border-radius: 6px;
    font-weight: bold;
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
</style>

<template>
    <div class="EighthTask task_block">
        <div class="task_block__wrapper">
            <template v-if="startGame">
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
                        Собери слова. Поднимайся по лесенке и добавляй слог
                        с облачка, чтобы получилось целое слово.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="draggable-list__column">
                        <div class="draggable-list__words" v-if="countAnswers">
                            <div
                                v-for="answer in correctAnswers"
                                :key="answer.id"
                                class="draggable-list__words-container"
                            >
                                <div
                                    class="draggable-list__word"
                                    v-if="answer.text"
                                >
                                    <p class="draggable-list__word-text">
                                        {{ answer.text }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="draggable-list__steps-wrapper">
                            <div class="draggable-list__steps">
                                <div
                                    class="draggable-list__step"
                                    v-for="(
                                        syllable, syllable_index
                                    ) in syllables[1]"
                                    :key="syllable.id"
                                >
                                    <VueDraggableNext
                                        @choose="
                                            drag($event, syllable, 1);
                                            clickText($event, syllable);
                                        "
                                        @unchoose="checkPosition($event)"
                                        :group="{
                                            name: 'words1',
                                            pull: 'clone',
                                            put: false,
                                        }"
                                        :sort="false"
                                        data-isActive="true"
                                        :ghost-class="'hidden'"
                                        :class="{ hidden: syllable.hidden }"
                                        class="draggable-list__step-button__wrapper"
                                    >
                                        <div
                                            :class="{
                                                'draggable-list__step-button': true,
                                                hidden: syllable.hidden,
                                                correct_select:
                                                    syllable.correct,
                                                not_correct_select:
                                                    syllable.correct === false,
                                            }"
                                            :value="syllable.text"
                                        >
                                            {{ syllable.text }}
                                        </div>
                                    </VueDraggableNext>
                                    <div
                                        class="draggable-list__substep"
                                        :id="syllable.id_class"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="draggable-list__right-wrapper">
                        <div class="draggable-list__right-wrapper-cloud">
                            <img
                                class="draggable-list__cloud"
                                src="/assets/backgrounds/cloud.png"
                                alt="cloud"
                            />
                            <div class="draggable-list__set-syllables">
                                <div
                                    class="draggable-list__set-syllables1"
                                    v-for="(
                                        syllables_row, syllables_row_index
                                    ) in syllables[2]"
                                    :key="syllables_row_index"
                                >
                                    <VueDraggableNext
                                        v-for="syllable in syllables_row"
                                        :key="syllable.id"
                                        @choose="
                                            drag($event, syllable, 2);
                                            clickText($event, syllable);
                                        "
                                        @unchoose="checkPosition($event)"
                                        :group="{
                                            name: 'words2',
                                            pull: 'clone',
                                            put: false,
                                        }"
                                        :sort="false"
                                        data-isActive="true"
                                        :ghost-class="'hidden'"
                                        :drag-class="`${
                                            syllable.drag_class == true
                                                ? 'hidden'
                                                : ''
                                        }`"
                                        class="draggable-list__syllable__wrapper"
                                    >
                                        <div
                                            :class="{
                                                'draggable-list__syllable': true,
                                                hidden: syllable.hidden,
                                                correct_select:
                                                    syllable.correct,
                                                not_correct_select:
                                                    syllable.correct === false,
                                            }"
                                            :value="syllable.text"
                                        >
                                            {{ syllable.text }}
                                        </div>
                                    </VueDraggableNext>
                                </div>
                            </div>
                        </div>
                        <div class="draggable-list__right-wrapper-answer">
                            <div class="draggable-list__right-answer">
                                <VueDraggableNext
                                    class="draggable-list__right-answer-square"
                                    @add="drop($event, 1)"
                                    ghost-class="none"
                                    draggable="false"
                                    :group="{
                                        name: 'answer1',
                                        pull: false,
                                        put: true,
                                    }"
                                    :sort="false"
                                >
                                    <input
                                        @focus="
                                            ($event) => {
                                                $event.target.blur();
                                            }
                                        "
                                        id="squareAnswer"
                                        class="answer draggable-list__step-button"
                                        readonly
                                        v-model="squareAnswer.text"
                                    />
                                </VueDraggableNext>

                                <VueDraggableNext
                                    class="draggable-list__right-answer-circle"
                                    @add="drop($event, 2)"
                                    ghost-class="none"
                                    draggable="false"
                                    @drop="console.log('!!!!')"
                                    :group="{
                                        name: 'answer2',
                                        pull: false,
                                        put: true,
                                    }"
                                    :sort="false"
                                >
                                    <input
                                        @focus="
                                            ($event) => {
                                                $event.target.blur();
                                            }
                                        "
                                        id="circleAnswer"
                                        class="answer draggable-list__syllable"
                                        readonly
                                        v-model="circleAnswer.text"
                                    />
                                </VueDraggableNext>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <TaskResultBanner
                :img="getImageUrl('flowers.png')"
                :bg="getImageUrl('moa.gif')"
                class="end-modal"
                text="Супер!"
                v-else
                @hide="hide()"
                @next="next()"
            ></TaskResultBanner>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
import gameActions from '@mixins/gameAction';

import { SvgIcon } from '@shared/components/svgIcon';

const { methods } = gameActions;
const { endGameRequest, startGameRequest, getCorrectAnswer } = methods;
const startGame = ref(true);
const draggable = ref(true);
let soundPlayed = false;
const squareAnswer = ref({
    text: '',
    firstIndex: 0,
    secondIndex: 0,
});

const circleAnswer = ref({
    text: '',
    firstIndex: 0,
    secondIndex: 0,
    thirdIndex: 0,
});

const syllables = ref({
    1: [
        {
            id: 1,
            id_class: 'step1',
            text: 'ПО',
            audio: 'Task8/281.8.mp3',
            correct: null,
            hidden: false,
            drag_class: false,
        },
        {
            id: 2,
            id_class: 'step2',
            text: 'ЛЕ',
            audio: 'Task8/282.8.mp3',
            correct: null,
            hidden: false,
            drag_class: false,
        },
        {
            id: 3,
            id_class: 'step3',
            text: 'ВЕ',
            audio: 'Task8/283.8.mp3',
            correct: null,
            hidden: false,
            drag_class: false,
        },
        {
            id: 4,
            id_class: 'step4',
            text: 'ТРО',
            audio: 'Task8/284.8.mp3',
            correct: null,
            hidden: false,
            drag_class: false,
        },
        {
            id: 5,
            id_class: 'step5',
            text: 'КО',
            audio: 'Task8/285.8.mp3',
            correct: null,
            hidden: false,
            drag_class: false,
        },
        {
            id: 6,
            id_class: 'step6',
            text: 'СОЛ',
            audio: 'Task8/286.8.mp3',
            correct: null,
            hidden: false,
            drag_class: false,
        },
        {
            id: 7,
            id_class: 'step7',
            text: 'ТРА',
            audio: 'Task8/287.8.mp3',
            correct: null,
            hidden: false,
            drag_class: false,
        },
        {
            id: 8,
            id_class: 'step8',
            text: 'УТ',
            audio: 'Task8/288.8.mp3',
            correct: null,
            hidden: false,
            drag_class: false,
        },
    ],
    2: {
        1: [
         
            {
                id: 1,
                text: 'ТЕР',
                audio: 'Task8/290.8.mp3',
                correct: null,
                hidden: false,
                drag_class: false,
            },
            {
                id: 2,
                text: 'РО',
                audio: 'Task8/291.8.mp3',
                correct: null,
                hidden: false,
                drag_class: false,
            },
            {
                id: 3,
                text: 'ПА',
                audio: 'Task8/289.8.mp3',
                correct: null,
                hidden: false,
                drag_class: false,
            },
            {
                id: 4,
                text: 'ЛЕ',
                audio: 'Task8/292.8.mp3',
                correct: null,
                hidden: false,
                drag_class: false,
            },
        ],
        2: [
            {
                id: 5,
                text: 'НЦЕ',
                audio: 'Task8/293.8.mp3',
                correct: null,
                hidden: false,
                drag_class: false,
            },
            {
                id: 6,
                text: 'ТО',
                audio: 'Task8/294.8.mp3',
                correct: null,
                hidden: false,
                drag_class: false,
            },
            {
                id: 7,
                text: 'РАБЛЬ',
                audio: 'Task8/295.8.mp3',
                correct: null,
                hidden: false,
                drag_class: false,
            },
            {
                id: 8,
                text: 'ВА',
                audio: 'Task8/296.8.mp3',
                correct: null,
                hidden: false,
                drag_class: false,
            },
        ],
    },
});

const countAnswers = ref(0);
const corrValue = ref(0);
const is_correct = ref(false);
const correctAnswers = ref([{}, {}, {}, {}, {}, {}, {}, {}]);

const dragClasses = ref({
    1: [false, false, false, false, false, false, false, false],
    2: [false, false, false, false, false, false, false, false],
});
const getImageUrl = (path) => {
    return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};
const answers = ref([
    {
        id: 1,
        text: 'Поле',
        audio: 'Task8/поле.mp3',
        answered: false,
    },
    {
        id: 2,
        text: 'Лето',
        audio: 'Task8/лето.mp3',
        answered: false,
    },
    {
        id: 3,
        text: 'Ветер',
        audio: 'Task8/ветер.mp3',
        answered: false,
    },
    {
        id: 4,
        text: 'Тропа',
        audio: 'Task8/тропа.mp3',
        answered: false,
    },
    {
        id: 5,
        text: 'Корабль',
        audio: 'Task8/корабль.mp3',
        answered: false,
    },
    {
        id: 6,
        text: 'Солнце',
        audio: 'Task8/солнце.mp3',
        answered: false,
    },
    {
        id: 7,
        text: 'Трава',
        audio: 'Task8/трава.mp3',
        answered: false,
    },
    {
        id: 8,
        text: 'Утро',
        audio: 'Task8/утро.mp3',
        answered: false,
    },
]);

const clickText = (event, syllable) => {
    if (soundPlayed || event.target.dataset['isactive'] !== 'true') return;
    playAudio(syllable.audio);
    soundPlayed = true;
    setTimeout(() => {
        soundPlayed = false;
    }, 500);
};

const emit = defineEmits(['close', 'next-modal', 'correct', 'open']);
const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
    childId: {
        type: Number,
        required: false,
    },
});

const audio =  new Audio();
const playAudio = (audioPath) => {
    audio.src = new URL(`/assets/audio/${audioPath}`, import.meta.url).href;
    audio.play();
    if (!soundPlayed) {
        soundPlayed = true;
        setTimeout(() => {
            soundPlayed = false;
        }, 2000);
    }
};

const dataTransfer = ref({});

const checkDragAndDrop = ref(false);

const drag = (event, syllable, fromPlace) => {
    // event.dataTransfer.setData('id', syllable.id);
    // event.dataTransfer.setData('fromPlace', fromPlace)
    if (
        event.from.classList.contains('hidden') ||
        event.from.dataset['isactive'] !== 'true'
    ) {
        checkDragAndDrop.value = false;
        dataTransfer.value.id = '';
        dataTransfer.value.fromPlace = '';
        return;
    }

    checkDragAndDrop.value = true;
    dataTransfer.value.id = syllable.id;
    dataTransfer.value.fromPlace = fromPlace;

    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
            navigator.userAgent,
        )
    ) {
    } else {
        //syllable.drag_class = true;
        event.from.classList.add('hidden');
    }
    //
    // playAudio(syllable.audio);
};

let squareFrom;
let circleFrom;
let squareDOM;
let circleDOM;

const drop = (event, place) => {
    //event.preventDefault();
    // const id = event.dataTransfer.getData('id');
    // const fromPlace = event.dataTransfer.getData('fromPlace');

    event.to.removeChild(event.item);
    event.from.classList.remove('hidden');
    console.log('drop', checkDragAndDrop.value);

    if (checkDragAndDrop.value == false) {
        event.from.classList.add('hidden');
        return;
    }

    const id = dataTransfer.value.id;
    const fromPlace = dataTransfer.value.fromPlace;

    if (fromPlace == place) {
        if (place == 1) {
            if (
                squareAnswer.value.text &&
                squareAnswer.value.text != event.item.innerHTML
            ) {
                squareFrom.classList.remove('none');
                squareFrom.removeAttribute('ghost-class');
                squareFrom.dataset['isactive'] = 'true';
                squareFrom.children[0].classList.remove('standrart_cursor');
                squareFrom.children[0].classList.remove('not_correct_select');
            }

            squareDOM = event.item;
            squareFrom = event.from;
            squareFrom.classList.add('none');
            squareFrom.setAttribute('ghost-class', 'none');
            squareFrom.setAttribute('drag-class', 'none');

            squareFrom.dataset['isactive'] = 'false';
            squareFrom.children[0].classList.add('standrart_cursor');

            squareAnswer.value.text = syllables.value[fromPlace][id - 1].text;
            squareAnswer.value.firstIndex = fromPlace;
            squareAnswer.value.secondIndex = id - 1;
        } else {
            if (
                circleAnswer.value.text &&
                circleAnswer.value.text != event.item.innerHTML
            ) {
                console.log(
                    circleAnswer.value.text,
                    event.item.innerHTML,
                    circleAnswer.value.text == event.item.innerHTML,
                );
                circleFrom.classList.remove('hidden');
                circleFrom.removeAttribute('ghost-class');
                circleFrom.dataset['isactive'] = 'true';
                circleFrom.children[0].classList.remove('standrart_cursor');
                circleFrom.children[0].classList.remove('not_correct_select');
            }

            circleDOM = event.item;
            circleFrom = event.from;
            circleFrom.classList.add('hidden');
            circleFrom.setAttribute('ghost-class', 'none');
            //circleFrom.setAttribute('drag-class', 'none')
            circleFrom.dataset['isactive'] = 'false';
            circleFrom.children[0].classList.add('standrart_cursor');

            if (id < 5) {
                syllables.value[fromPlace][1][id - 1].drag_class = true;
                circleAnswer.value.text =
                    syllables.value[fromPlace][1][id - 1].text;
                circleAnswer.value.firstIndex = fromPlace;
                circleAnswer.value.secondIndex = 1;
                circleAnswer.value.thirdIndex = id - 1;
            } else {
                syllables.value[fromPlace][2][id - 5].drag_class = true;
                circleAnswer.value.text =
                    syllables.value[fromPlace][2][id - 5].text;
                circleAnswer.value.firstIndex = fromPlace;
                circleAnswer.value.secondIndex = 2;
                circleAnswer.value.thirdIndex = id - 5;
            }
        }
    }
    if (squareAnswer.value.text && circleAnswer.value.text) {
        //squareFrom.appendChild(squareDOM)
        console.log(squareDOM, circleDOM);

        let strAnswer = squareAnswer.value.text + circleAnswer.value.text;
        strAnswer = strAnswer.toLowerCase();
        strAnswer = strAnswer[0].toUpperCase() + strAnswer.slice(1);
        let find = false;
        for (const obj of answers.value) {
            if (obj.text == strAnswer) {
                find = true;
                correctAnswers.value[countAnswers.value] = obj;
                countAnswers.value++;
                playAudio(obj.audio);
                setTimeout(
                    () =>
                        playAudio(
                            `Common/1.${Math.floor(Math.random() * 3) + 1}.mp3`,
                        ),
                    1000,
                );
                break;
            }
        }
        draggable.value = false;

        squareFrom.children[0].classList.remove('standrart_cursor');
        circleFrom.children[0].classList.remove('standrart_cursor');

        squareFrom.classList.remove('none');
        circleFrom.classList.remove('hidden');

        if (!find) {
            squareFrom.dataset['isactive'] = 'true';
            circleFrom.dataset['isactive'] = 'true';

            squareFrom.children[0].classList.add('not_correct_select');
            circleFrom.children[0].classList.add('not_correct_select');

            syllables.value[squareAnswer.value.firstIndex][
                squareAnswer.value.secondIndex
            ].correct = false;
            syllables.value[circleAnswer.value.firstIndex][
                circleAnswer.value.secondIndex
            ][circleAnswer.value.thirdIndex].correct = false;
            playAudio(`Common/2.${Math.floor(Math.random() * 3) + 1}.mp3`);
            setTimeout(() => {
                syllables.value[squareAnswer.value.firstIndex][
                    squareAnswer.value.secondIndex
                ].correct = null;
                syllables.value[circleAnswer.value.firstIndex][
                    circleAnswer.value.secondIndex
                ][circleAnswer.value.thirdIndex].correct = null;
                squareAnswer.value = {};
                circleAnswer.value = {};
                draggable.value = true;

                squareFrom.children[0].classList.remove('not_correct_select');
                circleFrom.children[0].classList.remove('not_correct_select');
            }, 1000);
        } else {
            squareFrom.children[0].classList.add('correct_select');
            circleFrom.children[0].classList.add('correct_select');

            squareFrom.dataset['isactive'] = 'false';
            circleFrom.dataset['isactive'] = 'false';

            syllables.value[squareAnswer.value.firstIndex][
                squareAnswer.value.secondIndex
            ].correct = true;
            syllables.value[circleAnswer.value.firstIndex][
                circleAnswer.value.secondIndex
            ][circleAnswer.value.thirdIndex].correct = true;
            setTimeout(() => {
                syllables.value[squareAnswer.value.firstIndex][
                    squareAnswer.value.secondIndex
                ].hidden = true;
                syllables.value[circleAnswer.value.firstIndex][
                    circleAnswer.value.secondIndex
                ][circleAnswer.value.thirdIndex].hidden = true;
                syllables.value[squareAnswer.value.firstIndex][
                    squareAnswer.value.secondIndex
                ].correct = null;
                syllables.value[circleAnswer.value.firstIndex][
                    circleAnswer.value.secondIndex
                ][circleAnswer.value.thirdIndex].correct = null;
                squareAnswer.value = {};
                circleAnswer.value = {};
                draggable.value = true;

                squareFrom.children[0].classList.remove('correct_select');
                circleFrom.children[0].classList.remove('correct_select');

                squareFrom.removeChild(squareFrom.children[0]);
                circleFrom.removeChild(circleFrom.children[0]);

                squareFrom.classList.add('hidden');
                circleFrom.classList.add('hidden');
            }, 2000);
        }
        if (countAnswers.value == 8) {
            setTimeout(() => {
                if (is_correct.value === false) {
                    endGameRequest(props.childId, corrValue.value);
                    emit('correct');
                    emit('open');
                }
                startGame.value = false;
                playAudio('Task8/297.8_.mp3');
            }, 2000);
        }
    }
};

const checkPosition = (event) => {
    if (
        event.from == event.to &&
        event.from.classList.contains('hidden') &&
        event.from.dataset['isactive'] === 'true'
    )
        event.from.classList.remove('hidden');
};

const allowDrop = (event) => {
    event.preventDefault();
};

const hide = () => {
    emit('close');
};
const next = () => {
    emit('next-modal');
};

onMounted(async () => {
    try {
        const correct = await getCorrectAnswer(8, props.childId);
        if (correct) {
            corrValue.value = correct.correctId;
            is_correct.value = correct.is_correct;
        } else {
            console.error('getCorrectAnswer returned undefined');
        }
    } catch (err) {
        console.error('Error fetching correct answer:', err);
    }
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.style.setProperty(
        '--scroll-position',
        `${scrollY}px`,
    );
    document.getElementsByTagName('html')[0].classList.add('no-scroll');
    document.body.classList.add('no-scroll'); /* Прокрутка ставится на паузу */

    console.log('game mount');
});

onBeforeUnmount(() => {
    document.getElementsByTagName('html')[0].classList.remove('no-scroll');
    document.body.classList.remove('no-scroll'); /* Прокрутка возвращается */

    audio.src = "";
    console.log('game unmount');
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

.answer {
    text-align: center;
    width: 70px;
    height: 70px;
}

.correct_select {
    border: 2px solid;
    border-color: #5ccf54;
}

.not_correct_select {
    border: 2px solid;
    border-color: #db0000;
}

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
    height: 468px;

    @media (max-width: 1024px) {
        width: 854px;
        height: 325px;
    }
}

.draggable-list__column {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.draggable-list__words-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 134px;
    height: 40px;
    border-radius: 6px;

    @media (max-width: 1024px) {
        width: 120px;
        height: 28px;
    }
}

.draggable-list__words {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 276px;
    height: 184px;
    gap: 8px;

    @media (max-width: 1024px) {
        gap: 6px;
        width: 246px;
        height: 130px;
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
    cursor: pointer;

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

.draggable-list__step-button__wrapper {
    width: 70px;
    height: 70px;

    @media (max-width: 1024px) {
        width: 63px;
        height: 63px;
        font-size: 16px;
    }
}

.draggable-list__substep {
    background-color: #e5935a;
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

#step3 {
    width: 80px;
    height: 60px;

    @media (max-width: 1024px) {
        width: 68px;
        height: 40px;
    }
}

#step4 {
    width: 80px;
    height: 90px;

    @media (max-width: 1024px) {
        width: 68px;
        height: 60px;
    }
}

#step5 {
    width: 80px;
    height: 120px;

    @media (max-width: 1024px) {
        width: 68px;
        height: 80px;
    }
}

#step6 {
    width: 80px;
    height: 150px;

    @media (max-width: 1024px) {
        width: 68px;
        height: 100px;
    }
}

#step7 {
    width: 80px;
    height: 180px;

    @media (max-width: 1024px) {
        width: 68px;
        height: 120px;
    }
}

#step8 {
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

    @media (max-width: 1024px) {
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
    cursor: pointer;

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

.draggable-list__syllable__wrapper {
    width: 70px;
    height: 70px;

    @media (max-width: 1024px) {
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
    display: flex;
    align-items: center;
    justify-content: center;
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

.hidden {
    opacity: 0%;
}

.none {
    display: none;
}

.standrart_cursor {
    cursor: default !important;
}

.block {
    display: block !important;
    opacity: 100% !important;
}
</style>

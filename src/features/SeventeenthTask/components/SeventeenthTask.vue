<template>
    <div class="SeventeenthTask task_block">
        <div class="task_block__wrapper">
            <template v-if="startGame">
                <div class="task_block__close" @click="hide()">
                    <svgIcon
                        icon-name="close-icon"
                        class="close-icon"
                        alt="крест"
                    ></svgIcon>
                </div>
                <div class="game_icons_item" @click="mute()">
                    <img
                        v-show="isMuted === false"
                        src="@app/assets/icons/sound.svg"
                        alt="sound"
                    /><img
                        v-show="isMuted === true"
                        src="@app/assets/icons/muted.svg"
                        alt=""
                    />
                </div>
                <div class="task_block__time" @click="console.log(refPoints)">
                    <Timer :end="end"></Timer>
                    <p
                        class="title-h4 task_block__title SeventeenthTask__title"
                    >
                        Собери слова из двух частей. <br />
                        Соедини полученные слова с картинками.
                    </p>
                </div>
                <canvas
                    class="canvas_draw"
                    ref="canvasRef"
                    @mousedown="engage"
                    @mouseup="disengage"
                    @mousemove="draw"
                    @touchstart="engage"
                    @touchend="disengage"
                    @touchmove="draw"
                    @click="voiceActing"
                    v-show="endFirstTask && true"
                ></canvas>
                <div
                    class="draggable-list"
                    ref="taskBlock"
                    @dragover.prevent
                    @drop="missDrop($event)"
                >
                    <transition
                        name="fade-words-top"
                        @after-enter="getCenterCords()"
                    >
                        <div
                            class="draggable-list__words-top"
                            v-if="endFirstTask"
                        >
                            <div
                                class="draggable-list__word-top"
                                v-for="word in secondTask[0]"
                                :key="word.id"
                            >
                                <div class="draggable-list__word">
                                    {{ word.text }}
                                </div>
                                <div
                                    :ref="
                                        (el) => {
                                            refPoints[1][word.id - 1] = el;
                                        }
                                    "
                                    style="display: flex"
                                >
                                    <SvgIcon
                                        icon-name="green-circle"
                                        class="draggable-list__word-top-circle"
                                    >
                                    </SvgIcon>
                                </div>
                            </div>
                        </div>
                    </transition>

                    <div class="draggable-list__syllables" v-if="!endFirstTask">
                        <div
                            class="draggable-list__set-syllables"
                            v-for="row in firstTask[0]"
                            :key="row"
                            draggable="false"
                        >
                            <VueDraggableNext
                                :group="`${
                                    word.id == dragIdPuzzle
                                        ? {
                                              name: 'word',
                                              pull: 'clone',
                                              put: false,
                                          }
                                        : {
                                              name: 'word',
                                              pull: 'clone',
                                              put: true,
                                          }
                                }`"
                                :sort="false"
                                @add="drop($event, word)"
                                :class="[word.class]"
                                :ghost-class="
                                    word.id == dragIdPuzzle ? 'hidden' : 'none'
                                "
                                :drag-class="'block'"
                                @choose="
                                    ($event) => {
                                        drag($event, word);
                                        if (word.isActive) {
                                            playAudio(word.text);
                                        }
                                    }
                                "
                                :data-is-active="word.isActive"
                                v-for="word in row"
                                :key="word.id"
                            >
                                <div
                                    :ref="
                                        (el) => {
                                            refPuzzles[word.id - 1] = el;
                                        }
                                    "
                                    draggable="false"
                                >
                                    <!--<img v-if="word.error == 0 " src="/public/SeventeenthTask/figure-in-ba.png" :alt="word.class"  draggable="false"
                                    :style="{ opacity: word.isActive ? '100%' : '0%', cursor: word.isActive ? 'pointer' : 'auto'}" /> -->

                                    <img
                                        v-if="word.error == 0"
                                        :src="wordsSrc[word.id - 1].src"
                                        :alt="word.class"
                                        draggable="false"
                                        :style="{
                                            opacity: word.isActive
                                                ? '100%'
                                                : '0%',
                                            cursor: word.isActive
                                                ? 'pointer'
                                                : 'auto',
                                        }"
                                        data-type="none"
                                    />

                                    <img
                                        v-else-if="word.error == 1"
                                        :src="wordsSrc[word.id - 1].srcRight"
                                        :alt="word.class"
                                        draggable="false"
                                        :style="{
                                            opacity: word.isActive
                                                ? '100%'
                                                : '0%',
                                            cursor: word.isActive
                                                ? 'pointer'
                                                : 'auto',
                                        }"
                                        data-type="true"
                                    />

                                    <img
                                        v-else
                                        :src="wordsSrc[word.id - 1].srcError"
                                        :alt="word.class"
                                        draggable="false"
                                        :style="{
                                            opacity: word.isActive
                                                ? '100%'
                                                : '0%',
                                            cursor: word.isActive
                                                ? 'pointer'
                                                : 'auto',
                                        }"
                                        data-type="error"
                                    />
                                </div>
                            </VueDraggableNext>
                        </div>
                    </div>

                    <transition name="fade-words">
                        <div class="draggable-list__words" v-if="!endFirstTask">
                            <transition-group name="fade-word">
                                <div
                                    class="draggable-list__word"
                                    v-for="word in firstTask[1]"
                                    :key="word.id"
                                >
                                    {{ word.text }}
                                </div>
                            </transition-group>
                        </div>
                    </transition>

                    <transition name="fade-pictures">
                        <div
                            class="draggable-list__pictures"
                            v-if="endFirstTask"
                        >
                            <div
                                class="draggable-list__picture"
                                v-for="picture in secondTask[1]"
                                :key="picture.id"
                            >
                                <div
                                    :ref="
                                        (el) => {
                                            refPoints[2][picture.id - 1] = el;
                                        }
                                    "
                                    style="display: flex"
                                >
                                    <SvgIcon
                                        icon-name="green-circle"
                                        class="draggable-list__word-top-circle"
                                    >
                                    </SvgIcon>
                                </div>
                                <img
                                    :src="getSrcUrl(picture.alt + '.png')"
                                    :alt="picture.alt"
                                    class="draggable-list__lesyaandmoa"
                                    v-if="!endSecondTask"
                                />
                                <img
                                    :src="getSrcUrl(picture.endalt + '.png')"
                                    :alt="picture.endalt"
                                    class="draggable-list__lesyaandmoa"
                                    v-else
                                />
                            </div>
                        </div>
                    </transition>
                </div>
            </template>
            <TaskResultBanner
                :img="getImageUrl('Cup.png')"
                :bg="getImageUrl('lesya.gif')"
                text="Потрясающе!"
                v-if="!startGame"
                @next="next()"
                @hide="hide()"
                class="end-modal"
            ></TaskResultBanner>
        </div>
    </div>
</template>

<script setup>
import {
    ref,
    onMounted,
    computed,
    watch,
    onBeforeMount,
    onBeforeUnmount,
    onUpdated,
} from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
import { SvgIcon } from '@shared/components/svgIcon';

import { dataFirstTask, dataSecondTask } from './task.js';
import audioMap from './audioMap';
import gameActions from '@mixins/gameAction';

import { wordsSrc as words } from '@app/assets/creatures/SeventeenthTask/images.js';

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
    },
});
const hide = () => {
    emit('close');
};

const next = () => {
    emit('next-modal');
};

const getSrcUrl = (path) => {
    //console.log(new URL(`./${path}`, import.meta.url).href);
    //console.log(`@/assets/creatures/SeventeenthTask/${path}.png`, new URL(`@/assets/creatures/SeventeenthTask/${path}`, import.meta.url))
    return new URL(`/assets/creatures/SeventeenthTask/${path}`, import.meta.url)
        .href;
    //return new URL(`/assets/creatures/SeventeenthTask/${path}`, import.meta.url).href;
};

const isMuted = ref(false);
const mute = () => {
    isMuted.value = !isMuted.value;
    if (isMuted.value === true) {
        audio.value.volume = 0;
    } else {
        audio.value.volume = 1;
    }
};

//
// ПЕРВЫЙ ЭТАП ЗАДАНИЯ
//

const dragIdPuzzle = ref();

const audio = ref(new Audio());
const is_correct = ref(false);
const is_started = ref(null);
const corrValue = ref(0);
const playAudio = (audioPath, isInMap = true, isFromTaskSix = false) => {
    if (isFromTaskSix && !isMuted.value) {
        audio.value.src = new URL(
            `/assets/audio/Task6/${
                isInMap ? audioMap.get(audioPath) : audioPath
            }`,
            import.meta.url,
        ).href;
        audio.value.play();
        return;
    }

    console.log(audioPath)

    if (!isMuted.value || audioPath === "469.17_.mp3") {
        audio.value.src = new URL(
            `/assets/audio/Task17/${isInMap ? audioMap.get(audioPath) : audioPath}`,
            import.meta.url,
        ).href;
        audio.value.volume = 1;
        audio.value.play();
    }
};

const startGame = ref(true);
const getImageUrl = (path) => {
    return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};

const firstTask = ref();
const secondTask = ref();
const firstTaskAnswerCounter = ref(0);

const endFirstTask = ref(false);
const isDrag = ref(false);
const PuzzleCords = ref({
    x: 0,
    y: 0,
});
const draggableBlock = ref({
    src: '',
    class: '',
});
const refPuzzles = ref([]);
const centralPuzzleCords = ref([]);
const startId = ref(0);

firstTask.value = structuredClone(dataFirstTask);
firstTask.value[1] = [];
secondTask.value = structuredClone(dataSecondTask);

const wordsSrc = [
    {
        id: 1,
        src: getSrcUrl('figure-in-ro.png'),
        srcError: getSrcUrl('figure-in-ro-wrong.png'),
        srcRight: getSrcUrl('figure-in-ro-right.png'),
    },
    {
        id: 2,
        src: getSrcUrl('figure-out-laka.png'),
        srcError: getSrcUrl('figure-out-laka-wrong.png'),
        srcRight: getSrcUrl('figure-out-laka-right.png'),
    },
    {
        id: 3,
        src: getSrcUrl('figure-out-koro.png'),
        srcError: getSrcUrl('figure-out-koro-wrong.png'),
        srcRight: getSrcUrl('figure-out-koro-right.png'),
    },
    {
        id: 4,
        src: getSrcUrl('figure-in-vo.png'),
        srcError: getSrcUrl('figure-in-vo-wrong.png'),
        srcRight: getSrcUrl('figure-in-vo-right.png'),
    },
    {
        id: 5,
        src: getSrcUrl('figure-in-ka.png'),
        srcError: getSrcUrl('figure-in-ka-wrong.png'),
        srcRight: getSrcUrl('figure-in-ka-right.png'),
    },
    {
        id: 6,
        src: getSrcUrl('figure-in-va.png'),
        srcError: getSrcUrl('figure-in-va-wrong.png'),
        srcRight: getSrcUrl('figure-in-va-right.png'),
    },
    {
        id: 7,
        src: getSrcUrl('figure-out-so.png'),
        srcError: getSrcUrl('figure-out-so-wrong.png'),
        srcRight: getSrcUrl('figure-out-so-right.png'),
    },
    {
        id: 8,
        src: getSrcUrl('figure-out-re.png'),
        srcError: getSrcUrl('figure-out-re-wrong.png'),
        srcRight: getSrcUrl('figure-out-re-right.png'),
    },
    {
        id: 9,
        src: getSrcUrl('figure-in-ob.png'),
        srcError: getSrcUrl('figure-in-ob-wrong.png'),
        srcRight: getSrcUrl('figure-in-ob-right.png'),
    },
    {
        id: 10,
        src: getSrcUrl('figure-in-ba.png'),
        srcError: getSrcUrl('figure-in-ba-wrong.png'),
        srcRight: getSrcUrl('figure-in-ba-right.png'),
    },
    {
        id: 11,
        src: getSrcUrl('figure-out-dere.png'),
        srcError: getSrcUrl('figure-out-dere-wrong.png'),
        srcRight: getSrcUrl('figure-out-dere-right.png'),
    },
    {
        id: 12,
        src: getSrcUrl('figure-out-ta.png'),
        srcError: getSrcUrl('figure-out-ta-wrong.png'),
        srcRight: getSrcUrl('figure-out-ta-right.png'),
    },
    {
        id: 13,
        src: getSrcUrl('figure-in-mu.png'),
        srcError: getSrcUrl('figure-in-mu-wrong.png'),
        srcRight: getSrcUrl('figure-in-mu-right.png'),
    },
    {
        id: 14,
        src: getSrcUrl('figure-out-mashka.png'),
        srcError: getSrcUrl('figure-out-mashka-wrong.png'),
        srcRight: getSrcUrl('figure-out-mashka-right.png'),
    },
];

const dataTransfer = ref({});
const drag = (event, word) => {
    event.from.dataset['isActive'] = 'false';
    dragIdPuzzle.value = word.id;
    dataTransfer.value = word;
    console.log('drag', event);
};

const drop = (event, word) => {
    console.log('drop', event);
    let dragElem = event.item;
    event.to.removeChild(event.item);

    if (event.to.dataset['isActive'] == 'false') {
        console.log('event');
        console.log(event.to);
        console.log(event.to.dataset);
        event.from.dataset['isActive'] = 'true';
        event.from.appendChild(dragElem);
        return;
    }

    let dragId = dataTransfer.value.id;

    if (dataTransfer.value.answer == word.id) {
        event.to.removeChild(event.to.children[0]);
        event.to.dataset['isActive'] = 'false';

        event.to.classList.add('standart_cursor');
        event.from.classList.add('standart_cursor');

        playAudio(`right.${Math.ceil(Math.random() * 3)}.mp3`, false, true);
        let answer = {};
        if (dataTransfer.value.id == 1 || dataTransfer.value.id == 14) {
            answer.id = 1;
            answer.text = 'РОМАШКА';
        } else if (dataTransfer.value.id == 2 || dataTransfer.value.id == 9) {
            answer.id = 5;
            answer.text = 'ОБЛАКА';
        } else if (dataTransfer.value.id == 3 || dataTransfer.value.id == 6) {
            answer.id = 3;
            answer.text = 'КОРОВА';
        } else if (dataTransfer.value.id == 4 || dataTransfer.value.id == 11) {
            answer.id = 2;
            answer.text = 'ДЕРЕВО';
        } else if (dataTransfer.value.id == 5 || dataTransfer.value.id == 8) {
            answer.id = 4;
            answer.text = 'РЕКА';
        }

        firstTask.value[1].push(answer);
        firstTask.value[1].sort((a, b) => a.id - b.id);

        setTimeout(() => {
            firstTaskAnswerCounter.value += 1;

            playAudio('слово-' + answer.id);

            setTimeout(() => {
                if (firstTaskAnswerCounter.value == 5) {
                    endFirstTask.value = true;
                }
            }, 2000);
        }, 1000);
    } else {
        event.from.appendChild(dragElem);
        playAudio(`wrong.${Math.ceil(Math.random() * 3)}.mp3`, false, true);
        console.log('false');

        event.from.children[0].children[0].src = wordsSrc[dragId - 1].srcError;
        event.to.children[0].children[0].src = wordsSrc[word.id - 1].srcError;

        event.to.dataset['isActive'] = 'true';
        event.from.dataset['isActive'] = 'true';

        setTimeout(() => {
            try {
                event.from.children[0].children[0].src =
                    wordsSrc[dragId - 1].src;
            } catch {}

            try {
                event.to.children[0].children[0].src =
                    wordsSrc[word.id - 1].src;
            } catch {}
        }, 2000);
    }
};

//
// ВТОРОЙ ЭТАП ЗАДАНИЯ
//

const endSecondTask = ref(false);

const canvasRef = ref(null);
const taskBlock = ref(null);
const refPoints = ref({
    1: [],
    2: [],
});

const centralCords = ref({
    1: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
    ],
    2: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
    ],
});
const isDrawing = ref(false);
const startCords = ref({ x: 0, y: 0 });
const lines = ref([]);
const SecondTaskAnswerCounter = ref(0);

let canvas;
let ctx;
let leftBorder;
let rightBorder;

let startIds = {};
let endIds = {};



onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {
        winWidth.value = window.innerWidth;
    });
});

const resizeCanvas = async () => {
    console.log('resize');

    if (window.innerWidth > 1024) {
        canvas.width = 1080;
        canvas.height = 442;
    } else {
        canvas.width = 904;
        canvas.height = 332;
    }

    leftBorder = 0;
    rightBorder = canvas.width;
    redraw();
};

const getCursorPosition = (event) => {
    const rect = canvas.getBoundingClientRect();
    if (event.type == 'touchstart' || event.type == 'touchmove') {
        console.log(event);
        return {
            x: event.touches[0].clientX - rect.left,
            y: event.touches[0].clientY - rect.top,
        };
    } else if (event.type == 'touchend') {
        return {
            x: event.changedTouches[0].clientX - rect.left,
            y: event.changedTouches[0].clientY - rect.top,
        };
    }
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };
};

const getCenterCords = () => {
    for (const rowId in refPoints.value) {
        for (const pointId in refPoints.value[rowId]) {
            const point = refPoints.value[rowId][pointId];
            if (point) {
                console.log(point);
                const rect = point.getBoundingClientRect();
                const canvasRect = canvas.getBoundingClientRect();

                console.log(rect.width);

                const x = rect.left + rect.width / 2 - canvasRect.left;
                centralCords.value[rowId][pointId].x = x;
                centralCords.value[rowId][pointId].maxX = x + rect.width;
                centralCords.value[rowId][pointId].minX = x - rect.width;

                const y = rect.top + rect.height / 2 - canvasRect.top;
                centralCords.value[rowId][pointId].y = y;
                centralCords.value[rowId][pointId].maxY = y + rect.width;
                centralCords.value[rowId][pointId].minY = y - rect.width;

                if (!centralCords.value[rowId][pointId]?.done)
                    centralCords.value[rowId][pointId].done = false;
            }
        }
    }
};

const checkRowsAndColumnsIds = (pos) => {
    const inFirstLineX =
        pos.x > centralCords.value[1][0].minX &&
        pos.x < centralCords.value[1][0].maxX;
    const inSecondLineX =
        pos.x > centralCords.value[1][1].minX &&
        pos.x < centralCords.value[1][1].maxX;
    const inThirdLineX =
        pos.x > centralCords.value[1][2].minX &&
        pos.x < centralCords.value[1][2].maxX;
    const inFourthLineX =
        pos.x > centralCords.value[1][3].minX &&
        pos.x < centralCords.value[1][3].maxX;
    const inFifthLineX =
        pos.x > centralCords.value[1][4].minX &&
        pos.x < centralCords.value[1][4].maxX;

    const inFirstLineY =
        pos.y > centralCords.value[1][0].minY &&
        pos.y < centralCords.value[1][0].maxY;
    const inSecondLineY =
        pos.y > centralCords.value[2][0].minY &&
        pos.y < centralCords.value[2][0].maxY;

    const columnId = inFirstLineX
        ? 1
        : inSecondLineX
        ? 2
        : inThirdLineX
        ? 3
        : inFourthLineX
        ? 4
        : inFifthLineX
        ? 5
        : false;
    const rowId = inFirstLineY ? 1 : inSecondLineY ? 2 : false;

    return { row: rowId, column: columnId };
};

const isDone = (row, column) => {
    return row && column ? centralCords.value[row][column - 1].done : false;
};

const engage = (event) => {
    const pos = getCursorPosition(event);
    startIds = checkRowsAndColumnsIds(pos);
    const done = isDone(startIds.row, startIds.column);
    if (startIds.column && startIds.row && !done) {
        isDrawing.value = true;
        startCords.value.x =
            centralCords.value[startIds.row][startIds.column - 1].x;
        startCords.value.y =
            centralCords.value[startIds.row][startIds.column - 1].y;
    }
};

const draw = (event) => {
    if (isDrawing.value) {
        const pos = getCursorPosition(event);
        if (pos.x > leftBorder && pos.x < rightBorder) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            redraw();
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(startCords.value.x, startCords.value.y);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            ctx.closePath();
            ctx.fillStyle = 'green';
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        } else {
            isDrawing.value = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            redraw();
        }
    }
};

const redraw = () => {
    lines.value.forEach((line) => {
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(line.startX, line.startY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(line.endX, line.endY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    });
};

const correctAnswer = (startColumn, startRow, endColumn, endRow) => {
    if (startRow == 1) {
        if (endRow == 2) {
            if (startColumn == 1) {
                if (endColumn == 2) {
                    return true;
                }
            }
            if (startColumn == 2) {
                if (endColumn == 1) {
                    return true;
                }
            }
            if (startColumn == 3) {
                if (endColumn == 4) {
                    return true;
                }
            }
            if (startColumn == 4) {
                if (endColumn == 5) {
                    return true;
                }
            }
            if (startColumn == 5) {
                if (endColumn == 3) {
                    return true;
                }
            }
        }
    }

    if (startRow == 2) {
        if (endRow == 1) {
            if (startColumn == 1) {
                if (endColumn == 2) {
                    return true;
                }
            }
            if (startColumn == 2) {
                if (endColumn == 1) {
                    return true;
                }
            }
            if (startColumn == 3) {
                if (endColumn == 5) {
                    return true;
                }
            }
            if (startColumn == 4) {
                if (endColumn == 3) {
                    return true;
                }
            }
            if (startColumn == 5) {
                if (endColumn == 4) {
                    return true;
                }
            }
        }
    }

    return false;
};

const disengage = (event) => {
    if (isDrawing.value) {
        const pos = getCursorPosition(event);
        endIds = checkRowsAndColumnsIds(pos);
        if (endIds.column && endIds.row && endIds.column !== startIds.column) {
            const correct = correctAnswer(
                startIds.column,
                startIds.row,
                endIds.column,
                endIds.row,
            );
            if (correct) {
                SecondTaskAnswerCounter.value++;
                centralCords.value[startIds.row][
                    startIds.column - 1
                ].done = true;
                centralCords.value[endIds.row][endIds.column - 1].done = true;
                playAudio(
                    `right.${Math.ceil(Math.random() * 3)}.mp3`,
                    false,
                    true,
                );

                lines.value.push({
                    startX: startCords.value.x,
                    startY: startCords.value.y,
                    endX: centralCords.value[endIds.row][endIds.column - 1].x,
                    endY: centralCords.value[endIds.row][endIds.column - 1].y,
                });

                if (SecondTaskAnswerCounter.value == 5) {
                    setTimeout(() => {
                        endSecondTask.value = true;
                        finalDraw();
                    }, 2000);
                }
            } else {
                playAudio(
                    `wrong.${Math.ceil(Math.random() * 3)}.mp3`,
                    false,
                    true,
                );
            }
        }
        isDrawing.value = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redraw();
    }
};

const voiceActing = () => {};

let gameIsClose = false;
const finalDraw = () => {
    console.log(centralCords.value);
    endSecondTask.value = true;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let dot in centralCords.value[1]) {
        console.log(dot);

        let start = centralCords.value[1][dot];
        let end = centralCords.value[2][dot];

        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        ctx.beginPath();

        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(start.x, start.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(end.x, end.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    setTimeout(() => {
        if (gameIsClose !== true){
            playAudio('469.17_.mp3', false);
        }
    }, 500);

    setTimeout(() => {
        if (is_correct.value === false) {
            endGameRequest(props.childId, corrValue.value);
            emit('correct');
            emit('open');
        }
        console.log('final');
        startGame.value = false;
    }, 4000);
};

onMounted(async () => {
    canvas = canvasRef.value;
    ctx = canvas.getContext('2d');
    await resizeCanvas();
    console.log('компонент создан');
    try {
        const correct = await getCorrectAnswer(17, props.childId);
        if (correct) {
            corrValue.value = correct.correctId;
            is_correct.value = correct.is_correct;
        } else {
            console.error('getCorrectAnswer returned undefined');
        }
    } catch (err) {
        console.error('Error fetching correct answer:', err);
    }
    window.addEventListener('resize', () => {
        resizeCanvas();
    });
});

onBeforeUnmount(() => {
    console.log('компонент удален');
    window.removeEventListener('resize', () => {
        resizeCanvas();
    });
});
watch(endFirstTask, () => {
    canvas.removeAttribute('style');
});

onMounted(() => {
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
    audio.value.src = '';
    gameIsClose = true;
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

.SeventeenthTask {
    width: 1200px;
}

.SeventeenthTask__title {
    width: 520px;

    @media (max-width: 1024px) {
        width: 440px;
        font-weight: 400;
        font-size: 20px;
    }
}

.draggable-list {
    position: relative;
    margin: 0 auto;
    margin-top: 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 1000px;
    height: 414px;

    @media (max-width: 1024px) {
        width: 860px;
        height: 316px;
        margin-top: 16px;
    }
}

.draggable-list__syllables {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 326px;

    @media (max-width: 1024px) {
        height: 236px;
    }
}

.draggable-list__set-syllables {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 90px;

    column-gap: 113px;

    @media (max-width: 1024px) {
        height: 72px;
    }
}

.draggable-list__set-syllables:nth-child(2) {
    padding: 0 110px;

    @media (max-width: 1024px) {
        padding: 0 70px;
    }
}

.figure-in {
    cursor: pointer;
    min-width: 100px;
    height: 90px;

    @media (max-width: 1024px) {
        min-width: 80px;
        height: 72px;
    }
}

.figure-out {
    cursor: pointer;
    min-width: 124px;
    height: 90px;

    @media (max-width: 1024px) {
        min-width: 100px;
        height: 72px;
    }
}

.draggable-list__words {
    display: flex;
    column-gap: 50px;
    width: 100%;
    height: 48px;

    @media (max-width: 1024px) {
        height: 40px;
        column-gap: 40px;
    }
}

.draggable-list__word {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $puppe;
    color: $violetLetters-game;
    font-family: 'Nunito', sans-serif;
    font-weight: bold;
    font-size: 24px;
    width: 160px;
    height: 48px;
    border-radius: 6px;

    @media (max-width: 1024px) {
        width: 140px;
        height: 40px;
        font-size: 20px;
    }
}

.draggable-list__words-top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 80px;

    @media (max-width: 1024px) {
        height: 62px;
    }
}

.draggable-list__word-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 160px;
    height: 100%;

    @media (max-width: 1024px) {
        width: 140px;
    }
}

.draggable-list__word-top-circle {
    width: 16px;
    height: 16px;

    @media (max-width: 1024px) {
        width: 14px;
        height: 14px;
    }
}

.draggable-list__pictures {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 152px;

    @media (max-width: 1024px) {
        height: 127px;
    }
}

.draggable-list__picture {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 160px;
    height: 100%;

    @media (max-width: 1024px) {
        width: 140px;
    }
}

.draggable-list__lesyaandmoa {
    width: 160px;
    height: 120px;

    @media (max-width: 1024px) {
        width: 140px;
        height: 105px;
    }
}

.canvas_draw {
    position: absolute;
    z-index: 4;
    margin: 0 auto;
    pointer-events: auto;
}

.fade-words-top-enter-active {
    position: relative;

    animation: fade-words-top 0.5s;
}

@keyframes fade-words-top {
    0% {
        opacity: 0;
    }

    99% {
        opacity: 0;
    }

    100% {
        opacity: 100;
    }
}

.fade-words-leave-active {
    transition: all 0.5s ease-out;
    position: absolute;
}

.fade-words-leave-from {
    transform: translateY(366px);
    position: absolute;
}

.fade-words-leave-to {
    top: 0;
    position: absolute;
}

.fade-pictures-enter-active {
    transition: all 1s;
}

.fade-pictures-enter-from {
    opacity: 0;
}

.fade-pictures-enter-to {
    opacity: 100;
}

.fade-word-enter-active {
    position: relative;

    animation: fade-word 0.5s;
}

@keyframes fade-word {
    0% {
        scale: 0;
    }

    50% {
        scale: 1.1;
    }

    100% {
        scale: 1;
    }
}

.none {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
}

.dot {
    width: 1px;
    height: 1px;
}

.block {
    display: flex !important;
    opacity: 100% !important;
}

.hidden {
    opacity: 0% !important;
}

.standart_cursor {
    cursor: default !important;
}

.game_icons_item{
    top: 16px;
    position: absolute;
    right: 60px;
    z-index: 1000;

    width: 40px;
    height: 40px;
    background-color: #e6f2fa;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

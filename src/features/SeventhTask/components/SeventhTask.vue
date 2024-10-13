<template>
    <div class="SeventhTask task_block">
        <div class="task_block__wrapper">
            <template v-if="startGame">
                <div class="task_block__close" @click="hide">
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
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title SeventhTask__title">
                        Верно соотнеси слово, его толкование и картинку.
                    </p>
                </div>
                <canvas
                    @mousedown="engage"
                    @mouseup="disengage"
                    @mousemove="draw"
                    @touchstart="engage"
                    @touchend="disengage"
                    @touchmove="draw"
                    @click="voiceActing"
                    ref="canvasRef"
                    class="canvas_draw"
                ></canvas>
                <div class="draggable-list">
                    <div class="draggable-list__words">
                        <div
                            class="draggable-list__word-container"
                            v-for="(word, word_index) in words[option]"
                            :key="word_index"
                        >
                            <div
                                :ref="
                                    (el) =>
                                        (refBlockSound[1][word_index - 1] = el)
                                "
                                :class="{
                                    'draggable-list__word': true,
                                    correct_select: word.correct,
                                    not_correct_select: word.correct === false,
                                }"
                            >
                                {{ word.word }}
                            </div>

                            <div
                                :ref="
                                    (el) => {
                                        refColumns[1][word_index - 1] = el;
                                    }
                                "
                                style="display: flex"
                            >
                                <SvgIcon
                                    icon-name="green-circle"
                                    class="draggable-list__circle"
                                >
                                </SvgIcon>
                            </div>
                        </div>
                    </div>
                    <div
                        class="draggable-list__sentences"
                        v-if="!showCorrectRow"
                    >
                        <div
                            class="draggable-list__sentence-container"
                            v-for="(sentence, sentence_index) in sentences[
                                option
                            ]"
                            :key="sentence_index"
                        >
                            <div
                                :ref="
                                    (el) => {
                                        refColumns[2][sentence_index - 1] = el;
                                    }
                                "
                                style="display: flex"
                            >
                                <SvgIcon
                                    icon-name="green-circle"
                                    class="draggable-list__circle"
                                >
                                </SvgIcon>
                            </div>

                            <div
                                :ref="
                                    (el) =>
                                        (refBlockSound[2][sentence_index - 1] =
                                            el)
                                "
                                :class="{
                                    'draggable-list__sentence': true,
                                    correct_select: sentence.correct,
                                    not_correct_select:
                                        sentence.correct === false,
                                }"
                            >
                                {{ sentence.sentence }}
                            </div>

                            <div
                                :ref="
                                    (el) => {
                                        refColumns[3][sentence_index - 1] = el;
                                    }
                                "
                                style="display: flex"
                            >
                                <SvgIcon
                                    icon-name="green-circle"
                                    class="draggable-list__circle"
                                >
                                </SvgIcon>
                            </div>
                        </div>
                    </div>
                    <div class="draggable-list__sentences" v-else>
                        <div
                            class="draggable-list__sentence-container"
                            v-for="(rowId, rowId_index) in correctRowId[
                                option
                            ][2]"
                            :key="rowId_index"
                        >
                            <div
                                :ref="
                                    (el) => {
                                        refColumns[2][rowId_index - 1] = el;
                                    }
                                "
                                style="display: flex"
                            >
                                <SvgIcon
                                    icon-name="green-circle"
                                    class="draggable-list__circle"
                                >
                                </SvgIcon>
                            </div>

                            <div
                                :ref="
                                    (el) =>
                                        (refBlockSound[2][rowId_index - 1] = el)
                                "
                                class="draggable-list__sentence"
                            >
                                {{ sentences[option][rowId].sentence }}
                            </div>

                            <div
                                :ref="
                                    (el) => {
                                        refColumns[3][rowId_index - 1] = el;
                                    }
                                "
                                style="display: flex"
                            >
                                <SvgIcon
                                    icon-name="green-circle"
                                    class="draggable-list__circle"
                                >
                                </SvgIcon>
                            </div>
                        </div>
                    </div>

                    <div
                        class="draggable-list__pictures"
                        v-if="!showCorrectRow"
                    >
                        <div
                            class="draggable-list__picture-container"
                            v-for="(img, img_index) in images[option]"
                            :key="img_index"
                        >
                            <div
                                :ref="
                                    (el) => {
                                        refColumns[4][img_index - 1] = el;
                                    }
                                "
                                style="display: flex"
                            >
                                <SvgIcon
                                    icon-name="green-circle"
                                    class="draggable-list__circle"
                                >
                                </SvgIcon>
                            </div>
                            <img :src="img.url" class="draggable-list__image" />
                        </div>
                    </div>
                    <div class="draggable-list__pictures" v-else>
                        <div
                            class="draggable-list__picture-container"
                            v-for="(rowId, rowId_index) in correctRowId[
                                option
                            ][3]"
                            :key="rowId_index"
                        >
                            <div
                                :ref="
                                    (el) => {
                                        refColumns[4][rowId_index - 1] = el;
                                    }
                                "
                                style="display: flex"
                            >
                                <SvgIcon
                                    icon-name="green-circle"
                                    class="draggable-list__circle"
                                >
                                </SvgIcon>
                            </div>

                            <img
                                :src="images[option][rowId].url"
                                class="draggable-list__image"
                            />
                        </div>
                    </div>
                </div>
            </template>
            <TaskResultBanner
                :bg="getImageUrl('lesya.gif')"
                text="Друзья поняли, что всего один знак (Ь — мягкий знак или Ъ — твёрдый знак) так различает значение слов!"
                v-else
                @hide="hide()"
                class="end-modal"
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
const isDrawing = ref(false);
const option = ref(2);
const is_correct = ref(false);
const corrValue = ref(0);
const lines = ref([]);
const refBlockSound = ref({
    1: [],
    2: [],
});
const blockSoundCords = ref({
    1: [],
    2: [],
});
const showCorrectRow = ref(false);
const correctRowId = ref({
    1: {
        1: [1, 2, 3, 4],
        2: [4, 3, 2, 1],
        3: [3, 4, 1, 2],
    },
    2: {
        1: [1, 2, 3, 4],
        2: [2, 1, 4, 3],
        3: [4, 3, 1, 2],
    },
});
const refColumns = ref({
    1: [],
    2: [],
    3: [],
    4: [],
});
const centralCords = ref({
    1: [
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
    ],
    3: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
    ],
    4: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
    ],
});
const startCords = ref({
    x: 0,
    y: 0,
});

const audio = ref(new Audio());
const isFirstPassing = ref(true);
const isFirstOptionCompleted = ref(false);
const isSecondOptionCompleted = ref(false);
const countAnswers = ref(0);
let startIds = {};
let endIds = {};
const canvasRef = ref(null);
let canvas;
let ctx;
let leftBorder;
let rightBorder;
const words = ref({
    1: {
        1: {
            word: 'КОНЬ',
            audio: 'Task7/262.7.mp3',
            correct: null,
            correctRight: false,
            correctRightRow: 4,
        },
        2: {
            word: 'ТОПЬ',
            audio: 'Task7/263.7.mp3',
            correct: null,
            correctRight: false,
            correctRightRow: 3,
        },
        3: {
            word: 'ТОП',
            audio: 'Task7/264.7.mp3',
            correct: null,
            correctRight: false,
            correctRightRow: 2,
        },
        4: {
            word: 'КОН',
            audio: 'Task7/265.7.mp3',
            correct: null,
            correctRight: false,
            correctRightRow: 1,
        },
    },
    2: {
        1: {
            word: 'СЕЛ',
            audio: 'Task7/270.7.mp3',
            correct: null,
            correctRight: false,
            correctRightRow: 2,
        },
        2: {
            word: 'СЪЕЛ',
            audio: 'Task7/271.7.mp3',
            correct: null,
            correctRight: false,
            correctRightRow: 1,
        },
        3: {
            word: 'МЕЛ',
            audio: 'Task7/272.7.mp3',
            correct: null,
            correctRight: false,
            correctRightRow: 4,
        },
        4: {
            word: 'МЕЛЬ',
            audio: 'Task7/273.7.mp3',
            correct: null,
            correctRight: false,
            correctRightRow: 3,
        },
    },
});

const sentences = ref({
    1: {
        1: {
            sentence: 'одна партия какой-либо игры',
            audio: 'Task7/266.7.mp3',
            correct: null,
            correctLeft: false,
            correctRight: false,
            correctRightRow: 2,
            correctLeftRow: 4,
        },
        2: {
            sentence: 'легкая женская одежда для верхней половины тела',
            audio: 'Task7/267.7.mp3',
            correct: null,
            correctLeft: false,
            correctRight: false,
            correctRightRow: 1,
            correctLeftRow: 3,
        },
        3: {
            sentence: 'топкое, болотистое место',
            audio: 'Task7/268.7.mp3',
            correct: null,
            correctLeft: false,
            correctRight: false,
            correctRightRow: 4,
            correctLeftRow: 2,
        },
        4: {
            sentence: 'то же, что лошадь, вьючное животное',
            audio: 'Task7/269.7.mp3',
            correct: null,
            correctLeft: false,
            correctRight: false,
            correctRightRow: 3,
            correctLeftRow: 1,
        },
    },
    2: {
        1: {
            sentence: 'принял пищу, покушал',
            audio: 'Task7/275.7.mp3',
            correct: null,
            correctLeft: false,
            correctRight: false,
            correctRightRow: 3,
            correctLeftRow: 2,
        },
        2: {
            sentence: 'принял положение сидя',
            audio: 'Task7/274.7.mp3',
            correct: null,
            correctLeft: false,
            correctRight: false,
            correctRightRow: 4,
            correctLeftRow: 1,
        },
        3: {
            sentence: 'неглубокое место в реке, озере или в море',
            audio: 'Task7/277.7.mp3',
            correct: null,
            correctLeft: false,
            correctRight: false,
            correctRightRow: 2,
            correctLeftRow: 4,
        },
        4: {
            sentence: 'белый известняк для окраски, писания (на доске)',
            audio: 'Task7/276.7.mp3',
            correct: null,
            correctLeft: false,
            correctRight: false,
            correctRightRow: 1,
            correctLeftRow: 3,
        },
    },
});

const images = ref({
    1: {
        1: {
            url: new URL(
                "/assets/creatures/SeventhTask/girl's-top.png",
                import.meta.url,
            ).href,
            correct: null,
            correctLeft: false,
            correctLeftRow: 2,
        },
        2: {
            url: new URL(
                '/assets/creatures/SeventhTask/chess.png',
                import.meta.url,
            ).href,
            correct: null,
            correctLeft: false,
            correctLeftRow: 1,
        },
        3: {
            url: new URL(
                '/assets/creatures/SeventhTask/horse.png',
                import.meta.url,
            ).href,
            correct: null,
            correctLeft: false,
            correctLeftRow: 4,
        },
        4: {
            url: new URL(
                '/assets/creatures/SeventhTask/swamp.png',
                import.meta.url,
            ).href,
            correct: null,
            correctLeft: false,
            correctLeftRow: 3,
        },
    },
    2: {
        1: {
            url: new URL(
                '/assets/creatures/SeventhTask/chalk.png',
                import.meta.url,
            ).href,
            correct: null,
            correctLeft: false,
            correctLeftRow: 4,
        },
        2: {
            url: new URL(
                '/assets/creatures/SeventhTask/shallow.png',
                import.meta.url,
            ).href,
            correct: null,
            correctLeft: false,
            correctLeftRow: 3,
        },
        3: {
            url: new URL(
                '/assets/creatures/SeventhTask/food.png',
                import.meta.url,
            ).href,
            correct: null,
            correctLeft: false,
            correctLeftRow: 1,
        },
        4: {
            url: new URL(
                '/assets/creatures/SeventhTask/sit.png',
                import.meta.url,
            ).href,
            correct: null,
            correctLeft: false,
            correctLeftRow: 2,
        },
    },
});

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

    finish: {
        type: Boolean,
    },
});
const hide = () => {
    emit('close');
};

const next = () => {
    emit('next-modal');
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

const voiceActing = () => {
    let onBlock = false;
    let clickOnColumn = 0;
    let clickOnRow = 0;
    const pos = getCursorPosition(event);
    for (const columnId in blockSoundCords.value) {
        for (const rowId in blockSoundCords.value[columnId]) {
            if (
                pos.x >=
                    blockSoundCords.value[columnId][rowId].leftUpperCornerCords
                        .x &&
                pos.y >=
                    blockSoundCords.value[columnId][rowId].leftUpperCornerCords
                        .y &&
                pos.x <=
                    blockSoundCords.value[columnId][rowId].rightLowerCornerCords
                        .x &&
                pos.y <=
                    blockSoundCords.value[columnId][rowId].rightLowerCornerCords
                        .y
            ) {
                clickOnColumn = columnId;
                clickOnRow = rowId;
                onBlock = true;
                break;
            }
        }
    }

    if (onBlock) {
        if (clickOnColumn == 1) {
            playAudio(words.value[option.value][+clickOnRow + 1].audio);
        } else if (clickOnColumn == 2) {
            playAudio(sentences.value[option.value][+clickOnRow + 1].audio);
        }
    }
};

const getSrcUrl = (path) => {
    return new URL(path, import.meta.url).href;
};

const getImageUrl = (path) => {
    return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};

const playAudio = (audioPath) => {
    if (isMuted.value && audioPath !== "Task7/278.7.mp3") return;

    audio.value.src = new URL(
        `/assets/audio/${audioPath}`,
        import.meta.url,
    ).href;
    audio.value.play();
};
const stopAudio = (audioPath) => {
    if (audio.value.paused) {
        playAudio(audioPath);
    } else {
        audio.value.pause();
    }
};

const getCursorPosition = (event) => {
    const rect = canvas.getBoundingClientRect();
    if (event.type == 'touchstart' || event.type == 'touchmove') {
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

const checkRowsAndColumnsIds = (pos) => {
    const inFirstLineX =
        pos.x > centralCords.value[1][0].minX &&
        pos.x < centralCords.value[1][0].maxX;
    const inSecondLineX =
        pos.x > centralCords.value[2][0].minX &&
        pos.x < centralCords.value[2][0].maxX;
    const inThirdLineX =
        pos.x > centralCords.value[3][0].minX &&
        pos.x < centralCords.value[3][0].maxX;
    const inFourthLineX =
        pos.x > centralCords.value[4][0].minX &&
        pos.x < centralCords.value[4][0].maxX;

    const inFirstLineY =
        pos.y > centralCords.value[1][0].minY &&
        pos.y < centralCords.value[1][0].maxY;
    const inSecondLineY =
        pos.y > centralCords.value[1][1].minY &&
        pos.y < centralCords.value[1][1].maxY;
    const inThirdLineY =
        pos.y > centralCords.value[1][2].minY &&
        pos.y < centralCords.value[1][2].maxY;
    const inFourthLineY =
        pos.y > centralCords.value[1][3].minY &&
        pos.y < centralCords.value[1][3].maxY;

    const columnId = inFirstLineX
        ? 1
        : inSecondLineX
        ? 2
        : inThirdLineX
        ? 3
        : inFourthLineX
        ? 4
        : false;
    const rowId = inFirstLineY
        ? 1
        : inSecondLineY
        ? 2
        : inThirdLineY
        ? 3
        : inFourthLineY
        ? 4
        : false;

    return { column: columnId, row: rowId };
};

const isDone = (column, row) => {
    if (column == 1) {
        return words.value[option.value][row].correctRight;
    } else if (column == 2) {
        return sentences.value[option.value][row].correctLeft;
    } else if (column == 3) {
        return sentences.value[option.value][row].correctRight;
    } else if (column == 4) {
        return images.value[option.value][row].correctLeft;
    }
};

const engage = (event) => {
    const pos = getCursorPosition(event);
    startIds = checkRowsAndColumnsIds(pos);
    const done = isDone(startIds.column, startIds.row);

    if (startIds.column && startIds.row && !done) {
        isDrawing.value = true;
        startCords.value.x =
            centralCords.value[startIds.column][startIds.row - 1].x;
        startCords.value.y =
            centralCords.value[startIds.column][startIds.row - 1].y;
        if (startIds.column == 1 || startIds.column == 2) {
            leftBorder = centralCords.value[1][0].x - 30;
            rightBorder = centralCords.value[2][0].x + 30;
        } else if (startIds.column == 3 || startIds.column == 4) {
            leftBorder = centralCords.value[3][0].x - 30;
            rightBorder = centralCords.value[4][0].x + 30;
        }
    }
};

const correctAnswer = (startColumn, startRow, endColumn, endRow) => {
    if (startColumn == 1) {
        if (words.value[option.value][startRow].correctRightRow == endRow) {
            words.value[option.value][startRow].correctRight = true;
            sentences.value[option.value][endRow].correctLeft = true;
            words.value[option.value][startRow].correct = true;
            sentences.value[option.value][endRow].correct = true;
            setTimeout(() => {
                words.value[option.value][startRow].correct = null;
                sentences.value[option.value][endRow].correct = null;
            }, 1000);
            return true;
        } else {
            words.value[option.value][startRow].correct = false;
            sentences.value[option.value][endRow].correct = false;
            setTimeout(() => {
                words.value[option.value][startRow].correct = null;
                sentences.value[option.value][endRow].correct = null;
            }, 1000);
            return false;
        }
    }
    if (startColumn == 2) {
        if (sentences.value[option.value][startRow].correctLeftRow == endRow) {
            sentences.value[option.value][startRow].correctLeft = true;
            words.value[option.value][endRow].correctRight = true;
            words.value[option.value][endRow].correct = true;
            sentences.value[option.value][startRow].correct = true;
            setTimeout(() => {
                words.value[option.value][endRow].correct = null;
                sentences.value[option.value][startRow].correct = null;
            }, 1000);
        } else {
            words.value[option.value][endRow].correct = false;
            sentences.value[option.value][startRow].correct = false;
            setTimeout(() => {
                words.value[option.value][endRow].correct = null;
                sentences.value[option.value][startRow].correct = null;
            }, 1000);
            return false;
        }
    } else if (startColumn == 3) {
        if (sentences.value[option.value][startRow].correctRightRow == endRow) {
            sentences.value[option.value][startRow].correctRight = true;
            images.value[option.value][endRow].correctLeft = true;
            sentences.value[option.value][startRow].correct = true;
            images.value[option.value][endRow].correct = true;
            setTimeout(() => {
                sentences.value[option.value][startRow].correct = null;
                images.value[option.value][endRow].correct = null;
            }, 1000);
            return true;
        } else {
            sentences.value[option.value][startRow].correct = false;
            images.value[option.value][endRow].correct = false;
            setTimeout(() => {
                sentences.value[option.value][startRow].correct = null;
                images.value[option.value][endRow].correct = null;
            }, 1000);
            return false;
        }
    } else if (startColumn == 4) {
        if (images.value[option.value][startRow].correctLeftRow == endRow) {
            images.value[option.value][startRow].correctLeft = true;
            sentences.value[option.value][endRow].correctRight = true;
            images.value[option.value][startRow].correct = true;
            sentences.value[option.value][endRow].correct = true;
            setTimeout(() => {
                images.value[option.value][startRow].correct = null;
                sentences.value[option.value][endRow].correct = null;
            }, 1000);
            return true;
        } else {
            images.value[option.value][startRow].correct = false;
            sentences.value[option.value][endRow].correct = false;
            setTimeout(() => {
                images.value[option.value][startRow].correct = null;
                sentences.value[option.value][endRow].correct = null;
            }, 1000);
            return false;
        }
    }

    return true;
};

const redrawCorrectRows = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i <= 1; ++i) {
        for (let j = 0; j <= 3; ++j) {
            console.log(centralCords.value);
            console.log(
                centralCords.value[i * 2 + 1][j].x,
                centralCords.value[i * 2 + 1][j].y,
            );
            ctx.fillStyle = 'green';
            ctx.beginPath();
            ctx.arc(
                centralCords.value[i * 2 + 1][j].x,
                centralCords.value[i * 2 + 1][j].y,
                5,
                0,
                Math.PI * 2,
            );
            ctx.fill();
            ctx.stroke();
            ctx.closePath();

            ctx.strokeStyle = 'green';
            ctx.lineWidth = 2;
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(
                centralCords.value[i * 2 + 1][j].x,
                centralCords.value[i * 2 + 1][j].y,
            );
            ctx.lineTo(
                centralCords.value[i * 2 + 2][j].x,
                centralCords.value[i * 2 + 2][j].y,
            );
            ctx.stroke();
            ctx.closePath();

            ctx.fillStyle = 'green';
            ctx.beginPath();
            ctx.arc(
                centralCords.value[i * 2 + 2][j].x,
                centralCords.value[i * 2 + 2][j].y,
                5,
                0,
                Math.PI * 2,
            );
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }
};

const disengage = (event) => {
    if (isDrawing.value) {
        const pos = getCursorPosition(event);
        endIds = checkRowsAndColumnsIds(pos);
        if (endIds.column && endIds.row && endIds.column !== startIds.column) {
            const correctAns = correctAnswer(
                startIds.column,
                startIds.row,
                endIds.column,
                endIds.row,
            );
            if (correctAns) {
                countAnswers.value++;

                playAudio(`Common/1.${Math.floor(Math.random() * 3) + 1}.mp3`);

                lines.value.push({
                    startX: startCords.value.x,
                    startY: startCords.value.y,
                    endX: centralCords.value[endIds.column][endIds.row - 1].x,
                    endY: centralCords.value[endIds.column][endIds.row - 1].y,
                });

                if (countAnswers.value == 8) {
                    if (isFirstPassing.value) {
                        setTimeout(() => {
                            showCorrectRow.value = true;
                            playAudio(`Task7/278.7.mp3`);
                            redrawCorrectRows();
                        }, 1000);
                        setTimeout(() => {
                            if (is_correct.value === false) {
                                endGameRequest(props.childId, corrValue.value);
                                emit('correct');
                                emit('open');
                            }
                            startGame.value = false;
                        }, 11000);
                    } else {
                        if (option.value == 1) {
                            isFirstOptionCompleted.value = true;
                            if (!isSecondOptionCompleted.value) {
                                setTimeout(() => {
                                    ctx.clearRect(
                                        0,
                                        0,
                                        canvas.width,
                                        canvas.height,
                                    );
                                    lines.value = [];
                                    option.value = 2;
                                    countAnswers.value = 0;
                                }, 2000);
                            }
                        } else {
                            isSecondOptionCompleted.value = true;
                            if (!isFirstOptionCompleted.value) {
                                setTimeout(() => {
                                    ctx.clearRect(
                                        0,
                                        0,
                                        canvas.width,
                                        canvas.height,
                                    );
                                    lines.value = [];
                                    option.value = 1;
                                    countAnswers.value = 0;
                                }, 2000);
                            }
                        }
                        console.log(
                            isFirstOptionCompleted.value,
                            isSecondOptionCompleted.value,
                        );
                        if (
                            isFirstOptionCompleted.value &&
                            isSecondOptionCompleted.value
                        ) {
                            setTimeout(() => {
                                showCorrectRow.value = true;
                                playAudio(`Task7/278.7.mp3`);
                                redrawCorrectRows();
                            }, 1000);
                            setTimeout(() => {
                                if (is_correct.value === false) {
                                    endGameRequest(
                                        props.childId,
                                        corrValue.value,
                                    );
                                    emit('correct');
                                    emit('open');
                                }
                                startGame.value = false;
                            }, 11000);
                        }
                    }
                }
            } else {
                playAudio(`Common/2.${Math.floor(Math.random() * 3) + 1}.mp3`);
            }
        }
        isDrawing.value = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redraw();
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

const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setTimeout(() => {
        getCenterCords();
        redraw();
    }, 100);
};

const getCenterCords = () => {
    for (const columnsId in centralCords.value) {
        for (const imgData in centralCords.value[columnsId]) {
            const img = refColumns.value[columnsId][imgData];
            if (img) {
                const rect = img.getBoundingClientRect();
                const canvasRect = canvas.getBoundingClientRect();

                const x = rect.left + rect.width / 2 - canvasRect.left;
                centralCords.value[columnsId][imgData].x = x;
                centralCords.value[columnsId][imgData].maxX = x + 10;
                centralCords.value[columnsId][imgData].minX = x - 10;

                const y = rect.top + rect.height / 2 - canvasRect.top;
                centralCords.value[columnsId][imgData].y = y;
                centralCords.value[columnsId][imgData].maxY = y + 10;
                centralCords.value[columnsId][imgData].minY = y - 10;
            }
        }
    }

    for (const columnsId in blockSoundCords.value) {
        for (let rowsId = 0; rowsId < 4; rowsId++) {
            const block = refBlockSound.value[columnsId][rowsId];
            if (block) {
                const rect = block.getBoundingClientRect();
                const canvasRect = canvas.getBoundingClientRect();

                const x = rect.left + rect.width / 2 - canvasRect.left;
                const y = rect.top + rect.height / 2 - canvasRect.top;
                if (columnsId == 1) {
                    const temp = {};
                    temp.leftUpperCornerCords = { x: x - 40, y: y - 23 };
                    temp.rightLowerCornerCords = { x: x + 40, y: y + 23 };
                    blockSoundCords.value[columnsId].push(temp);
                } else if (columnsId == 2) {
                    const temp = {};
                    temp.leftUpperCornerCords = { x: x - 220, y: y - 23 };
                    temp.rightLowerCornerCords = { x: x + 220, y: y + 23 };
                    blockSoundCords.value[columnsId].push(temp);
                }
            }
        }
    }

    console.log('centralCords', centralCords.value);
};

onMounted(async () => {
    try {
        const correct = await getCorrectAnswer(7, props.childId);
        if (correct) {
            corrValue.value = correct.correctId;
            is_correct.value = correct.is_correct;
        } else {
            console.error('getCorrectAnswer returned undefined');
        }
    } catch (err) {
        console.error('Error fetching correct answer:', err);
    }

    option.value = Math.floor(Math.random() * 2) + 1;

    canvas = canvasRef.value;
    ctx = canvas.getContext('2d');
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
});

onMounted(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.style.setProperty(
        '--scroll-position',
        `${scrollY}px`,
    );
    document.getElementsByTagName('html')[0].classList.add('no-scroll');
    document.body.classList.add('no-scroll'); /* Прокрутка ставится на паузу */

    console.log('Компонент создан');
});

onBeforeUnmount(() => {
    document.getElementsByTagName('html')[0].classList.remove('no-scroll');
    document.body.classList.remove('no-scroll'); /* Прокрутка возвращается */
    audio.value.src = "";
    console.log('Компонент уничтожен');
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

.canvas_draw {
    // border: 1px solid black;
    position: absolute;
    z-index: 4;
    margin: 0 auto;
    pointer-events: auto;
}

.correct_select {
    border: 2px solid;
    border-color: #5ccf54;
}

.not_correct_select {
    border: 2px solid;
    border-color: #db0000;
}

.SeventhTask {
    width: 1200px;
}

.SeventhTask__title {
    width: 597px;

    @media (max-width: 1024px) {
        width: 501px;
        font-weight: 400;
        font-size: 20px;
    }
}

.draggable-list {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 50px;
    width: 987px;
    height: 380px;

    @media (max-width: 1024px) {
        margin-top: 24px;
        width: 834px;
        height: 324px;
    }
}

.draggable-list__words {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 108px;
    height: 346px;

    @media (max-width: 1024px) {
        width: 102px;
        height: 300px;
    }
}

.draggable-list__word-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 46px;

    @media (max-width: 1024px) {
        height: 42px;
    }
}

.draggable-list__word {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: $puppe;
    width: 80px;
    height: 100%;
    color: $violetLetters-game;
    font-family: 'Nunito', sans-serif;
    font-weight: bold;
    font-size: 20px;
}

.draggable-list__circle {
    width: 16px;
    height: 16px;

    @media (max-width: 1024px) {
        width: 14px;
        height: 14px;
    }
}

.draggable-list__sentences {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 496px;
    height: 346px;

    @media (max-width: 1024px) {
        width: 474px;
        height: 302px;
    }
}

.draggable-list__sentence-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 46px;

    @media (max-width: 1024px) {
        height: 42px;
    }
}

.draggable-list__sentence {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 440px;
    height: 100%;
    border-radius: 6px;
    background-color: $puppe;
    color: $violetLetters-game;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 600;

    @media (max-width: 1024px) {
        width: 430px;
    }
}

.draggable-list__pictures {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 144px;
    height: 380px;

    @media (max-width: 1024px) {
        width: 118px;
        height: 324px;
    }
}

.draggable-list__picture-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80px;

    @media (max-width: 1024px) {
        height: 66px;
    }
}

.draggable-list__image {
    width: 116px;
    height: 100%;

    @media (max-width: 1024px) {
        width: 96px;
    }
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


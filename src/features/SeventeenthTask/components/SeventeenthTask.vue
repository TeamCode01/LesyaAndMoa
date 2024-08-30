<template>
    <div class="SeventeenthTask task_block">
        <div class="task_block__wrapper">
            <template v-if="startGame">
                <div class="task_block__close" @click="hide()">
                    <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title SeventeenthTask__title">
                        Собери слова из двух частей. <br />
                        Соедини полученные слова с картинками.
                    </p>
                </div>
                <canvas class="canvas_draw" ref="canvasRef"
                    @mousedown="engage" @mouseup="disengage" @mousemove="draw"
                    @touchstart="engage" @touchend="disengage" @touchmove="draw"
                    @click="voiceActing" v-show="endFirstTask && true"></canvas>
                <div class="draggable-list" ref="taskBlock" @dragover.prevent @drop="missDrop($event)">

                    <transition name="fade-words-top" @after-enter="getCenterCords()">
                        <div class="draggable-list__words-top" v-if="endFirstTask">
                            <div class="draggable-list__word-top" v-for="word in secondTask[0]" :key="word.id">
                                <div class="draggable-list__word">
                                    {{ word.text }}
                                </div>
                                <img height="16px" src="/assets/creatures/SeventeenthTask/green-circle.svg"
                                    alt="green-circle" class="draggable-list__word-top-circle" :ref="(el) => {
                                            refPoints[1][word.id - 1] = el;
                                        }
                                        " />
                            </div>
                        </div>
                    </transition>

                    <div class="draggable-list__syllables" v-if="!endFirstTask">
                        <div class="draggable-list__set-syllables" v-for="row in firstTask[0]" :key="row"
                            draggable="false">

                            <VueDraggableNext :group="`${ (word.id == dragIdPuzzle) ? { name: 'word', pull: 'clone', put: false } : { name: 'word', pull: 'clone', put: true } }`"
                                :sort="false" @add = "drop($event, word)" :class="[word.class]"
                                :ghost-class="word.id == dragIdPuzzle ? 'hidden' : 'none'" :drag-class="'block'"
                                @choose="($event)=>{drag($event, word)}"
                                :data-is-active="word.isActive"
                                v-for="word in row" :key="word.id">

                                <div
                                    @mouseenter="() => {if (word.isActive) { playAudio(`/assets/audio/Task17/${audioMap.get(word.text)}`)}}"
                                    :ref="(el) => { refPuzzles[word.id - 1] = el}"
                                    draggable="false">
                                    <img :src="word.error == 0 ? word.src : word.error == 1 ? word.srcRight : word.srcError" :alt="word.class"  draggable="false"
                                    :style="{ opacity: word.isActive ? '100%' : '0%', cursor: word.isActive ? 'pointer' : 'auto'}" />
                                </div>


                            </VueDraggableNext>

                        </div>
                    </div>

                    <transition name="fade-words">
                        <div class="draggable-list__words" v-if="!endFirstTask">
                            <transition-group name="fade-word">
                                <div class="draggable-list__word" v-for="word in firstTask[1]" :key="word.id">
                                    {{ word.text }}
                                </div>
                            </transition-group>
                        </div>
                    </transition>

                    <transition name="fade-pictures">
                        <div class="draggable-list__pictures" v-if="endFirstTask">
                            <div class="draggable-list__picture" v-for="picture in secondTask[1]" :key="picture.id">
                                <img height="16px" src="/assets/creatures/SeventeenthTask/green-circle.svg"
                                    alt="green-circle" class="draggable-list__word-top-circle" :ref="(el) => {
                                            refPoints[2][picture.id - 1] = el;
                                        }
                                        " />
                                <img :src="picture.src" :alt="picture.alt" class="draggable-list__lesyaandmoa"
                                    v-if="!endSecondTask" />
                                <img :src="picture.endsrc" :alt="picture.endalt" class="draggable-list__lesyaandmoa"
                                    v-else />
                            </div>
                        </div>
                    </transition>
                </div>
            </template>
            <TaskResultBanner :img="getImageUrl('Cup.png')" :bg="getImageUrl('lesya.gif')" text="Потрясающе!"
                v-if="!startGame" @next="next()" @hide="hide()" class="end-modal"></TaskResultBanner>
        </div>
    </div>
</template>

<script setup>
import {
    ref,
    onMounted,
    watch,
    onBeforeMount,
    onBeforeUnmount,
    onUpdated,
} from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';

import { dataFirstTask, dataSecondTask } from './task.js';
import audioMap from './audioMap'
import gameActions from '@mixins/gameAction';

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
};

const next = () => {
    emit('next-modal');
};

//
// ПЕРВЫЙ ЭТАП ЗАДАНИЯ
//

const dragIdPuzzle = ref()

const audio = ref(new Audio());
const is_correct = ref(false);
const is_started = ref(null);
const corrValue = ref(0);
const playAudio = (audioPath) => {
    audio.value.src = new URL(audioPath, import.meta.url).href;
    audio.value.play();
}

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

const dataTransfer = ref({})
const drag = (event, word) => {
    event.from.dataset['isActive'] = 'false';
    dragIdPuzzle.value = word.id;
    dataTransfer.value = word;
    console.log('drag', event);
}

const drop = (event, word) => {

    console.log('drop', event)
    let dragElem = event.item
    event.to.removeChild(event.item)

    if (event.to.dataset['isActive'] == 'false') {
        console.log('event')
        console.log(event.to)
        console.log(event.to.dataset)
        event.from.dataset['isActive'] = 'true'
        event.from.appendChild(dragElem)
        return
    }


    let dragSrcError = dataTransfer.value.srcError
    let dragSrc = dataTransfer.value.src

    if (dataTransfer.value.answer == word.id){

        event.to.removeChild(event.to.children[0])
        event.to.dataset['isActive'] = 'false';

        event.to.classList.add('standart_cursor')
        event.from.classList.add('standart_cursor')

        playAudio(`/assets/audio/Task6/right.${Math.ceil(Math.random() * 3)}.mp3`);

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
                let audio_word = new Audio(`/assets/audio/Task17/${audioMap.get('слово-' + answer.id)}`);
                audio_word.play();

                setTimeout(() => {
                    if (firstTaskAnswerCounter.value == 5) {
                        endFirstTask.value = true;
                    }
                }, 2000)
            }, 1000);
    }
    else{
        event.from.appendChild(dragElem)
        playAudio(`/assets/audio/Task6/wrong.${Math.ceil(Math.random() * 3)}.mp3`)

        event.from.children[0].children[0].src = dragSrcError;
        event.to.children[0].children[0].src = word.srcError

        event.to.dataset['isActive'] = 'true'
        event.from.dataset['isActive'] = 'true'

        setTimeout(()=>{
            event.from.children[0].children[0].src = dragSrc;
            event.to.children[0].children[0].src = word.src
        }, 2000)
    }
}


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
    if (event.type == "touchstart" || event.type == "touchmove") {
        console.log(event)
        return {
            x: event.touches[0].clientX - rect.left,
            y: event.touches[0].clientY - rect.top
        }
    }
    else if (event.type == "touchend") {
        return {
            x: event.changedTouches[0].clientX - rect.left,
            y: event.changedTouches[0].clientY - rect.top
        }
    }
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
};

const getCenterCords = () => {
    for (const rowId in refPoints.value) {
        for (const pointId in refPoints.value[rowId]) {
            const point = refPoints.value[rowId][pointId];
            if (point) {
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

    const columnId = inFirstLineX ? 1 : inSecondLineX ? 2 : inThirdLineX ? 3 : inFourthLineX ? 4 : inFifthLineX ? 5 : false;
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
                endIds.row
            );
            if (correct) {
                SecondTaskAnswerCounter.value++;
                centralCords.value[startIds.row][
                    startIds.column - 1
                ].done = true;
                centralCords.value[endIds.row][endIds.column - 1].done = true;
                playAudio(
                    `/assets/audio/Common/1.${Math.floor(Math.random() * 3) + 1
                    }.mp3`
                );

                lines.value.push({
                    startX: startCords.value.x,
                    startY: startCords.value.y,
                    endX: centralCords.value[endIds.row][endIds.column - 1].x,
                    endY: centralCords.value[endIds.row][endIds.column - 1].y,
                });

                if (SecondTaskAnswerCounter.value == 5) {
                    setTimeout(() => {
                        finalDraw();
                        endSecondTask.value = true;
                    }, 2000);
                }
            } else {
                playAudio(
                    `/assets/audio/Common/2.${Math.floor(Math.random() * 3) + 1
                    }.mp3`
                );
            }
        }
        isDrawing.value = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redraw();
    }
};


const voiceActing = () => { };

const finalDraw = () => {
    console.log(centralCords.value);

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
        if (is_correct.value === false) {
            endGameRequest(props.childId, corrValue.value);
            emit('correct');
            emit('open');
        }
        playAudio('/assets/audio/Task17/469.17_.mp3');
        startGame.value = false;
    }, 4000);
};

onMounted(async () => {
    canvas = canvasRef.value;
    try {
        const correct = await getCorrectAnswer(17, props.childId);
        corrValue.value = correct.correctId;
        is_correct.value = correct.is_correct;
    }
    catch (error) {
        console.log(error);
    }
    ctx = canvas.getContext('2d');
    await resizeCanvas();
    console.log('компонент создан')
    window.addEventListener('resize', () => {
        resizeCanvas();
    });
});

onBeforeUnmount(() => {
    console.log('компонент удален')
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
    width: 100px;
    height: 90px;

    @media (max-width: 1024px) {
        width: 80px;
        height: 72px;
    }
}

.figure-out {
    cursor: pointer;
    width: 124px;
    height: 90px;

    @media (max-width: 1024px) {
        width: 100px;
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

.none{
    display: none !important;
    width: 0 !important;
    height: 0 !important;
}

.dot{
    width: 1px;
    height: 1px;
}

.block {
    display: flex !important;
    opacity: 100% !important;
}

.hidden{
    opacity: 0% !important;
}

.standart_cursor{
    cursor: default !important;
}
</style>
<template>
    <div class="SeventeenthTask task_block">
        <div class="task_block__wrapper" >
            <template v-if="startGame">
                <div class="task_block__close" @click="hide()">
                    <img
                        class="close-icon"
                        src="@app/assets/icons/close-icon.svg"
                        alt="крест"
                    />
                </div>
                <div class="task_block__time" @click="console.log(centralCords)">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title SeventeenthTask__title">
                        Собери слова из двух частей. <br/>
                        Соедини полученные слова с картинками. 
                    </p>
                </div>
                <canvas class="canvas_draw" ref="canvasRef" @mousedown="engage" @mouseup="disengage" @mousemove="draw" @click="voiceActing" v-show="endFirstTask && true"></canvas>
                <div class="draggable-list" ref="taskBlock" @dragover.prevent @drop="missDrop($event)">

                    <DragndropComponent :left = "PuzzleCords.x" :top="PuzzleCords.y" v-if="isDrag && !endFirstTask">
                        <template v-slot:task>
                            <div draggable="false">
                                <img :src="draggableBlock.src" :alt="draggableBlock.class" :class="[draggableBlock.class]" draggable="false"
                                @mouseup="endPosition($event)" 
                                @mousemove="($event)=>{getPuzzleCords($event)}"
                                @mouseleave="mouseLeaveFromPuzzle()">
                            </div>
                        </template>
                    </DragndropComponent>

                    <transition name="fade-words-top">
                        <div class="draggable-list__words-top" v-if="endFirstTask && !(getCenterCords())">
                            <div class="draggable-list__word-top" v-for="word in secondTask[0]" :key="word.id">
                                <div class="draggable-list__word">{{  word.text  }}</div>
                                <img height="16px" src="assets/creatures/SeventeenthTask/green-circle.svg" alt="green-circle" class="draggable-list__word-top-circle" :ref="(el)=>{refPoints[1][word.id - 1] = el}">
                            </div>
                        </div>
                    </transition>
                    
                    <div class="draggable-list__syllables"  v-if="!endFirstTask" >
                        <div class="draggable-list__set-syllables" v-for="row in firstTask[0]" :key="row" draggable="false">
                            <div v-for="word in row" :key="word.id" 
                            @mousedown.left="$event=>startPosition($event, word)"
                            :ref="(el)=>{refPuzzles[word.id - 1] = el}"
                            draggable="false">

                                <img :src="word.error == 0 ? word.src : word.error == 1 ? word.srcRight : word.srcError" 
                                :alt="word.class" :class="[word.class]"
                                draggable="false"
                                :style="{opacity : (word.isActive ? '100%' : '0%'), cursor : (word.isActive ? 'pointer' : 'auto')}">

                            </div>
                        </div>
                        
                    </div>
                    
                    <transition name="fade-words">
                        <div class="draggable-list__words" v-if="!endFirstTask">
                            <transition-group name="fade-word">
                                <div class="draggable-list__word" v-for="word in firstTask[1]" :key="word.id">{{ word.text }}</div>
                            </transition-group>
                        </div>
                    </transition>

                    <transition name='fade-pictures'>
                        <div class="draggable-list__pictures" v-if="endFirstTask">
                            <div class="draggable-list__picture" v-for="picture in secondTask[1]" :key="picture.id">
                                <img height="16px" src="/assets/creatures/SeventeenthTask/green-circle.svg" alt="green-circle" class="draggable-list__word-top-circle" :ref="(el)=>{refPoints[2][picture.id - 1] = el}">
                                <img :src="picture.src" :alt="picture.alt" class="draggable-list__lesyaandmoa">
                            </div>
                        </div>
                    </transition>

                </div>
            </template>
            <TaskResultBanner img="/assets/backgrounds/Cup.png" bg="/assets/backgrounds/lesya.gif" text="Потрясающе!"
            v-if="!startGame" @hide="hide()"></TaskResultBanner>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeMount, onBeforeUnmount, onUpdated } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';

import DragndropComponent from './DragndropComponent.vue';

import { dataFirstTask, dataSecondTask } from './task.js'

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

//
// ПЕРВЫЙ ЭТАП ЗАДАНИЯ
//

const startGame = ref(true)

const firstTask = ref()
const secondTask = ref()
const firstTaskAnswerCounter = ref(0)

const endFirstTask = ref(false)
const isDrag = ref(false)
const PuzzleCords = ref({
    x: 0,
    y: 0
})
const draggableBlock = ref({
    src: '',
    class: '',
})
const refPuzzles = ref([])
const centralPuzzleCords = ref([])
const startId = ref(0)

firstTask.value = structuredClone(dataFirstTask)
firstTask.value[1] = []
secondTask.value = structuredClone(dataSecondTask)


const getPuzzleCords = (event) => {
    PuzzleCords.value.x = event.clientX - taskBlock.value.getBoundingClientRect().x - event.target.getBoundingClientRect().width / 2 ; 
    PuzzleCords.value.y = event.clientY - taskBlock.value.getBoundingClientRect().y - event.target.getBoundingClientRect().height / 2 ; 
    
}

const startPosition = (event, word) => {
    if (!word.isActive) return
    draggableBlock.value.src = word.src; 
    draggableBlock.value.class = word.class;
    getPuzzleCords(event);
    isDrag.value = true;
    startId.value = word.id
    word.isActive = false

    getCentralPuzzleCords()
}

const getCentralPuzzleCords = () => {
    refPuzzles.value.forEach((puzzle, index) => {
        centralPuzzleCords.value[index] = ({
            x: puzzle.getBoundingClientRect().x + puzzle.getBoundingClientRect().width / 2,
            y: puzzle.getBoundingClientRect().y + puzzle.getBoundingClientRect().height / 2,
            xmin: puzzle.getBoundingClientRect().x,
            xmax: puzzle.getBoundingClientRect().x + puzzle.getBoundingClientRect().width,
            ymin: puzzle.getBoundingClientRect().y,
            ymax: puzzle.getBoundingClientRect().y + puzzle.getBoundingClientRect().height
        })
    });

}

const getPuzzleUnderMouse = (event) => {
    let correctIndex = -1
    centralPuzzleCords.value.forEach((puzzle, index) => {
        if (event.clientX > puzzle.xmin && event.clientX < puzzle.xmax && event.clientY > puzzle.ymin && event.clientY < puzzle.ymax) {
            correctIndex = index
        }
    })
    return correctIndex


}

const endPosition = (event) => {
    if (getPuzzleUnderMouse(event) != -1 )
    {
        let index = getPuzzleUnderMouse(event)
        let answertId = index + 1
        
        if (rightAnswer(index)) {
            firstTask.value[0].map((row)=>{
                row.map((word)=>{
                    if (word.id == answertId || word.id == startId.value) {
                        word.error = 1
                        word.isActive = true
                        setTimeout(()=>{
                            word.isActive = false
                            word.error = 0
                        }, 1000)
                    }
                })
            })
            playAudio(`/assets/audio/Task6/right.${Math.ceil(Math.random() * 3)}.mp3`)


            let word = {}
            if (startId.value == 1 || startId.value == 14) {
                word.id = 1
                word.text = 'РОМАШКА'
            }
            else if (startId.value == 2 || startId.value == 9) {
                word.id = 5
                word.text = 'ОБЛАКА'

            }
            else if (startId.value == 3 || startId.value == 6) {
                word.id = 3
                word.text = 'КОРОВА'
            }
            else if (startId.value == 4 || startId.value == 11) {
                word.id = 2
                word.text = 'ДЕРЕВО'
            }
            else if (startId.value == 5 || startId.value == 8) {
                word.id = 4
                word.text = 'РЕКА'
            }
            if (firstTask.value[1].length >= word.id){
                firstTask.value[1].splice(word.id - 1, 0, word)
            }
            else{
                firstTask.value[1].push(word)
            }

            
            setTimeout(()=>{
                firstTaskAnswerCounter.value += 1
                if (firstTaskAnswerCounter.value == 5) {
                    endFirstTask.value = true
                }}, 1000)

        }
        else {
            let flag = false
            firstTask.value[0].map((row)=>{
                row.map((word)=>{
                    if (word.id == answertId || word.id == startId.value) {
                        if (word.isActive == false) flag = true
                        if (word.id == startId.value) word.isActive = true
                    }
                })
            })

            if (!flag ) {
                firstTask.value[0].map((row)=>{
                    row.map((word)=>{
                        if (word.id == answertId || word.id == startId.value ) {
                            word.error = -1

                            setTimeout(()=>{
                                word.isActive = true
                                word.error = 0
                            }, 1000)
                        }
                    })
                })
                playAudio(`/assets/audio/Task6/wrong.${Math.ceil(Math.random() * 3)}.mp3`)
            }
            
        }
    }
    isDrag.value = false;
}

const rightAnswer = (index) => {

    let correctId = index + 1

    if (startId.value == 1 && correctId == 14)      return true
    else if (startId.value == 2 && correctId == 9)  return true
    else if (startId.value == 3 && correctId == 6)  return true
    else if (startId.value == 4 && correctId == 11) return true
    else if (startId.value == 5 && correctId == 8)  return true

    else if (startId.value == 6  && correctId == 3)  return true
    else if (startId.value == 8  && correctId == 5)  return true
    else if (startId.value == 9  && correctId == 2)  return true
    else if (startId.value == 11 && correctId == 4)  return true
    else if (startId.value == 14 && correctId == 1)  return true

    return false
}

const mouseLeaveFromPuzzle = () => {
    isDrag.value = false

    if (startId.value != -1) {
        firstTask.value[0].map((row)=>{
            row.map((word)=>{
                if (word.id == startId.value) word.isActive = true
            })
        })
    }
}

//
// ВТОРОЙ ЭТАП ЗАДАНИЯ
//

const canvasRef = ref(null)
const taskBlock = ref(null)
const refPoints = ref({
    1: [],
    2: []
})
const centralCords = ref({
    1: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
    2: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}]
})
const isDrawing = ref(false)
const startCords = ref({x: 0, y: 0})
const lines = ref([]);
const SecondTaskAnswerCounter = ref(0)

let canvas
let ctx
let leftBorder 
let rightBorder

let startIds = {};
let endIds = {};



onBeforeUnmount(()=>{
    window.removeEventListener('resize', ()=>{winWidth.value = window.innerWidth})
})

const resizeCanvas = async () => {
    console.log('resize')

    if (window.innerWidth > 1024){
        canvas.width = 1080
        canvas.height = 442
    }
    else{
        canvas.width = 904
        canvas.height = 332
    }

    leftBorder = 0 
    rightBorder = canvas.width
    redraw(); 
}

const getCursorPosition = (event) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

const getCenterCords = () => {
    for (const rowId in refPoints.value) {
        for (const pointId in refPoints.value[rowId]) {
            const point = refPoints.value[rowId][pointId];
            if (point) {
                const rect = point.getBoundingClientRect();
                const canvasRect = canvas.getBoundingClientRect();

                console.log(rect.width)

                const x = rect.left + rect.width / 2 - canvasRect.left;
                centralCords.value[rowId][pointId].x = x;
                centralCords.value[rowId][pointId].maxX = x + rect.width;
                centralCords.value[rowId][pointId].minX = x - rect.width;

                const y = rect.top + rect.height / 2 - canvasRect.top;
                centralCords.value[rowId][pointId].y = y;
                centralCords.value[rowId][pointId].maxY = y + rect.width;
                centralCords.value[rowId][pointId].minY = y - rect.width;

                if (!centralCords.value[rowId][pointId]?.done) centralCords.value[rowId][pointId].done = false;
            }
        }
    }
}

const checkRowsAndColumnsIds = (pos) => {
    const inFirstLineX = (pos.x > centralCords.value[1][0].minX && pos.x < centralCords.value[1][0].maxX);
    const inSecondLineX = (pos.x > centralCords.value[1][1].minX && pos.x < centralCords.value[1][1].maxX);
    const inThirdLineX = (pos.x > centralCords.value[1][2].minX && pos.x < centralCords.value[1][2].maxX);
    const inFourthLineX = (pos.x > centralCords.value[1][3].minX && pos.x < centralCords.value[1][3].maxX);
    const inFifthLineX = (pos.x > centralCords.value[1][4].minX && pos.x < centralCords.value[1][4].maxX);

    const inFirstLineY = (pos.y > centralCords.value[1][0].minY && pos.y < centralCords.value[1][0].maxY);
    const inSecondLineY = (pos.y > centralCords.value[2][0].minY && pos.y < centralCords.value[2][0].maxY);

    const columnId = inFirstLineX ? 1 : inSecondLineX ? 2 : inThirdLineX ? 3 : inFourthLineX ? 4 : inFifthLineX ? 5 : false;
    const rowId = inFirstLineY ? 1 : inSecondLineY ? 2 : false;

    return {row: rowId, column: columnId};
}

const isDone = (row, column) => {
    return row && column ? centralCords.value[row][column-1].done : false
}

const engage = (event) => {
    const pos = getCursorPosition(event);
    startIds = checkRowsAndColumnsIds(pos)
    const done = isDone(startIds.row, startIds.column);
    if(startIds.column && startIds.row && !done) {
        isDrawing.value = true;
        startCords.value.x = centralCords.value[startIds.row][startIds.column - 1].x;
        startCords.value.y = centralCords.value[startIds.row][startIds.column - 1].y;
    }
}

const draw = (event) => {
    if (isDrawing.value) {
        const pos = getCursorPosition(event);
        if(pos.x > leftBorder && pos.x < rightBorder) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            redraw();
            ctx.strokeStyle = "green";
            ctx.lineWidth = 2; 
            ctx.setLineDash([5, 5]); 
            ctx.beginPath();
            ctx.moveTo(startCords.value.x, startCords.value.y);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            ctx.closePath();
            ctx.fillStyle = "green";
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
}

const redraw = () => {
    lines.value.forEach(line => {
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(line.startX, line.startY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        
        ctx.strokeStyle = "green";
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(line.endX, line.endY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    });
}

const correctAnswer = (startColumn, startRow, endColumn, endRow) => {
    
    if (startRow == 1){
        if (endRow == 2){
            if (startColumn == 1) {
                if (endColumn == 2) {
                    return true
                }
            }
            if (startColumn == 2) {
                if (endColumn == 1) { 
                    return true
                }
            }
            if (startColumn == 3) {
                if (endColumn == 4) {
                    return true
                }
            }
            if (startColumn == 4) {
                if (endColumn == 5) { 
                    return true
                }
            }
            if (startColumn == 5) {
                if (endColumn == 3) { 
                    return true
                }
            }
        }
    }

    if (startRow == 2){
        if (endRow == 1){
            if (startColumn == 1) {
                if (endColumn == 2) { 
                    return true
                }
            }
            if (startColumn == 2) {
                if (endColumn == 1) { 
                    return true
                }
            }
            if (startColumn == 3) {
                if (endColumn == 5) { 
                    return true
                }
            }
            if (startColumn == 4) {
                if (endColumn == 3) { 
                    return true
                }
            }
            if (startColumn == 5) {
                if (endColumn == 4) { 
                    return true
                }
            }
        }
    }

    return false
}

const disengage = (event) => {
    if (isDrawing.value) {
        const pos = getCursorPosition(event);
        endIds = checkRowsAndColumnsIds(pos);
        if(endIds.column && endIds.row && endIds.column !== startIds.column) {
            const correct = correctAnswer(startIds.column, startIds.row, endIds.column, endIds.row);
            if(correct) {
                SecondTaskAnswerCounter.value++;
                centralCords.value[startIds.row][startIds.column-1].done = true
                centralCords.value[endIds.row][endIds.column-1].done = true
                playAudio(`/assets/audio/Common/1.${Math.floor(Math.random() * 3) + 1}.mp3`);

                lines.value.push({
                startX: startCords.value.x,
                startY: startCords.value.y,
                endX: centralCords.value[endIds.row][endIds.column - 1].x,
                endY: centralCords.value[endIds.row][endIds.column - 1].y
                });

                if(SecondTaskAnswerCounter.value == 5){
                    setTimeout(() => {
                        startGame.value = false;
                        playAudio(`/assets/audio/Task7/278.7.mp3`);
                    }, 2000);
                }
            } else {
                playAudio(`/assets/audio/Common/2.${Math.floor(Math.random() * 3) + 1}.mp3`);
            }
        }
        isDrawing.value = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redraw();
    }
}

const playAudio = (file) => {
    let audio = new Audio(file)
    audio.play()
}

const voiceActing = () => {}

onMounted(async ()=>{

    canvas = canvasRef.value;
    
    ctx = canvas.getContext('2d');
    await resizeCanvas();
    window.addEventListener('resize', ()=>{resizeCanvas()});
})
watch (
    endFirstTask, ()=>{ canvas.removeAttribute('style') }
)
</script>


<style lang="scss" scoped>

*{
    user-select: none;
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
    @media (max-width: 1024px) {
        height: 72px;
    }
}

.draggable-list__set-syllables:nth-child(2){
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

.canvas_draw{
    position: absolute;
    z-index: 4;
    margin: 0 auto;
    pointer-events: auto;
}


.fade-words-top-enter-active{
    position: relative;

    animation: fade-words-top 0.5s;
}

@keyframes fade-words-top{
    0%{
        opacity: 0;
    }
    99%{
        opacity: 0;
    }
    100%{
        opacity: 100;
    }
}

.fade-words-leave-active{
    transition: all 0.5s ease-out;
    position: absolute;
}

.fade-words-leave-from{
    transform: translateY(366px);
    position: absolute;
}
.fade-words-leave-to{
    top: 0;
    position: absolute;
}

.fade-pictures-enter-active{
    transition: all 1s ;
}
.fade-pictures-enter-from{
    opacity: 0;
}
.fade-pictures-enter-to{
    opacity: 100;
}


.fade-word-enter-active{
    position: relative;

    animation: fade-word 0.5s;
}

@keyframes fade-word{
    0%{
        scale: 0;
    }
    50%{
        scale: 1.1;
    }
    100%{
        scale: 1;
    }
}



</style>
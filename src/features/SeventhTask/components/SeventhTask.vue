<template>
    <div class="SeventhTask task_block">
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
                    <p class="title-h4 task_block__title SeventhTask__title">
                        Верно соотнеси слово, его толкование и картинку.
                    </p>
                </div>
                <canvas @mousedown="engage" @mouseup="disengage" @mousemove="drawDot" ref="canvasRef" class="canvas_draw"></canvas>
                <div  class="draggable-list">
                    <div class="draggable-list__words">
                        <div class="draggable-list__word-container" v-for="(word, word_index) in words[option]" :key="word_index">
                            <div class="draggable-list__word">{{ word.word }}</div>
                            <img @mousedown="test" @mouseup="test" alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle" draggable="false"/>
                        </div>
                    </div>
                    <div class="draggable-list__sentences">
                        <div class="draggable-list__sentence-container" v-for="(sentence, sentence_index) in sentences[option]" :key="sentence_index">
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle" draggable="false"/>
                            <div class="draggable-list__sentence">{{ sentence.sentence }}</div>
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle" draggable="false"/>
                        </div>
                    </div>
                    <div class="draggable-list__pictures">
                        <div class="draggable-list__picture-container" v-for="(img, img_index) in images[option]" :key="img_index">
                            <img alt="green-circle" src="assets/creatures/SeventeenthTask/green-circle.svg"  class="draggable-list__circle" draggable="false"/>
                            <img :src="img.url" class="draggable-list__image">
                        </div>
                    </div>
                </div>
            </template>
            <TaskResultBanner img="/assets/backgrounds/Cup.png" bg="/assets/backgrounds/lesya.gif" text="Далее!"
            v-else @hide="hide()"></TaskResultBanner>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';

const startGame = ref(true);
const isDrawing = ref(false);
const option = ref(1);
const lines = ref([]);
const startCords = ref({
    x: 0,
    y: 0,
    column: 0,
    number: 0,
})
const endCords = ref({
    x: 0,
    y: 0,
    column: 0,
    number: 0,
})
const currCords = ref({
    x: 0,
    y: 0,
})
const canvasRef = ref(null);
let canvas;
let ctx;

const words = ref({
    1:{
        1: {
            word: 'КОНЬ',
            audio: '/assets/audio/Task7/262.7.mp3',
            correct: null,
        },
        2: {
            word: 'ТОПЬ',
            audio: '/assets/audio/Task7/263.7.mp3',
            correct: null,
        },
        3: {
            word: 'ТОП',
            audio: '/assets/audio/Task7/264.7.mp3',
            correct: null,
        },
        4: {
            word: 'КОН',
            audio: '/assets/audio/Task7/265.7.mp3',
            correct: null,
        },
    },
    2:{
        1: {
            word: 'СЕЛ',
            audio: '/assets/audio/Task7/270.7.mp3',
            correct: null,
        },
        2: {
            word: 'СЪЕЛ',
            audio: '/assets/audio/Task7/271.7.mp3',
            correct: null,
        },
        3: {
            word: 'МЕЛ',
            audio: '/assets/audio/Task7/272.7.mp3',
            correct: null,
        },
        4: {
            word: 'МЕЛЬ',
            audio: '/assets/audio/Task7/273.7.mp3',
            correct: null,
        },
    },
})

const sentences = ref({
    1:{
        1: {
            sentence: 'одна партия какой-либо игры',
            audio: '/assets/audio/Task7/266.7.mp3',
            correct: null,
        },
        2: {
            sentence: 'легкая женская одежда для верхней половины тела',
            audio: '/assets/audio/Task7/267.7.mp3',
            correct: null,
        },
        3: {
            sentence: 'топкое, болотистое место',
            audio: '/assets/audio/Task7/268.7.mp3',
            correct: null,
        },
        4: {
            sentence: 'то же, что лошадь, вьючное животное',
            audio: '/assets/audio/Task7/269.7.mp3',
            correct: null,
        },
    },
    2:{
        1: {
            sentence: 'принял пищу, покушал',
            audio: '/assets/audio/Task7/275.7.mp3',
            correct: null,
        },
        2: {
            sentence: 'принял положение сидя',
            audio: '/assets/audio/Task7/274.7.mp3',
            correct: null,
        },
        3: {
            sentence: 'неглубокое место в реке, озере или в море',
            audio: '/assets/audio/Task7/277.7.mp3',
            correct: null,
        },
        4: {
            sentence: 'белый известняк для окраски, писания (на доске)',
            audio: '/assets/audio/Task7/276.7.mp3',
            correct: null,
        },
    },
}) 

const images = ref({
    1:{
        1: {
            url: "assets/creatures/SeventhTask/girl's-top.png",
            correct: null,
        },
        2: {
            url: "assets/creatures/SeventhTask/chess.png",
            correct: null,
        },
        3: {
            url: "assets/creatures/SeventhTask/horse.png",
            correct: null,
        },
        4: {
            url: "assets/creatures/SeventhTask/swamp.png",
            correct: null,
        },
    },
    2:{
        1: {
            url: "assets/creatures/SeventhTask/chalk.png",
            correct: null,
        },
        2: {
            url: "assets/creatures/SeventhTask/shallow.png",
            correct: null,
        },
        3: {
            url: "assets/creatures/SeventhTask/food.png",
            correct: null,
        },
        4: {
            url: "assets/creatures/SeventhTask/sit.png",
            correct: null,
        },
    },
})

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

const test = () => {
    console.log(123);
}

const getCursorPosition = (event) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

const drawDot = (event) => {
    if (isDrawing.value) {
        const pos = getCursorPosition(event);
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
    }
}

const engage = (event) => {
    const pos = getCursorPosition(event);
    isDrawing.value = true;
    startCords.value.x = pos.x;
    startCords.value.y = pos.y;
}

const disengage = (event) => {
    if (isDrawing.value) {
        const pos = getCursorPosition(event);
        lines.value.push({
          startX: startCords.value.x,
          startY: startCords.value.y,
          endX: pos.x,
          endY: pos.y
        });
        isDrawing.value = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redraw();
    }
}

const redraw = () => {
    lines.value.forEach(line => {
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

const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redraw(); 
}

onMounted(()=>{
    canvas = canvasRef.value;
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
})
</script>

<style lang="scss" scoped>
.canvas_draw{
    border: 1px solid black;
    position: absolute;
    z-index: 2;
    margin: 0 auto;
    pointer-events: auto;
    // position: absolute;
    // top: 0;
    // left: 0;
    // width: 100%;
    // height: 100%;
    // pointer-events: auto;
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
</style>s
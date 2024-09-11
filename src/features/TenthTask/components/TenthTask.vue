<template>
    <div class="TenthTask task_block">
        <div class="task_block__wrapper">
            <template v-if="startGame">
                <div class="task_block__close" @click="hide">
                    <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title TenthTask__title">
                        Дополни предложения недостающими словами.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="draggable-list__words">
                        <div class="draggable-list__set-words" v-for="(line, index_line) in prepositions"
                            :key="index_line">
                            <VueDraggableNext v-for="(item, index) in line" :key="item.id"
                            :group="{ name: 'letters', pull: 'clone', put: false }" :sort="false"
                            @choose="drag($event, item, index)"

                            @mouseover="playAudio(item.audio)" @mouseout="stopAudio(item.audio)"
                            @touchstart="playAudio(item.audio)"
                            >

                                <div :id="item.id + '_elem'"
                                    :class="{ 'draggable-list__word': true, correct_select: item.correct, not_correct_select: item.correct === false }"

                                    :value="item.text">
                                    {{ item.text }}
                                </div>

                            </VueDraggableNext>
                        </div>
                    </div>
                    <div class="draggable-list__answer">
                        <div class="draggable-list__answer-wrapper">
                            <p>{{ questions[currStage].first_part }}</p>
                            <VueDraggableNext class="draggable-list__quastion-block" v-if="!givenAnswer[1]"
                                :group="{ name: 'letters', pull: false, put: true }" :sort="false"
                                @add="drop($event, 1)" ghost-class="none">

                                <input class="answer" readonly @focus="($event)=>{$event.target.blur()}"/>

                            </VueDraggableNext>
                            <p v-else>&nbsp;{{ questions[currStage].first_answer }}&nbsp;</p>
                            <p>{{ questions[currStage].second_part }}</p>
                            <template v-if="currStage > 2">
                                <VueDraggableNext class="draggable-list__quastion-block" v-if="!givenAnswer[2]"
                                    :group="{ name: 'letters', pull: false, put: true }" :sort="false"
                                    @add="drop($event, 2)" ghost-class="none">

                                    <input class="answer" readonly @focus="($event)=>{$event.target.blur()}"/>

                                </VueDraggableNext>
                                <p v-else>&nbsp;{{ questions[currStage].second_answer }}&nbsp;</p>
                                <p>{{ questions[currStage].third_part }}</p>
                            </template>

                        </div>
                    </div>
                </div>
            </template>
            <TaskResultBanner :img="getImageUrl('Diamond.png')" :bg="getImageUrl('moa.gif')"
                text="Замечательно!" v-else @hide="hide()" @next="next()" class="end-modal"></TaskResultBanner>
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
const emit = defineEmits(['close', 'next-modal', 'correct', 'open']);
const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
    finish: {
        type: Boolean
    },
    childId: {
        type: Number,
        required: false,
    }
});

const givenAnswer = ref({
    1: false,
    2: false,
});
const is_correct = ref(false);
const corrValue = ref(0);
const currStage = ref(1);
const questions = ref({
    1: {
        first_part: "Мы прилетели ",
        second_part: "планеты Музи.",
        first_answer: "с"
    },
    2: {
        first_part: "Наш межгалактический корабль разбился ",
        second_part: "лесу.",
        first_answer: "в",
    },
    3: {
        first_part: "Мы добрались",
        second_part: "места крушения в город",
        third_part: "поле",
        first_answer: "до",
        second_answer: "через"
    },
    4: {
        first_part: "И спрятались",
        second_part: "крышей игрового домика",
        third_part: "детской площадке",
        first_answer: "под",
        second_answer: "на"
    }
}
)

const prepositions = ref({
    1: {
        1: { text: "В", audio: "Task10/318.10.mp3", correct: null },
        2: { text: "НА", audio: "Task10/319.10.mp3", correct: null },
        3: { text: "ИЗ", audio: "Task10/320.10.mp3", correct: null },
        4: { text: "ОТ", audio: "Task10/321.10.mp3", correct: null },
        5: { text: "ЧЕРЕЗ", audio: "Task10/322.10.mp3", correct: null },
    },
    2: {
        6: { text: "С", audio: "Task10/323.10.mp3", correct: null },
        7: { text: "ДО", audio: "Task10/324.10.mp3", correct: null },
        8: { text: "ПРИ", audio: "Task10/325.10.mp3", correct: null },
        9: { text: "У", audio: "Task10/326.10.mp3", correct: null },
        10: { text: "ПОД", audio: "Task10/327.10.mp3", correct: null },
    }
})

const getImageUrl = (path) => {
 return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};

const dataTransfer = ref({})
const drag = (event, preposition, index) => {
    // event.dataTransfer.setData('text', preposition.text);
    // event.dataTransfer.setData('id', index);
    // playAudio(preposition.audio);

    dataTransfer.value.text = preposition.text;
    dataTransfer.value.id = index;
};

let fromBlock

const drop = (event, num) => {
    // const text = event.dataTransfer.getData('text');
    // const id = event.dataTransfer.getData('id');

    const text = dataTransfer.value.text;
    const id = dataTransfer.value.id

    fromBlock = event.from.children[0];

    Array.from(event.to.children).forEach(element => {
        if (element.classList.contains('draggable-list__word')) {
            event.to.removeChild(element)
        }
    })

    if (currStage.value <= 2) {
        if (text.toLowerCase() == questions.value[currStage.value].first_answer) {
            correctAnswer(id, true, fromBlock);
            givenAnswer.value[1] = true;
            setTimeout(() => {
                givenAnswer.value[1] = false;
                currStage.value += 1;
            }, 2000)
        } else {
            correctAnswer(id, false, fromBlock);
        }
    } else {
        if (num == 1) {
            if (text.toLowerCase() == questions.value[currStage.value].first_answer) {
                correctAnswer(id, true, fromBlock);
                givenAnswer.value[1] = true;
                if (givenAnswer.value[1] && givenAnswer.value[2]) {
                    setTimeout(() => {
                        givenAnswer.value[1] = false;
                        givenAnswer.value[2] = false;
                        currStage.value += 1;
                        if (currStage.value == 5) {
                            startGame.value = false;
                            playAudio(`Task10/328.10_.mp3`)
                        }
                    }, 2000)
                }
            } else {
                correctAnswer(id, false, fromBlock);
            }
        } else {
            if (text.toLowerCase() == questions.value[currStage.value].second_answer) {
                correctAnswer(id, true, fromBlock);
                givenAnswer.value[2] = true;
                if (givenAnswer.value[1] && givenAnswer.value[2]) {
                    setTimeout(() => {
                        givenAnswer.value[1] = false;
                        givenAnswer.value[2] = false;
                        currStage.value += 1;
                        if (currStage.value == 5) {
                            if (is_correct.value === false) {
                                endGameRequest(props.childId, corrValue.value);
                                emit('correct');
                                emit('open');
                            }
                            startGame.value = false;
                            playAudio(`Task10/328.10_.mp3`)
                        }
                    }, 2000)
                }
            } else {
                correctAnswer(id, false, fromBlock);
            }
        }
    }
};

const correctAnswer = (id, correct, block) => {
    correct ? playEndAudio(`Common/1.${Math.floor(Math.random() * 3) + 1}.mp3`) : playEndAudio(`Common/2.${Math.floor(Math.random() * 3) + 1}.mp3`);
    if (id <= 5) {
        block.classList.add(`${correct ? 'correct_select' : 'not_correct_select'}`);
        prepositions.value[1][id].correct = correct;
        setTimeout(() => {
            prepositions.value[1][id].correct = null
            block.classList.remove(`${correct ? 'correct_select' : 'not_correct_select'}`);
        }, 2000);
    } else {
        console.log(prepositions.value[2], id)
        block.classList.add(`${correct ? 'correct_select' : 'not_correct_select'}`);
        prepositions.value[2][id].correct = correct;
        setTimeout(() => {
            prepositions.value[2][id].correct = null;
            block.classList.remove(`${correct ? 'correct_select' : 'not_correct_select'}`);
        }, 2000);
    }
}

const allowDrop = (event) => {
    event.preventDefault();
};

const audio = ref(new Audio());

const playAudio = async (audioPath) => {
    audio.value.src = new URL(`/assets/audio/${audioPath}`, import.meta.url).href;
    if (props.finish === true) {
        await audio.value.play();
    }
}

const playEndAudio = (audioPath) => {
    const end_audio = new Audio();
    end_audio.src = new URL(`/assets/audio/${audioPath}`, import.meta.url).href;
    end_audio.play();
}

const stopAudio = (audioPath) => {
    if (audio.value.paused) {
        playAudio(audioPath);
    } else {
        audio.value.pause();
    }
}
const hide = () => {
    emit('close');
};
const next = () => {
    emit('next-modal');
}
onMounted(async () => {
    const correct = await getCorrectAnswer(10, props.childId);
    corrValue.value = correct.correctId;
    is_correct.value = correct.is_correct;
})

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
*{
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

.answer{
    width: 90px;
    height: 44px;
    background: url(/assets/icons/quastion.svg) no-repeat center center;
}

.correct_select {
    border: 2px solid;
    border-color: #5CCF54;
}

.not_correct_select {
    border: 2px solid;
    border-color: #DB0000;
}

.TenthTask {
    width: 1200px;
}

.TenthTask__title {
    width: 573px;

    @media (max-width: 1024px) {
        width: 481px;
        font-weight: 400;
        font-size: 20px;
    }
}

.draggable-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 60px;
    width: 100%;
    height: 356px;

    @media (max-width: 1024px) {
        height: 264px;
        margin-top: 48px;
    }
}

.draggable-list__words {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 642px;
    height: 136px;

    @media (max-width: 1024px) {
        height: 116px;
    }
}

.draggable-list__set-words {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 44px;

    @media (max-width: 1024px) {
        height: 38px;
    }
}

.draggable-list__word {
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $puppe;
    color: $violetLetters-game;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: bold;
    border-radius: 6px;
    width: 90px;
    height: 44px;

    @media (max-width: 1024px) {
        height: 38px;
    }
}

.draggable-list__answer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
    border-radius: 20px;
    background-color: $blueGame;
    color: $violetLetters-game;
    font-family: 'Nunito', sans-serif;
    font-size: 22px;
    font-weight: bold;

    @media (max-width: 1024px) {
        height: 80px;
        font-size: 18px;
    }
}

.draggable-list__answer-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.draggable-list__quastion-block {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 28px;
    width: 90px;
    height: 44px;
    background-color: #fff;
    border-radius: 6px;

    @media (max-width: 1024px) {
        height: 44px;
        margin: 0 20px;
    }
}

.draggable-list__quastion-block-quastion {
    width: 17px;
    height: 39px;

    @media (max-width: 1024px) {
        width: 15px;
        height: 34px;
    }
}

.hidden {
    opacity: 0%;
}

.none {
    display: none;
}
</style>
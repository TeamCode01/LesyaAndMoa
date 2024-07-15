<template>
    <div class="TenthTask task_block">
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
                    <p class="title-h4 task_block__title TenthTask__title">
                        Дополни предложения недостающими словами.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="draggable-list__words">
                        <div class="draggable-list__set-words" v-for="(line, index_line) in prepositions" :key="index_line">
                            <q-btn 
                                v-for="(item, index) in line" 
                                :key="item.id" 
                                :id="item.id + '_elem'"
                                :class="{'draggable-list__word': true, correct_select: item.correct, not_correct_select: item.correct === false}"
                                draggable="true"
                                @dragstart="drag($event, item, index)" 
                                @dragover.prevent
                                :value="item.text"
                            >
                                {{ item.text }}
                            </q-btn>
                        </div>
                    </div>
                    <div class="draggable-list__answer">
                        <div class="draggable-list__answer-wrapper">
                            <p>{{ questions[currStage].first_part }}</p>
                            <div class="draggable-list__quastion-block" v-if="!givenAnswer[1]">
                                <input @drop="drop($event, 1)" @dragover="allowDrop($event)" class="answer" readonly />
                            </div>
                            <p v-else>&nbsp;{{ questions[currStage].first_answer }}&nbsp;</p>
                            <p>{{ questions[currStage].second_part }}</p>
                            <template v-if="currStage>2">
                                <div class="draggable-list__quastion-block" v-if="!givenAnswer[2]">
                                    <input @drop="drop($event, 2)" @dragover="allowDrop($event)" class="answer" readonly />
                                </div>
                                <p v-else>&nbsp;{{ questions[currStage].second_answer }}&nbsp;</p>
                                <p>{{ questions[currStage].third_part }}</p>
                            </template>
                            
                        </div>
                    </div>
                </div>
            </template>
            <TaskResultBanner img="/assets/backgrounds/Diamond.png" bg="/assets/backgrounds/moa.gif" text="Замечательно!"
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
const givenAnswer = ref({
    1: false,
    2: false,
});

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
        1: { text: "В", audio: "/assets/audio/Task10/", correct: null},
        2: { text: "НА", audio: "/assets/audio/Task10/", correct: null},
        3: { text: "ИЗ", audio: "/assets/audio/Task10/", correct: null},
        4: { text: "ОТ", audio: "/assets/audio/Task10/", correct: null},
        5: { text: "ЧЕРЕЗ", audio: "/assets/audio/Task10/", correct: null},
    },
    2: {
        6: { text: "С", audio: "/assets/audio/Task10/", correct: null},
        7: { text: "ДО", audio: "/assets/audio/Task10/", correct: null},
        8: { text: "ПРИ", audio: "/assets/audio/Task10/", correct: null},
        9: { text: "У", audio: "/assets/audio/Task10/", correct: null},
        10: { text: "ПОД", audio: "/assets/audio/Task10/", correct: null},
    }
})

const drag = (event, preposition, index) => {
    event.dataTransfer.setData('text', preposition.text);
    event.dataTransfer.setData('id', index);
    // playAudio(preposition.audio);
};

const drop = (event, num) => {
    const text = event.dataTransfer.getData('text');
    const id = event.dataTransfer.getData('id');
    if(currStage.value <= 2){
        if(text.toLowerCase() == questions.value[currStage.value].first_answer){
            correctAnswer(id, true);
            givenAnswer.value[1] = true;
            setTimeout(() => {
                givenAnswer.value[1] = false;
                currStage.value += 1;
            }, 2000)
        } else {
            correctAnswer(id, false);
        }
    } else {
        if(num == 1){
            if(text.toLowerCase() == questions.value[currStage.value].first_answer){
                correctAnswer(id, true);
                givenAnswer.value[1] = true;
                if(givenAnswer.value[1] && givenAnswer.value[2]) {
                    setTimeout(() => {
                        givenAnswer.value[1] = false;
                        givenAnswer.value[2] = false;
                        currStage.value += 1;
                        if(currStage.value == 5) {
                            startGame.value = false;
                            playAudio(`/assets/audio/Task10/328.10_.mp3`)
                        }
                    }, 2000)
                }
            } else {
                correctAnswer(id, false);
            }
        } else {
            if(text.toLowerCase() == questions.value[currStage.value].second_answer){
                correctAnswer(id, true);
                givenAnswer.value[2] = true;
                if(givenAnswer.value[1] && givenAnswer.value[2]) {
                    setTimeout(() => {
                        givenAnswer.value[1] = false;
                        givenAnswer.value[2] = false;
                        currStage.value += 1;
                        if(currStage.value == 5) {
                            startGame.value = false;
                            playAudio(`/assets/audio/Task10/328.10_.mp3`)
                        }
                    }, 2000)
                }
            } else {
                correctAnswer(id, false);
            }
        }
    }
};

const correctAnswer = (id, correct) => {
    correct ? playAudio(`/assets/audio/Common/1.${Math.floor(Math.random() * 3) + 1}.mp3`) : playAudio(`/assets/audio/Common/2.${Math.floor(Math.random() * 3) + 1}.mp3`);
    if(id <= 5){
        prepositions.value[1][id].correct = correct;
        setTimeout(() => prepositions.value[1][id].correct = null, 2000);
    } else {
        prepositions.value[2][id].correct = correct;
        setTimeout(() => prepositions.value[2][id].correct = null, 2000);
    }
}

const allowDrop = (event) => {
    event.preventDefault();
};

const emit = defineEmits(['close']);
const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
});

const playAudio = (audioPath) => {
    const audio = new Audio(audioPath);
    audio.play();
}


const hide = () => {
    emit('close');
};
</script>

<style lang="scss" scoped>
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
</style>
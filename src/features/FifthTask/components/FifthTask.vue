<template>
    <div class="FifthTask task_block">
        <div class="task_block__wrapper">
            <template v-if="startGame">
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
                        <div v-for="(line, line_index) in syllables" :key="line_index">
                            <div
                                :class="{ 'draggable-list__item1': 1 == line_index, 'draggable-list__item2': 2 == line_index, 'draggable-list__item3': 3 == line_index }">
                                <button v-for="(item, item_index) in line" :key="item_index"
                                    @click="onSelection(line_index, item_index)"
                                    :class="{ 'draggable-list__button': true, correct_select: item.correct, not_correct_select: item.correct === false }">
                                    {{ item.name }}</button>
                            </div>
                        </div>
                    </div>
                    <div v-if="firstListen">
                        <button @click="listenTo()" class="draggable-list__button_final">
                            <span class="draggable-list__button-speaker">Прослушать</span>
                            <img src="@app\assets\icons\speaker.svg" alt="speaker" />
                        </button>
                    </div>
                    <div v-else>
                        <button @click="listenTo()" class="draggable-list__button_final">
                            <span class="draggable-list__button-repeat">Повторить</span>
                            <img src="@app\assets\icons\repeat.svg" alt="repeat" />
                        </button>
                    </div>
                </div>
                <input @drop="drop($event)" @dragover="allowDrop($event)" v-model="answer"
                    class="task_block__wrapper_answer" />
            </template>
            <TaskResultBanner :img="getImageUrl('Cup.png')" :bg="getImageUrl('lesya.gif')" text="Прекрасно!"
                class="end-modal" v-else @next="next()" @hide="hide()"></TaskResultBanner>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
import gameActions from '@mixins/gameAction';
const { methods } = gameActions;
const { endGameRequest, startGameRequest, getCorrectAnswer } = methods;
const startGame = ref(true);
const firstListen = ref(true);

const countAnswers = ref(0);
const currSyllable = ref();
const played = ref([])

const syllables = ref({
    1: {
        1: { name: "РЕГ", audio: 'Task5/63.5.mp3', correct: null },
        2: { name: "МОД", audio: 'Task5/64.5.mp3', correct: null },
        3: { name: "ЛЁК", audio: 'Task5/65.5.mp3', correct: null },
        4: { name: "ЗИН", audio: 'Task5/66.5.mp3', correct: null },
        5: { name: "УПР", audio: 'Task5/67.5.mp3', correct: null },
    },
    2: {
        6: { name: "ИЗН", audio: 'Task5/68.5.mp3', correct: null },
        7: { name: "НОК", audio: 'Task5/69.5.mp3', correct: null },
        8: { name: "ВЕТ", audio: 'Task5/70.5.mp3', correct: null },
        9: { name: "РИС", audio: 'Task5/71.5.mp3', correct: null },
    },
    3: {
        10: { name: "ЗАП", audio: 'Task5/72.5.mp3', correct: null },
        11: { name: "МЫЙ", audio: 'Task5/73.5.mp3', correct: null },
        12: { name: "БУК", audio: 'Task5/74.5.mp3', correct: null },
        13: { name: "ОЛЬТ", audio: 'Task5/75.5.mp3', correct: null },
        14: { name: "ВЕЦ", audio: 'Task5/76.5.mp3', correct: null },
    }
})

const emit = defineEmits(['close', 'next-modal', 'correct', 'open']);
const is_correct = ref(null);
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

const getImageUrl = (path) => {
 return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};


const corrValue = ref(0);
const onSelection = (firstIndex, id) => {
    if (currSyllable.value == id && !firstListen.value) {
        firstListen.value = true;
        syllables.value[firstIndex][id].correct = true;
        setTimeout(() => syllables.value[firstIndex][temp].correct = null, 2000)
        // for(let i = 1; i<= 3; i++){
        //     for(const temp in syllables.value[i]){
        //         if(!syllables.value[i][temp].correct){
        //             syllables.value[i][temp].correct = null;
        //         }
        //     }
        // }
        countAnswers.value++;
        playAudio(`Common/1.${Math.floor(Math.random() * 3) + 1}.mp3`);
    } else if (!firstListen.value) {
        syllables.value[firstIndex][id].correct = false;
        setTimeout(() => syllables.value[firstIndex][temp].correct = null, 2000)
        playAudio(`Common/2.${Math.floor(Math.random() * 3) + 1}.mp3`);
    }
    if (countAnswers.value == 14) {
        setTimeout(() => {
            if (is_correct.value === false) {
                endGameRequest(props.childId, corrValue.value);
                emit('correct');
                emit('open');
            }
            startGame.value = false;
            playAudio('Task5/77.5_.mp3');
        }, 1000);
    }
}

const listenTo = () => {
    if (firstListen.value) {
        firstListen.value = false;
        let exist = true;
        while (exist) {
            currSyllable.value = Math.floor(Math.random() * 14 + 1);
            if (!played.value.includes(currSyllable.value)) exist = false;
        }
        played.value.push(currSyllable.value)
    }

    if ([1, 2, 3, 4, 5].includes(currSyllable.value)) {
        playAudio(syllables.value[1][currSyllable.value].audio);
    } else if ([6, 7, 8, 9].includes(currSyllable.value)) {
        playAudio(syllables.value[2][currSyllable.value].audio);
    } else {
        playAudio(syllables.value[3][currSyllable.value].audio);
    }
}

const playAudio = (audioPath) => {
    const audio = new Audio();
    audio.src = new URL(`/assets/audio/${audioPath}`, import.meta.url).href;
    audio.play();
}

const hide = () => {
    emit('close');
};

const next = () => {
    emit('next-modal');
}

onMounted(async () => {
    const correct = await getCorrectAnswer(5, props.childId);
    corrValue.value = correct.correctId;
    is_correct.value = correct.is_correct;
})
</script>

<style lang="scss" scoped>
*{
    user-select: none;
}

.end-modal {
    width: 1200px;
    height: 600px;
}

.correct_select {
    border: 2px solid;
    border-color: #5CCF54;
}

.not_correct_select {
    border: 2px solid;
    border-color: #DB0000;
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
    width: 632px;
    height: 200px;
    gap: 40px;

    @media (max-width: 1024px) {
        height: 184px;
        gap: 32px;
    }
}

.draggable-list__item1,
.draggable-list__item2,
.draggable-list__item3 {
    display: flex;
    justify-content: space-between;
    gap: 60px;
    height: 40px;
}

.draggable-list__item1 {
    width: 613px;
}


.draggable-list__item3 {
    width: 100%;
}

.draggable-list__item2 {
    width: 478px;
}

.draggable-list__button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 40px;
    background-color: $blueGame;
    color: $darkBlue;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    letter-spacing: 0;
    border-radius: 6px;
    font-weight: bold;
    line-height: 40px;
    padding: 8px 16px;
}

.FifthTask {
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
</style>

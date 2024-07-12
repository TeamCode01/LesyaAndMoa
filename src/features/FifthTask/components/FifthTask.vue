<template>
    <div class="FifthTask task_block">
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
                    <p class="title-h4 task_block__title">
                        Найди произносимые слоги.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="draggable-list__items">
                        <div class="draggable-list__item1">
                            <button @click="onSelection(0)" 
                            :class="{'draggable-list__button': true, correct_select: selection.correct[0], not_correct_select: selection.notCorrect[0]}"
                            >РЕГ</button>
                            <button @click="onSelection(1)"
                            :class="{'draggable-list__button': true, correct_select: selection.correct[1], not_correct_select: selection.notCorrect[1]}"
                            >МОД</button>
                            <button @click="onSelection(2)"
                            :class="{'draggable-list__button': true, correct_select: selection.correct[2], not_correct_select: selection.notCorrect[2]}"
                            >ЛЁК</button>
                            <button @click="onSelection(3)"
                            :class="{'draggable-list__button': true, correct_select: selection.correct[3], not_correct_select: selection.notCorrect[3]}"
                            >ЗИН</button>
                            <button @click="onSelection(4)"
                            :class="{'draggable-list__button': true, correct_select: selection.correct[4], not_correct_select: selection.notCorrect[4]}"
                            >УПР</button>
                        </div>
                        <div class="draggable-list__item2">
                            <button @click="onSelection(5)"
                            :class="{'draggable-list__button': true, correct_select: selection.correct[5], not_correct_select: selection.notCorrect[5]}"
                            >ИЗН</button
                            ><button @click="onSelection(6)"
                            :class="{'draggable-list__button': true, correct_select: selection.correct[6], not_correct_select: selection.notCorrect[6]}"
                            >НОК</button
                            ><button @click="onSelection(7)"
                            :class="{'draggable-list__button': true, correct_select: selection.correct[7], not_correct_select: selection.notCorrect[7]}"
                            >ВЕТ</button
                            ><button @click="onSelection(8)"
                            :class="{'draggable-list__button': true, correct_select: selection.correct[8], not_correct_select: selection.notCorrect[8]}"
                            >РИС</button>
                        </div>
                        <div class="draggable-list__item3">
                            <button @click="onSelection(9)"
                            :class="{'draggable-list__button': true, correct_select: selection.correct[9], not_correct_select: selection.notCorrect[9]}"
                            >ЗАП</button
                            ><button @click="onSelection(10)"
                            :class="{'draggable-list__button': true, correct_select: selection.correct[10], not_correct_select: selection.notCorrect[10]}"
                            >МЫЙ</button
                            ><button @click="onSelection(11)"
                            :class="{'draggable-list__button': true, correct_select: selection.correct[11], not_correct_select: selection.notCorrect[11]}"
                            >БУК</button
                            ><button @click="onSelection(12)"
                            :class="{'draggable-list__button': true, correct_select: selection.correct[12], not_correct_select: selection.notCorrect[12]}"
                            >ОЛЬТ</button
                            ><button @click="onSelection(13)"
                            :class="{'draggable-list__button': true, correct_select: selection.correct[13], not_correct_select: selection.notCorrect[13]}"
                            >ВЕЦ</button>
                        </div>
                    </div>
                    <div v-if="firstListen">
                        <button @click="listenTo()" class="draggable-list__button_final">
                            <span class="draggable-list__button-speaker"
                                >Прослушать</span
                            >
                            <img
                                src="@app\assets\icons\speaker.svg"
                                alt="speaker"
                            />
                        </button>
                    </div>
                    <div v-else>
                        <button @click="listenTo()" class="draggable-list__button_final">
                            <span class="draggable-list__button-repeat"
                                >Повторить</span
                            >
                            <img
                                src="@app\assets\icons\repeat.svg"
                                alt="repeat"
                            />
                        </button>
                    </div>
                </div>
                <input
                    @drop="drop($event)"
                    @dragover="allowDrop($event)"
                    v-model="answer"
                    class="task_block__wrapper_answer"
                />
            </template>
            <TaskResultBanner img="/assets/backgrounds/cup.png" bg="/assets/backgrounds/lesya.gif" text="Прекрасно!"
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
const firstListen = ref(true);

const countAnswers = ref(0);
const currSyllable = ref();
const played = ref([])

const selection = ref({
    correct: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
    },
    notCorrect: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
    }
})

const syllables = [
    { name: "РЕГ", audio: '/assets/audio/Task5/63.5.mp3' },
    { name: "МОД", audio: '/assets/audio/Task5/64.5.mp3' },
    { name: "ЛЁК", audio: '/assets/audio/Task5/65.5.mp3' },
    { name: "ЗИН", audio: '/assets/audio/Task5/66.5.mp3' },
    { name: "УПР", audio: '/assets/audio/Task5/67.5.mp3' },
    { name: "ИЗН", audio: '/assets/audio/Task5/68.5.mp3' },
    { name: "НОК", audio: '/assets/audio/Task5/69.5.mp3' },
    { name: "ВЕТ", audio: '/assets/audio/Task5/70.5.mp3' },
    { name: "РИС", audio: '/assets/audio/Task5/71.5.mp3' },
    { name: "ЗАП", audio: '/assets/audio/Task5/72.5.mp3' },
    { name: "МЫЙ", audio: '/assets/audio/Task5/73.5.mp3' },
    { name: "БУК", audio: '/assets/audio/Task5/74.5.mp3' },
    { name: "ОЛЬТ", audio: '/assets/audio/Task5/75.5.mp3' },
    { name: "ВЕЦ", audio: '/assets/audio/Task5/76.5.mp3' },

]

const emit = defineEmits(['close']);

const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
});

const onSelection = (id) => {
    if(currSyllable.value === id) {
        firstListen.value = true;
        selection.value.correct[id] = true;
        for (const temp in selection.value.notCorrect) {
            selection.value.notCorrect[temp] = false;
        }
        countAnswers.value++;
        playAudio(`/assets/audio/Common/1.${Math.floor(Math.random() * 3) + 1}.mp3`);
    } else {
        selection.value.notCorrect[id] = true;
        playAudio(`/assets/audio/Common/2.${Math.floor(Math.random() * 3) + 1}.mp3`);
    }
    if(countAnswers.value == 14){
        startGame.value = false;
        playAudio('/assets/audio/Task5/77.5_.mp3');
    }
}

const listenTo = () => {
    if (firstListen.value) {
        firstListen.value = false;
        let exist = true;
        while (exist) {
            currSyllable.value = Math.floor(Math.random() *14);
            if(!played.value.includes(currSyllable.value)) exist = false;
        }
        played.value.push(currSyllable.value)
    }
    playAudio(syllables[currSyllable.value].audio);
}

const playAudio = (audioPath) => {
    const audio = new Audio(audioPath);
    audio.play();
}

const hide = () => {
    emit('close');
};
</script>

<style lang="scss" scoped>
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

<template>
    <div class="FourthTask task_block">
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
                            :class="{'draggable-list__button': true, correct_select: selection.correct[0], not_correct_select: selection.notCorrect[0]}">ШО</button>
                            <button @click="onSelection(1)" 
                            :class="{'draggable-list__button': true, correct_select: selection.correct[1], not_correct_select: selection.notCorrect[1]}">БА</button>
                            <button @click="onSelection(2)" 
                            :class="{'draggable-list__button': true, correct_select: selection.correct[2], not_correct_select: selection.notCorrect[2]}">ГЮ</button>
                            <button @click="onSelection(3)" 
                            :class="{'draggable-list__button': true, correct_select: selection.correct[3], not_correct_select: selection.notCorrect[3]}">ЛЫ</button>
                            <button @click="onSelection(4)" 
                            :class="{'draggable-list__button': true, correct_select: selection.correct[4], not_correct_select: selection.notCorrect[4]}">ХА</button>
                        </div>
                        <div class="draggable-list__item2">
                            <button @click="onSelection(5)" 
                            :class="{'draggable-list__button': true, correct_select: selection.correct[5], not_correct_select: selection.notCorrect[5]}">ДЯ</button
                            ><button @click="onSelection(6)" 
                            :class="{'draggable-list__button': true, correct_select: selection.correct[6], not_correct_select: selection.notCorrect[6]}">ЩИ</button
                            ><button @click="onSelection(7)" 
                            :class="{'draggable-list__button': true, correct_select: selection.correct[7], not_correct_select: selection.notCorrect[7]}">ФО</button
                            ><button @click="onSelection(8)" 
                            :class="{'draggable-list__button': true, correct_select: selection.correct[8], not_correct_select: selection.notCorrect[8]}">ЖУ</button>
                        </div>
                        <div class="draggable-list__item3">
                            <button @click="onSelection(9)" 
                            :class="{'draggable-list__button': true, correct_select: selection.correct[9], not_correct_select: selection.notCorrect[9]}">ЗИ</button
                            ><button @click="onSelection(10)" 
                            :class="{'draggable-list__button': true, correct_select: selection.correct[10], not_correct_select: selection.notCorrect[10]}">ТЬ</button
                            ><button @click="onSelection(11)" 
                            :class="{'draggable-list__button': true, correct_select: selection.correct[11], not_correct_select: selection.notCorrect[11]}">ВЕ</button
                            ><button @click="onSelection(12)" 
                            :class="{'draggable-list__button': true, correct_select: selection.correct[12], not_correct_select: selection.notCorrect[12]}">КЕ</button
                            ><button @click="onSelection(13)" 
                            :class="{'draggable-list__button': true, correct_select: selection.correct[13], not_correct_select: selection.notCorrect[13]}">РЮ</button>
                        </div>
                    </div>
                    <div v-if="firstListen">
                        <button class="draggable-list__button_final" @click="listenTo()">
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
                        <button class="draggable-list__button_final" @click="listenTo()">
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
            <TaskResultBanner img="/assets/backgrounds/flowers.png" bg="/assets/backgrounds/moa.gif" text="Здорово!"
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
const emit = defineEmits(['close']);
const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
});

const countAnswers = ref(0);

const currSyllable = ref();
const played = ref([])
const syllables = [
    { id: 1, name: "ШО", audio: '/assets/audio/Task4/46.4.mp3'},
    { id: 2, name: "БА", audio: '/assets/audio/Task4/47.4.mp3'},
    { id: 3, name: "ГЮ", audio: '/assets/audio/Task4/48.4.mp3'},
    { id: 4, name: "ЛЫ", audio: '/assets/audio/Task4/49.4.mp3'},
    { id: 5, name: "ХА", audio: '/assets/audio/Task4/50.4.mp3'},
    { id: 6, name: "ДЯ", audio: '/assets/audio/Task4/51.4.mp3'},
    { id: 7, name: "ЩИ", audio: '/assets/audio/Task4/52.4.mp3'},
    { id: 8, name: "ФО", audio: '/assets/audio/Task4/53.4.mp3'},
    { id: 9, name: "ХУ", audio: '/assets/audio/Task4/54.4.mp3'},
    { id: 10, name: "ЗИ", audio: '/assets/audio/Task4/55.4.mp3'},
    { id: 11, name: "ТЬ", audio: '/assets/audio/Task4/56.4.mp3'},
    { id: 12, name: "ВЕ", audio: '/assets/audio/Task4/57.4.mp3'},
    { id: 13, name: "КЕ", audio: '/assets/audio/Task4/58.4.mp3'},
    { id: 14, name: "РЮ", audio: '/assets/audio/Task4/59.4.mp3'},
];

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
        playAudio('/assets/audio/Task4/60.4_.mp3');
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
    width: 540px;
    height: 200px;
    gap: 40px;
    @media (max-width: 1024px) {
        gap: 32px;
    }
}

.draggable-list__item1,
.draggable-list__item2,
.draggable-list__item3 {
    display: flex;
    justify-content: space-between;
    gap: 60px;
}

.draggable-list__item1,
.draggable-list__item3 {
    width: 100%;
    height: 40px;
}

.draggable-list__item2 {
    width: 420px;
    height: 40px;
}

.draggable-list__button {
    text-align: center;
    width: 60px;
    height: 40px;
    background-color: $lightPink;
    color: $vihous;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    letter-spacing: 0;
    border-radius: 6px;
    font-weight: bold;
    line-height: 40px;
}

.FourthTask {
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

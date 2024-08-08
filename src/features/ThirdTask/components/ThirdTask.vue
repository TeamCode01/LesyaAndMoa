<template>
    <div class="ThirdTask task_block">
        <div class="task_block__wrapper">
            <template v-if="endGame === false">
                <div class="task_block__close" @click="hide">
                    <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
                </div>
                <div class="task_block__time">

                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title ThirdTask__title">
                        Распредели звуки по коробкам на образуемые с помощью только
                        шума, голоса и шума, только голоса.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="list-group ThirdTask__wrapper_block">
                        <q-btn v-for="(item, index) in letters" :key="index" :id="item.id + '_elem'"
                            class="list-group-item item" draggable="true" @mouseover="playAudio(item.audio)"
                            @mouseout="stopAudio(item.audio)" @dragstart="drag($event, item.name, item.id, index)"
                            @dragover.prevent :value="item.name">
                            {{ item.name }}
                        </q-btn>
                    </div>
                </div>
                <div class="ThirdTask__answer">
                    <div class="box" id="box" @mouseover="playAudio('/assets/audio/Task3/32.3_слово.mp3')"
                        @drop="drop($event, 0)" @dragover="allowDrop($event)">
                        <div class="letter__item" v-for="item in array">
                            {{ item }}
                        </div>
                    </div>
                    <div class="box2" id="box2" @mouseover="playAudio('/assets/audio/Task3/32.3_вариант.mp3')"
                        @drop="drop($event, 1)" @dragover="allowDrop($event)">
                        <div class="letter__item" v-for="item in array_two">
                            {{ item }}
                        </div>
                    </div>
                    <div class="box3" id="box3" @mouseover="playAudio('/assets/audio/Task3/33.3.mp3')"
                        @drop="drop($event, 2)" @dragover="allowDrop($event)">
                        <div class="letter__item" v-for="item in array_three">
                            {{ item }}
                        </div>
                    </div>
                </div>
            </template>
            <TaskResultBanner img="/assets/backgrounds/king.png" bg="/assets/backgrounds/Lesya.png" text="Великолепно!"
                v-else @next="next()" @hide="hide" class="end-modal"></TaskResultBanner>
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
const { endGameRequest, startGameRequest,  getCorrectAnswer } = methods;
const emit = defineEmits(['close', 'next-modal', 'correct']);
const endGame = ref(false);
const audio = ref(new Audio());
const hide = () => {
    emit('close');
    endGame.value = true;
};

const next = () => {
    emit('next-modal', is_started.value);
    endGame.value = true;
}

const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
    finish: {
        type: Boolean,
    },
    childId: {
        type: Number,
        required: false,
    }
});


const is_correct = ref(null);
const is_started = ref(null);


const playAudio = async (audioPath) => {
    audio.value.src = audioPath;
    if (props.finish === true) {
        await audio.value.play();
    }
}
const stopAudio = (audioPath) => {
    if (audio.value.paused) {
        playAudio(audioPath);
    } else {
        audio.value.pause();
    }
}

const playEndAudio = (audioPath) => {
    const end_audio = new Audio();
    end_audio.src = audioPath;
    end_audio.play();
}



const letters = ref([{ id: 1, name: 'к', type: 'глухой', audio: '/assets/audio/Task3/34.3.mp3' }, { id: 2, name: 'ч', type: 'глухой', audio: '/assets/audio/Task3/35.3.mp3' }, { id: 3, name: 'с', type: 'глухой', audio: '/assets/audio/Task3/36.3.mp3' }, { id: 4, name: 'о', type: 'звонкий', audio: '/assets/audio/Task3/37.3.mp3' }, { id: 5, name: 'ф', type: 'глухой', audio: '/assets/audio/Task3/38.3.mp3' }, { id: 6, name: 'з', type: 'средний', audio: '/assets/audio/Task3/39.3.mp3' }, { id: 7, name: 'и', type: 'звонкий', audio: '/assets/audio/Task3/40.3.mp3' }, { id: 8, name: 'г', type: 'средний', audio: '/assets/audio/Task3/41.3.mp3' }, { id: 9, name: 'д', type: 'средний', audio: '/assets/audio/Task3/42.3.mp3' }])
const answer = ref('');
const array = ref([]);
const array_two = ref([]);
const array_three = ref([]);

let correctId = ref(0);
const corrValue = ref(0);

const array_result = ref([{ name: 'к', type: 'глухой' }, { name: 'ч', type: 'глухой' }, { name: 'с', type: 'глухой' }, { name: 'ф', type: 'глухой' }]);
const array_two_result = ref([{ name: 'г', type: 'средний' }, { name: 'д', type: 'средний' }, { name: 'з', type: 'средний' }]);
const array_three_result = ref([{ name: 'о', type: 'звонкий' }, { name: 'и', type: 'звонкий' }]);
const dropIndex = ref(letters.value.length - 1);
const drag = (event, letter, id, index) => {
    event.dataTransfer.setData('text', letter);
    event.dataTransfer.setData('id', id);
    dropIndex.value = index;
};

const drop = (event, index) => {
    event.preventDefault();
    let letter = event.dataTransfer.getData('text');
    let id = event.dataTransfer.getData('id');
    let elem = document.getElementById(id + '_elem');
    if (array_result.value.find((item) => item.name === letter) && index === 0) {
        // elem.classList.add('green');
        array.value.push(letter);
        letters.value.splice(dropIndex.value, 1)
        // setTimeout(() => {
        //     elem.classList.remove('green');
        // }, 2000);
        playEndAudio('/assets/audio/Other/1. общее для разных заданий.mp3');

    } else if (array_two_result.value.find((item) => item.name === letter) && index === 1) {
        // elem.classList.add('green');
        // setTimeout(() => {
        //     elem.classList.remove('green');
        // }, 2000);
        array_two.value.push(letter);
        letters.value.splice(dropIndex.value, 1)
        playEndAudio('/assets/audio/Other/1. общее для разных заданий.mp3');
    }
    else if (array_three_result.value.find((item) => item.name === letter) && index === 2) {
        // elem.classList.add('green');
        // setTimeout(() => {
        //     elem.classList.remove('green');
        // }, 2000);
        array_three.value.push(letter);
        letters.value.splice(dropIndex.value, 1)

        playEndAudio('/assets/audio/Other/1. общее для разных заданий.mp3');

    } else {
        elem.classList.add('red');
        setTimeout(() => {
            elem.classList.remove('red');
        }, 2000);
        playEndAudio('/assets/audio/Other/2. общее для разных заданий.mp3');

        return false;
    }
    if (array.value.length === array_result.value.length && array_two.value.length === array_two_result.value.length && array_three.value.length === array_three_result.value.length) {
        emit('correct',  is_correct.value);
        setTimeout(() => {
            endGameRequest(props.childId, corrValue.value);
            endGame.value = true;
        }, 1500)
    }


};

const allowDrop = (event) => {
    event.preventDefault();
};

onMounted(async() => {
    const correct = await getCorrectAnswer(3, props.childId);
    corrValue.value = correct.correctId;
    is_correct.value = correct.is_correct;
    is_started.value = correct.is_started;
    await getCorrectAnswer(3, props.childId, correctId.value);
})
</script>
<style lang="scss" scoped>
.end-modal {
    width: 1200px;
    height: 600px;
}

.box {
    background-image: url('@app/assets/creatures/box1.png');
    width: 279px;
    height: 226px;
    display: grid;
    grid-template-columns: 55px 2px;
    row-gap: 4px;
    padding: 110px 40px;
    z-index: 999;

    @media (max-width: 1024px) {
        width: 250px;
        height: 186px;
    }
}

.box2 {
    background-image: url('@app/assets/creatures/box2.png');
    width: 279px;
    height: 226px;
    display: grid;
    grid-template-columns: 55px 2px;
    row-gap: 4px;
    padding: 110px 40px;
    z-index: 999;

    @media (max-width: 1024px) {
        width: 250px;
        height: 186px;
    }
}

.box3 {
    background-image: url('@app/assets/creatures/box3.png');
    width: 279px;
    height: 226px;
    display: grid;
    grid-template-columns: 55px 2px;
    row-gap: 4px;
    padding: 110px 40px;
    z-index: 999;

    @media (max-width: 1024px) {
        width: 250px;
        height: 186px;
    }
}

.ThirdTask {
    &__answer {
        display: flex;
        justify-content: center;
        column-gap: 50px;

        @media (max-width: 1024px) {
            column-gap: 25px;
        }
    }

    &__wrapper {
        padding: 30px 133px 58px 133px;
        position: relative;

        @media (max-width: 1024px) {
            padding: 30px 0px;
        }

        &_block {
            display: flex;
            justify-content: center;
            column-gap: 40px;
            margin-top: 60px;
            margin-bottom: 88px;

            @media (max-width: 1024px) {
                margin-top: 32px;
                margin-bottom: 64px;
            }
        }
    }
}

.item {
    background-color: $lightPink;
    text-transform: uppercase;
    padding: 9px 17px;
    color: $vihous;
    font-size: 24px;
    font-weight: 800;
    font-family: 'Nunito', sans-serif;
    border-radius: 6px;
    border: none;
    cursor: pointer;

}

.letter__item {
    width: 48px;
    height: 48px;
    border: 1.5px solid #a8664a;
    font-family: 'Nunito', sans-serif;
    font-weight: bold;
    font-size: 24px;
    color: #a8664a;
    padding: 4px 15px;
    z-index: 998;
    border-radius: 6px;
    text-align: center;
}
</style>

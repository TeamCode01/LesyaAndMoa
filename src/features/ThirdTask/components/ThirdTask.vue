<template>
    <template v-if="endGame === false">
        <div class="ThirdTask task_block">
            <div class="ThirdTask__wrapper">
                <div class="task_block__close" @click="hide">
                    <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 ThirdTask__title">
                        Распредели звуки по коробкам на образуемые с помощью только
                        шума, голоса и шума, только голоса.
                    </p>
                </div>

                <div class="draggable-list">
                    <div class="list-group ThirdTask__wrapper_block">
                        <q-btn v-for="(item, index) in letters" :key="index" class="list-group-item item"
                            draggable="true" @dragstart="drag($event, item.name, index)" @dragover.prevent
                            :value="item">
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
                    <div class="box2" id="box2" @drop="drop($event, 1)" @dragover="allowDrop($event)">
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
            </div>
        </div>
    </template>
    <TaskResultBanner img="/assets/backgrounds/king.png" bg="/assets/backgrounds/Lesya.png" text="Великолепно!"
        v-if="show === true" @hide="hideModal"></TaskResultBanner>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
const emit = defineEmits(['close']);

const hide = () => {
    emit('close');
    endGame.value = true;
};

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


const endGame = ref(false);
const show = ref(false);
const hideModal = () => {
    show.value = false;
}

const letters = ref([{ name: 'к', type: 'глухой' }, { name: 'ч', type: 'глухой' }, { name: 'с', type: 'глухой' }, { name: 'о', type: 'звонкий' }, { name: 'ф', type: 'глухой' }, { name: 'з', type: 'средний' }, { name: 'и', type: 'звонкий' }, { name: 'г', type: 'средний' }, { name: 'д', type: 'средний' }])
const answer = ref('');
const array = ref([]);
const array_two = ref([]);
const array_three = ref([]);

const array_result = ref([{ name: 'к', type: 'глухой' }, { name: 'ч', type: 'глухой' }, { name: 'с', type: 'глухой' }, { name: 'ф', type: 'глухой' }]);
const array_two_result = ref([{ name: 'г', type: 'средний' }, { name: 'д', type: 'средний' }, { name: 'з', type: 'средний' }]);
const array_three_result = ref([{ name: 'о', type: 'звонкий' }, { name: 'и', type: 'звонкий' }]);
const dropIndex = ref(letters.value.length - 1);
const drag = (event, letter, index) => {
    event.dataTransfer.setData('text', letter);
    dropIndex.value = index;
};

const drop = (event, index) => {
    event.preventDefault();
    let letter = event.dataTransfer.getData('text');
    event.target.value = letter;
    console.log(letter, event.target.value);
    if (array_result.value.find((item) => item.name === letter) && index == 0) {
        array.value.push(letter);
        letters.value.splice(dropIndex.value, 1);
        playAudio('assets/audio/Other/1. общее для разных заданий.mp3');

    } else if (array_two_result.value.find((item) => item.name === letter) && index == 1) {
        array_two.value.push(letter);
        letters.value.splice(dropIndex.value, 1);
        playAudio('assets/audio/Other/1. общее для разных заданий.mp3');
    }
    else if (array_three_result.value.find((item) => item.name === letter) && index == 2) {
        array_three.value.push(letter);
        letters.value.splice(dropIndex.value, 1);
        playAudio('assets/audio/Other/1. общее для разных заданий.mp3');

    } else {
        playAudio('assets/audio/Other/2. общее для разных заданий.mp3');
        event.target.classList.add('red');
        setTimeout(() => {
            event.target.classList.remove('red');
        }, 2000);
        return false;
    }

    event.target.classList.add('green');
    setTimeout(() => {
        event.target.classList.remove('green');
    }, 2000);

    if (array.value.length == array_result.value.length && array_two.value.length == array_two_result.value.length && array_three.value.length == array_three_result.value.length) {
        setTimeout(() => {
            show.value = true;
            endGame.value = true;
        }, 3000)
    }


};

const allowDrop = (event) => {
    event.preventDefault();
};
</script>
<style lang="scss" scoped>
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

.red {
    border: 2px solid red;
    // width: 48px;
    // height: 48px;
    // font-family: 'Nunito', sans-serif;
    // font-weight: bold;
    // font-size: 24px;
    // color: #a8664a;
    // padding: 7.5px 15px;
    // z-index: 998;
    // border-radius: 6px;
}

.green {
    border: 2px solid green;
    // width: 48px;
    // height: 48px;
    // font-family: 'Nunito', sans-serif;
    // font-weight: bold;
    // font-size: 24px;
    // color: #a8664a;
    // padding: 7.5px 15px;
    // z-index: 998;
    // border-radius: 6px;
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
    padding: 7.5px 15px;
    z-index: 998;
    border-radius: 6px;
}
</style>

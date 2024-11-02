<template>
    <div class="ThirdTask task_block">
        <div class="task_block__wrapper">
            <template v-if="endGame === false">
                <div class="task_block__close" @click="hide">
                    <img
                        class="close-icon"
                        src="@app/assets/icons/close-icon.svg"
                        alt="крест"
                    />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title ThirdTask__title">
                        Распредели звуки по коробкам на образуемые с помощью
                        только шума, голоса и шума, только голоса.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="list-group ThirdTask__wrapper_block">
                        <VueDraggableNext
                            v-for="(item, index) in letters"
                            :key="index"
                            @choose="drag($event, item.name, item.id, index)"
                            :group="{
                                name: 'words',
                                pull: 'clone',
                                put: false,
                            }"
                            :sort="false"
                            @mouseover="playAudio(item.audio)"
                            @mouseout="stopAudio(item.audio)"
                            @touchstart="playAudio(item.audio)"
                            @touchcancel="stopAudio(item.audio)"
                        >
                            <div
                                :id="item.id + '_elem'"
                                class="list-group-item item"
                                :value="item.name"
                            >
                                {{ item.name }}
                            </div>
                        </VueDraggableNext>
                    </div>
                </div>
                <div class="ThirdTask__answer">
                    <VueDraggableNext
                        class="box"
                        id="box"
                        @mouseenter="playAudio('Task3/32.3_слово.mp3')"
                        @add="drop($event, 0)"
                        :group="{ name: 'box', pull: false, put: true }"
                        :sort="false"
                        ghost-class="none"
                        draggable="false"
                    >
                        <div class="letter__item" v-for="item in array">
                            {{ item }}
                        </div>
                    </VueDraggableNext>
                    <VueDraggableNext
                        class="box2"
                        id="box2"
                        @mouseover="playAudio('Task3/mix.mp3')"
                        @add="drop($event, 1)"
                        :group="{ name: 'box2', pull: false, put: true }"
                        :sort="false"
                        ghost-class="none"
                        draggable="false"
                    >
                        <div class="letter__item" v-for="item in array_two">
                            {{ item }}
                        </div>
                    </VueDraggableNext>
                    <VueDraggableNext
                        class="box3"
                        id="box3"
                        @mouseover="playAudio('Task3/33.3.mp3')"
                        @add="drop($event, 2)"
                        :group="{ name: 'box3', pull: false, put: true }"
                        :sort="false"
                        ghost-class="none"
                        draggable="false"
                    >
                        <div class="letter__item" v-for="item in array_three">
                            {{ item }}
                        </div>
                    </VueDraggableNext>
                </div>
            </template>
            <TaskResultBanner
                :img="getImageUrl('king.png')"
                :bg="getImageUrl('lesya.gif')"
                text="Великолепно!"
                v-else
                @next="next()"
                @hide="hide"
                class="end-modal"
            ></TaskResultBanner>
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
const emit = defineEmits(['close', 'next-modal', 'correct', 'open']);
const endGame = ref(false);
const audio = ref(new Audio());
const hide = () => {
    emit('close');
    endGame.value = true;
};

const next = () => {
    emit('next-modal');
    endGame.value = true;
};

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
    },
});

const is_correct = ref(false);

const getImageUrl = (path) => {
    return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};

const playAudio = async (audioPath) => {
    audio.value.src = new URL(
        `/assets/audio/${audioPath}`,
        import.meta.url,
    ).href;
    if (props.finish === true) {
        await audio.value.play();
    }
};
const stopAudio = (audioPath) => {
    if (audio.value.paused) {
        playAudio(audioPath);
    } else {
        audio.value.pause();
    }
};

const end_audio = new Audio();
const playEndAudio = (audioPath) => {
    end_audio.src = new URL(`/assets/audio/${audioPath}`, import.meta.url).href;
    end_audio.play();
};

const letters = ref([
    { id: 1, name: 'к', type: 'глухой', audio: 'Task3/34.3.mp3' },
    { id: 2, name: 'ч', type: 'глухой', audio: 'Task3/35.3.mp3' },
    { id: 3, name: 'с', type: 'глухой', audio: 'Task3/36.3.mp3' },
    { id: 4, name: 'о', type: 'звонкий', audio: 'Task3/37.3.mp3' },
    { id: 5, name: 'ф', type: 'глухой', audio: 'Task3/38.3.mp3' },
    { id: 6, name: 'з', type: 'средний', audio: 'Task3/39.3.mp3' },
    { id: 7, name: 'и', type: 'звонкий', audio: 'Task3/40.3.mp3' },
    { id: 8, name: 'г', type: 'средний', audio: 'Task3/41.3.mp3' },
    { id: 9, name: 'д', type: 'средний', audio: 'Task3/42.3.mp3' },
]);
const answer = ref('');
const array = ref([]);
const array_two = ref([]);
const array_three = ref([]);
const corrValue = ref(0);

const array_result = ref([
    { name: 'к', type: 'глухой' },
    { name: 'ч', type: 'глухой' },
    { name: 'с', type: 'глухой' },
    { name: 'ф', type: 'глухой' },
]);
const array_two_result = ref([
    { name: 'г', type: 'средний' },
    { name: 'д', type: 'средний' },
    { name: 'з', type: 'средний' },
]);
const array_three_result = ref([
    { name: 'о', type: 'звонкий' },
    { name: 'и', type: 'звонкий' },
]);
const dropIndex = ref(letters.value.length - 1);

const dataTransfer = ref({});
const drag = (event, letter, id, index) => {
    // event.dataTransfer.setData('text', letter);
    // event.dataTransfer.setData('id', id);

    console.log(letter, id, index);

    dataTransfer.value.letter = letter;
    dataTransfer.value.id = id;
    dropIndex.value = index;
};

const drop = (event, index) => {
    // let letter = event.dataTransfer.getData('text');
    // let id = event.dataTransfer.getData('id');

    let letter = dataTransfer.value.letter;
    let id = dataTransfer.value.id;

    let elem = document.getElementById(id + '_elem');
    Array.from(event.to.children).forEach((element) => {
        if (element.className.includes('list-group-item item')) {
            event.to.removeChild(element);
        }
    });

    if (
        array_result.value.find((item) => item.name === letter) &&
        index === 0
    ) {
        // elem.classList.add('green');
        array.value.push(letter);
        console.log(letter);
        // setTimeout(() => {
        //letters.value.splice(dropIndex.value, 1)
        // setTimeout(() => {
        //     elem.classList.remove('green');
        // }, 2000);
        playEndAudio('Other/1. общее для разных заданий.mp3');

        Array.from(event.from.children).forEach((element) => {
            if (element.id == id + '_elem') event.from.removeChild(element);
        });
    } else if (
        array_two_result.value.find((item) => item.name === letter) &&
        index === 1
    ) {
        // elem.classList.add('green');
        // setTimeout(() => {
        //     elem.classList.remove('green');
        // }, 2000);
        array_two.value.push(letter);
        //letters.value.splice(dropIndex.value, 1)

        Array.from(event.from.children).forEach((element) => {
            if (element.id == id + '_elem') event.from.removeChild(element);
        });

        playEndAudio('Other/1. общее для разных заданий.mp3');
    } else if (
        array_three_result.value.find((item) => item.name === letter) &&
        index === 2
    ) {
        // elem.classList.add('green');
        // setTimeout(() => {
        //     elem.classList.remove('green');
        // }, 2000);
        array_three.value.push(letter);
        //letters.value.splice(dropIndex.value, 1)

        Array.from(event.from.children).forEach((element) => {
            if (element.id == id + '_elem') event.from.removeChild(element);
        });

        playEndAudio('Other/1. общее для разных заданий.mp3');
    } else {
        elem.classList.add('red');
        elem.classList.add('item-active');
        setTimeout(() => {
            elem.classList.remove('red');
            elem.classList.remove('item-active');
        }, 2000);
        playEndAudio('Other/2. общее для разных заданий.mp3');

        return false;
    }

    if (
        array.value.length === array_result.value.length &&
        array_two.value.length === array_two_result.value.length &&
        array_three.value.length === array_three_result.value.length
    ) {
        setTimeout(() => {
            endGame.value = true;
            playAudio('Task3/43.3_.mp3');
            if (is_correct.value === false) {
                endGameRequest(props.childId, corrValue.value);
                emit('correct');
                emit('open');
            }
        }, 1000);
    }
};

const allowDrop = (event) => {
    event.preventDefault();
};

onMounted(async () => {
    try {
        const correct = await getCorrectAnswer(3, props.childId);
        if (correct) {
            corrValue.value = correct.correctId;
            is_correct.value = correct.is_correct;
        } else {
            console.error('getCorrectAnswer returned undefined');
        }
    } catch (err) {
        console.error('Error fetching correct answer:', err);
    }
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.style.setProperty(
        '--scroll-position',
        `${scrollY}px`,
    );
    document.getElementsByTagName('html')[0].classList.add('no-scroll');
    document.body.classList.add('no-scroll'); /* Прокрутка ставится на паузу */

    console.log('game mount');
});

onBeforeUnmount(() => {
    document.getElementsByTagName('html')[0].classList.remove('no-scroll');
    document.body.classList.remove('no-scroll'); /* Прокрутка возвращается */
    end_audio.src = '';
    console.log('game unmount');
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
        padding-top: 88px;
        position: fixed;
        bottom: 70px;
        left: 50%;
        transform: translate(-50%);

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

            @media (max-width: 1024px) {
                margin-top: 32px;
                // margin-bottom: 64px;
            }
        }
    }
}

// .draggable-list {
//     margin-bottom: 88px;
// }

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
    max-height: 54px;
}

.item-active {
    padding: 7px 15px;
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

.none {
    display: none;
}
</style>

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
                        <div
                            v-for="(line, line_index) in syllables"
                            :key="line_index"
                        >
                            <div
                                :class="{
                                    'draggable-list__item1': 1 == line_index,
                                    'draggable-list__item2': 2 == line_index,
                                    'draggable-list__item3': 3 == line_index,
                                }"
                            >
                                <button
                                    v-for="(item, item_index) in line"
                                    :key="item_index"
                                    @click="onSelection(line_index, item_index)"
                                    :class="{
                                        'draggable-list__button': true,
                                        correct_select: item.correct,
                                        not_correct_select:
                                            item.correct === false,
                                    }"
                                >
                                    {{ item.name }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-if="firstListen">
                        <button
                            class="draggable-list__button_final"
                            @click="listenTo()"
                        >
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
                        <button
                            class="draggable-list__button_final"
                            @click="listenTo()"
                        >
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
            </template>
            <TaskResultBanner
                :img="getImageUrl('flowers.png')"
                :bg="getImageUrl('moa.gif')"
                text="Здорово!"
                v-else
                @next="next()"
                @hide="hide()"
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

const startGame = ref(true);
const firstListen = ref(true);
const emit = defineEmits(['close', 'next-modal', 'correct', 'open']);
const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },

    childId: {
        type: Number,
        required: false,
    },
});

const countAnswers = ref(0);
const is_correct = ref(false);
const audio = ref(new Audio());
const endGame = ref(false);

const getImageUrl = (path) => {
    return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};

const playAudio = (audioPath) => {
    audio.value.src = new URL(
        `/assets/audio/${audioPath}`,
        import.meta.url,
    ).href;
    audio.value.play();
};
const corrValue = ref(0);

const next = () => {
    emit('next-modal');
    // endGame.value = true;
};

const currSyllable = ref();
const played = ref([]);
const syllables = ref({
    1: {
        1: { name: 'ШО', audio: 'Task4/46.4.mp3', correct: null },
        2: { name: 'БА', audio: 'Task4/47.4.mp3', correct: null },
        3: { name: 'ГЮ', audio: 'Task4/48.4.mp3', correct: null },
        4: { name: 'ЛЫ', audio: 'Task4/49.4.mp3', correct: null },
        5: { name: 'ХА', audio: 'Task4/50.4.mp3', correct: null },
    },
    2: {
        6: { name: 'ДЯ', audio: 'Task4/51.4.mp3', correct: null },
        7: { name: 'ЩИ', audio: 'Task4/52.4.mp3', correct: null },
        8: { name: 'ФО', audio: 'Task4/53.4.mp3', correct: null },
        9: { name: 'ЖУ', audio: 'Task4/54.4.mp3', correct: null },
    },
    3: {
        10: { name: 'ЗИ', audio: 'Task4/55.4.new.mp3', correct: null },
        11: { name: 'ТЫ', audio: 'Task4/56.4.mp3', correct: null },
        12: { name: 'ВЕ', audio: 'Task4/57.4.mp3', correct: null },
        13: { name: 'КЕ', audio: 'Task4/58.4.mp3', correct: null },
        14: { name: 'РЮ', audio: 'Task4/59.4.mp3', correct: null },
    },
});

const onSelection = (firstIndex, id) => {
    if (currSyllable.value == id && !firstListen.value) {
        firstListen.value = true;
        syllables.value[firstIndex][id].correct = true;
        // setTimeout(() => syllables.value[firstIndex][id].correct = null, 2000)
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
        // setTimeout(() => syllables.value[firstIndex][id].correct = null, 2000)
        playAudio(`Common/2.${Math.floor(Math.random() * 3) + 1}.mp3`);
    }
    if (countAnswers.value == 14) {
        endGame.value = true;
        setTimeout(() => {
            startGame.value = false;
            playAudio('Task4/60.4_.mp3');
            if (is_correct.value === false) {
                endGameRequest(props.childId, corrValue.value);
                emit('correct');
                emit('open');
            }
        }, 1000);
    }
};

const listenTo = () => {
    if (endGame.value) return;
    if (firstListen.value) {
        firstListen.value = false;
        let exist = true;
        while (exist) {
            currSyllable.value = Math.floor(Math.random() * 14 + 1);
            if (!played.value.includes(currSyllable.value)) exist = false;
        }
        played.value.push(currSyllable.value);
    }

    if ([1, 2, 3, 4, 5].includes(currSyllable.value)) {
        playAudio(syllables.value[1][currSyllable.value].audio);
    } else if ([6, 7, 8, 9].includes(currSyllable.value)) {
        playAudio(syllables.value[2][currSyllable.value].audio);
    } else {
        playAudio(syllables.value[3][currSyllable.value].audio);
    }
};

const hide = () => {
    emit('close');
};


onMounted(async() => {
    try {
        const correct = await getCorrectAnswer(4, props.childId);
        console.log(correct);
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
    audio.value.src = '';
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
    display: flex;
    align-items: center;
    justify-content: center;

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

.correct_select {
    border: 2px solid;
    border-color: #5ccf54;
}

.not_correct_select {
    border: 2px solid;
    border-color: #db0000;
}
</style>

<template>
    <template v-if="endGame === false">
        <div class="FirstTask task_block">
            <div class="FirstTask__wrapper">
                <div class="task_block__close" @click="hide">
                    <img
                        class="close-icon"
                        src="@app/assets/icons/close-icon.svg"
                        alt="крест"
                    />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title FirstTask__title">
                        Составь рассказ про АЛФАВИТ из подходящих фраз.
                    </p>
                </div>

                <div class="draggable-list__wrapper">
                    <div class="draggable-list">
                        <VueDraggableNext
                            tag="div"
                            :group="{
                                name: 'words',
                                pull: 'clone',
                                put: false,
                            }"
                            :sort="false"
                            v-for="(item, index) in words"
                            :key="item.id"
                            @mouseenter="playAudio(item.audio)"
                            @mouseout="stopAudio(item.audio)"
                            @touchstart="playAudio(item.audio)"
                            @touchcancel="stopAudio(item.audio)"
                            @choose="
                                () => {
                                    drag(item.name, item.id, index);
                                }
                            "
                        >
                            <div
                                class="list-group-item item"
                                :id="item.id + '_elem'"
                                :value="item.name"
                            >
                                {{ item.name }}
                            </div>
                        </VueDraggableNext>
                    </div>
                    <VueDraggableNext
                        tag="div"
                        :group="{ name: 'answers', pull: false, put: true }"
                        :sort="false"
                        @add="
                            ($event) => {
                                drop($event);
                            }
                        "
                        :ghost-class="'none'"
                    >
                        <textarea
                            v-model="answer"
                            class="FirstTask__wrapper_answer"
                            style="display: flex; align-items: center"
                        />
                    </VueDraggableNext>
                </div>
            </div>
        </div>
    </template>
    <TaskResultBanner
        :img="getImageUrl('king.png')"
        :bg="getImageUrl('lesya.gif')"
        text="Отлично!"
        v-else
        @next="next()"
        @hide="hide()"
        class="end-modal"
    ></TaskResultBanner>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { HTTP } from '@app/http';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
import SmallDisplayBanner from '@features/SmallDisplayBanner/components/SmallDisplayBanner.vue';
import gameActions from '@mixins/gameAction';
import { useAnswerStore } from '@layouts/stores/answers.ts';
import { SvgIcon } from '@shared/components/svgIcon';

const { methods } = gameActions;
const { endGameRequest, startGameRequest, getCorrectAnswer } = methods;
const emit = defineEmits(['close', 'next-modal', 'correct', 'open']);
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
const audio = ref(new Audio());
const endGame = ref(false);
const is_correct = ref(false);
const hide = () => {
    emit('close');
    endGame.value = true;
};
const next = () => {
    emit('next-modal');
    endGame.value = true;
};

const getImageUrl = (path) => {
    return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};

const playAudio = async (audioPath) => {
    audio.value.src = new URL(
        `/assets/audio/${audioPath}`,
        import.meta.url,
    ).href;
    console.log(props.finish);
    if (props.finish === true) {
        await audio.value.play();
    }
};

const corrValue = ref(0);

const playEndAudio = (audioPath) => {
    const end_audio = new Audio();
    end_audio.src = new URL(`/assets/audio/${audioPath}`, import.meta.url).href;
    end_audio.play();
};

const stopAudio = (audioPath = '') => {
    if (audio.value.paused) {
        playAudio(audioPath);
    } else {
        audio.value.pause();
    }
};

const words = ref([
    { id: 1, name: 'медведи и зайцы', index: 11, audio: 'Task1/13.1.mp3' },
    {
        id: 2,
        name: 'Вместе они составляют АЛФАВИТ',
        index: 2,
        audio: 'Task1/14.1.mp3',
    },
    { id: 3, name: 'в слоги и в слова.', index: 5, audio: 'Task1/15.1.mp3' },
    { id: 4, name: 'В нашем языке', index: 0, audio: 'Task1/16.1.mp3' },
    { id: 5, name: 'в леса и поля', index: 22, audio: 'Task1/17.1.mp3' },
    { id: 6, name: 'есть иероглифы', index: 81, audio: 'Task1/18.1.mp3' },
    { id: 7, name: 'и складываются', index: 3, audio: 'Task1/19.1.mp3' },
    { id: 8, name: 'явления и предметы', index: 7, audio: 'Task1/20.1.mp3' },
    { id: 9, name: 'есть буквы.', index: 1, audio: 'Task1/21.1.mp3' },
    {
        id: 10,
        name: 'Все вместе они образуют МОЗАИКУ',
        index: 9,
        audio: 'Task1/22.1.mp3',
    },
]);
const wordsAnswer = ref({
    0: { id: 4, name: 'В нашем языке' },
    1: { id: 9, name: 'есть буквы.' },
    2: { id: 2, name: 'Вместе они составляют АЛФАВИТ' },
    3: { id: 7, name: 'и складываются' },
    4: { id: 3, name: 'в слоги и в слова.' },
});
const answer = ref('');

const answer_arr = ref([]);
const dropIndex = ref(words.value.length - 1);
const answerStore = useAnswerStore();
const dataTransfer = ref({});
const drag = (word, id, index) => {
    //event.dataTransfer.setData('text', word);
    //event.dataTransfer.setData('id', id);
    dataTransfer.value.text = word;
    dataTransfer.value.id = id;

    console.log(dataTransfer.value);
    dropIndex.value = index;
};

const drop = (event) => {
    // event.preventDefault();
    //let text = event.dataTransfer.getData('text');
    //let id = event.dataTransfer.getData('id');

    let text = dataTransfer.value.text;
    let id = dataTransfer.value.id;

    let elem = document.getElementById(id + '_elem');

    Array.from(event.to.children).forEach((element) => {
        if (element.tagName == 'DIV') {
            console.log(element);
            event.to.removeChild(element);
        }
    });

    if (answer_arr.value.length == 0) {
        if (wordsAnswer.value[0].id == id) {
            words.value.splice(dropIndex.value, 1);
            answer.value += text + ' ';
            answer_arr.value.push(0);
            playEndAudio('Other/1. общее для разных заданий.mp3');
        } else {
            elem.classList.add('red');
            setTimeout(() => {
                elem.classList.remove('red');
            }, 2000);
            playEndAudio('Other/2. общее для разных заданий.mp3');
            return false;
        }
    } else {
        let index = answer_arr.value.at(-1) + 1;
        if (wordsAnswer.value[index].id == id) {
            elem.classList.add('green');
            words.value.splice(dropIndex.value, 1);
            answer.value += text + ' ';
            answer_arr.value.push(index);
            playEndAudio('Other/1. общее для разных заданий.mp3');
        } else {
            elem.classList.add('red');
            setTimeout(() => {
                elem.classList.remove('red');
            }, 2000);
            playEndAudio('Other/2. общее для разных заданий.mp3');

            return false;
        }
    }
    if (answer_arr.value.length === 5) {
        setTimeout(() => {
            endGame.value = true;
            playAudio('Task1/23.1_.mp3');
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
        const correct = await getCorrectAnswer(1, props.childId);
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
    document.body.classList.add('no-scroll'); /* Прокрутка ставится на паузу */
    document.getElementsByTagName('html')[0].classList.add('no-scroll');

    console.log('game mount');
});

onBeforeUnmount(() => {
    document.body.classList.remove('no-scroll'); /* Прокрутка возвращается */
    document.getElementsByTagName('html')[0].classList.remove('no-scroll');

    audio.value.src = "";
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
    flex-wrap: wrap;
    column-gap: 133px;
    justify-content: center;
    row-gap: 48px;
    width: 100%;
    max-width: 1020px;
    margin: 48px auto;
    max-height: 240px;

    @media (max-width: 1130px) {
        column-gap: 70px;
        row-gap: 30px;
        max-height: 194px;
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 500px;

        @media (max-width: 1130px) {
            width: 904px;
            // height: 322px;
        }

        @media (max-width: 1024px) {
            height: 322px;
        }
    }
}

.FirstTask {

    &__title {
        font-size: 24px;
        font-weight: 500;
        line-height: 32.74px;
        font-family: 'Nunito';
        @media (max-width: 1024px) {
            font-size: 20px;
            line-height: 26.67px;
        }
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
        padding: 30px 60px 67px 60px;
        position: relative;
        height: 600px;

        align-items: center;

        @media (max-width: 1024px) {
            padding: 30px 20px 43px 20px;
        }

        &_block {
            display: flex;
            justify-content: space-around;
            margin-top: 48px;

            @media (max-width: 1024px) {
                margin-top: 28px;
            }
        }

        &_content {
            margin-top: 48px;
            display: flex;
            justify-content: space-between;
        }

        &_answer {
            background-color: $blueGame;
            width: 100%;
            padding: 35px 17px;
            color: #0f5707;
            font-size: 22px;
            font-weight: 700;
            font-family: 'Nunito', sans-serif;
            border-radius: 20px;
            border: none;
            text-shadow: 0 0 0 black;
            outline: none;
            resize: none;
            overflow-y: hidden;
            // min-height: 100px;

            @media (max-width: 1200px) {
                font-size: 20px;
            }

            @media (max-width: 1130px) {
                font-size: 18px;
            }

            @media (max-width: 1024px) {
                // min-height: 80px;
            }
        }
    }
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

.none {
    display: none;
}
</style>

<template>
    <div class="SixteenthTask task_block">
        <div class="task_block__wrapper">
            <template v-if="answersCounter < 55">
                <div class="task_block__close" @click="hide">
                    <img class="close-icon" src="@app/assets/icons/close-icon.svg" alt="крест" />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title SixteenthTask__title">
                        Прочитай от большой к маленькой букве в каждом слове,
                        перетяни буквы в поле ответа, собери предложение.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="draggable-list__items">
                        <div :class="'draggable-list__item' + stringid" v-for="{ stringid, string } in taskArray"
                            :key="stringid">
                            <div class="draggable-list__letters" :id="'letters-' + wordid"
                                v-for="{ wordid, word } in string" :key="wordid">
                                <span :class="'draggable-list__letter' +
                                    letter.classid
                                    " v-for="letter in word" :key="letter.id" draggable="true" @dragstart="
                                        dragLetter($event, wordid, letter.id)
                                        ">{{
                                            letter.isActive ? letter.text : ''
                                        }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="draggable-list__containers">
                        <div :class="'draggable-list__container' + stringid" v-for="{ stringid, string } in answerArray"
                            :key="stringid">
                            <div :class="'draggable-list__subcontainer' + wordid" v-for="{ wordid, word } in string"
                                :key="wordid">
                                <div class="draggable-list__subcontainer-square"
                                    :data-answer="letter.text.toUpperCase()" @drop="
                                        //dropLetter($event, wordid, letter);
                                        dropLetterNew($event, wordid, letter.id, letter.isActive)
                                        " @dragover.prevent v-for="letter in word" :key="letter.id">
                                    {{ letter.isActive ? letter.text : '' }}
                                </div>
                                <img src="/assets/icons/comma-blue.svg" alt="comma-blue"
                                    v-if="[6, 7, 8, 9].includes(wordid)" />
                                <div class="draggable-list__full-stop" v-if="wordid == 10">
                                    <img src="/assets/icons/full-stop-blue.svg" alt="full-stop-blue" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <input @drop="drop($event)" @dragover="allowDrop($event)" v-model="answer"
                    class="task_block__wrapper_answer" />
            </template>
            <TaskResultBanner :img="getImageUrl('Diamond.png')" :bg="getImageUrl('moa.gif')" text="Изумительно!"
                v-if="answersCounter >= 55" @hide="hide()" @next="next()"></TaskResultBanner>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';

import { dataTask, dataAnswer } from './task';
import audioMap from './audioMap';
import gameActions from '@mixins/gameAction';

const { methods } = gameActions;
const { endGameRequest, startGameRequest, getCorrectAnswer } = methods;

const emit = defineEmits(['close', 'next-modal', 'correct', 'open']);
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
const hide = () => {
    emit('close');
    resetTask();
};

const next = () => {
    emit('next-modal');
    resetTask();
}

const isActive = true;
const is_correct = ref(null);
const is_started = ref(null);
const corrValue = ref(0);

const getImageUrl = (path) => {
    return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};
const taskArray = ref([]);
taskArray.value = dataTask;

const answerArray = ref([]);
answerArray.value = dataAnswer;

const answersCounter = ref(0);

const dragLetter = (event, wordID, letterID) => {
    event.dataTransfer.setData('text', `${wordID} ${letterID}`);
};

const dropLetterNew = (event, wordID, letterID, letterIsActive) => {
    let dragwordID = event.dataTransfer.getData('text').split(' ')[0];
    let dragletterID = event.dataTransfer.getData('text').split(' ')[1];

    if (wordID == dragwordID) {
        if (letterID == dragletterID) {
            answerArray.value.map((string) => {
                string.string.map((word) => {
                    if (word.wordid == wordID)
                        word.word.map((letter) => {
                            if (letter.id == letterID) {
                                letter.isActive = true;
                                if (word.word.every((item) => { return item.isActive })) {
                                    console.log(`${audioMap.get('слово-' + word.wordid)}`)
                                    let wordPath = new URL(`/assets/audio/Task6/${audioMap.get('слово-' + word.wordid)}`, import.meta.url).href;
                                    let audio = new Audio(wordPath);
                                    setTimeout(() => {
                                        audio.play();
                                    }, 1000)
                                }
                            }
                        });
                });
            });

            taskArray.value.map((string) => {
                string.string.map((word) => {
                    if (word.wordid == wordID)
                        word.word.map((letter) => {
                            if (letter.id == letterID) letter.isActive = false;
                        });
                });
            });
            let reactionPath = new URL(`/assets/audio/Task6/right.${Math.ceil(Math.random() * 3)}.mp3`, import.meta.url).href;

            let reactionAudio = new Audio(
                reactionPath
            );
            reactionAudio.play();
            event.target.classList.add(
                'draggable-list__subcontainer-square_right'
            );

            console.log(answersCounter.value);

            if (answersCounter.value == 54) {
                setTimeout(() => {
                    event.target.classList.remove(
                        'draggable-list__subcontainer-square_right'
                    );
                    let audioPathSrc = new URL(`/assets/audio/Task16/${audioMap.get('final')}`, import.meta.url).href
                    let audio = new Audio(audioPathSrc);
                    audio.play();
                }, 2000);

                setTimeout(() => {
                    answersCounter.value += 1;
                }, 8000)
            }
            else {
                answersCounter.value += 1;
                setTimeout(() => {
                    event.target.classList.remove(
                        'draggable-list__subcontainer-square_right'
                    );
                }, 2000);
            }

        } else {
            if (!letterIsActive) {
                event.target.classList.add(
                    'draggable-list__subcontainer-square_warning'
                );
                setTimeout(() => {
                    event.target.classList.remove(
                        'draggable-list__subcontainer-square_warning'
                    );
                }, 2000);
            }
        }
    } else {
        if (!letterIsActive) {
            event.target.classList.add('draggable-list__subcontainer-square_wrong');
            let reactionAudioSrc = new URL(`/assets/audio/Task6/wrong.${Math.ceil(Math.random() * 3)}.mp3`, import.meta.url).href
            let reactionAudio = new Audio(
                reactionAudioSrc
            );
            reactionAudio.play();
            setTimeout(() => {
                event.target.classList.remove(
                    'draggable-list__subcontainer-square_wrong'
                );
            }, 2000);
        }
    }
};

const resetTask = () => {
    answerArray.value.map((string) => {
        string.string.map((word) => {
            word.word.map((letter) => {
                letter.isActive = false;
            });
        });
    });

    taskArray.value.map((string) => {
        string.string.map((word) => {
            word.word.map((letter) => {
                letter.isActive = true;
            });
        });
    });

    answersCounter.value = 0;
};

onMounted(() => {
    const correct = getCorrectAnswer(16, props.childId);
    corrValue.value = correct.correctId;
    is_correct.value = correct.is_correct;
});
</script>

<style lang="scss" scoped>
* {
    user-select: none;
}

.SixteenthTask {
    position: block;
}

.SixteenthTask__title {
    width: 700px;

    @media (max-width: 1024px) {
        width: 580px;
        font-family: 'Nunito', sans-serif;
        font-size: 20px;
        font-weight: 500;
        color: $text-primary;
    }
}

.draggable-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1040px;
    height: 396px;
    gap: 68px;
    margin-top: 32px;

    @media (max-width: 1024px) {
        margin-top: 16px;
        width: 887px;
        height: 316px;
        gap: 40px;
    }
}

.draggable-list__items {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 887px;
    height: 140px;
    justify-content: space-between;

    @media (max-width: 1024px) {
        height: 120px;
    }
}

.draggable-list__item1 {
    width: 876px;

    @media (max-width: 1024px) {
        width: 100%;
    }
}

.draggable-list__letters {
    padding: 16px 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    border-radius: 6px;
    background-color: $puppe;

    display: flex;
    justify-content: center;
    align-items: flex-end;

    @media (max-width: 1024px) {
        height: 52px;
        padding: 9px 13px;
    }
}

.draggable-list__word1,
.draggable-list__word2,
.draggable-list__word3,
.draggable-list__word4,
.draggable-list__word5,
.draggable-list__word6,
.draggable-list__word7,
.draggable-list__word8,
.draggable-list__word9,
.draggable-list__word10 {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 34px;
}

.draggable-list__word1 {
    width: 72px;
}

.draggable-list__word2 {
    width: 187px;
}

.draggable-list__word3 {
    width: 158px;
}

.draggable-list__word4 {
    width: 66px;
}

.draggable-list__word5 {
    width: 169px;
}

.draggable-list__word6 {
    width: 108px;
}

.draggable-list__word7 {
    width: 181px;
}

.draggable-list__word8 {
    width: 119px;
}

.draggable-list__word9 {
    width: 120px;
}

.draggable-list__word10 {
    width: 135px;
}

.draggable-list__letter1 {
    height: 20px;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 400;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter2 {
    height: 28px;
    font-family: 'Nunito', sans-serif;
    font-size: 28px;
    font-weight: 400;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter3 {
    height: 50px;
    font-family: 'Nunito', sans-serif;
    font-size: 48px;
    font-weight: 300;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter4 {
    height: 16px;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter5 {
    height: 39px;
    font-family: 'Nunito', sans-serif;
    font-size: 38px;
    font-weight: 300;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter6 {
    height: 45px;
    font-family: 'Nunito', sans-serif;
    font-size: 44px;
    font-weight: 300;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter7 {
    height: 32px;
    font-family: 'Nunito', sans-serif;
    font-size: 32px;
    font-weight: 300;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter8 {
    height: 34px;
    font-family: 'Nunito', sans-serif;
    font-size: 34px;
    font-weight: 300;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter9 {
    height: 24px;
    font-family: 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: 400;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter10 {
    height: 28px;
    font-family: 'Nunito', sans-serif;
    font-size: 28px;
    font-weight: 300;
    color: $violetLetters-game;
    cursor: pointer;
}

#letters-1 {
    width: 104px;
}

#letters-2 {
    width: 219px;
}

#letters-3 {
    width: 190px;
}

#letters-4 {
    width: 98px;
}

#letters-5 {
    width: 201px;
}

#letters-6 {
    width: 140px;
}

#letters-7 {
    width: 213px;
}

#letters-8 {
    width: 151px;
}

#letters-9 {
    width: 152px;
}

#letters-10 {
    width: 167px;
}

.draggable-list__item2 {
    width: 100%;
}

.draggable-list__item1,
.draggable-list__item2 {
    display: flex;
    height: 60px;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1024px) {
        height: 52px;
    }
}

.draggable-list__containers {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1040px;
    height: 188px;
    justify-content: space-between;

    @media (max-width: 1024px) {
        width: 880px;
        height: 156px;
    }
}

.draggable-list__subcontainer-square {
    width: 48px;
    height: 48px;
    background-color: $blueGame;
    border-radius: 6px;

    color: rgb(78, 59, 127);
    font-family: Nunito;
    font-size: 28px;
    font-weight: 400;
    line-height: 38px;
    letter-spacing: 0%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;

    @media (max-width: 1024px) {
        width: 40px;
        height: 40px;
        padding: 10px;
    }
}

.draggable-list__container1 {
    display: flex;
    width: 100%;
    height: 48px;
    justify-content: space-between;

    @media (max-width: 1024px) {
        height: 40px;
    }
}

.draggable-list__container2 {
    display: flex;
    width: 1001px;
    height: 52px;
    justify-content: space-between;

    @media (max-width: 1024px) {
        height: 44px;
        width: 844px;
    }
}

.draggable-list__container3 {
    display: flex;
    width: 863px;
    height: 52px;
    justify-content: space-between;

    @media (max-width: 1024px) {
        width: 728px;
        height: 44px;
    }
}

.draggable-list__subcontainer1,
.draggable-list__subcontainer2,
.draggable-list__subcontainer3,
.draggable-list__subcontainer4,
.draggable-list__subcontainer5,
.draggable-list__subcontainer6,
.draggable-list__subcontainer7,
.draggable-list__subcontainer8,
.draggable-list__subcontainer9,
.draggable-list__subcontainer10 {
    display: flex;
    justify-content: space-between;
    gap: 2px;
}

.draggable-list__subcontainer1 {
    width: 148px;

    @media (max-width: 1024px) {
        width: 124px;
    }
}

.draggable-list__subcontainer2 {
    width: 448px;

    @media (max-width: 1024px) {
        width: 376px;
    }
}

.draggable-list__subcontainer3 {
    width: 298px;

    @media (max-width: 1024px) {
        width: 250px;
    }
}

.draggable-list__subcontainer4 {
    width: 98px;

    @media (max-width: 1024px) {
        width: 82px;
    }
}

.draggable-list__subcontainer5 {
    width: 348px;

    @media (max-width: 1024px) {
        width: 292px;
    }
}

.draggable-list__subcontainer6 {
    width: 261px;

    @media (max-width: 1024px) {
        width: 218px;
    }
}

.comma {
    width: 11px;
    height: 52px;

    @media (max-width: 1024px) {
        width: 8px;
        height: 44px;
    }
}

.draggable-list__subcontainer7 {
    width: 361px;

    @media (max-width: 1024px) {
        width: 302px;
    }
}

.draggable-list__subcontainer8 {
    width: 261px;

    @media (max-width: 1024px) {
        width: 218px;
    }
}

.draggable-list__subcontainer9 {
    width: 261px;

    @media (max-width: 1024px) {
        width: 218px;
    }
}

.draggable-list__subcontainer10 {
    width: 310px;

    @media (max-width: 1024px) {
        width: 260px;
    }
}

.draggable-list__full-stop {
    display: flex;
    align-items: flex-end;
    width: 11px;
    height: 48px;

    @media (max-width: 1024px) {
        width: 8px;
        height: 40px;
    }
}

.draggable-list__subcontainer-square_warning {
    border: 2px solid #cfcd54;
}

.draggable-list__subcontainer-square_wrong {
    border: 2px solid #db0000;
}

.draggable-list__subcontainer-square_right {
    border: 2px solid #5ccf54;
}
</style>
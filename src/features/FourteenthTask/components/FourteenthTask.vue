<template>
    <div class="FourteenthTask task_block">
        <div class="task_block__wrapper">
            <template v-if="answersCounter < 4">
                <div class="task_block__close" @click="hide">
                    <img
                        class="close-icon"
                        src="@app/assets/icons/close-icon.svg"
                        alt="крест"
                    />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title FourteenthTask__title">
                        Соедини букву, звук и картинку.
                    </p>
                </div>
                <div class="draggable-list" ref="taskBlock">
                    <DragndropComponent
                        :left="Cords.x"
                        :top="Cords.y"
                        v-if="isDrag"
                    >
                        <template v-slot:task>
                            <div
                                draggable="false"
                                v-if="draggableBlock.type == 'word'"
                                @mouseup="endPosition($event)"
                                @mousemove="getCords($event)"
                                @mouseleave="mouseLeaveFrom()"
                            >
                                <div
                                    class="draggable-list__word"
                                    :id="`draggable-list__word${draggableBlock.id}`"
                                >
                                    {{ draggableBlock.text }}
                                </div>
                            </div>

                            <div
                                draggable="false"
                                v-if="draggableBlock.type == 'sound'"
                                @mouseup="endPosition($event)"
                                @mouseleave="mouseLeaveFrom()"
                            >
                                <div
                                    class="draggable-list__speaker"
                                    draggable="false"
                                    @mousemove.capture="getCords($event)"
                                >
                                    <img
                                        src="/assets/icons/speaker-violet.svg"
                                        alt="speaker"
                                        class="speaker"
                                        draggable="false"
                                        data-sound="sound"
                                        @mousemove.stop="() => false"
                                    />
                                </div>
                            </div>
                        </template>
                    </DragndropComponent>

                    <div class="draggable-list__draggable-items">
                        <div class="draggable-list__words">
                            <div
                                class="draggable-list__word"
                                :class="{'item_right' : word.error == 1, 'item_wrong' : word.error == -1}"
                                :id="`draggable-list__word${word.id}`"
                                v-for="word in Task[0]"
                                :key="word.id"
                                @mousedown="
                                    startPosition($event, word, 'word')
                                "
                                @mouseenter="playAudio(word.isActive ? word.audio : '/')"
                                :ref="
                                    (el) => (refBlocks[0][0][word.id - 1] = el)
                                "
                                :style="{
                                    opacity: word.isActive ? '100%' : '0%',
                                    cursor: word.isActive ? 'pointer' : 'auto',
                                }"
                            >
                                {{ word.text }}
                            </div>
                        </div>
                        <div class="draggable-list__speakers">
                            <div
                                class="draggable-list__speaker"
                                :class="{'item_right' : sound.error == 1, 'item_wrong' : sound.error == -1}"
                                v-for="sound in Task[1]"
                                :key="sound.id"
                                @mousedown.left="
                                    startPosition($event, sound, 'sound')
                                "
                                @mouseenter="playAudio(sound.isActive ? sound.audio : '/')"
                                :ref="
                                    (el) => (refBlocks[0][1][sound.id - 1] = el)
                                "
                                :style="{
                                    opacity: sound.isActive ? '100%' : '0%',
                                    cursor: sound.isActive ? 'pointer' : 'auto',
                                }"
                            >
                                <img
                                    src="/assets/icons/speaker-violet.svg"
                                    alt="speaker"
                                    class="speaker"
                                    :draggable="sound.isActive"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="draggable-list__answer-zone">
                        <div
                            class="draggable-list__answer"
                            v-for="answer in Answer"
                            :key="answer"
                        >
                            <img
                                :src="answer.img"
                                alt="lesyaandmoa"
                                class="lesyaandmoa"
                            />
                            <div class="draggable-list__subanswer">
                                <div
                                    class="draggable-list__word"
                                    :class="{'item_right' : answer.word.error == 1, 'item_wrong' : answer.word.error == -1}"
                                    :id="`${answer.id == 1 ? 'draggable-list__word1' : 'draggable-list__word5'}`"
                                    :ref="
                                        (el) =>
                                            (refBlocks[1][0][answer.id - 1] =
                                                el)
                                    "
                                    :data-id="answer.id"
                                    :data-type="answer.type"
                                >
                                    {{ answer.word.isActive ? answer.word.text : "" }}

                                </div>
                                <div
                                    class="draggable-list__speaker"
                                    :class="{'item_right' : answer.sound.error == 1, 'item_wrong' : answer.sound.error == -1}"
                                    :ref="
                                        (el) =>
                                            (refBlocks[1][1][answer.id - 1] =
                                                el)
                                    "
                                    :data-id="answer.id"
                                    :data-type="answer.type"
                                >
                                    <img
                                        v-if="answer.sound.isActive"
                                        src="/assets/icons/speaker-violet.svg"
                                        alt="speaker"
                                        class="speaker"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <TaskResultBanner
                bg="/assets/backgrounds/moa.gif"
                text="Друзья заметили, что письменная б (БЭ), которая звучит,
            как [б] или [б'] похожа на белку с поднятым хвостом. В слове «белка» звучит [б']. А письменная д, которая звучит, как [д] или [д'], похожа на дятла,
            у которого хвостик вниз. В слове «дятел» звучит [д']."
                v-else
                @next="next()"
                @hide="hide()"
            ></TaskResultBanner>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';
import DragndropComponent from './DragndropComponent.vue';

import { dataTask, dataAnswer } from './task';
import draggable from 'vuedraggable';

const emit = defineEmits(['close', 'next-modal']);
const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
});
const hide = () => {
    emit('close');
};
const next = () => {
    emit('next-modal');
};

const audio = ref(new Audio())
const answersCounter = ref(0)

const Task = ref();
Task.value = structuredClone(dataTask);

const Answer = ref();
Answer.value = structuredClone(dataAnswer);

const taskBlock = ref(null);

const Cords = ref({
    x: 0,
    y: 0,
});

const draggableBlock = ref({
    src: '',
    class: '',
    text: '',
    type: '',
    id: 0,
});

const isDrag = ref(false);

const refBlocks = ref([
    [[], []],
    [[], []],
]);

const centralCords = ref([
    [[], []],
    [[], []],
]);

const getCords = (event) => {
    Cords.value.x =
        event.clientX -
        taskBlock.value.getBoundingClientRect().x -
        event.currentTarget.getBoundingClientRect().width / 2;

    Cords.value.y =
        event.clientY -
        taskBlock.value.getBoundingClientRect().y -
        event.currentTarget.getBoundingClientRect().height / 2;
};

const startPosition = (event, block, type) => {
    if (!block.isActive) return;

    draggableBlock.value.text = block.text;
    draggableBlock.value.type = type;
    draggableBlock.value.id = block.id;
    draggableBlock.value.answer = block.answer;

    getCords(event);

    isDrag.value = true;
    block.isActive = false;

    getCentralCords();
};

const getCentralCords = () => {
    refBlocks.value.forEach((type, type_index) => {
        type.forEach((blocks, blocks_index) => {
            blocks.forEach((block, block_index) => {
                centralCords.value[type_index][blocks_index][block_index] = {
                    x:
                        block.getBoundingClientRect().x +
                        block.getBoundingClientRect().width / 2,
                    y:
                        block.getBoundingClientRect().y +
                        block.getBoundingClientRect().height / 2,
                    xmin: block.getBoundingClientRect().x,
                    xmax:
                        block.getBoundingClientRect().x +
                        block.getBoundingClientRect().width,
                    ymin: block.getBoundingClientRect().y,
                    ymax:
                        block.getBoundingClientRect().y +
                        block.getBoundingClientRect().height,
                };
            });
        });
    });
};

const mouseLeaveFrom = () => {
    isDrag.value = false;

    if (draggableBlock.value.id != -1) {
        Task.value.map((type) => {
            type.map((block) => {
                if (block.id == draggableBlock.value.id) block.isActive = true;
            });
        });
    }
};

const getBlockUnderMouse = (event) => {
    let indexes = { type_index: -1, blocks_index: -1, block_index: -1 };
    centralCords.value.forEach((type, type_index) => {
        if (type_index == 1) {
            type.forEach((blocks, blocks_index) => {
                blocks.forEach((block, block_index) => {
                    if (
                        event.clientX > block.xmin &&
                        event.clientX < block.xmax &&
                        event.clientY > block.ymin &&
                        event.clientY < block.ymax
                    ) {
                        indexes = { type_index, blocks_index, block_index };
                    }
                });
            });
        }
    });

    return indexes;
};

const rightAnswer = (indexes) => {
    let { type_index, blocks_index, block_index } = indexes;
    if (type_index == -1 || blocks_index == -1 || block_index == -1)
        return false;

    if (draggableBlock.value.type == 'word' && blocks_index == 0) {
        if (Answer.value[block_index].id == draggableBlock.value.answer)
            return true;
    } else if (draggableBlock.value.type == 'sound' && blocks_index == 1) {
        if (Answer.value[block_index].id == draggableBlock.value.answer)
            return true;
    }

    return false;
};

const endPosition = (event) => {
    let { type_index, blocks_index, block_index } = getBlockUnderMouse(event);
    isDrag.value = false;

    Task.value.map((type) => {
        type.map((block) => {
            if (
                block.id == draggableBlock.value.id &&
                block.type == draggableBlock.value.type
            ) {
                block.isActive = true;
            }
        });
    });


    if (rightAnswer({ type_index, blocks_index, block_index })) {

        Task.value.map((type) => {
            type.map((block) => {
                if (
                    block.id == draggableBlock.value.id &&
                    block.type == draggableBlock.value.type
                ) {
                    block.isActive = false;
                    block.error = 1;
                }
            });
        });

        Answer.value.map((block)=>{
            if (block.id == draggableBlock.value.answer) {
                if (draggableBlock.value.type == 'word'){
                    block.word.isActive = true
                    block.word.error = 1
                }
                else {
                    block.sound.isActive = true
                    block.sound.error = 1
                }

                setTimeout(()=>{
                    block.sound.error = 0
                    block.word.error = 0
                    answersCounter.value += 1

                    if (answersCounter.value == 4) {
                        let finalaudio = new Audio('/assets/audio/Task14/388.14.mp3');
                        finalaudio.play();
                    }
                }, 1000)

            }
        })

        let reactionAudio = new Audio(`/assets/audio/Task6/right.${Math.ceil(Math.random() * 3)}.mp3`);
        reactionAudio.play();

        
    }

    else if (type_index != -1 && blocks_index != -1 && block_index != -1){

        let flag = false
        let answer_type = Answer.value[block_index][`${blocks_index == 0 ? 'word' : 'sound'}`].type
        

        Answer.value.map((block)=>{
            if (Answer.value[block_index][draggableBlock.value.type].isActive || answer_type != draggableBlock.value.type ) {
                flag = true
            }
        })

        if (!flag){

            Task.value.map((type) => {
                type.map((block) => {
                    if (
                        block.id == draggableBlock.value.id &&
                        block.type == draggableBlock.value.type
                    ) {
                        block.isActive = true;
                        block.error = -1;

                        setTimeout(()=>{
                            block.error = 0
                        }, 1000)
                    }
                });
            });

            let reactionAudio = new Audio(`/assets/audio/Task6/wrong.${Math.ceil(Math.random() * 3)}.mp3`);
            reactionAudio.play();
        }


        
    }

    draggableBlock.value.text = '';
    draggableBlock.value.type = '';
    draggableBlock.value.id = 0;
    draggableBlock.value.answer = '';

};

const playAudio = (audioPath) =>{
    if (audioPath != '/') {
        if (audio.value.src) audio.value.pause();
        audio.value.src = audioPath;
        audio.value.play();
    }
}
</script>

<style lang="scss" scoped>
* {
    user-select: none;
}

.FourteenthTask {
    width: 1200px;
}

.FourteenthTask__title {
    width: 389px;
    @media (max-width: 1024px) {
        width: 328px;
        font-weight: 400;
        font-size: 20px;
    }
}

.draggable-list {
    position: relative;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 32px;
    width: 848px;
    height: 448px;
    @media (max-width: 1024px) {
        margin-top: 20px;
        width: 680px;
        height: 341px;
    }
}

.draggable-list__draggable-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 144px;
    @media (max-width: 1024px) {
        height: 108px;
    }
}

.draggable-list__words {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 52px;
    @media (max-width: 1024px) {
        height: 40px;
    }
}

.draggable-list__word {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 108px;
    height: 52px;
    background-color: $blueGame;
    color: $darkBlue;
    border-radius: 6px;
    font-family: 'czizh', sans-serif;
    font-size: 44px;
    @media (max-width: 1024px) {
        width: 80px;
        height: 40px;
        font-size: 36px;
    }
}

#draggable-list__word1 {
    padding-top: 5px;
}

#draggable-list__word2 {
    padding-bottom: 10px;
}

#draggable-list__word3 {
    padding-bottom: 17px;
    @media (max-width: 1024px) {
        padding-bottom: 11px;
    }
}

#draggable-list__word4 {
    padding-top: 5px;
}

#draggable-list__word5 {
    padding-bottom: 23px;
    @media (max-width: 1024px) {
        padding-bottom: 17px;
    }
}

#draggable-list__word6 {
    padding-bottom: 23px;
    @media (max-width: 1024px) {
        padding-bottom: 17px;
    }
}

.draggable-list__speakers {
    display: flex;
    justify-content: space-between;
    width: 552px;
    height: 52px;
    @media (max-width: 1024px) {
        width: 440px;
        height: 40px;
    }
}

.draggable-list__speaker {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 108px;
    height: 52px;
    background-color: $puppe;
    border-radius: 6px;
    @media (max-width: 1024px) {
        width: 80px;
        height: 40px;
    }
}

.speaker {
    width: 32px;
    height: 32px;
    @media (max-width: 1024px) {
        width: 26px;
        height: 26px;
    }
}

.draggable-list__answer-zone {
    display: flex;
    justify-content: space-between;
    width: 576px;
    height: 264px;
    @media (max-width: 1024px) {
        width: 448px;
        height: 205px;
    }
}

.draggable-list__answer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    width: 268px;
    height: 100%;
    border: 1px solid $darkBlue;
    border-radius: 6px;
    @media (max-width: 1024px) {
        width: 204px;
        padding: 16px;
    }
}

.lesyaandmoa {
    width: 228px;
    height: 160px;
    @media (max-width: 1024px) {
        width: 172px;
        height: 121px;
    }
}

.draggable-list__subanswer {
    display: flex;
    justify-content: space-between;
    width: 228px;
    height: 52px;
    @media (max-width: 1024px) {
        width: 172px;
        height: 40px;
    }
}

.item_right {
    border: 2px solid #5ccf54;
}
.item_wrong {
    border: 2px solid #db0000;
}
</style>
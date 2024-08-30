<template>
    <div class="sidebar">
        <p class="sidebar__title">Выбери задание!</p>
        <div class="sidebar__wrapper">
            <div class="sidebar__bg">
                <div @click="switchTask(item.id, item.open, item.time, item.img, item.audio, item.startAudio)"
                    :class="{ disabled: item.disabled == true }" class="task" v-for="item in tasks" :key="item.id">{{
                        item.name
                    }} <img class="icon" v-if="item.disabled === false && item.done === false"
                        src="@app/assets/icons/play.svg" /><img class="icon"
                        v-else-if="item.disabled === true && item.done === false" src="@app/assets/icons/block.svg" />
                    <img class="icon" v-else-if="item.disabled === false && item.done === true"
                        src="@app/assets/icons/done.svg" />
                </div>
            </div>
            <div class="modal_background" v-if="SeeTask">
                <FirstTask :childId="props.childId" :finish="finish" :end="endTime" @close="close()"
                    @correct="checkCorrect(1)" @open="checkOpen(2)" @next-modal="next(2, 'Task2/25.2.mp3')"
                    v-if="taskId === 1">
                </FirstTask>
                <SecondTask @correct="checkCorrect(2)" :childId="props.childId" :finish="finish" :end="endTime"
                    @close="close()" @open="checkOpen(3)" @next-modal="next(3, 'Task3/31.3.mp3')" v-if="taskId === 2">
                </SecondTask>
                <ThirdTask @correct="checkCorrect(3)" :childId="props.childId" :finish="finish" :end="endTime"
                    @close="close()" @open="checkOpen(4)" @next-modal="next(4, 'Task4/45.4.mp3')" v-if="taskId === 3">
                </ThirdTask>
                <FourthTask @correct="checkCorrect(4)" @open="checkOpen(5)" :end="endTime" :childId="props.childId"
                    @close="close()" @next-modal="next(5, 'Task5/62.5.mp3')" v-if="taskId === 4">
                </FourthTask>
                <FifthTask @correct="checkCorrect(5)" @open="checkOpen(6)" :end="endTime" :childId="props.childId"
                    @close="close()" @next-modal="next(6, 'Task6/79.6.mp3')" v-if="taskId === 5">
                </FifthTask>
                <SixTask @correct="checkCorrect(6)" @open="checkOpen(7)" :end="endTime" :childId="props.childId"
                    @close="close()" @next-modal="next(7, 'Task7/261.7_.mp3')" v-if="taskId === 6">
                </SixTask>
                <SeventhTask @correct="checkCorrect(7)" @open="checkOpen(8)" :childId="props.childId" :end="endTime"
                    @close="close()" @next-modal="next(8, 'Task8/280.8.mp3')" v-if="taskId === 7">
                </SeventhTask>
                <EighthTask @correct="checkCorrect(8)" @open="checkOpen(9)" :childId="props.childId" :end="endTime"
                    @close="close()" @next-modal="next(9, 'Task9/299.9.mp3')" v-if="taskId === 8">
                </EighthTask>
                <NineTask @correct="checkCorrect(9)" @open="checkOpen(10)" :childId="props.childId" :finish="finish"
                    :end="endTime" @close="close()" @next-modal="next(10, 'Task10/317.10.mp3')" v-if="taskId === 9">
                </NineTask>
                <TenthTask @correct="checkCorrect(10)" @open="checkOpen(11)" :childId="props.childId" :finish="finish"
                    :end="endTime" @close="close()" @next-modal="next(11, 'Task11/330.11.mp3')" v-if="taskId === 10">
                </TenthTask>
                <ElevenTask @correct="checkCorrect(11)" @open="checkOpen(12)" :childId="props.childId" :finish="finish"
                    :end="endTime" @close="close()" @next-modal="next(12, 'Task12/349.12.mp3')" v-if="taskId === 11">
                </ElevenTask>
                <TwelfthTask @correct="checkCorrect(12)" @open="checkOpen(13)" :childId="props.childId" :end="endTime"
                    @close="close()" @next-modal="next(13, 'Task13/370.13.mp3')" v-if="taskId === 12">
                </TwelfthTask>
                <ThirteenthTask @correct="checkCorrect(13)" @open="checkOpen(14)" :childId="props.childId"
                    :finish="finish" :end="endTime" @close="close()" @next-modal="next(14, 'Task14/379.14.mp3')"
                    v-if="taskId === 13">
                </ThirteenthTask>
                <FourteenthTask @correct="checkCorrect(14)" @open="checkOpen(15)" :childId="props.childId"
                    :end="endTime" @close="close()" @next-modal="next(15, 'Task15/390.15.mp3')" v-if="taskId === 14">
                </FourteenthTask>
                <FifteenTask @correct="checkCorrect(15)" @open="checkOpen(16)" :childId="props.childId" :end="endTime"
                    @close="close()" @next-modal="next(16, 'Task16/427.16_.mp3')" v-if="taskId === 15">
                </FifteenTask>
                <SixteenthTask @correct="checkCorrect(16)" @open="checkOpen(17)" :childId="props.childId" :end="endTime"
                    @close="close()" @next-modal="next(17, 'Task17/454.17.mp3')" v-if="taskId === 16">
                </SixteenthTask>
                <SeventeenthTask @correct="checkCorrect(17)" @open="checkOpen(18)" :childId="props.childId"
                    :end="endTime" @close="close()" @next-modal="next(18, 'Task18/471.18.mp3')" v-if="taskId === 17">
                </SeventeenthTask>
                <EighteenTask @correct="checkCorrect(18)" :childId="props.childId" :end="endTime" @close="close()"
                    v-if="taskId === 18">
                </EighteenTask>
            </div>
        </div>

        <Button v-if="props.show === true" class="start" label="Старт" :is-image="true" :image="arrow"
            @click="openTask(taskId)"></Button>
    </div>
</template>
<script setup>
import { HTTP } from '@app/http';
import { Button } from '@shared/components/buttons';
import arrow from '@app/assets/icons/Arrow.svg';
import { ref, watch, onMounted, computed, onBeforeMount } from 'vue';
import { FirstTask } from '@features/FirstTask/components';
import { ThirdTask } from '@features/ThirdTask/components';
import { FourthTask } from '@features/FourthTask/components';
import { FifthTask } from '@features/FifthTask/components';
import { SeventhTask } from '@features/SeventhTask/components';
import { EighthTask } from '@features/EighthTask/components';
import { TenthTask } from '@features/TenthTask';
import { SecondTask } from '@features/SecondTask';
import { ThirteenthTask } from '@features/ThirteenthTask';
import { FourteenthTask } from '@features/FourteenthTask';
import { SixTask } from '@features/SixTask/components';
import { FifteenTask } from '@features/FifteenTask';
import { SixteenthTask } from '@features/SixteenthTask';
import { SeventeenthTask } from '@features/SeventeenthTask';
import { EighteenTask } from '@features/EighteenTask';
import { NineTask } from '@features/NineTask';
import { ElevenTask } from '@features/ElevenTask';
import { TwelfthTask } from '@features/TwelfthTask';
import { useAnswerStore } from '@layouts/stores/answers';
import { useRoute } from 'vue-router';

const emit = defineEmits(['sendImg', 'sendAudio', 'sendId', 'show', 'startTask', 'hand']);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    childId: {
        type: Number
    },
    audioObj: {
        type: Object,
        default: new Audio()
    }
})

const audio = ref(props.audioObj);

const route = useRoute();
const answerStore = useAnswerStore();
const tasks = ref([

])

const SeeTask = ref(false);
const taskId = ref(null);
const finish = ref(false);
const taskImage = ref('animals.jpg');
const timeVal = ref(15);
const taskAudio = ref('Task1/12.1.mp3');
const startAudio = ref('Task1/11.1_.mp3');
const endTime = ref(false);
const answers = ref([]);
const show_hand = ref(false);
const show = ref(props.show);
const correct = ref(false);
const started = ref(null);
const ids = ref([1, 2, 3, 4, 5, 6, 7, 8, 16, 18]);
const audio_ids_music = ref([1, 16, 18]);


const close = () => {
    SeeTask.value = false;
    endTime.value = false;
    audio.value.src = '';
    show.value = false;
    emit('show', show.value);
};

const playStartAudio = (audioPath) => {
    let startAudio = new Audio();
    startAudio.src = new URL(`/assets/audio/${audioPath}`, import.meta.url).href;
    startAudio.play();
    startAudio.addEventListener('ended', () => {
        finish.value = true;
    });
}


const playAudio = (audioPath) => {
    audio.value.src = new URL(`/assets/audio/${audioPath}`, import.meta.url).href;
    audio.value.play();
}

const switchTask = (id, openId, time, img, audio_task, startAudioV) => {
    const task = tasks.value.find((item) => item.id == id);
    if (task.disabled === false) {
        taskId.value = id;
        SeeTask.value = openId;
        startAudio.value = startAudioV;
        timeVal.value = time;
        show.value = false;
        taskAudio.value = audio_task
        endTime.value = false;
        taskImage.value = img;
        if (ids.value.includes(taskId.value)) {
            playAudio('Music/звук 1_.mp3');
            audio.value.addEventListener('ended', () => {
                if (taskId.value !== 1 || taskId.value !== 16 || taskId.value !== 18) {
                    show_hand.value = true;
                    emit('hand', show_hand.value)
                }
            })
            if (audio_ids_music.value.includes(taskId.value)) {
                audio.value.addEventListener('ended', () => {
                    playAudio('Other/10.общее.mp3');
                    audio.value.addEventListener('ended', () => {
                        show_hand.value = true;
                        emit('hand', show_hand.value)
                        audio.value.pause();
                    })
                })
            }
        } else {
            playAudio(startAudioV)
            show_hand.value = false;
            props.audioObj = audio.value;
        }
        emit('sendImg', img);
        emit('sendId', id);
        emit('sendAudio', startAudioV);
        emit('show', show.value);
    } else {
        console.log('Задание закрыто ')
    }

};

const checkCorrect = (id) => {
    tasks.value.forEach((task) => {
        if (task.id === id) {
            task.done = true;
            task.disabled = false;
        }
    })
}

const checkOpen = (id) => {
    tasks.value.forEach((task) => {
        if (task.id === id) {
            task.open = true;
            task.disabled = false;
        }
    })
}



const openTask = (taskId) => {
    SeeTask.value = true;
    finish.value = false;
    playStartAudio(taskAudio.value);
    setTimeout(() => {
        endTime.value = true;
    }, timeVal.value * 1000);


};

const next = (id, audio_task) => {
    SeeTask.value = false;
    endTime.value = false;
    show.value = false;
    taskAudio.value = audio_task;
    taskId.value = id;
    openTask(taskId);
}


watch(
    () => taskId.value,
    (newId) => {
        if (!newId) {
            return;
        }
        taskId.value = newId;
    }
);

watch(() => props.childId, (newId) => {
    props.childId = newId;
    answerStore.getAnswers(props.childId);
    tasks.value.forEach((task, index) => {
        answerStore.answers.forEach((answer) => {
            if (answer.task?.id === task.id) {
                task.done = answer.is_correct;
                task.disabled = false;
            }
        })
    })
    const taskFindArr = tasks.value.filter((task) => task.done === true);
    if (taskFindArr.length > 0) {
        let nextElId = taskFindArr.at(-1).id;
        tasks.value[nextElId].disabled = false;
    }

})


watch(() => answerStore.answers, (newAns) => {
    answerStore.answers = newAns
    tasks.value.forEach((task, index) => {
        answerStore.answers.forEach((answer) => {
            if (answer.task?.id === task.id) {
                task.done = answer.is_correct;
                task.disabled = false;
            }
        })
    })
    const taskFindArr = tasks.value.filter((task) => task.done === true);
    if (taskFindArr.length > 0) {
        let nextElId = taskFindArr.at(-1).id;
        tasks.value[nextElId].disabled = false;
    }
})

onBeforeMount(() => {
    tasks.value = [{ id: 1, name: 'Задание 1', disabled: false, done: false, open: false, time: 22, end: false, img: 'animals.jpg', audio: 'Task1/12.1.mp3', startAudio: 'Task1/11.1_.mp3' },
    { id: 2, name: 'Задание 2', disabled: true, done: false, open: false, time: 17, end: false, img: 'task2.jpg', audio: 'Task2/25.2.mp3', startAudio: 'Task2/24.2_.mp3' },
    { id: 3, name: 'Задание 3', disabled: true, done: false, open: false, time: 15, end: false, img: 'task3.jpg', audio: 'Task3/31.3.mp3', startAudio: 'Task3/30.3_.mp3' },
    { id: 4, name: 'Задание 4', disabled: true, done: false, open: false, time: 15, end: false, img: 'task4.jpg', audio: 'Task4/45.4.mp3', startAudio: 'Task4/61.5_.mp3' },
    { id: 5, name: 'Задание 5', disabled: true, done: false, open: false, time: 15, end: false, img: 'task5.jpg', audio: 'Task5/62.5.mp3', startAudio: 'Task5/61.5_.mp3' },
    { id: 6, name: 'Задание 6', disabled: true, done: false, open: false, time: 20, end: false, img: 'task6.jpg', audio: 'Task6/79.6.mp3', startAudio: 'Task6/78.6_.mp3' },
    { id: 7, name: 'Задание 7', disabled: true, done: false, open: false, time: 20, end: false, img: 'task7.jpg', audio: 'Task7/261.7_.mp3', startAudio: 'Task7/260.7_.mp3' },
    { id: 8, name: 'Задание 8', disabled: true, done: false, open: false, time: 30, end: false, img: 'task8.jpg', audio: 'Task8/280.8.mp3', startAudio: 'Task8/279.8_.mp3' },
    { id: 9, name: 'Задание 9', disabled: true, done: false, open: false, time: 30, end: false, img: 'task9.jpg', audio: 'Task9/299.9.mp3', startAudio: 'Task9/298.9.mp3' },
    { id: 10, name: 'Задание 10', disabled: true, done: false, open: false, time: 30, end: false, img: 'task10.jpg', audio: 'Task10/317.10.mp3', startAudio: 'Task10/316.10.mp3' },
    { id: 11, name: 'Задание 11', disabled: true, done: false, open: false, time: 35, end: false, img: 'task11.jpg', audio: 'Task11/330.11.mp3', startAudio: 'Task11/329.11.mp3' },
    { id: 12, name: 'Задание 12', disabled: true, done: false, open: false, time: 35, end: false, img: 'task12.jpg', audio: 'Task12/348.12.mp3', startAudio: 'Task12/349.12.mp3' },
    { id: 13, name: 'Задание 13', disabled: true, done: false, open: false, time: 30, end: false, img: 'task13.jpg', audio: 'Task13/370.13.mp3', startAudio: 'Task13/369.13.mp3' },
    { id: 14, name: 'Задание 14', disabled: true, done: false, open: false, time: 30, end: false, img: 'task14.jpg', audio: 'Task14/379.14.mp3', startAudio: 'Task14/378.14_.mp3' },
    { id: 15, name: 'Задание 15', disabled: true, done: false, open: false, time: 60, end: false, img: 'task15.jpg', audio: 'Task15/390.15.mp3', startAudio: 'Task15/389.15.mp3' },
    { id: 16, name: 'Задание 16', disabled: true, done: false, open: false, time: 60, end: false, img: 'task16.jpg', audio: 'Task16/428.16.mp3', startAudio: 'Task16/427.16_.mp3' },
    { id: 17, name: 'Задание 17', disabled: true, done: false, open: false, time: 30, end: false, img: 'task17.jpg', audio: 'Task17/454.17.mp3', startAudio: 'Task17/453.17.mp3' },
    { id: 18, name: 'Задание 18', disabled: true, done: false, open: false, time: 120, end: false, img: 'task18.jpg', audio: 'Task18/471.18.mp3', startAudio: 'Task18/470.18_.mp3' },];

})

onMounted(async () => {
    await answerStore.getAnswers(props.childId);
    tasks.value.forEach((task, index) => {
        answerStore.answers.forEach((answer) => {
            if (answer.task?.id === task.id) {
                task.done = answer.is_correct;
                task.disabled = false;
            }
        })
    })
    const taskFindArr = tasks.value.filter((task) => task.done === true);
    if (taskFindArr.length > 0) {
        let nextElId = taskFindArr.at(-1).id;
        tasks.value[nextElId].disabled = false;
    }

})
</script>
<style lang="scss" scoped>
.modal_background {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
    background-color: #F1FAFE;
    z-index: 1;
}

.icon {
    height: 8px;
    width: 10px;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 998;
}

.sidebar {
    background-color: $pink;
    border-radius: 20px 0px 0px 20px;
    padding: 0px 40px 0px 0px;
    width: 100%;
    max-width: 280px;
    height: auto;

    @media (max-width: 1025px) {
        max-width: 300px
    }

    @media (max-width: 1023px) {
        height: 387px;
        max-width: 212px;
    }

    &__wrapper {
        padding: 16px;
        background-color: white;
        border-radius: 20px;
        margin: 48px auto;
        height: auto;

        @media (max-width: 1024px) {
            height: 470px;
            max-width: 292px;
            padding: 40px;
        }
    }

    &__title {
        font-size: 28px;
        color: $text-primary;
        font-family: 'Nunito', sans-serif;
        font-weight: 500;

        @media (max-width: 1024px) {
            font-size: 20px;

            &__wrapper {
                padding: 16px;
                background-color: white;
                border-radius: 20px;
                margin: 45px auto;
                max-height: 312px;

                @media (max-width: 1024px) {
                    max-height: 270px;
                }
            }
        }

        &__title {
            font-size: 32px;
            color: $text-primary;
            font-family: 'Nunito', sans-serif;
            font-weight: 500;

            @media (max-width: 1024px) {
                font-size: 22px;
            }
        }
    }

    &__bg {
        display: flex;
        flex-direction: column;
        row-gap: 12px;
        height: 300px;
        padding: 8px 0;
        overflow-y: scroll;

        @media (max-width: 1023px) {
            height: 185px;
            padding: 0px;
        }
    }
}

.task {
    border-radius: 30px;
    background-color: #e6f2fa;
    color: $black;
    max-width: 212px;
    width: 100%;
    padding: 5.5px 24px;
    height: 38px;
    color: $text-primary;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    align-items: center;

    @media (max-width: 1024px) {
        max-width: 180px;
        height: 38px;
        color: $text-primary;
        font-family: 'Nunito', sans-serif;
        font-size: 20px;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
    }
}

.start {
    max-width: 280px;
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 32px;

    @media (max-width: 1024px) {
        max-width: 212px;
        height: 48px;
        column-gap: 28px;
    }
}

.disabled {
    background-color: #e6f2fa;
    color: #a5acb1;
    cursor: not-allowed;
}

.sidebar__bg::-webkit-scrollbar {
    width: 8px;
    max-height: 148px;
}

.sidebar__bg::-webkit-scrollbar-thumb {
    background-color: #4d65e5;
    border-radius: 7px;
    cursor: pointer;
    max-height: 148px;
    width: 8px;

    @media (max-width: 1024px) {
        background: white;
        border-radius: 0px;
        cursor: pointer;
        max-height: 0px;
        width: 0px;
    }
}

.sidebar__bg::-webkit-scrollbar-thumb:hover {
    background: white;
}
</style>

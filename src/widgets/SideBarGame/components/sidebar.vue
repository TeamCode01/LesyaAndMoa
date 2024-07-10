<template>
    <div class="sidebar">
        <p class="sidebar__title">Выбери задание!</p>
        <div class="sidebar__wrapper">
            <div class="sidebar__bg">
                <div @click="switchTask(item.id, item.open, item.time, item.img, item.audio)"
                    :class="{ disabled: item.disabled === true }" class="task" v-for="item in tasks" :key="item.id">{{
                        item.name
                    }} <img class="icon" v-if="item.disabled === false && item.done === false"
                        src="@app/assets/icons/play.svg" /><img class="icon"
                        v-else-if="item.disabled === true && item.done === false" src="@app/assets/icons/block.svg" />
                </div>
            </div>


            <FirstTask :end="endTime" @close="close()" v-if="SeeTask && taskId === 1"></FirstTask>
            <SecondTask :end="endTime" @close="close()" v-if="SeeTask && taskId === 2"></SecondTask>
            <ThirdTask :end="endTime" @close="close()" v-if="SeeTask && taskId === 3"></ThirdTask>
            <FourthTask :end="endTime" @close="close()" v-if="SeeTask && taskId === 4"></FourthTask>
            <ThirteenthTask :end="endTime" @close="close()" v-if="SeeTask && taskId === 13"></ThirteenthTask>
            <EighteenTask :end="endTime" @close="close()" v-if="SeeTask && taskId === 18"></EighteenTask>
            <NineTask :end="endTime" @close="close()" v-if="SeeTask && taskId === 9"></NineTask>
            <ElevenTask :end="endTime" @close="close()" v-if="SeeTask && taskId === 11"></ElevenTask>
        </div>

        <Button class="start" label="Старт" :is-image="true" :image="arrow" @click="openTask(taskId)"></Button>
    </div>
</template>
<script setup>
import { HTTP } from '@app/http';
import { Button } from '@shared/components/buttons';
import arrow from '@app/assets/icons/Arrow.svg';
import { ref, watch, onMounted } from 'vue';
import { FirstTask } from '@features/FirstTask/components';
import { ThirdTask } from '@features/ThirdTask/components';
import { FourthTask } from '@features/FourthTask/components';
import { SecondTask } from '@features/SecondTask';
import { ThirteenthTask } from '@features/ThirteenthTask';
import { EighteenTask } from '@features/EighteenTask';
import { NineTask } from '@features/NineTask';
import { ElevenTask } from '@features/ElevenTask';
const emit = defineEmits('sendImg');
const tasks = ref([

    { id: 1, name: 'Задание 1', disabled: false, done: false, open: false, time: 15, end: false, img: '/assets/backgrounds/animals.jpg', audio: '/assets/audio/Task1/12.1.mp3' },
    { id: 2, name: 'Задание 2', disabled: false, done: false, open: false, time: 15, end: false, img: '/assets/backgrounds/task2.jpg' },
    { id: 3, name: 'Задание 3', disabled: false, done: false, open: false, time: 15, end: false, img: '/assets/backgrounds/task3.jpg', audio: '/assets/audio/Task3/31.3.mp3' },
    { id: 4, name: 'Задание 4', disabled: false, done: false, open: false, time: 15, end: false, img: '/assets/backgrounds/task4.jpg' },
    { id: 5, name: 'Задание 5', disabled: true, done: false, open: false, time: 15, end: false, img: '/assets/backgrounds/task5.jpg' },
    { id: 6, name: 'Задание 6', disabled: true, done: false, open: false, time: 20, end: false, img: '/assets/backgrounds/task6.jpg' },
    { id: 7, name: 'Задание 7', disabled: true, done: false, open: false, time: 20, end: false, img: '/assets/backgrounds/task7.jpg' },
    { id: 8, name: 'Задание 8', disabled: true, done: false, open: false, time: 30, end: false, img: '/assets/backgrounds/animals.jpg' },
    { id: 9, name: 'Задание 9', disabled: false, done: false, open: false, time: 30, end: false, img: '/assets/backgrounds/task9.jpg' },
    { id: 10, name: 'Задание 10', disabled: true, done: false, open: false, time: 30, end: false, img: '/assets/backgrounds/task10.jpg' },
    { id: 11, name: 'Задание 11', disabled: false, done: false, open: false, time: 35, end: false, img: '/assets/backgrounds/animals.jpg' },
    { id: 12, name: 'Задание 12', disabled: true, done: false, open: false, time: 35, end: false, img: '/assets/backgrounds/task12.jpg' },
    { id: 13, name: 'Задание 13', disabled: false, done: false, open: false, time: 30, end: false, img: '/assets/backgrounds/task13.jpg' },
    { id: 14, name: 'Задание 14', disabled: true, done: false, open: false, time: 30, end: false, img: '/assets/backgrounds/animals.jpg' },
    { id: 15, name: 'Задание 15', disabled: true, done: false, open: false, time: 60, end: false, img: '/assets/backgrounds/task15.jpg' },
    { id: 16, name: 'Задание 16', disabled: true, done: false, open: false, time: 60, end: false, img: '/assets/backgrounds/animals.jpg' },
    { id: 17, name: 'Задание 17', disabled: true, done: false, open: false, time: 30, end: false, img: '/assets/backgrounds/animals.jpg' },
    { id: 18, name: 'Задание 18', disabled: false, done: false, open: false, time: 120, end: false, img: '/assets/backgrounds/animals.jpg' },
])

const SeeTask = ref(false);
const taskId = ref(null);
const taskImage = ref('/assets/backgrounds/animals.jpg');
const timeVal = ref(15);
const taskAudio = ref('/assets/audio/Task1/12.1.mp3');
const endTime = ref(false);
const taskss = ref([]);

const close = () => {
    SeeTask.value = false;
    endTime.value = false;
    console.log('close yeah')
};

function playAudio(audioPath) {
    const audio = new Audio(audioPath);
    audio.play();
}

const switchTask = (id, openId, time, img, audio) => {
    taskId.value = id;
    console.log(taskId.value)
    SeeTask.value = openId;
    timeVal.value = time;
    taskAudio.value = audio;
    endTime.value = false;
    taskImage.value = img;
    console.log(SeeTask.value);
    emit('sendImg', img);
}

const startTask = async (id) => {
    try {
        const resp = await HTTP.post(`answers/${id}`);
    } catch (e) {
        console.error('Error starting task', e);
    }

}

const openTask = (taskId) => {
    SeeTask.value = true;
    setTimeout(() => {
        playAudio(taskAudio.value);
    })

    setTimeout(() => {

        endTime.value = true;
    }, timeVal.value * 1000);
}

const getTasks = async () => {
    await HTTP.get('tasks').then((response) => {
        taskss.value = response.data;
    }).catch((error) => {
        console.error(error);
    });
}

watch(
    () => taskId.value,
    (newId) => {
        if (!newId) {
            return
        }
        taskId.value = newId;
    },
);

onMounted(() => {
    getTasks();
});

</script>
<style lang="scss" scoped>
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

    @media (max-width: 1024px) {
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

        @media (max-width: 1024px) {
            height: 185px;
            padding: 0px;
        }

    }

}

.task {
    border-radius: 30px;
    background-color: #E6F2FA;
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

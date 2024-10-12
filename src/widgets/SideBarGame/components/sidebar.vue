<template>
    <div class="sidebar">
        <p class="sidebar__title">Выбери задание!</p>
        <div class="sidebar__wrapper">
            <div class="sidebar__bg">
                <div
                    @click="
                        switchTask(
                            item.id,
                            item.open,
                            item.time,
                            item.img,
                            item.audio,
                            item.startAudio,
                        )
                    "
                    :class="{ disabled: item.disabled == true }"
                    class="task"
                    :data-id="item.id"
                    v-for="item in tasks"
                    :key="item.id"
                >
                    {{ item.name }}
                    <img
                        class="icon"
                        v-if="item.disabled === false && item.done === false"
                        src="@app/assets/icons/play.svg"
                    /><img
                        class="icon"
                        v-else-if="
                            item.disabled === true && item.done === false
                        "
                        src="@app/assets/icons/block.svg"
                    />
                    <img
                        class="icon"
                        v-else-if="
                            item.disabled === false && item.done === true
                        "
                        src="@app/assets/icons/done.svg"
                    />
                </div>
            </div>
            <div class="modal_background" v-if="SeeTask">
                <FirstTask
                    :childId="props.childId"
                    :finish="finish"
                    :end="endTime"
                    @close="close()"
                    @next-modal="next()"
                    @correct="checkCorrect(1)"
                    @open="checkOpen(2)"
                    v-if="taskId === 1"
                >
                </FirstTask>
                <SecondTask
                    :childId="props.childId"
                    :finish="finish"
                    :end="endTime"
                    @close="close()"
                    @next-modal="next()"
                    @correct="checkCorrect(2)"
                    @open="checkOpen(3)"
                    v-if="taskId === 2"
                >
                </SecondTask>
                <ThirdTask
                    :childId="props.childId"
                    :finish="finish"
                    :end="endTime"
                    @close="close()"
                    @next-modal="next()"
                    @correct="checkCorrect(3)"
                    @open="checkOpen(4)"
                    v-if="taskId === 3"
                >
                </ThirdTask>
                <FourthTask
                    @next-modal="next()"
                    @correct="checkCorrect(4)"
                    @open="checkOpen(5)"
                    :end="endTime"
                    :childId="props.childId"
                    @close="close()"
                    v-if="taskId === 4"
                >
                </FourthTask>
                <FifthTask
                    @next-modal="next()"
                    @correct="checkCorrect(5)"
                    @open="checkOpen(6)"
                    :end="endTime"
                    :childId="props.childId"
                    @close="close()"
                    v-if="taskId === 5"
                >
                </FifthTask>
                <SixTask
                    @next-modal="next()"
                    @correct="checkCorrect(6)"
                    @open="checkOpen(7)"
                    :end="endTime"
                    :childId="props.childId"
                    @close="close()"
                    v-if="taskId === 6"
                >
                </SixTask>
                <EighthTask
                    @next-modal="next()"
                    @correct="checkCorrect(7)"
                    @open="checkOpen(8)"
                    :childId="props.childId"
                    :end="endTime"
                    @close="close()"
                    v-if="taskId === 7"
                >
                </EighthTask>
                <NineTask
                    @next-modal="next()"
                    @correct="checkCorrect(8)"
                    @open="checkOpen(9)"
                    :childId="props.childId"
                    :finish="finish"
                    :end="endTime"
                    @close="close()"
                    v-if="taskId === 8"
                >
                </NineTask>
                <TenthTask
                    @next-modal="next()"
                    @correct="checkCorrect(9)"
                    @open="checkOpen(10)"
                    :childId="props.childId"
                    :finish="finish"
                    :end="endTime"
                    @close="close()"
                    v-if="taskId === 9"
                >
                </TenthTask>
                <ElevenTask
                    @next-modal="next()"
                    @correct="checkCorrect(10)"
                    @open="checkOpen(11)"
                    :childId="props.childId"
                    :finish="finish"
                    :end="endTime"
                    @close="close()"
                    v-if="taskId === 10"
                >
                </ElevenTask>
                <TwelfthTask
                    @next-modal="next()"
                    @correct="checkCorrect(11)"
                    @open="checkOpen(12)"
                    :childId="props.childId"
                    :end="endTime"
                    @close="close()"
                    v-if="taskId === 11"
                >
                </TwelfthTask>
                <ThirteenthTask
                    @next-modal="next()"
                    @correct="checkCorrect(12)"
                    @open="checkOpen(13)"
                    :childId="props.childId"
                    :finish="finish"
                    :end="endTime"
                    @close="close()"
                    v-if="taskId === 12"
                >
                </ThirteenthTask>
                <SeventhTask
                    @next-modal="next()"
                    @correct="checkCorrect(13)"
                    @open="checkOpen(14)"
                    :childId="props.childId"
                    :end="endTime"
                    @close="close()"
                    v-if="taskId === 13"
                >
                </SeventhTask>
                <FourteenthTask
                    @next-modal="next()"
                    @correct="checkCorrect(14)"
                    @open="checkOpen(15)"
                    :childId="props.childId"
                    :end="endTime"
                    :finish="finish"
                    @close="close()"
                    v-if="taskId === 14"
                >
                </FourteenthTask>
                <FifteenTask
                    @next-modal="next()"
                    @correct="checkCorrect(15)"
                    @open="checkOpen(16)"
                    :childId="props.childId"
                    :end="endTime"
                    @close="close()"
                    v-if="taskId === 15"
                >
                </FifteenTask>
                <SixteenthTask
                    @next-modal="next()"
                    @correct="checkCorrect(16)"
                    @open="checkOpen(17)"
                    :childId="props.childId"
                    :end="endTime"
                    @close="close()"
                    v-if="taskId === 16"
                >
                </SixteenthTask>
                <SeventeenthTask
                    @next-modal="next()"
                    @correct="checkCorrect(17)"
                    @open="checkOpen(18)"
                    :childId="props.childId"
                    :end="endTime"
                    @close="close()"
                    v-if="taskId === 17"
                >
                </SeventeenthTask>
                <EighteenTask
                    @next-modal="next()"
                    @correct="checkCorrect(18)"
                    :childId="props.childId"
                    :end="endTime"
                    @close="close()"
                    v-if="taskId === 18"
                >
                </EighteenTask>
            </div>
        </div>

        <Button
            v-if="props.show === true"
            class="start"
            label="Старт"
            :is-image="true"
            :image="arrow"
            @click="openTask(taskId)"
        ></Button>
    </div>
</template>
<script setup>
import { HTTP } from '@app/http';
import { Button } from '@shared/components/buttons';
import arrow from '@app/assets/icons/Arrow.svg';
import { useUserStore } from '@layouts/stores/user';
import { ref, watch, onActivated, onMounted, nextTick } from 'vue';
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
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';

const emit = defineEmits([
    'sendImg',
    'sendAudio',
    'sendId',
    'show',
    'startTask',
    'hand',
    'sendPreAudio',
]);
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    childId: {
        type: Number,
    },
    audioObj: {
        type: Object,
        default: new Audio(),
    },
});

const audio = ref(props.audioObj);
const userStore = useUserStore();
const answerStore = useAnswerStore();
const tasks = ref([]);
const SeeTask = ref(false);
const taskId = ref(null);
const finish = ref(false);
const taskImage = ref('animals.jpg');
const timeVal = ref(15);
const taskAudio = ref('Task1/12.1.mp3');
const startAudio = ref('Task1/11.1_.mp3');
const endTime = ref(false);
const answers = ref([]);
const isPlaying = ref(false);
const show_hand = ref(false);
const show = ref(props.show);
const correct = ref(false);
const started = ref(null);

const ids = ref([1, 2, 3, 4, 5, 6, 7, 13, 14, 16, 18]);
const startedAudio = ref(new Audio());

const close = () => {
    SeeTask.value = false;
    endTime.value = false;
    startedAudio.value.pause();
    show.value = false;
    emit('show', show.value);
};

const playStartAudio = (audioPath) => {
    startedAudio.value.src = new URL(
        `/assets/audio/${audioPath}`,
        import.meta.url,
    ).href;
    startedAudio.value.play();
    startedAudio.value.addEventListener('ended', () => {
        finish.value = true;
    });
};

const playAudio = (audioPath) => {
    audio.value.src = new URL(
        `/assets/audio/${audioPath}`,
        import.meta.url,
    ).href;
    audio.value.play();
};
const postAudio = (audioPath) => {
    audio.value.addEventListener('ended', () => {
        isPlaying.value = false;
        show_hand.value = true;
        show.value = false;
        emit('sendPreAudio', isPlaying.value);
        emit('show', show.value);
        emit('hand', show_hand.value);
        emit('sendAudio', audioPath);
        audio.value.pause();

        
    });
};

const switchTask = (id, openId, time, img, audio_task, startAudioV) => {
    const task = tasks.value.find((item) => item.id == id);
    console.log(id);
    if (task.disabled === false) {
        taskId.value = id;
        SeeTask.value = false;
        startAudio.value = startAudioV;
        timeVal.value = time;
        show.value = false;
        taskAudio.value = audio_task;
        endTime.value = false;
        taskImage.value = img;
        emit('sendImg', img);
        emit('sendId', taskId.value);
     
        if (ids.value.includes(taskId.value)) {
            isPlaying.value = true;
            emit('sendPreAudio', isPlaying.value);
            switch (taskId.value) {
                case 1:
                    playAudio('Music/звук 1_.mp3');
                    audio.value.addEventListener('ended', () => {
                        show.value = false;
                        isPlaying.value = false;
                        emit('sendPreAudio', isPlaying.value);
                        isPlaying.value = true;
                        playAudio('Other/10.общее.mp3');
                        emit('sendPreAudio', isPlaying.value);
                        postAudio('Task1/11.1_.mp3');
                    });
                    break;
                case 2:
                    playAudio('Music/звук 2_.mp3');
                    postAudio('Task2/24.2_.mp3');
                    break;
                case 3:
                    playAudio('Music/звук 3_.mp3');
                    postAudio('Task3/30.3_.mp3');
                    break;
                case 4:
                    playAudio('Music/звук 4_.mp3');
                    postAudio('Task4/44.4_.mp3');
                    break;
                case 5:
                    playAudio('Music/звук 5_.mp3');
                    postAudio('Task5/61.5_.mp3');
                    break;
                case 6:
                    playAudio('Music/звук 6_.mp3');
                    postAudio('Task6/78.6_.mp3');
                    break;

                case 7:
                    playAudio('Music/звук 8_.mp3');
                    postAudio('Task8/279.8_.mp3');
                    break;

                case 13:
                    playAudio('Music/звук 7_.mp3');
                    postAudio('Task7/260.7_.mp3');
                    break;
                case 14:
                    playAudio('Music/звук 2_.mp3');
                    postAudio('Task14/378.14_.mp3');
                    break;
                case 16:
                    playAudio('Music/звук 9_.mp3');
                    postAudio('Task16/427.16_.mp3');
                
                    break;
                case 18:
                    playAudio('Music/звук 1_.mp3');
                    postAudio('Task18/470.18_.mp3');
                    break;

                default:
                    break;
            }
        } else {
            isPlaying.value = false;
            emit('sendPreAudio', isPlaying.value === false);
            playAudio(startAudioV);
            props.audioObj = audio.value;
            audio.value.addEventListener('ended', () => {
                emit('sendAudio', startAudioV);
                show.value = true;
                emit('show', show.value);
                audio.value.pause();
                show_hand.value = false;
                emit('hand', show_hand.value);
            });
        }
    } else {
        console.log('Задание закрыто ');
    }
};

const next = () => {
    SeeTask.value = false;
    endTime.value = false;
    show.value = false;
    emit('show', show.value);
    const taskFindArr = tasks.value.filter((task) => task.done === true);
    if (taskFindArr.length > 0) {
        let nextElId = taskFindArr.at(-1).id;
        console.log('id', nextElId);
        tasks.value[nextElId].disabled = false;

        switchTask(
            tasks.value[nextElId].id,
            tasks.value[nextElId].open,
            tasks.value[nextElId].time,
            tasks.value[nextElId].img,
            tasks.value[nextElId].audio,
            tasks.value[nextElId].startAudio,
        );
    }
};

const checkCorrect = (id) => {
    tasks.value.forEach((task) => {
        if (task.id === id) {
            task.done = true;
            task.disabled = false;
        }
    });
};

const checkOpen = (id) => {
    tasks.value.forEach((task) => {
        if (task.id === id) {
            task.open = true;
            task.disabled = false;
        }
    });
};

const openTask = (taskId) => {
    SeeTask.value = true;
    finish.value = false;
    playStartAudio(taskAudio.value);
    setTimeout(() => {
        endTime.value = true;
    }, timeVal.value * 1000);
};

watch(
    () => taskId.value,
    (newId) => {
        if (!newId) {
            return;
        }
        console.log('see', SeeTask.value);
        taskId.value = newId;
        show.value = false;
        show_hand.value = false;
        emit('hand', show_hand.value);
        emit('show', show.value);
    },
);

watch(
    () => userStore.currentUser,
    () => {
        if (localStorage.getItem('type') === 'групповой') {
            tasks.value.forEach((task, index) => {
                task.disabled = false;
            });
        }
    },
    {
        immediate: true,
        deep: true,
    },
);

watch(
    () => props.childId,
    async (newId) => {
        if (newId) {
            props.childId = newId;
            await answerStore.getAnswers(props.childId);
            tasks.value.forEach((task, index) => {
                answerStore.answers.forEach((answer) => {
                    if (answer.task?.id === task.id) {
                        task.done = answer.is_correct;
                        task.disabled = false;
                    }
                });
            });
            const taskFindArr = tasks.value.filter(
                (task) => task.done === true,
            );
            window.addEventListener('popstate', (event) => {
                props.childId = null;
                if (audio.value.paused) {
                    audio.value.play();
                }
                audio.value.pause();
            });
            if (taskFindArr.length > 0) {
                let nextElId = taskFindArr.at(-1).id;
                console.log('watch', nextElId, taskFindArr);
                tasks.value[nextElId].disabled = false;

                switchTask(
                    tasks.value[nextElId].id,
                    tasks.value[nextElId].open,
                    tasks.value[nextElId].time,
                    tasks.value[nextElId].img,
                    tasks.value[nextElId].audio,
                    tasks.value[nextElId].startAudio,
                );

                const sidebar = document.querySelector('.sidebar__bg');

                // Find the next task element
                const nextTaskElement = sidebar.querySelector(
                    `.task[data-id="${nextElId}"]`,
                );
                nextTaskElement.scrollIntoView({ behavior: 'smooth' });
            } else {
                switchTask(
                    1,
                    false,
                    22,
                    'animals.jpg',
                    'Task1/12.1.mp3',
                    'Task1/11.1_.mp3',
                );
            }
        } else {
            props.childId = null;
        }
    },
    {
        immediate: true,
        deep: true,
    },
);

onBeforeRouteLeave((to, from) => {
    props.childId = null;
    if (audio.value.paused) {
        audio.value.play();
    }
    audio.value.pause();
});

onActivated(() => {
    tasks.value = [
        {
            id: 1,
            name: 'Задание 1',
            disabled: false,
            done: false,
            open: false,
            time: 22,
            end: false,
            img: 'animals.jpg',
            audio: 'Task1/12.1.mp3',
            startAudio: 'Task1/11.1_.mp3',
        },
        {
            id: 2,
            name: 'Задание 2',
            disabled: true,
            done: false,
            open: false,
            time: 17,
            end: false,
            img: 'task2.jpg',
            audio: 'Task2/25.2.mp3',
            startAudio: 'Task2/24.2_.mp3',
        },
        {
            id: 3,
            name: 'Задание 3',
            disabled: true,
            done: false,
            open: false,
            time: 15,
            end: false,
            img: 'task3.jpg',
            audio: 'Task3/31.3.mp3',
            startAudio: 'Task3/30.3_.mp3',
        },
        {
            id: 4,
            name: 'Задание 4',
            disabled: true,
            done: false,
            open: false,
            time: 15,
            end: false,
            img: 'task4.jpg',
            audio: 'Task4/45.4.mp3',
            startAudio: 'Task4/44.4_.mp3',
        },
        {
            id: 5,
            name: 'Задание 5',
            disabled: true,
            done: false,
            open: false,
            time: 15,
            end: false,
            img: 'task5.jpg',
            audio: 'Task5/62.5.mp3',
            startAudio: 'Task5/61.5_.mp3',
        },
        {
            id: 6,
            name: 'Задание 6',
            disabled: true,
            done: false,
            open: false,
            time: 20,
            end: false,
            img: 'task8.jpg',
            audio: 'Task6/79.6.mp3',
            startAudio: 'Task6/78.6_.mp3',
        },
      
        {
            id: 7,
            name: 'Задание 7',
            disabled: true,
            done: false,
            open: false,
            time: 30,
            end: false,
            img: 'task6.jpg',
            audio: 'Task8/280.8.mp3',
            startAudio: 'Task8/279.8_.mp3',
        },
        {
            id: 8,
            name: 'Задание 8',
            disabled: true,
            done: false,
            open: false,
            time: 30,
            end: false,
            img: 'task9.jpg',
            audio: 'Task9/299.9.mp3',
            startAudio: 'Task9/298.9.mp3',
        },
        {
            id: 9,
            name: 'Задание 9',
            disabled: true,
            done: false,
            open: false,
            time: 30,
            end: false,
            img: 'task10.jpg',
            audio: 'Task10/317.10.mp3',
            startAudio: 'Task10/316.10.mp3',
        },
        {
            id: 10,
            name: 'Задание 10',
            disabled: true,
            done: false,
            open: false,
            time: 35,
            end: false,
            img: 'task11.jpg',
            audio: 'Task11/330.11.mp3',
            startAudio: 'Task11/329.11.mp3',
        },
        {
            id: 11,
            name: 'Задание 11',
            disabled: true,
            done: false,
            open: false,
            time: 35,
            end: false,
            img: 'task12.jpg',
            audio: 'Task12/348.12.mp3',
            startAudio: 'Task12/349.12.mp3',
        },
        {
            id: 12,
            name: 'Задание 12',
            disabled: true,
            done: false,
            open: false,
            time: 30,
            end: false,
            img: 'task13.jpg',
            audio: 'Task13/370.13.mp3',
            startAudio: 'Task13/369.13.mp3',
        },

        {
            id: 13,
            name: 'Задание 13',
            disabled: true,
            done: false,
            open: false,
            time: 20,
            end: false,
            img: 'task7.jpg',
            audio: 'Task7/261.7.mp3',
            startAudio: 'Task7/260.7_.mp3',
        },

        {
            id: 14,
            name: 'Задание 14',
            disabled: true,
            done: false,
            open: false,
            time: 30,
            end: false,
            img: 'task14.jpg',
            audio: 'Task14/379.14.mp3',
            startAudio: 'Task14/378.14_.mp3',
        },
        {
            id: 15,
            name: 'Задание 15',
            disabled: true,
            done: false,
            open: false,
            time: 60,
            end: false,
            img: 'task17.jpg',
            audio: 'Task15/390.15.mp3',
            startAudio: 'Task15/389.15.mp3',
        },
        {
            id: 16,
            name: 'Задание 16',
            disabled: true,
            done: false,
            open: false,
            time: 60,
            end: false,
            img: 'task16.jpg',
            audio: 'Task16/428.16.mp3',
            startAudio: 'Task16/427.16_.mp3',
        },
        {
            id: 17,
            name: 'Задание 17',
            disabled: true,
            done: false,
            open: false,
            time: 30,
            end: false,
            img: 'task15.jpg',
            audio: 'Task17/454.17.mp3',
            startAudio: 'Task17/453.17.mp3',
        },
        {
            id: 18,
            name: 'Задание 18',
            disabled: true,
            done: false,
            open: false,
            time: 120,
            end: false,
            img: 'task18.jpg',
            audio: 'Task18/471.18.mp3',
            startAudio: 'Task18/470.18_.mp3',
        },
    ];
    if (localStorage.getItem('type') === 'групповой') {
        tasks.value.forEach((task, index) => {
            task.disabled = false;
        });
        // console.log(tasks.value);
    }
});
</script>
<style lang="scss" scoped>
.modal_background {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
    background-color: #f1fafe;
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
        max-width: 300px;
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
        overflow-x: hidden;
        // margin-right: 28px;

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
@supports (scrollbar-color: auto) {
    .sidebar__bg {
        scrollbar-color: #4d65e5 #fff;
    }
}

@supports selector(::-webkit-scrollbar) {
    .sidebar__bg::-webkit-scrollbar {
        background: #4d65e5;
        width: 8px;
        cursor: pointer;
        border-radius: 7px;
        max-height: 148px;
    }
    .sidebar__bg::-webkit-scrollbar-thumb {
        background: #fff;
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
}
</style>

<template>
    <div class="container-game" v-show="windowWidth >= 1024">
        <div class="game" id="game">
            <Sidebar
                :audio-obj="startAudio"
                :childId="route.params.id"
                :show="showBtn"
                @send-img="sendImg"
                @send-audio="sendAudio"
                @show="showButton"
                @hand="showHand"
                @send-id="getId"
                @startAudio="playMusic"
                @stopAudio="stopMusic"
            />
            <div class="game_icons_wrap">
                <div class="game_icons_item" @click="mute()">
                    <img
                        v-show="isMuted === false"
                        src="@app/assets/icons/sound.svg"
                        alt="sound"
                    /><img
                        v-show="isMuted === true"
                        src="@app/assets/icons/muted.svg"
                        alt=""
                    />
                </div>
                <div class="game_icons_item" @click="refresh($event)">
                    <img src="@app/assets/icons/refresh.svg" alt="refresh" />
                </div>
                <div class="game_icons_item" @click="skip()">
                    <img src="@app/assets/icons/playGame.svg" alt="play" />
                </div>
            </div>
            <img
                v-show="show_hand"
                class="hand"
                @click="clickOnHand()"
                :id="'hand_' + task_id"
                src="@app/assets/icons/hand.svg"
                alt="hand"
                :class="{ game_img_disabled: imgIsClickable === false }"
            />
            <div
                @click="clickOnHand()"
                class="game_img"
                :class="{ game_img_disabled: imgIsClickable === false }"
            >
                <img class="game_img_bg" id="background-banner" alt="game" />
            </div>
        </div>
    </div>
    <div class="container-game_mobile" v-show="windowWidth < 1024">
        <div class="mobile-task-wrap">
            <div
                v-for="taskNumber in 18"
                :key="taskNumber"
                class="mobile-task"
                @click="
                    () => {
                        modalIsOpen = true;
                    }
                "
            >
                {{ `Задание ${taskNumber}` }}
            </div>
        </div>

        <div v-if="modalIsOpen == true" class="mobile-modal">
            <div>
                <div class="close">
                    <img
                        class="close-icon"
                        src="@app/assets/icons/close-icon.svg"
                        alt="крест"
                        @click="
                            () => {
                                modalIsOpen = false;
                            }
                        "
                    />
                </div>
                <p class="mobile-text">
                    Чтобы полноценно использовать игры, необходимо разрешение
                    экрана от 1024 px. Пожалуйста воспользуйтесь планшетом или
                    компьютером. Мы ждем вас на нашем сайте
                </p>
            </div>

            <img
                src="@app/assets/img/StartGamePage/MoaStartGamePage.png"
                alt=""
                class="mobile-img"
            />
        </div>
    </div>
</template>
<script setup>
import { Sidebar } from '@widgets/SideBarGame';
import { ref, onMounted, watch } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { HTTP } from '@app/http';
import gameActions from '@mixins/gameAction';
import { useAnswerStore } from '@layouts/stores/answers';

const { methods } = gameActions;
const { startGameRequest } = methods;
const answerStore = useAnswerStore();

let img = ref('animals.jpg');
let audio = ref('../assets/audio/Task1/11.1_.mp3');
const ids = ref([1, 2, 3, 4, 5, 6, 7, 13, 14, 16, 18]);
const audio_ids_music = ref([1]);
const showBtn = ref(false);
const route = useRoute();
const show_hand = ref(false);
const task_id = ref(0);
let childId = route.params.id;
const currentAudio = ref('');
const startAudio = ref(new Audio());
const preAudio = ref(new Audio());
const imgIsClickable = ref(false);
const isMuted = ref(false);


const sendedAudio = ref('');

const audio_state = ref([
        {
            id: 1,
            music: 'Music/звук 1_.mp3',
            haveMusic: true,
            startAudio: 'Task1/11.1_.mp3',
            currentSound: 'Music/звук 1_.mp3'
        },
        {
            id: 2,
            music: 'Music/звук 2_.mp3',
            haveMusic: true,
            startAudio: 'Task2/24.2_.mp3',
            currentSound: 'Music/звук 2_.mp3',
        },
        {
            id: 3,
            music: 'Music/звук 3_.mp3',
            haveMusic: true,
            startAudio: 'Task3/30.3_.mp3',
            currentSound: 'Music/звук 3_.mp3',
        },
        {
            id: 4,
            music: 'Music/звук 4_.mp3',
            haveMusic: true,
            startAudio: 'Task4/44.4_.mp3',
            currentSound: 'Music/звук 4_.mp3',
        },
        {
            id: 5,
            music: 'Music/звук 5_.mp3',
            haveMusic: true,
            startAudio: 'Task5/61.5_.mp3',
            currentSound: 'Music/звук 5_.mp3',
        },
        {
            id: 6,
            music: 'Music/звук 6_.mp3',
            haveMusic: true,
            startAudio: 'Task6/78.6_.mp3',
            currentSound: 'Music/звук 6_.mp3',
        },
        {
            id: 7,
            music: 'Music/звук 8_.mp3',
            haveMusic: true,
            startAudio: 'Task8/279.8_new.mp3',
            currentSound: 'Music/звук 8_.mp3',
        },
        {
            id: 8,
            music: '',
            haveMusic: false,
            startAudio: 'Task9/298.9.mp3',
            currentSound: 'Task9/298.9.mp3',
        },
        {
            id: 9,
            music: '',
            haveMusic: false,
            startAudio: 'Task10/316.10.mp3',
            currentSound: 'Task10/316.10.mp3',
        },
        {
            id: 10,
            music: '',
            haveMusic: false,
            startAudio: 'Task11/329.11.mp3',
            currentSound: 'Task11/329.11.mp3',
        },
        {
            id: 11,
            music: '',
            haveMusic: false,
            startAudio: 'Task12/349.12.mp3',
            currentSound: 'Task12/349.12.mp3',
        },
        {
            id: 12,
            music: '',
            haveMusic: false,
            startAudio: 'Task13/369.13.mp3',
            currentSound: 'Task13/369.13.mp3',
        },

        {
            id: 13,
            music: 'Music/звук 7_.mp3',
            haveMusic: true,
            startAudio: 'Task7/260.7_.mp3',
            currentSound: 'Music/звук 7_.mp3',
        },
        {
            id: 14,
            music: 'Music/звук 2_.mp3',
            haveMusic: true,
            startAudio: 'Task14/378.14_.mp3',
            currentSound: 'TaMusic/звук 2_.mp3',
        },
        {
            id: 15,
            music: '',
            haveMusic: false,
            startAudio: 'Task15/389.15.mp3',
            currentSound: 'Task15/389.15.mp3',
        },
        {
            id: 16,
            music: 'Music/звук 9_.mp3',
            haveMusic: true,
            startAudio: 'Task16/427.16_.mp3',
            currentSound: 'Music/звук 9_.mp3',
        },
        {
            id: 17,
            music: '',
            haveMusic: false,
            startAudio: 'Task17/453.17.mp3',
            currentSound: 'Task17/453.17.mp3',
        },
        {
            id: 18,
            music: 'Music/звук 1_.mp3',
            haveMusic: true,
            startAudio: 'Task18/470.18_.mp3',
            currentSound: 'Music/звук 1_.mp3',
        },
    ]
)

const setAudioFromSended = () => {
    audio.value = sendedAudio.value;
}

const getImageUrl = (path) => {
    return new URL(`/assets/backgrounds/${path}`, import.meta.url).href;
};

const windowWidth = ref(window.innerWidth);
const modalIsOpen = ref(false);
const sendImg = (image) => {
    img.value = image;
    document.getElementById('background-banner').src = getImageUrl(img.value);
};

const sendAudio = (music) => {
    console.log("from startGamePage", task_id.value)
    console.log(sendedAudio.value, music)
    sendedAudio.value = music
    setTimeout(() => {
        console.log("Timeout hand - ", show_hand.value)
        if (!show_hand.value){
            audio.value = sendedAudio.value
        }
    }, 100);

    // console.log('audio', audio.value);
};

const showButton = (show) => {
    showBtn.value = show;
};

const getId = (id) => {
    task_id.value = id;
};

const showHand = (show) => {
    show_hand.value = show;
};

const mute = () => {
    isMuted.value = !isMuted.value;
    if (isMuted.value === true) {
        startAudio.value.volume = 0;
        preAudio.value.volume = 0;
    } else {
        startAudio.value.volume = 1;
        preAudio.value.volume = 1;
    }
};
const skip = () => {
    startAudio.value.pause();
    preAudio.value.pause();


    const selectedAudioObj = audio_state.value.find((audio) => audio.id === task_id.value);
    selectedAudioObj.currentSound = selectedAudioObj.startAudio;

    show_hand.value = false;
    showBtn.value = true;
};

const refresh = () => {
    if (preAudio.value.paused) {
        preAudio.value.currentTime = 0;
        preAudio.value.play();
    }
    preAudio.value.currentTime = 0;
};

const playMusic = () => {
    preAudio.value.onended = () => {};
    show_hand.value = false;
    showBtn.value = false;

    const selectedAudioObj = audio_state.value.find((audio) => audio.id === task_id.value);
    console.log(selectedAudioObj)
    const currentAudio = selectedAudioObj.currentSound;
    preAudio.value.src = new URL(
        `/assets/audio/${currentAudio}`,
        import.meta.url,
    ).href;
    preAudio.value.play();
    imgIsClickable.value = false;

    if (selectedAudioObj.music === selectedAudioObj.currentSound) {
        // Отрабатывает в случае, когда играет музыкальная речь героев
        if (task_id.value === 1){
            preAudio.value.onended = () => {
                preAudio.value.src = new URL(
                `/assets/audio/${'Other/10.общее.mp3'}`,
                import.meta.url,
                ).href;
                preAudio.value.play();
                preAudio.value.onended = () => {
                    show_hand.value = true;
                    showBtn.value = false;
                    imgIsClickable.value = true;
                }
            }
        }
        else{
            preAudio.value.onended = () => {
            show_hand.value = true;
            showBtn.value = false;
            imgIsClickable.value = true;
        }
        }
    }
    else{

        preAudio.value.onended = () => {
            show_hand.value = false;
            showBtn.value = true;
        }
    }
};

const stopMusic = () => {
    preAudio.value.pause();
}

const clickOnHand = () => {
    if (!show_hand.value) return;
    show_hand.value = false;
    imgIsClickable.value = false;
    
    const selectedAudioObj = audio_state.value.find((audio) => audio.id === task_id.value);
    selectedAudioObj.currentSound = selectedAudioObj.startAudio;

    playMusic();
}


watch(
    () => route.params.id,
    (newId) => {
        if (newId) {
            childId = newId;
        }
    },
    { immediate: true },
);

watch(
    () => audio_state.value,
    () => {
        localStorage.setItem('LM_audio_state', JSON.stringify(audio_state.value));
    },
    {
        deep: true
    }
)

onBeforeRouteLeave((to, from) => {
    childId = null;
});

onMounted(() => {
    showHand();
    if (localStorage.getItem('LM_audio_state')){
        audio_state.value = JSON.parse(localStorage.getItem('LM_audio_state'));
    }
    document.getElementById('background-banner').src = getImageUrl(img.value);

    window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth;
    });
});


</script>
<style lang="scss" scoped>
#hand_1 {
    position: absolute;
    bottom: 25%;
    right: 45%;
    transform: translate(-50%, -50%);
    @media (max-width: 1400px) {
        bottom: 28%;
        right: 38%;
    }
}
#hand_2 {
    position: absolute;
    bottom: 28%;
    right: 46%;
    transform: translate(-50%, -50%);
    @media (max-width: 1400px) {
        bottom: 28%;
        right: 40%;
    }
}
#hand_3 {
    position: absolute;
    bottom: 38%;
    right: 58%;
    transform: translate(-50%, -50%);
    @media (max-width: 1400px) {
        bottom: 38%;
        right: 50%;
    }
}
#hand_4 {
    position: absolute;
    bottom: 35%;
    right: 44%;
    transform: translate(-50%, -50%);
    @media (max-width: 1400px) {
        bottom: 35%;
        right: 38%;
    }
}
#hand_5 {
    position: absolute;
    bottom: 40%;
    right: 41%;
    transform: translate(-50%, -50%);
    @media (max-width: 1400px) {
        bottom: 40%;
        right: 35%;
    }
}
#hand_6 {
    position: absolute;
    bottom: 38%;
    right: 39%;
    transform: translate(-50%, -50%);
    @media (max-width: 1400px) {
        bottom: 38%;
        right: 34%;
    }
}

#hand_13 {
    position: absolute;
    bottom: 40%;
    right: 56%;
    transform: translate(-50%, -50%);
    @media (max-width: 1400px) {
        bottom: 40%;
        right: 50%;
    }
}
#hand_8 {
    position: absolute;
    bottom: 38%;
    right: 34%;
    transform: translate(-50%, -50%);
    @media (max-width: 1400px) {
        bottom: 28%;
        right: 37%;
    }
}

#hand_7 {
    position: absolute;
    bottom: 38%;
    right: 34%;
    transform: translate(-50%, -50%);
    @media (max-width: 1400px) {
        bottom: 28%;
        right: 37%;
    }
}

#hand_14 {
    position: absolute;
    bottom: 30%;
    right: 54%;
    transform: translate(-50%, -50%);
    @media (max-width: 1400px) {
        bottom: 35%;
        right: 46%;
    }
}

#hand_16 {
    position: absolute;
    bottom: 45%;
    right: 26%;
    transform: translate(-50%, -50%);
    @media (max-width: 1400px) {
        bottom: 45%;
        right: 23%;
    }
}

#hand_18 {
    position: absolute;
    bottom: 32%;
    right: 26%;
    transform: translate(-50%, -50%);
    @media (max-width: 1300px) {
        bottom: 32%;
        right: 23%;
    }
}

#hand_9,
#hand_10,
#hand_11,
#hand_12,
#hand_15,
#hand_17 {
    display: none;
}

.game {
    display: flex;
    width: 1200px;
    padding: 56px 40px 56px 40px;
    margin: 60px 0px 90px 0px;
    background-color: $pink;
    border-radius: 20px;
    position: relative;

    @media (max-width: 1400px) {
        width: 944px;
    }
    &_img {
        width: 100%;
        cursor: pointer;
        &_disabled {
            cursor: not-allowed;
            pointer-events: none;
        }

        &_bg {
            max-width: 100%;
            border-radius: 20px;
            width: 100%;
            height: 530px;

            @media (max-width: 1400px) {
                height: 480px;
            }

            @media (max-width: 1024px) {
                height: 400px;
                max-width: 100%;
            }
        }
    }

    &_icons {
        &_item {
            width: 40px;
            height: 40px;
            background-color: #e6f2fa;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &_wrap {
            display: flex;
            column-gap: 8px;
            align-items: center;
            position: absolute;
            top: 25px;
            right: 16px;
        }
    }
}

.container-game {
    //margin: 0px auto;
    //padding: 0 120px;
    //max-width: 1440px;
    margin: 0px auto;
    width: 100%;
    padding: 0 120px;

    display: flex;
    justify-content: center;

    //@media (max-width: 1440px) {
    // max-width: 1200px;
    // }

    &_mobile {
        width: 100%;
        height: 100%;
        padding: 60px 26px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: 'Nunito', sans-serif;

        .mobile-text {
            font-size: 16px;
            font-weight: 400;
            text-align: center;
            max-width: 480px;
        }

        .mobile-img {
            width: 303px;
        }

        .mobile-modal {
            position: fixed;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 60px;
            background: #e6f2fa;
            height: 100vh;
            width: 100vw;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        .mobile-task {
            border-radius: 30px;
            background-color: #dfdfdf;
            color: #313131;
            max-width: 180px;
            width: 100%;
            padding: 5.5px 24px;
            height: 38px;
            color: #313131;
            font-family: 'Nunito', sans-serif;
            font-size: 20px;
            font-weight: 600;
            display: flex;
            justify-content: center;
            cursor: pointer;
            align-items: center;
        }

        .mobile-task-wrap {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            row-gap: 16px;
            column-gap: 8px;
        }

        .close {
            cursor: pointer;
            display: flex;
            justify-content: end;
        }

        .close-icon {
            position: relative;
            padding: 5px;
            margin-bottom: 10px;
        }
    }
}
</style>

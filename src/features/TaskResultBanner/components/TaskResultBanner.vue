<template>
    <div class="result-banner">
        <div v-if="props.is_end === false" class="result-banner__wrapper">
            <div class="close" @click="hide">
                <img
                    class="close-icon"
                    src="@app/assets/icons/close-icon.svg"
                    alt="крест"
                />
            </div>
            <div class="left-result">
                <div
                    class="left-result__greetings"
                    :class="{ 'test-result': props.is_test === true }"
                >
                    <h4 class="left-result__title-h4 text-center">
                        {{ props.text }}
                    </h4>
                    <img
                        v-if="props.is_test === false && props.img"
                        :src="props.img"
                        class="left-result__flowers"
                        id="result-banner"
                    />
                </div>
                <div v-if="props.is_test === false">
                    <button
                        @click="next"
                        class="left-result__button left-result__text"
                    >
                        <div class="left-result__wrap">
                            <span class="left-result__text">Далее</span>
                            <img
                                src="@app\assets\icons\vector.svg"
                                alt="vector"
                            />
                        </div>
                    </button>
                </div>
                <div v-else>
                    <button
                        @click="goToGames"
                        class="left-result__button left-result__text"
                    >
                        <div class="left-result__wrap">
                            <span class="left-result__text">К обучению</span>
                            <img
                                src="@app\assets\icons\vector.svg"
                                alt="vector"
                            />
                        </div>
                    </button>
                </div>
            </div>
            <div class="right-result">
                <img class="right-result__img-moa" id="result-bg" />
            </div>
        </div>
        <div v-else class="result-banner__wrapper">
            <div class="close" @click="hide">
                <img
                    class="close-icon"
                    src="@app/assets/icons/close-icon.svg"
                    alt="крест"
                />
            </div>
            <div class="end">
                <div class="end_wrapper">
                    <h4 class="left-result__title-h4 end_title">
                        Друг, спасибо за помощь! До новых встреч!
                    </h4>
                    <img class="end_img" id="result-bg" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from '@app/router';
import Button from '@shared/components/buttons/button.vue';
import { onBeforeUnmount, onMounted } from 'vue';
const emit = defineEmits(['hide', 'next']);
const hide = () => {
    emit('hide');
};

const props = defineProps({
    text: {
        type: String,
    },
    img: {
        type: String,
    },
    bg: {
        type: String,
    },
    is_test: {
        type: Boolean,
        default: false,
    },
    is_end: {
        type: Boolean,
        default: false,
    },
});

const goToGames = () => {
    if (localStorage.getItem('Token') !== null) {
        // router.push({
        //     name: 'Game',
        //     hash: '#game',
        //     params: { id: localStorage.getItem('user') },
        // });
        router.push({ name: 'profile-page' });
    } else {
        router.push({ name: 'Login' });
    }
};
const next = () => {
    emit('next');
};

onMounted(() => {
    if ((props.is_test === false) & (props.is_end === false) & props.img) {
        document.getElementById('result-banner').src = props.img;
    }
    document.getElementById('result-bg').src = props.bg;

    const scrollY = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.style.setProperty(
        '--scroll-position',
        `${scrollY}px`,
    );
    document.body.classList.add('no-scroll'); /* Прокрутка ставится на паузу */
    document.getElementsByTagName('html')[0].classList.add('no-scroll');

    console.log('banner mount');
});

onBeforeUnmount(() => {
    document.getElementsByTagName('html')[0].classList.remove('no-scroll');
    document.body.classList.remove('no-scroll'); /* Прокрутка возвращается */
    console.log('banner unmount');
});
</script>

<style lang="scss" scoped>
.close {
    display: flex;
    justify-content: center;
    align-items: center;

    right: 20px;
    top: 20px;
    position: absolute;
    cursor: pointer;
    background-color: #fff;
    border-radius: 100px;
    width: 48px;
    height: 48px;
}

.test-result {
    width: 100% !important;
    padding: 0px 40px;
}

.result-banner {
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    width: 100%;
    height: 100%;
    background-color: #fff;

    @media (max-width: 1024px) {
        height: 100%;
        max-width: 944px;
        width: 100%;
    }
}

.result-banner__wrapper {
    display: flex;
    width: 100%;
}

.left-result,
.right-result {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
}

.left-result {
    display: flex;
    flex-direction: column;
    gap: 48px;
}

.left-result__wrap {
    display: flex;
    justify-content: center;
    column-gap: 20px;
}

.left-result__greetings {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 260px;
    gap: 28px;

    @media (max-width: 1024px) {
        height: 217px;
        width: 164px;
        gap: 24px;
    }
}

.left-result__flowers {
    width: 203px;
    height: 198px;

    @media (max-width: 1024px) {
        height: 160px;
        width: 164px;
    }
}

.left-result__title-h4 {
    font-family: 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: 500;
    color: $darkBlue;
}

.left-result__button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: $button-primary;
    width: 280px;
    height: 56px;
    border-radius: 30px;

    @media (max-width: 1024px) {
        height: 48px;
        width: 260px;
    }
}

.left-result__text {
    // padding-right: 20px;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 500;
    color: #fff;

    &-small {
        font-size: 16px;
        font-weight: 400;
        color: $text-primary;
        font-family: 'Nunito', sans-serif;
    }
}

.right-result {
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: $blueGame;
}

.right-result__img-moa {
    width: 100%;
    height: auto;
    max-width: 405px;

    @media (max-width: 1024px) {
        max-width: 320px;
    }
}

.end {
    padding: 40px 0px 55px 0px;
    width: 100%;

    &_title {
        text-align: center;
        color: #313131;
    }

    &_img {
        display: block;
        margin: 10px auto;
    }
}

// При планшетном варианте ломает адаптив
// #result-bg {
//     width: 403px;
//     height: 407px;
// }
</style>

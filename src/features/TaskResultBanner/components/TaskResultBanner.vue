<template>
    <div class="result-banner">
        <div class="result-banner__wrapper">
            <div class="close" @click="hide">
                <img
                    class="close-icon"
                    src="@app/assets/icons/close-icon.svg"
                    alt="крест"
                />
            </div>
            <div class="left-result">
                <div class="left-result__greetings">
                    <h4 class="left-result__title-h4">{{ props.text }}</h4>
                    <img
                        class="left-result__flowers"
                        id="result-banner"
                        alt="flowers"
                    />
                </div>
                <div v-if="false">
                    <button class="left-result__button left-result__text">
                        <span class="left-result__text">Далее</span>
                        <img src="@app\assets\icons\vector.svg" alt="vector" />
                    </button>
                </div>
                <div v-if="true">
                    <button class="left-result__button left-result__text">
                        <span class="left-result__text">К обучению</span>
                        <img src="@app\assets\icons\vector.svg" alt="vector" />
                    </button>
                </div>
            </div>
            <div class="right-result">
                <img
                    class="right-result__img-moa"
                    id="result-bg"
                    alt="Moa"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
const emit = defineEmits(['hide']);
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
    }
})

onMounted(() => {
    document.getElementById('result-banner').src = props.img;
    document.getElementById('result-bg').src = props.bg;
});



</script>

<style lang="scss" scoped>
.close {
    right: 20px;
    top: 20px;
    position: absolute;
    cursor: pointer;
    background-color: #fff;
    border-radius: 100px;
    width: 48px;
    height: 48px;
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

.left-result__greetings {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 203px;
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
    padding-right: 20px;
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
    @media (max-width: 1024px) {
        height: 327px;
        width: 320px;
    }
}

#result-bg {
    width: 403px;
    height: 407px;
}
</style>

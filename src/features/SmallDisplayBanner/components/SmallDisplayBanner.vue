<template>
    <div class="small-display">
        <div class="small-display__wrapper">
            <p class="small-display__wrapper-text">Чтобы полноценно использовать игры, необходимо разрешение экрана от 1024 px. Пожалуйста воспользуйтесь планшетом или компьютером. Мы ждем вас на нашем сайте</p>
            <img src="@app\assets\creatures\SmallDisplayBanner\moa.svg" alt="moa" class="small-display__wrapper-img">
        </div>
    </div>
</template>

<style lang="scss" scoped>

.small-display {
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1024px;
    height: 600px;
    background-color: #E6F2FA;
    justify-content: center;
    align-items: center;

    @media(max-width: 1024px) {
        width: 768px;
    }
    @media(max-width: 768px) {
        width: 568px;
    }
    @media(max-width: 568px) {
        width: 360px;
    }

    &__wrapper {
        display: flex;
        width: 100%;
        height: 80%;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        &-text {
            text-align: center;
            width: 80%;
            font-family: 'Nunito', sans-serif;
            font-weight: 400;
            font-size: 16px;
            @media(max-width: 568px) {
                width: 308px;
                height: 110px;
            }
        }
        &-img {
            padding-top: 30px;
        }
    }
}

</style>
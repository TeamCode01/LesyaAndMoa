<template>
    <!-- <div class="profile">
        <div class="profile__wrapper">
            <p class="text text__profile">Спасибо за регистрацию!</p>
            <p class="text profile__text">
                Чтобы начать обучение, создайте новую группу
            </p>
            <Button label="Добавить ребенка" class="profile__btn"></Button>
            <img
                class="profile__img"
                src="@app/assets/img/Profile/Moa.png"
                alt=""
            />
        </div>
    </div> -->
    <div class="profile-child">
        <div class="profile-child__wrapper">
            <div class="delete-profile">Удалить профиль</div>
            <div class="child__form">
                <p class="child__name">Мария Иванова</p>
                <p class="child__school">Школа №1514</p>
                <div class="child__scale">
                    <v-progress-linear
                        v-model="skill"
                        color="white"
                        height="25"
                    >
                        <template v-slot:default="{ value }">
                            <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                    </v-progress-linear>
                </div>
                <Button
                    label="Перейти к обучению"
                    class="profile__btn"
                ></Button>
                <Button
                    label="Добавить ребенка"
                    class="profile__btn add-children"
                ></Button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { ref } from 'vue';
const skill = ref(0);
</script>
<style lang="scss" scoped>
.profile {
    position: relative;
    height: 640px;
    margin: 60px auto;
    width: 937px;

    &__wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &__text {
        font-size: 28px;
        font-family: 'Nunito', sans-serif;
        font-weight: normal;
    }
}
.profile__btn {
    padding: 12px 104px;
    margin: 40px auto;
    margin-bottom: 0px;
}
.profile__img {
    position: absolute;
    top: 50px;
}
.text__profile {
    font-size: 28px;
    font-family: 'Nunito', sans-serif;
    font-weight: normal;
}
.add-children {
    padding: 12px 104px;
    margin: 40px auto;
    margin-bottom: 0px;
    background-color: white;
    color: black;
    border: 3px solid #4d65e5;
}
.profile-child {
    position: relative;
    height: 640px;
    margin: 60px auto;
    width: 937px;

    &__wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &__text {
        font-size: 28px;
        font-family: 'Nunito', sans-serif;
        font-weight: normal;
    }
}
</style>

<template>
    <div class="d-flex">
        <div class="Login">
            <h2>Вход в личный кабинет</h2>
            <div class="Form">
                <div class="login-input login-input--error" v-if="Error.value">
                    <p class="form-input red-error" name="email">
                        Указан неверный логин или пароль
                    </p>
                </div>
                <div class="login-input">
                    <label class="form-input__label">Логин</label>
                    <Input
                        @blur="v$.email.$touch()"
                        placeholder="Введите email"
                        name="email"
                        :class="{
                            'form-input': true,
                            red: isError.email,
                        }"
                        v-model:value="data.email"
                    ></Input>
                    <span v-if="isError.email" class="error-message">{{
                        isError.email[0]
                    }}</span>
                </div>
                <div class="login-input-pass">
                    <label class="form-input__label">Пароль</label>
                    <InputPass
                        placeholder="Введите пароль"
                        name="password"
                        class="form-input"
                        type="password"
                        v-model:value="data.password"
                        maxLength="20"
                    ></InputPass>
                </div>
                <router-link class="form-question-link" to="/change-password"
                    >Забыли пароль?</router-link
                >
                <Button
                    class="form-btn"
                    @click="LoginUser"
                    label="Войти"
                ></Button>
            </div>
            <router-link
                class="form-question-link form-link-reg"
                to="/Registration"
                >Зарегистрироваться</router-link
            >
        </div>
        <img class="img-auth" src="@app/assets/img/auth/Moa.png" alt="" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Button } from '@shared/components/buttons';
import { Input } from '@shared/components/inputs';
import { InputPass } from '@shared/components/inputs';
import { HTTP } from '@app/http';
import { useUserStore } from '@layouts/stores/user';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { watchEffect } from 'vue';
import { required } from '@vuelidate/validators';

const userStore = useUserStore();
const data = ref({
    email: '',
    password: '',
});

const rules = {
    email: { required },
};

const v$ = useVuelidate(rules, data);
const isError = ref({});
const router = useRouter();

watchEffect(() => {
    isError.value = {};
    if (v$.value.$invalid) {
        if (v$.value.email.$error) {
            isError.value.email = ['Данное поле должно быть заполнено'];
        }
    }
});

const LoginUser = async () => {
    try {
        const response = await HTTP.post('/token/login/', data.value);
        data.value = response.data;
        localStorage.setItem('Token', response.data.auth_token);
        userStore.getUser();
        Error.value = false;
        router.push({
            name: 'profile-page',
            params: { id: response.data.id },
        });
    } catch (error) {
        console.log('errr', error);
        Error.value = error.response.data;
        isError.value = true;
    }
};
</script>
<style lang="scss" scoped>
.d-flex {
    display: flex;
    row-gap: 50px;
    position: relative;
    justify-content: center;
}

.Login {
    margin: 50px 0 200px 0;
    display: flex;
    flex-direction: column;
    width: 500px;
    padding: 32px 60px 32px 60px;
    background-color: #fae6f2;
    border-radius: 20px;

    @media (max-width: 1140px) {
        margin-bottom: 550px;
        padding-left: 30px;
        padding-right: 30px;
        min-width: 415px;
    }
    @media (max-width: 568px) {
        min-width: 90vw;
    }
}
.Login h2 {
    font-size: 32px;
    font-family: 'Nunito', sans-serif;
    font-weight: normal;
    @media (max-width: 768px) {
        font-size: 24px;
    }
    @media (max-width: 768px) {
        font-size: 22px;
    }
}
.Form {
    padding: 28px 0;
    display: flex;
    flex-direction: column;
}
.login-input {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    margin-bottom: 16px;
}
.login-input--error {
    background-color: #fff;
    border-radius: 10px;
}

.login-input-pass {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    margin-bottom: 8px;
}
.login-input label,
.login-input-pass label {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
}
.form-input {
    padding: 12px 18px;
    border-radius: 10px;
    border: none;
}
.form-input::placeholder {
    font-family: 'Nunito', sans-serif;
}
.form-question-link {
    align-self: end;
    font-size: 16px;
    font-family: 'Nunito', sans-serif;
    text-decoration: underline;
    margin-bottom: 20px;
    color: #35383f;
}
.form-btn {
    border: none;
    padding: 12px 10px;
    border-radius: 30px;
    color: white;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    background-color: #4d65e5;
}
.form-link-reg {
    align-self: center;
}
.img-auth {
    position: absolute;
    left: 75%;
    top: 125px;
    @media (max-width: 1200px) {
        width: 213px;
        height: 403px;
    }
    @media (max-width: 1140px) {
        top: 620px;
        left: 50%;
        margin-left: -106px;
    }
}
.error-message {
    font-family: 'Nunito', sans-serif;
    color: #ff535c;
    font-size: 16px;
    font-weight: 400;
    line-height: 21.82px;
    position: relative;
    bottom: 15px;
}
.red-error {
    border: 2px solid red !important;
}
.form-input__label {
    font-family: 'Nunito', sans-serif;
}
</style>

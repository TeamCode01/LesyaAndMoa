<template>
    <div class="AuthWrapper">
        <div class="container">
            <div class="d-flex">
                <div class="Login">
                    <h2>Смена почты</h2>
                    <form @submit.prevent="submitForm" class="Form">
                        <p>
                            В соответствии с законодательством Российской
                            Федерации и в целях обеспечения бесперебойного
                            доступа к вашему аккаунту авторизация возможна
                            только с использованием почтовых адресов на
                            российских доменах в зонах .ru, .su и .рф.
                            Пожалуйста, привяжите к аккаунту адрес на mail.ru,
                            vk.ru, ya.ru или любом другом российском сервисе.
                        </p>
                        <div class="login-input">
                            <label class="form-input__label"
                                >Новый адрес электронной почты</label
                            >
                            <Input
                                placeholder="Введите email"
                                name="new_email"
                                :class="{
                                    'form-input': true,
                                    red: isError.new_email,
                                }"
                                v-model:value="newEmail"
                            ></Input>
                            <span v-if="isError.new_email" class="error-message">{{
                                isError.new_email[0]
                            }}</span>
                        </div>
                        <div class="login-input-pass">
                            <label class="form-input__label"
                                >Текущий пароль</label
                            >
                            <Input
                                placeholder="Введите пароль"
                                name="current_password"
                                type="password"
                                :class="{
                                    'form-input': true,
                                    red: isError.current_password,
                                }"
                                v-model:value="currentPassword"
                            ></Input>
                            <span v-if="isError.current_password" class="error-message">{{
                                isError.current_password[0]
                            }}</span>
                        </div>
                        <Button
                            class="form-btn"
                            label="Сохранить новую почту"
                            :disabled="isLoading || !newEmail || !currentPassword || !isEmailZoneValid"
                        ></Button>
                        <div class="form-question">
                            <span class="form-question-link" @click="onLogOut"
                                >Выйти</span
                            >
                        </div>
                    </form>
                </div>
                <img
                    class="img-auth"
                    src="@app/assets/img/auth/Moa.png"
                    alt=""
                />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, watchEffect } from 'vue';
import { Input } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { HTTP } from '@app/http';
import { useRouter } from 'vue-router';
import { useUserStore } from '@layouts/stores/user';

const router = useRouter();
const userStore = useUserStore();

const emailZoneRegex = /\.(ru|su|рф)$/i;
const EMAIL_ZONE_ERROR = 'В соответствии с законодательством Российской Федерации и в целях обеспечения бесперебойного доступа к вашему аккаунту регистрация возможна только с использованием почтовых адресов на российских доменах в зонах .ru, .su и .рф. Пожалуйста, укажите адрес на mail.ru, vk.ru, ya.ru или любом другом российском сервисе.';

const isLoading = ref(false);
const newEmail = ref('');
const currentPassword = ref('');
const isError = ref({});

watchEffect(() => {
    if (newEmail.value && !emailZoneRegex.test(newEmail.value)) {
        isError.value = { ...isError.value, new_email: [EMAIL_ZONE_ERROR] };
    } else if (isError.value.new_email?.[0] === EMAIL_ZONE_ERROR) {
        const { new_email, ...rest } = isError.value;
        isError.value = rest;
    }
});

const isEmailZoneValid = computed(() => emailZoneRegex.test(newEmail.value));

const submitForm = async () => {
    if (!isEmailZoneValid.value) {
        isError.value = { ...isError.value, new_email: [EMAIL_ZONE_ERROR] };
        return;
    }
    try {
        isLoading.value = true;
        await HTTP.post('/users/set_email/', {
            current_password: currentPassword.value,
            new_email: newEmail.value,
        });
        await userStore.getUser();
        router.push({ name: 'profile-page' });
    } catch (error) {
        isError.value = error.response?.data || {};
    } finally {
        isLoading.value = false;
    }
};

const onLogOut = async () => {
    try {
        await HTTP.post('token/logout/', {});
    } catch (error) {
        console.error(error);
    } finally {
        localStorage.removeItem('Token');
        localStorage.removeItem('type');
        userStore.logOut();
        router.push({ name: 'Login' });
    }
};
</script>
<style lang="scss" scoped>
.AuthWrapper {
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(/assets/img/auth/background.png);
}

.container {
    margin: 0 auto;
    padding: 0 120px;
    max-width: 1440px;
}

.d-flex {
    display: flex;
    row-gap: 50px;
    justify-content: center;
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
}

.Login {
    margin: 50px 0 400px 0;
    display: flex;
    flex-direction: column;
    max-width: 500px;
    padding: 32px 60px 32px 60px;
    background-color: #fae6f2;
    border-radius: 20px;

    @media (max-width: 1024px) {
        margin-bottom: 500px;
    }
    @media (max-width: 768px) {
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
}

.Form {
    padding: 28px 0;
    display: flex;
    flex-direction: column;
}

.Form p {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    margin-bottom: 20px;
}

.login-input {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    margin-bottom: 16px;
}

.login-input label {
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

.form-question {
    align-self: center;
    margin-top: 20px;
    font-size: 16px;
    font-family: 'Nunito', sans-serif;
}

.form-question-link {
    text-decoration: underline;
    cursor: pointer;
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

.error-message {
    font-family: 'Nunito', sans-serif;
    color: #ff535c;
    font-size: 16px;
    font-weight: 400;
    line-height: 21.82px;
    position: relative;
    bottom: 15px;
}

.img-auth {
    position: absolute;
    right: -100px;
    top: 100px;

    @media (max-width: 1200px) {
        width: 213px;
        height: 403px;
    }
    @media (max-width: 1024px) {
        top: 500px;
        left: 50%;
        margin-left: -106px;
    }
    @media (max-width: 440px) {
        top: 570px;
    }
}
.form-input__label {
    font-family: 'Nunito', sans-serif;
}
</style>

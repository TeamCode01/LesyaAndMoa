<template>
    <div class="AuthWrapper">
        <div class="container">
            <div class="d-flex">
                <div class="Login">
                    <h2>Восстановление пароля</h2>
                    <form class="Form" @submit.prevent="recoveryPass">
                        <div class="login-input-pass">
                            <label>Введите новый пароль</label>
                            <Input
                                placeholder="Введите пароль"
                                name="password"
                                class="form-input"
                                v-model:value="new_pass"
                            ></Input>
                        </div>
                        <div class="login-input-pass">
                            <label>Подтвердите новый пароль</label>
                            <Input
                                placeholder="Введите пароль"
                                name="password"
                                class="form-input"
                                v-model:value="new_pass_confirm"
                            ></Input>
                        </div>
                        <Button class="form-btn">Сохранить пароль</Button>
                    </form>
                </div>
                <img
                    class="img-auth"
                    src="@app/assets/img/auth/Lesya.png"
                    alt=""
                />
            </div>
        </div>
    </div>
</template>
<script setup>
import { Input } from '@shared/components/inputs';
import {ref, inject} from 'vue'
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const swal = inject('$swal');
const isError = ref([]);
const user = ref({});
const new_pass = ref('');
const router = useRouter();
const route = useRoute();
const new_pass_confirm = ref('');

const auth = computed(() => ({
    uid: route.params.uid,
    token: route.params.token,
}));

const recoveryPass = async () => {
    if (new_pass.value !== new_pass_confirm.value) {
        console.error('Passwords do not match');
        return;
    }

    try {
        const response = await HTTP.post('/users/reset_password_confirm/', {
            ...auth.value,
            new_password: new_pass.value,
        });
        router.push({
            name: 'Login',
        });
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        isError.value = error.response.data;
        console.error(error);
        if (isError.value) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `ошибка`,
                showConfirmButton: false,
                timer: 1500,
            });
        }
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
    padding: 0 90px;
    max-width: 1440px;
}
.d-flex {
    display: flex;
    row-gap: 50px;
    justify-content: center;
    position: relative;
    margin: 0 auto;
}
.Login {
    margin: 50px 0 260px 0;
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
    padding: 28px 0 0 0;
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
.login-input-pass {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    margin-bottom: 16px;
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
}
.form-btn {
    border: none;
    padding: 12px 10px;
    border-radius: 30px;
    color: white;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    background-color: #4d65e5;
    margin-top: 4px;
}
.form-link-reg {
    align-self: center;
}
.img-auth {
    position: absolute;
    left: -15px;
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
</style>

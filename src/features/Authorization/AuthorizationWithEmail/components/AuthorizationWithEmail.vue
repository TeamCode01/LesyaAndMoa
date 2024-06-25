<template>
    <div class="d-flex">
        <div class="Login">
            <h2>Вход в личный кабинет</h2>
            <div class="Form">
                <div class="login-input">
                    <label>Логин</label>
                    <Input
                        placeholder="Введите email"
                        name="email"
                        class="form-input"
                        v-model:value="data.email"
                    ></Input>
                </div>
                <div class="login-input-pass">
                    <label>Пароль</label>
                    <InputPass
                        placeholder="Введите пароль"
                        name="password"
                        class="form-input"
                        type="password"
                        v-model:value="data.password"
                    ></InputPass>
                </div>
                <a class="form-question-link" href="/change-password"
                    >Забыли пароль?</a
                >
                <Button
                    class="form-btn"
                    @click="LoginUser"
                    label="Войти"
                ></Button>
            </div>
            <a class="form-question-link form-link-reg" href="/Registration"
                >Зарегистрироваться</a
            >
        </div>
        <img class="img-auth" src="@app/assets/img/auth/Moa.png" alt="" />
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { Button } from '@shared/components/buttons';
import { Input } from '@shared/components/inputs';
import { InputPass } from '@shared/components/inputs';
import { HTTP } from '@app/http';
import { useRouter } from 'vue-router';

const swal = inject('$swal');
const data = ref({
    email: '',
    password: '',
});
const isLoading = ref(false);
const isError = ref([]);
const router = useRouter();

const LoginUser = async () => {
    try {
        isLoading.value = true;
        const response = await HTTP.post('/token/login/', data.value);
        data.value = response.data;
        localStorage.setItem('Token', response.data.auth_token);
        isLoading.value = false;
        HTTP.get(`/users/me/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        router.push({
            name: 'profile',
            params: { id: response.data.id },
        });
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;
        console.error('There was an error!', error);
        isLoading.value = false;
        if (isError.value) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `ошибка`,
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.d-flex {
    display: flex;
    row-gap: 50px;
    justify-content: center;
    position: relative;
}
.Login {
    margin: 50px 0 200px 0;
    display: flex;
    flex-direction: column;
    max-width: 500px;
    padding: 32px 60px 32px 60px;
    background-color: #fae6f2;
    border-radius: 20px;
}
.Login h2 {
    font-size: 32px;
    font-family: 'Nunito', sans-serif;
    font-weight: normal;
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
    right: -15px;
    top: 100px;
}
</style>
<<<<<<< HEAD <<<<<<< HEAD ======= >>>>>>>
da9f36cd33f26530dae58710d3562086746c7658 ======= >>>>>>>
f4b7a95a0661c29901fa561f9cee2b8e5eb4eee3

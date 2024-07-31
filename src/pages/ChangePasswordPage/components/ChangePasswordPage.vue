<template>
    <div class="AuthWrapper">
        <div class="container">
            <div class="d-flex">
                <div class="Login">
                    <h2>Восстановление пароля</h2>
                    <form @submit.prevent="changePass" class="Form">
                        <p>
                            Пожалуйста введите адрес почты, который вы указывали
                            при регистрации и мы отправим ссылку для
                            восстановления пароля.
                        </p>
                        <div class="login-input">
                            <label>Электронная почта</label>
                            <Input placeholder="Введите email" name="email" class="form-input"
                                v-model:value="data.email"></Input>
                        </div>
                        <Button class="form-btn">Воccтановить пароль</Button>
                    </form>
                </div>
                <img class="img-auth" src="@app/assets/img/auth/Moa.png" alt="" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { Input } from '@shared/components/inputs';
import { ref, inject } from 'vue';
import { HTTP } from '@app/http';
import { useRouter } from 'vue-router';


const swal = inject('$swal');
const isError = ref([]);
const data = ref({
    email: ''
})

const changePass = async () => {
    try {
        if (!data.value) {
            return;
        }
        const response = await HTTP.post('/reset_password/', data.value);
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
        data.value = ''
    } catch(error) {
        isError.value = error.response.data;
        console.error('There was an error!', error);
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

}

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
}

.Login {
    margin: 50px 0 400px 0;
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

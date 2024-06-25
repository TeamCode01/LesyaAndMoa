<template>
    <div class="d-flex">
        <div class="Reg">
            <h2>Регистрация</h2>
            <div class="Form">
                <div class="login-input-pass">
                    <label>Логин</label>
                    <Input
                        placeholder="Введите логин"
                        name="login"
                        class="form-input"
                        v-model:value="form.email"
                    ></Input>
                </div>
                <div class="login-input-pass">
                    <label>Введите пароль</label>
                    <Input
                        placeholder="Введите пароль"
                        name="password"
                        class="form-input"
                        v-model:value="form.password"
                        type="password"
                    ></Input>
                </div>
                <div class="login-input-pass">
                    <label>Повторите пароль</label>
                    <Input
                        placeholder="Введите пароль"
                        name="password"
                        class="form-input"
                        v-model:value="form.re_password"
                        type="password"
                    ></Input>
                </div>
                <SelectSort
                    v-model="form.tasks_type"
                    :items="tasksChoose"
                    name="select_position"
                    id="select-position"
                    :options="tasksChoose"
                    class="invents-select"
                    clearable
                    placeholder="Выберите формат занятий"
                    variant="outlined"
                    :sorts-boolean="false"
                    @update:value="changeOption"
                    v-bind="props"
                />

                <div class="regCheck">
                    <input
                        type="checkbox"
                        v-model="form.data_processing_agreement"
                    />
                    <div class="regCheck_text">
                        даю согласие на обработку персональных данных
                        и ознакомлен с политикой конфиденциальности
                    </div>
                </div>
                <Button
                    label="Зарегистрироваться"
                    class="form-btn"
                    @click="RegisterUser"
                ></Button>
                <div class="form-question">
                    Уже есть аккаунт?&nbsp;<a
                        class="form-question-link"
                        href="/Login"
                        >Войти</a
                    >
                </div>
            </div>
        </div>
        <img class="img-auth" src="@app/assets/img/auth/Lesya.png" alt="" />
    </div>
</template>
<script setup>
import { ref, inject } from 'vue';
import { HTTP } from '@app/http';
import { Input } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { SelectSort } from '@shared/components/selects';
import { useRouter } from 'vue-router';

const tasksChoose = ref([
    { value: 'Групповые занятия', name: 'Групповые занятия' },
    { value: 'Индивидуальные занятия', name: 'Индивидуальные занятия' },
]);

const router = useRouter();
const swal = inject('$swal');
const isError = ref([]);
const form = ref({
    email: '',
    password: '',
    re_password: '',
    tasks_type: null,
    data_processing_agreement: false,
});

const RegisterUser = async () => {
    try {
        const response = await HTTP.post('/users/', form.value, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        form.value = response.data;
        console.log(response.data);
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
.Reg {
    margin: 50px 0 200px 0;
    display: flex;
    flex-direction: column;
    max-width: 500px;
    padding: 32px 60px 32px 60px;
    background-color: #fae6f2;
    border-radius: 20px;
    align-items: center;
}
.Reg h2 {
    font-size: 32px;
    font-family: 'Nunito', sans-serif;
    font-weight: normal;
}
.Form {
    padding: 28px 0 0 0;
    display: flex;
    flex-direction: column;
    width: 380px;
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

.form-question {
    align-self: center;
    margin-top: 28px;
    margin-bottom: 0;
    font-size: 16px;
    font-family: 'Nunito', sans-serif;
}
.form-question-link {
    text-decoration: underline;
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
}

.regCheck {
    margin-top: 8px;
    display: flex;
    margin-bottom: 28px;
    input {
        width: 20px;
        height: 20px;
        border: 1px solid black;
    }
    &_text {
        max-width: 300px;
        font-family: 'Nunito', sans-serif;
        font-size: 14px;
        color: #35383f;
        font-weight: 500;
        margin-left: 8px;
    }
}
.select-education {
    padding: 12px 18px;
    border-radius: 10px;
    border: none;
    background-color: white;
    font-family: 'Nunito', sans-serif;
}
.form-question-link {
    color: #35383f;
    font-family: 'Nunito', sans-serif !important;
    font-size: 16px;
}
</style>

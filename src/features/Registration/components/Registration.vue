<template>
    <div class="d-flex">
        <div class="Reg">
            <h2>Регистрация</h2>
            <div class="Form">
                <div class="login-input-pass">
                    <label class="form-input__label">Логин</label>
                    <Input
                        @blur="v$.email.$touch()"
                        placeholder="Введите логин"
                        name="login"
                        :class="{
                            'form-input': true,
                            red: isError.email,
                        }"
                        v-model:value="form.email"
                    ></Input>
                    <span v-if="isError.email" class="error-message">{{
                        isError.email[0]
                    }}</span>
                </div>
                <div class="login-input-pass">
                    <label class="form-input__label">Введите пароль</label>
                    <Input
                        @blur="v$.password.$touch()"
                        placeholder="Введите пароль"
                        name="password"
                        :class="{
                            'form-input': true,
                            red: isError.password,
                        }"
                        v-model:value="form.password"
                        type="password"
                        maxLength="20"
                    ></Input>
                    <span v-if="isError.password" class="error-message">{{
                        isError.password[0]
                    }}</span>
                </div>
                <div class="login-input-pass">
                    <label class="form-input__label">Повторите пароль</label>
                    <Input
                        @blur="v$.re_password.$touch()"
                        placeholder="Введите пароль"
                        name="password"
                        :class="{
                            'form-input': true,
                            red: isError.re_password,
                        }"
                        v-model:value="form.re_password"
                        type="password"
                        maxLength="20"  
                    ></Input>
                    <span v-if="isError.re_password" class="error-message">{{
                        isError.re_password[0]
                    }}</span>
                </div>
                <SelectSort
                    @blur="v$.tasks_type.$touch()"
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
                <span v-if="isError.tasks_type" class="error-message">{{
                    isError.tasks_type[0]
                }}</span>

                <div class="regCheck">
                    <input
                        type="checkbox"
                        v-model="form.data_processing_agreement"
                    />
                    <div class="regCheck_text">
                        даю согласие на обработку
                        <router-link
                            class="form-question-link"
                            to="/politika"
                            target="_blank"
                            >персональных данных</router-link
                        >
                        и ознакомлен с 
                        <router-link
                            class="form-question-link"
                            to="/policy"
                            target="_blank"
                            >политикой конфиденциальности</router-link
                        >
                    </div>
                </div>
                <Button
                    label="Зарегистрироваться"
                    class="form-btn"
                    :disabled="!isFormValid"
                    @click="
                        if (isFormValid) {
                            RegisterUser();
                        }
                    "
                ></Button>
                <div class="form-question">
                    Уже есть аккаунт?&nbsp;<router-link
                        class="form-question-link"
                        to="/Login"
                        >Войти</router-link
                    >
                </div>
            </div>
        </div>
        <img class="img-auth" src="@app/assets/img/auth/Lesya.png" alt="" />
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { HTTP } from '@app/http';
import { Input } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { SelectSort } from '@shared/components/selects';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { watchEffect } from 'vue';

const tasksChoose = ref([
    { value: 'групповой', name: 'Групповые занятия' },
    { value: 'индивидуальный', name: 'Индивидуальные занятия' },
]);

const router = useRouter();
const form = ref({
    email: '',
    password: '',
    re_password: '',
    tasks_type: null,
    data_processing_agreement: false,
});

const rules = {
    email: { required },
    password: { required, minLength: minLength(8) },
    re_password: { required },
    tasks_type: { required },
};

const v$ = useVuelidate(rules, form);
const isError = ref({});

const cyrillicPattern = /[\u0400-\u04FF]+/;

watchEffect(() => {
    isError.value = {};
    if (v$.value.$invalid) {
        if (v$.value.email.$error) {
            isError.value.email = ['Неверный e-mail'];
        }
        if (v$.value.password.$error) {
            isError.value.password = [
                'Пароль должен содержать не менее 8 символов, используйте латиницу, спецсимволы (@#$%&*!), заглавные и прописные буквы, цифры.',
            ];
        }
        if (form.value.password != form.value.re_password) {
            isError.value.re_password = ['Пароли не совпадают'];
        }
        if (v$.value.tasks_type.$error) {
            isError.value.tasks_type = ['Поле должно быть заполнено'];
        }
    }


    if (form.value?.password != form.value?.password?.replace(cyrillicPattern, '')) {
        console.log('cyrillic');
        isError.value.password = [
            'Пароль не должен содержать кириллицу',
        ];
    }

});
const isFormValid = computed(() => {
    return (
        form.value.email !== '' &&
        form.value.password !== '' &&
        form.value.re_password !== '' &&
        form.value.tasks_type !== '' &&
        form.value.data_processing_agreement !== false
    );
});

const RegisterUser = async () => {
    try {
        const response = await HTTP.post('/users/', form.value);
        router.push({
            name: 'Login',
        });

        setTimeout(() => {
            form.value = {
                email: '',
                password: '',
            };
            v$.value.$reset(); 
        }, 500);

    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;
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
    width: 500px;
    padding: 32px 60px 32px 60px;
    background-color: #fae6f2;
    border-radius: 20px;
    align-items: center;

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

.Reg h2 {
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
    padding: 28px 0 0 0;
    display: flex;
    flex-direction: column;
    width: 90%;
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
    top: 170px;

    @media (max-width: 1300px) {
        width: 219px;
        height: 403px;
    }

    @media (max-width: 1140px) {
        top: 870px;
        left: 50%;
        margin-left: -106px;
    }
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
        font-size: 16px;
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

.error-message {
    font-family: 'Nunito', sans-serif;
    color: #ff535c;
    font-size: 16px;
    font-weight: 400;
    line-height: 21.82px;
    position: relative;
    bottom: 15px;
}
.form-input__label {
    font-family: 'Nunito', sans-serif;
}
</style>

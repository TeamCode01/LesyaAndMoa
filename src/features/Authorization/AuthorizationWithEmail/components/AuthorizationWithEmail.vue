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
                    ></Input>
                </div>
                <div class="login-input-pass">
                    <label>Пароль</label>
                    <Input
                        placeholder="Введите пароль"
                        name="password"
                        class="form-input"
                    ></Input>
                </div>
                <a class="form-question-link">Забыли пароль?</a>
                <Button class="form-btn">Войти</Button>
            </div>
            <a class="form-question-link form-link-reg">Зарегистрироваться</a>
        </div>
    </div>
</template>


<script setup></script>
<style lang="scss" scoped>
.d-flex {
    display: flex;
    justify-content: center;
}
.Login {
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
</style>


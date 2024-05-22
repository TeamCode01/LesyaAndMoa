<template>
    <div class="Page">
        <div class="container">
            <section class="error-404">
                <div class="container">
                    <img
                        class="Lesya"
                        src="@app/assets/img/404/Lesya.png"
                        alt=""
                    />
                    <div class="error-404__container">
                        <h1>404</h1>
                        <p>
                            Что-то пошло не так, этой страницы не существует.
                            У нас на сайте вы найдете много интересного,
                            возвращайтесь на главную страницу
                        </p>
                        <button class="error-404__button">
                            <a href="/">Вернуться на главную</a>
                        </button>
                    </div>
                    <img class="Moa" src="@app/assets/img/404/Moa.png" alt="" />
                </div>
            </section>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.Page {
    background-image: url('@app/assets/img/404/background.png');
    min-height: 710px;
}
.Moa {
    max-width: 416px;
    height: 538px;
}
.Lesya {
    max-width: 363px;
    height: 595px;
    margin-top: 80px;
}
.container {
    margin: 0 auto;
    max-width: 1440px;
    @media (max-width: 1350px) {
        padding: 0 40px;
    }
}
.error-404 {
    min-height: 660px;
}

.error-404__container {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding-top: 100px;
    padding-bottom: 100px;
    max-width: 488px;
    min-height: 314px;
}

.error-404 h1 {
    font-family: Nunito;
    color: #e237a7;
    font-style: normal;
    font-size: 200px;
    font-weight: normal;
}

.error-404 div {
    display: flex;
    justify-content: center;
}

.error-404 p {
    font-family: Nunito;
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 40px;
    margin-top: -50px;
    width: 488px;
}

.error-404__button {
    display: block;
    box-sizing: border-box;
    width: 420px;
    min-height: 51px;
    border-radius: 30px;
    background: #4d65e5;
    color: white;
    border: none;
    outline: none;
}
.error-404__button a {
    color: white;
    text-decoration-line: none;
    font-family: Nunito;
    font-size: 20px;
}
</style>

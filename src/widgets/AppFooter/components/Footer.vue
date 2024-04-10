<template>
    <footer class="footer">
        <div class="container">
            <div class="footer__wrapper">
                <div class="footer__wrapper_info">
                    <div class="footer__logo">
                        <a href="#" target="_blank">
                            <img
                                class="footer__logo_main"
                                src="@app/assets/icons/LogoLesya.png"
                                alt="Логотип сайта Леся и Моа"
                            />
                        </a>
                    </div>
                    <div class="footer__wrapper_text">
                        <p>© 2024 Организация</p>
                        <p>Все права защищены</p>
                    </div>
                </div>
                <div class="footer__wrapper_info">
                    <div class="footer__wrapper_phone">8 (900) 123-45-45</div>
                    <div class="footer__wrapper_links">
                        <router-link class="link-small" to="policy"
                            >Политика конфиденциональности</router-link
                        >
                        <router-link class="link-small" to="confirm"
                            >Пользовательское соглашение</router-link
                        >
                    </div>
                </div>
                <div class="footer__wrapper_info creator">
                    <div class="footer__logo">
                        <a href="#" target="_blank">
                            <img
                                class="footer__logo_sot"
                                src="@app/assets/icons/SOT.png"
                                alt="Логотип СОТ"
                            />
                        </a>
                    </div>
                    <div class="footer__wrapper_text">
                        <p>Дизайн и разработка</p>
                        <div class="footer__logo">
                            <a href="#" target="_blank">
                                <img
                                    class="footer__logo_club"
                                    src="@app/assets/icons/1TCLUB.png"
                                    alt="Логотип Союза РФ и TeamCode"
                                />
                            </a>
                        </div>
                        <a href="#" class="Freepik">Изображения от Freepik</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script setup></script>
<style lang="scss">
.footer {
    padding: 28px 0px 55px 0px;
    background-color: $footer;
    width: 100%;
    position: absolute;
    bottom: 0;
    &__logo {
        &_main {
            height: 40px;
            width: 110px;
            @media (max-width: 1024px) {
                height: 30px;
                width: 80px;
            }
        }
        &_sot {
            height: 40px;
            width: 67px;
            @media (max-width: 1024px) {
                height: 36px;
                width: 60px;
            }
        }
    }
    &__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        &_text {
            font-size: 16px;
            font-weight: 400;
            font-family: 'Nunito', sans-serif;
            margin-top: 40px;
            color: $text-primary;
            p {
                margin-bottom: 4px;
            }
        }
        &_links {
            margin-top: 40px;
            display: flex;
            flex-direction: column;
            row-gap: 4px;
        }
        &_phone {
            font-size: 20px;
            font-weight: 400;
            height: 40px;
            padding-top: 7px;
            font-family: 'Nunito', sans-serif;
        }
    }
}
.Freepik {
    font-size: 14px;
    color: $grey;
    text-decoration: none;
    font-weight: 400;
    font-family: 'Nunito', sans-serif;
}
.creator {
    @media (max-width: 1024px) {
       max-width: 301px;
    }
}
</style>

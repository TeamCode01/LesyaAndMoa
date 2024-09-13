<template>
    <footer class="footer" id="footer">
        <div class="container">
            <div class="footer__wrapper">
                <div class="footer__wrapper_info">
                    <div class="footer__logo">
                        <router-link to="/"> <img class="footer__logo_main" src="@app/assets/icons/LogoLesya.png"
                                alt="Логотип сайта Леся и Моа" /></router-link>
                        <a href="https://grant.obr.so/" target="_blank">
                            <img class="footer__logo_sot footer__logo_sot-small" src="@app/assets/icons/SOT.png"
                                alt="Логотип СОТ" />
                        </a>
                    </div>
                    <div class="footer__wrapper_text" id="footer__wrapper_text">
                        <p>© 2024 Организация</p>
                        <p>Все права защищены</p>
                    </div>
                </div>
                <div class="footer__wrapper_info">
                    <div class="footer__wrapper_phone">8 (900) 123-45-45</div>
                    <div class="footer__wrapper_links">
                        <a
                            class="link-small"
                            href="https://docs.google.com/document/d/1yrwy13in-UhEW80KpYaCUWKI6q3KdXutEhfkLx8p3j0/edit"
                            target="_blank"
                            >Политика конфиденциальности</a
                        >
                        <router-link class="link-small" to="/policy-page"  target="_blank">Пользовательское соглашение</router-link>
                    </div>
                </div>
                <div class="footer__wrapper_info creator">
                    <div class="footer__logo">
                        <a href="https://grant.obr.so/" target="_blank">
                            <img class="footer__logo_sot" src="@app/assets/icons/SOT.png" alt="Логотип СОТ" />
                        </a>
                    </div>
                    <div class="footer__wrapper_text" id="footer__wrapper_text-design">
                        <p>Дизайн и разработка</p>
                        <div class="footer__logo">
                            <a href="https://союз.рф/" target="_blank">
                                <img class="footer__logo_club" src="@app/assets/icons/1TCLUB.svg"
                                    alt="Логотип Союза РФ и TeamCode" />
                            </a>
                        </div>
                        <div class="footer__wrapper_text" id="footer__wrapper_text-568">
                            <p>© 2024 Организация</p>
                            <p>Все права защищены</p>
                        </div>
                        <a href="https://ru.freepik.com/" class="Freepik">Изображения от Freepik</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script setup></script>
<style lang="scss" scoped>
.container {
    
    @media (max-width: 720px) {
        display: flex;
        justify-content: center;
    }
}

#footer__wrapper_text {
    @media (max-width: 720px) {
        display: none;
    }
}

#footer__wrapper_text-568 {
    display: none;

    @media (max-width: 720px) {
        margin: 10px 0;
        display: block;
    }
}

#footer__wrapper_text-design {
    @media (max-width: 720px) {
        margin-top: 10px;
    }
}

.footer {
    padding: 28px 0px 55px 0px;
    background-color: $footer;
    width: 100%;
    margin-top: auto;

    &__logo {
        @media (max-width: 720px) {
            display: flex;
            justify-content: flex-start;
            width: 200px;
            justify-content: space-between;
        }

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

            @media (max-width: 720px) {
                display: none;
            }

            &-small {
                display: none;

                @media (max-width: 720px) {
                    display: inline-block;
                }
            }
        }
    }

    &__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        @media (max-width: 1440px) {
        }

        @media (max-width: 720px) {
            //width: 320px;
            flex-direction: column;
            align-items: flex-start;
            align-self: center;
            gap: 20px;
        }

        &_text {
            font-size: 16px;
            font-weight: 400;
            font-family: 'Nunito', sans-serif;
            margin-top: 40px;
            color: $text-primary;

            p {
                margin-bottom: 4px;
            }

            @media (max-width: 720px) {
                // display: none;
            }
        }

        &_links {
            margin-top: 40px;
            display: flex;
            flex-direction: column;
            row-gap: 4px;

            @media (max-width: 720px) {
                margin-top: 5px;
            }
        }

        &_phone {
            font-size: 20px;
            font-weight: 400;
            height: 40px;
            // padding-top: 7px;
            font-family: 'Nunito', sans-serif;

            @media (max-width: 720px) {
                display: flex;
                justify-content: flex-start;
            }
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

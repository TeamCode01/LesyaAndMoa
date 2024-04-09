<template>

        <header class="header">
            <div class="container">
                <div class="header__wrapper">
                    <div class="header_logo">
                        <a href="#" target="_blank">
                            <img
                                src="@app/assets/icons/LogoLesya.png"
                                alt="Логотип сайта Леся и Моа"
                            />
                        </a>
                    </div>

                    <ul class="header__wrapper_links">
                        <li><a href="#" class="link-small">О проекте</a></li>
                        <li><a href="#" class="link-small">Новости</a></li>
                        <li><a href="#" class="link-small">Контакты</a></li>
                        <li>
                            <a href="#" class="link-small">Поддержать проект</a>
                        </li>
                    </ul>
                    <div class="header__wrapper_adaptive">
                        <div class="header__wrapper_avatar">
                            <img
                                src="@app/assets/icons/avatar.png"
                                alt="Аватарка"
                            />
                            <div @click="showInfo">
                                <img
                                    class="header__wrapper_avatar_arrow"
                                    src="@app/assets/icons/icons-chevron.svg"
                                    alt="arrow"
                                />
                            </div>
                        </div>
                        <div class="header__wrapper_burger">
                            <img
                                src="@app/assets/icons/burger.png"
                                alt="Бургер меню"
                            />
                        </div>
                    </div>
                    <div class="header__wrapper_other">
                        <img src="@app/assets/icons/YouTube.svg" alt="Ютуб" />
                        <Button class="btn_info" label="Войти"></Button>
                    </div>
                </div>
            </div>
        </header>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
</script>
<style lang="scss">
.header {
    background-color: $header;
    padding: 30px 0;
    &__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &_avatar {
            display: flex;
            align-items: flex-end;
            column-gap: 2px;
            &_arrow {
                cursor: pointer;
            }
        }
        &_burger {
            img {
                cursor: pointer;
            }
        }
        a {
            img {
                height: 40px;
                width: 110px;
                @media (max-width: 1024px) {
                    height: 30px;
                    width: 80px;
                }
            }
        }
        &_adaptive {
            display: none;
            @media (max-width: 1024px) {
                display: flex;
                column-gap: 30px;
                align-items: center;
            }
        }
        &_links {
            list-style: none;
            display: flex;
            column-gap: 48px;
            @media (max-width: 1024px) {
                display: none;
            }
        }
        &_other {
            display: flex;
            column-gap: 37px;
            align-items: center;
            @media (max-width: 1024px) {
                display: none;
            }
        }
    }
}
</style>

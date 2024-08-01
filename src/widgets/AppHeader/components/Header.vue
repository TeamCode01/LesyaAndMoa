<template>
    <header class="header">
        <div class="container">
            <div class="header__wrapper">
                <div class="header__logo">
                    <a href="#" target="_blank">
                        <img class="header__logo_main" src="@app/assets/icons/LogoLesya.png"
                            alt="Логотип сайта Леся и Моа" />
                    </a>
                </div>
                <ul class="header__wrapper_links">
                    <li>
                        <a href="/about-project" class="link-small">О проекте</a>
                    </li>
                    <li><a href="#" class="link-small">Новости</a></li>
                    <li><a href="#" class="link-small">Контакты</a></li>

                    <li>
                        <a href="#" class="link-small">Поддержать проект</a>
                    </li>
                </ul>
                <!-- <router-link class="link" :to="{ name: 'Login' }">
                        <Button class="btn_info" label="Войти"></Button>
                </router-link> -->
                <div class="header__wrapper_adaptive">
                    <div v-if="Object.keys(userStore.currentUser).length" class="header__wrapper_avatar">
                        <img
                            src="@app/assets/icons/avatar.png"
                            alt="Аватарка"
                        />
                        <div @click="showModalMini = true">
                            <img
                                class="header__wrapper_avatar_arrow"
                                src="@app/assets/icons/icons-chevron.svg"
                                alt="arrow"
                            />
                        </div>
                    </div>

                    <Button class="btn_info" v-else label="Войти" @click="Login"></Button>


                    <div class="header__wrapper_burger" @click="showModal = true">
                        <img src="@app/assets/icons/burger.png" alt="Бургер меню" />
                    </div>
                </div>
                <div class="header__wrapper_other">
                    <div class="header__logo">
                        <a href="#" target="_blank">
                            <img class="header__logo_yt" src="@app/assets/icons/YouTube.svg" alt="Ютуб" />
                        </a>
                    </div>

                    <!-- <Button class="btn_info" v-if="user !== null" label="Выйти" @click="logOut"></Button> -->
                    <div v-if="Object.keys(userStore.currentUser).length" class="header__wrapper_avatar">
                        <img
                            src="@app/assets/icons/avatar.png"
                            alt="Аватарка"
                        />
                        <div @click="showModalMini = true">
                            <img
                                class="header__wrapper_avatar_arrow"
                                src="@app/assets/icons/icons-chevron.svg"
                                alt="arrow"
                            />
                        </div>
                    </div>

                    <Button class="btn_info" v-else label="Войти" @click="Login"></Button>
                </div>
            </div>
        </div>
    </header>
    <div class="modal" v-if="showModal">
        <div class="close" @click="showModal = false">
            <img class="close-icon" src="@app/assets/icons/icon-close.svg" alt="крест" />
        </div>
        <div class="modal__wrapper">
            <div class="header__logo">
                <a href="#" target="_blank">
                    <img class="header__logo_modal" src="@app/assets/icons/LogoLesya.png"
                        alt="Логотип сайта Леся и Моа" />
                </a>
            </div>
            <ul class="header__wrapper_links modal__menu">
                <li><a href="#" class="link-small">О проекте</a></li>
                <li><a href="#" class="link-small">Новости</a></li>
                <li><a href="#" class="link-small">Контакты</a></li>
                <li><a href="#" class="link-small">Поддержать проект</a></li>
                <li v-if="Object.keys(userStore.currentUser).length"><a href="/profile-page" class="link-small">Мой профиль</a></li>
                <div v-if="Object.keys(userStore.currentUser).length" class="link-small"  @click="logOut">Выйти</div>
                <li v-if="Object.keys(userStore.currentUser).length"><a href="#" class="link-small">Удалить профиль</a></li>
            </ul>
            <div class="header__logo">
                <a href="#" target="_blank">
                    <img class="header__logo_yt" src="@app/assets/icons/YouTube.svg" alt="Ютуб" />
                </a>
            </div>
        </div>
    </div>
    <div class="modal-mini" v-if="showModalMini">
        <div class="close" @click="showModalMini = false">
            <img
                class="close-icon"
                src="@app/assets/icons/icon-close.svg"
                alt="крест"
            />
        </div>
        <div class="modal__wrapper_mini">
            <div class="modal__wrapper_mini_info">
                <img src="@app/assets/icons/avatar.png" alt="Аватарка" />
                <p>{{ userStore.currentUser.email }}</p>
            </div>

            <ul class="header__wrapper_links modal__menu_mini">
                <div class="link-small" @click="logOut">Выйти</div>
                <li v-if="Object.keys(userStore.currentUser).length"><a href="/profile-page" class="link-small">Мой профиль</a></li>
                <li><a href="#" class="link-small">Удалить профиль</a></li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { ref } from 'vue';
import { HTTP } from '@app/http';
import { useRouter } from 'vue-router';
import { useUserStore } from '@layouts/stores/user';

const showModal = ref(false);
const showModalMini = ref(false);
const router = useRouter();
const userStore = useUserStore();

// const user = ref(localStorage.getItem('Token'));

const logOut = async () => {
    try {
        const response = await HTTP.post('token/logout/', {})
        localStorage.removeItem('Token');
        showModalMini.value = false;
        userStore.logOut();
        router.push({ name: 'Login' });
    } catch (error) {
        console.error(error);
    }
};

const Login = () => {
    router.push({ name: 'Login' })
}
</script>
<style lang="scss">
.link-small {
    cursor: pointer;
}
.header {
    background-color: $header;
    padding: 30px 0;

    &__logo {
        &_main {
            height: 40px;
            width: 110px;

            @media (max-width: 1024px) {
                height: 30px;
                width: 80px;
            }
        }

        &_yt {
            height: 40px;
            width: 40px;
        }

        &_modal {
            height: 32px;
            width: 90px;
        }
    }

    &__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40px;

        @media(max-width:568px) {
            padding: 0;
            &_adaptive {
                display: flex;
                justify-content: space-between;
                width: 60%;
            }
        }

        &_avatar {
            display: flex;
            align-items: baseline;
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
            align-items: stretch;

            @media (max-width: 1024px) {
                display: none;
            }
        }
    }
}

.modal {
    padding: 20px 20px 40px 40px;
    background: $header;
    border-radius: 10px;
    width: 315px;
    position: fixed;
    right: 5%;
    top: 15%;
    z-index: 1;
    &__wrapper {
        &_mini {
            &_info {
                display: flex;
                column-gap: 12px;
                align-items: center;

                p {
                    font-size: 20px;
                    font-weight: 400;
                    font-family: 'Nunito', sans-serif;
                    color: $black;
                }
            }
        }
    }

    &-mini {
        background: $header;
        border-radius: 10px;
        width: 318px;
        padding: 8px 8px 28px 28px;
        position: fixed;
        right: 10%;
        top: 15%;
        z-index: 99;
    }

    &__menu {
        display: block;
        margin-top: 40px;
        margin-bottom: 40px;

        &_mini {
            margin-bottom: 0px;
            display: block;
            margin-top: 28px;

            li {
                margin-top: 12px;
            }
        }

        li {
            margin-top: 12px;
        }
    }
}

.close {
    display: flex;
    justify-content: flex-end;
}
</style>

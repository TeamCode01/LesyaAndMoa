<template>
    <header class="header">
        <div class="container">
            <div class="header__wrapper">
                <div class="header__logo">
                    <router-link to="/"> <img class="header__logo_main" src="@app/assets/icons/LogoLesya.png"
                            alt="Логотип сайта Леся и Моа" /></router-link>


                </div>
                <ul class="header__wrapper_links">
                    <li>
                        <router-link class="link-small" to="/about-project">О проекте</router-link>
                    </li>
                    <li>
                        <router-link class="link-small" :to="{ hash: '#news' }">Новости</router-link>
                    </li>
                    <li>
                        <router-link class="link-small" to="/">Контакты</router-link>
                    </li>

                    <li>
                        <router-link class="link-small" to="/about">Поддержать проект</router-link>
                    </li>
                </ul>
                <div class="header__wrapper_adaptive">
                    <div v-if="Object.keys(userStore.currentUser).length" class="header__wrapper_avatar">
                        <img src="@app/assets/icons/avatar.png" alt="Аватарка" />
                        <div @click="showModalMini = true">
                            <img class="header__wrapper_avatar_arrow" src="@app/assets/icons/icons-chevron.svg"
                                alt="arrow" />
                        </div>
                    </div>
                    <Button class="btn_info" id="btn-mini" v-else label="Войти" @click="Login"></Button>

                    <div class="header__wrapper_burger" @click="showBurger()">
                        <img src="@app/assets/icons/burger.png" alt="Бургер меню" />
                    </div>
                </div>
                <div class="header__wrapper_other">
                    <div class="header__logo">
                        <a href="/">
                            <img class="header__logo_yt" src="@app/assets/icons/YouTube.svg" alt="Ютуб" />
                        </a>
                    </div>

                    <!-- <Button class="btn_info" v-if="user !== null" label="Выйти" @click="logOut"></Button> -->
                    <div v-if="Object.keys(userStore.currentUser).length" class="header__wrapper_avatar">
                        <img src="@app/assets/icons/avatar.png" alt="Аватарка" />
                        <div @click="showModalMini = true">
                            <img class="header__wrapper_avatar_arrow" src="@app/assets/icons/icons-chevron.svg"
                                alt="arrow" />
                        </div>
                    </div>

                    <Button class="btn_info" v-else label="Войти" @click="Login"></Button>
                </div>
            </div>
        </div>
    </header>
    <div class="modal" v-if="showModal">
        <div class="close" @click="closeMenu()">
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
                <li><a href="/about-project" class="link-small">О проекте</a></li>
                <li><a href="#" class="link-small">Новости</a></li>
                <li><a href="#" class="link-small">Контакты</a></li>
                <li><a href="#" class="link-small">Поддержать проект</a></li>
                <li v-if="Object.keys(userStore.currentUser).length">
                    <a href="/profile-page" class="link-small">Мой профиль</a>
                </li>
                <li v-if="Object.keys(userStore.currentUser).length" class="link-small" @click="logOut">
                    Выйти
                </li>
                <li v-if="Object.keys(userStore.currentUser).length">
                    <a href="#" class="link-small">Удалить профиль</a>
                </li>
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
            <img class="close-icon" src="@app/assets/icons/icon-close.svg" alt="крест" />
        </div>
        <div class="modal__wrapper_mini">
            <div class="modal__wrapper_mini_info">
                <img src="@app/assets/icons/avatar.png" alt="Аватарка" />
                <p>{{ userStore.currentUser.email }}</p>
            </div>

            <ul class="header__wrapper_links modal__menu_mini">
                <div class="link-small" @click="logOut">Выйти</div>
                <li v-if="Object.keys(userStore.currentUser).length">
                    <a href="/profile-page" class="link-small">Мой профиль</a>
                </li>
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

const showBurger = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.style.setProperty(
        '--scroll-position',
        `${scrollY}px`,
    );
    document.body.classList.add('no-scroll'); /* Прокрутка ставится на паузу */

    if (showModal.value === false) {
        showModal.value = true;
    } else {
        showModal.value = false;
        document.body.classList.remove('no-scroll');
    }
};

const closeMenu = () => {
    showModal.value = false;
    document.body.classList.remove('no-scroll'); /* Прокрутка возвращается */
};

const logOut = async () => {
    try {
        const response = await HTTP.post('token/logout/', {});
        localStorage.removeItem('Token');
        showModalMini.value = false;
        userStore.logOut();
        router.push({ name: 'Login' });
    } catch (error) {
        console.error(error);
    }
};

const Login = () => {
    router.push({ name: 'Login' });
};
</script>
<style lang="scss" scoped>
.link-small {
    cursor: pointer;
}

.no-scroll {
    overflow-y: scroll;
    /* Разрешает видимость полосы прокрутки */
    position: fixed;
    /* Запрещает прокрутку страницы */
    width: 100%;
    /* Фиксирует ширину страницы */
    top: calc(-1 * var(--scroll-position));
    /* Запоминает место прокрутки */
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

            @media (max-width: 580px) {
                height: 23px;
                width: 62px;
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
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40px;

        @media (max-width: 568px) {
            padding: 0;

            &_adaptive {
                display: flex;
                justify-content: space-between;
            }
        }

        &-btn-mini {
            @media (max-width: 580px) {
                position: absolute;
                left: 50%;
                margin-left: -39.5px;
                width: 79px;
                height: 30px;
                font-size: 16px !important;
                padding: 8px 16px !important;
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

#btn-mini {
    @media (max-width: 580px) {
        position: absolute;
        left: 50%;
        margin-left: -39.5px;
        width: 79px;
        height: 30px;
        font-size: 16px;
        padding: 4px 16px;
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
    &-icon {
        cursor: pointer;
    }

    display: flex;
    justify-content: flex-end;
}
</style>

<template>
    <header class="header">
        <div class="container">
            <div class="header__wrapper">
                <div class="header__logo">
                    <router-link to="/">
                        <img
                            class="header__logo_main"
                            src="@app/assets/icons/LogoLesya.png"
                            alt="Логотип сайта Леся и Моа"
                    /></router-link>
                </div>
                <ul class="header__wrapper_links">
                    <li>
                        <router-link class="link-small" :to="'/about-project'"
                            >О проекте</router-link
                        >
                    </li>
                    <li>
                        <router-link class="link-small" :to="'/news-page'"
                            >Новости</router-link
                        >
                    </li>
                    <li>
                        <router-link
                            class="link-small"
                            :to="{ name: 'main-page', hash: '#footer' }"
                            >Контакты</router-link
                        >
                    </li>

                    <li>
                        <router-link
                            class="link-small"
                            :to="{ name: 'about-project', hash: '#support' }"
                            >Поддержать проект</router-link
                        >
                    </li>
                </ul>
                <div class="header__wrapper_adaptive">
                    <div
                        v-if="Object.keys(userStore.currentUser).length"
                        class="header__wrapper_avatar"
                    >
                        <img
                            src="@app/assets/icons/avatar.png"
                            alt="Аватарка"
                        />
                        <div id="open-modal" @click="showBurger()">
                            <img
                                id="modal-mini"
                                class="header__wrapper_avatar_arrow"
                                src="@app/assets/icons/icons-chevron.svg"
                                alt="arrow"
                            />
                        </div>
                    </div>
                    <Button
                        class="btn_info"
                        id="btn-mini"
                        v-else
                        label="Войти"
                        @click="Login"
                    ></Button>

                    <div class="header__wrapper_burger" @click="showProfile()">
                        <img
                            id="burger"
                            src="@app/assets/icons/burger.png"
                            alt="Бургер меню"
                        />
                    </div>
                </div>
                <div class="header__wrapper_other">
                    <div class="header__logo">
                        <a href="/">
                            <img
                                class="header__logo_yt"
                                src="@app/assets/icons/YouTube.svg"
                                alt="Ютуб"
                            />
                        </a>
                    </div>

                    <!-- <Button class="btn_info" v-if="user !== null" label="Выйти" @click="logOut"></Button> -->
                    <div
                        v-if="Object.keys(userStore.currentUser).length"
                        class="header__wrapper_avatar"
                    >
                        <img
                            src="@app/assets/icons/avatar.png"
                            alt="Аватарка"
                        />
                        <div id="open-modal" @click="showBurger()">
                            <img
                                id="modal-mini"
                                class="header__wrapper_avatar_arrow"
                                src="@app/assets/icons/icons-chevron.svg"
                                alt="arrow"
                            />
                        </div>
                    </div>

                    <Button
                        class="btn_info"
                        v-else
                        label="Войти"
                        @click="Login"
                    ></Button>
                </div>
            </div>
        </div>
    </header>
    <div class="modal" v-if="showModal">
        <div class="close" @click="closeMenu()">
            <img
                class="close-icon"
                src="@app/assets/icons/icon-close.svg"
                alt="крест"
            />
        </div>
        <div class="modal__wrapper">
            <div class="header__logo">
                <a href="#" target="_blank">
                    <img
                        class="header__logo_modal"
                        src="@app/assets/icons/LogoLesya.png"
                        alt="Логотип сайта Леся и Моа"
                    />
                </a>
            </div>
            <ul class="header__wrapper_links modal__menu">
                <li>
                    <router-link class="link-small" to="/about-project"
                        >О проекте</router-link
                    >
                </li>
                <li>
                    <router-link class="link-small" to="/news-page"
                        >Новости</router-link
                    >
                </li>
                <li>
                    <router-link
                        class="link-small"
                        :to="{ name: 'main-page', hash: '#news' }"
                        >Контакты</router-link
                    >
                </li>

                <li>
                    <router-link
                        class="link-small"
                        :to="{ name: 'about-project', hash: '#support' }"
                        >Поддержать проект</router-link
                    >
                </li>
            </ul>
            <div class="header__logo">
                <a href="#" target="_blank">
                    <img
                        class="header__logo_yt"
                        src="@app/assets/icons/YouTube.svg"
                        alt="Ютуб"
                    />
                </a>
            </div>
        </div>
    </div>
    <div class="modal-mini" v-if="showModalMini">
        <div class="close" @click="closeMenu()">
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
                <li v-if="Object.keys(userStore.currentUser).length">
                    <router-link to="/profile-page" class="link-small"
                        >Мой профиль</router-link
                    >
                </li>
                <li class="link-small" @click="showDeleteModal()">
                    Удалить профиль
                </li>
            </ul>
        </div>
    </div>
    <div class="overlay" v-show="showDelete"></div>
    <div class="delete-profile__wrapper" v-show="showDelete">
        <h3 class="delete-profile__title">Удаление профиля пользователя</h3>

        <div>
            <div class="delete-profile_content">
                <p>Все данные будут удалены.</p>
                <div class="correct_password">
                    <InputPass
                        placeholder="Введите свой текущий пароль"
                        name="password"
                        class="form-input current-password"
                        :class="{
                            'form-input': true,
                            red: isError.current_password,
                        }"
                        type="password"
                        v-model:value="current_password"
                    ></InputPass>
                    <span
                        v-if="isError.current_password"
                        class="error-message"
                        >{{ isError.current_password[0] }}</span
                    >
                </div>
                <div class="regCheck delete-check">
                    <input type="checkbox" v-model="check" />
                    <div>&nbsp;Да, я хочу удалить профиль</div>
                </div>
            </div>

            <div class="delete-profile_btn">
                <Button
                    class="delete-btn"
                    :disabled="!check || !current_password"
                    label="Удалить"
                    @click="deleteUser()"
                ></Button>
                <Button
                    label="Отмена"
                    class="delete-btn"
                    @click="showDelete = !showDelete"
                ></Button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { ref } from 'vue';
import { HTTP } from '@app/http';
import { useRouter } from 'vue-router';
import { useUserStore } from '@layouts/stores/user';
import { InputPass } from '@shared/components/inputs';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { modalWindow, modalConfirm } from '@shared/components/modals';

const showModal = ref(false);
const showModalMini = ref(false);
const showDelete = ref(false);
const current_password = ref('');
const isError = ref({});
const check = ref(false);

const router = useRouter();
const userStore = useUserStore();

const showDeleteModal = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.style.setProperty(
        '--scroll-position',
        `${scrollY}px`,
    );
    document.body.classList.add('no-scroll'); /* Прокрутка ставится на паузу */

    if (showDelete.value === false) {
        showModalMini.value = false;
        showDelete.value = true;
    } else {
        showDelete.value = false;
        document.body.classList.remove('no-scroll');
    }
};

const showProfile = () => {
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
const showBurger = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.style.setProperty(
        '--scroll-position',
        `${scrollY}px`,
    );
    document.body.classList.add('no-scroll'); /* Прокрутка ставится на паузу */

    if (showModalMini.value === false) {
        showModalMini.value = true;
    } else {
        showModalMini.value = false;
        document.body.classList.remove('no-scroll');
    }

    document.body.classList.remove('no-scroll'); /* Прокрутка возвращается */
};

const closeMenu = () => {
    showModalMini.value = false;
    if (showModal.value == true) {
        showModal.value = false;
        document.body.classList.remove(
            'no-scroll',
        ); /* Прокрутка возвращается */
    }

    document.body.classList.remove('no-scroll'); /* Прокрутка возвращается */
};

const logOut = async () => {
    try {
        const response = await HTTP.post('token/logout/', {});
        localStorage.removeItem('Token');
        localStorage.removeItem('type');
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

const deleteUser = async () => {
    try {
        const response = await HTTP.delete(`/users/me/`, {
            data: {
                current_password: current_password.value,
            },
        });
        showDelete.value = false;
        localStorage.removeItem('Token');
        localStorage.removeItem('type');
        userStore.logOut();
        router.push({ name: 'Login' });
    } catch (error) {
        isError.value = error.response.data;
        console.log('error', error, isError);
    }
};

document.addEventListener('click', (event) => {
    if (
        (event.target.id !== 'delete-modal' &&
            event.target.matches('.delete-profile__wrapper')) ||
        (event.target.id !== 'modal-mini' &&
            !event.target.matches('.modal__wrapper_mini'))
    ) {
        showModalMini.value = false;
        document.body.classList.remove(
            'no-scroll',
        ); /* Прокрутка возвращается */
    }
    if (
        event.target.id !== 'burger' &&
        !event.target.matches('.modal__wrapper')
    ) {
        showModal.value = false;
        document.body.classList.remove(
            'no-scroll',
        ); /* Прокрутка возвращается */
    }
});

window.addEventListener('popstate', (event) => {
    closeMenu();
});
</script>
<style lang="scss">
.link-small {
    cursor: pointer;
}

.correct_password {
    width: 100%;
}

.regCheck {
    margin-top: 8px;
    display: flex;
    margin-bottom: 20px;

    input {
        width: 20px;
        height: 20px;
        border: 1px solid black;
    }

    &_text {
        max-width: 320px;
        font-family: 'Nunito', sans-serif;
        font-size: 14px;
        color: #35383f;
        font-weight: 500;
        margin-left: 8px;
    }
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

.delete-profile_user {
    display: flex;
    align-self: flex-start;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 98;
    display: flex;
    justify-content: center;
    align-items: center;
}

.delete-profile__wrapper {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    padding: 40px;
    background-color: #fff;
    border-radius: 10px;
    max-width: 464px;
    min-height: 326px;

    @media (max-width: 768px) {
        padding: 30px;
        max-width: 400px;
        height: auto;
    }
    @media (max-width: 580px) {
        padding: 20px;
        max-width: 350px;
        width: 100%;
    }
}

.delete-profile__title {
    font-size: 28px;
    font-family: 'Nunito', sans-serif;
    font-weight: 500;
    text-align: center;
    margin-bottom: 20px;
    color: #313131;
    @media (max-width: 768px) {
        font-size: 24px;
    }
}

.delete-profile_content {
    padding-left: 5px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
}

.current-password {
    border: 1px solid black !important;
}

.delete-profile_content p {
    color: #313131;
    font-size: 20px;
    font-family: 'Nunito', sans-serif;
    margin-bottom: 10px;
}

.delete-profile_btn {
    display: flex;
    justify-content: space-between;
    @media (max-width: 768px) {
        column-gap: 15px;
    }
}

.delete-btn {
    width: 182px;
}

.delete-check input {
    margin-top: 5px;
    font-size: 20px;
    color: #313131;
}

.delete-check div {
    color: #313131;
    font-size: 20px;
    font-family: 'Nunito', sans-serif;
}

.error-message {
    font-family: 'Nunito', sans-serif;
    color: #ff535c;
    font-size: 16px;
    font-weight: 400;
    line-height: 21.82px;
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

    .container {
        padding: 0px;
    }

    &__wrapper {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 120px;

        @media (max-width: 1440px) {
            padding: 0 40px;
        }

        @media (max-width: 568px) {
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

            @media (max-width: 1070px) {
                column-gap: 32px;
            }

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

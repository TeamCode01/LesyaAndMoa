<template>
    <div @click="share" class="link-share">
        <img src="assets/backgrounds/share-img.svg" alt="share">
        <div class="copy-message" hidden>
            Ссылка скопирована
        </div>
    </div>
    <cookieModal v-if="showCookie" @close="closeCookie" @accept="acceptCookie('cookie', cur_date, 1)" />
    <div class="main">
        <img src="@app/assets/backgrounds/main-bg.jpg" alt="main-bg" class="main__bg">
        <div class="main__wrapper">
            <div class="main__wrapper-text">
                <h1 class="title main__title">
                    Учимся, играя. Тренируем навыки чтения и письма.
                </h1>
                <p class="text main__text">
                    Увлекательное приключение с интерактивными заданиями для профилактики и коррекции дислексии
                </p>
            </div>
            <router-link v-if="!Object.keys(userStore.currentUser).length" to="Registration" class="link">
                <Button label="Зарегистрироваться" class="btn_primary main__btn"></Button>
            </router-link>
        </div>
    </div>
    <div class="Test">
        <p class="title-h2 Test__title">Тестовое задание</p>
        <div class="wrap" id="test" v-if="isOpen == false">
            <div class="Test__wrapper">
                <div class="Test__wrapper-text">
                    <p class="Test__wrapper_title">Дорогие друзья!</p>
                    <p class="Test__wrapper_text">Мы услышали речь увиденных нами странных героев. Но как нам понять
                        друг
                        друга? Пройди задание и
                        присоединяйся к тем, кто помогает инопланетянам понять нас. </p>
                </div>
                <Button @click="openTest()" class="Test__wrapper_btn" :isImage="true" :image="arrow"
                    label="Начать"></Button>
                <img src="@app/assets/backgrounds/lesyaandmoaforest.png" alt="game" class="Test__img">
            </div>
            <div class="Test_icons_wrap">
                <div class="Test_icons_item" @click="mute()"><img v-show="isMuted === false"
                        src="@app/assets/icons/sound.svg" alt="sound"><img v-show="isMuted === true"
                        src="@app/assets/icons/muted.svg" alt="mute"></div>
                <div class="Test_icons_item" @click="refresh()"><img src="@app/assets/icons/refresh.svg" alt="refresh">
                </div>
                <div class="Test_icons_item" @click="skip()">
                    <img src="@app/assets/icons/playGame.svg" alt="play">
                </div>
            </div>
        </div>

        <TestTask v-else @close="close()"></TestTask>
    </div>

    <div class="about">
        <h2 class="title-h2 about__title">О методике</h2>
        <div class="about__wrapper">
            <div class="about__wrapper-item">
                <div class="about__wrapper-item-container">

                    <div class="about__wrapper-item-reverse-words">
                        <div class="text about__wrapper-item1-top-text about__wrapper-item1-top-text-option1"
                            id="about__wrapper-item1-top-text-option1-size1">
                            <span class="about__wrapper-item1-top-text-option1_leveling"><span
                                    class="about__wrapper-item1-top-text-option1_leveling-letter">ч</span>и<span
                                    class="about__wrapper-item1-top-text-option1_leveling-letter">т</span><span
                                    class="about__wrapper-item1-top-text-option1_leveling-letter">а</span><span
                                    class="about__wrapper-item1-top-text-option1_leveling-letter">т</span><span
                                    class="about__wrapper-item1-top-text-option1_leveling-letter">ь</span></span>
                        </div>
                        <div class="text about__wrapper-item1-top-text about__wrapper-item1-top-text-option2"
                            id="about__wrapper-item1-top-text-option1-size4">и понимать</div>
                        <div class="text about__wrapper-item1-top-text about__wrapper-item1-top-text-option1"
                            id="about__wrapper-item1-top-text-option1-size2">
                            <span class="about__wrapper-item1-top-text-option1_leveling">прочитанное</span>
                        </div>
                        <div class="text about__wrapper-item1-top-text about__wrapper-item1-top-text-option2"
                            id="about__wrapper-item1-top-text-option1-size5">очень</div>
                        <div class="text about__wrapper-item1-top-text about__wrapper-item1-top-text-option1"
                            id="about__wrapper-item1-top-text-option1-size3">
                            <span class="about__wrapper-item1-top-text-option1_leveling"><span
                                    class="about__wrapper-item1-top-text-option1_leveling-letter">в</span><span
                                    class="about__wrapper-item1-top-text-option1_leveling-letter">а</span><span
                                    class="about__wrapper-item1-top-text-option1_leveling-letter">ж</span>но<span
                                    class="about__wrapper-item1-top-text-option1_leveling-letter">!</span></span>
                        </div>
                    </div>
                    <p class="text about__wrapper-item1-top-text">
                        Как сложно нам читать и понимать прочитанное, когда
                        некоторые буквы или слова всего лишь отражены зеркально!
                    </p>
                    <!--
                        <p class="text" id="item1-bottom-text">
                            Вперед с новыми друзьями к новым вершинам знания!
                        </p> 
                    -->

                </div>
            </div>
            <div class="about__wrapper-item_second">
                <div class="about__wrapper-item_second-container">
                    <p class="text-small about__wrapper-item_second-text">
                        Иногда ребятам сложно «продираться» сквозь форму к смыслу
                        слов и на это уходит много сил. Ребятам с дислексией в текстовом
                        облике слов часто чудится какая-то абракадабра. Это особенность восприятия ими визуального облика слов.
                        В большинстве случаев интеллект ребят в порядке, они хорошо
                        решают примеры или изъясняются устно.
                    </p>
                    <p class="text-small about__wrapper-item_second-text">
                        Чтобы помочь, таким ребятам, наша команда создала этот
                        обучающий курс. Дети смогут ощутить себя настоящими
                        помощниками друзей-инопланетян, не знающих нашего языка,
                        натренируют их в чтении слогов и различении звуков,
                        помогут понимать слова, предложения и тексты.
                    </p>
                    
                    <p class="text-small about__wrapper-item_second-text">
                        Вперед с новыми друзьями к новым вершинам знания!
                    </p> 

                </div>
            </div>
            <!--
                <img src="@app/assets/icons/icon-pink.svg" class="about__wrapper-icon" alt="icon" />
            -->
        </div>
    </div>
    <div class="author" id="author">
        <h2 class="title-h2 author__title">Создатели проекта</h2>
        <div class="author__wrapper" v-if="windowWidth >= 768">
            <div class="author__wrapper-item">
                <img src="@app/assets/backgrounds/nastya.png" alt="фото" />
                <p class="text author__name-text">Анастасия Полежаева</p>

                <div class="author__wrapper-item_info">
                    <p class="text-small speciality author__about">Учитель русского языка</p>
                    <p class="text-small speciality author__about">Кандидат филологических наук</p>
                </div>
            </div>
            <div class="author__wrapper-item">
                <img src="@app/assets/backgrounds/anna.png" alt="фото" />
                <p class="text">Анна Филатова</p>

                <div class="author__wrapper-item_info">
                    <p class="text-small speciality author__about">Учитель начальных классов</p>
                    <p class="text-small speciality author__about">Логопед</p>
                </div>
            </div>
            <div class="author__wrapper-item">
                <img src="@app/assets/backgrounds/maria.png" alt="фото" />
                <p class="text">Мария Криворотова</p>

                <div class="author__wrapper-item_info">
                    <p class="text-small speciality author__about">
                        Педагог дополнительного образования
                    </p>
                    <p class="text-small speciality author__about">Дизайнер</p>
                </div>
            </div>
        </div>
        <div class="author__wrapper-second" v-else>
            <!-- <Carousel :data="slideAuthors"></Carousel> -->
            <Carousel :items-to-show="authorsToShow" :itemsToScroll="authorsToShow" :wrap-around="false"
                snapAlign='start' v-model="currentSlideAuthor" ref="carousel_authors">
                <Slide v-for="slide in slideAuthors" :key="slide.id">
                    <CarouselItem :item_data="slide" :corousel_type="'authors'"></CarouselItem>
                </Slide>
            </Carousel>

            <div class="arrows">
                <img v-if="currentSlideAuthor > 0 && windowWidth < 768" @click="prev('carousel_authors')"
                    src="@app/assets/icons/arrow-left.svg" alt="left">
                <img v-if="currentSlideAuthor < slideAuthors.length - authorsToShow && windowWidth < 768"
                    @click="next('carousel_authors')" src="@app/assets/icons/icon-pink.svg" alt="right">
            </div>

        </div>
    </div>
    <div class="advantages">
        <h2 class="title-h2 advantages__title">
            Преимущества игровой методики
        </h2>
        <div class="advantages__wrapper">
            <div class="advantages__wrapper-item">
                <img src="@app/assets/backgrounds/key.png" alt="фото" />
                <p class="text-small">
                    Наши игры предлагают интерактивные задания и увлекательные
                    сценарии, которые помогают развивать ключевые навыки чтения
                    и письма.
                </p>
            </div>
            <div class="advantages__wrapper-item">
                <img src="@app/assets/backgrounds/orange.png" alt="фото" />
                <p class="text-small">
                    Специально разработанные уровни сложности и поддержка
                    индивидуального прогресса позволяют детям с дислексией
                    преодолевать трудности, испытывая радость от обучения.
                </p>
            </div>
            <div class="advantages__wrapper-item">
                <img src="@app/assets/backgrounds/cat.png" alt="фото" />
                <p class="text-small">
                    Наши игры способствуют развитию интеллектуальных
                    способностей, с учетом особенностей каждого. Дислексия
                    не преграда, а вызов, который мы вместе преодолеем, играя
                    и учась!
                </p>
            </div>
        </div>

    </div>

    <div class="news" id="news">
        <h2 class="title-h2 news__title">Новости</h2>

        <Carousel :items-to-show="itemsToShow" :itemsToScroll="itemsToShow" :wrap-around="false" snapAlign='start'
            v-model="currentSlide" ref="carousel">
            <Slide v-for="slide in slideItems" :key="slide.id">
                <CarouselItem :item_data="slide" :corousel_type="'news'"></CarouselItem>
            </Slide>
        </Carousel>

        <img v-if="currentSlide > 0 && windowWidth >= 768" class="left" @click="prev()"
            src="@app/assets/icons/arrow-left.svg" alt="left">
        <img v-if="currentSlide < slideItems.length - itemsToShow && windowWidth >= 768" class="right" @click="next()"
            src="@app/assets/icons/icon-pink.svg" alt="right">

        <div class="arrows">
            <img v-if="currentSlide > 0 && windowWidth < 768" @click="prev()" src="@app/assets/icons/arrow-left.svg"
                alt="left">
            <img v-if="currentSlide < slideItems.length - itemsToShow && windowWidth < 768" @click="next()"
                src="@app/assets/icons/icon-pink.svg" alt="right">
        </div>
    </div>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Button } from '@shared/components/buttons';
import news from "@app/assets/backgrounds/news.png";
import nastya from "@app/assets/backgrounds/nastya.png";
import anna from "@app/assets/backgrounds/anna.png";
import maria from "@app/assets/backgrounds/maria.png";
import arrow from '@app/assets/icons/Arrow.svg';
import { CarouselItem } from '@shared/components/carousel';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { TestTask } from '@features/TestTask';
import { useUserStore } from '@layouts/stores/user';
import { cookieModal } from '@shared/components/modals';

const windowWidth = ref(window.innerWidth);
const userStore = useUserStore();
const carousel_authors = ref(null);
const carousel = ref(null);
const itemsToShow = ref(2);
const authorsToShow = ref(2);
const currentSlide = ref(0);
const showCookie = ref(false);
const currentSlideAuthor = ref(0);

const setCookieOnce = () => {
    localStorage.setItem('stopCookie', true);
}

const share = () => {
    navigator.clipboard.writeText(window.location.href);
    const copyMessage = document.querySelector('.copy-message');
    copyMessage.hidden = false;
    setTimeout(() => {
        copyMessage.hidden = true;
    }, 2000);
}

const next = (carousel_name) => {
    if (carousel_name == 'carousel_authors') {
        carousel_authors.value.next();
    }
    else {
        carousel.value.next();
    };
}

const prev = (carousel_name) => {
    if (carousel_name == 'carousel_authors') {
        carousel_authors.value.prev();
    }
    else {
        carousel.value.prev()
    };

}
const cur_date = new Date();
cur_date.toLocaleString();

const closeCookie = () => {
    showCookie.value = false;
    setCookieOnce();

}

const acceptCookie = (name, value, days) => {
    showCookie.value = false;
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    setCookieOnce();
}

const slideItems = ref([
    {
        img: news,
        name: ' Наши игры предлагают интерактивные задания и увлекательные сценарии, которые помогают развивать ключевые навыки чтения и письма',
        date: '22.12.2023'
    },
    {
        img: news,
        name: ' Наши игры предлагают интерактивные задания и увлекательные сценарии, которые помогают развивать ключевые навыки чтения и письма',
        date: '22.12.2024'
    },
    {
        img: news,
        name: 'Наши игры предлагают интерактивные задания и увлекательные сценарии, которые помогают развивать ключевые навыки чтения и письма',
        date: '22.12.2025'
    },
    {
        img: news,
        name: 'Наши игры предлагают интерактивные задания и увлекательные сценарии, которые помогают развивать ключевые навыки чтения и письма',
        date: '22.12.2026'
    },
    {
        img: news,
        name: 'Наши игры предлагают интерактивные задания и увлекательные сценарии, которые помогают развивать ключевые навыки чтения и письма',
        date: '22.12.2027'
    },
    {
        img: news,
        name: 'Наши игры предлагают интерактивные задания и увлекательные сценарии, которые помогают развивать ключевые навыки чтения и письма',
        date: '22.12.2028'
    },
    {
        img: news,
        name: 'Наши игры предлагают интерактивные задания и увлекательные сценарии, которые помогают развивать ключевые навыки чтения и письма',
        date: '22.12.2028'
    },
])

const slideAuthors = ref([
    {
        img: nastya,
        author_name: 'Анастасия Полежаева',
        author_about_top: 'Учитель русского языка',
        author_about_bottom: 'Кандидат филологических наук',
    },
    {
        img: anna,
        author_name: ' Анна Филатова',
        author_about_top: 'Учитель начальных классов',
        author_about_bottom: 'Логопед',
    },
    {
        img: maria,
        author_name: 'Мария Криворотова',
        author_about_top: 'Педагог дополнительного образования',
        author_about_bottom: 'Дизайнер',
    },
])

const isOpen = ref(false);
const audio = ref(new Audio());
const showBtn = ref(false);
const isMuted = ref(false);
const openTest = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.style.setProperty('--scroll-position', `${scrollY}px`);
    document.body.classList.add('no-scroll'); /* Прокрутка ставится на паузу */
    isOpen.value = true;
    playTestAudio('/assets/audio/TestTask/4.тестовое задание.mp3');
}

const close = () => {
    isOpen.value = false;
    document.body.classList.remove('no-scroll');
}


const playAudio = (audioPath) => {
    audio.value.src = audioPath;
    audio.value.play();
}

const playTestAudio = (audioPath) => {
    audio.value.src = audioPath;
    audio.value.play();
}

const mute = () => {
    isMuted.value = !isMuted.value
    if (isMuted.value === true) {
        audio.value.volume = 0
    } else {
        audio.value.volume = 1;
    }
}

const refresh = () => {
    console.log('refresh')
    audio.value.currentTime = 0;
}

const skip = () => {
    audio.value.src = ''
    showBtn.value = true;
}

onMounted(() => {
    const test = document.getElementById('test');
    if (localStorage.getItem('stopCookie') === 'true') {
        showCookie.value = false;
    } else {
        showCookie.value = true;
    }
    document.addEventListener('scroll', handleScroll);
    function handleScroll() {
        const posTop = test.getBoundingClientRect().top;
        if (posTop + test.clientHeight <= window.innerHeight && posTop >= 0) {
            playAudio('/assets/audio/Music/звук 1_.mp3');
            setTimeout(() => {
                playAudio('/assets/audio/TestTask/3.тестовое задание.mp3');
                audio.value.addEventListener('ended', () => {
                    audio.value.src = '';
                    showBtn.value = true;
                })
            }, 14000)

            document.removeEventListener('scroll', handleScroll);
        }
    }


    windowWidth.value = window.innerWidth;
    itemsToShow.value = windowWidth.value >= 660 ? 2 : 1
    authorsToShow.value = windowWidth.value >= 650 ? 2 : 1

    window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth;
        itemsToShow.value = windowWidth.value >= 660 ? 2 : 1
        authorsToShow.value = windowWidth.value >= 650 ? 2 : 1
    });


})
</script>
<style lang="scss" scoped>
.link-share {
    cursor: pointer;
    position: fixed;
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 10px;
    right: 5vh;
    top: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.copy-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border: 1px solid #35383f;
    border-radius: 10px;
    color: #35383f;
    font-size: 16px;
    font-family: 'Bert Sans';
    text-align: center;
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


.carousel {
    max-width: 800px;
    width: 100%;
    margin: 0px auto;

    @media (max-width: 1024px) {
        max-width: 650px;
    }
}

.carousel__viewport {
    max-width: 794px !important;
    margin: 0px auto !important;
    width: 100%;
}

// .carousel__slide {
//     max-width: 387px;
// }

// .carousel__track {
//     max-width: 794px;
//     margin: 0px auto;
//     width: 100%;
// }




.carousel-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 387px;

    img {
        max-width: 387px;
        height: 220px;

        @media (max-width: 1024px) {
            max-width: 300px;
            height: 220px;
        }
    }

    &__text {
        font-size: 16px;
        font-weight: 400;
        color: $text-primary;
        font-family: 'Nunito', sans-serif;
        max-width: 375px;

        @media (max-width: 1024px) {
            max-width: 300px;
        }
    }

    &__author-name {
        font-size: 20px;
    }

    &__author-about {
        width: 214px;
    }

    &__date {
        font-size: 16px;
        font-family: 'Nunito', sans-serif;
        font-weight: 400;
        color: $grey;
        margin-bottom: 20px;
        margin-top: 12px;
    }
}

.left {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 0;
}

.right {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 20px;
}

.main {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0;
    margin: 0 auto;
    margin-top: 20px;
    height: 600px;
    margin-bottom: 100px;

    @media(max-width: 1024px) {
        height: 500px;
        margin-bottom: 80px;
    }

    @media (max-width: 768px) {
        height: 348px;
        margin-bottom: 60px;
    }

    @media (max-width: 568px) {
        flex-direction: column;
        max-width: 420px;
        height: 416px;
        margin-bottom: 40px;
    }

    &__bg {
        position: absolute;
        width: 1200px;
        height: 600px;
        z-index: -1;
        max-width: 100%;

        @media (max-width: 1024px) {
            height: 500px;
        }

        @media (max-width: 768px) {
            height: 348px;
        }

        @media (max-width: 568px) {
            margin-top: 40px;
            position: relative;
            height: 188px;
        }
    }

    &__wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 452px;
        margin: 0 auto;
        width: 500px;
        background-color: rgba(255, 255, 255, .8);
        border-radius: 25%;

        @media (max-width: 1024px) {
            width: 446px;
            height: 402px;
        }

        @media (max-width: 768px) {
            width: 320px;
            height: 350px;
            padding-top: 30px;
        }

        @media (max-width: 568px) {
            padding-top: 0;
            margin-top: 30px;
        }
    }

    &__title {
        font-family: 'Nunito', sans-serif;
        font-size: 32px;
        font-weight: 500;
        color: $text-primary;
        max-width: 368px;
        line-height: 50px;
        text-align: center;
        margin: 0px auto;

        @media (max-width: 768px) {
            width: 290px;
            font-size: 24px;
            line-height: 30px;
        }

        @media (max-width: 568px) {
            width: 320px;
            font-size: 22px;
            line-height: 25px;
        }
    }

    &__text {
        text-align: center;
        font-weight: 400;
        max-width: 368px;
        margin: 16px auto;

        @media (max-width: 568px) {
            font-size: 14px;
        }
    }

    &__btn {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px 104px;
        margin: 40px auto;
        max-width: 368px;

        @media (max-width: 1024px) {
            width: 372px;
        }

        @media (max-width: 768px) {
            width: 290px;
            margin-top: 20px;
        }

        @media (max-width: 568px) {
            width: 320px;
            font-size: 16px;
        }
    }
}

.Test {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    &_icons {
        &_item {
            width: 40px;
            height: 40px;
            background-color: #E6F2FA;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &_wrap {
            min-width: 136px;

            display: flex;
            column-gap: 8px;
            align-items: center;
            position: absolute;
            top: 10px;
            right: 50px;

            @media (max-width: 1200px) {
                left: 800px;
            }

            @media (max-width: 1024px) {
                left: 780px;
            }

            @media(max-width:940px) {
                top: 470px;
                left: 420px;
            }

            @media(max-width: 568px) {
                top: 410px;
                left: 170px;
            }
        }
    }


    &__title {
        font-size: 32px;
        text-align: center;
        font-family: 'Nunito';
        font-weight: 500;
        color: #313131;
        margin-bottom: 40px;

        @media(max-width: 568px) {
            font-weight: 600;
            font-size: 20px;
        }
    }

    &__img {
        position: absolute;
        width: 800px;
        height: 488px;
        border-radius: 20px;
        right: 15px;
        max-width: 100%;
        margin-right: 10px;

        @media (max-width: 1200px) {
            width: 636px;
            height: 387px;
            right: 15px;
        }

        @media (max-width: 940px) {
            width: 568px;
            height: 346px;
            top: 460px;
            margin-right: -15px;
            max-width: 100%;
        }

        @media(max-width: 568px) {
            top: 400px;
            height: 387px;
            object-fit: cover;
            width: 420px;
        }
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #FAE6F2;
        border-radius: 20px 0px 0px 20px;
        padding: 40px 40px 90px 40px;
        // height: 600px;
        width: 1200px;
        border-radius: 20px;
        margin: 0 auto;

        @media(max-width: 940px) {
            align-items: center;
        }

        @media(max-width: 568px) {
            padding-top: 20px;
            padding-bottom: 60px;
            height: 380px;
        }

        &_title {
            font-size: 32px;
            font-family: 'Nunito';
            font-weight: medium;
            color: #313131;

            @media(max-width:1200px) {
                font-size: 24px;
            }

            @media(max-width:940px) {
                margin: 0 auto;
            }

            @media (max-width: 568px) {
                font-weight: 600;
                font-size: 18px;
                margin: 0;
            }
        }

        &_text {
            display: flex;
            text-wrap: wrap;
            font-size: 16px;
            color: #313131;
            font-family: 'Nunito';
            margin-top: 40px;
            max-width: 280px;

            @media(max-width: 1200px) {
                margin-top: 30px;
            }

            @media(max-width: 1200px) {
                margin-top: 15px;
            }
        }

        &-text {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            width: 280px;
            margin-left: 30px;

            @media(max-width:1200px) {
                margin-left: 15px;
                width: 212px;
            }

            @media(max-width:940px) {
                text-align: center;
            }

            @media (max-width: 568px) {

                text-align: start;
            }
        }

        &_btn {
            width: 280px;
            height: 56px;
            display: flex;
            justify-content: center;
            align-items: center;
            column-gap: 32px;
            z-index: 1;
            margin-bottom: 80px;
            margin-left: 30px;

            @media (max-width: 1200px) {
                width: 212px;
                height: 48px;
                column-gap: 28px;
                margin-bottom: 0px;
                margin-left: 15px;
            }
        }
    }
}

.wrap {
    display: flex;
    position: relative;
    width: 1200px;
    height: 600px;

    @media (max-width: 1200px) {
        height: 451px;
        width: 944px;
    }

    @media (max-width: 940px) {
        width: 568px;
        height: 420px;
    }

    @media (max-width: 568px) {
        width: 320px;
        height: 307px;
    }
}

.about {
    display: flex;
    flex-direction: column;
    padding: 100px 0px;
    align-items: center;

    &__title {
        font-size: 32px;
        font-weight: 500;
        text-align: center;
        color: $text-primary;
        font-family: 'Nunito', sans-serif;

        @media(max-width: 940px) {
            margin-top: 360px;
        }

        @media(max-width: 568px) {
            margin-top: 470px;
            font-size: 20px;
            font-weight: 600;
        }
    }

    &__wrapper {
        margin-top: 48px;
        position: relative;
        display: flex;
        justify-content: center;
        gap: 20px;

        @media (max-width: 1024px) {
            flex-direction: column;
            align-items: center;
        }

        @media (max-width: 568px) {
            width: 320px;
        }

        &-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: $light-green;
            padding: 40px;
            border-radius: 20px;
            width: 590px;
            height: 400px;

            @media (max-width: 1200px) {
                height: 520px;
                width: 462px;
            }

            @media (max-width: 568px) {
                max-width: 320px;
                padding-top: 20px;
                padding-bottom: 40px;
                height: 412px;
            }

            p {
                text-align: center;
                width: 100%;
                max-width: 510px;
            }

            &_second {
                padding: 40px 18px 40px 40px;
                background-color: $light-green;
                border-radius: 20px;
                width: 590px;
                height: 400px;

                @media (max-width: 1200px) {
                    height: 520px;
                    width: 462px;
                }

                @media (max-width: 568px) {
                    width: 320px;
                    height: 630px;
                    padding-top: 20px !important;
                    padding-bottom: 20px !important;
                }

                p {
                    margin-bottom: 16px;
                    width: 100%;
                    max-width: 520px;
                }

                @media (max-width: 568px) {
                    min-width: 320px;
                    padding: 40px 20px;
                }

                &-container {
                    gap: 16px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 320px;

                    @media (max-width: 1200px) {
                        height: 440px;
                    }

                    @media (max-width: 568px) {
                        height: 590px;

                    }
                }

                &-text {
                    margin-bottom: 0 !important;
                }
            }

            &-container {
                display: flex;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                height: 296px;

                @media (max-width: 1200px) {
                    width: 441px;
                    min-height: 390px;
                }

                @media (max-width: 568px) {
                    width: 310px;
                    min-height: 350px;
                }
            }

            &-reverse-words {
                display: flex;
                justify-content: space-between;
                width: 510px;
                height: 24px;
                margin: 0 auto;

                @media (max-width: 1200px) {
                    width: 441px;
                    height: 29px;
                }

                @media (max-width: 568px) {
                    width: 305px;
                    height: 20px;
                }
            }
        }

        &-item1-top-text {
            @media(max-width: 1200px) {
                margin: 0 auto;
                width: 415px !important;
                font-size: 16px;
            }

            @media(max-width: 568px) {
                max-width: 280px !important;
                margin-bottom: 0;
            }

            &-option1 {
                color: #6d44be;
                transform: rotateX(180deg);
                position: relative;

                &_leveling {
                    position: absolute;
                    bottom: 0;

                    &-letter {
                        display: inline-block;
                        transform: rotate(180deg);
                        padding-bottom: 2px;
                    }
                }

                @media (max-width: 1200px) {
                    font-weight: 800;
                    font-size: 20px;
                }

                @media (max-width: 568px) {
                    font-size: 14px;
                }
            }

            &-option2 {
                color: #5ccf54;

                @media (max-width: 1200px) {
                    font-weight: 800;
                    font-size: 20px;
                }

                @media (max-width: 568px) {
                    font-weight: 800;
                    font-size: 14px;
                }
            }
        }

        &-icon {
            position: absolute;
            top: 44%;

            @media (max-width: 1024px) {
                display: none;
            }
        }
    }
}

#about__wrapper-item1-top-text-option1-size1 {
    width: 63px;
    margin: 0;

    @media (max-width: 1200px) {
        max-width: 67px;
    }

    @media (max-width: 568px) {
        max-width: 47px !important;
    }
}

#about__wrapper-item1-top-text-option1-size2 {
    top: 5px;
    transform: rotate(180deg);
    transform: rotateY(180deg);
    width: 124px;
    margin: 0;

    @media (max-width: 1200px) {
        top: 1px;
        max-width: 131px;
    }

    @media (max-width: 568px) {
        max-width: 92px !important;
    }
}

#about__wrapper-item1-top-text-option1-size3 {
    width: 70px;
    margin: 0;

    @media (max-width: 1200px) {
        max-width: 70px;
    }

    @media (max-width: 568px) {
        max-width: 49px !important;
    }
}

#about__wrapper-item1-top-text-option1-size4 {
    @media (max-width: 1200px) {
        font-size: 18px;
        max-width: 105px;
        margin: 0;
        padding-top: 2px;
    }

    @media (max-width: 568px) {
        max-width: 69px !important;
        font-size: 12px;
    }
}

#about__wrapper-item1-top-text-option1-size5 {
    @media (max-width: 1200px) {
        font-size: 18px;
        max-width: 55px;
        margin: 0;
        padding-top: 2px;
    }

    @media (max-width: 568px) {
        font-size: 12px;
        max-width: 37px !important;
    }
}

#item1-bottom-text {
    @media(max-width: 1200px) {
        font-size: 20px;
        width: 441px;
        margin: 0 auto;
    }

    @media(max-width: 568px) {
        font-size: 18px;
        width: 240px;
        margin-bottom: 0;
    }
}

.author {
    padding-bottom: 100px;

    &__title {
        margin-bottom: 48px;
        font-size: 32px;
        font-weight: 500;
        text-align: center;
        color: $text-primary;
        font-family: 'Nunito', sans-serif;

        @media(max-width:568px) {
            font-size: 20px;
        }
    }

    &__name-text {
        @media (max-width: 568px) {
            font-size: 18px;
        }
    }

    &__about {
        font-size: 16px !important;
    }

    &__wrapper {
        display: flex;
        justify-content: center;
        column-gap: 20px;

        &-item {
            img {
                margin-bottom: 16px;
                width: 100%;
                max-width: 387px;
            }

            &_info {
                margin-top: 16px;
            }
        }
    }
}

.advantages {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title {
        font-size: 32px;
        font-weight: 500;
        text-align: center;
        color: $text-primary;
        font-family: 'Nunito', sans-serif;

        @media(max-width: 568px) {
            font-size: 20px;
        }
    }

    &__wrapper {
        display: flex;
        column-gap: 20px;
        margin-top: 48px;

        @media(max-width: 568px) {
            flex-direction: column;
            gap: 20px;
        }

        &-item {
            padding: 20px;
            border-radius: 20px;
            background-color: $header;
            width: 100%;
            max-width: 387px;

            img {
                margin-bottom: 20px;
            }
        }

        &-item:nth-child(2) {
            background-color: $pink;
        }

        &-item:nth-child(3) {
            background-color: $light-green;
        }
    }
}

.news {
    padding: 100px 0px;
    position: relative;

    &__title {
        font-size: 32px;
        font-weight: 500;
        text-align: center;
        color: $text-primary;
        font-family: 'Nunito', sans-serif;
        margin-bottom: 48px;

        @media (max-width: 568px) {
            font-size: 20px;
        }
    }
}

.arrows {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}

.speciality {
    @media (max-width: 1024px) {
        font-size: 14px;
    }
}
</style>

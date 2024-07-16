<template>
    <div class="main">
        <div class="main__wrapper">
            <h1 class="title main__title">
                Учимся играя. Игры для детей с дислексией
            </h1>
            <p class="text main__text">
                Интерактивные задания и увлекательные сценарии помогают
                развивать ключевые навыки чтения и письма
            </p>
            <router-link to="Registration" class="link">
                <Button label="Зарегистрироваться" class="btn_primary main__btn"></Button></router-link>
        </div>
    </div>
    <div class="Test">
        <p class="title-h2 Test__title">Тестовое задание</p>
        <div class="wrap" id="test">
            <div class="Test__wrapper">
                <p class="Test__wrapper_title">Дорогие друзья!</p>
                <p class="Test__wrapper_text">Мы услышали речь увиденных нами странных героев. Но как нам понять друг
                    друга? Пройди задание и
                    присоединяйся к тем, кто помогает инопланетянам понять нас. </p>
                <Button @click="openTest()" class="Test__wrapper_btn" :isImage="true" :image="arrow"
                    label="Начать"></Button>
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
            <div class="Test__img">
                <img src="@app/assets/backgrounds/animals.jpg" alt="game">
            </div>
        </div>
        <TestTask @close="close()" v-if="isOpen == true"></TestTask>
    </div>

    <div class="about">
        <h2 class="title-h2 about__title">О методике</h2>
        <div class="about__wrapper">
            <div class="about__wrapper-item">
                <p class="text">
                    Как сложно нам читать и понимать прочитанное, когда
                    некоторые буквы или слова всего лишь отражены зеркально.
                </p>

                <p class="text">
                    Вперед с новыми друзьями к новым вершинам знания!
                </p>
            </div>
            <div class="about__wrapper-item_second">
                <p class="text-small">
                    Иногда ребятам сложно «продираться» сквозь форму к смыслу
                    слов и на это уходит много сил. Примерно такая абракадабра
                    чудится в текстовом облике слов ребятам с дислексией. Это
                    особенность восприятия ими визуального облика слов.
                    В большинстве случаев интеллект ребят в порядке, они хорошо
                    решают примеры или изъясняются устно.
                </p>
                <p class="text-small">
                    Чтобы помочь тем, таким ребятам, наша команда создала этот
                    обучающий курс. Дети смогут ощутить себя настоящими
                    помощниками друзей-инопланетян, не знающих нашего языка,
                    натренируют их в чтении слогов и различении звуков, объяснят
                    различия в значении слов, отличающихся лишь одной буквой,
                    помогут понимать слова, предложения и тексты.
                </p>
            </div>
            <img src="@app/assets/icons/icon-pink.svg" class="about__wrapper-icon" alt="icon" />
        </div>
    </div>
    <div class="author">
        <h2 class="title-h2 author__title">Создатели проекта</h2>
        <div class="author__wrapper">
            <div class="author__wrapper-item">
                <img src="@app/assets/backgrounds/nastya.png" alt="фото" />
                <p class="text">Анастасия Полежаева</p>

                <div class="author__wrapper-item_info">
                    <p class="text-small speciality">Учитель русского языка</p>
                    <p class="text-small speciality">Кандидат филологических наук</p>
                </div>
            </div>
            <div class="author__wrapper-item">
                <img src="@app/assets/backgrounds/anna.png" alt="фото" />
                <p class="text">Анна Филатова</p>

                <div class="author__wrapper-item_info">
                    <p class="text-small speciality">Учитель начальных классов</p>
                    <p class="text-small speciality">Логопед</p>
                </div>
            </div>
            <div class="author__wrapper-item">
                <img src="@app/assets/backgrounds/maria.png" alt="фото" />
                <p class="text">Мария Криворотова</p>

                <div class="author__wrapper-item_info">
                    <p class="text-small speciality">
                        Педагог дополнительного образования
                    </p>
                    <p class="text-small speciality">Дизайнер</p>
                </div>
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
                    способностей, с учетом особенностей каждого. Дислексия —
                    не преграда, а вызов, который мы вместе преодолеем, играя
                    и учась!
                </p>
            </div>
        </div>
        <router-link to="Registration" class="link">
            <Button label="Зарегистрироваться" class="btn_primary main__btn"></Button>
        </router-link>
    </div>

    <div class="news">
        <h2 class="title-h2 news__title">Новости</h2>
        <Carousel :data="slideItems"></Carousel>
    </div>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Button } from '@shared/components/buttons';
import { Carousel } from '@shared/components/carousel';
import news from "@app/assets/backgrounds/news.png";
import arrow from '@app/assets/icons/Arrow.svg';
import { TestTask } from '@features/TestTask';


const slideItems = ref([
    {
        id: 1,
        img: news,
        name: ' Наши игры предлагают интерактивные задания и увлекательные сценарии, которые помогают развивать ключевые навыки чтения и письма',
        date: '22.12.2023'
    },
    {
        id: 2,
        img: news,
        name: ' Наши игры предлагают интерактивные задания и увлекательные сценарии, которые помогают развивать ключевые навыки чтения и письма',
        date: '22.12.2023'
    },
    {
        id: 3,
        img: news,
        name: 'Наши игры предлагают интерактивные задания и увлекательные сценарии, которые помогают развивать ключевые навыки чтения и письма',
        date: '22.12.2023'
    },
    {
        id: 4,
        img: news,
        name: 'Наши игры предлагают интерактивные задания и увлекательные сценарии, которые помогают развивать ключевые навыки чтения и письма',
        date: '22.12.2023'
    },
    {
        id: 5,
        img: news,
        name: 'Наши игры предлагают интерактивные задания и увлекательные сценарии, которые помогают развивать ключевые навыки чтения и письма',
        date: '22.12.2023'
    },
])

const isOpen = ref(false);
// const audio = new Audio('/assets/audio/TestTask/3.тестовое задание.mp3');
const isPlaying = ref(false);
const isMuted = ref(false);
const close = () => {
    isOpen.value = false;
}


function playAudio(audioPath) {
    const audio = new Audio(audioPath);
    audio.play(audioPath);
    // if (!isPlaying.value) {

    // isPlaying.value = true;
    // } else {
    //     audio.pause();
    //     isPlaying.value = false;
    // }
}

const mute = () => {
    console.log('skip')
    const audio = new Audio('/assets/audio/TestTask/3.тестовое задание.mp3');
    isMuted.value = !isMuted.value;
    audio.muted = isMuted.value;
}

const refresh = () => {
    console.log('skip')
    const audio = new Audio('/assets/audio/TestTask/3.тестовое задание.mp3');
    audio.currentTime = 0;
    audio.play();
}

const skip = () => {
    console.log('skip')
    const audio = new Audio('/assets/audio/TestTask/3.тестовое задание.mp3');
    audio.currentTime = 0;
}

const openTest = () => {
    isOpen.value = true;
    playAudio('/assets/audio/TestTask/4.тестовое задание.mp3');
}

onMounted(() => {
    const test = document.getElementById('test');
    function handleScroll() {
        const posTop = test.getBoundingClientRect().top;
        if (posTop + test.clientHeight <= window.innerHeight && posTop >= 0) {
            playAudio('/assets/audio/Music/звук 1_.mp3');
            setTimeout(() => {
                playAudio('/assets/audio/TestTask/3.тестовое задание.mp3');
            }, 14000)
            window.removeEventListener('scroll', handleScroll);
        }
    }
    window.addEventListener('scroll', handleScroll);
})
</script>
<style lang="scss" scoped>
.main {
    margin-top: 20px;
    height: 600px;
    position: relative;
    background-image: url('@app/assets/backgrounds/main-bg.jpg');
    background-size: cover;

    &__wrapper {
        position: absolute;
        top: 25%;
        left: 25%;
        margin: 0;
    }

    &__title {
        font-family: 'Nunito', sans-serif;
        font-size: 50px;
        font-weight: 500;
        color: $text-primary;
        max-width: 563px;
        line-height: 50px;
        text-align: center;
        margin: 0px auto;
    }

    &__text {
        text-align: center;
        font-weight: 400;
        max-width: 483px;
        margin: 16px auto;
    }

    &__btn {
        padding: 12px 104px;
        margin: 40px auto;
        margin-bottom: 0px;
    }
}

.Test {
    padding-top: 100px;
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
            display: flex;
            column-gap: 8px;
            align-items: center;
            position: absolute;
            top: 15px;
            right: 50px;

        }
    }


    &__title {
        font-size: 32px;
        text-align: center;
        font-family: 'Nunito';
        font-weight: medium;
        color: #313131;
        margin-bottom: 40px;
    }

    &__img {
        img {
            height: 580px;

            @media (max-width: 1024px) {
                height: 470px;
                max-width: 565px;
                width: 100%;
            }
        }
    }

    &__wrapper {
        background-color: #FAE6F2;
        border-radius: 20px 0px 0px 20px;
        height: 580px;
        padding: 40px 40px 90px 40px;

        &_title {
            font-size: 32px;
            font-family: 'Nunito';
            font-weight: medium;
            color: #313131;
        }

        &_text {
            font-size: 16px;
            color: #313131;
            font-family: 'Nunito';
            margin-top: 40px;
            max-width: 280px;
        }

        &_btn {
            margin-top: 200px;
            max-width: 280px;
            width: 100%;
            height: 56px;
            display: flex;
            justify-content: center;
            align-items: center;
            column-gap: 32px;

            @media (max-width: 1024px) {
                max-width: 212px;
                height: 48px;
                column-gap: 28px;
            }
        }
    }
}

.wrap {
    display: flex;
    position: relative;
}

.about {
    padding: 100px 0px;

    &__title {
        font-size: 32px;
        font-weight: 500;
        text-align: center;
        color: $text-primary;
        font-family: 'Nunito', sans-serif;
    }

    &__wrapper {
        margin-top: 48px;
        position: relative;
        display: flex;
        justify-content: center;
        column-gap: 20px;

        &-item {
            background-color: $light-green;
            padding: 40px;
            border-radius: 20px;

            width: 100%;
            max-width: 590px;

            p {
                text-align: center;
                margin-bottom: 60px;
                width: 100%;
                max-width: 510px;
            }

            &_second {
                padding: 40px 18px 40px 40px;
                background-color: $light-green;
                border-radius: 20px;

                width: 100%;
                max-width: 590px;

                p {
                    margin-bottom: 16px;
                    width: 100%;
                    max-width: 520px;
                }
            }
        }

        &-icon {
            position: absolute;
            top: 44%;
        }
    }
}

.author {
    padding-bottom: 100px;

    &__title {
        font-size: 32px;
        font-weight: 500;
        text-align: center;
        color: $text-primary;
        font-family: 'Nunito', sans-serif;
    }

    &__wrapper {
        margin-top: 48px;
        display: flex;
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
    &__title {
        font-size: 32px;
        font-weight: 500;
        text-align: center;
        color: $text-primary;
        font-family: 'Nunito', sans-serif;
    }

    &__wrapper {
        display: flex;
        column-gap: 20px;
        margin-top: 48px;

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

    &__title {
        font-size: 32px;
        font-weight: 500;
        text-align: center;
        color: $text-primary;
        font-family: 'Nunito', sans-serif;
        margin-bottom: 48px;
    }
}

.speciality {
    @media (max-width: 1024px) {
        font-size: 14px;
    }
}
</style>

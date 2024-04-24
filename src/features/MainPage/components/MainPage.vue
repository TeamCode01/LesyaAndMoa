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
import { ref } from 'vue';
import { Button } from '@shared/components/buttons';
import { Carousel } from '@shared/components/carousel';
import { FirstTask } from '@features/FirstTask/components';
import news from "@app/assets/backgrounds/news.png";

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

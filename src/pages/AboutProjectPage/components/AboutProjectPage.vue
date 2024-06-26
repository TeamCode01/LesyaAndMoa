<template>
    <div class="container">
        <h1>Игровой тренажёр для детей с дислексией</h1>
        <div class="description">
            <div class="description_block">
                <div class="description_block-text">
                    <h4>Дорогие взрослые!</h4>
                    <p>
                        Умение читать — это не просто умение складывать буквы
                        в слоги, а слоги — в слова. И хотя без этого не обойтись
                        в процессе чтения, но сам процесс такого «складывания»
                        в чём-то сродни нашему пониманию идиом. Ведь играть
                        первую скрипку — это вовсе не о скрипке, а о ведущей
                        роли в каком-либо деле, начинании. Так и слово как
                        основная единица языка не складывается в точности
                        из значений составляющих его морфем, не говоря уже
                        о многогранно наполненных содержанием концептах.
                        Прочесть, произнести слово, даже верно его написать —
                        это такая малость в сравнении с «понять верно, верно
                        интерпретировать, применить». Подобные аспекты работы
                        со словами, текстами интересуют специалистов по оценке
                        уровня читательской грамотности. Ведь чтобы найти,
                        извлечь, интегрировать и интерпретировать информацию,
                        осмыслить и оценить её, нужны достаточно серьёзные
                        интеллектуальные затраты.
                    </p>
                    <p>
                        Но увы, есть ребята, которые тратят большие силы именно
                        на сам процесс прочтения, произнесения слов, ребята,
                        которым понимание прочитанного даётся особенно нелегко.
                        С такими ребятами часто сталкиваются педагоги в процессе
                        своей работы: ребёнок допускает перестановку букв
                        и слогов при чтении, не понимает смысл прочитанного,
                        предпочитает отвечать устно, старается избегать
                        письменных заданий, нервничает при работе с текстом.
                        Ребёнок при этом испытывает неуверенность в своих силах,
                        дискомфорт, неприятные эмоции. Часто нервозность
                        возникает и у родителей и педагогов, ведь кажется, будто
                        ребёнок ленится, упрямится. Но стоит к таким ребятам
                        присмотреться внимательнее. Если при этом у ребёнка
                        развито образное мышление, хорошая память, ему легко
                        даётся конструирование, проектирование,
                        изобретательство, то речь идёт о ребёнке с дислексией,
                        а вовсе не о ленивце и вредине.
                    </p>
                </div>
                <div class="description_block-img">
                    <img src="@app/assets/img/AboutProject/Moa.png" alt="Moa" />
                </div>
            </div>
            <div class="description_block2">
                <div class="description_block-img2">
                    <img
                        src="@app/assets/img/AboutProject/Lesya.png"
                        alt="Lesya"
                    />
                </div>
                <div class="description_block-text">
                    <p>
                        Часто родители, ища поддержки, обращаются к логопедам.
                        Полагаем, что это верное направление. Но логопед есть
                        не в каждой школе, занятия с ним часто короткие
                        и трудоёмкие для ребёнка. Педагог хочет вместить как
                        можно больше в каждое занятие, активизировать
                        взаимодействие полушарий мозга, развить мелкую моторику,
                        натренировать произношение и понимание грамматической
                        связи слов… Это всё очень важно и нужно. Но в дополнение
                        к этому, а также как способ для родителя самостоятельно
                        помочь ребёнку наша команда разработала этот
                        увлекательный игровой тренажёр. Помогая незадачливым
                        инопланетянам, не имеющим такого чудесного навыка как
                        чтение, ребёнок понимает, что его умения ценны и важны,
                        что он помощник, наставник, гуру чтения по сравнению
                        с этими героями. Мы очень надеемся, что наша
                        образовательная игра позволит ребятам, имеющим сложности
                        с овладением навыком чтения, оттренировать процесс
                        чтения, продвинуться на пути к пониманию смысла слов,
                        справиться с дислексией и предотвратить связанную с ней
                        дисграфию как нарушение письма. 
                    </p>
                    <p class="description_block-text-p">
                        Мы верим, что наше сотрудничество будет эффективным
                        и принесёт не только понимание слов и текстов,
                        но и взаимопонимание, гармонию между вами и вашими
                        детьми. Успехов!
                    </p>
                    <div class="description_block-author">
                        <h4>Анастасия Полежаева</h4>
                        <p>Учитель русского языка</p>
                        <p>Кандидат филологических наук</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="support">
            <h3>Поддержать</h3>
            <div class="support_block">
                <div class="support_block-text">
                    <p>
                        Если у вас есть желание помочь проекту, можете
                        пожертвовать любую сумму на его развитие.
                    </p>
                </div>
                <div class="support_block-QR">
                    <img src="@app/assets/img/AboutProject/qr.png" alt="QR" />
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.container {
    margin: 0 auto;
    max-width: 1440px;
    @media (max-width: 1350px) {
        padding: 0 40px;
    }
}

h1 {
    font-family: Nunito;
    font-size: 50px;
    font-weight: normal;
    text-align: center;
    max-width: 666px;
    display: block;
    margin: 60px auto;
}
.description {
    display: flex;
    flex-direction: column;
    margin-bottom: 80px;
}
.description_block {
    display: flex;
    flex-direction: row;
    max-width: 1200px;
    position: relative;
}
.description_block2 {
    display: flex;
    flex-direction: row-reverse;
    max-width: 1200px;
    position: relative;
}
.description_block-img {
    width: 25%;
    float: left;
    position: absolute;
    top: 20px;
    right: 100px;
    z-index: -1;
    @media (max-width: 1350px) {
        width: 33%;
    }
    @media (max-width: 1200px) {
        width: 33%;
        top: 20%;
    }
}
.description_block-img2 {
    width: 25%;
    float: left;
    position: absolute;
    top: 10px;
    left: -90px;
    z-index: -1;
    @media (max-width: 1350px) {
        width: 33%;
    }
    @media (max-width: 1200px) {
        width: 33%;
        top: 20%;
    }
}
.description_block-text {
    width: 75%;
    float: right;
    @media (max-width: 1350px) {
        width: 67%;
    }
}

.description p {
    font-size: 16px;
    font-family: Nunito;
}
h4 {
    font-family: Nunito;
    font-size: 20px;
    font-weight: normal;
}
.description_block-text p {
    margin: 20px 0;
}
.description_block-text-p {
    margin-bottom: 40px !important;
}
.description_block-author h4 {
    margin-bottom: 10px;
}
.description_block-author p {
    margin: 0;
}
.support h3 {
    font-family: Nunito;
    text-align: center;
    font-weight: normal;
    font-size: 32px;
    margin-bottom: 48px;
}
.support_block {
    background-color: #c8efc5;
    border-radius: 20px;
    display: flex;
    column-gap: 357px;
    padding: 20px;
    margin-bottom: 100px;
}
.support_block-text p {
    font-family: Nunito;
}
</style>

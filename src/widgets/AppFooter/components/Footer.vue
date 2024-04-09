<template>
    <footer class="footer">
        <div class="container">
            <div class="footer__wrapper">
                <div class="footer__wrapper_info">
                    <div class="footer_logo">
                        <a href="#" target="_blank">
                            <img
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
                    <div class="footer__wrapper_text">
                        <p>Политика конфиденциональности</p>
                        <p>Пользовательское соглашение</p>
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
    &__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
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
        &_text {
            font-size: 16px;
            font-weight: 400;
            font-family: 'Nunito', sans-serif;
            margin-top: 40px;
        }
        &_phone {
            font-size: 20px;
            font-weight: 400;
            font-family: 'Nunito', sans-serif;
        }
    }
}
</style>

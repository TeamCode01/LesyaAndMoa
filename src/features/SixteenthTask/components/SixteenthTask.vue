<template>
    <div class="SixteenthTask task_block">
        <div class="task_block__wrapper">
            <template v-if="answersCounter < 55">
                <div class="task_block__close" @click="hide">
                    <img
                        class="close-icon"
                        src="@app/assets/icons/close-icon.svg"
                        alt="крест"
                    />
                </div>
                <div class="task_block__time">
                    <Timer :end="end"></Timer>
                    <p class="title-h4 task_block__title SixteenthTask__title">
                        Прочитай от большой к маленькой букве в каждом слове,
                        перетяни буквы в поле ответа, собери предложение.
                    </p>
                </div>
                <div class="draggable-list">
                    <div class="draggable-list__items">
                        <div class="draggable-list__item1">
                            <div class="draggable-list__letters" id="letters-1">
                                <span
                                    class="draggable-list__letter1"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 1)"
                                    >Я</span
                                >
                                <span
                                    class="draggable-list__letter2"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 1)"
                                    >Л</span
                                >
                                <span
                                    class="draggable-list__letter3"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 1)"
                                    >Д</span
                                >
                            </div>
                            <div class="draggable-list__letters" id="letters-2">
                                <span
                                    class="draggable-list__letter1"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 2)"
                                    >К</span
                                >
                                <span
                                    class="draggable-list__letter4"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 2)"
                                    >И</span
                                >
                                <span
                                    class="draggable-list__letter3"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 2)"
                                    >П</span
                                >
                                <span
                                    class="draggable-list__letter5"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 2)"
                                    >С</span
                                >
                                <span
                                    class="draggable-list__letter6"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 2)"
                                    >О</span
                                >
                                <span
                                    class="draggable-list__letter7"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 2)"
                                    >Т</span
                                >
                                <span
                                    class="draggable-list__letter8"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 2)"
                                    >о</span
                                >
                                <span
                                    class="draggable-list__letter9"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 2)"
                                    >й</span
                                >
                                <span
                                    class="draggable-list__letter10"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 2)"
                                    >Р</span
                                >
                            </div>
                            <div class="draggable-list__letters" id="letters-3">
                                <span
                                    class="draggable-list__letter6"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 3)"
                                    >О</span
                                >
                                <span
                                    class="draggable-list__letter5"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 3)"
                                    >М</span
                                >
                                <span
                                    class="draggable-list__letter3"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 3)"
                                    >Д</span
                                >
                                <span
                                    class="draggable-list__letter7"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 3)"
                                    >И</span
                                >
                                <span
                                    class="draggable-list__letter7"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 3)"
                                    >к</span
                                >
                                <span
                                    class="draggable-list__letter9"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 3)"
                                    >а</span
                                >
                            </div>
                            <div class="draggable-list__letters" id="letters-4">
                                <span
                                    class="draggable-list__letter2"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 4)"
                                    >Ы</span
                                >
                                <span
                                    class="draggable-list__letter3"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 4)"
                                    >М</span
                                >
                            </div>
                            <div class="draggable-list__letters" id="letters-5">
                                <span
                                    class="draggable-list__letter10"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 5)"
                                    >М</span
                                >
                                <span
                                    class="draggable-list__letter7"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 5)"
                                    >ё</span
                                >
                                <span
                                    class="draggable-list__letter3"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 5)"
                                    >В</span
                                >
                                <span
                                    class="draggable-list__letter6"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 5)"
                                    >О</span
                                >
                                <span
                                    class="draggable-list__letter9"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 5)"
                                    >м</span
                                >
                                <span
                                    class="draggable-list__letter5"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 5)"
                                    >З</span
                                >
                                <span
                                    class="draggable-list__letter7"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 5)"
                                    >Ь</span
                                >
                            </div>
                        </div>
                        <div class="draggable-list__item2">
                            <div class="draggable-list__letters" id="letters-6">
                                <span
                                    class="draggable-list__letter6"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 6)"
                                    >Е</span
                                >
                                <span
                                    class="draggable-list__letter7"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 6)"
                                    >Т</span
                                >
                                <span
                                    class="draggable-list__letter3"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 6)"
                                    >В</span
                                >
                                <span
                                    class="draggable-list__letter9"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 6)"
                                    >К</span
                                >
                                <span
                                    class="draggable-list__letter9"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 6)"
                                    >и</span
                                >
                            </div>
                            <div class="draggable-list__letters" id="letters-7">
                                <span
                                    class="draggable-list__letter6"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 7)"
                                    >О</span
                                >
                                <span
                                    class="draggable-list__letter8"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 7)"
                                    >к</span
                                >
                                <span
                                    class="draggable-list__letter9"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 7)"
                                    >у</span
                                >
                                <span
                                    class="draggable-list__letter5"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 7)"
                                    >Щ</span
                                >
                                <span
                                    class="draggable-list__letter7"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 7)"
                                    >Е</span
                                >
                                <span
                                    class="draggable-list__letter3"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 7)"
                                    >Д</span
                                >
                                <span
                                    class="draggable-list__letter10"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 7)"
                                    >Ч</span
                                >
                            </div>
                            <div class="draggable-list__letters" id="letters-8">
                                <span
                                    class="draggable-list__letter6"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 8)"
                                    >Е</span
                                >
                                <span
                                    class="draggable-list__letter5"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 8)"
                                    >Н</span
                                >
                                <span
                                    class="draggable-list__letter3"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 8)"
                                    >В</span
                                >
                                <span
                                    class="draggable-list__letter10"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 8)"
                                    >И</span
                                >
                                <span
                                    class="draggable-list__letter1"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 8)"
                                    >к</span
                                >
                            </div>
                            <div class="draggable-list__letters" id="letters-9">
                                <span
                                    class="draggable-list__letter6"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 9)"
                                    >К</span
                                >
                                <span
                                    class="draggable-list__letter5"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 9)"
                                    >О</span
                                >
                                <span
                                    class="draggable-list__letter3"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 9)"
                                    >С</span
                                >
                                <span
                                    class="draggable-list__letter10"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 9)"
                                    >Т</span
                                >
                                <span
                                    class="draggable-list__letter9"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 9)"
                                    >ч</span
                                >
                            </div>
                            <div
                                class="draggable-list__letters"
                                id="letters-10"
                            >
                                <span
                                    class="draggable-list__letter10"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 10)"
                                    >Т</span
                                >
                                <span
                                    class="draggable-list__letter8"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 10)"
                                    >о</span
                                >
                                <span
                                    class="draggable-list__letter3"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 10)"
                                    >П</span
                                >
                                <span
                                    class="draggable-list__letter5"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 10)"
                                    >Л</span
                                >
                                <span
                                    class="draggable-list__letter1"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 10)"
                                    >к</span
                                >
                                <span
                                    class="draggable-list__letter7"
                                    draggable="true"
                                    @dragstart="dragLetter($event, 10)"
                                    >А</span
                                >
                            </div>
                        </div>
                    </div>
                    <div class="draggable-list__containers">
                        <div class="draggable-list__container1">
                            <div class="draggable-list__subcontainer1">
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="Д"
                                    @drop="dropLetter($event, 1)"
                                    @dragover.prevent
                                ></div>
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="Л"
                                    @drop="dropLetter($event, 1)"
                                    @dragover.prevent
                                ></div>
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="Я"
                                    @drop="dropLetter($event, 1)"
                                    @dragover.prevent
                                ></div>
                            </div>
                            <div class="draggable-list__subcontainer2">
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="П"
                                    @drop="dropLetter($event, 2)"
                                    @dragover.prevent
                                ></div>
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="О"
                                    @drop="dropLetter($event, 2)"
                                    @dragover.prevent
                                ></div>
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="С"
                                    @drop="dropLetter($event, 2)"
                                    @dragover.prevent
                                ></div>
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="Т"
                                    @drop="dropLetter($event, 2)"
                                    @dragover.prevent
                                ></div>
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="Р"
                                    @drop="dropLetter($event, 2)"
                                    @dragover.prevent
                                ></div>
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="О"
                                    @drop="dropLetter($event, 2)"
                                    @dragover.prevent
                                ></div>
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="Й"
                                    @drop="dropLetter($event, 2)"
                                    @dragover.prevent
                                ></div>
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="К"
                                    @drop="dropLetter($event, 2)"
                                    @dragover.prevent
                                ></div>
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="И"
                                    @drop="dropLetter($event, 2)"
                                    @dragover.prevent
                                ></div>
                            </div>
                            <div class="draggable-list__subcontainer3">
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="Д"
                                    @drop="dropLetter($event, 3)"
                                    @dragover.prevent
                                ></div>
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="О"
                                    @drop="dropLetter($event, 3)"
                                    @dragover.prevent
                                ></div>
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="М"
                                    @drop="dropLetter($event, 3)"
                                    @dragover.prevent
                                ></div>
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="И"
                                    @drop="dropLetter($event, 3)"
                                    @dragover.prevent
                                ></div>
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="К"
                                    @drop="dropLetter($event, 3)"
                                    @dragover.prevent
                                ></div>
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="А"
                                    @drop="dropLetter($event, 3)"
                                    @dragover.prevent
                                ></div>
                            </div>
                            <div class="draggable-list__subcontainer4">
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="М"
                                    @drop="dropLetter($event, 4)"
                                    @dragover.prevent
                                ></div>
                                <div
                                    class="draggable-list__subcontainer-square"
                                    data-answer="Ы"
                                    @drop="dropLetter($event, 4)"
                                    @dragover.prevent
                                ></div>
                            </div>
                        </div>
                        <div class="draggable-list__container2">
                            <div class="draggable-list__container2-1">
                                <div class="draggable-list__subcontainer5">
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="В"
                                        @drop="dropLetter($event, 5)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="О"
                                        @drop="dropLetter($event, 5)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="З"
                                        @drop="dropLetter($event, 5)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="Ь"
                                        @drop="dropLetter($event, 5)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="М"
                                        @drop="dropLetter($event, 5)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="Ё"
                                        @drop="dropLetter($event, 5)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="М"
                                        @drop="dropLetter($event, 5)"
                                        @dragover.prevent
                                    ></div>
                                </div>
                                <div class="draggable-list__subcontainer6">
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="В"
                                        @drop="dropLetter($event, 6)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="Е"
                                        @drop="dropLetter($event, 6)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="Т"
                                        @drop="dropLetter($event, 6)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="К"
                                        @drop="dropLetter($event, 6)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="И"
                                        @drop="dropLetter($event, 6)"
                                        @dragover.prevent
                                    ></div>
                                    <img
                                        src="/assets/icons/comma.svg"
                                        alt="comma"
                                        v-if="false"
                                    />
                                    <img
                                        src="/assets/icons/comma-blue.svg"
                                        alt="comma-blue"
                                        v-if="true"
                                    />
                                </div>
                                <div class="draggable-list__subcontainer7">
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="Д"
                                        @drop="dropLetter($event, 7)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="О"
                                        @drop="dropLetter($event, 7)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="Щ"
                                        @drop="dropLetter($event, 7)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="Е"
                                        @drop="dropLetter($event, 7)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="Ч"
                                        @drop="dropLetter($event, 7)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="К"
                                        @drop="dropLetter($event, 7)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="У"
                                        @drop="dropLetter($event, 7)"
                                        @dragover.prevent
                                    ></div>
                                    <img
                                        src="/assets/icons/comma.svg"
                                        alt="comma"
                                        v-if="false"
                                    />
                                    <img
                                        src="/assets/icons/comma-blue.svg"
                                        alt="comma-blue"
                                        v-if="true"
                                    />
                                </div>
                            </div>
                            <div class="draggable-list__container2-2">
                                <div class="draggable-list__subcontainer8">
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="В"
                                        @drop="dropLetter($event, 8)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="Е"
                                        @drop="dropLetter($event, 8)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="Н"
                                        @drop="dropLetter($event, 8)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="И"
                                        @drop="dropLetter($event, 8)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="К"
                                        @drop="dropLetter($event, 8)"
                                        @dragover.prevent
                                    ></div>
                                    <img
                                        src="/assets/icons/comma.svg"
                                        alt="comma"
                                        v-if="false"
                                    />
                                    <img
                                        src="/assets/icons/comma-blue.svg"
                                        alt="comma-blue"
                                        v-if="true"
                                    />
                                </div>
                                <div class="draggable-list__subcontainer9">
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="С"
                                        @drop="dropLetter($event, 9)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="К"
                                        @drop="dropLetter($event, 9)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="О"
                                        @drop="dropLetter($event, 9)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="Т"
                                        @drop="dropLetter($event, 9)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="Ч"
                                        @drop="dropLetter($event, 9)"
                                        @dragover.prevent
                                    ></div>
                                    <img
                                        src="/assets/icons/comma.svg"
                                        alt="comma"
                                        v-if="false"
                                    />
                                    <img
                                        src="/assets/icons/comma-blue.svg"
                                        alt="comma-blue"
                                        v-if="true"
                                    />
                                </div>
                                <div class="draggable-list__subcontainer10">
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="П"
                                        @drop="dropLetter($event, 10)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="Л"
                                        @drop="dropLetter($event, 10)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="А"
                                        @drop="dropLetter($event, 10)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="Т"
                                        @drop="dropLetter($event, 10)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="О"
                                        @drop="dropLetter($event, 10)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__subcontainer-square"
                                        data-answer="К"
                                        @drop="dropLetter($event, 10)"
                                        @dragover.prevent
                                    ></div>
                                    <div
                                        class="draggable-list__full-stop"
                                        v-if="false"
                                    >
                                        <img
                                            src="/assets/icons/full-stop.svg"
                                            alt="full-stop"
                                        />
                                    </div>
                                    <div
                                        class="draggable-list__full-stop"
                                        v-if="true"
                                    >
                                        <img
                                            src="/assets/icons/full-stop-blue.svg"
                                            alt="full-stop-blue"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <input
                    @drop="drop($event)"
                    @dragover="allowDrop($event)"
                    v-model="answer"
                    class="task_block__wrapper_answer"
                />
            </template>
            <TaskResultBanner
                img="/assets/backgrounds/flowers.png"
                bg="/assets/backgrounds/moa.gif"
                text="Здорово!"
                v-if="answersCounter == 55"
                @hide="hide()"
            ></TaskResultBanner>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
import { TaskResultBanner } from '@features/TaskResultBanner/components';

const emit = defineEmits(['close']);
const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
});
const hide = () => {
    emit('close');
};

const isActive = true;

const refLetter = ref();
const dragLetterWord = ref();
const answersCounter = ref(0);

onMounted(() => {
    refLetter.value = '';
    dragLetterWord.value = 0;
    answersCounter.value = 0;
});

const dragLetter = (event, wordID = 1) => {
    event.dataTransfer.setData('text', event.target.innerHTML.toUpperCase());
    console.log(event.dataTransfer.getData('text'));
    refLetter.value = event.target;
    dragLetterWord.value = wordID;
};

const dropLetter = (event, wordID = 1) => {
    if (wordID == dragLetterWord.value) {
        if (
            event.target.getAttribute('data-answer') ==
            event.dataTransfer.getData('text')
        ) {
            event.target.innerHTML =
                wordID == 1 && refLetter.value.innerHTML == 'Д'
                    ? event.dataTransfer.getData('text').toUpperCase()
                    : event.dataTransfer.getData('text').toLowerCase();
            refLetter.value.innerHTML = '';
            event.target.classList.add(
                'draggable-list__subcontainer-square_right'
            );
            setTimeout(() => {
                answersCounter.value += 1;
                event.target.classList.remove(
                    'draggable-list__subcontainer-square_right'
                );
            }, 2000);
        } else {
            event.target.innerHTML = '?';
            event.target.classList.add(
                'draggable-list__subcontainer-square_warning'
            );
            setTimeout(() => {
                event.target.classList.remove(
                    'draggable-list__subcontainer-square_warning'
                );
            }, 2000);
        }
    } else {
        event.target.innerHTML = 'X';
        event.target.classList.add('draggable-list__subcontainer-square_wrong');
        setTimeout(() => {
            event.target.classList.remove(
                'draggable-list__subcontainer-square_wrong'
            );
        }, 2000);
    }
};

// Для постройки домика мы
// возьмем ветки дощечку
// веник скотч платок

const data = {
    1: {
        1: [
            { id: 1, classid: 1, text: 'Я' },
            { id: 2, classid: 2, text: 'Л' },
            { id: 3, classid: 3, text: 'Д' },
        ],
        2: [
            { id: 1, classid: 1, text: 'К' },
            { id: 2, classid: 4, text: 'И' },
            { id: 3, classid: 3, text: 'П' },
            { id: 4, classid: 5, text: 'С' },
            { id: 5, classid: 6, text: 'О' },
            { id: 6, classid: 7, text: 'Т' },
            { id: 7, classid: 8, text: 'о' },
            { id: 8, classid: 9, text: 'й' },
            { id: 9, classid: 10, text: 'Р' },
        ],
        3: [
            { id: 1, classid: 6, text: 'М' },
            { id: 2, classid: 5, text: 'М' },
            { id: 3, classid: 3, text: 'Д' },
            { id: 4, classid: 7, text: 'И' },
            { id: 5, classid: 7, text: 'к' },
            { id: 6, classid: 9, text: 'а' },
        ],
        4: [
            { id: 1, classid: 2, text: 'М' },
            { id: 2, classid: 3, text: 'Ы' },
        ],
        5: [
            { id: 1, classid: 10, text: 'М' },
            { id: 2, classid: 7, text: 'ё' },
            { id: 3, classid: 3, text: 'В' },
            { id: 4, classid: 6, text: 'О' },
            { id: 5, classid: 9, text: 'м' },
            { id: 6, classid: 5, text: 'З' },
            { id: 7, classid: 7, text: 'ь' },
        ],
    },
    2: {
        1: { 1: 'в', 2: 'о', 3: 'з', 4: 'ь', 5: 'м', 6: 'ё', 7: 'м' },
        2: { 1: 'в', 2: 'е', 3: 'т', 4: 'к', 5: 'и' },
        3: { 1: 'д', 2: 'о', 3: 'щ', 4: 'е', 5: 'ч', 6: 'к', 7: 'у' },
    },
    3: {
        1: { 1: 'в', 2: 'е', 3: 'н', 4: 'и', 5: 'к' },
        2: { 1: 'с', 2: 'к', 3: 'о', 4: 'т', 5: 'ч' },
        3: { 1: 'п', 2: 'л', 3: 'а', 4: 'т', 5: 'о', 6: 'к' },
    },
};

const answer = {
    1: {
        1: { 1: 'Д', 2: 'л', 3: 'я' },
        2: {
            1: 'п',
            2: 'о',
            3: 'с',
            4: 'т',
            5: 'р',
            6: 'о',
            7: 'й',
            8: 'к',
            9: 'и',
        },
        3: { 1: 'д', 2: 'о', 3: 'м', 4: 'и', 5: 'к', 6: 'а' },
        4: { 1: 'м', 2: 'ы' },
    },
    2: {
        1: { 1: 'в', 2: 'о', 3: 'з', 4: 'ь', 5: 'м', 6: 'ё', 7: 'м' },
        2: { 1: 'в', 2: 'е', 3: 'т', 4: 'к', 5: 'и' },
        3: { 1: 'д', 2: 'о', 3: 'щ', 4: 'е', 5: 'ч', 6: 'к', 7: 'у' },
    },
    3: {
        1: { 1: 'в', 2: 'е', 3: 'н', 4: 'и', 5: 'к' },
        2: { 1: 'с', 2: 'к', 3: 'о', 4: 'т', 5: 'ч' },
        3: { 1: 'п', 2: 'л', 3: 'а', 4: 'т', 5: 'о', 6: 'к' },
    },
};
</script>

<style lang="scss" scoped>
.SixteenthTask {
    position: block;
}

.SixteenthTask__title {
    width: 700px;
    @media (max-width: 1024px) {
        width: 580px;
        font-family: 'Nunito', sans-serif;
        font-size: 20px;
        font-weight: 500;
        color: $text-primary;
    }
}

.draggable-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1040px;
    height: 396px;
    gap: 68px;
    margin-top: 32px;
    @media (max-width: 1024px) {
        margin-top: 16px;
        width: 887px;
        height: 316px;
        gap: 40px;
    }
}

.draggable-list__items {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 887px;
    height: 140px;
    justify-content: space-between;
    @media (max-width: 1024px) {
        height: 120px;
    }
}

.draggable-list__item1 {
    width: 876px;
    @media (max-width: 1024px) {
        width: 100%;
    }
}

.draggable-list__letters {
    padding: 16px 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    border-radius: 6px;
    background-color: $puppe;

    display: flex;
    justify-content: center;
    align-items: flex-end;
    @media (max-width: 1024px) {
        height: 52px;
        padding: 9px 13px;
    }
}

.draggable-list__word1,
.draggable-list__word2,
.draggable-list__word3,
.draggable-list__word4,
.draggable-list__word5,
.draggable-list__word6,
.draggable-list__word7,
.draggable-list__word8,
.draggable-list__word9,
.draggable-list__word10 {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 34px;
}

.draggable-list__word1 {
    width: 72px;
}

.draggable-list__word2 {
    width: 187px;
}

.draggable-list__word3 {
    width: 158px;
}

.draggable-list__word4 {
    width: 66px;
}

.draggable-list__word5 {
    width: 169px;
}

.draggable-list__word6 {
    width: 108px;
}

.draggable-list__word7 {
    width: 181px;
}

.draggable-list__word8 {
    width: 119px;
}

.draggable-list__word9 {
    width: 120px;
}

.draggable-list__word10 {
    width: 135px;
}

.draggable-list__letter1 {
    height: 20px;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 400;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter2 {
    height: 28px;
    font-family: 'Nunito', sans-serif;
    font-size: 28px;
    font-weight: 400;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter3 {
    height: 50px;
    font-family: 'Nunito', sans-serif;
    font-size: 48px;
    font-weight: 300;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter4 {
    height: 16px;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter5 {
    height: 39px;
    font-family: 'Nunito', sans-serif;
    font-size: 38px;
    font-weight: 300;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter6 {
    height: 45px;
    font-family: 'Nunito', sans-serif;
    font-size: 44px;
    font-weight: 300;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter7 {
    height: 32px;
    font-family: 'Nunito', sans-serif;
    font-size: 32px;
    font-weight: 300;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter8 {
    height: 34px;
    font-family: 'Nunito', sans-serif;
    font-size: 34px;
    font-weight: 300;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter9 {
    height: 24px;
    font-family: 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: 400;
    color: $violetLetters-game;
    cursor: pointer;
}

.draggable-list__letter10 {
    height: 28px;
    font-family: 'Nunito', sans-serif;
    font-size: 28px;
    font-weight: 300;
    color: $violetLetters-game;
    cursor: pointer;
}

#letters-1 {
    width: 104px;
}

#letters-2 {
    width: 219px;
}

#letters-3 {
    width: 190px;
}

#letters-4 {
    width: 98px;
}

#letters-5 {
    width: 201px;
}

#letters-6 {
    width: 140px;
}

#letters-7 {
    width: 213px;
}

#letters-8 {
    width: 151px;
}

#letters-9 {
    width: 152px;
}

#letters-10 {
    width: 167px;
}

.draggable-list__item2 {
    width: 100%;
}

.draggable-list__item1,
.draggable-list__item2 {
    display: flex;
    height: 60px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1024px) {
        height: 52px;
    }
}

.draggable-list__containers {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1040px;
    height: 188px;
    justify-content: space-between;
    @media (max-width: 1024px) {
        width: 880px;
        height: 156px;
    }
}

.draggable-list__subcontainer-square {
    width: 48px;
    height: 48px;
    background-color: $blueGame;
    border-radius: 6px;

    color: rgb(78, 59, 127);
    font-family: Nunito;
    font-size: 28px;
    font-weight: 400;
    line-height: 38px;
    letter-spacing: 0%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;

    @media (max-width: 1024px) {
        width: 40px;
        height: 40px;
        padding: 10px;
    }
}

.draggable-list__container1 {
    display: flex;
    width: 100%;
    height: 48px;
    justify-content: space-between;
    @media (max-width: 1024px) {
        height: 40px;
    }
}

.draggable-list__subcontainer1,
.draggable-list__subcontainer2,
.draggable-list__subcontainer3,
.draggable-list__subcontainer4,
.draggable-list__subcontainer5,
.draggable-list__subcontainer6,
.draggable-list__subcontainer7,
.draggable-list__subcontainer8,
.draggable-list__subcontainer9,
.draggable-list__subcontainer10 {
    display: flex;
    justify-content: space-between;
    gap: 2px;
}

.draggable-list__subcontainer1 {
    width: 148px;
    @media (max-width: 1024px) {
        width: 124px;
    }
}

.draggable-list__subcontainer2 {
    width: 448px;
    @media (max-width: 1024px) {
        width: 376px;
    }
}

.draggable-list__subcontainer3 {
    width: 298px;
    @media (max-width: 1024px) {
        width: 250px;
    }
}

.draggable-list__subcontainer4 {
    width: 98px;
    @media (max-width: 1024px) {
        width: 82px;
    }
}

.draggable-list__subcontainer5 {
    width: 348px;
    @media (max-width: 1024px) {
        width: 292px;
    }
}

.draggable-list__subcontainer6 {
    width: 261px;
    @media (max-width: 1024px) {
        width: 218px;
    }
}

.comma {
    width: 11px;
    height: 52px;

    @media (max-width: 1024px) {
        width: 8px;
        height: 44px;
    }
}

.draggable-list__subcontainer7 {
    width: 361px;
    @media (max-width: 1024px) {
        width: 302px;
    }
}

.draggable-list__subcontainer8 {
    width: 261px;
    @media (max-width: 1024px) {
        width: 218px;
    }
}

.draggable-list__subcontainer9 {
    width: 261px;
    @media (max-width: 1024px) {
        width: 218px;
    }
}

.draggable-list__subcontainer10 {
    width: 310px;
    @media (max-width: 1024px) {
        width: 260px;
    }
}

.draggable-list__full-stop {
    display: flex;
    align-items: flex-end;
    width: 11px;
    height: 48px;
    @media (max-width: 1024px) {
        width: 8px;
        height: 40px;
    }
}

.draggable-list__container2 {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    width: 1001px;
    height: 120px;
    @media (max-width: 1024px) {
        width: 844px;
        height: 100px;
        gap: 12px;
    }
}

.draggable-list__container2-1 {
    display: flex;
    width: 100%;
    height: 52px;
    justify-content: space-between;
    @media (max-width: 1024px) {
        height: 44px;
    }
}

.draggable-list__container2-2 {
    display: flex;
    width: 863px;
    height: 52px;
    justify-content: space-between;
    @media (max-width: 1024px) {
        width: 728px;
        height: 44px;
    }
}

.draggable-list__subcontainer-square_wrong {
    border: 2px solid #db0000;
}
.draggable-list__subcontainer-square_right {
    border: 2px solid #5ccf54;
}
.draggable-list__subcontainer-square_warning {
    border: 2px solid #cfcd54;
}
</style>
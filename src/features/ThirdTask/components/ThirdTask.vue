<template>
    <div class="ThirdTask task_block">
        <div class="ThirdTask__wrapper">
            <div class="task_block__close" @click="hide">
                <img
                    class="close-icon"
                    src="@app/assets/icons/close-icon.svg"
                    alt="крест"
                />
            </div>
            <div class="task_block__time">
                <Timer :end="end"></Timer>
                <p class="title-h4 ThirdTask__title">
                    Распредели звуки по коробкам на образуемые с помощью только
                    шума, голоса и шума, только голоса.
                </p>
            </div>

            <div class="draggable-list">
                <div class="list-group ThirdTask__wrapper_block">
                    <q-btn
                        v-for="(item, index) in letters"
                        :key="index"
                        class="list-group-item item"
                        draggable="true"
                        @dragstart="drag($event, index)"
                    >
                        {{ item }}
                    </q-btn>
                </div>
            </div>
            <div class="ThirdTask__answer">
                <div
                    class="box"
                    id="box"
                    @drop="drop($event, array)"
                    @dragover="allowDrop($event)"
                >
                    <div class="letter__item" v-for="item in array">
                        {{ item }}
                    </div>
                </div>
                <div
                    class="box2"
                    id="box2"
                    @drop="drop($event, array_two)"
                    @dragover="allowDrop($event)"
                >
                    <div class="letter__item" v-for="item in array_two">
                        {{ item }}
                    </div>
                </div>
                <div
                    class="box3"
                    id="box3"
                    @drop="drop($event, array_three)"
                    @dragover="allowDrop($event)"
                >
                    <div class="letter__item" v-for="item in array_three">
                        {{ item }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { Timer } from '@shared/components/timer';
const emit = defineEmits(['close']);

const hide = () => {
    emit('close');
};

const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
});

const letters = ref(['к', 'ч', 'с', 'о', 'ф', 'з', 'и', 'г', 'д']);
const answer = ref('');
const array = ref([]);
const array_two = ref([]);
const array_three = ref([]);
const dropIndex = ref(letters.value.length - 1);
const drag = (event, index) => {
    event.dataTransfer.setData('text', event.target.innerText);
    dropIndex.value = index;
};

const drop = (event, arr) => {
    const letter = event.dataTransfer.getData('text');
    letters.value.splice(dropIndex.value, 1);
    arr.push(letter);
};

const allowDrop = (event) => {
    event.preventDefault();
};
</script>
<style lang="scss" scoped>
.box {
    background-image: url('@app/assets/creatures/box1.png');
    width: 279px;
    height: 226px;
    display: grid;
    grid-template-columns: 55px 2px;
    row-gap: 4px;
    padding: 110px 40px;
    z-index: 999;

    @media (max-width: 1024px) {
        width: 250px;
        height: 186px;
    }
}

.box2 {
    background-image: url('@app/assets/creatures/box2.png');
    width: 279px;
    height: 226px;
    display: grid;
    grid-template-columns: 55px 2px;
    row-gap: 4px;
    padding: 110px 40px;
    z-index: 999;

    @media (max-width: 1024px) {
        width: 250px;
        height: 186px;
    }
}

.box3 {
    background-image: url('@app/assets/creatures/box3.png');
    width: 279px;
    height: 226px;
    display: grid;
    grid-template-columns: 55px 2px;
    row-gap: 4px;
    padding: 110px 40px;
    z-index: 999;

    @media (max-width: 1024px) {
        width: 250px;
        height: 186px;
    }
}

.ThirdTask {
    &__answer {
        display: flex;
        justify-content: center;
        column-gap: 50px;

        @media (max-width: 1024px) {
            column-gap: 25px;
        }
    }

    &__wrapper {
        padding: 30px 133px 58px 133px;
        position: relative;

        @media (max-width: 1024px) {
            padding: 30px 0px;
        }

        &_block {
            display: flex;
            justify-content: center;
            column-gap: 40px;
            margin-top: 60px;
            margin-bottom: 88px;

            @media (max-width: 1024px) {
                margin-top: 32px;
                margin-bottom: 64px;
            }
        }
    }
}

.item {
    background-color: $lightPink;
    text-transform: uppercase;
    padding: 9px 17px;
    color: $vihous;
    font-size: 24px;
    font-weight: 800;
    font-family: 'Nunito', sans-serif;
    border-radius: 6px;
    border: none;
    cursor: pointer;
}

.letter__item {
    width: 48px;
    height: 48px;
    border: 1.5px solid #a8664a;
    font-family: 'Nunito', sans-serif;
    font-weight: bold;
    font-size: 24px;
    color: #a8664a;
    padding: 7.5px 15px;
    z-index: 998;
    border-radius: 6px;
}
</style>

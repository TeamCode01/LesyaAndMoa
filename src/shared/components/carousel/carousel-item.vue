<template>
    <div class="carousel-item">
        <RouterLink
            class="router-news"
            :to="{
                name: 'page',
                params: { id: item_data.id },
            }"
            ><img
                :src="item_data.image"
                alt="img"
                class="carousel-item__news-img"
                v-if="corousel_type === 'news'"
        /></RouterLink>
        <img
            :src="item_data.img"
            alt="img"
            class="carousel-item__author-img"
            v-if="props.corousel_type == 'authors'"
        />
        <div class="carousel-item__info">
            <p
                class="text-small carousel-item__text"
                v-if="corousel_type === 'news'"
            >
                {{ item_data.title }}
            </p>
            <p class="carousel-item__desc" v-if="corousel_type === 'news'">
                {{ item_data.description }}
            </p>
            <p class="carousel-item__date" v-if="corousel_type === 'news'">
                {{ formatDate(item_data.created_at) }}
            </p>

            <p
                class="text-small carousel-item__author-name"
                v-if="props.corousel_type == 'authors'"
            >
                {{ item_data.author_name }}
            </p>
            <p
                class="text-small carousel-item__author-about"
                v-if="corousel_type === 'authors'"
            >
                {{ item_data.author_about_top }}
            </p>
            <p
                class="text-small carousel-item__author-about"
                v-if="corousel_type === 'authors'"
            >
                {{ item_data.author_about_bottom }}
            </p>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    item_data: {
        type: Object,
        default: () => {},
    },
    corousel_type: {
        type: String,
        default: () => '',
    },
});

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

const emit = defineEmits(['click']);
</script>
<style lang="scss" scoped>
.carousel-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;

    &__info {
        width: 100%;

        @media (max-width: 650px) {
            max-width: 300px;
        }
    }

    &__news-img {
        max-width: 387px;
        height: 220px;
        border-radius: 20px;
        object-fit: cover;

        @media (max-width: 1024px) {
            max-width: 300px;
            height: 220px;
        }
        @media (max-width: 568px) {
            max-width: 300px;
            height: 220px;
        }
    }

    &__author-img {
        max-width: 325px;
        @media (max-width: 568px) {
            object-fit: cover;
            min-width: 320px;
            min-height: 415px;
            border-radius: 20px;
        }
    }

    &__text {
        font-size: 20px;
        font-weight: 400;
        color: $text-primary;
        font-family: 'Nunito', sans-serif;
        max-width: 375px;
        margin: 15px 0 15px 0;
        text-align: left;

        @media (max-width: 1024px) {
            max-width: 300px;
        }
    }

    &__author-name {
        font-size: 20px;
        text-align: left;
        margin-top: 16px;
    }

    &__author-about {
        text-align: left;
    }

    &__date {
        font-size: 16px;
        font-family: 'Nunito', sans-serif;
        font-weight: 400;
        color: $grey;
        margin-bottom: 20px;
        margin-top: 12px;
        text-align: left;
    }
    &__desc {
        font-size: 16px;
        font-weight: 400;
        font-family: 'Nunito', sans-serif;
        color: $text-primary;
        text-align: left;
    }
}
</style>

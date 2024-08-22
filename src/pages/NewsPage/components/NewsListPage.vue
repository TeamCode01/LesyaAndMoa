<template>
    <div class="container">
        <div class="news-h">
            <div class="news-h__wrapper">
                <h1>Новости</h1>
                <img class="news-h__img" src="@app/assets/img/News/image-moa.png" alt="" />
            </div>
        </div>
        <div class="news-list">
            <div class="news-list__card" v-for="(block, index) in news" :key="index">

                <RouterLink :to="{
                    name: 'page',
                    params: { id: block.id },
                }">
                    <div class="news-list__card-img">
                        <img :src="block.image" alt="" />
                    </div>
                    <div class="news-list__card-box">
                        <h5 class="news-list__title">{{ block.title }}</h5>
                        <p class="news-list__desc">{{ block.description }}</p>
                        <p class="news-list__data">
                            {{ formatDate(block.created_at) }}
                        </p>
                    </div>
                </RouterLink>

            </div>
        </div>
        <div>
            <button @click="prevPage" :disabled="currentPage === 1">
                <img
                    class="news-arrow"
                    src="@app/assets/icons/arrows.svg"
                    alt=""
                />
            </button>
            <span>{{ currentPage }}</span>
            <button
                @click="nextPage"
                :disabled="currentPage * itemsPerPage >= totalItems"
            >
                <img src="@app/assets/icons/arrows.svg" alt="" />
            </button>
        </div>
    </div>
</template>
<script setup>
import { HTTP } from '@app/http';
import { ref, onMounted, computed } from 'vue';

const news = ref([]);
const error = ref([]);
let currentPage = 1;
const itemsPerPage = 9;
let totalItems = 0;

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

const GetNews = async (page = 1) => {
    try {
        const offset = (page - 1) * itemsPerPage;
        const response = await HTTP.get('/news/', {
            params: {
                limit: itemsPerPage,
                offset: offset,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        news.value = response.data.results;
        totalItems = response.data.total;
        console.log(response.data);
    } catch (error) {
        console.log('errr', error);
        error.value = error.response.data;
        console.error('There was an error!', error);
    }
};

const nextPage = () => {
    if (currentPage * itemsPerPage < totalItems) {
        currentPage++;
        GetNews(currentPage);
    }
};

const prevPage = () => {
    if (currentPage > 1) {
        currentPage--;
        GetNews(currentPage);
    }
};

onMounted(() => {
    GetNews(currentPage);
});
</script>
<style>
.news-h {
    margin-top: 80px;
    margin-bottom: 50px;
}

.news-h__wrapper {
    background: #d2efff;
    border-radius: 20px;
    height: 260px;
    position: relative;
    text-align: center;
    align-content: center;
}

.news-h__wrapper h1 {
    font-family: 'Nunito', sans-serif;
    font-weight: 500;
    font-size: 50px;
    line-height: 50px;
}

.news-h__wrapper img {
    position: absolute;
    right: 10%;
    bottom: 2%;
}

.news-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    column-gap: 20px;
    row-gap: 40px;
    margin-bottom: 60px;
}

.news-list__card {
    width: 387px;
    height: 100%;
}

.news-list__card-img {
    display: flex;
    justify-content: center;
    margin-bottom: 12px;
}

.news-list__card-img img {
    width: 387px;
    height: 240px;
    border-radius: 20px;
    object-fit: cover;
    overflow: hidden;
}

.news-list__title {
    margin-bottom: 12px;
}

.news-list__desc {
    margin-bottom: 12px;
}

.news-arrow {
    transform: scale(-1, 1);
}
</style>

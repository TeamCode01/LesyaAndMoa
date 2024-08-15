<template>
    <div class="container">
        <div class="news-h">
            <div class="news-h__wrapper">
                <h1>Новости</h1>
                <img
                    class="news-h__img"
                    src="@app/assets/img/News/image-moa.png"
                    alt=""
                />
            </div>
        </div>
        <div class="news-list">
            <div
                class="news-list__card"
                v-for="(block, index) in news"
                :key="index"
            >
                <router-link
                    :to="{
                        name: 'news-page',
                        params: { id: block?.id },
                    }"
                    :key="block.id"
                >
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
                </router-link>
            </div>
        </div>
        <!-- <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">«</button>
            <button
                v-for="page in totalPages"
                :key="page"
                @click="changePage(page)"
            >
                {{ page }}
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages">
                »
            </button>
        </div> -->
    </div>
</template>
<script setup>
import { HTTP } from '@app/http';
import { ref, onMounted } from 'vue';

const news = ref([]);
const error = ref([]);
// const totalPages = ref(0);
// const currentPage = ref(1);
// const itemsPerPage = 9;
// const apiURL = 'https://леся-моа.рф/api/v1/news/';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

const GetNews = async () => {
    try {
        const response = await HTTP.get('/news/', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        news.value = response.data;
        console.log(response.data);
        // totalPages.value = Math.ceil(response.data.count / itemsPerPage);
        console.log(totalPages.value);
    } catch (error) {
        console.log('errr', error);
        error.value = error.response.data;
        console.error('There was an error!', error);
    }
};

// const changePage = (page) => {
//     currentPage.value = page;
//     const offset = (page - 1) * itemsPerPage;
//     GetNews(`${apiURL}?offset=${offset}&limit=${itemsPerPage}`);
// };

// const nextPage = () => {
//     if (currentPage.value < totalPages.value) {
//         changePage(currentPage.value + 1);
//     }
// };

// const prevPage = () => {
//     if (currentPage.value > 1) {
//         changePage(currentPage.value - 1);
//     }
// };

onMounted(async () => {
    await GetNews();
    // GetNews(`${apiURL}?offset=0&limit=${itemsPerPage}`);
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
</style>

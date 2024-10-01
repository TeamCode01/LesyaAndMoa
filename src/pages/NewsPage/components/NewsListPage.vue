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
                <RouterLink
                    class="router-news"
                    :to="{
                        name: 'page',
                        params: { id: block.id },
                    }"
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
                </RouterLink>
            </div>
        </div>
        <div class="news-pagination">
            <button @click="prevPage" :disabled="currentPage === 1">
                <img
                    v-if="!(currentPage === 1)"
                    class="news-arrow news-arrows"
                    src="@app/assets/icons/arrows.svg"
                    alt=""
                />
            </button>

            <p
                class="news-page__list"
                :class="{ 'current-page': page === currentPage }"
                v-for="page in pages"
                :key="page"
                @click="setCurrentPage(page)"
            >
                &nbsp;&nbsp;{{ page }}&nbsp;&nbsp;
            </p>

            <button
                @click="nextPage"
                :disabled="currentPage * itemsPerPage >= totalItems"
            >
                <img
                    v-if="!(currentPage * itemsPerPage >= totalItems)"
                    class="news-arrows arrow-news"
                    src="@app/assets/icons/arrows.svg"
                    alt=""
                />
            </button>
        </div>
    </div>
</template>
<script setup>
import { HTTP } from '@app/http';
import { onActivated, ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useBreadcrumbsStore, usePageStore } from '@shared/index';
import { storeToRefs } from 'pinia';
import { onBeforeRouteLeave } from 'vue-router';

const { toggleHideBreadcrumbs, setHideBreadcrumbs } = useBreadcrumbsStore();

const route = useRoute();
const news = ref([]);
const error = ref([]);
let currentPage = 1;
const itemsPerPage = 9;
let totalItems = 0;
const pagesToShow = 4;

const pages = ref([]);

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
        generatePages();
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

const setCurrentPage = (page) => {
    currentPage = page;
    GetNews(page);
};

const generatePages = () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    pages.value = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index,
    );
};

watch(route.path, () => {
    console.log('route');
    toggleHideBreadcrumbs(true);
    setHideBreadcrumbs(false);
});

onMounted(() => {
    GetNews(currentPage);
    toggleHideBreadcrumbs(true);
    setHideBreadcrumbs(false);
});

const { hidden } = storeToRefs(useBreadcrumbsStore);

watch(hidden, (newValue) => {
    if (!newValue) {
        toggleHideBreadcrumbs(true);
        setHideBreadcrumbs(false);
    }
});

onActivated(() => {
    toggleHideBreadcrumbs(true);
    setHideBreadcrumbs(false);
});

onBeforeRouteLeave(() => {
    pages.value = [];
    GetNews(currentPage === 1);
    toggleHideBreadcrumbs(false);
    setHideBreadcrumbs(true);
});
</script>
<style scoped lang="scss">
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
    @media (max-width: 700px) {
        font-size: 40px;
    }
    @media (max-width: 500px) {
        font-size: 30px;
    }
}

.news-h__wrapper img {
    position: absolute;
    right: 10%;
    bottom: 2%;
    @media (max-width: 990px) {
        right: 1%;
    }
    @media (max-width: 700px) {
        width: 40%;
    }
}

.news-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-bottom: 60px;
    justify-items: center;
    row-gap: 20px;
    @media (max-width: 990px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 680px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
}

.news-list__card {
    // width: 387px;
    width: 97%;
    height: 100%;
}

.news-list__card-img {
    display: flex;
    margin-bottom: 12px;
}

.news-list__card-img img {
    width: 97%;
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
    margin-right: 10px;
}

.arrow-news {
    margin-left: 10px;
}

.news-pagination {
    margin-bottom: 100px;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.news-page__list {
    padding-bottom: 5px;
}

.news-list__card-box {
    font-family: 'Nunito', sans-serif;
    font-weight: 400;
    text-decoration: none;
}

.router-news {
    text-decoration: none;
}

.news-list__title {
    font-size: 20px;
    color: #313131;
    font-weight: 400;
}

.news-list__desc {
    font-size: 16px;
    color: #313131;
}

.news-list__data {
    font-size: 14px;
    color: #818181;
}

.current-page {
    color: #0d47aa;
}
</style>

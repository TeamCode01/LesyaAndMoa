<template>
    <div class="container">
        <div class="news-page__container">
            <div class="news-banner">
                <div class="news-banner__text">
                    <h3>{{ news.title }}</h3>
                    <p>{{ news.description }}</p>
                    <span class="news-data">{{
                        formatDate(news.created_at)
                    }}</span>
                </div>
                <div class="news-banner__img">
                    <img :src="news.image" alt="" />
                </div>
            </div>
            <div class="news-description">
                <p>{{ news.description }}</p>
            </div>
            <div class="to-news-list">
                <router-link class="to-news" :to="{ name: 'news' }"
                    >Смотреть все новости</router-link
                >
            </div>
        </div>
    </div>
</template>
<script setup>
import { HTTP } from '@app/http';
import { ref, watch, onMounted, onActivated } from 'vue';
import { useRoute } from 'vue-router';
import { usePage } from '@shared';
import { useBreadcrumbsStore, usePageStore } from '@shared/index';
import { storeToRefs } from 'pinia';
import { onBeforeRouteLeave } from 'vue-router';

const { toggleHideBreadcrumbs, setHideBreadcrumbs } = useBreadcrumbsStore();

const route = useRoute();
const news = ref({});
const error = ref([]);
let id = route.params.id;

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

const { replaceTargetObjects } = usePage();
const GetNews = async (id) => {
    try {
        const response = await HTTP.get(`/news/${id}`, {transformRequest: (headers) => {
            delete HTTP.defaults.headers.common['Authorization'];
        }});
        news.value = response.data;
    } catch (error) {
        console.log('errr', error);
        error.value = error.response.data;
    }
};

watch(
    () => route.params.id,

    async (newId, oldId) => {
        if (!newId || route.name !== 'page') return;
        await GetNews(newId);
        await replaceTargetObjects([news.value]);
    },
    {
        immediate: true,
    },
);

watch(route.path, () => {
    console.log('route');
    toggleHideBreadcrumbs(true);
    setHideBreadcrumbs(false);
});

onMounted(() => {
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
    news.value = [];
    GetNews();
});
</script>
<style scoped>
.news-banner {
    display: flex;
    column-gap: 20px;
    margin-bottom: 60px;
}

.news-banner__img img {
    width: 590px;
    height: 420px;
    object-fit: cover;
    overflow: hidden;
    border-radius: 20px;
}

.news-banner__text {
    font-family: 'Nunito', sans-serif;
    color: #313131;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    height: 420px;
    align-self: center;
    position: relative;
}

.news-banner__text h3 {
    font-weight: 400;
    font-size: 32px;
    width: 590px;
}

.news-banner__text p {
    font-weight: 400;
    font-size: 16px;
}

.news-data {
    color: #818181;
    position: absolute;
    bottom: 0;
}

.news-description {
    margin-bottom: 60px;
    color: #313131;
}

.to-news-list {
    margin-bottom: 100px;
}

.to-news {
    color: #313131;
}
</style>

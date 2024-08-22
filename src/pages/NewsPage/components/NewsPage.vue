<template>
    <div class="container">
        <div class="news-page__container">
            <div class="news-banner">
                <div class="news-banner__text">
                    <h3>{{ news.title }}</h3>
                    <p>{{ news.description }}</p>
                    <span>{{ news.created_at }}</span>
                </div>
                <div class="news-banner__img">
                    <img :src="news.image" alt="" />
                </div>
            </div>
            <div class="news-description"></div>
            <router-link :to="{ name: 'news' }"></router-link>
        </div>
    </div>
</template>
<script setup>
import { HTTP } from '@app/http';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePage } from '@shared';
const news = ref({});
const route = useRoute();
const error = ref([]);
let id = route.params.id;

const { replaceTargetObjects } = usePage();
const GetNews = async (id) => {
    try {
        const response = await HTTP.get(`/news/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
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
</script>

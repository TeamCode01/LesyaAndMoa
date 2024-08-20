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
            <router-link :to="{ name: 'news-page-list' }"></router-link>
        </div>
    </div>
</template>
<script setup>
import { HTTP } from '@app/http';
import { ref } from 'vue';
const news = ref([]);
const error = ref([]);
const GetNews = async (id) => {
    try {
        const response = await HTTP.get(`/news/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        news.value = response.data.results;
        console.log(response.data);
    } catch (error) {
        console.log('errr', error);
        error.value = error.response.data;
        console.error('There was an error!', error);
    }
};
</script>

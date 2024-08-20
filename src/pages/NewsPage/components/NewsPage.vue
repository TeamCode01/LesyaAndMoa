<template>
    <div>Новость</div>
    <p>News</p>
</template>

<script setup>
 import { ref } from 'vue';
 import { useRoute } from 'vue-router';


 const route = useRoute();

 let id = route.params.id;
 console.log(id);
</script>

<style lang="scss">
</style>

<template>
  <div class="carousel-item">
    <img :src="item_data.img" alt="img" class="carousel-item__author-img"/>
    <div class="carousel-item__info">
      <p class="carousel-item__date">{{ item_data.date }}</p>
      <p class="text-small carousel-item__text">
        {{ item_data.name }}
      </p>
      <p class="text-small carousel-item__author-name">{{ item_data.author_name }}</p>
      <p class="text-small carousel-item__author-about">{{ item_data.author_about_top }}</p>
      <p class="text-small carousel-item__author-about">{{ item_data.author_about_bottom }}</p>
      <p>{{ item_data.id }}</p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  item_data: {
    type: Object,
    default: () => { },
  },
});

const emit = defineEmits(['click']);
</script>
<style lang="scss" scoped>
.carousel-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  img {
    max-width: 387px;
    height: 220px;

    @media (max-width: 1024px) {
      max-width: 300px;
      height: 220px;
    }
    @media (max-width: 568px) {
      max-width: 300px;
      height: 220px;
    }
  }

  &__author-img{
    @media (max-width: 568px) {
      object-fit: cover;
      min-width: 320px;
      min-height: 415px;
      border-radius: 20px;
    }
  }

  &__text {
    font-size: 16px;
    font-weight: 400;
    color: $text-primary;
    font-family: 'Nunito', sans-serif;
    max-width: 375px;
    text-align: left;

    @media (max-width: 1024px) {
      max-width: 300px;
    }
  }

  &__author-name {
    font-size: 20px;
    text-align: left;
  }

  &__author-about {
    width: 320px;
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
}
</style>
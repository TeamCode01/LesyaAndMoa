<template>
  <div class="block">
    <div class="wrapper">
      <div class="wrapper__carousel" :style="{ 'margin-left': '-' + (100 * currentIndex) + '%' }">
        <CarouselItem v-for="item in data" :key="item.id" :item_data="item">
        </CarouselItem>
      </div>
    </div>
    <img class="left" @click="prev" src="@app/assets/icons/arrow-left.svg" alt="left">
    <img class="right" @click="next" src="@app/assets/icons/icon-pink.svg" alt="right">
  </div>

</template>
<script setup>
import { CarouselItem } from '.';
import { ref, onMounted } from 'vue';
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  interval: {
    type: Number,
    default: 0
  }
});

const currentIndex = ref(0);

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }

}

const next = () => {
  if (currentIndex.value >= props.data.length - 3) {
    currentIndex.value = 0
  } else { currentIndex.value++ }

}


onMounted(() => {
  if (props.interval > 0) {
    setInterval(() => {
      next()
    }, props.interval)
  }
})
</script>
<style lang="scss" scoped>
.wrapper {
  max-width: 67%;
  overflow: hidden;
  margin: 0px auto;

  @media (max-width: 1024px) {
    max-width: 74%;
  }

  &__carousel {
    display: flex;
    column-gap: 20px;
    transition: all ease .5s;
  }
}

.block {
  position: relative;
}

.left {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 0;
}

.right {
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 20px;
}
</style>
<template>

  <img src="@app/assets/icons/gifTimer.gif" v-show="end == false">
  <!-- <p>{{ props.time }}</p> -->
  <img src="@app/assets/icons/endTimer.png" v-show="end == true" alt="timer">

</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { end } from '@entities/timer';
const props = defineProps({
  time: {
    type: Number,
    required: false
  }
})

// const end_time = computed(() => {
//   return end;
// })


// let end = ref(false);




// const timer = (time, message) => {
//   console.log('time', time)
//   setTimeout(() => {
//     console.log(message);
//     end.value = true;
//   }, time * 1000);
// }

// timer(props.time, 'finish');

// onMounted(() => {
//   timer(props.time, 'finish')
// })
</script>
<style lang="scss" scoped></style>
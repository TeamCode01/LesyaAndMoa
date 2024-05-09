<template>

    <div class="get-hourglass">
      <!-- <img v-if="props.time > 0" src="@app/assets/icons/timerrr.gif" alt="time"> -->
      <img src="@app/assets/icons/TimerIcon.svg" alt="time">
    </div>


</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  time: {
    type: String,
    required: true
  }
})

const timerDown = setInterval(() => {
  props.time--;
  if (props.time <= 0) {
    clearInterval(timerDown);
  }
}, 1000);

</script>
<style lang="scss" scoped>
.get-hourglass {
  position: absolute;
  top: 12%;
  left: 27%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

// .hour {

// }</style>
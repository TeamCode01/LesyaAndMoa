<template>
    <img src="@app/assets/icons/gifTimer.gif" v-show="end == false" />
    <img
        src="@app/assets/icons/endTimer.png"
        v-show="end == true"
        alt="timer"
    />
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
const props = defineProps({
    end: {
        type: Boolean,
        required: false,
    },
});
</script>
<style lang="scss" scoped></style>

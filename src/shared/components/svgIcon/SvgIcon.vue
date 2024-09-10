<template>
    <svg
        class="svg"
        :height="iconHeight"
        :width="iconWidth"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
    >
        <use
            :height="iconHeight"
            :width="iconWidth"
            :xlink:href="`${sprite}#${iconName}`"
        ></use>
    </svg>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { type IconName, defaultIconSizes } from './iconsDefinition';
import sprite from './sprite.svg';

const props = defineProps<{
    iconName: IconName;
    width?: number;
    height?: number;
    color?: string;
}>();

const defaultSize = computed(() => defaultIconSizes[props.iconName]);
const iconWidth = computed(() => props.width ?? defaultSize.value.width);
const iconHeight = computed(() => props.width ?? defaultSize.value.height);
const iconColor = computed(() => props.color ?? defaultSize.value.color);
</script>

<style scoped>
.svg {
    color: v-bind(iconColor);
}
</style>

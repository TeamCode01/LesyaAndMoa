<template>
    <div class="container-task" :style="{top: props.top + 'px', left: props.left + 'px'}" draggable="false">
        <slot name="task"></slot>
    </div>
</template>

<script setup>

const props = defineProps(['top', 'left'])

</script>

<style lang="scss" scoped>

.container-task{
    position: absolute;
    z-index: 4;
}

</style>
<template>
    <v-select
        class="form__select"
        :model-value="modelValue"
        @update:model-value="changeOption"
        :items="options"
        :placeholder="placeholder"
        item-title="name"
        item-value="name"
        v-if="props.sortsBoolean"
    >
        <template #selection="{ item }">
            <span>{{ item.raw.name }}</span>
        </template>

        <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :title="item?.raw?.name"></v-list-item>
        </template>
    </v-select>
    <v-select
        class="form__select sel"
        :model-value="modelValue"
        @update:model-value="changeOption"
        :items="options"
        :placeholder="placeholder"
        item-title="name"
        item-value="value"
        v-else
    >
        <template #selection="{ item }">
            <span>{{ item.raw.name }}</span>
        </template>

        <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :title="item?.raw?.name"></v-list-item>
        </template>
    </v-select>
</template>
<script setup>
const props = defineProps({
    modelValue: {
        type: String,
    },
    items: {
        type: Array,
        default: () => [],
    },
    options: {
        type: Array,
        default: () => [],
    },
    selected: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    sortsBoolean: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(['update:modelValue']);

const changeOption = (event) => {
    emit('update:modelValue', event);
};
</script>
<style lang="scss" scoped></style>

<template>
    <button
        :class="[
            'btn',
            `btn_${color}`,
            { btn_rounded: rounded },
            { btn_outlined: outlined },
            { btn_large: size === 'large' },
        ]"
        :disabled="disabled"
        @click="clickOnButton"
    >
        <span>{{ label }}</span>
    </button>
</template>
<script setup>
import { ref, computed } from 'vue';

const res = ref();

const props = defineProps({
    label: {
        type: String,
        default: 'Button',
    },
    color: {
        type: String,
        default: 'primary',
    },
    disabled: {
        type: Boolean,
        required: false,
    },
    rounded: {
        type: Boolean,
        required: false,
    },
    outlined: {
        type: Boolean,
        required: false,
    },
    size: {
        type: String,
        default: 'normal',
    },
});

const emit = defineEmits(['click']);

const clickOnButton = () => {
    emit('click');
};
</script>
<style lang="scss" scoped>
.btn {
    display: block;
    // height: 52px;
    box-shadow: none;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
    font-family: "Nunito", sans-serif;
    transition: 0.2s;
    text-align: center;
    text-transform: none;
    &_primary {
        background: $button-primary;
        color: $layout;
        height: 51px;
    }
    &_second {
        background: $button-secondary;
        color: $layout;
        font-size: 20px;
        font-weight: 600;
    }
    &_info {
        background: $layout;
        color: $black;
        font-size: 20px;
        font-weight: 600;
        padding: 8px 24px;
        height: 43px;
    }
    &:disabled {
        opacity: 0.6;
        cursor: default;
    }
    &_outlined {
        background: transparent;
        color: #000;
        &:hover {
            color: #fff;
        }
    }
    &_large {
        padding: 16px 32px;
    }
}
</style>

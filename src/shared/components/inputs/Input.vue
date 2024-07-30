<template>
    <div class="form-input" :style="{ width: width }">
        <input
            :type="type"
            :name="name"
            :value="value"
            :id="name"
            :placeholder="placeholder"
            :maxlength="maxLength"
            max="9999-12-31"
            class="mb-2"
            @input="updateValue"
            v-bind="$attrs"
        />
    </div>
</template>

<script setup>
defineOptions({
    inheritAttrs: false,
});

const emit = defineEmits(['update:value']);
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        required: false,
    },
    width: {
        type: String,
        default: '',
    },
    maxLength: {
        type: Number,
    },
    value: {
        type: String,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const updateValue = (event) => {
    emit('update:value', event.target.value);
};
</script>
<style lang="scss" scoped>
input {
    font: normal;
}
input:focus {
    outline: none;
}
.form-input {
    padding: 12px 0 !important;
}
.form-input input {
    text-indent: 20px;
    font-size: 16px;
    width: 100%;
    padding: 12px 18px;
    border-radius: 10px;
    border: none;
    font-family: 'Nunito', sans-serif;
    background-color: white;
}

.form-input input::placeholder {
    font-size: 16px;
    font-family: 'Nunito', sans-serif;
}
</style>

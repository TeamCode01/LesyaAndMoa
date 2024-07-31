<template>
    <div class="form-input" :style="{ width: width }">
        <input
            :type="inputType"
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

        <img
            v-if="inputType === 'password'"
            @click="togglePassword"
            class="password-control"
            src="@app/assets/icons/eye-hidden.svg"
        />
        <img
            v-if="inputType === 'text'"
            @click="togglePassword"
            class="password-control"
            src="@app/assets/icons/eye-show.svg"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
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
const inputType = ref('password');

function togglePassword() {
    inputType.value = inputType.value === 'password' ? 'text' : 'password';
}
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
    position: relative;
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
.password-control {
    position: absolute;
    right: 7%;
    top: 35%;
}
</style>

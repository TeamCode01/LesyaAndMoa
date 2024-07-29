<template>
    <div class="text-center">
        <v-dialog v-model="dialog" max-width="505">
            <template v-slot:activator="{ props: activatorProps }">
                <div
                    class="text-none font-weight-regular"
                    prepend-icon="mdi-account"
                    variant="tonal"
                    v-bind="activatorProps"
                >
                    <span>{{ label }}</span>
                </div>
            </template>
            <div class="close icon-closed">
                <img
                    @click="closeDialog"
                    class="close-icon"
                    src="@app/assets/icons/icon-close.svg"
                    alt="крест"
                />
            </div>
            <slot></slot>
        </v-dialog>
    </div>
</template>

<script setup>
import { shallowRef } from 'vue';

const dialog = shallowRef(false);
const props = defineProps({
    label: {
        type: String,
        default: 'Button',
    },
});

const closeDialog = () => {
    dialog.value = false;
};
</script>
<style>
.icon-closed {
    position: absolute;
    z-index: 1;
    right: 10%;
    top: 10px;
}
</style>

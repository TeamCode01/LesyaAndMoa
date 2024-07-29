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
</script>
<style></style>

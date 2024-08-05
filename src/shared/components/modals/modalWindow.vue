<template>
    <div class="pa-4 text-center">
        <v-dialog v-model="dialog" max-width="505">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                    class="text-none font-weight-regular"
                    prepend-icon="mdi-account"
                    variant="tonal"
                    v-bind="activatorProps"
                    ><span>{{ label }}</span></v-btn
                >
            </template>
            <div class="close icon-close">
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
.v-dialog .v-overlay__content {
    scrollbar-width: none;
    scrollbar-color: #fae6f2 #fae6f2;
}
.v-dialog .v-overlay__content .v-card {
    border-radius: 20px;
    background: #fae6f2;
}
.v-dialog > .v-overlay__content > .v-card > .v-card-item + .v-card-text {
    padding: 0 60px;
}
.v-overlay__scrim {
    background: #818181;
    opacity: 0.8;
}
.v-card-item .v-card-title {
    font-size: 32px;
    font-family: 'Nunito', sans-serif;
}
.v-btn.v-btn--density-default {
    height: 58px;
    width: 390px;
    border: 3px solid #4d65e5;
    background-color: white;
    border-radius: 30px;
}
.v-btn--variant-tonal .v-btn__underlay {
    background: white;
}
.v-btn__content {
    color: black;
    font-size: 20px;
    font-weight: 600;
    font-family: 'Nunito', sans-serif;
    letter-spacing: 0.3px;
}
.v-btn__prepend {
    display: none;
}
.v-dialog > .v-overlay__content > .v-card > .v-card-actions {
    justify-content: center;
}
.icon-close {
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 10px;
}
</style>

<template>
    <div class="RegWrapper">
        <div class="container">
            <RegistrationForm></RegistrationForm>
        </div>
    </div>
</template>
<script setup lang="ts">
import { RegistrationForm } from '@features/Registration/components';
</script>
<style lang="scss" scoped>
.RegWrapper {
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(/assets/img/auth/background.png);
}
.container {
    margin: 0 auto;
    padding: 0 120px;
    max-width: 1440px;
}
</style>

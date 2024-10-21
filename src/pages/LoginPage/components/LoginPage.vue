<template>
    <div class="AuthWrapper">
        <div class="container">
            <LoginForm></LoginForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LoginForm } from '@features/Authorization/AuthorizationWithEmail/components';
</script>

<style lang="scss" scoped>
.AuthWrapper {
    background-size: 100%;
    background-repeat: repeat-y;
    background-image: url(/assets/img/auth/background.png);
}
.container {
    margin: 0 auto;
    padding: 0 120px;
    max-width: 1440px;
}
</style>

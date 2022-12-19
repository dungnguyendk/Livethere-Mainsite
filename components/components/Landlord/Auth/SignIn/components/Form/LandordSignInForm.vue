<template lang="html">
    <div class="signin__form">
        <h3 class="form__title"> Login </h3>
        <form class="form__input">
            <div>
                <label>Email Address</label>
                <v-text-field required outlined dense placeholder="Type here"> </v-text-field>
            </div>
            <div>
                <label>Password</label>
                <v-text-field required outlined type="password" dense placeholder="Type here">
                </v-text-field>
            </div>
            <div class="form__link">
                <NuxtLink class="form__link--forgot-link" to="/forgot-password"
                    >Forgot password</NuxtLink
                >
            </div>

            <button>Login</button>
        </form>
        <!-- End Login form -->
    </div>
</template>

<script>
export default {
    name: "LandordSignInForm"
}
</script>
<style lang="scss" scoped>
.signin__form {
    padding-top: 8.2rem;
    font-family: var(--font-primary);
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #171717;
    max-width: 375px;
    margin-left: auto;
    margin-right: auto;
    h3 {
        margin-bottom: 0;
    }
    .form__title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        font-family: var(--font-primary);
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        color: #171717;
    }
    .form__input {
        font-family: var(--font-primary);
        font-style: normal;
        font-size: 16px;
        line-height: 20px;
        label {
            padding-bottom: 0.3rem;
            font-weight: 500;
            color: #737373;
        }
        button {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--color-menu);
            color: var(--color-white);
            text-align: center;
            padding: 1rem 0;
            border-radius: 8px;
            font-weight: 700;
        }
    }
    .form__link {
        padding-bottom: 3.4rem;
        .form__link--forgot-link {
            font-weight: 700;
            text-decoration-line: underline;
            color: var(--color-menu);
        }
    }
    :deep(.v-input) {
        input {
            padding: 1rem 0 1rem 0.4rem;
            font-weight: 500;
            color: #171717;
        }
    }
}
@media (max-width: 768px) {
    .signin__form {
        max-width: 350;
    }
}
</style>

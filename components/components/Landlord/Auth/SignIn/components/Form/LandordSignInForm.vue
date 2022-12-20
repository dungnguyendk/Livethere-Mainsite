<template lang="html">
    <div class="signin__form">
        <h3 class="form__title"> Login </h3>
        <form class="form__input">
            <div>
                <label>Email Address</label>
                <v-text-field
                    placeholder="Type here"
                    @keydown.space.prevent
                    v-model="email"
                    :rules="rules.email"
                    outlined
                    dense
                >
                </v-text-field>
            </div>
            <div>
                <label>Password</label>
                <v-text-field
                    v-model="password"
                    type="password"
                    placeholder="Type here"
                    :rules="rules.password"
                    dense
                    outlined
                >
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
    name: "LandordSignInForm",
    data() {
        return {
            email: "",
            password: "",
            rules: {
                email: [(val) => (val || "").length > 0 || "This field is required"],
                password: [(val) => (val || "").length > 0 || "This field is required"]
            }
        }
    }
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
            background: var(--color-menu);
            width: 100%;
            color: var(--color-white);
            text-align: center;
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            padding: 1rem 0;
            border-radius: 8px;
            font-weight: 700;
            font-family: var(--font-primary);
            font-style: normal;
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
            margin-bottom: 0;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            color: #171717;
        }
    }
}
@media (max-width: 768px) {
    .signin__form {
        max-width: 33rem;
    }
}
@media (max-width: 768px) {
    .signin__form {
        max-width: 30rem;
    }
}
</style>

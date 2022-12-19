<template lang="html">
    <div class="form__forgot-password">
        <h3 class="form__title"> Forgot Password </h3>
        <div class="form__instruction">
            <p> Enter your registered email below to receive password reset instruction. </p>
        </div>

        <form class="form__input">
            <div>
                <label>Email Address</label>
                <v-text-field required outlined dense placeholder="Type here"> </v-text-field>
            </div>
            <div class="form__button">
                <button>Send</button>
            </div>

            <div class="form__link">
                <NuxtLink class="form__link--forgot-link" to="/sign-in"> Back to login</NuxtLink>
            </div>
        </form>
        <!-- End Login form -->
    </div>
</template>

<script>
export default {
    name: "LandordForgotPasswordForm"
}
</script>
<style lang="scss" scoped>
.form__forgot-password {
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
    .form__instruction {
        padding-top: 3rem;
        padding-bottom: 2.4rem;
        p {
            font-family: var(--font-primary);
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            text-align: center;
            color: #171717;
            margin-bottom: 0;
        }
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
    }
    .form__button {
        padding-top: 1.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
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
        padding-top: 3.4rem;
        display: flex;
        justify-content: center;
        .form__link--forgot-link {
            font-weight: 700;
            text-decoration-line: underline;
            color: var(--color-menu);
        }
    }
    //deep
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
@media (max-width: 390px) {
    .form__forgot-password {
        max-width: 330;
    }
}
</style>

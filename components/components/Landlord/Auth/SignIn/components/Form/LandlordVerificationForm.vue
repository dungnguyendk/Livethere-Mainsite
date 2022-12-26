<template lang="html">
    <div class="form--otp">
        <h3 class="form__title"> SMS VERIFICATION </h3>
        <div class="form__instruction">
            <p> Email OTP had been sent. Please retrieved the One Time Password and key-in here </p>
        </div>
        <div class="form__input">
            <v-otp-input
                length="4"
                type="number"
                v-model="otp"
                :disabled="loading"
                @finish="onFinish"
            ></v-otp-input>
            <v-overlay absolute :value="loading">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-overlay>
        </div>
        <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="2000">
            {{ text }}
        </v-snackbar>
        <div class="form__button">
            <v-btn>Submit</v-btn>
        </div>

        <div class="form__link">
            <p>Didn't receive code? <NuxtLink to="/landlord/signin"> Back to login</NuxtLink></p>
        </div>
        <!-- End Login form -->
    </div>
</template>

<script>
export default {
    name: "LandordForgotPasswordForm",
    data: () => ({
        loading: false,
        snackbar: false,
        snackbarColor: "default",
        otp: "",
        text: "",
        expectedOtp: "2006"
    }),
    methods: {
        onFinish(rsp) {
            /* this.loading = true
            setTimeout(() => {
                this.loading = false
                this.snackbarColor = rsp === this.expectedOtp ? "success" : "warning"
                this.text = `Processed OTP with "${rsp}" (${this.snackbarColor})`
                this.snackbar = true
            }, 3500)*/
        }
    }
}
</script>
<style lang="scss" scoped>
.form--otp {
    padding-top: 8.2rem;
    font-family: var(--font-primary);
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: var(--color-title-black);
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
        color: var(--color-title-black);
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
            color: var(--color-title-black);
            margin-bottom: 0;
        }
    }
    .form__input {
        width: 22.8rem;
        margin-left: auto;
        margin-right: auto;
        font-family: var(--font-primary);
        font-style: normal;
        font-weight: 700;
        padding-bottom: 4.4rem;
    }
    .form__button {
        display: flex;
        justify-content: center;
        align-items: center;
        button {
            background: var(--color-menu);
            width: 100%;
            color: var(--color-white);
            text-align: center;
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
        p {
            margin: 0;
            font-size: 16px;
        }
        a {
            font-weight: 700;
            text-decoration-line: underline;
            color: var(--color-menu);
            margin-bottom: 0;
        }
    }
}
@media (max-width: 768px) {
    .form--otp {
        max-width: 33rem;
    }
}
@media (max-width: 390px) {
    .form--otp {
        max-width: 30rem;
    }
}
</style>

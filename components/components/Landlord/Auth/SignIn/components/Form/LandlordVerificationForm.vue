<template lang="html">
    <div class="form--otp">
        <h3 class="form__title"> SMS VERIFICATION </h3>
        <div class="form__instruction">
            <p>
                SMS OTP had been sent. Please retrieved from your phone SMS message to get One Time
                Password
            </p>
        </div>
        <div class="form__input">
            <v-otp-input
                class="otp--custom"
                length="6"
                type="number"
                v-model="otp"
                :disabled="loading"
                @finish="onFinish"
                @input="onChangeOtpInput"
            />
        </div>
        <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="2000">
            {{ text }}
        </v-snackbar>

        <p v-if="httpError !== ''" class="alert alert--red">
            {{ httpError }}
        </p>
        <div class="form__button">
            <v-btn
                class="btn btn--primary btn--green btn--submit"
                :loading="loading"
                @click="handleSignIn"
            >
                Submit
            </v-btn>
        </div>

        <div class="form__link">
            <p>
                Didn't receive code?
                <a
                    href="#"
                    @click.prevent="handleResendOtp"
                    :class="`btn--resend-otp ${countdown !== 0 ? 'disabled' : ''}`"
                >
                    OTP Again
                </a>
            </p>
            <p v-if="countdown !== 0" class="ml-2">
                <span> 0:{{ countdown < 10 ? `0${countdown}` : countdown }}</span>
            </p>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"

export default {
    name: "LandlordVerificationForm",
    computed: {
        ...mapState({
            userID: (state) => state.user.userID
        })
    },
    data: () => ({
        loading: false,
        snackbar: false,
        snackbarColor: "default",
        otp: "",
        text: "",
        expectedOtp: "2006",
        inputOtp: "",
        httpError: "",
        countdown: 0,
        requestTime: 0
    }),
    methods: {
        handleCountDown() {
            const coundwnInterval = setInterval(
                function () {
                    if (this.countdown > 0) {
                        this.countdown--
                    }
                }.bind(this),
                1000
            )
            if (this.countdown === 0) {
                clearInterval(coundwnInterval)
            }
            this.countdown = 15
        },

        onFinish(inputText) {
            this.inputOtp = inputText
        },

        onChangeOtpInput() {
            this.loading = false
            this.httpError = ""
        },

        handleResendOtp() {
            this.countdown = 15
            this.$store.dispatch("app/showSnackBar", "New OTP has been sent!")
            this.httpError = ""
            this.requestTime = this.requestTime + 1
            this.handleCountDown()
        },

        async handleSignIn() {
            if (this.inputOtp !== "" && this.inputOtp.length === 6) {
                this.loading = true
                const params = {
                    exchangeID: this.$route.query.token,
                    userID: this.userID,
                    otp: this.inputOtp,
                    clientIPAddress: "192.168.1.1",
                    clientUserAgent:
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
                    timeZone: "8"
                }

                const response = await this.$auth.loginWith("local", {
                    data: params
                })
                this.loading = false
                if (response && response.data) {
                    this.otp = ""
                    if (response.data.valid) {
                        const { jwtToken } = response.data
                        if (jwtToken) {
                            await this.$store.dispatch("app/showSnackBar", "Login successful!")
                            window.location.href = "/landlord"
                        } else {
                            this.httpError = "The credentials is invalid. Please try again."
                        }
                    } else {
                        this.httpError = response.data.message
                            ? response.data.message
                            : "The opt is invalid. Please try again."
                    }
                } else {
                    this.httpError = "The credentials is incorrect. Please try again."
                }
            } else {
                this.httpError = "Please enter a valid OTP (6 digits)."
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.otp--custom {
    &::v-deep(.v-input--is-dirty) {
        .v-input__control {
            fieldset {
                border-color: var(--color-yellow) !important;
            }

            input {
                font-size: 1.6rem;
                font-weight: 700;
                color: var(--color-yellow) !important;
            }
        }
    }
}

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

        .btn--resend-otp {
            &.disabled {
                color: var(--color-text) !important;
                cursor: default;
                text-decoration: none !important;
            }
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

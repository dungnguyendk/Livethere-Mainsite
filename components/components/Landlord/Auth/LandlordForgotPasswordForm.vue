<template lang="html">
    <form class="form--forgot" @submit.prevent>
        <div class="form__top">
            <h3 class="form__title"> Forgot password?</h3>
            <p class="form__subtitle">
                Enter the email address associated with your account and we'll send you a link to
                reset your password
            </p>
        </div>
        <div v-if="!success" class="form__fields">
            <p v-if="httpError !== '' && !loading" class="alert alert--red">
                {{ httpError }}
            </p>

            <div class="form__field">
                <label class="required">Email address</label>
                <v-text-field
                    v-model="email"
                    type="email"
                    outlined
                    dense
                    @input="onInputField"
                    :error-messages="emailErrors"
                />
            </div>
        </div>
        <div v-else class="form__success">
            <p class="alert alert--blue alert--success">
                Your request to reset password has been sent. Please check your email.
            </p>
        </div>

        <div v-if="!success" class="form__actions">
            <v-btn v-if="" class="btn btn--primary btn--green" @click="onSubmit" :loading="loading">
                Send request
            </v-btn>
            <nuxt-link to="/landlord/signin"> Back</nuxt-link>
        </div>
        <div v-if="success" class="form__actions">
            <v-btn v-if="" class="btn btn--outline btn--green" @click="onBackToSignIn()">
                Back to sign in
            </v-btn>
        </div>
    </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required, email } from "vuelidate/lib/validators"
import { httpEndpoint } from "~/services/https/endpoints"

export default {
    name: "LandlordForgotPasswordForm",
    mixins: [validationMixin],
    validations: {
        email: {
            required,
            email
        }
    },
    props: {
        otp: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        emailErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.required && errors.push("Email is required.")
            !this.$v.email.email && errors.push("Please enter a valid email address.")
            return errors
        }
    },

    data() {
        return {
            email: "",
            httpError: "",
            loading: false,
            success: false
        }
    },
    methods: {
        onBackToSignIn() {
            this.$router.push("/landlord/signin")
        },

        onInputField() {
            this.httpError = ""
        },

        async onSendRequestChangPassword() {
            this.loading = true
            const params = {
                email: this.email,
                ipAddress: "192.168.1.1",
                userAgent: window.navigator.userAgent
            }
            try {
                const response = await this.$axios.$post(
                    httpEndpoint.auth.requestResetPassword,
                    params
                )

                if (response) {
                    if (response.valid) {
                        this.httpError = ""
                        this.success = true
                        await this.$store.dispatch(
                            "app/showSnackBar",
                            "Send request to reset password successfully."
                        )
                        setTimeout(() => {
                            this.loading = false
                        }, 1200)
                    } else {
                        this.httpError = response.message
                        setTimeout(() => {
                            this.loading = false
                        }, 1200)
                    }
                } else {
                    this.httpError = response.data.message
                    setTimeout(() => {
                        this.loading = false
                    }, 1200)
                }
            } catch (e) {
                this.httpError = e.message
            }
        },

        onResetForm() {},

        async onLogout() {
            await this.$auth.logout().then(() => {
                window.location.href = "/landlord/signin"
            })
        },

        async onSubmit() {
            this.$v.$touch()
            try {
                this.httpError = ""
                if (!this.$v.$invalid) {
                    await this.onSendRequestChangPassword()
                }
            } catch (e) {
                console.log({ Error: e.message })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.alert--success {
    font-weight: 600;
    text-align: center;
    line-height: 1.4em;
}
.form--forgot {
    padding-top: 8.2rem;
    font-family: var(--font-primary);
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: var(--color-heading);
    max-width: 375px;
    margin-left: auto;
    margin-right: auto;
    .form__top {
        padding-bottom: 2.4rem;

        p {
            margin-top: 0.4rem;
            text-align: center;
            line-height: 1.4em;
        }
    }
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
        color: var(--color-heading);
    }

    .form__field {
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
            color: var(--color-white);
            text-align: center;
            font-size: 16px;
            line-height: 20px;
            padding: 1rem 0;
            border-radius: 8px;
            font-weight: 700;
            font-family: var(--font-primary);
            font-style: normal;
            background: var(--color-menu);
        }
    }

    .form__fields {
        padding-top: 2.4rem;
    }

    .form__link {
        padding-bottom: 3.4rem;

        a {
            font-weight: 700;
            text-decoration-line: underline;
            color: var(--color-menu);
        }
    }

    .form__actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: column wrap;
        grid-gap: 1.2rem;
        gap: 1.2rem;

        .btn {
            width: 100%;
        }
    }

    :deep(.v-input) {
        input {
            margin-bottom: 0;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            color: var(--color-heading);
        }
    }
}
</style>

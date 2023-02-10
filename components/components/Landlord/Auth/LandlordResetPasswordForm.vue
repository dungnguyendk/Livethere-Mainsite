<template lang="html">
    <form class="form--landlord form--signin form--reset-password">
        <div class="form__top"><h3 class="form__title"> Reset password </h3></div>
        <p v-if="httpError !== '' && !loading" class="alert alert--red">
            {{ httpError }}
        </p>

        <template v-if="!success">
            <div class="form__fields">
                <div v-if="" class="form__field">
                    <label class="required">New password</label>
                    <v-text-field
                        v-model="password"
                        type="password"
                        outlined
                        dense
                        :error-messages="passwordErrors"
                    />
                </div>
                <div class="form__field">
                    <label class="required">Confirm password</label>
                    <v-text-field
                        v-model="confirmPassword"
                        type="password"
                        outlined
                        dense
                        :error-messages="confirmPasswordErrors"
                    />
                </div>
            </div>

            <div class="form__actions">
                <v-btn class="btn btn--primary btn--green" @click="onSubmit" :loading="loading">
                    Reset your password
                </v-btn>
                <nuxt-link to="/landlord/signin"> Back</nuxt-link>
            </div>
        </template>
        <template v-else>
            <div class="form__success-message">
                <p class="alert alert--primary alert--message">Your password has been changed. </p>
                <v-btn
                    class="btn btn--outline btn--green mt-2 btn--fullwidth"
                    @click="onSubmit"
                    :loading="loading"
                >
                    Back to sign in
                </v-btn>
            </div>
        </template>
    </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { helpers, required, sameAs } from "vuelidate/lib/validators"
import { httpEndpoint } from "~/services/https/endpoints"

const complexity = helpers.regex(
    "complexity",
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
)
export default {
    name: "LandlordResetPasswordForm",
    mixins: [validationMixin],
    validations: {
        password: {
            required,
            complexity
        },
        confirmPassword: {
            required,
            sameAsPassword: sameAs("password")
        }
    },
    props: {
        otp: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push("This field is required.")
            !this.$v.password.complexity &&
                errors.push(
                    "Password needs: at least 8 characters, 1 uppercase character, 1 number and 1 special character"
                )
        },
        confirmPasswordErrors() {
            const errors = []
            if (!this.$v.confirmPassword.$dirty) return errors
            !this.$v.confirmPassword.required && errors.push("This field is required.")
            !this.$v.confirmPassword.sameAsPassword && errors.push("Passwords do not match.")
            return errors
        }
    },

    data() {
        return {
            password: "Test@123",
            confirmPassword: "Test@123",
            httpError: "",
            loading: false,
            isTokenValid: false,
            exchangeID: "",
            success: false
        }
    },

    methods: {
        onBack() {
            this.$router.push("/landlord/signin")
        },

        async checkValidToken() {
            try {
                const params = {
                    token: this.$route.query.token && decodeURIComponent(this.$route.query.token)
                }
                const response = await this.$axios.$post(
                    httpEndpoint.auth.checkValidResetToken,
                    params
                )
                if (response) {
                    if (response.valid) {
                        this.isTokenValid = true
                        this.exchangeID = response.exchangeID
                        return true
                    } else {
                        this.httpError = "Your request is invalid or expired."
                        return false
                    }
                } else {
                    this.httpError = "Invalid token"
                    return false
                }
            } catch (e) {
                this.httpError = "Something went wrong, please try again."
                return false
            }
        },

        async onResetPassword() {
            this.loading = true
            const params = {
                exchangeID: this.exchangeID,
                newPassword: this.password
            }
            console.log({ params })

            try {
                const response = await this.$axios.$post(httpEndpoint.auth.resetPassword, params)

                if (response) {
                    if (response.valid) {
                        this.httpError = ""
                        await this.$store.dispatch("app/showSnackBar", "Reset password successful.")
                        setTimeout(() => {
                            this.loading = false
                        }, 1200)
                        await this.$router.push("/landlord/signin")
                    } else {
                        this.httpError = response.message
                        setTimeout(() => {
                            this.loading = false
                        }, 1200)
                    }
                } else {
                    this.httpError = response.data.message
                }
            } catch (e) {
                this.httpError = "Something went wrong, please try again."
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
                    await this.checkValidToken().then((response) => {
                        if (response) {
                            this.onResetPassword()
                        }
                    })
                }
            } catch (e) {
                console.log({ Error: e.message })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.form--reset-password {
    .form__success-message {
        .btn {
            width: 100%;
        }
    }
}
.form--signin {
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

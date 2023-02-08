<template lang="html">
    <form class="form--signin">
        <h3 class="form__title"> Change password </h3>
        <div class="form__fields">
            <p v-if="httpError !== ''" class="alert alert--red">
                {{ httpError }}
            </p>

            <div class="form__field">
                <label class="required">Password</label>
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
                    :error-messages="passwordErrors"
                />
            </div>
        </div>

        <div class="form__actions">
            <v-btn class="btn btn--primary btn--green" @click="onSubmit">Login</v-btn>
        </div>
    </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators"
import { setFormControlErrors } from "~/ultilities/form-validations"
import { httpEndpoint } from "~/services/https/endpoints"

export default {
    name: "LandlordChangePasswordForm",
    mixins: [validationMixin],
    validations: {
        email: {
            required
        },
        password: {
            required
        },
        confirmPassword: {
            required
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
            return setFormControlErrors(this.$v.email, "This field is required")
        },

        passwordErrors() {
            return setFormControlErrors(this.$v.password, "This field is required")
        }
    },

    data() {
        return {
            email: "",
            password: "",
            confirmPassword: "",
            httpError: ""
        }
    },
    methods: {
        async signInWithoutOtp() {
            const params = {
                username: this.email, //"tester",
                password: this.password, //"tester@123",
                clientIPAddress: "11",
                clientUserAgent: "11",
                timeZone: "8"
            }
            const response = await this.$auth.loginWith("local", {
                data: params
            })

            if (response) {
                if (response.data) {
                    const { jwtToken } = response.data
                    if (jwtToken) {
                        window.location.href = "/landlord"
                    } else {
                        this.httpError = "The credentials is invalid. Please try again."
                    }
                } else {
                    this.httpError = "The credentials is incorrect. Please try again."
                }
            } else {
                this.httpError = "The credentials is incorrect. Please try again."
            }
        },
        async signInWithOtp() {
            const params = {
                username: this.email, //"tester",
                password: this.password //"tester@123"
            }
            const response = await this.$axios.$post(httpEndpoint.auth.otpSignIn, params)
            if (response && response.valid) {
                this.$store.commit("user/setUserID", response.userID)
                await this.$router.push(`/landlord/signin/verify-otp?token=${response.exchangeID}`)
            }
            /*if (response) {
                if (response.data) {
                    const { jwtToken } = response.data
                    if (jwtToken) {
                        window.location.href = "/landlord"
                    } else {
                        this.httpError = "The credentials is invalid. Please try again."
                    }
                } else {
                    this.httpError = "The credentials is incorrect. Please try again."
                }
            } else {
                this.httpError = "The credentials is incorrect. Please try again."
            }*/
        },
        async onSubmit() {
            this.$v.$touch()
            try {
                this.httpError = ""
                if (!this.$v.$invalid) {
                    if (this.otp) {
                        await this.signInWithOtp()
                    } else {
                        await this.signInWithoutOtp()
                    }
                } else {
                }
            } catch (e) {
                console.log({ Error: e.message })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
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

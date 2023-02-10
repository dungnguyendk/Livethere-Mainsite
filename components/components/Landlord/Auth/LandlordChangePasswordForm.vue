<template lang="html">
    <form class="form--signin">
        <h3 class="form__title"> Change password </h3>
        <div class="form__fields">
            <p v-if="httpError !== '' || !loading" class="alert alert--red">
                {{ httpError }}
            </p>

            <div class="form__field">
                <label class="required">Current Password</label>
                <v-text-field
                    v-model="oldPassword"
                    type="password"
                    outlined
                    dense
                    @input="onInputField"
                    :error-messages="oldPasswordErrors"
                />
            </div>
            <div class="form__field">
                <label class="required">Password</label>
                <v-text-field
                    v-model="password"
                    type="password"
                    outlined
                    dense
                    @input="onInputField"
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
                    @input="onInputField"
                    :error-messages="confirmPasswordErrors"
                />
            </div>
        </div>

        <div class="form__actions">
            <v-btn class="btn btn--primary btn--green" @click="onSubmit" :loading="loading">
                Change password
            </v-btn>
            <nuxt-link to="/landlord"> Back</nuxt-link>
        </div>
    </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { helpers, not, required, sameAs } from "vuelidate/lib/validators"
import { httpEndpoint } from "~/services/https/endpoints"

const complexity = helpers.regex(
    "complexity",
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
)

export default {
    name: "LandlordChangePasswordForm",
    mixins: [validationMixin],
    validations: {
        oldPassword: {
            required
        },
        password: {
            required,
            complexity,
            notSameOldPassword: not(sameAs("oldPassword"))
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
        oldPasswordErrors() {
            const errors = []
            if (!this.$v.oldPassword.$dirty) return errors
            !this.$v.oldPassword.required && errors.push("This field is required.")
            return errors
        },
        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push("This field is required.")
            !this.$v.password.complexity &&
                errors.push(
                    "Password needs: at least 8 characters, 1 uppercase character, 1 number and 1 special character"
                )
            !this.$v.password.notSameOldPassword &&
                errors.push("New password must be different from old password.")
            return errors
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
            email: "",
            oldPassword: "",
            password: "",
            confirmPassword: "",
            httpError: "",
            loading: false
        }
    },
    methods: {
        onInputField() {
            this.httpError = ""
        },
        async onChangePassword() {
            this.loading = true
            const params = {
                oldPassword: this.oldPassword,
                newPassword: this.password
            }
            const response = await this.$axios.$put(httpEndpoint.user.changePassword, params)

            if (response) {
                if (response.valid) {
                    this.httpError = ""
                    await this.$store.dispatch("app/showSnackBar", "Change password successful.")
                    setTimeout(() => {
                        this.loading = false
                    }, 1200)
                    await this.onLogout()
                } else {
                    this.httpError = response.message
                    setTimeout(() => {
                        this.loading = false
                    }, 1200)
                }
            } else {
                this.httpError = response.data.message
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
                    await this.onChangePassword()
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

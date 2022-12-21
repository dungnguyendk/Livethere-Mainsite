<template lang="html">
    <form class="form--signin">
        <h3 class="form__title"> Login </h3>
        <div class="form__fields">
            <div class="form__field">
                <label>Email Address</label>
                <v-text-field v-model="email" :error-messages="emailErrors" outlined dense />
            </div>
            <div class="form__field">
                <label>Password</label>
                <v-text-field v-model="password" outlined dense :error-messages="passwordErrors" />
            </div>
        </div>
        <div class="form__link">
            <NuxtLink to="/forgot-password"> Forgot password</NuxtLink>
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

export default {
    name: "LandordSignInForm",
    mixins: [validationMixin],
    validations: {
        email: {
            required
        },
        password: {
            required
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
            password: ""
        }
    },
    methods: {
        onSubmit() {
            this.$v.$touch()
            try {
                if (!this.$v.$invalid) {
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

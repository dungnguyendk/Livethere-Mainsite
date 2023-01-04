<template lang="html">
    <form class="form--register" @submit.prevent="onSubmit">
        <div v-if="errorMessages.length > 0" class="form__top">
            <p v-for="item in errorMessages" class="alert alert--red">{{ item }}</p>
        </div>
        <div class="form__fields">
            <div class="form--register__input">
                <label>Preferred Username</label>
                <v-text-field
                    v-model.trim="username"
                    outlined
                    dense
                    placeholder="Type here"
                    :error-messages="usernameErrors"
                    @input="$v.username.$touch()"
                    @blur="$v.username.$touch()"
                />
            </div>
            <div class="form--register__input">
                <label>Contact name</label>
                <v-text-field v-model.trim="contactName" outlined dense />
            </div>
            <div class="form--register__input2">
                <div class="form--register__input">
                    <label>Password</label>
                    <v-text-field
                        v-model.trim="password"
                        outlined
                        dense
                        placeholder="Type here"
                        type="password"
                        :error-messages="passwordErrors"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                    />
                </div>
                <div class="form--register__input">
                    <label>Verified Password</label>
                    <v-text-field
                        v-model.trim="verifiedPassword"
                        outlined
                        dense
                        placeholder="Type here"
                        type="password"
                        :error-messages="verifiedPasswordErrors"
                        @input="$v.verifiedPassword.$touch()"
                        @blur="$v.verifiedPassword.$touch()"
                    />
                </div>
            </div>
            <div class="form--register__input2">
                <div class="form--register__input">
                    <label>Email Address</label>
                    <v-text-field
                        v-model.trim="email"
                        outlined
                        dense
                        placeholder="Type here"
                        :error-messages="emailErrors"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                    />
                </div>
                <div class="form--register__input mobile-form-control">
                    <label>Mobile No.</label>
                    <vue-tel-input-vuetify
                        outlined
                        dense
                        v-bind="bindProps"
                        v-model.trim="phone"
                        label=""
                        clearable
                        defaultCountry="SG"
                        autocomplete="off"
                        :disabledFetchingCountry="true"
                        placeholder="+65 00000000"
                        v-on:country-changed="countryChanged"
                        :error-messages="phoneErrors"
                        @input="$v.phone.$touch()"
                        @blur="$v.phone.$touch()"
                    />
                </div>
            </div>
        </div>
        <v-checkbox
            label="I agree with the Landlord Portal Terms of Use"
            color="#EDB842"
            hide-details
        />
        <div class="form--action">
            <div class="btn-group">
                <v-btn class="btn btn--primary btn--green btn__add-file" type="submit">
                    Submit
                </v-btn>
            </div>
        </div>
        <SuccessSnackBar :open="snackBarMessage !== ''" :message="snackBarMessage" />
    </form>
</template>
<script>
import { validationMixin } from "vuelidate"
import { required, email, sameAs } from "vuelidate/lib/validators"
import { httpEndpoint } from "~/services/https/endpoints"
import SuccessSnackBar from "~/components/shared/Snackbar/SuccessSnackBar.vue"

export default {
    name: "LandlordRegisterForm",
    components: { SuccessSnackBar },
    mixins: [validationMixin],
    validations: {
        username: { required },
        password: { required },
        verifiedPassword: {
            required,
            sameAsPassword: sameAs("password")
        },
        email: { required, email },
        phone: { required }
    },
    computed: {
        usernameErrors() {
            const errors = []
            if (!this.$v.username.$dirty) return errors
            !this.$v.username.required && errors.push("Preferred Username is required")
            return errors
        },
        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push("Password is required")
            return errors
        },
        verifiedPasswordErrors() {
            const errors = []
            if (!this.$v.verifiedPassword.$dirty) return errors
            !this.$v.verifiedPassword.required && errors.push("Verified Password is required")
            !this.$v.verifiedPassword.sameAsPassword && errors.push("Passwords must be identical.")
            return errors
        },
        emailErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.required && errors.push("Email Address is required")
            !this.$v.email.email && errors.push("Email Address is valid")
            return errors
        },
        phoneErrors() {
            const errors = []
            if (!this.$v.phone.$dirty) return errors
            !this.$v.phone.required && errors.push("Phone No is required")
            return errors
        }
    },
    data() {
        return {
            username: "test",
            contactname: "test",
            password: "1",
            verifiedPassword: "1",
            email: "",
            phone: null,
            countryCode: null,
            country: null,
            errorMessages: [],
            snackBarMessage: "",
            bindProps: {
                mode: "international",
                required: false,
                enabledCountryCode: true,
                enabledFlags: true,
                autocomplete: "off",
                name: "telephone",
                maxLen: 25,
                inputOptions: {
                    showDialCode: true
                }
            }
        }
    },

    methods: {
        countryChanged(country) {
            this.country = "+" + country.dialCode
        },
        async checkEmail(payload) {
            const response = await this.$axios.$get(
                `${httpEndpoint.auth.checkEmail}?email=${payload}`,
                email
            )
            if (response) {
                const message = "This email is exist. Please use another email!"
                if (!response.valid) {
                    this.errorMessages = [...this.errorMessages, message]
                } else {
                    this.errorMessages = this.errorMessages.find((item) => item !== message)
                }
            }
        },
        async checkContactNo(payload) {
            const response = await this.$axios.$get(
                `${httpEndpoint.auth.checkPhoneNumber}?contactNo=${payload}`,
                email
            )
            if (response) {
                const message = "This phone number is exist. Please use another phone number!"
                if (!response.valid) {
                    this.errorMessages = [...this.errorMessages, message]
                } else {
                    this.errorMessages = this.errorMessages.find((item) => item !== message)
                }
            }
        },
        async checkUsername(payload) {
            const response = await this.$axios.$get(
                `${httpEndpoint.auth.checkPhoneNumber}?userName=${payload}`,
                email
            )
            if (response) {
                const message = "This username is exist. Please use another username!"
                if (!response.valid) {
                    this.errorMessages = [...this.errorMessages, message]
                } else {
                    this.errorMessages = this.errorMessages.find((item) => item !== message)
                }
            }
        },

        async onSubmit() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const actualPhone = `${this.country} ${this.phone.replace(this.country, "")}`
                const params = {
                    username: this.username,
                    contactName: this.contactName,
                    email: this.email,
                    password: this.password,
                    mobile: actualPhone,
                    exchangeID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    createType: "LANDLORD"
                }
                await this.checkEmail(this.email)
                await this.checkContactNo(actualPhone)
                await this.username(this.username)
                if (this.errorMessages.length === 0) {
                    const response = await this.$axios.$post(httpEndpoint.auth.register, params)

                    if (response) {
                        console.log({ registerResponse: response })
                        this.snackBarMessage = "Submit registration successfully!"
                        setTimeout(() => {
                            this.snackBarMessage = ""
                        }, 2000)
                    }
                }
            } else {
                /*this.onClose()*/
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.form--register {
    &__input {
        label {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2rem;
            color: var(--color-label);
        }
    }

    &__input2 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;
    }
}

.form--action {
    text-align: center;

    .btn-group {
        width: 17.5rem;
        margin: 3.2rem 0;
    }
}
</style>
<style lang="scss">
.form--register__input {
    > div {
        grid-gap: 0.4rem;
        gap: 0.4rem;
    }
}
</style>

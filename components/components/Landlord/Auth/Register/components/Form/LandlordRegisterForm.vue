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
                <v-text-field v-model="contactName" outlined dense />
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
        <div class="form--action">
            <div class="btn-group">
                <v-btn class="btn btn--primary btn--green" type="submit" :loading="loading">
                    Submit
                </v-btn>
            </div>
        </div>
        <SuccessSnackBar :open="snackBarMessage !== ''" :message="snackBarMessage" />
    </form>
</template>
<script>
import { validationMixin } from "vuelidate"
import { email, helpers, minLength, required, sameAs } from "vuelidate/lib/validators"
import { httpEndpoint } from "~/services/https/endpoints"
import SuccessSnackBar from "~/components/shared/Snackbar/SuccessSnackBar.vue"

const complexity = helpers.regex(
    "complexity",
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
)

export default {
    name: "LandlordRegisterForm",
    components: { SuccessSnackBar },
    mixins: [validationMixin],
    validations: {
        username: { required, minLength: minLength(6) },
        password: { required, complexity },
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
            !this.$v.username.minLength && errors.push("Preferred Username at least 6 characters")
            return errors
        },
        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push("Password is required")
            !this.$v.password.complexity &&
                errors.push(
                    "Password needs: at least 8 characters, 1 uppercase character, 1 number and 1 special character"
                )
            return errors
        },
        verifiedPasswordErrors() {
            const errors = []
            if (!this.$v.verifiedPassword.$dirty) return errors
            !this.$v.verifiedPassword.required && errors.push("Verified Password is required")
            !this.$v.verifiedPassword.sameAsPassword &&
                errors.push("Verified password must match the password.")
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
    // write function has regex have to +65 and 8 digits

    data() {
        return {
            username: "",
            contactName: "",
            password: "",
            verifiedPassword: "",
            email: "",
            phone: null,
            countryCode: null,
            country: null,
            errorMessages: [],
            snackBarMessage: "",
            loading: false,
            bindProps: {
                mode: "international",
                required: false,
                enabledCountryCode: true,
                enabledFlags: true,
                autocomplete: "off",
                name: "telephone",
                maxLen: 25,
                onlyCountries: ["SG"],
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
        assignErrorMessage(message) {
            this.errorMessages = !this.errorMessages.includes(message)
                ? [...this.errorMessages, message]
                : [...this.errorMessages]
        },

        async checkEmail(payload) {
            const response = await this.$axios.$get(
                `${httpEndpoint.auth.checkEmail}?email=${payload}`,
                email
            )
            if (response) {
                const message = "This email is exist. Please use another email!"
                if (!response.valid) {
                    this.assignErrorMessage(message)
                } else {
                    this.errorMessages = this.errorMessages.filter((item) => item !== message)
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
                    this.assignErrorMessage(message)
                } else {
                    this.errorMessages = this.errorMessages.filter((item) => item !== message)
                }
            }
        },
        async checkUsername(payload) {
            const response = await this.$axios.$get(
                `${httpEndpoint.auth.checkUsername}?userName=${payload}`,
                email
            )
            if (response) {
                const message = "This username is exist. Please use another username!"
                if (!response.valid) {
                    this.assignErrorMessage(message)
                } else {
                    this.errorMessages = this.errorMessages.filter((item) => item !== message)
                }
            }
        },
        resetForm() {
            this.$v.$reset()
        },

        // save register data
        async saveRegisterData() {
            try {
                this.loading = true
                const actualPhone = `${this.country} ${this.phone.replace(this.country, "")}`
                await this.checkEmail(this.email)
                await this.checkContactNo(actualPhone)
                await this.checkUsername(this.username)
                if (this.errorMessages.length === 0) {
                    try {
                        const params = {
                            username: this.username,
                            contactName: this.contactName,
                            email: this.email,
                            password: this.password,
                            mobile: actualPhone,
                            otp: "",
                            createType: "LANDLORD"
                        }

                        const response = await this.$axios.$post(
                            httpEndpoint.auth.registerSendOTP,
                            {
                                mobileNo: actualPhone
                            }
                        )
                        if (response) {
                            this.loading = false
                            if (response.valid) {
                                await this.$store.commit("user/setRegisterDetails", params)
                                await this.$router.push("/landlord/register/verify")
                            } else {
                                this.errorMessages = [
                                    response.message
                                        ? response.message
                                        : "Something when wrong. Please try again."
                                ]
                            }
                        } else {
                            this.loading = false
                            this.errorMessages = ["Something when wrong. Please try again."]
                        }
                    } catch (e) {
                        this.loading = false
                        console.log({ Errror: e.message })
                    }
                } else {
                    this.loading = false
                }
            } catch (e) {
                console.log({ Error: e.message })
            }
        },

        onSubmit() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.saveRegisterData()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.form--register {
    max-width: 78rem;

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

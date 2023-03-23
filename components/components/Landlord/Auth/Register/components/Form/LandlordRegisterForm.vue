<template lang="html">
    <form class="form--register" @submit.prevent="onSubmit">
        <div v-if="errorMessages.length > 0" class="form__top">
            <p v-for="item in errorMessages" class="alert alert--red">{{ item }}</p>
        </div>
        <div class="form__fields">
            <div class="form--register__input">
                <label class="required">Preferred Username</label>
                <v-text-field
                    v-model.trim="username"
                    outlined
                    dense
                    placeholder="Type here"
                    :error-messages="usernameErrors"
                />
            </div>
            <div class="form--register__input">
                <label class="required">Contact name</label>
                <v-text-field
                    v-model="contactName"
                    outlined
                    dense
                    :error-messages="contactNameErrors"
                />
            </div>
            <div class="form--register__input2">
                <div class="form--register__input">
                    <label class="required">Password</label>
                    <v-text-field
                        v-model.trim="password"
                        outlined
                        dense
                        placeholder="Type here"
                        type="password"
                        :error-messages="passwordErrors"
                    />
                </div>
                <div class="form--register__input">
                    <label class="required">Verified Password</label>
                    <v-text-field
                        v-model.trim="verifiedPassword"
                        outlined
                        dense
                        placeholder="Type here"
                        type="password"
                        :error-messages="verifiedPasswordErrors"
                    />
                </div>
            </div>
            <div class="form--register__input2">
                <div class="form--register__input">
                    <label class="required">Email Address</label>
                    <v-text-field
                        v-model.trim="email"
                        outlined
                        dense
                        placeholder="Type here"
                        :error-messages="emailErrors"
                    />
                </div>
                <div class="form--register__input mobile-form-control">
                    <label>
                        Mobile No.
                        <span class="required"></span>
                        <span class="form__note">
                            (Mobile No. is required to sent OTP for each login.)
                        </span>
                    </label>
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
            <!--            <v-btn v-if="onDevelopment" class="btn btn&#45;&#45;outline btn&#45;&#45;blue" @click="autoFillForm">
                            Auto fill (Development only)
                        </v-btn>-->
        </div>

        <SuccessSnackBar :open="snackBarMessage !== ''" :message="snackBarMessage" />
    </form>
</template>
<script>
import { validationMixin } from "vuelidate"
import { email, helpers, minLength, required, sameAs } from "vuelidate/lib/validators"
import { httpEndpoint } from "~/services/https/endpoints"
import SuccessSnackBar from "~/components/shared/Snackbar/SuccessSnackBar.vue"
import {
    MESSAGE_EMAIL_EXISTS,
    MESSAGE_INVALID_EMAIL,
    MESSAGE_INVALID_SINGAPORE_PHONE_NUMBER,
    MESSAGE_PHONE_EXISTS,
    MESSAGE_REQUIRED_EMAIL,
    MESSAGE_REQUIRED_PHONE_NUMBER,
    MESSAGE_SERVER_ERROR,
    MESSAGE_USERNAME_EXISTS
} from "~/ultilities/error-messages"
import { CURRENT_ENV } from "~/app-settings"

import { faker } from "@faker-js/faker"

const complexity = helpers.regex(
    "complexity",
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
)
const userNameRule = helpers.regex("userNameRule", /^[a-zA-Z0-9]+$/)

const singaporePhoneNumber = helpers.regex("singaporePhoneNumber", /^\+65 \d{4}( ?\d{4})$/)

export default {
    name: "LandlordRegisterForm",
    components: { SuccessSnackBar },
    mixins: [validationMixin],
    validations: {
        username: { required, minLength: minLength(6), userNameRule },
        password: { required, complexity },
        verifiedPassword: {
            required,
            sameAsPassword: sameAs("password")
        },
        email: { required, email },
        contactName: { required },
        phone: { required, singaporePhoneNumber }
    },
    computed: {
        onDevelopment: () => CURRENT_ENV === "develop",
        usernameErrors() {
            const errors = []
            if (!this.$v.username.$dirty) return errors
            !this.$v.username.required && errors.push("Preferred Username is required")
            !this.$v.username.minLength && errors.push("Preferred Username at least 6 characters")
            !this.$v.username.userNameRule &&
                errors.push("Invalid Username: contains special character(s)")
            return errors
        },
        contactNameErrors() {
            const errors = []
            if (!this.$v.contactName.$dirty) return errors
            if (!this.$v.contactName.required) errors.push("Contact name is required")
            return errors
        },
        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push("Password is required")
            !this.$v.password.complexity &&
                errors.push(
                    "Password must contains at least 8 characters, 1 uppercase character, 1 number and 1 special character"
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
            !this.$v.email.required && errors.push(MESSAGE_REQUIRED_EMAIL)
            !this.$v.email.email && errors.push(MESSAGE_INVALID_EMAIL)
            return errors
        },
        phoneErrors() {
            const errors = []
            if (!this.$v.phone.$dirty) return errors
            !this.$v.phone.required && errors.push(MESSAGE_REQUIRED_PHONE_NUMBER)
            !this.$v.phone.singaporePhoneNumber &&
                errors.push(MESSAGE_INVALID_SINGAPORE_PHONE_NUMBER)
            return errors
        }
    },

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
                enabledCountryCode: false,
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
        autoFillForm() {
            this.username = faker.name.firstName().toLowerCase()
            this.contactName = faker.name.findName()
            this.email = "minhnghia.luong@asiaesolutions.com"
            this.phone = "+65 81008399"
            this.password = "Test@123"
            this.verifiedPassword = "Test@123"
            this.otp = ""
        },

        countryChanged(country) {
            this.country = "+" + country.dialCode
        },
        assignErrorMessage(message) {
            this.errorMessages = !this.errorMessages.includes(message)
                ? [...this.errorMessages, message]
                : [...this.errorMessages]
        },

        async checkEmail(payload) {
            try {
                const response = await this.$axios.$get(
                    `${httpEndpoint.auth.checkEmail}?email=${payload}`,
                    email
                )
                if (response) {
                    const message = MESSAGE_EMAIL_EXISTS
                    if (!response.valid) {
                        this.assignErrorMessage(message)
                    } else {
                        this.errorMessages = this.errorMessages.filter((item) => item !== message)
                    }
                }
            } catch (e) {
                this.assignErrorMessage(MESSAGE_SERVER_ERROR)
            }
        },
        async checkContactNo(payload) {
            try {
                const response = await this.$axios.$get(
                    `${httpEndpoint.auth.checkPhoneNumber}?contactNo=${payload}`,
                    email
                )
                if (response) {
                    const message = MESSAGE_PHONE_EXISTS
                    if (!response.valid) {
                        this.assignErrorMessage(MESSAGE_PHONE_EXISTS)
                    } else {
                        this.errorMessages = this.errorMessages.filter((item) => item !== message)
                    }
                }
            } catch (e) {
                this.assignErrorMessage(MESSAGE_SERVER_ERROR)
            }
        },
        async checkUsername(payload) {
            try {
                const response = await this.$axios.$get(
                    `${httpEndpoint.auth.checkUsername}?userName=${payload}`,
                    email
                )
                if (response) {
                    const message = MESSAGE_USERNAME_EXISTS
                    if (!response.valid) {
                        this.assignErrorMessage(message)
                    } else {
                        this.errorMessages = this.errorMessages.filter((item) => item !== message)
                    }
                }
            } catch (e) {
                this.assignErrorMessage(MESSAGE_SERVER_ERROR)
            }
        },
        resetForm() {
            this.$v.$reset()
        },

        // save register data
        async saveRegisterData() {
            try {
                this.loading = true
                const actualPhone = `${this.country} ${this.phone
                    .replace(this.country, "")
                    .replace(/ /g, "")}`
                await this.checkEmail(this.email)
                await this.checkContactNo(actualPhone.replace(/^\+/, ""))
                await this.checkUsername(this.username)
                if (this.errorMessages.length === 0) {
                    try {
                        const params = {
                            username: this.username,
                            contactName: this.contactName,
                            email: this.email,
                            password: this.password,
                            mobile: actualPhone.replace(/^\+/, ""),
                            otp: "",
                            createType: "LANDLORD"
                        }

                        const response = await this.$axios.$post(
                            httpEndpoint.auth.registerSendOTP,
                            {
                                mobileNo: actualPhone.replace(/^\+/, ""),
                                email: this.email
                            }
                        )
                        if (response) {
                            this.loading = false
                            if (response.valid) {
                                await this.$store.commit("user/setRegisterDetails", params)
                                await this.$router.push("/register/verify")
                            } else {
                                this.errorMessages = [
                                    response.message ? response.message : MESSAGE_SERVER_ERROR
                                ]
                            }
                        } else {
                            this.loading = false
                            this.errorMessages = [MESSAGE_SERVER_ERROR]
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
                this.errorMessages = []
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

    @media screen and (max-width: 767px) {
        &__input2 {
            grid-template-columns: minmax(0, 1fr);
        }
    }
}

.form--action {
    text-align: center;

    .btn-group {
        width: 17.5rem;
        margin: 3.2rem auto;
    }
}

.mobile-form-control {
    .form__note {
        position: relative;
        font-size: 1.1rem;
        color: var(--color-text);
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

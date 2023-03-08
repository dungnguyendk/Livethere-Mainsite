<template>
    <form class="form--contact--services " @submit.prevent="onFormSubmit">
        <div class="form__top">
            <h3>Connect With Us</h3>
        </div>
        <div class="form__fields">
            <v-row>
                <v-col cols="6" sm="12" md="6">
                    <label>Full name</label>
                    <v-text-field
                        v-model="name"
                        outlined
                        dense
                        hide-details
                        :error-messages="nameErrors"
                    />
                </v-col>
                <v-col cols="6" sm="12" md="6">
                    <label>country</label>
                    <v-select
                        v-model="country"
                        :items="countries"
                        item-text="countryName"
                        item-value="countryName"
                        outlined
                        required
                        hide-details
                        dense
                    />
                </v-col>
                <v-col cols="6" sm="12" md="6">
                    <label>phone number</label>
                    <vue-tel-input-vuetify
                        v-model.trim="phone"
                        :error-messages="phoneErrors"
                        outlined
                        dense
                        v-bind="bindProps"
                        label=""
                        clearable
                        defaultCountry="SG"
                        autocomplete="off"
                        :disabledFetchingCountry="true"
                        placeholder="+65"
                        v-on:country-changed="countryChanged"
                        class="form__field-tel-input-custom"
                    />
                </v-col>
                <v-col cols="6" sm="12" md="6">
                    <label>email</label>
                    <v-text-field outlined dense v-model="email" :error-messages="emailErrors">
                    </v-text-field>
                </v-col>
                <v-col cols="6" sm="12" md="6">
                    <label>Enquiry Type</label>
                    <v-select
                        v-model="enquiryType"
                        :items="enquiryListing"
                        placeholder="Please select"
                        outlined
                        required
                        hide-details
                        dense
                    />
                </v-col>

                <v-col cols="6" sm="12" md="6">
                    <label>Your Message</label>
                    <v-text-field
                        v-model="message"
                        outlined
                        dense
                        hide-details
                        :error-messages="nameErrors"
                    />
                </v-col>
            </v-row>

            <div class="form__actions">
                <v-btn class="btn btn--primary btn--green btn--sm"> Submit </v-btn>
                <v-btn class="btn btn--ghost btn--green btn--sm" @click="onClose()"> Cancel</v-btn>
            </div>
            <div class="form__footer">
                <p> Privacy Guarantee </p>
            </div>
        </div>
    </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required, helpers, email } from "vuelidate/lib/validators"
import { countries } from "~/ultilities/country"
import { setFormControlErrors } from "~/ultilities/form-validations"
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
const singaporePhoneNumber = helpers.regex("singaporePhoneNumber", /^\+65 \d{4}( ?\d{4})$/)
export default {
    name: "ConnectFormServices",
    mixins: [validationMixin],
    validations: {
        name: {
            required
        },
        phone: {
            required,
            singaporePhoneNumber
        },
        email: {
            required,
            email
        },
        message: {
            required
        }
    },
    data() {
        return {
            name: "",
            phone: null,
            country: "SINGAPORE",
            countries: countries,
            errorMessages: [],
            loading: false,
            message: "",
            email: "",
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
            },
            enquiryType: "",
            snackbar: false,
            enquiryListing: [
                {
                    text: " I am looking for rental properties"
                },
                {
                    text: "I have a question to rental"
                },
                {
                    text: "I want to speak to a consultant"
                },
                {
                    text: "I want market updates on the  rental trends in singapore"
                },
                {
                    text: "I am looking for to move  to singapore soon"
                }
            ]
        }
    },

    computed: {
        nameErrors() {
            return setFormControlErrors(this.$v.name, "Name Required")
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
        },
        messageErrors() {
            return setFormControlErrors(this.$v.message, "Message Required")
        }
    },

    methods: {
        countryChanged(country) {
            this.country = "+" + country.dialCode
        },
        onFormSubmit() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const params = {
                    name: this.name,
                    phone: this.phone,
                    email: this.email,
                    message: this.message
                }
                this.snackbar = true
            } else {
                console.log("fail !")
            }
        },
        onResetForm() {
            this.$v.$reset()
            ;(this.name = ""), (this.phone = ""), (this.email = ""), (this.message = "")
        },
        onClose() {
            this.$emit("close")
        }
    }
}
</script>

<style lang="scss" scoped>
.form--contact--services  {
    background-color: var(--color-white);

    margin-bottom: 2.4rem;
    .form__top {
        text-align: center;
        padding-bottom: 2.4rem;

        h3 {
            margin-bottom: 0;
            font-weight: 700;
            font-size: 2.4rem;
            line-height: 2.8rem;
            color: var(--color-title-black);
        }
    }
    .form__fields {
        padding: 0 2.4rem 2rem;
        .btn-custom {
            margin: 0 auto;
            display: block;
            ::v-deep(.v-btn__content) {
                font-size: 1.6rem !important;
            }
        }
    }
    .form__footer {
        display: flex;
        justify-content: center;
        padding-top: 5.6rem;
        p {
            padding-top: 1.6rem;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            color: var(--color-title-black);
        }
    }
    @media screen and (max-width: 767px) {
        margin-bottom: 2.7rem;
    }
}
.form__field-tel-input-custom {
    ::v-deep(.v-input__control) {
        margin-right: 0.4rem;
    }
}
.alert-custom {
    height: auto;
    margin-top: 1.2rem;
}
.snackbar-custom {
    ::v-deep(.v-snack__content) {
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2.4rem;
    }
}
.form__field {
    label {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2rem;
        color: var(--color-label);
        text-transform: capitalize;
        margin-bottom: 0.4rem;
    }
    ::v-deep(.v-input__control) {
        .v-input__slot {
            margin-bottom: 1rem;
        }
    }
    ::v-deep(.v-text-field__details) {
        padding-left: 0;
    }
}

::v-deep(.form__field-tel-input-custom) {
    .v-input__slot {
        margin-bottom: 0.4rem;
        border: none;
    }
}
.form__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-gap: 1.2rem;
    gap: 1.2rem;
    padding-top: 2.4rem;
    padding-bottom: 1.2rem;

    .btn {
        min-width: 12rem;
    }
}
</style>

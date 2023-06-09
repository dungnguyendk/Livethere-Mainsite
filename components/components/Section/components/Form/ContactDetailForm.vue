<template>
    <form class="form--contact-details" >
        <div class="form__fields">
            <div class="form__field">
                <label class="required">name</label>
                <v-text-field
                    outlined
                    dense
                    placeholder="Name"
                    v-model="name"
                    :error-messages="nameErrors"
                >
                </v-text-field>
            </div>
            <div class="form__field">
                <label class="required">phone number</label>
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
            </div>
            <div class="form__field">
                <label class="required">email</label>
                <v-text-field
                    outlined
                    dense
                    placeholder="Email"
                    v-model="email"
                    :error-messages="emailErrors"
                >
                </v-text-field>
            </div>
            <div class="form__field">
                <label class="required">message</label>
                <v-textarea
                    outlined
                    dense
                    height="120"
                    placeholder="Message"
                    :error-messages="messageErrors"
                    v-model="message"
                >
                </v-textarea>
            </div>
            <v-btn class="btn btn--primary btn--green btn-custom" :loading="loading"  @click="onFormSubmit"
                >Verify & continue</v-btn
            >
        </div>
    </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required, helpers, email } from "vuelidate/lib/validators"
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
const complexity = helpers.regex(
    "complexity",
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
)
const userNameRule = helpers.regex("userNameRule", /^[a-zA-Z0-9]+$/)
const singaporePhoneNumber = helpers.regex("singaporePhoneNumber", /^\+65 \d{4}( ?\d{4})$/)
export default {
    name: "ContactDetailForm",
    components: {  },
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
            countryCode: null,
            country: null,
            errorMessages: [],
            message: "",
            loading: false,
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
        }
    },
    computed: {
        nameErrors() {
            return setFormControlErrors(this.$v.name, "Name is Required")
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
            return setFormControlErrors(this.$v.message, "Message is Required")
        }
    },

    methods: {
        onClose() {
            this.$emit("close")
        },
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
                // this.$store.dispatch("project/contactDetails", params).then((res) => {
                    
                // })
                this.$store.dispatch(
                                "app/showSnackBar", "Thank you for your submission, our agent has notified and will be contacting you shortly."
                            )
                this.onResetForm()
                this.onClose()
            }
        },
        onResetForm() {
            this.$v.$reset()
            this.name = ""
            ;(this.phone = ""), (this.email = ""), (this.message = "")
        }
    }
}
</script>

<style lang="scss" scoped>
.form--contact-details {
}
.form__field {
    label {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2rem;
        color: var(--color-label);
        text-transform: capitalize;
        margin-bottom: 0.8rem;
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
.form__field-tel-input-custom {
    ::v-deep(.v-input__control) {
        margin-right: 0.4rem;
    }
}
.snackbar-custom {
    ::v-deep(.v-snack__content) {
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2.4rem;
    }
}
.btn-custom {
    display: inline-block;
    width: 100%;
    ::v-deep(.v-btn__content) {
        font-size: 1.6rem !important;
    }
}
</style>
<template>
    <form class="form-enquiry" @submit.prevent="onFormSubmit">
        <div class="form__top">
            <h3>enquiry form</h3>
            <p>* All fields are required</p>
        </div>
        <div class="form__fields">
            <div class="form__field">
                <label>name</label>
                <v-text-field 
                 outlined 
                 dense 
                 placeholder="Name *"
                 v-model="name"
                 :error-messages="nameErrors"
                > 
                </v-text-field>
            </div>
            <div class="form__field">
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
            </div>
            <div class="form__field">
                <label>email</label>
                <v-text-field 
                 outlined 
                 dense 
                 placeholder="Email *"
                 v-model="email"
                 :error-messages="emailErrors"
                > </v-text-field>
            </div>
            <div class="form__field">
                <label>message</label>
                <v-textarea 
                outlined 
                dense 
                height="120"
                :error-messages="messageErrors"
                v-model="message"
                > 
                </v-textarea>
            </div>
            <v-btn class="btn btn--primary btn--green btn-custom" type="submit" :loading="loading">Enquire Now</v-btn>
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
const singaporePhoneNumber = helpers.regex("singaporePhoneNumber", /^\+65 \d{4}( ?\d{4})$/)
export default {
    name: "EnquiryForm",
    mixins: [validationMixin],
    validations: {
        name: {
            required
        }, 
        phone: {
            required, 
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
            }
        }
    },

    computed: {
        nameErrors(){
            return setFormControlErrors(this.$v.name, "Name Required")
        }, 
        emailErrors(){
            const errors = []
            if(!this.$v.email.$dirty) return errors
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
        messageErrors(){
            return setFormControlErrors(this.$v.message, "Message Required")
        }
    },

    methods: {
        countryChanged(country) {
            this.country = "+" + country.dialCode
        }, 
        onFormSubmit(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                this.errorMessages = []
            }
        }, 
    }
}
</script>

<style lang="scss" scoped>
.form-enquiry {
    background-color: var(--color-white);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08);
    border-radius: 2rem;
    margin-bottom: 2.4rem;
    .form__top {
        padding: 1.7rem 2.4rem 0;
        h3 {
            font-weight: 700;
            font-size: 2rem;
            line-height: 2rem;
            color: #000000;
            text-transform: capitalize;
            margin-bottom: 1.2rem;
        }
        p {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: #ef4444;
            margin-bottom: 2rem;
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
    @media screen and (max-width: 767px) {
        margin-bottom: 2.7rem;
    }
}
.form__field-tel-input-custom{
    ::v-deep(.v-input__control){
        margin-right: 0.4rem;
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
    ::v-deep(.v-input__control){
        .v-input__slot{
            margin-bottom: 1rem;
        }
    }
    ::v-deep(.v-text-field__details){
        padding-left: 0;
    }
}

::v-deep(.form__field-tel-input-custom) {
    .v-input__slot {
        margin-bottom: 0.4rem;
        border: none;
    }
}
</style>
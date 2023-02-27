<template>
    <form 
     class="form--contact-details"
    
    >
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
                    v-model="phone"
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
                 > 
                </v-text-field>
            </div>
            <div class="form__field">
                <label>message</label>
                <v-textarea 
                 outlined 
                 dense 
                 height="120" 
                 placeholder="Message *"
                 :error-messages="messageErrors"
                > 
                </v-textarea>
            </div>
            <v-btn class="btn btn--primary btn--green btn-custom" @click="contactDetails()">Verify & continue</v-btn>
        </div>
    </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators"
import { setFormControlErrors } from "~/ultilities/form-validations"
export default {
    name: 'ContactDetailForm',
    validations: {
        name: {
            required
        }, 
        phone: {
            required
        }, 
        email: {
            required
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
        };
    },
    computed: {
        nameErrors(){
            return setFormControlErrors(this.$v.name, "Name Required")
        }, 
        phoneErrors(){
            return setFormControlErrors(this.$v.phone, "Phone Number Required")
        }, 
        emailErrors(){
            return setFormControlErrors(this.$v.email, "Email Required")
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
            this.loading = true
        }, 
        contactDetails(){
            this.onFormSubmit()
            this.$v.$touch()
        }
    }
};
</script>

<style lang="scss" scoped>
.form--contact-details{

}
.form__field {

    label {
        font-weight: 500;
        font-size: 2rem;
        line-height: 2rem;
        color: var(--color-label);
        text-transform: capitalize;
        margin-bottom: 0.8rem;
    }
}
.btn-custom{
    display: inline-block;
    width: 100%;
    ::v-deep(.v-btn__content){
        font-size: 2rem !important;
    }

}
</style>
<template>
    <form 
     class="form--confirm-details"
     @submit.prevent="onFormSubmit"
    >
        <div class="form__top">
            <h3>Confirm your details</h3>
            <p
                >*Please confirm your details before proceeding. Agents are more likely to respond
                to enquiries with contact details
            </p>
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
                ></v-text-field>
            </div>
            <div class="form__field">
                <label>phone number</label>
                <vue-tel-input-vuetify
                    v-model="phone"
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
                    :error-messages="phoneErrors"
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
            <v-btn class="btn btn--primary btn--green btn-custom" @click="confirmDetails()">Verify & continue</v-btn>
        </div>
    </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators"
import { setFormControlErrors } from "~/ultilities/form-validations"
export default {
    name: "LiveThereMainSiteConfirmDetailForm",
    mixins: [validationMixin],
    validations: {
        name: {
            required
        }, 
        phone: {
            required
        }, 
        email: {
            required
        }
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
        }
    },
    data() {
        return {
            name: "", 
            email: "", 
            phone: null,
            countryCode: null, 
            country: null, 
            errorMessages: [], 
            loading: false,
            bindProps: {
                mode: "international",
                required: false,
                enabledCountryCode: false,
                enabledFlags: true,
                autocomplete: "off",
                name: "telephone",
                onlyCountries: ["SG"],
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
        onFormSubmit(){
            this.loading = true
        }, 
        confirmDetails(){
            this.onFormSubmit()
            this.$v.$touch()
        }
    }
}
</script>

<style lang="scss" scoped>
.form--confirm-details {
    .form__top {
        h3 {
            font-weight: 700;
            font-size: 2.5rem;
            line-height: 2rem;
            color: #000000;
            text-transform: capitalize;
            margin-bottom: 2rem;
        }
        p {
            font-weight: 500;
            font-size: 2rem;
            line-height: 2.4rem;
            color: #ef4444;
            margin-bottom: 2rem;
        }
    }
    @media screen and (max-width: 412px) {
        .form__top {
            h3 {
                font-size: 2rem;
            }
            p {
                font-size: 1.5rem;
                text-align: justify;
            }
        }
    }
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
.v-text-field {
    ::v-deep(.v-input__control) {
        .v-text-field__details {
            // display: none;
        }
    }
}

.btn-custom {
    display: inline-block;
    width: 100%;
    ::v-deep(.v-btn__content) {
        font-size: 2rem !important;
    }
}
</style>
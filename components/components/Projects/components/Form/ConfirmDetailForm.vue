<template>
    <form class="form--confirm-details" @submit.prevent="onFormSubmit">
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
                    v-model.trim="phone"
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
                >
                </v-text-field>
            </div>
            <v-btn class="btn btn--primary btn--green btn-custom" type="submit" :loading="loading"
                >Verify & continue</v-btn
            >
            <SuccessSnackBar :open="snackbar" :message="messageSnackbar"/>
        </div>
    
    </form>
    
</template>

<script>
import SuccessSnackBar from "~/components/shared/Snackbar/SuccessSnackBar.vue"
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
import {mapState} from "vuex"
const complexity = helpers.regex(
    "complexity",
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
)
const singaporePhoneNumber = helpers.regex("singaporePhoneNumber", /^\+65 \d{4}( ?\d{4})$/)
export default {
    name: "ConfirmDetailForm",
    mixins: [validationMixin],
    components: {SuccessSnackBar},
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
        }
    },
    computed: {
        ...mapState({
            projectDetail: (state) => state.project.projectDetails
        }),

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
            }, 
            snackbar: false, 
            messageSnackbar: "",
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
                    phoneNumber: this.phone,
                    email: this.email,
                    message: "",
                    EnquiryType: 'WhatsappEnquiry',
                    pageUrl: window.location.href,
                    Country: '',
                    phoneCountry: this.country,
                    listingId: this.projectDetail.id
                }
                this.$store.dispatch("project/enquireUser", params).then((res)=>{
                    console.log(res)
                    if (res) {
                        window.open(
                            `https://api.whatsapp.com/send?phone=+65 ${this.projectDetail.primaryAgent.phoneNumber}
                            &text=Hey ${this.projectDetail.primaryAgent.businessName}!${params.message}, I Would like to check the availability for ${this.projectDetail.buildingName}, ${this.projectDetail.buildingAddress}
                            ,${window.location.href} Thank you! Regards ${params.name} ${params.email}`
                            ,'_blank')
                    }
                })
                this.onResetForm()
                this.$emit('onClose')
            }else{
                console.log("fail!")
            }
        }, 
        onResetForm(){
            this.$v.$reset()
            this.name = "", 
            this.phone = "", 
            this.email = ""
        }
    }
}
</script>

<style lang="scss" scoped>
.form--confirm-details {
    .form__top {
        h3 {
            font-weight: 700;
            font-size: 2.08rem;
            line-height: 2rem;
            color: #000000;
            text-transform: capitalize;
            margin-bottom: 2rem;
        }
        p {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: #ef4444;
            margin-bottom: 2rem;
        }
    }
    @media screen and (max-width: 412px) {
        .form__top {
            p {
                text-align: justify;
            }
        }
    }
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
    ::v-deep(.v-input__control){
        .v-input__slot{
            margin-bottom: 1rem;
        }
    }
    ::v-deep(.v-text-field__details){
        padding-left: 0;
    }
}
.form__field-tel-input-custom{
    ::v-deep(.v-input__control){
        margin-right: 0.4rem;
    }
}
.snackbar-custom{
    ::v-deep(.v-snack__content){
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
<template lang="html">
    <form @submit.prevent class="form--landing-contact">
        <div class="form__container">
            <div class="form__fields">
                <v-row>
                    <v-col cols="12" md="6">
                        <div class="form__field">
                            <label>Full name</label>
                            <v-text-field
                                v-model="name"
                                :error-messages="nameErrors"
                                @input="$v.name.$touch()"
                                outlined
                                dense
                            />
                        </div>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div class="form__field">
                            <label>Tels</label>
                            <v-text-field
                                v-model="phoneNumber"
                                :error-messages="phoneNumberErrors"
                                @input="$v.phoneNumber.$touch()"
                                outlined
                                dense
                            />
                        </div>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div class="form__field">
                            <label>Country</label>
                            <v-select
                                v-model="country"
                                :items="countries"
                                item-text="countryName"
                                item-value="countryName"
                                outlined
                                required
                                dense
                            />
                        </div>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div class="form__field">
                            <label>Email</label>
                            <v-text-field
                                v-model="email"
                                :error-messages="emailErrors"
                                @input="$v.email.$touch()"
                                outlined
                                dense
                            />
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <div class="form__field">
                            <label>Enquiry Type</label>
                            <v-select
                                v-model="enquiryType"
                                :items="enquiryListing"
                                :error-messages="enquiryErrors"
                                @input="$v.enquiryType.$touch()"
                                placeholder="Please select"
                                outlined
                                required
                                dense
                            />
                        </div>
                    </v-col>
                </v-row>
            </div>
            <div class="form__actions">
                <v-btn class="btn btn--primary btn--green" @click.prevent="onSubmit()">
                    I’m Interested
                </v-btn>
            </div>
            <v-snackbar v-model="snackbar" :timeout="2000" top right text color="green darken-4">
                <span class="message--snackBar">
                    <i class="ri-information-line" /> {{ snackbarMessage }}
                </span>
            </v-snackbar>
        </div>
    </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { setFormControlErrors } from "~/ultilities/form-validations"
import { required,email,helpers } from "vuelidate/lib/validators"
import { countries } from "~/ultilities/country"
import { httpEndpoint } from "~/services/https/endpoints"
import {
    MESSAGE_INVALID_EMAIL,
    MESSAGE_INVALID_SINGAPORE_PHONE_NUMBER,
    MESSAGE_REQUIRED_EMAIL,
    MESSAGE_REQUIRED_PHONE_NUMBER,
} from "~/ultilities/error-messages"
const singaporePhoneNumber = helpers.regex("singaporePhoneNumber", /^\+65 \d{4}( ?\d{4})$/)
export default {
    name: "LandingContactForm",
    mixins: [validationMixin],
    computed: {
        nameErrors() {
            return setFormControlErrors(this.$v.name, "Full name is required")
        },
        phoneNumberErrors() {
            const errors = []
            if (!this.$v.phoneNumber.$dirty) return errors
            !this.$v.phoneNumber.required && errors.push(MESSAGE_REQUIRED_PHONE_NUMBER)
            !this.$v.phoneNumber.singaporePhoneNumber &&
            errors.push(MESSAGE_INVALID_SINGAPORE_PHONE_NUMBER)
            return errors
        },

        emailErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.required && errors.push(MESSAGE_REQUIRED_EMAIL)
            !this.$v.email.email && errors.push(MESSAGE_INVALID_EMAIL)
            return errors
        },

        enquiryErrors() {
            return setFormControlErrors(this.$v.enquiryType, "Enquiry Type is required")
        }
    },

    validations() {
        return {
            name: { required },
            phoneNumber: { required, singaporePhoneNumber},
            email: { required,email },
            enquiryType: { required }
        }
    },

    data() {
        return {
            name: "",
            phoneNumber: "",
            email: "",
            country: "SINGAPORE",
            countries: countries,
            enquiryType: "",
            snackbar: false,
            snackbarMessage: "Your message has been sent.",
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
    methods: {
        async onSubmit() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                console.log("fail")
            } else {
                const params = {
                    fullname: this.name,
                    mobileNo: this.phoneNumber,
                    email: this.email,
                    enquiryType: this.enquiryType,
                    country: this.country,
                    pageUrl: window.location.href,
                    pageName: document.title,
                    MobileNoCountry: '+65',
                    message: "Help Me Find My Ideal Home",
                    source: "livethere"
                }
                try {
                    const response = await this.$landlordApi.$post(httpEndpoint.enquiry.sendEnquiry, params)
                    if (response.valid) {
                        this.snackbar = true
                        this.snackbarMessage = "Your message has been sent."
                        this.name = ""
                        this.email = ""
                        this.phoneNumber = ""
                        this.enquiryType = ""
                        this.country = "SINGAPORE"
                        this.$v.$reset()
                    } else {
                }
                } catch (e) {
                    console.log({ Error: e.message })
                    return false
                }
                
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.form--landing-contact {
    width: 100%;
    max-width: 94.4rem;
    background-color: #fff;
    border-radius: 1.6rem;
    box-shadow: 0 4px 14px rgba(0, 35, 73, 0.14);
    padding: 2.2rem 2.4rem 3.2rem;

    .form__field {
        label {
            font-weight: 700;
            font-size: 1.6rem;
            color: #828586;
        }
    }

    .form__fields {
    }

    .form__actions {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 2.8rem;
    }

    .form__container {
        max-width: 76.2rem;
        margin: 0 auto;

        .btn {
            min-width: 20rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>

<template lang="html">
    <div>
        <h4 class="form__title">{{ titleContact }}</h4>
        <form class="form__fields" @submit.prevent="onSubmit">
            <div class="form__field">
                <label>Full name</label>
                <v-text-field v-model.trim="name" outlined dense :error-messages="nameErrors" />
            </div>
            <div class="form__field">
                <label>Email</label>
                <v-text-field v-model.trim="email" outlined dense :error-messages="emailErrors" />
            </div>
            <div class="form__field">
                <label>Phone Number</label>
                <vue-tel-input-vuetify outlined dense v-bind="bindProps" v-model.trim="phoneNumber" label=""
                    defaultCountry="SG" autocomplete="off" :disabledFetchingCountry="true"
                    :error-messages="phoneNumberErrors" v-on:input="(number, data) => onInputPhoneNumber(number, data)" />
            </div>
            <div class="form__field">
                <label>Enquiry Type</label>
                <v-select v-model="enquiryType" outlined dense placeholder="Please select"
                    :items="isContactUs ? enquiryListing2 : enquiryListing" item-text="text"
                    :error-messages="enquiryTypeErrors" />
            </div>
            <div class="form__field">
                <label>Message</label>
                <v-textarea v-model="otherMessage" outlined dense rows="6" row-height="60"></v-textarea>
            </div>
            <div class="form__actions">
                <v-btn class="btn btn--primary btn--green" @click="onSubmit">
                    {{ loading ? "Sending..." : "Submit" }}
                </v-btn>
                <div class="form__field terms-policy">
                    <nuxt-link to="/terms-conditions">Terms and Conditions</nuxt-link> & <nuxt-link
                    to="/privacy-policy">Privacy Policy.</nuxt-link>
                </div>
            </div>
        </form>

    </div>
</template>
<script>
import { countries } from "~/ultilities/country"
import { validationMixin } from "vuelidate"
import { email, helpers, required } from "vuelidate/lib/validators"
import { setFormControlErrors } from "~/ultilities/form-validations"
import { httpEndpoint } from "~/services/https/endpoints"
import { LANDLORDS_SEO_URL } from "~/ultilities/seo-configs"
import { appSettings } from "~/app-settings"
import { MESSAGE_SERVER_ERROR } from "~/ultilities/error-messages"
const validPhoneNumber = helpers.regex("validPhoneNumber", /^\+(?:[0-9] ?){6,14}[0-9]$/)
export default {
    name: "ContactUsForm",
    mixins: [validationMixin],
    validations: {
        name: { required },
        email: { required, email },
        enquiryType: { required },
        phoneNumber: { required, validPhoneNumber }
    },
    props: {
        isContactUs: {
            type: Boolean,
            default: () => true
        },
        titleContact: {
            type: String,
            default: () => "Contact Us"
        }
    },
    computed: {
        nameErrors() {
            return setFormControlErrors(this.$v.name, "Full name is required")
        },
        emailErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.required && errors.push("Email is required.")
            !this.$v.email.email && errors.push("Email is invalid.")
            return errors
        },

        phoneNumberErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.phoneNumber.required && errors.push("Email is required.")
            !this.$v.phoneNumber.validPhoneNumber && errors.push("Phone number is invalid.")
            return errors
        },

        enquiryTypeErrors() {
            return setFormControlErrors(this.$v.enquiryType, "Enquiry Type is required")
        },
    },
    data() {
        return {
            name: "",
            email: "",
            country: "Singapore",
            phoneNumber: "",
            countries: countries,
            enquiryType: "",
            loading: false,
            otherMessage: "",
            sent: false,
            phoneNameCountry: "Singapore",
            bindProps: {
                mode: "international",
                required: false,
                enabledCountryCode: false,
                enabledFlags: true,
                autocomplete: "off",
                name: "telephone",
                maxLen: 25,
                inputOptions: {
                    showDialCode: true
                }
            },
            enquiryListing: [
                {
                    text: " I am looking to let my property"
                },
                {
                    text: "I want market updates on the latest rental rates"
                },
                {
                    text: "I want to speak to a consultant"
                },
                {
                    text: "I want to find out what my property is worth"
                },
                {
                    text: "Other, please specify"
                }
            ],
            enquiryListing2: [
                {
                    text: "Rent a property"
                },
                {
                    text: "Lease my property"
                }
            ],

        }
    },

    methods: {
        onInputPhoneNumber(number, data) {
            this.phoneNameCountry = data.country.name || "Singapore"
        },
        async handleSendMessage() {
            if (!this.loading) {
                this.sent = false
                this.loading = true
                try {
                    const params = {
                        fullname: this.name,
                        email: this.email,
                        mobileNo: this.phoneNumber,
                        mobileNoCountry: this.phoneNameCountry,
                        country: "Singapore",
                        source: appSettings.siteName,
                        pageUrl: LANDLORDS_SEO_URL,
                        pageName: appSettings.siteName,
                        enquiryType: this.enquiryType,
                        message: this.otherMessage ? this.otherMessage : ""
                    }

                    const response = await this.$axios.$post(
                        httpEndpoint.enquiry.sendEnquiry,
                        params
                    )
                    if (response) {
                        setTimeout(() => {
                            this.loading = false
                        }, 2500)
                        this.onClose()
                        if (response.valid) {
                            this.sent = true
                            await this.$store.dispatch(
                                "app/showSnackBar", "Thank you for your submission, our agent has notified and will be contacting you shortly."
                            )
                        } else {
                            await this.$store.dispatch("app/showSnackBar", response.message)
                        }
                    }
                    this.onResetForm()
                } catch (e) {
                    await this.$store.dispatch("app/showSnackBar", MESSAGE_SERVER_ERROR)
                    console.log({ Error: e.message })
                }
            }
        },
        onSubmit() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.handleSendMessage()
            }
        },
        onResetForm() {
            this.name = ""
            this.email = ""
            this.phoneNumber = ""
            this.enquiryType = ""
            this.phoneNameCountry = "Singapore"
            this.otherMessage = ""
            this.$v.$reset()
        },
        onClose() {
            this.$emit("close")
        },
    }
}
</script>
<style lang="scss" scoped>
h4 {
    margin-bottom: 1.6rem;
}

.form__title {
    color: var(--color-menu);
    font-weight: 800;
    font-size: 2rem;
    line-height: 2.8rem;
}

.form__field {
    position: relative;
    top: -1.2rem;
    margin-bottom: -1.2rem;

    &::v-deep(.v-text-field__details) {
        padding-left: 0;

        .v-messages__message {
            font-size: 1.3rem;
            line-height: 1.2em;
        }
    }

    &::v-deep(.vue-tel-input-vuetify) {
        display: flex;
        grid-gap: 0.4rem;
        gap: 0.4rem;
        color: var(--color-error);
    }
}

.form__fields {
    color: var(--color-label);
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2rem;
}

.form__actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .btn {
        width: 100%;
    }
}

.terms-policy {
    padding: 1.2rem 0;

    a {
        color: #00634f;
        font-weight: 700;
    }
}
</style>
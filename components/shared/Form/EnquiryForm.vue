<template lang="html">
    <div class="form--enquiry">
        <h4 class="form__title">Drop us a note. We’ll be in touch with you</h4>
        <form class="form__fields" @submit.prevent="onSubmit">
            <v-row>
                <v-col cols="6" cols-sm="12">
                    <div class="form__field">
                        <label>Full name</label>
                        <v-text-field
                            v-model.trim="name"
                            outlined
                            dense
                            :error-messages="nameErrors"
                        />
                    </div>
                </v-col>
                <v-col cols="6" cols-sm="12">
                    <div class="form__field">
                        <label>Email</label>
                        <v-text-field
                            v-model.trim="email"
                            outlined
                            dense
                            :error-messages="emailErrors"
                        />
                    </div>
                </v-col>
                <v-col cols="6" cols-sm="12">
                    <div class="form__field">
                        <label>Phone Number</label>
                        <vue-tel-input-vuetify
                            outlined
                            dense
                            v-bind="bindProps"
                            v-model.trim="phoneNumber"
                            label=""
                            defaultCountry="SG"
                            autocomplete="off"
                            :disabledFetchingCountry="true"
                            :error-messages="phoneNumberErrors"
                            v-on:input="(number, data) => onInputPhoneNumber(number, data)"
                        />
                    </div>
                </v-col>
                <v-col cols="6" cols-sm="12">
                    <div class="form__field">
                        <label>Country</label>
                        <v-text-field v-model="country" outlined dense disabled />
                    </div>
                </v-col>
                <v-col cols="12" cols-sm="12">
                    <div class="form__field">
                        <label>Enquiry Type </label>
                        <v-select
                            v-model="enquiryType"
                            outlined
                            dense
                            placeholder="Please select"
                            :items="enquiryListing"
                            item-text="text"
                            :error-messages="enquiryTypeErrors"
                        />
                    </div>
                </v-col>
                <v-col v-if="showOtherMessage" cols="12" cols-sm="12">
                    <div class="form__field">
                        <label>Please specify</label>
                        <v-text-field v-model="otherMessage" outlined dense />
                    </div>
                </v-col>
            </v-row>
        </form>
        <div class="form__actions">
            <v-btn class="btn btn--primary btn--green" @click="onSubmit">
                {{ loading ? "Sending..." : sent ? "Sent" : "Submit" }}
            </v-btn>
        </div>
    </div>
</template>

<script>
import { countries } from "~/ultilities/country"
import { validationMixin } from "vuelidate"
import { email, helpers, required } from "vuelidate/lib/validators"
import { setFormControlErrors } from "~/ultilities/form-validations"
import { LANDLORDS_SEO_URL } from "~/ultilities/seo-configs"
import { appSettings } from "~/app-settings"
import { MESSAGE_SERVER_ERROR } from "~/ultilities/error-messages"
import { httpEndpoint } from "~/services/https/endpoints"

const validPhoneNumber = helpers.regex("validPhoneNumber", /^\+(?:[0-9] ?){6,14}[0-9]$/)

export default {
    name: "EnquiryForm",
    mixins: [validationMixin],
    validations: {
        name: { required },
        email: { required, email },
        enquiryType: { required },
        phoneNumber: { required, validPhoneNumber }
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
            return setFormControlErrors(this.$v.enquiryType, "Enquiry type is required")
        },

        showOtherMessage() {
            return this.enquiryType === "Other, please specify"
        }
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
            ]
        }
    },

    methods: {
        onInputPhoneNumber(number, data) {
            console.log({ number, data })
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
                        message: this.showOtherMessage ? this.otherMessage : ""
                    }

                    const response = await this.$axios.$post(
                        httpEndpoint.enquiry.sendEnquiry,
                        params
                    )
                    if (response) {
                        setTimeout(() => {
                            this.loading = false
                        }, 2500)
                        if (response.valid) {
                            this.sent = true
                            await this.$store.dispatch(
                                "app/showSnackBar",
                                response.message || "Your message has been sent!"
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
            this.$v.$reset()
        }
    }
}
</script>
<style lang="scss" scoped>
.form--enquiry {
    position: relative;
    max-width: 62.1rem;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 2rem;
    margin: auto;

    h4 {
        margin: 0;
    }

    .form__title {
        text-align: center;
        padding-top: 2.1rem;
        color: var(--color-menu);
        font-weight: 800;
        font-size: 2rem;
        line-height: 2.8rem;
    }

    .form__field {
        position: relative;
        top: -1.2rem;
        margin-bottom: -2.2rem;

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
        padding: 2.4rem 2.3rem 0rem 2.4rem;
        color: var(--color-label);
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2rem;
    }

    .form__actions {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .btn {
            position: relative;
            min-width: 17.5rem;
            z-index: 1;
            bottom: -2.1rem;
        }
    }

    :deep(.v-input) {
        input {
            margin-bottom: 0;
            font-style: normal;
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2rem;
            color: var(--color-heading);
        }
    }

    @media screen and(max-width: 1024px) {
        h4 {
            padding: 0 1.2rem;
        }
    }
    @media screen and(max-width: 600px) {
        .form__title {
            font-size: 2rem;
        }
        .form__fields {
            display: block;
        }
        label {
            font-size: 1.4rem;
        }
        :deep(.v-input) {
            input {
                font-size: 1.4rem;
            }
        }
    }
}
</style>

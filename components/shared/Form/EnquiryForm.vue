<template lang="html">
    <div class="form--enquiry">
        <h4 class="form__title">Drop us a note. We’ll be in touch with you</h4>
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
                />
            </div>
            <div class="form__field">
                <label>Country</label>
                <v-text-field v-model="country" outlined dense disabled />
            </div>
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
        </form>
        <div class="form__actions">
            <v-btn class="btn btn--primary btn--green" @click="onSubmit">
                {{ loading ? "Sending..." : "Submit" }}
            </v-btn>
        </div>
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
            return setFormControlErrors(this.$v.enquiryType, "Enquiry Type is required")
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
        async handleSendMessage() {
            if (!this.loading) {
                this.loading = true
                try {
                    const params = {
                        fullname: this.name,
                        email: this.email,
                        mobileNo: this.phoneNumber,
                        mobileNoCountry: "Singapore",
                        country: "Singapore",
                        source: appSettings.siteName,
                        pageUrl: LANDLORDS_SEO_URL,
                        pageName: appSettings.siteName,
                        enquiryType: this.enquiryType
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
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-gap: 1.2rem;

        .form__field:nth-child(5) {
            grid-row-start: 3;
            grid-row-end: 5;
            grid-column-start: 1;
            grid-column-end: 3;
        }
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

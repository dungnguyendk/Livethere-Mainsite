<template lang="html">
    <div class="form--enquiry">
        <h4 class="form__title">Drop us a note. We’ll be in touch with you</h4>
        <form class="form__fields" @submit.prevent="onSubmit">
            <div class="form__field">
                <label>Full name</label>
                <v-text-field
                    v-model.trim="name"
                    outlined
                    dense
                    :error-messages="nameErrors"
                    hide-details
                />
            </div>
            <div class="form__field">
                <label>Email</label>
                <v-text-field
                    v-model.trim="email"
                    outlined
                    dense
                    :error-messages="emailErrors"
                    hide-details
                />
            </div>
            <div class="form__field">
                <label>Phone Number</label>
                <v-text-field
                    v-model.trim="phoneNumber"
                    outlined
                    dense
                    :error-messages="phoneNumberErrors"
                    hide-details
                />
            </div>
            <div class="form__field">
                <label>Country</label>
                <v-select
                    v-model="country"
                    outlined
                    dense
                    placeholder="Please select"
                    :items="countries"
                    item-text="countryName"
                    item-value="ccode"
                    disabled
                    hide-details
                />
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
            <v-btn class="btn btn--primary btn--green" @click="onSubmit">Submit</v-btn>
        </div>
    </div>
</template>

<script>
import { countries } from "~/ultilities/country"
import { validationMixin } from "vuelidate"
import { required, email } from "vuelidate/lib/validators"
import { setFormControlErrors } from "~/ultilities/form-validations"
export default {
    name: "EnquiryForm",
    mixins: [validationMixin],
    validations: {
        name: { required },
        email: { required, email },
        enquiryType: { required },
        phoneNumber: { required }
    },
    data() {
        return {
            name: "",
            email: "",
            country: "SGP",
            phoneNumber: "",
            countries: countries,
            enquiryType: null,
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
            return setFormControlErrors(this.$v.name, "Full name is required")
        },
        emailErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.required && errors.push("Email is required.")
            !this.$v.email.email && errors.push("Email must be valid.")
            return errors
        },

        phoneNumberErrors() {
            return setFormControlErrors(this.$v.phoneNumber, "Phone number is required")
        },

        enquiryTypeErrors() {
            return setFormControlErrors(this.$v.enquiryType, "Enquiry Type is required")
        }
    },
    methods: {
        async handleSendMessage() {
            try {
                const params = {
                    name: this.name,
                    email: this.email,
                    phoneNumber: this.phoneNumber,
                    country: this.country,
                    enquiryType: this.enquiryType
                }
                const response = await this.$axios.$post("/api/contact", params)
                if (response && response.status === 200) {
                    await this.$store.dispatch("app/showSnackBar", "Your message has been sent!")
                }
                this.$v.$reset()
            } catch (e) {}
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
            this.address = ""
            this.country = null
            this.enquiryType = ""
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

    .form__title {
        // display: flex;
        // justify-content: center;
        text-align: center;
        // align-items: center;
        padding-top: 2.1rem;
        color: var(--color-menu);
        font-weight: 800;
        font-size: 2rem;
        line-height: 2.8rem;
    }

    h4 {
        margin: 0;
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

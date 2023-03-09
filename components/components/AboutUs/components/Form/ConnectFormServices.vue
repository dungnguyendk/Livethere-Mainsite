<template>
    <form class="form--contact--services" @submit.prevent="onFormSubmit">
        <div class="form__top">
            <button class="btn--close" @click="onClose()"><i class="ri-close-fill"></i></button>
        </div>
        <div class="form__title">
            <h3>CONNECT WITH US</h3>
        </div>
        <div class="form__fields">
            <v-row>
                <v-col cols="12" md="6" sm="6" xs="12">
                    <label>Full Name</label>
                    <v-text-field v-model="name" outlined dense :error-messages="nameErrors">
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="6" xs="12">
                    <label>Country</label>
                    <v-select
                        v-model="countryy"
                        :items="countries"
                        item-text="countryName"
                        item-value="countries"
                        outlined
                        required
                        dense
                    />
                </v-col>
                <v-col cols="12" md="6" sm="6" xs="12">
                    <label>Phone Number</label>
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
                </v-col>
                <v-col cols="12" md="6" sm="6" xs="12">
                    <label>Email</label>
                    <v-text-field outlined dense v-model="email" :error-messages="emailErrors">
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="6" xs="12">
                    <label>Enquiry Type</label>
                    <v-select
                        v-model="enquiryType"
                        :items="enquiryListing"
                        placeholder="Please select"
                        outlined
                        required
                        dense
                        :error-messages="enquiryTypeErrors"
                    />
                </v-col>

                <v-col cols="12" md="6" sm="6" xs="12">
                    <label>Your Message</label>
                    <v-textarea v-model="message" outlined dense hide-details />
                </v-col>
            </v-row>

            <div class="btn-group">
                <v-btn class="btn btn--primary btn--green btn__add-file" @click="onSubmit()">
                    Submit</v-btn
                >
                <span class="cancel-form" @click="onClose()"> Cancel </span>
            </div>
        </div>
        <div class="form__footer">
            <p> Privacy Guarantee </p>
        </div>
    </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required, helpers, email } from "vuelidate/lib/validators"
import { countries } from "~/ultilities/country"
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
    name: "ConnectFormServices",
    mixins: [validationMixin],
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
        enquiryType: {
            required
        },
        countryy: {
            required
        }
        // message: {
        //     required
        // }
    },
    data() {
        return {
            name: "",
            phone: null,
            countryy: {
                ccode: "SGP",
                countryName: "SINGAPORE",
                nationaly: "SINGAPOREAN"
            },
            countries: countries,
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
            },
            enquiryType: "",
            snackbar: false,
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
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.required && errors.push("Full name is required")
            // !this.$v.name.email && errors.push(MESSAGE_INVALID_EMAIL)
            return errors
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
        enquiryTypeErrors() {
            const errors = []
            if (!this.$v.enquiryType.$dirty) return errors
            !this.$v.enquiryType.required && errors.push("Enquiry type is required")
            // !this.$v.name.email && errors.push(MESSAGE_INVALID_EMAIL)
            return errors
        },
        countryyErrors() {
            const errors = []
            if (!this.$v.countryy.$dirty) return errors
            !this.$v.countryy.required && errors.push("Country is required")
            // !this.$v.name.email && errors.push(MESSAGE_INVALID_EMAIL)
            return errors
        }
    },

    methods: {
        countryChanged(country) {
            this.country = "+" + country.dialCode
        },
        onSubmit() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                console.log("hehe")
            }
        },
        onResetForm() {
            this.$v.$reset()
            ;(this.name = ""), (this.phone = ""), (this.email = ""), (this.message = "")
        },
        onClose() {
            //this.onResetForm()
            this.$emit("close")
        }
    }
}
</script>

<style lang="scss" scoped>
.form--contact--services {
    background-color: var(--color-white);
    // margin-bottom: 2.4rem;
    .form__top {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 1.1rem 2.4rem 0 2.4rem;
        .btn--close {
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: none;
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            border: 1.5px solid var(--color-label);
            position: relative;
            left: 1.74rem;

            &:hover,
            &:focus {
                background-color: alpha(var(--color-red), var(--level-1));

                i {
                    color: var(--color-red);
                }
            }

            i {
                font-size: 2rem;
            }
        }
    }

    .form__title {
        display: flex;
        padding-top: 0.12rem;
        align-items: center;
        justify-content: center;
        h3 {
            margin-bottom: 0;
            font-weight: 700;
            font-size: 2.4rem;
            line-height: 2.8rem;
            color: var(--color-title-black);
        }
    }

    .form__fields {
        // padding: 0 2.4rem 2rem;
        padding: 3.5rem 4.7rem 0 4.8rem;
        .btn-custom {
            margin: 0 auto;
            display: block;
            ::v-deep(.v-btn__content) {
                font-size: 1.6rem !important;
            }
        }
        &::v-deep(.v-text-field__slot) {
            textarea {
                // padding-right: 12px;
                height: 20px;
            }
        }
    }
    .btn-group {
        padding-top: 1.2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        grid-gap: 2.2rem;

        .btn {
            width: 175px !important;
            border-radius: 0.8rem !important;
        }
        .cancel-form {
            color: var(--color-menu);
            text-decoration-line: underline;
            font-weight: 700;
            font-size: 1.6rem;
            line-height: 2rem;
            cursor: pointer;
        }

        .btn--green {
            &.v-btn--has-bg.v-btn--disabled {
                cursor: not-allowed;
            }
        }
    }
    @media screen and (max-width: 767px) {
        margin-bottom: 2.7rem;
    }
    .form__footer {
        padding-top: 4rem;
        p {
            width: 100%;
            margin-bottom: 0;
            background-color: var(--bg-color-white);
            display: flex;
            justify-content: center;
            padding: 1.6rem 0;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            color: var(--color-title-black);
        }
    }
}
.form__field-tel-input-custom {
    ::v-deep(.v-input__control) {
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
    ::v-deep(.v-input__control) {
        .v-input__slot {
            margin-bottom: 1rem;
        }
    }
    ::v-deep(.v-text-field__details) {
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

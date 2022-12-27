<template lang="html">
    <form class="form--register" @submit.prevent="submitForm">
        <div class="form--register__input">
            <label>Preferred Username</label>
            <v-text-field
                v-model.trim="preferredUsername"
                outlined
                dense
                placeholder="Type here"
                :error-messages="preferredUsernameErrors"
                @input="$v.preferredUsername.$touch()"
                @blur="$v.preferredUsername.$touch()"
            />
        </div>
        <div class="form--register__input2">
            <div class="form--register__input">
                <label>Password</label>
                <v-text-field
                    v-model.trim="password"
                    outlined
                    dense
                    placeholder="Type here"
                    type="password"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                />
            </div>
            <div class="form--register__input">
                <label>Verified Password</label>
                <v-text-field
                    v-model.trim="verifiedPassword"
                    outlined
                    dense
                    placeholder="Type here"
                    type="password"
                    :error-messages="verifiedPasswordErrors"
                    @input="$v.verifiedPassword.$touch()"
                    @blur="$v.verifiedPassword.$touch()"
                />
            </div>
        </div>
        <div class="form--register__input2">
            <div class="form--register__input">
                <label>Email Address</label>
                <v-text-field
                    v-model.trim="emailAddress"
                    outlined
                    dense
                    placeholder="Type here"
                    :error-messages="emailAddressErrors"
                    @input="$v.emailAddress.$touch()"
                    @blur="$v.emailAddress.$touch()"
                />
            </div>
            <div class="form--register__input">
                <label>Mobile No.</label>
                <vue-tel-input-vuetify
                    outlined
                    dense
                    v-bind="bindProps"
                    v-model.trim="phone"
                    label=""
                    v-on:country-changed="countryChanged"
                    :error-messages="phoneErrors"
                    @input="$v.phone.$touch()"
                    @blur="$v.phone.$touch()"
                ></vue-tel-input-vuetify>
            </div>
        </div>
        <v-checkbox
            label="I agree with the Landlord Portal Terms of Use"
            color="#EDB842"
            hide-details
        />
        <div class="form--action">
            <div class="btn-group">
                <v-btn class="btn btn--primary btn--green btn__add-file" type="submit">
                    Submit
                </v-btn>
            </div>
        </div>
    </form>
</template>
<script>
import { validationMixin } from "vuelidate"
import { required, email, sameAs } from "vuelidate/lib/validators"
export default {
    name: "LandlordRegisterForm",
    mixins: [validationMixin],
    validations: {
        preferredUsername: { required },
        password: { required },
        verifiedPassword: {
            required,
            sameAsPassword: sameAs("password")
        },
        emailAddress: { required, email },
        phone: { required }
    },
    data() {
        return {
            preferredUsername: "",
            password: "",
            verifiedPassword: "",
            emailAddress: "",
            phone: null,
            countryCode: null,
            country: null,
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
        preferredUsernameErrors() {
            const errors = []
            if (!this.$v.preferredUsername.$dirty) return errors
            !this.$v.preferredUsername.required && errors.push("Preferred Username is required")
            return errors
        },
        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push("Password is required")
            return errors
        },
        verifiedPasswordErrors() {
            const errors = []
            if (!this.$v.verifiedPassword.$dirty) return errors
            !this.$v.verifiedPassword.required && errors.push("Verified Password is required")
            !this.$v.verifiedPassword.sameAsPassword && errors.push("Passwords must be identical.")
            return errors
        },
        emailAddressErrors() {
            const errors = []
            if (!this.$v.emailAddress.$dirty) return errors
            !this.$v.emailAddress.required && errors.push("Email Address is required")
            !this.$v.emailAddress.email && errors.push("Email Address is valid")
            return errors
        },
        phoneErrors() {
            const errors = []
            if (!this.$v.phone.$dirty) return errors
            !this.$v.phone.required && errors.push("Phone No is required")
            return errors
        }
    },
    methods: {
        countryChanged(country) {
            this.country = "+" + country.dialCode
        },
        submitForm() {
            // console.log('submit!', this.$v.$invalid)
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.onClose()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.form--register {
    &__input {
        label {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2rem;
            color: var(--color-label);
        }
    }

    &__input2 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;
    }
}

// .form--verify {
//     display: flex;
//     flex-direction: row;
//     align-items: center;
// }

.form--action {
    text-align: center;

    .btn-group {
        width: 17.5rem;
        margin: 3.2rem 0;
    }
}
</style>

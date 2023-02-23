<template>
    <form class="form-enquiry">
        <div class="form__top">
            <h3>enquiry form</h3>
            <p>* All fields are required</p>
        </div>
        <div class="form__fields">
            <div class="form__field">
                <label>name</label>
                <v-text-field outlined dense placeholder="Example text"> </v-text-field>
            </div>
            <div class="form__field">
                <label>phone number</label>
                <vue-tel-input-vuetify
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
                <v-text-field outlined dense placeholder="Example text"> </v-text-field>
            </div>
            <div class="form__field">
                <label>message</label>
                <v-textarea outlined dense auto-grow height="120"> </v-textarea>
            </div>
            <v-btn class="btn btn--primary btn--green btn-custom">Enquire Now</v-btn>
        </div>
    </form>
</template>

<script>
export default {
    name: "EnquiryForm",

    data() {
        return {
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

    mounted() {},

    methods: {
        countryChanged(country) {
            this.country = "+" + country.dialCode
        },
    }
}
</script>

<style lang="scss" scoped>
.form-enquiry {
    background-color: var(--color-white);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08);
    border-radius: 2rem;
    margin-bottom: 2.4rem;
    .form__top {
        padding: 1.7rem 2.4rem 0;
        h3 {
            font-weight: 700;
            font-size: 2rem;
            line-height: 2rem;
            color: #000000;
            text-transform: capitalize;
            margin-bottom: 1.2rem;
        }
        p {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: #ef4444;
            margin-bottom: 2rem;
        }
    }
    .form__fields {
        padding: 0 2.4rem 2rem;
        .btn-custom{
            margin: 0 auto;
            display: block;
        }
    }
}
.form__field {
    margin-bottom: 1.6rem;
    label {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2rem;
        color: var(--color-label);
        text-transform: capitalize;
        margin-bottom: 0.4rem;
    }
}
.v-text-field{
    ::v-deep(.v-input__control){
        .v-text-field__details {
            display: none;
        }
    }
}
::v-deep(.form__field-tel-input-custom){
    .v-text-field__details{
        display: none;
    }
    .v-input__slot{
        margin-bottom: 0;
        border: none
    }
}
</style>
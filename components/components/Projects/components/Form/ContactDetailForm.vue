<template>
    <form class="form--contact-details">
        <div class="form__fields">
            <div class="form__field">
                <label>name</label>
                <v-text-field outlined dense placeholder="Name *"> </v-text-field>
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
                <v-text-field outlined dense placeholder="Email *"> </v-text-field>
            </div>
            <div class="form__field">
                <label>message</label>
                <v-textarea outlined dense height="120" placeholder="Message *"> </v-textarea>
            </div>
            <v-btn class="btn btn--primary btn--green btn-custom">Verify & continue</v-btn>
        </div>
    </form>
</template>

<script>
export default {
    name: 'ContactDetailForm',

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
        };
    },

    mounted() {
        
    },

    methods: {
        countryChanged(country) {
            this.country = "+" + country.dialCode
        }
    }
};
</script>

<style lang="scss" scoped>
.form--contact-details{

}
.form__field {
    margin-bottom: 3rem;
    label {
        font-weight: 500;
        font-size: 2rem;
        line-height: 2rem;
        color: var(--color-label);
        text-transform: capitalize;
        margin-bottom: 0.8rem;
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
}
.btn-custom{
    display: inline-block;
    width: 100%;
    ::v-deep(.v-btn__content){
        font-size: 2rem !important;
    }

}
</style>
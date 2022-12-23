<template lang="html">
    <div class="form--enquiry">
        <h4 class="form__title">Drop us a note. We’ll be in touch with you </h4>
        <form class="form__fields">
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <label>Full name</label>
                    <v-text-field v-model="fullName" outlined dense hide-details />
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <label>Email</label>
                    <v-text-field v-model="email" outlined dense hide-details />
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <label>Address</label>
                    <v-text-field v-model="address" outlined dense hide-details />
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <label>Country</label>
                    <v-select
                        v-model="country"
                        :items="countries"
                        item-text="countryName"
                        item-value="ccode"
                        outlined
                        dense
                        hide-details
                    />
                </v-col>
                <v-col cols="12" sm="12" md="12">
                    <div class="form__field--enquiry-type">
                        <label>Enquiry Type </label>
                        <v-select
                            v-model="enquiryType"
                            :items="enquiryListing"
                            item-text="text"
                            outlined
                            dense
                            hide-details
                        />
                    </div>
                </v-col>
            </v-row>
        </form>
        <div class="form__actions">
            <v-btn class="btn btn--primary btn--green">Submit</v-btn>
        </div>
    </div>
</template>

<script>
import { countries } from "~/ultilities/country"
export default {
    name: "EnquiryForm",

    data() {
        return {
            email: "",
            address: "",
            countries: countries,
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
    }
}
</script>
<style lang="scss" scoped>
.form--enquiry {
    position: relative;
    max-width: 62.1rem;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 2rem;
    padding: auto;
    margin: auto;
    .form__title {
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
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
        padding: 2.4rem 2.3rem 2.4rem 2.4rem;
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
}
</style>

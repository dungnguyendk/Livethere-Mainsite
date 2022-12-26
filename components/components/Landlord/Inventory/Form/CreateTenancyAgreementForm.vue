<template lang="html">
    <form class="form form--create-tenancy-agreement">
        <div class="form__fields">
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label class="required">Agreement Date </label>
                        <v-menu
                            ref="agreementDateMenu"
                            v-model="agreementDateMenu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="agreementDate"
                                    :error-messages="agreementDateErrors"
                                    prepend-inner-icon="mdi-calendar"
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                    dense
                                    hide-details
                                />
                            </template>
                            <v-date-picker
                                v-model="agreementDateRaw"
                                no-title
                                @input="agreementDateMenu = false"
                            />
                        </v-menu>
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Start Date </label>
                        <v-text-field v-model="startDate" dense outlined hide-details />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                    <div class="form__field">
                        <label>End Date </label>
                        <v-text-field v-model="endDate" dense outlined hide-details />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Monthly Rental </label>
                        <v-text-field v-model="monthlyRental" dense outlined hide-details />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Secure Deposit </label>
                        <v-text-field v-model="secureDeposit" dense outlined hide-details />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                    <div class="form__field">
                        <label>Remark </label>
                        <v-textarea v-model="remark" dense outlined hide-details />
                    </div>
                </v-col>
            </v-row>
        </div>
        <div class="form__actions">
            <v-btn class="btn btn--ghost btn--gray btn--sm" @click="onClose"> Cancel</v-btn>
            <v-btn class="btn btn--primary btn--green btn--sm"> Create</v-btn>
        </div>
    </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators"
import { setFormControlErrors } from "~/ultilities/form-validations"

export default {
    name: "CreateTenancyAgreementForm",
    mixins: [validationMixin],
    validations: {
        agreementDate: {
            required
        }
    },
    computed: {
        agreementDateErrors() {
            return setFormControlErrors(this.$v.agreementDate, "This field is required")
        }
    },
    data() {
        return {
            agreementDate: "",
            agreementDateMenu: "",
            agreementDateRaw: "",
            startDate: "",
            endDate: "",
            monthlyRental: "",
            secureDeposit: "",
            remark: ""
        }
    },
    watch: {
        agreementDateRaw() {
            this.agreementDate = this.formatDate(this.agreementDateRaw)
        }
    },

    methods: {
        formatDate(date) {
            if (!date) return null
            return this.$moment(date).format("DD-MMM-YYYY")
        },
        onClose() {
            this.$emit("close")
        }
    },

    onSubmit() {
        this.$v.$touch()
        if (this.$v.$invalid) {
            console.log({ Error: "Form validation failed" })
        } else {
            // continue actions
        }
    }
}
</script>
<style lang="scss" scoped>
.form--create-tenancy-agreement {
    .form__actions {
        display: flex;
        justify-content: center;
        align-items: center;
        grid-gap: 1.2rem;
        gap: 1.2rem;
        padding-top: 2.4rem;

        .btn {
            min-width: 12rem;
        }
    }
}
</style>

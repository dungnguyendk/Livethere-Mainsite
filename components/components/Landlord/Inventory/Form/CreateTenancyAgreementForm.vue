<template lang="html">
    <form class="form form--create-tenancy-agreement" @submit.prevent="submitForm">
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
                        <v-menu
                            ref="startDateMenu"
                            v-model="startDateMenu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="startDate"
                                    :error-messages="startDateErrors"
                                    prepend-inner-icon="mdi-calendar"
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                    dense
                                    hide-details
                                />
                            </template>
                            <v-date-picker
                                v-model="startDateRaw"
                                no-title
                                @input="startDateMenu = false"
                            />
                        </v-menu>
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                    <div class="form__field">
                        <label>End Date </label>
                        <v-menu
                            ref="endDateMenu"
                            v-model="endDateMenu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="endDate"
                                    :error-messages="endDateErrors"
                                    prepend-inner-icon="mdi-calendar"
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                    dense
                                    hide-details
                                />
                            </template>
                            <v-date-picker
                                v-model="endDateRaw"
                                no-title
                                @input="endDateMenu = false"
                            />
                        </v-menu>
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Monthly Rental </label>
                        <v-text-field v-model.trim="monthlyRental" dense outlined hide-details 
                            :error-messages="monthlyRentalErrors"
                        />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Secure Deposit </label>
                        <v-text-field v-model.trim="secureDeposit" dense outlined hide-details 
                        :error-messages="secureDepositErrors"
                        />
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
            <v-btn class="btn btn--primary btn--green btn--sm" type="submit"> Create</v-btn>
        </div>
    </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators"
import { setFormControlErrors } from "~/ultilities/form-validations"
import { convertCommasToNumber, convertNumberToCommas } from "~/ultilities/helpers"

export default {
    name: "CreateTenancyAgreementForm",
    mixins: [validationMixin],
    validations: {
        agreementDate: {
            required
        }, 
        startDate: {
            required
        }, 
        endDate: {
            required
        }, 
        monthlyRental: {
            required
        }, 
        secureDeposit: {
            required
        }
        
    },
    computed: {
        agreementDateErrors() {
            return setFormControlErrors(this.$v.agreementDate, "This field is required")
        }, 
        startDateErrors(){
            return setFormControlErrors(this.$v.startDate, "This field is required")
        }, 
        endDateErrors(){
            return setFormControlErrors(this.$v.endDate, "This field is required")
        }, 
        monthlyRentalErrors(){
            return setFormControlErrors(this.$v.monthlyRental, "This field is required")
        }, 
        secureDepositErrors(){
            return setFormControlErrors(this.$v.secureDeposit, "This field is required")
        }
        
    },
    data() {
        return {
            agreementDate: "",
            agreementDateMenu: "",
            agreementDateRaw: "",
            startDate: "",
            startDateMenu: "", 
            startDateRaw: "", 
            endDate: "",
            endDateMenu: "", 
            endDateRaw: "", 
            monthlyRental: "",
            secureDeposit: "",
            remark: ""
        }
    },
    watch: {
        agreementDateRaw() {
            this.agreementDate = this.formatDate(this.agreementDateRaw)
        }, 
        startDateRaw(){
            this.startDate = this.formatDate(this.startDateRaw)
        }, 
        endDateRaw(){
            this.endDate = this.formatDate(this.endDateRaw)
        }, 
        monthlyRental(val){
            if(!isNaN(val)){
                this.monthlyRental = convertNumberToCommas(val)
            }else{
                this.monthlyRental = convertNumberToCommas(convertCommasToNumber(val))
            }
        }, 
        secureDeposit(val){
            if(!isNaN(val)){
                this.secureDeposit = convertNumberToCommas(val)
            }else{ 
                this.secureDeposit = convertNumberToCommas(convertCommasToNumber(val))
            }
        }
    },

    methods: {
        formatDate(date) {
            if (!date) return null
            return this.$moment(date).format("DD-MMM-YYYY")
        },
        onClose() {
            this.$emit("close")
        },
        submitForm() {
        console.log("submit!", this.$v.$invalid)
        this.$v.$touch()
        if (this.$v.$invalid) {
            console.log({ Error: "Form validation failed" })
        } else {
            // continue actions
        }
    }
    },
    
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

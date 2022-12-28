<template lang="html">
    <form class="form form--create-tenancy-agreement" @submit.prevent="submitForm">
        <div class="form__fields">
            <v-row>
                <v-col cols="12" sm="12" md="4">
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
                <v-col cols="12" sm="12" md="4">
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
                <v-col cols="12" sm="12" md="4">
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
                <v-col cols="12" sm="12" md="12">
                    <div class="form__field">
                        <label>Tenancy Ref Code</label>
                        <v-text-field
                            v-model="tenancyRefCode"
                            dense
                            outlined
                            :error-messages="tenancyRefCodeErrors"
                        />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Monthly Rental </label>
                        <v-text-field
                            v-model.trim="monthlyRental"
                            dense
                            outlined
                            :error-messages="monthlyRentalErrors"
                            suffix="SGD"
                            reverse
                        />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label>Secure Deposit </label>
                        <v-text-field
                            v-model.trim="secureDeposit"
                            dense
                            outlined
                            :error-messages="secureDepositErrors"
                            suffix="SGD"
                            reverse
                        />
                    </div>
                </v-col>
                
                <v-col cols="12" sm="12" md="12">
                    <div class="form__field">
                        <label>Remark </label>
                        <v-textarea v-model="remark" dense outlined />
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
import { required, numeric } from "vuelidate/lib/validators"
import { setFormControlErrors } from "~/ultilities/form-validations"
import { convertCommasToNumber, convertNumberToCommas } from "~/ultilities/helpers"
import { mapState } from "vuex"
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
        tenancyRefCode: {
            required, 
            numeric
        },
        monthlyRental: {
            required,
            numeric
        },
        secureDeposit: {
            required,
            numeric
        }
    },
    computed: {
        ...mapState({
            inventoryDetails: (state) => state.inventory.inventoryDetails
        }),
        agreementDateErrors() {
            return setFormControlErrors(this.$v.agreementDate, "This field is required")
        },
        startDateErrors() {
            return setFormControlErrors(this.$v.startDate, "This field is required")
        },
        endDateErrors() {
            return setFormControlErrors(this.$v.endDate, "This field is required")
        },
        monthlyRentalErrors() {
            return setFormControlErrors(this.$v.monthlyRental, "This field is required")
        },
        secureDepositErrors() {
            return setFormControlErrors(this.$v.secureDeposit, "This field is required")
        }, 
        tenancyRefCodeErrors(){ 
            const errors = []
            if(!this.$v.tenancyRefCode.$dirty) return errors 
            !this.$v.tenancyRefCode.required && errors.push("This field is required")
            !this.$v.tenancyRefCode.numeric && errors .push("This field can only contain numeric values")
            return errors
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
            remark: "",
            tenancyRefCode: "", 
            submitted: false, 
            isOpenSnackbar: false, 
        }
    },
    watch: {
        agreementDateRaw() {
            this.agreementDate = this.formatDate(this.agreementDateRaw)
        },
        startDateRaw() {
            this.startDate = this.formatDate(this.startDateRaw)
        },
        endDateRaw() {
            this.endDate = this.formatDate(this.endDateRaw)
        },
        monthlyRental(val) {
            if (!isNaN(val)) {
                this.monthlyRental = convertNumberToCommas(val)
            } else {
                this.monthlyRental = convertNumberToCommas(convertCommasToNumber(val))
            }
        },
        secureDeposit(val) {
            if (!isNaN(val)) {
                this.secureDeposit = convertNumberToCommas(val)
            } else {
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
            this.submitted = true
            this.$v.$touch()
            if (!this.$v.$invalid) {
                   const params = {
                        tenancyRefCode: this.tenancyRefCode,
                        assestInventoryFID: this.inventoryDetails.id,
                        agreementDate: this.agreementDateRaw,
                        startDate: this.startDateRaw,
                        endDate: this.endDateRaw,
                        currencyType: "SGD",
                        currentyName: "Singapore Dollar",
                        cultureCode: "en-SG",
                        monthlyRental: this.monthlyRental ? convertCommasToNumber(this.monthlyRental) : 0,
                        secureDeposit: this.secureDeposit ? convertCommasToNumber(this.secureDeposit) : 0,
                        remark: this.remark
                }
                this.$store.dispatch("inventory/createTenancyAgreement", params)
                this.$emit("openSnackbar", this.isOpenSnackbar = true)
               this.onClose()
            } else {
                console.error("error!")
            }
        }, 
        onClose(){
            this.$emit("close")
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
        padding-bottom: 1.2rem;
        .btn {
            min-width: 12rem;
        }
    }
}
</style>

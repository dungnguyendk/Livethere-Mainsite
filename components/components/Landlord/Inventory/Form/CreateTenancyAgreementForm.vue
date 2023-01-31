<template lang="html">
    <form class="form form--create-tenancy-agreement" @submit.prevent="submitForm">
        <p class="alert alert--red mb-10" v-if="isShowErrorMessage">{{ errorMessages }}</p>
        <div class="form__fields">
            <v-row>
                <v-col cols="12" sm="12" md="4">
                    <div class="form__field">
                        <label class="required">Agreement Date</label>
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

                <v-col v-if="agreementDate" cols="12">
                    <v-radio-group
                        class="radio-group--optionDate"
                        v-model="optionDate"
                        row
                        dense
                        hide-details
                    >
                        <v-radio class="radio--custom" label="Selection date" value="selection" />
                        <v-radio class="radio--custom" label="1 Year" value="1-year" />
                        <v-radio class="radio--custom" label="2 Years" value="2-years" />
                    </v-radio-group>
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
                        <label>Security Deposit </label>
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
import { required, numeric, helpers } from "vuelidate/lib/validators"
import { setFormControlErrors } from "~/ultilities/form-validations"
import { convertCommasToNumber, convertNumberToCommas } from "~/ultilities/helpers"
import { mapState } from "vuex"
import { addOneYear, addTwoYears } from "~/ultilities/landlord-helper"

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
        tenancyRefCodeErrors() {
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
            remark: "",
            tenancyRefCode: "",
            submitted: false,
            isOpenSnackbar: false,
            isShowErrorMessage: false,
            errorMessages: "",
            optionDate: "selection" // "selection" | "1-year" | "2-years"
        }
    },
    watch: {
        optionDate() {
            if (this.optionDate === "1-year") {
                if (this.startDate !== "") {
                    this.endDate = addOneYear(this.$moment, this.startDateRaw)
                }
            }

            if (this.optionDate === "2-years") {
                if (this.startDate !== "") {
                    this.endDate = addTwoYears(this.$moment, this.startDateRaw)
                }
            }
            if (this.optionDate === "selection") {
                this.endDate = ""
                this.endDateRaw = ""
            }
        },

        agreementDateRaw() {
            this.agreementDate = this.formatDate(this.agreementDateRaw)
        },

        startDateRaw() {
            if (this.optionDate === "1-year") {
                this.endDate = addOneYear(this.$moment, this.startDateRaw)
            }
            if (this.optionDate === "2-years") {
                this.endDate = addTwoYears(this.$moment, this.startDateRaw)
            }
            this.startDate = this.formatDate(this.startDateRaw)
        },

        endDateRaw() {
            this.endDate = this.formatDate(this.endDateRaw)
        },

        monthlyRental(val) {
            if (!isNaN(val)) {
                this.$nextTick(() => (this.monthlyRental = convertNumberToCommas(val)))
            } else {
                this.$nextTick(
                    () => (this.monthlyRental = convertNumberToCommas(convertCommasToNumber(val)))
                )
            }
        },
        secureDeposit(val) {
            if (!isNaN(val)) {
                this.$nextTick(() => (this.secureDeposit = convertNumberToCommas(val)))
            } else {
                this.$nextTick(
                    () => (this.secureDeposit = convertNumberToCommas(convertCommasToNumber(val)))
                )
            }
        }
    },

    methods: {
        formatDate(date) {
            if (!date) return null
            return this.$moment(date).format("DD-MMM-YYYY")
        },
        async submitForm() {
            this.submitted = true
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const params = {
                    tenancyRefCode: this.tenancyRefCode,
                    assestInventoryFID: this.inventoryDetails.id,
                    agreementDate: this.$moment(this.agreementDate).format("YYYY-MM-DD"),
                    startDate: this.$dayjs(this.startDate).format("YYYY-MM-DD"),
                    endDate: this.$dayjs(this.endDate).format("YYYY-MM-DD"),
                    currencyType: "SGD",
                    currencyName: "Singapore Dollar",
                    cultureCode: "en-SG",
                    monthlyRental: this.monthlyRental
                        ? convertCommasToNumber(this.monthlyRental)
                        : 0,
                    secureDeposit: this.secureDeposit
                        ? convertCommasToNumber(this.secureDeposit)
                        : 0,
                    remark: this.remark
                }
                const validateDate = this.validateStartDateAndEndDate(
                    params.startDate,
                    params.endDate
                )
                if (validateDate) {
                    this.isShowErrorMessage = false
                    this.errorMessages = ""
                    this.$store
                        .dispatch("inventory/createTenancyAgreement", params)
                        .then((value) => {
                            if (value) {
                                if (value.id !== 0) {
                                    this.$emit("openSnackbar", (this.isOpenSnackbar = true))
                                    this.resetForm()
                                    this.onClose()
                                } else {
                                    console.log({ valueID: value.id })
                                    this.isShowErrorMessage = true
                                    this.errorMessages = value.responseMessage
                                }
                            } else {
                                this.isShowErrorMessage = true
                                this.errorMessages = value.responseMessage
                            }
                        })
                } else {
                    this.isShowErrorMessage = true
                    this.errorMessages = "End date should be greater than start date !"
                }
            } else {
                console.error("error!")
            }
        },
        onClose() {
            this.$emit("close")
            this.resetForm()
        },
        resetForm() {
            this.$v.$reset()
            this.agreementDateRaw = ""
            this.startDateRaw = ""
            this.endDateRaw = ""
            this.tenancyRefCode = ""
            this.monthlyRental = ""
            this.secureDeposit = ""
            this.remark = ""
        },
        validateStartDateAndEndDate(start, end) {
            const startDateFormat = this.$dayjs(this.startDate)
                .format("YYYY-MM-DD")
                .toString()
                .replace(/^-/, "")
            const endDateFormat = this.$dayjs(this.endDate)
                .format("YYYY-MM-DD")
                .toString()
                .replace(/^-/, "")
            console.log({
                currentDate: this.$dayjs("31-Jan-2023").format("YYYY-MM-DD").toString().re,
                startRaw: this.agreementDateRaw,
                startDateFormat,
                endDateFormat,
                comparing: this.$dayjs(endDateFormat).isAfter(startDateFormat),
                diff: this.$dayjs(endDateFormat).diff(startDateFormat, "day")
            })
            return this.$dayjs(this.$dayjs(this.endDate).format("YYYY/MM/DD")).isAfter(
                this.$dayjs(this.startDate).format("YYYY/MM/DD   ")
            )
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

    .form__fields {
        &::v-deep(.row) {
            > * {
                padding-top: 0 !important;
                padding-bottom: 0 !important;
            }
        }
    }
}

.radio--custom {
    &::v-deep(label) {
        margin-bottom: 0 !important;
        font-size: 1.4rem;
    }
}

.radio-group--optionDate {
    &::v-deep {
        margin-top: 0 !important;
        padding-bottom: 2.4rem;
    }
}
</style>

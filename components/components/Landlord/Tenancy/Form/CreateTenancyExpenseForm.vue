<template lang="html">
    <form class="form form--create-tenancy-agreement" @submit.prevent="submitForm">
        <div class="form__fields">
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label class="required">Expense Type </label>
                        <v-select
                            v-model="type"
                            item-text="text"
                            item-value="value"
                            :items="typeItems"
                            placeholder="Please select"
                            dense
                            outlined
                            :error-messages="typeErrors"
                        />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label class="required">Item Name </label>
                        <v-text-field
                            v-model="itemName"
                            dense
                            outlined
                            :error-messages="itemNameErrors"
                        />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label class="required">Price </label>
                        <v-text-field
                            v-model.trim="itemPrice"
                            dense
                            placeholder="0"
                            outlined
                            :error-messages="itemPriceErrors"
                            suffix="S$"
                            reverse
                        />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label class="required">Purchase Date </label>
                        <v-menu
                            ref="purchaseDateMenu"
                            v-model="purchaseDateMenu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="purchaseDate"
                                    :error-messages="purchaseDateErrors"
                                    prepend-inner-icon="mdi-calendar"
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                    dense
                                />
                            </template>
                            <v-date-picker
                                v-model="purchaseDateRaw"
                                no-title
                                @input="purchaseDateMenu = false"
                            />
                        </v-menu>
                    </div>
                </v-col>

                <v-col cols="12" sm="12" md="12">
                    <div class="form__field">
                        <label>Remarks </label>
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
import { required } from "vuelidate/lib/validators"
import { setFormControlErrors } from "~/ultilities/form-validations"
import { convertCommasToNumber, convertNumberToCommas } from "~/ultilities/helpers"
import { mapState } from "vuex"

export default {
    name: "CreateTenancyExpenseForm",
    mixins: [validationMixin],
    validations: {
        purchaseDate: {
            required
        },
        itemName: {
            required
        },
        itemPrice: {
            required
        },
        type: {
            required
        }
    },

    computed: {
        ...mapState({
            inventoryDetails: (state) => state.inventory.inventoryDetails,
            tenancyDetails: (state) => state.tenancy.tenancyDetails
        }),
        purchaseDateErrors() {
            return setFormControlErrors(this.$v.purchaseDate, "This field is required")
        },

        itemNameErrors() {
            return setFormControlErrors(this.$v.itemName, "This field is required")
        },

        itemPriceErrors() {
            return setFormControlErrors(this.$v.itemPrice, "This field is required")
        },
        typeErrors() {
            return setFormControlErrors(this.$v.type, "This field is required")
        }
    },

    data() {
        return {
            tenancyContractAgreementFID: 0,
            type: "",
            itemName: "",
            currencyType: "SGD",
            currencyName: "SINGAPORE DOLLAR",
            cultureCode: "en-SG",
            itemPrice: null,
            purchaseDate: "",
            purchaseDateMenu: "",
            purchaseDateRaw: "",
            typeItems: [
                {
                    text: "Housing Loans",
                    value: "1"
                },
                {
                    text: "Property Tax",
                    value: "2"
                },
                {
                    text: "Fire Insurance",
                    value: "3"
                },
                {
                    text: "Repairs",
                    value: "4"
                },
                {
                    text: "Maintenance",
                    value: "5"
                },
                {
                    text: "Costs of Securing Tenant",
                    value: "6"
                },
                {
                    text: "Costs of Supervision or Management Fees",
                    value: "7"
                },
                {
                    text: "Furniture and Fittings",
                    value: "8"
                },
                {
                    text: "Internet Charges/Expenses",
                    value: "9"
                },
                {
                    text: "Utility Expenses",
                    value: "10"
                },
                {
                    text: "Commision",
                    value: "12"
                },
                {
                    text: "Others",
                    value: "13"
                }
            ],

            //
            remark: ""
        }
    },
    watch: {
        purchaseDateRaw() {
            this.purchaseDate = this.formatDate(this.purchaseDateRaw)
        },

        itemPrice(val) {
            if (!isNaN(val)) {
                this.$nextTick(() => (this.itemPrice = convertNumberToCommas(val)))
            } else {
                this.$nextTick(
                    () => (this.itemPrice = convertNumberToCommas(convertCommasToNumber(val)))
                )
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
        onResetForm() {
            this.purchaseDate = ""
            this.purchaseDateRaw = ""
            this.purchaseDateMenu = ""
            this.itemPrice = 0
            this.itemName = ""
            this.remark = ""
            this.type = ""
            this.$v.$reset()
        },

        async submitForm() {
            this.submitted = true
            this.$v.$touch()

            if (!this.$v.$invalid) {
                const params = {
                    tenancyContractAgreementFID: this.tenancyDetails.id,
                    expenseTypeFID: parseFloat(this.type),
                    expenseTypeName: this.typeItems.find((t) => t.value === this.type).text,
                    itemName: this.itemName,
                    itemPrice: this.itemPrice ? convertCommasToNumber(this.itemPrice) : 0,
                    currencyType: this.currencyType,
                    currencyName: this.currencyName,
                    cultureCode: "en-SG",
                    purchaseDate: this.purchaseDateRaw,
                    remark: this.remark
                }
                await this.$store.dispatch("tenancy/createTenancyExpense", params).then(() => {
                    this.$emit("close")
                    this.onResetForm()
                })
            } else {
                console.error("error!")
            }
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

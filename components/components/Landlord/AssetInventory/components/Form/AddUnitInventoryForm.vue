<template lang="html">
    <form @submit.prevent="onFormSubmit" class="form--landlord form--add-unit-inventory">
        <div class="form__top">
            <h3>{{ unitInventoryDetail ? "EDIT UNIT INVENTORY" : "ADD NEW UNIT INVENTORY" }}</h3>
        </div>
        <div class="form__fields">
            <v-col cols="12" sm="12" md="12">
                <p v-if="errorMessage" class="alert alert--red">Something when wrong</p>
            </v-col>
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label class="required">Item </label>
                        <v-text-field
                            v-model="itemName"
                            :error-messages="nameErrors"
                            dense
                            outlined
                        />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label class="required">Condition </label>
                        <v-select
                            v-model="condition"
                            :items="conditions"
                            placeholder="Please select"
                            :error-messages="conditionErrors"
                            dense
                            outlined
                        />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label class="required">Quantity </label>
                        <v-text-field
                            v-model="quantity"
                            :error-messages="quantityErrors"
                            dense
                            outlined
                        />
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label class="required">Amount </label>
                        <v-text-field
                            v-model="value"
                            outlined
                            dense
                            hide-spin-buttons
                            :error-messages="valueErrors"
                            suffix="S$"
                            reverse
                        >
                        </v-text-field>
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
            <v-btn class="btn btn--ghost btn--gray btn--sm" @click="onClose()"> Cancel</v-btn>
            <v-btn
                class="btn btn--primary btn--green btn--sm"
                :loading="loading"
                @click="unitInventoryDetail ? updateUnitInventory() : createUnitInventory()"
            >
                {{ unitInventoryDetail ? "Update" : "Add" }}
            </v-btn>
        </div>
    </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators"
import { setFormControlErrors } from "~/ultilities/form-validations"
import { convertCommasToNumber, convertNumberToCommas } from "~/ultilities/helpers"
import { CONDITIONS } from "~/ultilities/contants/asset-inventory.js"
import { mapState } from "vuex"

export default {
    name: "AddUnitInventoryForm",
    mixins: [validationMixin],
    validations: {
        itemName: {
            required
        },
        condition: {
            required
        },
        quantity: {
            required
        },
        value: {
            required
        }
    },
    props: {
        sourceDetail: {
            type: Number,
            default: () => null
        }
    },
    computed: {
        ...mapState({
            entriesID: (state) => state.inventory.entriesID,
            internalID: (state) => state.inventory.internalID,
            units: (state) => state.inventory.units,
            unitInventoryDetail: (state) => state.inventory.unitInventoryDetail,
            tenancyDetails: (state) => state.tenancy.tenancyDetails,
            inventoryDetails: (state) => state.inventory.inventoryDetails
        }),

        nameErrors() {
            return setFormControlErrors(this.$v.itemName, "This field is required")
        },
        conditionErrors() {
            return setFormControlErrors(this.$v.condition, "This field is required")
        },
        quantityErrors() {
            return setFormControlErrors(this.$v.quantity, "This field is required")
        },
        valueErrors() {
            return setFormControlErrors(this.$v.value, "This field is required")
        }
    },
    created() {
        if (this.unitInventoryDetail) {
            this.quantity = this.unitInventoryDetail.quantity
                ? this.unitInventoryDetail.quantity
                : 0
            this.itemName = this.unitInventoryDetail.itemName
                ? this.unitInventoryDetail.itemName
                : ""
            this.value = this.unitInventoryDetail.itemValue ? this.unitInventoryDetail.itemValue : 0
            this.remark = this.unitInventoryDetail.remark ? this.unitInventoryDetail.remark : ""
            this.condition = this.unitInventoryDetail.conditionTypeFID
                ? this.conditions.find(
                      (i) => i.value.id === this.unitInventoryDetail.conditionTypeFID
                  ).value
                : ""
            this.assestInventoryFID = this.unitInventoryDetail.assestInventoryFID
                ? this.unitInventoryDetail.assestInventoryFID
                : 0
        }
    },
    data() {
        return {
            itemName: "",
            quantity: null,
            value: null,
            condition: "",
            currencyType: "SGD",
            currencyName: "SINGAPORE DOLLAR",
            cultureCode: "en-SG",
            conditions: CONDITIONS,
            remark: "",
            errorMessage: false,
            loading: false
        }
    },

    methods: {
        onFormSubmit() {
            this.loading = true
        },
        onClose() {
            this.$store.commit("inventory/setInventoryUnitDetail", "")
            this.$emit("close")
        },
        async createUnitInventory() {
            this.onFormSubmit()
            this.$v.$touch()
            if (!this.$v.$invalid) {
                try {
                    const params = {
                        assestInventoryFID: this.tenancyDetails
                            ? this.tenancyDetails.assestInventoryFID
                            : this.inventoryDetails
                            ? this.inventoryDetails.id
                            : 0,
                        conditionTypeFID: this.condition.id,
                        itemName: this.itemName,
                        currencyType: this.currencyType,
                        currencyName: this.currencyName,
                        cultureCode: "en-SG",
                        conditionDisplay: this.condition.name,
                        quantity: this.quantity ? convertCommasToNumber(this.quantity) : 0,
                        itemValue: this.value ? convertCommasToNumber(this.value) : 0,
                        remark: this.remark
                    }
                    this.$store
                        .dispatch("inventory/createUnitInventory", params)
                        .then((response) => {
                            this.loading = false
                            if (response) {
                                if (this.tenancyDetails) {
                                    this.$store.dispatch(
                                        "inventory/getUnitsByContractInternalID",
                                        this.$route.params.id
                                    )
                                } else if (this.inventoryDetails) {
                                    this.$store.dispatch(
                                        "inventory/getUnitsByInventoryID",
                                        this.inventoryDetails.id
                                    )
                                }

                                this.errorMessage = false
                                this.onClose()
                            } else {
                                this.errorMessage = true
                            }
                        })
                } catch (e) {
                    console.log(e)
                }
            } else {
                this.loading = false
            }
        },
        updateUnitInventory() {
            this.onFormSubmit()
            this.$v.$touch()
            if (!this.$v.$invalid) {
                try {
                    const params = {
                        id: this.sourceDetail,
                        assestInventoryFID: this.assestInventoryFID,
                        conditionTypeFID: this.condition.id,
                        cultureCode: "en-SG",
                        currencyType: this.currencyType,
                        currencyName: this.currencyName,
                        itemName: this.itemName,
                        conditionDisplay: this.condition.name,
                        quantity: this.quantity ? convertCommasToNumber(this.quantity) : 0,
                        itemValue: this.value ? convertCommasToNumber(this.value) : 0,
                        remark: this.remark
                    }
                    this.onClose()
                    this.$store
                        .dispatch("inventory/updateUnitInventory", params)
                        .then((response) => {
                            if (response) {
                                if (this.tenancyDetails) {
                                    this.$store.dispatch(
                                        "inventory/getUnitsByContractInternalID",
                                        this.$route.params.id
                                    )
                                } else if (this.inventoryDetails) {
                                    this.$store.dispatch(
                                        "inventory/getUnitsByInventoryID",
                                        this.inventoryDetails.id
                                    )
                                }

                                this.errorMessage = false
                                this.onClose()
                            } else {
                                this.errorMessage = true
                            }
                        })
                } catch (e) {
                    console.log(e)
                }
            } else {
                this.loading = false
            }
        }
    },
    watch: {
        value(val) {
            if (!isNaN(val)) {
                this.$nextTick(() => (this.value = convertNumberToCommas(val)))
            } else {
                this.$nextTick(
                    () => (this.value = convertNumberToCommas(convertCommasToNumber(val)))
                )
            }
        },
        quantity(val) {
            if (!isNaN(val)) {
                this.$nextTick(() => (this.quantity = convertNumberToCommas(val)))
            } else {
                this.$nextTick(
                    () => (this.quantity = convertNumberToCommas(convertCommasToNumber(val)))
                )
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.form--add-unit-inventory {
    .form__top {
        text-align: center;
        padding-bottom: 2.4rem;

        h3 {
            margin-bottom: 0;
            font-weight: 700;
            font-size: 2.4rem;
            line-height: 2.8rem;
            color: var(--color-title-black);
        }
    }

    .form__fields {
        p {
            display: flex;
            justify-content: center;
        }
    }

    .form__actions {
        display: flex;
        justify-content: center;
        align-items: center;
        grid-gap: 1.2rem;
        gap: 1.2rem;

        .btn {
            min-width: 12rem;
        }
    }
}
</style>

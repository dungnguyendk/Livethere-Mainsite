<template lang="html">
    <form class="form--landlord form--add-unit-inventory">
        <div class="form__top">
            <h3>{{ unitInventoryDetail ? "EDIT UNIT INVENTORY" : "ADD NEW UNIT INVENTORY" }}</h3>
        </div>
        <div class="form__fields">
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label class="required">Name </label>
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
                        <label class="required">Conditions </label>
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
                        <label class="required">Value </label>
                        <v-text-field
                            v-model="value"
                            :error-messages="valueErrors"
                            dense
                            outlined
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
            <v-btn class="btn btn--ghost btn--gray btn--sm" @click="onClose()"> Cancel</v-btn>
            <v-btn
                class="btn btn--primary btn--green btn--sm"
                :disabled="$v.$invalid"
                @click="unitInventoryDetail ? updateUnitInventory() : createUnitInventory()"
            >
                {{ unitInventoryDetail ? "Update" : "Add" }}</v-btn
            >
        </div>
    </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators"
import { setFormControlErrors } from "~/ultilities/form-validations"
import { convertNumberToCommas, convertCommasToNumber } from "~/ultilities/helpers"
import { CONDITIONS } from "~/ultilities/contants/asset-inventory.js"
import { mapState } from "vuex"
import { httpEndpoint } from "~/services/https/endpoints"
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
            unitInventoryDetail: (state) => state.inventory.unitInventoryDetail
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
                : 1
            this.itemName = this.unitInventoryDetail.itemName
                ? this.unitInventoryDetail.itemName
                : ""
            this.value = this.unitInventoryDetail.value ? this.unitInventoryDetail.value : 1
            this.remark = this.unitInventoryDetail.remark ? this.unitInventoryDetail.remark : ""
            this.condition = this.unitInventoryDetail.conditionTypeFID
                ? this.conditions.find(
                      (i) => i.value.id === this.unitInventoryDetail.conditionTypeFID
                  ).value
                : ""
        } else {
            this.itemName = ""
            this.value = 1
            this.quantity = 1
            this.condtion = ""
            this.remark = ""
        }
        // console.log("this.sourceDetail::", this.sourceDetail);
    },
    data() {
        return {
            itemName: "",
            quantity: 1,
            value: 1,
            condition: "",
            conditions: CONDITIONS,
            remark: ""
        }
    },

    methods: {
        onClose() {
            this.$store.commit("inventory/setInventoryUnitDetail", "")
            this.$emit("close")
        },
        async createUnitInventory() {
            try {
                const params = {
                    assestInventoryFID: this.entriesID,
                    conditionTypeFID: this.condition.id,
                    itemName: this.itemName,
                    conditionDisplay: this.condition.name,
                    quantity: this.quantity,
                    itemValue: this.value,
                    remark: this.remark
                }
                this.$store.dispatch("inventory/createUnitInventory", params).then(() => {
                    const internalID = this.internalID
                    this.$store.dispatch("inventory/getUnitsByInventoryFID", internalID)
                })
                this.onClose()
            } catch (e) {
                console.log(e)
            }
        },
        updateUnitInventory() {
            try {
                const params = {
                    id: this.sourceDetail,
                    assestInventoryFID: this.entriesID,
                    conditionTypeFID: this.condition.id,
                    cultureCode: "",
                    currencyType: "",
                    currentyName: "",
                    itemName: this.itemName,
                    conditionDisplay: this.condition.name,
                    quantity: this.quantity,
                    itemValue: this.value,
                    remark: this.remark
                }
                // console.log("params", params)
                this.$store.dispatch("inventory/updateUnitInventory", params).then(() => {
                    const internalID = this.internalID
                    this.$store.dispatch("inventory/getUnitsByInventoryFID", internalID)
                })
                this.onClose()
            } catch (e) {
                console.log(e)
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

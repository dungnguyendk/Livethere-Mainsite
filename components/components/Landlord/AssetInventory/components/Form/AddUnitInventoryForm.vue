<template lang="html">
    <form class="form--landlord form--add-unit-inventory">
        <div class="form__fields">
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <div class="form__field">
                        <label class="required">Name </label>
                        <v-text-field v-model="name" :error-messages="nameErrors" dense outlined />
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
            <v-btn class="btn btn--ghost btn--gray btn--sm" @click="onClose"> Cancel</v-btn>
            <v-btn class="btn btn--primary btn--green btn--sm" @click="onCreate()"> Create</v-btn>
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
        name: {
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
    computed: {
        ...mapState({
            entriesID: (state) => state.inventory.entriesID
        }),

        nameErrors() {
            return setFormControlErrors(this.$v.name, "This field is required")
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
    data() {
        return {
            name: "",
            quantity: null,
            value: null,
            condition: "",
            conditions: CONDITIONS,
            remark:""
        }
    },

    methods: {
        onClose() {
            this.$emit("close")
        },
        onResetForm() {
            this.$v.$reset()
        },
        // onSubmit() {
        //     console.log("submit!", this.$v.$invalid)
        //     this.$v.$touch()
        //     if (!this.$v.$invalid) {
        //         this.onClose()
        //     }
        // },
        async getData() {
            try {
                const id = this.$route.params.id
                console.log("id: " + id)
                const response = await this.$axios.$get(
                    `${httpEndpoint.unit.getEntries}?AssestInventoryFID=${id}`
                )
                if (response?.data) {
                    this.$store.commit("inventory/setUnits", response.data)
                    this.$router.push(`/units/${id}`)
                } else return false
            } catch (e) {
                console.log(e)
            }
        },
        async createUnitInventory() {
            try {
                const params = {
                    assestInventoryFID: this.entriesID,
                    conditionTypeFID: this.condition.id,
                    itemName: this.name,
                    conditionDisplay: this.condition.name,
                    quantity: this.quantity,
                    itemValue: this.value
                }
                await this.$store.dispatch("inventory/createUnitInventory", params)
                this.$emit("close")
                // this.$router.push("/landlord/assets/units/")
            } catch (e) {
                console.log(e)
            }
        },
        async onCreate() {
            const updateStatus = await this.createUnitInventory()
            if (updateStatus) {
                this.onResetForm()
                // console.log("step222");
            }
        }
    },
    watch: {
        value(val) {
            if (!isNaN(val)) {
                this.value = convertNumberToCommas(val)
            } else {
                this.value = convertNumberToCommas(convertCommasToNumber(val))
            }
        },
        quantity(val) {
            if (!isNaN(val)) {
                this.quantity = convertNumberToCommas(val)
            } else {
                this.quantity = convertNumberToCommas(convertCommasToNumber(val))
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.form--add-unit-inventory {
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

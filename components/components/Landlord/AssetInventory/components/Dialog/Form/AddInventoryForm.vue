<template>
    <form @submit.prevent="submitForm" class="form--add-new-inventory">
        <div class="form__top">
            <h3>add new inventory</h3>
        </div>
        <div class="form__fields">
            <div class="form__field">
                <label>Property Type</label>
                <v-select
                    v-model.trim="propertyType"
                    :items="propertyTypeList"
                    item-text="text"
                    item-value="value"
                    outlined
                    dense
                    placeholder="Type here"
                    :error-messages="propertyTypeErrors"
                    @input="$v.propertyType.$touch()"
                    @blur="$v.propertyType.$touch()"
                />
            </div>
            <div class="form__field2">
                <div class="form__field">
                    <label>Postal Code</label>
                    <v-text-field
                        v-model="postalCode"
                        type="number"
                        hide-spin-buttons
                        outlined
                        dense
                        placeholder="Type here"
                        :error-messages="postalCodeErrors"
                        @input="$v.postalCode.$touch()"
                        @blur="$v.postalCode.$touch()"
                    >
                        <template v-slot:prepend-inner>
                            <v-icon @click="searchPostalCode">mdi-magnify</v-icon>
                        </template>
                    </v-text-field>
                </div>
                <div class="form__field">
                    <label>House No.</label>
                    <v-text-field
                        v-model.trim="houseNo"
                        outlined
                        dense
                        placeholder="Type here"
                        :error-messages="houseNoErrors"
                        @input="$v.houseNo.$touch()"
                        @blur="$v.houseNo.$touch()"
                    />
                </div>
            </div>
            <div class="form__field">
                <label>Street Name</label>
                <v-text-field
                    v-model.trim="streetName"
                    outlined
                    dense
                    placeholder="Type here"
                    :error-messages="streetNameErrors"
                    @input="$v.streetName.$touch()"
                    @blur="$v.streetName.$touch()"
                />
            </div>
            <div class="form__field">
                <label>Unit No.</label>
                <v-text-field
                    v-model.trim="unitNo"
                    outlined
                    dense
                    placeholder="Type here"
                    :error-messages="unitNoErrors"
                    @input="$v.unitNo.$touch()"
                    @blur="$v.unitNo.$touch()"
                />
            </div>
            <div class="form__field">
                <label>Project Name</label>
                <v-text-field
                    v-model.trim="projectName"
                    outlined
                    dense
                    placeholder="Type here"
                    :error-messages="projectNameErrors"
                    @input="$v.projectName.$touch()"
                    @blur="$v.projectName.$touch()"
                />
            </div>
            <div class="form__field2">
                <div class="form__field">
                    <label>No of Bedroom(s)</label>
                    <v-select
                        v-model="bedroom"
                        outlined
                        dense
                        placeholder="Type here"
                        :items="bedroomList"
                        item-text="text"
                        item-value="value"
                        :error-messages="bedroomErrors"
                        @input="$v.bedroom.$touch()"
                        @blur="$v.bedroom.$touch()"
                    />
                </div>
                <div class="form__field">
                    <label>Tenure</label>
                    <v-select
                        v-model="tenure"
                        outlined
                        dense
                        placeholder="Type here"
                        :items="tenureList"
                        item-text="text"
                        item-value="value"
                        :error-messages="tenureErrors"
                        @input="$v.tenure.$touch()"
                        @blur="$v.tenure.$touch()"
                    />
                </div>
            </div>
            <div class="form__field">
                <label>Floor Area (sqft)</label>
                <v-text-field
                    v-model.trim="floorArea"
                    outlined
                    dense
                    placeholder="Type here"
                    type="number"
                    hide-spin-buttons
                    :error-messages="floorAreaErrors"
                    @input="$v.floorArea.$touch()"
                    @blur="$v.floorArea.$touch()"
                />
            </div>
            <div class="form__field">
                <label>Purchased Price</label>
                <v-text-field
                    v-model.trim="purchasedPrice"
                    outlined
                    dense
                    placeholder="Type here"
                    hide-spin-buttons
                    :error-messages="purchasedPriceErrors"
                    @input="$v.purchasedPrice.$touch()"
                    @blur="$v.purchasedPrice.$touch()"
                    suffix="SGD"
                    reverse
                >
                </v-text-field>
            </div>
            <div class="form__field" v-if="propertyType.name === 'LANDED PROPERTY'">
                <label>Land Area (sqft)</label>
                <v-text-field
                    v-model.trim="landArea"
                    outlined
                    dense
                    placeholder="Type here"
                    type="number"
                    hide-spin-buttons
                    :error-messages="landAreaErrors"
                    @input="$v.landArea.$touch()"
                    @blur="$v.landArea.$touch()"
                />
            </div>
        </div>
        <div class="card__footer">
            <div class="btn-group">
                <v-btn class="btn btn--primary btn--green btn__add-file" type="submit"> Add</v-btn>
                <span class="cancel-form" @click="onClose()"> Cancel </span>
            </div>
        </div>
    </form>
</template>
<script>
import { validationMixin } from "vuelidate"
import { required, requiredIf, minValue } from "vuelidate/lib/validators"
import { PROPERTY_TYPE, BEDROOM_TYPE, TENURE } from "~/ultilities/contants/asset-inventory.js"
import { convertNumberToCommas, convertCommasToNumber } from "~/ultilities/helpers"
import { setFormControlErrors } from "~/ultilities/form-validations"

export default {
    name: "AddInventoryForm",
    mixins: [validationMixin],
    validations: {
        propertyType: { required },
        postalCode: { required },
        houseNo: { required },
        streetName: { required },
        unitNo: { required },
        projectName: {
            required: requiredIf(function () {
                return this.propertyType.name !== "LANDED PROPERTY"
            })
        },
        bedroom: { required },
        tenure: { required },
        floorArea: {
            required,
            minValue: minValue(1)
        },
        landArea: {
            required: requiredIf(function () {
                return this.propertyType.name === "LANDED PROPERTY"
            }),
            minValue: minValue(1)
        },
        purchasedPrice: {
            required
        }
    },
    data() {
        return {
            valid: false,
            propertyType: "",
            propertyTypeList: PROPERTY_TYPE,
            postalCode: "",
            houseNo: "",
            streetName: "",
            unitNo: "",
            projectName: "",
            bedroom: "",
            bedroomList: BEDROOM_TYPE,
            tenure: "",
            tenureList: TENURE,
            floorArea: null,
            landArea: null,
            purchasedPrice: ""
        }
    },
    computed: {
        propertyTypeErrors() {
            return setFormControlErrors(this.$v.propertyType, "This field is required")
        },
        postalCodeErrors() {
            const errors = []
            if (!this.$v.postalCode.$dirty) return errors
            !this.$v.postalCode.required && errors.push("Postal Code is required")
            return errors
        },
        houseNoErrors() {
            const errors = []
            if (!this.$v.houseNo.$dirty) return errors
            !this.$v.houseNo.required && errors.push("House No is required")
            return errors
        },
        streetNameErrors() {
            const errors = []
            if (!this.$v.streetName.$dirty) return errors
            !this.$v.streetName.required && errors.push("Street Name is required")
            return errors
        },
        unitNoErrors() {
            const errors = []
            if (!this.$v.unitNo.$dirty) return errors
            !this.$v.unitNo.required && errors.push("Unit No is required")
            return errors
        },
        projectNameErrors() {
            const errors = []
            if (!this.$v.projectName.$dirty) return errors
            !this.$v.projectName.required && errors.push("Project Name is required")
            return errors
        },
        bedroomErrors() {
            const errors = []
            if (!this.$v.bedroom.$dirty) return errors
            !this.$v.bedroom.required && errors.push("No of Bedroom(s) is required")
            return errors
        },
        tenureErrors() {
            const errors = []
            if (!this.$v.tenure.$dirty) return errors
            !this.$v.tenure.required && errors.push("Tenure is required")
            return errors
        },
        floorAreaErrors() {
            const errors = []
            if (!this.$v.floorArea.$dirty) return errors
            !this.$v.floorArea.required && errors.push("Floor Area is required")
            !this.$v.floorArea.minValue && errors.push("Floor Area is more than 0")
            return errors
        },
        landAreaErrors() {
            const errors = []
            if (!this.$v.landArea.$dirty) return errors
            !this.$v.landArea.required && errors.push("Land Area is required")
            !this.$v.landArea.minValue && errors.push("Land Area is more than 0")
            return errors
        },
        purchasedPriceErrors() {
            const errors = []
            if (!this.$v.purchasedPrice.$dirty) return errors
            !this.$v.purchasedPrice.required && errors.push("Purchased Price is required")
            // !this.$v.purchasedPrice.requiredIf && errors.push("Purchased Price is more than 0");
            return errors
        }
    },
    methods: {
        submitForm() {
            console.log("submit!", this.$v.$invalid)
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const params = {
                    propertyType: this.propertyType.id,
                    propertyTypeDisplay: this.propertyType.name,
                    postalCode: this.postalCode,
                    hseNo: this.houseNo,
                    streetName: this.streetName,
                    unitNo: this.unitNo,
                    projectName: this.projectName,
                    tenureType: this.tenure.id,
                    tenureDisplay: this.tenure.name,
                    floorAreaSqft: this.floorArea ? this.floorArea : 0,
                    landAreaSqft: this.landArea ? this.landArea : 0,
                    city: "Singapore",
                    country: "Singapore",
                    bedroomTypeFID: this.bedroom.id ? this.bedroom.id : 0,
                    bedroomTypeDisplay: this.bedroom.name ? this.bedroom.name : 0,
                    purchasedPrice: this.purchasedPrice ? this.purchasedPrice : 0
                }
                this.$store.dispatch("inventories/createInventories", params)
                this.onClose()
            }
        },
        async searchPostalCode() {
            try {
                const response = await this.$axios.$get(
                    `https://apivo.aestechgroup.com/aespostal/api/properties/details?postalCode=${this.postalCode}`
                )
                if (response) {
                    if (response.propertyType) {
                        this.propertyType = this.propertyTypeList.find(
                            (item) => item.value.name === response.propertyType
                        ).value
                    }
                    this.houseNo = response.houseNo
                    this.streetName = response.streetName
                    this.unitNo = response.unitNo
                    this.projectName = response.projectName
                    if (response.tenureType) {
                        this.tenure = this.tenureList.find(
                            (item) => item.value.name === response.tenureType
                        ).value
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },
        onClose() {
            this.$emit("close")
        }
    },
    watch: {
        purchasedPrice(val) {
            if (!isNaN(val)) {
                this.purchasedPrice = convertNumberToCommas(val)
            } else {
                this.purchasedPrice = convertNumberToCommas(convertCommasToNumber(val))
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.form__fields {
    padding: 3.2rem 5rem 1rem 5rem;
    display: grid;
    column-gap: 2.4rem;
    grid-template-columns: repeat(2, 1fr);
}

.form__field {
    label {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2rem;
        color: var(--color-label);
        margin-bottom: 0.8rem;
    }
}

.form__field2 {
    display: flex;
    column-gap: 2.4rem;
    grid-template-columns: repeat(2, 1fr);

    label {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2rem;
        color: var(--color-label);
        margin-bottom: 0.8rem;
    }
}

@media only screen and (max-width: 768px) {
    .form__fields {
        padding: 3.2rem 3rem 1rem 3rem;
        display: grid;
        column-gap: 2.4rem;
        grid-template-columns: repeat(1, 1fr);
    }
}

.btn-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 2.6rem;

    .btn {
        max-width: 12rem;
        border-radius: 0.8rem !important;
    }

    .btn__add-file {
        min-width: 38rem !important;
    }

    .cancel-form {
        color: var(--color-menu);
        text-decoration-line: underline;
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2rem;
        cursor: pointer;
    }

    .btn--green {
        &.v-btn--has-bg.v-btn--disabled {
            cursor: not-allowed;
        }
    }
}

.v-btn--disabled {
    pointer-events: auto;
}

@media only screen and (max-width: 768px) {
    .btn-group {
        .btn__add-file {
            min-width: auto !important;
            width: 100%;
            max-width: 100% !important;
        }
    }
}

.card__footer {
    padding: 0 5rem 5rem 5rem;

    @media only screen and (max-width: 768px) {
        padding: 0 3rem 3rem 3rem;
    }
}
</style>

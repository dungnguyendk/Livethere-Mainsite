<template>
    <form @submit.prevent="submitForm" class="form--add-new-inventory">
        <div class="form__top">
            <h3>ADD NEW INVENTORY</h3>
        </div>
        <div class="form__fields">
            <div class="form__field">
                <label>Property Type</label>
                <v-select v-model.trim="propertyType" :items="propertyTypeList" item-text="text" item-value="value"
                    outlined dense placeholder="Please select" :error-messages="propertyTypeErrors" />
            </div>
            <div class="form__field2">
                <div class="form__field">
                    <label>Postal Code</label>
                    <v-text-field v-model="postalCode" type="number" hide-spin-buttons outlined dense
                        :error-messages="postalCodeErrors">
                        <template v-slot:prepend-inner>
                            <v-icon @click="searchPostalCode">mdi-magnify</v-icon>
                        </template>
                    </v-text-field>
                </div>
                <div class="form__field">
                    <label>House No.</label>
                    <v-text-field v-model.trim="houseNo" outlined dense :error-messages="houseNoErrors" />
                </div>
            </div>
            <div class="form__field">
                <label>Street Name</label>
                <v-text-field v-model.trim="streetName" outlined dense :error-messages="streetNameErrors" />
            </div>
            <div class="form__field">
                <label>Unit No.</label>
                <v-text-field v-model.trim="unitNo" outlined dense :error-messages="unitNoErrors" />
            </div>
            <div class="form__field">
                <label>Project Name</label>
                <v-text-field v-model.trim="projectName" outlined dense :error-messages="projectNameErrors" />
            </div>
            <div class="form__field2">
                <div class="form__field">
                    <label>No of Bedroom(s)</label>
                    <v-select v-model="bedroom" outlined dense placeholder="Please select" :items="bedroomList"
                        item-text="text" item-value="value" :error-messages="bedroomErrors" />
                </div>
                <div class="form__field">
                    <label>Tenure</label>
                    <v-select v-model="tenure" outlined dense placeholder="Please select" :items="tenureList"
                        item-text="text" item-value="value" :error-messages="tenureErrors" />
                </div>
            </div>
            <div class="form__field">
                <label>Floor Area (sqft)</label>
                <v-text-field v-model.trim="floorArea" outlined dense hide-spin-buttons
                    :error-messages="floorAreaErrors" />
            </div>
            <div class="form__field">
                <label>Purchased Price</label>
                <v-text-field v-model.trim="purchasedPrice" outlined dense hide-spin-buttons
                    :error-messages="purchasedPriceErrors" suffix="SGD" reverse>
                </v-text-field>
            </div>
            <div class="form__field" v-if="propertyType.name === 'LANDED PROPERTY'">
                <label>Land Area (sqft)</label>
                <v-text-field v-model.trim="landArea" outlined dense hide-spin-buttons
                    :error-messages="landAreaErrors" />
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
            // minValue: minValue(1)
        },
        landArea: {
            required: requiredIf(function () {
                return this.propertyType.name === "LANDED PROPERTY"
            }),
            // minValue: minValue(1)
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
            return setFormControlErrors(this.$v.postalCode, "Postal Code is required")
        },
        houseNoErrors() {
            return setFormControlErrors(this.$v.houseNo, "House No is required")
        },
        streetNameErrors() {
            return setFormControlErrors(this.$v.streetName, "Street Name is required")
        },
        unitNoErrors() {
            return setFormControlErrors(this.$v.unitNo, "Unit no is required")
        },
        projectNameErrors() {
            return setFormControlErrors(this.$v.projectName, "Project Name is required")
        },
        bedroomErrors() {
            return setFormControlErrors(this.$v.bedroom, "No of Bedroom(s) is required")
        },
        tenureErrors() {
            return setFormControlErrors(this.$v.tenure, "Tenure is required")
        },
        floorAreaErrors() {
            return setFormControlErrors(this.$v.floorArea, "Floor Area is required")
        },
        landAreaErrors() {
            return setFormControlErrors(this.$v.landArea, "Land Area is required")
        },
        purchasedPriceErrors() {
            return setFormControlErrors(this.$v.purchasedPrice, "Purchased Price is required")
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
                    floorAreaSqft: this.floorArea ? convertCommasToNumber(this.floorArea) : 0,
                    landAreaSqft: this.landArea ? convertCommasToNumber(this.landArea) : 0,
                    city: "Singapore",
                    country: "Singapore",
                    bedroomTypeFID: this.bedroom.id ? this.bedroom.id : 0,
                    bedroomTypeDisplay: this.bedroom.name ? this.bedroom.name : 0,
                    purchasedPrice: this.purchasedPrice ? convertCommasToNumber(this.purchasedPrice) : 0
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
        },
        floorArea(val) {
            if (!isNaN(val)) {
                this.floorArea = convertNumberToCommas(val)
            } else {
                this.floorArea = convertNumberToCommas(convertCommasToNumber(val))
            }
        },
        landArea(val) {
            if (!isNaN(val)) {
                this.landArea = convertNumberToCommas(val)
            } else {
                this.landArea = convertNumberToCommas(convertCommasToNumber(val))
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.form__fields {
    padding: 3.2rem 2rem 1rem 2rem;
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
        padding: 3.2rem 2rem 1rem 2rem;
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

.form__top {
    text-align: center;

    h3 {
        margin-bottom: 0;
        font-weight: 700;
        font-size: 2.4rem;
        line-height: 2.8rem;
        color: var(--color-title-black);
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

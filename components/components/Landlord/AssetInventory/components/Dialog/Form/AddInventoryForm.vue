<template>
    <form @submit.prevent="onFormSubmit" class="form--add-new-inventory">
        <div class="form__top">
            <h3>{{ inventoryDetail?.id ? "EDIT INVENTORY" : "ADD NEW INVENTORY" }}</h3>
        </div>
        <p class="alert alert--red" v-if="!statusResponse">Something went wrong</p>
        <div class="form__fields">
            <div class="form__field">
                <label>Property Type</label>
                <v-select v-model.trim="propertyType" :items="propertyTypeList" item-text="text" item-value="value" outlined
                    dense placeholder="Please select" :error-messages="propertyTypeErrors" @change="onChangePropertyType()" />
            </div>
            <div class="form__field2">
                <div class="form__field">
                    <label>Postal Code</label>
                    <v-text-field v-model="postalCode" hide-spin-buttons outlined dense :error-messages="postalCodeErrors">
                        <template v-slot:prepend-inner>
                            <v-icon @click="searchPostalCode">mdi-magnify</v-icon>
                        </template>
                    </v-text-field>
                </div>
                <div class="form__field">
                    <label>Block / House No.</label>
                    <v-text-field v-model.trim="houseNo" outlined dense :error-messages="houseNoErrors" />
                </div>
            </div>
            <div class="form__field">
                <label>Street Name</label>
                <v-text-field v-model.trim="streetName" outlined dense :error-messages="streetNameErrors" />
            </div>
            <div class="form__field2">
                <div class="form__field" v-if="!hideLanded">
                    <label>Unit No.</label>
                    <v-text-field v-model.trim="unitNo" outlined dense :error-messages="unitNoErrors"
                        @change="searchPostalCode" :disabled="disableUnitNo" />
                </div>
                <div class="form__field">
                    <label>No of Bedroom(s)</label>
                    <v-select v-model="bedroom" outlined dense placeholder="Please select" :items="bedroomList"
                        item-text="text" item-value="value" :error-messages="bedroomErrors" />
                </div>
            </div>
            <div class="form__field" v-if="!hideLanded">
                <label>Project Name</label>
                <v-text-field v-model.trim="projectName" outlined dense :error-messages="projectNameErrors" />
            </div>
            <div class="form__field">
                <label>Location</label>
                <v-text-field v-model.trim="location" outlined dense />
            </div>
            <div class="form__field">
                <label>Tenure</label>
                <v-select v-model="tenure" outlined dense placeholder="Please select" :items="tenureList" item-text="text"
                    item-value="value" :error-messages="tenureErrors" />
            </div>
            <div class="form__field">
                <label>Floor Area (sqft)</label>
                <v-text-field v-model.trim="floorArea" outlined dense hide-spin-buttons :error-messages="floorAreaErrors" />
            </div>
            <div class="form__field2">
                <div class="form__field">
                    <label>Purchase Price</label>
                    <v-text-field v-model.trim="purchasedPrice" outlined dense hide-spin-buttons
                        :error-messages="purchasedPriceErrors" suffix="S$" reverse>
                    </v-text-field>
                </div>
                <div class="form__field">
                    <label>Date of Purchase</label>
                    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition"
                        offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="purchasedDateFormatted" outlined dense
                                :error-messages="purchasedDateFormattedErrors" persistent-hint readonly
                                prepend-inner-icon="mdi-calendar" v-bind="attrs"
                                @blur="purchasedDate = parseDate(purchasedDate)" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="purchasedDate" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </div>
            </div>
            <div class="form__field" v-if="propertyType.name === 'LANDED PROPERTY'">
                <label>Land Area (sqft)</label>
                <v-text-field v-model.trim="landArea" outlined dense hide-spin-buttons :error-messages="landAreaErrors" />
            </div>
        </div>
        <div class="card__footer">
            <div class="btn-group">
                <v-btn class="btn btn--primary btn--green btn__add-file"
                    @click="inventoryDetail ? updateInventories() : createInventories()" :loading="loading">
                    {{ inventoryDetail ? "Update" : "Add" }}</v-btn>
                <span class="cancel-form" @click="onClose()"> Cancel </span>
            </div>
        </div>
    </form>
</template>
<script>
import { validationMixin } from "vuelidate"
import { required, requiredIf } from "vuelidate/lib/validators"
import { PROPERTY_TYPE, BEDROOM_TYPE, TENURE } from "~/ultilities/contants/asset-inventory.js"
import { convertNumberToCommas, convertCommasToNumber } from "~/ultilities/helpers"
import { setFormControlErrors } from "~/ultilities/form-validations"
import { mapState } from "vuex"
import { httpEndpoint } from "~/services/https/endpoints"
import qs from "qs"
export default {
    name: "AddInventoryForm",
    mixins: [validationMixin],
    validations: {
        propertyType: { required },
        postalCode: { required },
        houseNo: { required },
        streetName: { required },
        unitNo: {
            required: requiredIf(function () {
                return this.propertyType.name !== "LANDED PROPERTY"
            })
        },
        projectName: {
            required: requiredIf(function () {
                return this.propertyType.name !== "LANDED PROPERTY"
            })
        },
        bedroom: { required },
        // location: { required },
        tenure: { required },
        floorArea: {
            required,
        },
        landArea: {
            required: requiredIf(function () {
                return this.propertyType.name === "LANDED PROPERTY"
            }),
        },
        purchasedPrice: {
            required
        },
        purchasedDateFormatted: {
            required
        }
    },
    props: {
        sourceDetail: {
            type: Number,
            default: () => null
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
            location: "",
            tenure: "",
            tenureList: TENURE,
            floorArea: null,
            landArea: null,
            purchasedPrice: "",
            purchasedDate: "",
            purchasedDateFormatted: "",
            menu1: false,
            loading: false,
            disableUnitNo: false,
            hideLanded: false,
        }
    },
    computed: {
        ...mapState({
            inventoryDetail: (state) => state.inventories.inventoryDetail,
            statusFID: (state) => state.inventories.typeSelect,
            statusResponse: (state) => state.inventories.statusResponse,
        }),
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
        // locationErrors() {
        //     return setFormControlErrors(this.$v.location, "Location is required")
        // },
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
        },
        purchasedDateFormattedErrors() {
            return setFormControlErrors(this.$v.purchasedDateFormatted, "Purchased Date is required")
        },
    },
    created() {
        // console.log("this.inventoryDetail", this.inventoryDetail.propertyType);
        if (this.inventoryDetail) {
            this.propertyType = this.inventoryDetail.propertyType ? this.propertyTypeList.find((i) => i.value.id === this.inventoryDetail.propertyType).value : ""
            this.postalCode = this.inventoryDetail.postalCode ? this.inventoryDetail.postalCode : ""
            this.houseNo = this.inventoryDetail.hseNo ? this.inventoryDetail.hseNo : ""
            this.streetName = this.inventoryDetail.streetName ? this.inventoryDetail.streetName : ""
            this.unitNo = this.inventoryDetail.unitNo ? this.inventoryDetail.unitNo : ""
            this.projectName = this.inventoryDetail.projectName ? this.inventoryDetail.projectName : ""
            this.bedroom = this.inventoryDetail.bedroomTypeFID ? this.bedroomList.find((i) => i.value.id === this.inventoryDetail.bedroomTypeFID).value : ""
            this.location = this.inventoryDetail.location ? this.inventoryDetail.location : ""
            this.tenure = this.inventoryDetail.tenureType ? this.tenureList.find((i) => i.value.id === this.inventoryDetail.tenureType).value : ""
            this.floorArea = this.inventoryDetail.floorAreaSqft ? this.inventoryDetail.floorAreaSqft : ""
            this.landArea = this.inventoryDetail.landAreaSqft ? this.inventoryDetail.landAreaSqft : ""
            this.purchasedPrice = this.inventoryDetail.purchasedPrice ? this.inventoryDetail.purchasedPrice : ""
            this.purchasedDate = this.inventoryDetail.purchasedDate ? this.inventoryDetail.purchasedDate : ""
        } else {
            this.propertyType = ""
            this.postalCode = ""
            this.houseNo = ""
            this.streetName = ""
            this.unitNo = ""
            this.projectName = ""
            this.bedroom = ""
            this.location = ""
            this.tenure = ""
            this.floorArea = ""
            this.landArea = ""
            this.purchasedPrice = ""
            this.purchasedDate = ""
        }
        // console.log("this.sourceDetail::", this.sourceDetail);
    },
    methods: {
        onFormSubmit() {
            this.loading = true
        },
        async createInventories() {
            this.onFormSubmit()
            // console.log("submit!", this.$v.$invalid)
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
                    location: this.location,
                    tenureType: this.tenure.id,
                    tenureDisplay: this.tenure.tenureDisplay,
                    floorAreaSqft: this.floorArea ? convertCommasToNumber(this.floorArea) : 0,
                    landAreaSqft: this.landArea ? convertCommasToNumber(this.landArea) : 0,
                    city: "Singapore",
                    country: "Singapore",
                    bedroomTypeFID: this.bedroom.id ? this.bedroom.id : 0,
                    bedroomTypeDisplay: this.bedroom.name ? this.bedroom.name : 0,
                    purchasedPrice: this.purchasedPrice ? convertCommasToNumber(this.purchasedPrice) : 0,
                    purchasedDate: this.purchasedDate ? this.purchasedDate : ''
                }
                this.$store.dispatch("inventories/createInventories", params).then(() => {
                    const paramStatusFID = qs.stringify({
                        StatusFID: this.statusFID
                    })
                    this.$store.dispatch("inventories/getInventories", paramStatusFID)
                }).then(() => {
                    this.loading = false
                    if (this.statusResponse) {
                        this.onClose()
                    }
                })
            } else {
                this.loading = false
            }
        },
        updateInventories() {
            this.onFormSubmit()
            // console.log("Update!", this.$v.$invalid)
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const params = {
                    id: this.sourceDetail,
                    propertyType: this.propertyType.id,
                    propertyTypeDisplay: this.propertyType.name,
                    postalCode: this.postalCode,
                    hseNo: this.houseNo,
                    streetName: this.streetName,
                    unitNo: this.unitNo,
                    projectName: this.projectName,
                    location: this.location,
                    tenureType: this.tenure.id,
                    tenureDisplay: this.tenure.tenureDisplay,
                    floorAreaSqft: this.floorArea ? convertCommasToNumber(this.floorArea) : 0,
                    landAreaSqft: this.landArea ? convertCommasToNumber(this.landArea) : 0,
                    city: "Singapore",
                    country: "Singapore",
                    bedroomTypeFID: this.bedroom.id ? this.bedroom.id : 0,
                    bedroomTypeDisplay: this.bedroom.name ? this.bedroom.name : 0,
                    purchasedPrice: this.purchasedPrice ? convertCommasToNumber(this.purchasedPrice) : 0,
                    purchasedDate: this.purchasedDate ? this.purchasedDate : ''
                }
                this.$store.dispatch("inventories/updateInventory", params).then(() => {
                    const paramStatusFID = qs.stringify({
                        StatusFID: this.statusFID
                    })
                    this.$store.dispatch("inventories/getInventories", paramStatusFID)
                }).then(() => {
                    this.loading = false
                    if (this.statusResponse) {
                        this.onClose()
                    }
                })
            } else {
                this.loading = false
            }

        },
        async searchPostalCode() {
            this.loading = true
            const param = qs.stringify({
                postalCode: this.postalCode,
                unitNo: this.unitNo
            })
            if (this.postalCode) {
                try {
                    const response = await this.$apivo.$get(
                        `${httpEndpoint.postal.getEntryByPostalCode}?${param}`
                    )
                    if (response) {
                        // console.log("postalCode response",response);
                        this.loading = false
                        // response.propertyType && response.propertyType !== null ? this.propertyType = this.propertyTypeList.find(
                        //     (item) => item.value.name === response.propertyType
                        // ).value : this.propertyType = ''

                       if(response.propertyCategory === "LANDED"){
                            this.propertyType = this.propertyTypeList.find(
                                (item) => item.value.name === "LANDED PROPERTY"
                            ).value
                       }else {
                            response.propertyType && response.propertyType !== null ? this.propertyType = this.propertyTypeList.find(
                                (item) => item.value.name === response.propertyType
                            ).value : this.propertyType = ''
                       }

                        this.houseNo = response.houseNo
                        this.streetName = response.streetName
                        this.unitNo = this.unitNo ? this.unitNo : response.unitNo
                        this.projectName = response.projectName
                        response.tenureType && response.tenureType !== null ? this.tenure = this.tenureList.find(
                            (item) => item.value.name === response.tenureType
                        ).value : this.tenure = ''
                        this.floorArea = this.unitNo && response.floorAreaSqft !== 0 ? response.floorAreaSqft : ''
                        this.landArea = this.unitNo && response.landAreaSqft !== 0 ? response.landAreaSqft : ''
                        this.purchasedPrice = this.unitNo && response.consider !== 0 ? response.consider : ''
                        this.purchasedDate = this.unitNo && response.contractDate !== 0 ? response.contractDate : ''
                    } else {
                        this.loading = false
                    }

                } catch (e) {
                    console.log(e)
                }
            } else {
                this.loading = false
            }
        },
        onChangePostalCode() {
            // this.propertyType = ""
            this.houseNo = ""
            this.streetName = ""
            this.unitNo = ""
            this.projectName = ""
            this.bedroom = ""
            this.location = ""
            this.tenure = ""
            this.floorArea = ""
            this.landArea = ""
            this.purchasedPrice = ""
            this.purchasedDate = ""
        },
        onChangePropertyType(){
            this.houseNo = ""
            this.streetName = ""
            this.unitNo = ""
            this.projectName = ""
            this.bedroom = ""
            this.location = ""
            this.tenure = ""
            this.floorArea = ""
            this.landArea = ""
            this.purchasedPrice = ""
            this.purchasedDate = ""
            this.postalCode = ""
        },
        onClose() {
            this.$store.commit("inventories/setInventoryDetail", '')
            this.$emit("close")
        },
        formatDate(date) {
            if (!date) return null

            return this.$moment(date).format("DD-MMM-YYYY")
        },
        parseDate(date) {
            if (!date) return null

            return this.$moment(date).format("YYYY-MM-DD")
        },
    },
    watch: {
        postalCode(val) {
            if (this.inventoryDetail?.postalCode === null || this.inventoryDetail?.postalCode !== this.postalCode) {
                this.onChangePostalCode()
            }
        },
        purchasedPrice(val) {
            if (!isNaN(val)) {
                this.$nextTick(() => this.purchasedPrice = convertNumberToCommas(val))
            } else {
                this.$nextTick(() => this.purchasedPrice = convertNumberToCommas(convertCommasToNumber(val)))
            }
        },
        floorArea(val) {
            if (!isNaN(val)) {
                this.$nextTick(() => this.floorArea = convertNumberToCommas(val))
            } else {
                this.$nextTick(() => this.floorArea = convertNumberToCommas(convertCommasToNumber(val)))
            }
        },
        landArea(val) {
            if (!isNaN(val)) {
                this.$nextTick(() => this.landArea = convertNumberToCommas(val))
            } else {
                this.$nextTick(() => this.landArea = convertNumberToCommas(convertCommasToNumber(val)))
            }
        },
        purchasedDate() {
            this.purchasedDateFormatted = this.formatDate(this.purchasedDate)
        },
        // propertyType(val) {
        //     this.onChangePropertyType()
        //     // console.log("propertyType::", val.id === 3);
        //     if (val.id === 3) {
        //         this.disableUnitNo = true
        //     } else {
        //         this.disableUnitNo = false
        propertyType(val){
            // console.log("watch propertyType",val);
            if(val.name === "LANDED PROPERTY"){
                this.hideLanded = true
            }else {
                this.hideLanded = false
            }
        }
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
    width: 100%;

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

        label {
            font-size: 1.4rem;
        }
    }

    .form__field2 {
        label {
            font-size: 1.4rem;
        }
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

<template lang="html">
    <form class="form--filter-projects" @submit.prevent="onSubmitForm">
        <div class="form__fields">
            <div class="form__field mb-custom-1">
                <label>Location</label>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="locationSearch"
                            placeholder="Where do you want to live?"
                            hide-details
                            outlined
                            dense
                            prepend-inner-icon="icon-svg svg-location"
                            v-bind="attrs"
                            v-on="on"
                            @input="keySearch(locationSearch)"
                        />
                    </template>
                    <v-list class="list-location">
                        <v-list-item @click="openLocationSearch('Mrt')">
                            <v-list-item-icon>
                                <i
                                    data-v-6ff87bcf=""
                                    aria-hidden="true"
                                    class="v-icon icon-svg svg-train"
                                ></i>
                            </v-list-item-icon>
                            <v-list-item-title>Search by MRT</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="openLocationSearch('District')">
                            <v-list-item-icon>
                                <i
                                    data-v-6ff87bcf=""
                                    aria-hidden="true"
                                    class="v-icon icon-svg svg-target"
                                ></i>
                            </v-list-item-icon>
                            <v-list-item-title>Search by District</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
            <div class="form__field mb-custom-2">
                <label>Property Type</label>
                <v-select
                    v-model="propertyType"
                    :items="propertyTypeList"
                    item-text="text"
                    item-value="value.name"
                    outlined
                    dense
                    prepend-inner-icon="icon-svg svg-buildings"
                    append-icon="mdi-chevron-down"
                    class="form__field-select-custom"
                    placeholder="All"
                >
                </v-select>
            </div>
            <div class="form__field3 mb-custom-1">
                <div class="form__field">
                    <v-checkbox
                        on-icon="ri-checkbox-circle-fill"
                        off-icon="ri-checkbox-blank-circle-line"
                        label="circle"
                        color="#EDB842"
                        hide-details
                        class="form__field-checkbox-custom"
                        v-model="selectAll"
                        @change="select_All($event)"
                    >
                        <template v-slot:label>
                            <div class="form__field-label-custom">
                                <span>All</span>
                            </div>
                        </template>
                    </v-checkbox>
                </div>
                <div class="form__field">
                    <v-checkbox
                        on-icon="ri-checkbox-circle-fill"
                        off-icon="ri-checkbox-blank-circle-line"
                        label="circle"
                        color="#EDB842"
                        hide-details
                        class="form__field-checkbox-custom"
                        v-model="livethereChecked"
                        @change="select_Livethere($event)"
                    >
                        <template v-slot:label>
                            <div class="form__field-label-custom">
                                <span>Livethere Premium</span>
                                <img :src="require(`~/static/img/logos/logo-project.svg`)" alt="" />
                            </div>
                        </template>
                    </v-checkbox>
                </div>
            </div>
            <div class="form__field2 mb-custom-1">
                <div class="form__field">
                    <label>Bedrooms</label>
                    <v-menu
                        ref="menuBedroom"
                        :close-on-content-click="false"
                        v-model="menuBedroom"
                        transition="scale-transition"
                        offset-y
                        min-width="350px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="bedroom"
                                placeholder="Select"
                                prepend-inner-icon="icon-svg svg-bedroom"
                                readonly
                                outlined
                                dense
                                v-bind="attrs"
                                v-on="on"
                                hide-details
                            ></v-text-field>
                        </template>
                        <v-card class="v-card--range">
                            <v-card-title>Bedrooms</v-card-title>
                            <v-card-text>
                                <v-range-slider
                                    v-model="rangeBedroom"
                                    :min="minBedroom"
                                    :max="maxBedroom"
                                    @change="updateBedroom"
                                    thumb-color="#f7f7f9"
                                    track-fill-color="#EDB842"
                                    track-color="#E5E5E5"
                                    step="1"
                                    :tick-labels="listBedroom"
                                    ticks="always"
                                    tick-size="6"
                                    hide-details
                                >
                                </v-range-slider>
                            </v-card-text>
                        </v-card>
                    </v-menu>
                </div>
                <div class="form__field">
                    <label>Bathrooms</label>
                    <v-menu
                        ref="menuBathroom"
                        :close-on-content-click="false"
                        v-model="menuBathroom"
                        transition="scale-transition"
                        offset-y
                        min-width="350px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="bathroom"
                                placeholder="Select"
                                prepend-inner-icon="icon-svg svg-bathroom"
                                readonly
                                outlined
                                dense
                                v-bind="attrs"
                                v-on="on"
                                hide-details
                            ></v-text-field>
                        </template>
                        <v-card class="v-card--range">
                            <v-card-title>Bathrooms</v-card-title>
                            <v-card-text>
                                <v-range-slider
                                    v-model="rangeBathroom"
                                    :min="minBathroom"
                                    :max="maxBathroom"
                                    @change="updateBathroom"
                                    thumb-color="#f7f7f9"
                                    track-fill-color="#EDB842"
                                    track-color="#E5E5E5"
                                    step="1"
                                    :tick-labels="listBathroom"
                                    ticks="always"
                                    tick-size="6"
                                    hide-details
                                >
                                </v-range-slider>
                            </v-card-text>
                        </v-card>
                    </v-menu>
                </div>
            </div>
            <div class="form__field mb-custom-1">
                <label>Rent per Month (S$)</label>
                <v-range-slider
                    thumb-color="#f7f7f9"
                    track-fill-color="#EDB842"
                    track-color="#E5E5E5"
                    class="form__field-range-custom"
                    v-model="rangePrice"
                    :min="minPrice"
                    :max="maxPrice"
                    step="500"
                    @change="updatePrice"
                >
                    <template v-slot:prepend>
                        <v-text-field
                            :value="rangePriceMin"
                            hide-details
                            dense
                            prefix="$"
                            flat
                            solo
                            class="form__field-text-field-custom"
                            style="width: 65px"
                            readonly
                            @change="$set(rangePrice, 0, $event)"
                        >
                        </v-text-field>
                    </template>
                    <template v-slot:append>
                        <v-text-field
                            :value="rangePriceMax"
                            hide-details
                            dense
                            prefix="$"
                            flat
                            solo
                            class="form__field-text-field-custom text-right"
                            style="width: 65px"
                            readonly
                            @change="$set(rangePrice, 1, $event)"
                        >
                        </v-text-field>
                    </template>
                </v-range-slider>
            </div>
            <div class="form__field mb-custom-3">
                <label>Unit Size (sq.ft)</label>
                <v-range-slider
                    thumb-color="#f7f7f9"
                    track-fill-color="#EDB842"
                    track-color="#E5E5E5"
                    class="form__field-range-custom"
                    v-model="rangeUnitSize"
                    :min="minUnit"
                    :max="maxUnit"
                    step="500"
                    @change="updateUnit"
                >
                    <template v-slot:prepend>
                        <v-text-field
                            :value="rangeUnitSizeMin"
                            hide-details
                            dense
                            flat
                            solo
                            class="form__field-text-field-custom"
                            style="width: 65px"
                            readonly
                        >
                        </v-text-field>
                    </template>
                    <template v-slot:append>
                        <v-text-field
                            :value="rangeUnitSizeMax"
                            hide-details
                            dense
                            flat
                            solo
                            class="form__field-text-field-custom text-right"
                            style="width: 65px"
                        >
                        </v-text-field>
                    </template>
                </v-range-slider>
            </div>
            <div class="form__field">
                <label>Amenities</label>
                <v-chip-group multiple column active-class="yellow--text" v-model="amenities">
                    <v-chip
                        v-for="(amenities, index) in listAmenities"
                        :key="index"
                        label
                        class="ma-1 form__field-tag-custom"
                        :value="amenities.title"
                    >
                        <i :class="amenities.icon"></i>
                        <span>{{ amenities.title }}</span>
                    </v-chip>
                </v-chip-group>
            </div>
        </div>
        <div class="form__footer">
            <div class="form__btn">
                <v-btn class="btn btn--ghost btn--red" @click="onResetForm">Reset</v-btn>
                <v-btn class="btn btn--primary btn--green" type="submit">Apply</v-btn>
            </div>
        </div>
        <Dialog
            :open="isOpenDialogDistrict"
            @close="isOpenDialogDistrict = false"
            size="large"
            :title="'Search By District'"
            :actions="false"
            :customClass="true"
        >
            <LocationDistrictForm
                @close="isOpenDialogDistrict = false"
                @getDistricts="getDistricts"
            />
        </Dialog>
        <v-dialog v-model="isOpenDialogMrt" width="90%" content-class="dialog--mrt">
            <LocationMRTForm @close="isOpenDialogMrt = false" @getMrt="getMrt" />
        </v-dialog>
    </form>
</template>

<script>
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import { PROPERTY_TYPE, BEDROOM_TYPE, BATHROOM_TYPE } from "~/ultilities/contants/asset-inventory"
import LocationDistrictForm from "~/components/components/Section/components/Form/LocationDistrictForm.vue"
import LocationMRTForm from "~/components/components/Section/components/Form/LocationMRTForm.vue"
import { convertNumberToCommas } from "~/ultilities/helpers"
import { mapState } from "vuex"
import qs from "qs"
export default {
    name: "FilterProjectForm",
    components: {
        Dialog,
        LocationMRTForm,
        LocationDistrictForm
    },
    data() {
        return {
            isOpenDialogDistrict: false,
            isOpenDialogMrt: false,
            listAmenities: [
                {
                    id: 1,
                    title: "BBQ",
                    icon: "icon-svg svg-bbq"
                },
                {
                    id: 2,
                    title: "Playground",
                    icon: "icon-svg svg-playground"
                },
                {
                    id: 3,
                    title: "Pool",
                    icon: "icon-svg svg-pool"
                },
                {
                    id: 4,
                    title: "Clubhouse",
                    icon: "icon-svg svg-club-house"
                },
                {
                    id: 5,
                    title: "Gym",
                    icon: "icon-svg svg-gym"
                },
                {
                    id: 6,
                    title: "Concierge",
                    icon: "icon-svg svg-concierge"
                },
                {
                    id: 7,
                    title: "Tennis Court",
                    icon: "icon-svg svg-tennis-court"
                },
                {
                    id: 8,
                    title: "Function Room",
                    icon: "icon-svg svg-function-room"
                }
            ],
            propertyTypeList: PROPERTY_TYPE,
            bedroomList: BEDROOM_TYPE,
            bathroomList: BATHROOM_TYPE,
            locationSearch: "",
            propertyType: "",
            selectAll: false,
            livethereChecked: true,
            bedroom: "",
            bedRooms: "",
            menuBedroom: "",
            rangeBedroom: [0, 5],
            minBedroom: 0,
            maxBedroom: 5,
            listBedroom: ["Studio", "1", "2", "3", "4", "5+"],
            bathroom: "",
            bathRooms: "",
            menuBathroom: "",
            rangeBathroom: [0, 5],
            minBathroom: 0,
            maxBathroom: 5,
            listBathroom: ["0", "1", "2", "3", "4", "5+"],
            amenities: [],
            rangePrice: [1000, 20000],
            rangePriceMin: "",
            rangePriceMax: "",
            rentPerMonth: "",
            minPrice: 1000,
            maxPrice: 20000,
            rangeUnitSize: [100, 10000],
            rangeUnitSizeMin: "",
            rangeUnitSizeMax: "",
            unitSize: "100,-1",
            minUnit: 100,
            maxUnit: 10000,
            submitted: false
        }
    },
    computed: {
        ...mapState({
            paramsSearch: (state) => state.project.paramsSearch
        }),
    },
    created() {
        this.onFillExistingSearch()
    },
    methods: {
        updatePrice() {
            this.rangePriceMin = convertNumberToCommas(this.rangePrice[0])
            this.rangePriceMax = convertNumberToCommas(this.rangePrice[1])
            if (this.rangePrice[0] === this.minPrice && this.rangePrice[1] === this.maxPrice) {
                this.rentPerMonth = `${this.minPrice};-1`
                this.rangePriceMax = `${convertNumberToCommas(this.rangePrice[1])}+`
            } else if (this.rangePrice[1] === this.minPrice) {
                this.rangePriceMin = "0"
                this.rentPerMonth = `0;1000`
            } else if (this.rangePrice[1] === this.maxPrice) {
                this.rangePriceMax = `${convertNumberToCommas(this.rangePrice[1])}+`
                this.rentPerMonth = `${this.rangePrice[0]};-1`
            } else if (this.rangePrice[0] === this.maxPrice) {
                this.rentPerMonth = `${this.rangePrice[0]};-1`
            } else if (this.rangePrice[0] === this.minPrice) {
                this.rentPerMonth = `${this.rangePrice[0]};${this.rangePrice[1]}`
            } else {
                this.rentPerMonth = `${this.rangePrice[0]};${this.rangePrice[1]}`
            }
        },
        updateUnit(){
            this.rangeUnitSizeMin = convertNumberToCommas(this.rangeUnitSize[0])
            this.rangeUnitSizeMax = convertNumberToCommas(this.rangeUnitSize[1])
            if (this.rangeUnitSize[0] === this.minUnit && this.rangeUnitSize[1] === this.maxUnit) {
                this.unitSize = `${this.minUnit};-1`
                this.rangeUnitSizeMax = `${convertNumberToCommas(this.maxUnit)}+`
            } else if (this.rangeUnitSize[1] < 990) {
                this.minUnit = 0
                this.rangeUnitSizeMin = 0
                this.rangeUnitSizeMax = 1000
                this.unitSize = `0;1000`
                this.rangeUnitSize = [0,900]
            } else if (this.rangeUnitSize[1] === this.maxUnit) {
                this.rangeUnitSizeMax = `${convertNumberToCommas(this.rangeUnitSize[1])}+`
                this.unitSize = `${this.rangeUnitSize[0]};-1`
            } else if (this.rangeUnitSize[0] === this.maxUnit) {
                this.unitSize = `${this.rangeUnitSize[0]};-1`
            } else if (this.rangeUnitSize[0] === this.minUnit) {
                this.unitSize = `${this.rangeUnitSize[0]};${this.rangeUnitSize[1]}`
            } else {
                this.unitSize = `${this.rangeUnitSize[0]};${this.rangeUnitSize[1]}`
                this.minUnit = 100
            }
        },
        updateBedroom() {
            if (
                this.rangeBedroom[0] === this.minBedroom &&
                this.rangeBedroom[1] === this.maxBedroom
            ) {
                this.bedroom = "Bedroom"
                this.bedRooms = "0;-1"
            }else if (this.rangeBedroom[0] === this.maxBedroom) {
                this.rangeBedroom = [this.maxBedroom - 1,this.maxBedroom]
                this.bedRooms = this.rangeBedroom[0] + ";-1"
                this.bedroom = this.rangeBedroom[0] + " - " + this.rangeBedroom[1]
            }else if (this.rangeBedroom[1] === this.minBedroom) {
                this.rangeBedroom = [this.minBedroom,this.minBedroom + 1]
                this.bedRooms = this.rangeBedroom[0] + ";" + this.rangeBedroom[1]
                this.bedroom = "Studio" + " - " + this.rangeBedroom[1]
            } else if (this.rangeBedroom[1] === this.maxBedroom) {
                this.bedroom = this.rangeBedroom[0] + " - " + this.maxBedroom
                this.bedRooms = this.rangeBedroom[0] + ";-1"
            } else if (this.rangeBedroom[0] === this.minBedroom) {
                this.bedroom = "Studio" + " - " + this.rangeBedroom[1]
                this.bedRooms = this.rangeBedroom[0] + ";" + this.rangeBedroom[1]
            }  else {
                this.bedroom = this.rangeBedroom[0] + " - " + this.rangeBedroom[1]
                this.bedRooms = this.rangeBedroom[0] + ";" + this.rangeBedroom[1]
            }
        },
        updateBathroom() {
            if (
                this.rangeBathroom[0] === this.minBathroom &&
                this.rangeBathroom[1] === this.maxBathroom
            ) {
                this.bathroom = "Bathroom"
                this.bathRooms = "0;-1"
            }else if (this.rangeBathroom[0] === this.maxBathroom) {
                this.rangeBathroom = [this.maxBathroom - 1,this.maxBathroom]
                this.bathRooms = this.rangeBathroom[0] + ";-1"
                this.bathroom = this.rangeBathroom[0] + " - " + this.rangeBathroom[1]
            }else if (this.rangeBathroom[1] === this.minBathroom) {
                this.rangeBathroom = [this.minBathroom,this.minBathroom + 1]
                this.bathRooms = this.rangeBathroom[0] + ";" + this.rangeBathroom[1]
                this.bathroom = this.rangeBathroom[0] + " - " + this.rangeBathroom[1]
            } else if (this.rangeBathroom[1] === this.maxBathroom) {
                this.Bathroom = this.rangeBathroom[0] + " - " + this.maxBathroom
                this.bathRooms = this.rangeBathroom[0] + ";-1"
                this.bathroom = this.rangeBathroom[0] + " - " + this.rangeBathroom[1]
                console.log("bathRooms",this.bathRooms);
            } else {
                this.Bathroom = this.rangeBathroom[0] + " - " + this.rangeBathroom[1]
                this.bathRooms = this.rangeBathroom[0] + ";" + this.rangeBathroom[1]
                this.bathroom = this.rangeBathroom[0] + " - " + this.rangeBathroom[1]
                // console.log("else",);
            }
        },
        onClose() {
            this.$emit("close")
        },
        onFillExistingSearch() {
            if (this.paramsSearch) {
                this.propertyType = this.paramsSearch.propertyType
                this.handleSearch = this.paramsSearch.handleSearch
                this.livethereChecked = this.paramsSearch.livethereChecked
                this.origin = this.paramsSearch.origin
                this.page = this.paramsSearch.page
                this.perPage = this.paramsSearch.perPage
                this.search = this.paramsSearch.search
                this.sortBy = this.paramsSearch.sortBy
                this.category = this.paramsSearch.category
                this.amenities = this.paramsSearch.amenities ? this.paramsSearch.amenities.split(";").map(item => item.trim()) : []
                if (this.paramsSearch.category === "Mrt") {
                    this.locationSearch = this.paramsSearch.mrt
                } else if (this.paramsSearch.category === "District") {
                    this.locationSearch = this.paramsSearch.districts
                }
                // this.rangeBedroom = this.paramsSearch.bathRooms
                const tempBedrooms = this.paramsSearch.bedRooms ? this.paramsSearch.bedRooms.split(";").map(Number) : [this.minBedroom, this.maxBedroom]
                if (tempBedrooms.includes(-1)) {
                    if (
                        tempBedrooms[0] === this.minBedroom
                    ) {
                        this.bedroom = "Bedroom"
                        this.bedRooms = "0;-1"
                        this.rangeBedroom = [tempBedrooms[0],this.maxBedroom]
                    } else {
                        this.rangeBedroom = [tempBedrooms[0], this.maxBedroom]
                        this.bedroom = tempBedrooms[0] + " - " + this.maxBedroom
                        this.bedRooms = tempBedrooms[0] + ";-1"
                    }
                } else {
                    if (tempBedrooms[0] === this.minBedroom) {
                        this.bedroom = "Studio" + " - " + tempBedrooms[1]
                        this.bedRooms = tempBedrooms[0] + ";" + tempBedrooms[1]
                        this.rangeBedroom = [tempBedrooms[0],tempBedrooms[1]]
                    } else {
                        this.bedroom = tempBedrooms[0] + " - " + tempBedrooms[1]
                        this.bedRooms = tempBedrooms[0] + ";" + tempBedrooms[1]
                        this.rangeBedroom = [tempBedrooms[0],tempBedrooms[1]]
                    }
                }

                const tempBathrooms = this.paramsSearch.bathRooms
                    ? this.paramsSearch.bathRooms.split(";").map(Number)
                    : [this.minBathroom, this.maxBathroom]
                if (tempBathrooms.includes(-1)) {
                    if (
                        tempBathrooms[0] === this.minBathroom
                    ) {
                        this.bathroom = "Bathroom"
                        this.bathRooms = "0;-1"
                        this.rangeBathroom = [tempBathrooms[0], this.maxBathroom]
                    } else {
                        this.rangeBathroom = [tempBathrooms[0], this.maxBathroom]
                        this.bathroom = tempBathrooms[0] + " - " + this.maxBathroom
                        this.bathRooms = tempBathrooms[0] + ";-1"
                    }
                } else {
                    this.bathroom = tempBathrooms[0] + " - " + tempBathrooms[1]
                    this.bathRooms = tempBathrooms[0] + ";" + tempBathrooms[1]
                    this.rangeBathroom = [tempBathrooms[0], tempBathrooms[1]]
                }
                const tempPrices = this.paramsSearch.rentPerMonth
                    ? this.paramsSearch.rentPerMonth.split(";").map(Number)
                    : [this.minPrice, this.maxPrice]
                // console.log("tempPrices",tempPrices);
                if (tempPrices.includes(-1)) {
                    this.rangePriceMax = `${convertNumberToCommas(this.maxPrice)}+`
                    if (tempPrices[0] === this.minPrice) {
                        this.rangePrice = [this.minPrice, this.maxPrice]
                        this.rentPerMonth = this.minPrice + ";" + "-1"
                    } else if (tempPrices[0] === this.maxPrice) {
                        this.rentPerMonth = `${tempPrices[0]};-1`
                        this.rangePrice = [tempPrices[0], this.maxPrice]
                    } else {
                        this.rangePriceMax = `${convertNumberToCommas(this.rangePriceMax)}+`
                        this.rentPerMonth = `${tempPrices[0]};-1`
                        this.rangePrice = [tempPrices[0], this.maxPrice]
                    }
                } else {
                    if (tempPrices[1] === this.minPrice) {
                        this.rangePriceMin = "0"
                        this.rentPerMonth = `0;1000`
                        this.rangePrice = [this.minPrice, this.minPrice]
                    } else if (tempPrices[0] === this.minPrice) {
                        this.rentPerMonth = `${this.rangePrice[0]};${this.rangePrice[1]}`
                        this.rangePrice = [this.minPrice, tempPrices[1]]
                    } else {
                        this.rentPerMonth = `${tempPrices[0]};${tempPrices[1]}`
                        this.rangePrice = [tempPrices[0], tempPrices[1]]
                    }
                }

                const tempUnitSize = this.paramsSearch.unitSize
                    ? this.paramsSearch.unitSize.split(";").map(Number)
                    : [this.minUnit, this.maxUnit]
                // console.log("tempUnitSize",tempUnitSize);
                if (tempUnitSize.includes(-1)) {
                    this.rangeUnitSizeMax = `${convertNumberToCommas(this.maxUnit)}+`
                    if (tempUnitSize[0] === this.minUnit && tempUnitSize[1] === this.maxUnit) {
                        this.rangeUnitSize = [this.minUnit, this.maxUnit]
                        this.unitSize = this.minUnit + ";" + "-1"
                    } else if (tempUnitSize[0] === this.maxUnit) {
                        this.unitSize = `${tempUnitSize[0]};-1`
                        this.rangeUnitSize = [tempUnitSize[0], this.maxUnit]
                    } else {
                        this.rangeUnitSizeMax = `${convertNumberToCommas(this.rangeUnitSizeMax)}+`
                        this.unitSize = `${tempUnitSize[0]};-1`
                        this.rangeUnitSize = [tempUnitSize[0], this.maxUnit]
                    }
                } else {
                    if (tempUnitSize[1] === this.minUnit) {
                        this.rangeUnitSizeMin = "0"
                        this.unitSize = `0;1000`
                        this.rangeUnitSize = [this.minUnit, this.minUnit]
                    } else if (tempUnitSize[0] === this.minUnit) {
                        this.unitSize = `${this.rangeUnitSize[0]};${this.rangeUnitSize[1]}`
                        this.rangeUnitSize = [this.minUnit, tempUnitSize[1]]
                    } else {
                        this.unitSize = `${tempUnitSize[0]};${tempUnitSize[1]}`
                        this.rangeUnitSize = [tempUnitSize[0], tempUnitSize[1]]
                    }
                }
               
            }
        },
        select_All(e) {
            if (e == true && this.livethereChecked === false) {
                this.livethereChecked = true
            }
        },
        select_Livethere(e) {
            if (e == false && this.selectAll === true) {
                this.selectAll = false
            }
        },
        onSubmitForm() {
            this.submitted = true
            const params = {
                propertyType: this.propertyType,
                livethereChecked: this.livethereChecked,
                rentPerMonth: this.rentPerMonth,
                bedRooms: this.bedRooms,
                bathRooms: this.bathRooms,
                unitSize: this.unitSize,
                amenities: this.amenities.join(';'),
                livethereCheckedAll: this.selectAll,
                search: this.paramsSearch.search ? this.paramsSearch.search : "",
                sortBy: this.paramsSearch.sortBy ? this.paramsSearch.sortBy : "Relevant",
                category: this.category,
                districts: this.districts,
                mrt: this.mrt,
                page: this.paramsSearch.page ? this.paramsSearch.page : 1,
                perPage: this.paramsSearch.perPage ? this.paramsSearch.perPage : 10,
            }
            const paramsStringify = qs.stringify(params, { encode: false })
            console.log("onSearchListing params", params)
            console.log("onSearchListing params stringify", paramsStringify)
            this.$store
                .dispatch("project/searchListing", paramsStringify)
                .then(() => {
                    this.$store.commit("project/setParamsSearch", params)
                    this.$router.push(`/projects?${paramsStringify}`)
                })
            // this.$store.dispatch("project/filterListing", params).then((res) => {})
            this.onClose()
        },
        onResetForm() {
            ;(this.locationSearch = ""),
                (this.propertyType = "All"),
                (this.selectAll = false),
                (this.livethereChecked = true),
                (this.rangeBedroom = [0,5]),
                (this.bedroom = "Bedrooms"),
                (this.rangeBathroom = [0,5]),
                (this.bathroom = "Bathrooms"),
                (this.rangePrice = [1000, 20000]),
                (this.rangeUnitSize = [100, 10000]),
                (this.amenities = [])
        },
        keySearch(val) {
            this.category = console.log("keySearch val", val)
        },
        openLocationSearch(val) {
            console.log("openLocationSearch val", val)
            // this.locationSearch = ""
            this.category = val
            console.log("openLocationSearch this.category", this.category)
            if (val === "Mrt") {
                if (this.category === "Mrt") {
                    this.districts = ""
                    this.locationSearch = this.searchMRT ? this.searchMRT : ""
                } else {
                }
                this.isOpenDialogMrt = true
            } else {
                if (this.category === "District") {
                    this.searchMRT = ""
                    this.locationSearch = this.districts ? this.districts : ""
                } else {
                }
                this.isOpenDialogDistrict = true
            }
        },
        getDistricts(params) {
            this.locationSearch = params.join(";")
            this.districts = this.locationSearch
            // console.log("locationSearch",this.locationSearch);
        },
        getMrt(params) {
            this.locationSearch = params.join(";")
            this.searchMRT = this.locationSearch
            console.log("this.mrt: ", this.searchMRT)
        }
    },
    watch: {
        rangePrice(val) {
            this.rangePriceMin = convertNumberToCommas(this.rangePrice[0])
            this.rangePriceMax = this.rangePrice[1] === this.maxPrice ? `${convertNumberToCommas(this.rangePrice[1])}+` : convertNumberToCommas(this.rangePrice[1])
        },
        rangeUnitSize(val) {
            this.rangeUnitSizeMin = convertNumberToCommas(this.rangeUnitSize[0])
            this.rangeUnitSizeMax = this.rangeUnitSize[1] === this.maxUnit ? `${convertNumberToCommas(this.rangeUnitSize[1])}+` : convertNumberToCommas(this.rangeUnitSize[1])

            // this.rangeUnitSizeMax = convertNumberToCommas(this.rangeUnitSize[1])
        },
        paramsSearch() {
            this.onFillExistingSearch()
        }
    }
}
</script>
<style lang="scss" scoped>
.form--filter-projects {
    background-color: var(--color-white);
    ::v-deep(.v-input__slot) {
        padding: 0 !important;

        input {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: var(--color-label);
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        input[type="number"] {
            -moz-appearance: textfield;
        }
        .v-text-field__prefix {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: var(--color-label);
        }
    }
}
.form__footer {
    padding: 2.4rem 5rem 3.3rem;
    .form__border-top {
        margin-bottom: 3rem;
        width: 100%;
        height: 0.1rem;
        background-color: var(--border-color);
    }
    .form__btn {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        button {
            &:last-child {
                margin-left: 1rem;
            }
        }
    }
}
.form__fields {
    padding: 0 5rem 3.2rem;
    border-bottom: 0.1rem solid var(--border-color);
    max-height: calc(90vh - 190px);
    overflow: auto;
    /* width */

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
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-gap: 2.4rem;
    }
    .form__field3 {
        display: flex;
        align-items: center;
        .form__field {
            &:first-child {
                margin-right: 7rem;
            }
        }
    }
}
.form__field-select-custom {
    ::v-deep(.v-select__slot) {
        .v-label--active {
            left: -3.6rem !important;
        }
        label {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2rem;
            color: var(--color-title-black);
        }
        input::placeholder {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2rem;
            color: var(--color-title-black);
            padding-top: 1rem;
        }
        .v-select__selection--comma {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2rem;
            color: var(--color-title-black);
        }
    }
}
.v-text-field {
    ::v-deep(.v-input__control) {
        .v-text-field__details {
            display: none;
        }
        .v-input__slot {
            padding: 0 !important;
            .v-input__prepend-inner {
                margin-right: 0.5rem;
                margin-left: 1.6rem;
            }
        }

        .v-text-field__slot {
            input::placeholder {
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2rem;
                color: var(--color-title-black);
                padding-top: 1rem;
            }
            input {
                margin-right: -2rem;
            }
        }
    }
}
.v-input--selection-controls {
    margin-top: 0;
}
.form__field-text-field-custom {
    ::v-deep(.v-input__control) {
        .v-input__slot {
            background-color: transparent !important;
        }
    }
    &.text-right {
        ::v-deep(.v-input__control) {
            input {
                text-align: right;
            }
        }
    }
}
.form__field-label-custom {
    span {
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: #000000;
    }
    img {
        width: 3.4rem;
        height: 3.4rem;
        margin-left: 0.2rem;
    }
}
.form__field-checkbox-custom {
    margin-right: 0.6rem;
    input {
        border-radius: 50%;
    }
}
.form__field-range-custom {
    display: block;
    position: relative;
    ::v-deep(.v-input__slot) {
        top: -0.7rem;

        .v-slider__track-container {
            height: 0.4rem;
        }
    }
    ::v-deep(.v-slider__thumb) {
        background-color: var(--color-white);
        width: 2rem;
        height: 2rem;
        border: 0.1rem solid var(--border-color);
        box-shadow: 0px 2px 5px rgba(60, 66, 87, 0.08), 0px 1px 1px rgba(0, 0, 0, 0.12);
    }
    ::v-deep(.v-input__prepend-outer) {
        position: absolute;
        top: 2rem;
        left: 0;
        margin-left: 0;
        margin-bottom: 0;
        p {
            margin-bottom: 0;
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: var(--color-label);
        }
    }
    ::v-deep(.v-input__append-outer) {
        position: absolute;
        right: 0;
        top: 2rem;
        margin-left: 0;
        margin-bottom: 0;
        p {
            margin-bottom: 0;
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: var(--color-label);
        }
    }
}

.form__field-tag-custom {
    border: 0.1rem solid transparent;
    span {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--color-title-black);
        margin-left: 0.8rem;
    }
    i {
        width: 1.6rem;
    }
    transition: all 0.25s ease;
    &:hover {
        background-color: var(--color-white);
        border: 0.1rem solid var(--color-dark-yellow);
        span {
            color: var(--color-dark-yellow);
        }
        i {
            background: var(--color-dark-yellow);
        }
    }
}
.yellow--text {
    color: var(--color-white) !important;
    caret-color: var(--color-white) !important;
    border: 0.1rem solid var(--color-dark-yellow) !important;
    span {
        color: var(--color-dark-yellow) !important;
    }
    i {
        background: var(--color-dark-yellow) !important;
    }
}
.snackbar-custom {
    ::v-deep(.v-snack__content) {
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2.4rem;
    }
}
.mb-custom-1 {
    margin-bottom: 3rem;
}
.mb-custom-2 {
    margin-bottom: 1.9rem;
}
.mb-custom-3 {
    margin-bottom: 4.2rem;
}
::-webkit-scrollbar {
    width: 0.5rem;
}

::-webkit-scrollbar-track {
    border-radius: 1rem;
}

::-webkit-scrollbar-thumb {
    background: #bfbfbf;
    border-radius: 1rem;
}
::-webkit-scrollbar-thumb:hover {
    background: #a2a0a0;
}
.v-card--range {
    .v-card__title {
        font-size: 1.4rem;
    }
    .v-card__text {
        // padding-left: 0;
        // padding-right: 0;
    }

    .v-input {
        align-items: center;
    }
    ::v-deep(.v-slider__thumb) {
        cursor: pointer;
        background-color: alpha(var(--color-primary), 1) !important;
        border-color: alpha(var(--color-primary), 1) !important;
        // currentColor : --color-primary
        &::before {
            background-color: alpha(var(--color-primary), 0.8) !important;
            width: 1.6rem;
            height: 1.6rem;
            top: -0.2rem;
            left: -0.2rem;
        }
        &::after {
            width: 1.6rem;
            height: 1.6rem;
        }
    }
    ::v-deep(.v-slider__tick) {
        width: 0.4rem !important;
        height: 0.4rem !important;
        border-radius: 50%;
        background-color: alpha(var(--color-primary), 0.5) !important;
        top: -1px !important;
    }
    ::v-deep(.v-slider__tick-label) {
        top: 1rem;
        left: 0.2rem;
    }
}
::placeholder {
    font-size: 1.6rem;
    color: var(--color-title-black);
}
</style>

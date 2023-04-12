<template lang="html">
    <section class="section--search">
        <div class="container">
            <form action="" class="section--search__form">
                <v-row align="end">
                    <v-col>
                        <v-row>
                            <v-col cols="12" sm="6" md="3">
                                <div class="form__field">
                                    <label>Location</label>
                                    <v-menu offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="locationSearch"
                                                placeholder="Where do you want to live?"
                                                prepend-icon="icon-svg svg-location"
                                                hide-details
                                                v-bind="attrs"
                                                v-on="on"
                                                @input="keySearch(locationSearch)"
                                            />
                                        </template>
                                        <template>
                                            <v-list class="list-location">
                                                <v-list-item v-for="(item, index) in listAmenities" :key="index" class="list-amenities" @click="selectAmenity(item)">
                                                    <v-list-item-title >{{ item.name }}</v-list-item-title>
                                                    <v-list-item-subtitle>{{ item.category }}</v-list-item-subtitle>
                                                </v-list-item>
                                                <v-list-item  @click="openLocationSearch('Mrt')">
                                                    <v-list-item-icon>
                                                        <i data-v-6ff87bcf="" aria-hidden="true" class="v-icon icon-svg svg-train"></i>
                                                    </v-list-item-icon>
                                                    <v-list-item-title >Search by MRT</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item @click="openLocationSearch('District')">
                                                    <v-list-item-icon>
                                                        <i data-v-6ff87bcf="" aria-hidden="true" class="v-icon icon-svg svg-target"></i>
                                                    </v-list-item-icon>
                                                    <v-list-item-title>Search by District</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </template>
                                    </v-menu>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <div class="form__field">
                                    <label>Price</label>
                                    <v-menu
                                        ref="menuRange"
                                        :close-on-content-click="false"
                                        v-model="menuRange"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="350px"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="price"
                                                placeholder="Select"
                                                prepend-icon="icon-svg svg-dollar-circle"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                hide-details
                                            ></v-text-field>
                                        </template>
                                        <v-card class="v-card--range">
                                            <v-card-title>Rent Per Month ($S)</v-card-title>
                                            <v-card-text class="px-0">
                                                <v-range-slider
                                                    v-model="rangePrice"
                                                    :min="minPrice"
                                                    :max="maxPrice"
                                                    @change="updatePrice"
                                                    thumb-color="#f7f7f9"
                                                    track-fill-color="#EDB842"
                                                    track-color="#E5E5E5"
                                                    step="500"
                                                    hide-details
                                                >
                                                    <template v-slot:prepend>
                                                        <v-text-field
                                                            :value="rangePriceMin"
                                                            hide-details
                                                            dense
                                                            prefix="$"
                                                            flat
                                                            solo
                                                            style="width: 90px"
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
                                                            style="width: 90px"
                                                            readonly
                                                            @change="$set(rangePrice, 1, $event)"
                                                        >
                                                        </v-text-field>
                                                    </template>
                                                </v-range-slider>
                                            </v-card-text>
                                        </v-card>
                                    </v-menu>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <div class="form__field">
                                    <label>Bedroom</label>
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
                                                prepend-icon="icon-svg svg-bedroom"
                                                readonly
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
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <div class="form__field">
                                    <label>Property Type</label>
                                    <v-select
                                        v-model="propertyType"
                                        :items="propertyTypeList"
                                        item-text="text"
                                        item-value="text"
                                        required
                                        hide-details
                                        prepend-icon="icon-svg svg-buildings"
                                        placeholder="Select"
                                    ></v-select>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="btn btn--primary btn--green" @click="onSearchListing()"
                            >Search</v-btn
                        >
                    </v-col>
                </v-row>
            </form>
        </div>
        <Dialog
            :open="isOpenDialogDistrict"
            @close="isOpenDialogDistrict = false"
            size="large"
            :title="'Search By District'"
            :actions="false"
            :customClass="true"
        >
            <LocationDistrictForm @close="isOpenDialogDistrict = false" @getDistricts="getDistricts" />
        </Dialog>
        <v-dialog 
            v-model="isOpenDialogMrt"
            width="90%" 
            content-class="dialog--mrt"
        >
            <LocationMRTForm @close="isOpenDialogMrt = false" @getMrt="getMrt"  />
        </v-dialog>

    </section>
</template>
<script>
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import LocationDistrictForm from "~/components/components/Section/components/Form/LocationDistrictForm.vue"
import LocationMRTForm from "~/components/components/Section/components/Form/LocationMRTForm.vue"
import { PROPERTY_TYPE } from "~/ultilities/contants/asset-inventory.js"
import { convertNumberToCommas } from "~/ultilities/helpers"
import { mapState } from "vuex"
import { httpEndpoint } from "~/services/https/endpoints"
import qs from "qs"
import _ from "lodash"
export default {
    name: "HomeSearch",
    components: {
        Dialog,
        LocationMRTForm,
        LocationDistrictForm
    },
    data() {
        return {
            isOpenDialogDistrict: false,
            isOpenDialogMrt:false,
            locationSearch: "",
            propertyTypeList: PROPERTY_TYPE,
            propertyType: "All",
            menuRange: false,
            price: "",
            rangePrice: [1000, 20000],
            minPrice: 1000,
            maxPrice: 20000,
            menuBedroom: false,
            bedroom: "",
            rangeBedroom: [0, 5],
            minBedroom: 0,
            maxBedroom: 5,
            listBedroom: ["Studio", "1", "2", "3", "4", "5+"],
            rangePriceMin: "",
            rangePriceMax: "",
            rentPerMonth: "",
            bedRooms: "",
            category: "",
            districts: "",
            searchMRT : "",
            searchKey: "",
            listAmenities: [],
        }
    },
    computed: {
        ...mapState({
            paramsSearch: (state) => state.project.paramsSearch,
            linesMrt: (state) => state.project.linesMrt
        }),
    },
    created() {
        this.updatePrice()
        this.updateBedroom()
        this.onFillExistingSearch()
    },
    mounted() {},
    methods: {
        updatePrice() {
            this.rangePriceMin = convertNumberToCommas(this.rangePrice[0])
            this.rangePriceMax = convertNumberToCommas(this.rangePrice[1])
            if (this.rangePrice[0] === this.minPrice && this.rangePrice[1] === this.maxPrice) {
                this.price = "Price"
                this.rangePriceMax = `${convertNumberToCommas(this.rangePrice[1])}+`
                this.rentPerMonth = `${this.minPrice};-1`
            } else if (this.rangePrice[1] === this.minPrice) {
                this.price = `$0 - $${convertNumberToCommas(this.rangePrice[1])}`
                this.rangePriceMin = "0"
                this.rentPerMonth = `0;1000`
            } else if (this.rangePrice[1] === this.maxPrice) {
                
                this.price = `Min $${convertNumberToCommas(this.rangePrice[0])}`
                this.rangePriceMax = `${convertNumberToCommas(this.rangePrice[1])}+`
                this.rentPerMonth = `${this.rangePrice[0]};-1`
            } else if (this.rangePrice[0] === this.maxPrice) {
                this.price = `Min $${convertNumberToCommas(this.rangePrice[0])}`
                this.rentPerMonth = `${this.rangePrice[0]};-1`
            } else if (this.rangePrice[0] === this.minPrice) {
                this.price = `Max $${convertNumberToCommas(this.rangePrice[1])}`
                this.rentPerMonth = `${this.rangePrice[0]};${this.rangePrice[1]}`
            } else {
                this.price = `$${convertNumberToCommas(
                    this.rangePrice[0]
                )} - $${convertNumberToCommas(this.rangePrice[1])}`
                this.rentPerMonth = `${this.rangePrice[0]};${this.rangePrice[1]}`
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
                this.amenities = this.paramsSearch.amenities
                if(this.paramsSearch.category === "Mrt"){
                    this.locationSearch = this.paramsSearch.mrt
                }else if(this.paramsSearch.category === "District"){
                    this.locationSearch = this.paramsSearch.districts
                }else {
                    this.locationSearch = this.paramsSearch.search
                }
                // this.rangeBedroom = this.paramsSearch.bedRooms
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
                const tempPrices = this.paramsSearch.rentPerMonth ? this.paramsSearch.rentPerMonth.split(";").map(Number) : [this.minPrice, this.maxPrice]
                if (tempPrices.includes(-1)) {
                    this.rangePriceMax = `${convertNumberToCommas(this.maxPrice)}+`
                    if (tempPrices[0] === this.minPrice) {
                        this.price = "Price"
                        this.rangePrice = [this.minPrice, this.maxPrice]
                        this.rentPerMonth = this.minPrice + ";" + "-1"
                    } else if (tempPrices[0] === this.maxPrice) {
                        this.price = `Min $${convertNumberToCommas(tempPrices[0])}`
                        this.rentPerMonth = `${tempPrices[0]};-1`
                        this.rangePrice = [tempPrices[0], this.maxPrice]
                    } else {
                        this.price = `Min $${convertNumberToCommas(tempPrices[0])}`
                        this.rangePriceMax = `${convertNumberToCommas(this.rangePriceMax)}+`
                        this.rentPerMonth = `${tempPrices[0]};-1`
                        this.rangePrice = [tempPrices[0], this.maxPrice]
                    }
                } else {
                    if (tempPrices[1] === this.minPrice) {
                        this.price = `$0 - $${convertNumberToCommas(tempPrices[1])}`
                        this.rangePriceMin = "0"
                        this.rentPerMonth = `0;1000`
                        this.rangePrice = [this.minPrice, this.minPrice]
                    } else if (tempPrices[0] === this.minPrice) {
                        this.price = `Max $${convertNumberToCommas(tempPrices[1])}`
                        this.rentPerMonth = `${this.rangePrice[0]};${this.rangePrice[1]}`
                        this.rangePrice = [this.minPrice, tempPrices[1]]
                    } else {
                        this.price = `$${convertNumberToCommas(
                            tempPrices[0]
                        )} - $${convertNumberToCommas(tempPrices[1])}`
                        this.rentPerMonth = `${tempPrices[0]};${tempPrices[1]}`
                        this.rangePrice = [tempPrices[0], tempPrices[1]]
                    }
                }
                // console.log("tempPrices this.price ", this.price)
                // console.log("tempPrices this.rangePrice ", this.rangePrice)
                // console.log("tempPrices this.rentPerMonth ", this.rentPerMonth)
            }
        },
        onSearchListing() {
            // console.log("onSearchListing this.locationSearch", this.locationSearch)
            // if(this.category === "District"){
            //     this.districts = this.locationSearch
            // }else this.districts = ""
            // console.log("this.districts",this.districts);
            console.log("onSearchListing category ",this.category);
            const params = {
                propertyType: this.propertyType,
                livethereChecked: this.paramsSearch.livethereChecked,
                rentPerMonth: this.rentPerMonth,
                bedRooms: this.bedRooms,
                bathRooms: "0;-1",
                search: this.searchKey,
                sortBy: "Relevant",
                category: this.category,
                districts: this.districts,
                mrt: this.searchMRT,
                unitSize: "100;-1",
                page: 1,
                perPage: 4,
                projectId: null,
                selectAll : this.paramsSearch.selectAll
            }
            const paramsStringify = qs.stringify(params, { encode: false })
            // console.log("onSearchListing params", params)
            // console.log("onSearchListing params stringify", paramsStringify)
            if(this.paramsSearch){
                // console.log("check paramsSearch", this.paramsSearch);
                  this.$store
                .dispatch("project/searchListing", paramsStringify)
                .then((res) => {
                    if(res){
                        this.$store.commit("project/setParamsSearch", params)
                        this.$router.push(`/projects?${paramsStringify}`)
                    }
                    
                })
            }else {
                this.$store.commit("project/setParamsSearch", params)
                this.$router.push(`/projects?${paramsStringify}`)
            }
           

                
        },
        getDistricts(params){
            if(params){
                this.locationSearch = params.join(';')
                this.districts = this.locationSearch
                this.searchKey = ""
            }
            // console.log("locationSearch",this.locationSearch);
        },
        getMrt(params){
            if(params){
                this.locationSearch = params.join(';')
                this.searchMRT = this.locationSearch
                this.searchKey = ""
            }
            // console.log("this.mrt: ",this.searchMRT);
        },
        openLocationSearch(val){
            console.log("openLocationSearch val",val)
            // this.locationSearch = ""
            this.listAmenities = []
            this.category = val
            console.log("openLocationSearch this.category",this.category)
            if(val === "Mrt"){
                if(this.category === "Mrt"){
                    this.districts = ""
                    this.locationSearch = this.searchMRT ? this.searchMRT : ""
                }else {
                }
                this.isOpenDialogMrt = true

            }else {
                if(this.category === "District"){
                    this.searchMRT = ""
                    this.locationSearch = this.districts ? this.districts : ""
                }else {
                }
                this.isOpenDialogDistrict = true
            }
        },
        selectAmenity(item){
            // console.log("selectAmenity",item);
            this.category = item.category
            this.locationSearch = item.name
            this.searchKey = item.name
            this.searchMRT = ""
            this.districts = ""
            // this.listAmenities = []
            // console.log("selectAmenitycategory ",this.category);
        },
        keySearch: _.debounce(async function (payload){
            try {
                const response = await this.$apiCmsPublic.$get(`${httpEndpoint.projects.getAmenities}?name=${payload}`)
                // console.log("keySearch ;",response, response.length);
                if(response.length > 0){
                    this.listAmenities = response
                }else {
                    this.listAmenities = []
                }
            } catch (e) {
                console.log({ Error: e.message })
            }
        }, 200),
    },
    watch: {
        rangePrice(val) {
            this.rangePriceMin = convertNumberToCommas(this.rangePrice[0])
            this.rangePriceMax = this.rangePrice[1] === this.maxPrice ? `${convertNumberToCommas(this.rangePrice[1])}+` : convertNumberToCommas(this.rangePrice[1])
        },
        paramsSearch() {
            this.onFillExistingSearch()
        }
    }
}
</script>
<style lang="scss" scoped>
.list-amenities {
    cursor: pointer;
    .v-list-item__title {
        font-size: 1.6rem;
        color: var(--color-title-black);
        font-weight: 500;
    }
    .v-list-item__subtitle {
        font-size: 1.4rem;
        flex: 0 0 10rem;
        width: 10rem;
        max-width: 100%;
        text-align: right;
    }
}
.v-dialog__content {
    :deep(.dialog--mrt) {
        height: 90%;
    }
}

.text-custom {
    margin-left: 0.8rem;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: var(--color-title-black);
}
.list-location {
    padding: 0;
    .v-list-item__icon {
        margin-right: 0.8rem;
        margin-top: 1.4rem;
        margin-bottom: 1.4rem;
    }
    .v-list-item__title {
        font-size: 1.6rem;
        color: var(--color-title-black);
    }
    .v-list-item[role="menuitem"] {
        position: relative;
        // &:first-child::after{
        //     content: "";
        //     position: absolute;
        //     bottom: 0;
        //     left: 1.6rem;
        //     right: 1.6rem;
        //     height: 1px;
        //     min-height: 1px;
        //     top: auto;
        //     background-color: var(--border-color);
        // }
    }
}
.section--search {
    position: relative;
    z-index: 5;
    margin-top: -2.2rem;
    &__form {
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08);
        border-radius: 0.8rem;
        padding: 1.8rem 1.6rem;
        background-color: var(--color-white);
    }
    .form__field {
        label {
            font-weight: 500;
            font-size: 1.4rem;
            color: var(--color-label);
            margin-bottom: 0.8rem;
        }
        :deep(.v-input) {
            border-right: 1px solid var(--border-color);
            padding-right: 1.8rem;
            padding-top: 0.4rem;
            padding-bottom: 0.4rem;
            margin-top: 0;
            .v-input__slot {
                &::before {
                    border: 0 !important;
                }
            }
            .v-label {
                font-size: 1.4rem;
                color: var(--color-title-black);
            }
            .v-select__selection {
                font-size: 1.4rem;
                color: var(--color-title-black);
            }
            .v-input--range-slider {
                // margin-top: 0;
            }
            @media screen and (max-width: 960px) {
                // &:nth-child(even){
                //     :deep(.v-input) {
                //         border-right: 0;
                //     }
                // }
            }
            @media screen and (max-width: 767px) {
                border-right: 0;
                border-bottom: 1px solid var(--border-color);
            }
        }
        @media screen and (max-width: 1263px) {
            margin-bottom: 1.2rem;
        }
    }
    @media screen and (max-width: 1263px) {
        .btn--primary {
            margin-bottom: 1.2rem;
        }
    }
    @media screen and (max-width: 960px) {
        .col-auto {
            width: 100%;
        }
        .btn--primary {
            width: 100%;
            margin-top: 1rem;
        }
    }
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

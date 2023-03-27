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
                                    <v-select
                                        v-model="location"
                                        :items="locationTypes"
                                        item-text="title"
                                        item-value="value"
                                        required
                                        hide-details
                                        prepend-icon="icon-svg svg-location"
                                        placeholder="Search by..."
                                        @change="onOpenForm($event)"
                                    >
                                        <template v-slot:item="{ item }">
                                            <div class="border-bottom-custom">
                                                <v-icon>{{ getItemIcon(item) }}</v-icon>
                                                <span class="text-custom">{{
                                                    getItemTitle(item)
                                                }}</span>
                                            </div>
                                        </template>
                                    </v-select>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <div class="form__field">
                                    <label>Price</label>
                                    <v-menu
                                        ref="menu"
                                        :close-on-content-click="false"
                                        v-model="menu"
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
                                            ></v-text-field>
                                        </template>
                                        <v-card class="v-card--range">
                                            <v-card-title>Rent Per Month ($S)</v-card-title>
                                            <v-card-text>
                                                <v-range-slider
                                                    v-model="rangePrice"
                                                    :min="minPrice"
                                                    :max="maxPrice"
                                                    @change="updatePrice"
                                                    thumb-color="#f7f7f9"
                                                    track-fill-color="#EDB842"
                                                    track-color="#E5E5E5"
                                                    step="500"
                                                >
                                                    <template v-slot:prepend>
                                                        <v-text-field
                                                            :value="rangePriceMin"
                                                            hide-details
                                                            dense
                                                            prefix="$"
                                                            flat
                                                            solo
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
                                                            style="width: 65px"
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
                                    <v-select
                                        v-model="bedroom"
                                        :items="bedroomList"
                                        item-text="text"
                                        item-value="value"
                                        required
                                        hide-details
                                        prepend-icon="icon-svg svg-bedroom"
                                        placeholder="Select"
                                    ></v-select>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <div class="form__field">
                                    <label>Property Type</label>
                                    <v-select
                                        v-model="propertyType"
                                        :items="propertyTypeList"
                                        item-text="text"
                                        item-value="value"
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
    </section>
</template>
<script>
import { countries } from "~/ultilities/country"
import { LOCATION_TYPES } from "~/ultilities/contants/location"
import { PROPERTY_TYPE, BEDROOM_TYPE } from "~/ultilities/contants/asset-inventory.js"
import { convertNumberToCommas } from "~/ultilities/helpers"
export default {
    name: "HomeSearch",
    data() {
        return {
            location: "",
            countries: countries,
            locationTypes: LOCATION_TYPES,
            bedroom: "Studio",
            bedroomList: BEDROOM_TYPE,
            propertyTypeList: PROPERTY_TYPE,
            propertyType: "",
            menu: false,
            price: "",
            rangePrice: [1000, 20000],
            minPrice: 1000,
            maxPrice: 20000
        }
    },
    computed: {
        rangePriceMin() {
            return this.rangePrice[0] ? convertNumberToCommas(this.rangePrice[0]) : "0"
        },
        rangePriceMax() {
            return this.rangePrice[this.rangePrice.length - 1] === this.maxPrice
                ? convertNumberToCommas(this.rangePrice[this.rangePrice.length - 1]) + "+"
                : convertNumberToCommas(this.rangePrice[this.rangePrice.length - 1])
        },
        // rangeUnitSizeMin() {
        //     return this.rangeUnitSize[0] ? convertNumberToCommas(this.rangeUnitSize[0]) : "0"
        // },
        // rangeUnitSizeMax() {
        //     return this.rangeUnitSize[this.rangeUnitSize.length - 1] === this.maxUnitSize
        //         ? convertNumberToCommas(this.rangeUnitSize[this.rangeUnitSize.length - 1]) + "+"
        //         : convertNumberToCommas(this.rangeUnitSize[this.rangeUnitSize.length - 1])
        // }
    },
    methods: {
        getItemIcon(item) {
            return item.icon
        },
        getItemTitle(item) {
            return item.title
        },
        onOpenForm(e) {
            this.$emit("location", e)
        },
        onSearchListing() {
            const params = {
                location: this.location,
                price: this.price,
                bedroom: this.bedroom,
                propertyType: this.propertyType
            }
            this.$store.dispatch("project/searchListing", params)
            this.$router.push("/projects")
        },
        updatePrice() {
            this.price = this.rangePrice[0] + " - " + this.rangePrice[1]
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    // width: 1230px;
}
.text-custom {
    margin-left: 0.8rem;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: var(--color-title-black);
}
.v-list {
    :deep(.v-list-item) {
        &:first-child {
            .border-bottom-custom {
                width: 100%;
                height: 100%;
                position: relative;
                &::after {
                    content: "";
                    display: inline-block;
                    width: 15rem;
                    height: 0.1rem;
                    background: var(--border-color);
                    position: absolute;
                    bottom: -1.1rem;
                    left: 0;
                }
            }
        }
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
            .v-input__prepend-outer {
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
        @media screen and (max-width: 960px) {
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
    .v-card__title {font-size: 1.4rem;}
    .v-card__text {
        padding-left: 0;
        padding-right: 0;
    }
    :v-deep(.v-input--is-readonly){
        
    }
}
</style>

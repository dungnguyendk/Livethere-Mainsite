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
                                        :items="countries"
                                        item-text="countryName"
                                        item-value="countryName"
                                        required
                                        hide-details
                                        prepend-icon="icon-svg svg-location"
                                    ></v-select>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <div class="form__field">
                                    <label>Price</label>
                                    <v-select
                                        v-model="price"
                                        :items="countries"
                                        item-text="countryName"
                                        item-value="countryName"
                                        required
                                        hide-details
                                        prepend-icon="icon-svg svg-dollar-circle"
                                        label="Select"
                                    ></v-select>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <div class="form__field">
                                    <label>Bedroom</label>
                                    <v-select
                                        v-model="bedroom"
                                        :items="countries"
                                        item-text="countryName"
                                        item-value="countryName"
                                        required
                                        hide-details
                                        prepend-icon="icon-svg svg-bedroom"
                                        label="Select"
                                    ></v-select>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <div class="form__field">
                                    <label>Property Type</label>
                                    <v-select
                                        v-model="propertyType"
                                        :items="countries"
                                        item-text="countryName"
                                        item-value="countryName"
                                        required
                                        hide-details
                                        prepend-icon="icon-svg svg-buildings"
                                        label="Select"
                                    ></v-select>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="btn btn--primary btn--green">Search</v-btn>
                    </v-col>
                </v-row>
            </form>
        </div>
    </section>
</template>
<script>
import { countries } from "~/ultilities/country"
export default {
    name: "HomeSearch",
    data() {
        return {
            location: "SINGAPORE",
            countries: countries,
            price: "",
            bedroom: "",
            propertyType: ""
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    // width: 1230px;
}
.section--search {
    position: relative;
    z-index: 5;
    margin-top: -2.2rem;
    &__form {
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08);
        border-radius: 0.8rem;
        padding: 1.8rem 1.6rem;
        background-color: white;
    }
    .form__field {
        label {
            font-weight: 500;
            font-size: 1.4rem;
            color: var(--color-label);
            margin-bottom: .8rem;
        }
        :deep(.v-input) {
            border-right: 1px solid var(--border-color);
            padding-right: 1.8rem;
            padding-top: .4rem;
            padding-bottom: .4rem;
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
            margin-bottom: 1.2rem
        }
    }
    @media screen and (max-width: 960px) {
        .col-auto {
            width: 100%
        }
        .btn--primary {
            width: 100%;
            margin-top: 1rem;
        }
            
    } 
}
</style>

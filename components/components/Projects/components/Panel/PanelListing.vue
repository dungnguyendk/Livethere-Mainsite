<template>
    <div class="section--listing-expansion-panel">
        <v-expansion-panels flat v-model="panel" multiple>
            <v-expansion-panel
                expand
                v-model="panel"
                class="expansion-description expansion-panel-custom"
            >
                <v-expansion-panel-header expand-icon="mdi-menu-down">
                    Description
                    <template v-slot:actions>
                        <v-icon color="primary"> $expand </v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div v-html="details ? details.description : 'No content found'" class="text-custom"></div>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="expansion-property expansion-panel-custom">
                <v-expansion-panel-header expand-icon="mdi-menu-down">
                    Property Details
                    <template v-slot:actions>
                        <v-icon color="primary"> $expand </v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div class="expansion-property-row">
                        <p>monthly price:</p>
                        <p>S$ {{ projectDetails ? priceFormat : 0 }} </p>
                    </div>
                    <div class="expansion-property-row">
                        <p>unit size:</p>
                        <p>{{ projectDetails ? sizeFormat : 0 }} sqft </p>
                    </div>
                    <div class="expansion-property-row">
                        <p>monthly price PSF:</p>
                        <p>S$ {{ projectDetails ? pricePSFFormat : 0 }}</p>
                    </div>
                    <div class="expansion-property-row">
                        <p>lease term:</p>
                        <p>{{ projectDetails ? details.leaseTerm : 0 }} months </p>
                    </div>
                    <div class="expansion-property-row">
                        <p>furnishing:</p>
                        <p>{{ projectDetails ? details.unitFurnishingType : "" }}</p>
                    </div>
                    <div class="expansion-property-row">
                        <p>built year:</p>
                        <p>{{ projectDetails ? details.buildingYear : 0 }}</p>
                    </div>
                    <div class="expansion-property-row">
                        <p>tenure:</p>
                        <p>{{ projectDetails ? details.tenure : "" }}</p>
                    </div>
                    <div class="expansion-property-row">
                        <p>property type:</p>
                        <p>{{ projectDetails ? details.propertyType : 0 }}</p>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="expansion-available expansion-panel-custom">
                <v-expansion-panel-header expand-icon="mdi-menu-down">
                    Available from
                    <template v-slot:actions>
                        <v-icon color="primary"> $expand </v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div class="available-from-row">
                        <i class="icon-svg svg-calendar"></i>
                        <p>{{ details ? details.publishedDate : "" }}</p>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="expansion-amenities expansion-panel-custom">
                <v-expansion-panel-header expand-icon="mdi-menu-down">
                    Facilities
                    <template v-slot:actions>
                        <v-icon color="primary"> $expand </v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div class="expansion-amenities-row">
                        <template v-if="facilities.length > 0">
                            <div
                                class="expansion-amenities-column"
                                v-for="(item, index) in facilities"
                                :key="index"
                            >
                                <div> </div>
                                <div class="expansion-amenities-icon">
                                    <div v-html="item.svg"></div>
                                    <p>{{ item.label }}</p>
                                </div>
                            </div>
                        </template>
                        <div v-else> </div>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
import { convertNumberToCommas } from "~/ultilities/helpers"
// import { FACILITIES } from "~/ultilities/contants/dummy-data"
import { mapState } from "vuex"
export default {
    name: "PanelListing",
    props: {
        details: {
            type: Object,
            default: () => []
        }
    },
    computed: {
        ...mapState({
            projectDetails: (state) => state.project.projectDetails
        }),
        priceFormat() {
            return convertNumberToCommas(this.details.rentPrice)
        },
        sizeFormat() {
            let unitSize = this.details.unitSize?.replace(" Sqft", "")
            return convertNumberToCommas(unitSize)
        },
        pricePSFFormat() {
            return convertNumberToCommas(this.details.rentPerPsf)
        }
    },

    created() {
        this.facilities = this.projectDetails.facilities
        // console.log("this.projectDetails.facilities", this.facilities)
    },
    data() {
        return {
            panel: [0, 1, 2, 3],
            facilities: []
        }
    }
}
</script>

<style lang="scss" scoped>
.section--listing-expansion-panel {
    @media screen and (max-width: 820px) {
        .expansion-amenities-row {
            grid-template-columns: repeat(2, 1fr);
        }
    }
}
.expansion-panel-custom {
    border-bottom: 0.1rem solid var(--border-color);
    margin-top: 0;
    border-radius: 0 !important;
    background: transparent !important;
    .v-expansion-panel-header {
        font-weight: 700;
        font-size: 2rem;
        line-height: 2rem;
        padding: 0;
    }
    .v-expansion-panel-header__icon {
        i {
            font-size: 3.5rem;
        }
    }
    .v-expansion-panel-content {
        p {
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: var(--color-title-black);
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
    ::v-deep(.v-expansion-panel-content__wrap) {
        padding: 0 0 2.4rem;
    }
    &::before {
        box-shadow: none;
    }
    &:nth-child(4) {
        border-bottom: none;
    }
}
.text-custom {
    :deep(p) {
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--color-title-black);
    }
}
.expansion-property-row {
    display: flex;
    align-items: center;
    p {
        margin-bottom: 0;
        &:first-child {
            font-weight: 700;
            font-size: 1.6rem;
            line-height: 3.2rem;
            color: var(--color-label);
            text-transform: capitalize;
            margin-right: 6.4rem;
            width: 14.1rem;
        }
        &:last-child {
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 3.2rem;
            color: var(--color-title-black);
            text-align: left;
        }
    }
}
.available-from-row {
    display: flex;
    align-items: center;
    i {
        background-color: var(--color-title-black);
        margin-right: 0.8rem;
    }
    p {
        margin-bottom: 0;
    }
}
.expansion-amenities-icon {
    display: flex;
    align-items: center;
    margin-bottom: 1.7rem;
    p {
        margin-bottom: 0;
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--color-title-black);
        text-transform: capitalize;
        margin-left: 1.2rem;
    }
}
.expansion-amenities-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
</style>

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
                    <div v-html="details.description" class="text-custom"></div>
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
                        <p>S$ {{ priceFormat }} </p>
                    </div>
                    <div class="expansion-property-row">
                        <p>unit size:</p>
                        <p>{{ sizeFormat }} sqft </p>
                    </div>
                    <div class="expansion-property-row">
                        <p>monthly price PSF:</p>
                        <p>S$ {{ pricePSFFormat }}</p>
                    </div>
                    <div class="expansion-property-row">
                        <p>lease term:</p>
                        <p>{{ details.propertyDetails.leaseTerm }} months </p>
                    </div>
                    <div class="expansion-property-row">
                        <p>furnishing:</p>
                        <p>{{ details.propertyDetails.furnishing }}</p>
                    </div>
                    <div class="expansion-property-row">
                        <p>built year:</p>
                        <p>{{ details.propertyDetails.builtYear }}</p>
                    </div>
                    <div class="expansion-property-row">
                        <p>tenure:</p>
                        <p>{{ details.propertyDetails.tenure }}</p>
                    </div>
                    <div class="expansion-property-row">
                        <p>property type:</p>
                        <p>{{ details.propertyDetails.propertyType }}</p>
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
                        <p>{{ details.availableFrom }}</p>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="expansion-amenities expansion-panel-custom">
                <v-expansion-panel-header expand-icon="mdi-menu-down">
                    Amenities
                    <template v-slot:actions>
                        <v-icon color="primary"> $expand </v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div class="expansion-amenities-row">
                        <div
                            class="expansion-amenities-column"
                            v-for="(item, index) in details.facilities"
                            :key="index"
                        >
                            <div class="expansion-amenities-icon">
                                <i :class="item.icon"></i>
                                <p>{{ item.text }}</p>
                            </div>
                        </div>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
import { convertNumberToCommas } from "~/ultilities/helpers"
export default {
    name: "PanelListing",
    props: {
        details: {
            type: Object,
            default: () => []
        }
    },
    computed: {
        priceFormat() {
            return convertNumberToCommas(this.details.propertyDetails.monthlyPrice)
        },
        sizeFormat() {
            return convertNumberToCommas(this.details.propertyDetails.unitSize)
        },
        pricePSFFormat() {
            return convertNumberToCommas(this.details.propertyDetails.monthlyPricePSF)
        }
    },
    data() {
        return {
            panel: [0, 1, 2, 3]
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

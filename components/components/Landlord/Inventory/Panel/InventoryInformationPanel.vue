<template lang="html">
    <div class="panel--landlord panel--property-information">
        <div class="panel__top"><h3>Property Details</h3></div>
        <div class="panel__columns">
            <div class="panel__column">
                <p>
                    <span>House No:</span>
                    <strong>{{ inventoryDetails ? inventoryDetails.hseNo : "n/a" }}</strong>
                </p>
                <p>
                    <span>Unit No:</span>
                    <strong>{{ inventoryDetails ? inventoryDetails.unitNo : "n/a" }}</strong>
                </p>
                <p>
                    <span>No of Bedroom(s): </span>
                    <strong>{{
                        inventoryDetails ? inventoryDetails.bedroomTypeDisplay : "n/a"
                    }}</strong>
                </p>
            </div>
            <div class="panel__column">
                <p>
                    <span>Street name:</span>
                    <strong>{{ inventoryDetails ? inventoryDetails.streetName : "n/a" }}</strong>
                </p>
                <p>
                    <span>Project Name:</span>
                    <strong>{{ inventoryDetails ? inventoryDetails.projectName : "n/a" }}</strong>
                </p>
                <p>
                    <span>Property Type:</span>
                    <strong>{{
                        inventoryDetails ? inventoryDetails.propertyTypeDisplay : "n/a"
                    }}</strong>
                </p>
            </div>
            <div class="panel__column">
                <p>
                    <span>Postal Code:</span>
                    <strong>{{ inventoryDetails ? inventoryDetails.postalCode : "n/a" }}</strong>
                </p>
                <p>
                    <span>Tenure:</span>
                    <strong>{{ inventoryDetails ? inventoryDetails.tenureDisplay : "n/a" }}</strong>
                </p>
                <p>
                    <span>Floor Area (sqft):</span>
                    <strong>{{ inventoryDetails ? formatFloorArea + " sqft" : "n/a" }}</strong>
                </p>
                <p>
                    <span>Land Area (sqft):</span>
                    <strong>{{ inventoryDetails ? formatLandArea + " sqft" : "n/a" }}</strong>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import { convertNumberToCommas } from "~/ultilities/helpers"

export default {
    name: "InventoryInformationPanel",
    computed: {
        ...mapState({
            inventoryDetails: (state) => state.inventory.inventoryDetails
        }),
        formatFloorArea() {
            return convertNumberToCommas(this.inventoryDetails.floorAreaSqft)
        },
        formatLandArea() {
            return convertNumberToCommas(this.inventoryDetails.landAreaSqft)
        }
    }
}
</script>

<style lang="scss" scoped>
.panel--property-information {
    .panel__top {
        h3 {
            font-size: 2rem;
            color: var(--color-primary);
            font-weight: 700;
        }
    }

    .panel__column {
        p {
            grid-gap: 2.4rem;
            gap: 2.4rem;

            span {
                font-size: 1.6rem;
                font-weight: 500;
                padding-right: 1.2rem;
            }

            strong {
                font-size: 1.6rem;
                font-weight: 500;
                color: var(--color-heading);
            }

            &:not(:last-child) {
                margin-bottom: 0.4rem;
            }
        }
    }

    .panel__columns {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-gap: 2.4rem;
    }

    .panel__container {
        background-color: #fff;
    }

    @media screen and (min-width: 1280px) {
        .panel__column {
            p {
                font-size: 1.6rem;
            }
        }
    }

    @media screen and (max-width: 1279px) {
        .panel__top {
            h3 {
                font-size: 1.6rem;
            }
        }

        .panel__columns {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .panel__column {
            p {
                font-size: 1.6rem;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .panel__columns {
            grid-template-columns: minmax(0, 1fr);
        }
        p {
            span {
                font-size: 1.4rem;
            }

            strong {
                font-size: 1.4rem;
            }

            &:not(:last-child) {
                margin-bottom: 0.4rem;
            }
        }
    }
    @media screen and (max-width: 600px) {
        p {
            grid-gap: 2.4rem;
            gap: 2.4rem;

            span {
                font-weight: 500;
                padding-right: 1.2rem;
                font-size: 1.4rem;
            }

            strong {
                font-size: 1.4rem;
                font-weight: 500;
                color: var(--color-heading);
            }

            &:not(:last-child) {
                margin-bottom: 0.4rem;
            }
        }
    }
}
</style>

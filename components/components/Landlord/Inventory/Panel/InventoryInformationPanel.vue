<template lang="html">
    <div class="panel--landlord panel--property-information">
        <div class="panel__top"><h3>Property Details</h3></div>
        <div class="panel__columns">
            <div class="panel__column">
                <p>
                    <span>House No.:</span>
                    <strong>{{ inventoryDetails ? inventoryDetails.hseNo : "n/a" }}</strong>
                </p>
                <p>
                    <span>Unit No.:</span>
                    <strong>{{ inventoryDetails ? inventoryDetails.unitNo : "n/a" }}</strong>
                </p>
                <p>
                    <span>No. of Bedroom(s): </span>
                    <strong>{{
                        inventoryDetails ? inventoryDetails.bedroomTypeDisplay : "n/a"
                    }}</strong>
                </p>
            </div>
            <div class="panel__column">
                <p>
                    <span>Street Name:</span>
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
                    <strong>{{ inventoryDetails ? formatFloorArea : "n/a" }}</strong>
                </p>
                <p v-if="inventoryDetails.statusFID !== 3">
                    <span>Land Area (sqft):</span>
                    <strong>{{ inventoryDetails ? formatLandArea : "n/a" }}</strong>
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

    .panel__columns {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-gap: 2.4rem;
    }

    .panel__column {
        p {
            display: flex;
            //grid-gap: 2.4rem;
            //gap: 2.4rem;

            span {
                font-size: 1.6rem;
                font-weight: 500;
                // width: 14.7rem;
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

    .panel__column:nth-child(1) {
        p {
            span {
                min-width: 14.7rem;
            }
        }
    }

    .panel__column:nth-child(2) {
        p {
            span {
                min-width: 11.7rem;
            }
        }
    }

    .panel__column:nth-child(3) {
        p {
            span {
                min-width: 13.5rem;
            }
        }
    }

    .panel__container {
        background-color: #fff;
    }

    // @media screen and (min-width: 1280px) {
    //     .panel__column {
    //         p {
    //             font-size: 1.6rem;
    //         }
    //     }
    // }

    @media screen and (max-width: 1023px) {
        .panel__top {
            h3 {
                font-size: 1.6rem;
            }
        }
        .panel__columns {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-gap: 2.4rem;
            gap: 1.5rem;

            .panel__column {
                p {
                    font-size: 1.4rem;

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
        }
        .panel__column:nth-child(2) {
            p {
                span {
                    min-width: 10.5rem;
                }
            }
        }
        .panel__column:nth-child(1) {
            p {
                span {
                    min-width: 13rem;
                }
            }
        }
        .panel__column:nth-child(3) {
            p {
                span {
                    min-width: 13rem;
                }
            }
        }
    }

    @media screen and (max-width: 767px) {
        .panel__columns {
            grid-template-columns: minmax(0, 1fr);
            grid-gap: 2.4rem;
            gap: 1.5rem;
        }
        .panel__column:nth-child(2) {
            p {
                span {
                    min-width: 13rem;
                }
            }
        }
        .panel__column:nth-child(1) {
            p {
                span {
                    min-width: 13rem;
                }
            }
        }
        .panel__column:nth-child(3) {
            p {
                span {
                    min-width: 13rem;
                }
            }
        }
    }
    // @media screen and (max-width: 600px) {
    //     p {
    //         grid-gap: 2.4rem;
    //         gap: 2.4rem;

    //         span {
    //             font-weight: 500;
    //             padding-right: 1.2rem;
    //             font-size: 1.4rem;
    //         }

    //         strong {
    //             font-size: 1.4rem;
    //             font-weight: 500;
    //             color: var(--color-heading);
    //         }

    //         &:not(:last-child) {
    //             margin-bottom: 0.4rem;
    //         }
    //     }
    // }
}
</style>

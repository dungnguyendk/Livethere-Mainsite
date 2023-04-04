<template lang="html">
    <tr
        :class="`table--record ${
            source.id !== selectedId && selectedId !== -1 ? 'unSelected' : ''
        }`"
    >
        <td data-label="Property Name">
            <span class="first-child" @click="handleClickOpenRow(source.id)">
                {{ source.propertyType === 3 ? source.propertyName : source.projectName }}
            </span>
        </td>
        <td data-label="Unit No.">
            {{ source.unitNo ? source.unitNo : "-" }}
        </td>
        <td data-label="Purchase Date" class="purchase-date">
            {{ purchasedDateFormat }}
        </td>
        <td data-label="Purchase Price">
            {{ purchasedPriceFormat }}
        </td>
        <td data-label="Current Est. Value (AES OIS)">
            <span>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }" v-if="source.currentEstimatedValue">
                        <v-icon color="red" v-bind="attrs" v-on="on" class="icon-warning d-lg-none">
                            ri-error-warning-line
                        </v-icon>
                    </template>
                    <span>Provided by AES Technologies Online Indicative System</span>
                </v-tooltip>
                {{ currentEstimatedValueFormat }}
            </span>
        </td>
        <td data-label="Est. Capital Gain" class="td-custom">
            <v-tooltip bottom v-if="source.estimatedCapitalGain">
                <template v-slot:activator="{ on, attrs }">
                    <div
                        v-bind="attrs"
                        v-on="on"
                        :class="`growth growth--${
                            source.estimatedCapitalGainRate < 0 ? 'red' : 'green'
                        }`"
                    >
                        <i
                            :class="`ri-arrow-${
                                source.estimatedCapitalGainRate < 0 ? 'down' : 'up'
                            }-s-fill`"
                        ></i>
                        <span class="percent">{{ source.estimatedCapitalGainRate }}%</span>
                    </div>
                </template>
                <span>
                    Est Capital Gain <br />
                    Current Est. Value / Purchase Price
                </span>
            </v-tooltip>
            <!-- <div :class="`growth growth--${source.estimatedCapitalGainRate < 0 ? 'red' : 'green'}`"
                v-if="source.estimatedCapitalGain">
                <i :class="`ri-arrow-${source.estimatedCapitalGainRate < 0 ? 'down' : 'up'}-s-fill`"></i>
                <span class="percent">{{ source.estimatedCapitalGainRate }}%</span>
            </div> -->
            {{ estimatedCapitalGainFormat }}
        </td>
        <td data-label="Monthly Rental">
            {{ monthlyRentalFormat }}
        </td>
        <td data-label="Gross Rental Yield"> {{ rentalYieldFormat }} %</td>
    </tr>
</template>
<script>
import { convertNumberToCommas } from "~/ultilities/helpers"

export default {
    name: "AssetAnalyticsTableRecord",
    props: {
        source: {
            type: Object,
            default: () => null
        },
        selectedId: {
            type: Number,
            default: () => -1
        }
    },
    data() {
        return {}
    },
    computed: {
        purchasedDateFormat() {
            return this.source.purchasedDate ? this.formatDate(this.source.purchasedDate) : "-"
        },
        purchasedPriceFormat() {
            return this.source.purchasedPrice
                ? `S$ ${convertNumberToCommas(this.source.purchasedPrice)}`
                : "-"
        },
        currentEstimatedValueFormat() {
            return this.source.currentEstimatedValue
                ? `S$ ${convertNumberToCommas(this.source.currentEstimatedValue)}`
                : "-"
        },
        estimatedCapitalGainFormat() {
            return this.source.estimatedCapitalGain
                ? `S$ ${convertNumberToCommas(this.source.estimatedCapitalGain)}`
                : "-"
        },
        monthlyRentalFormat() {
            return this.source.monthlyRental
                ? `S$ ${convertNumberToCommas(this.source.monthlyRental)}`
                : "-"
        },
        rentalYieldFormat() {
            return this.source.rentalYield ? this.source.rentalYield.toFixed(2) : 0
        }
    },
    methods: {
        handleClickOpenRow(item) {
            this.$emit("handleClickOpenRow", item)
        },
        formatDate(date) {
            if (!date) return null

            return this.$moment(date).format("DD-MMM-YYYY")
        }
    }
}
</script>
<style lang="scss" scoped>
.purchase-date {
    white-space: nowrap;
}

.table--record {
    td {
        text-align: center;
    }

    td:nth-child(-n + 4) {
        text-align: left;
    }

    td:nth-child(6) {
        text-align: right;

        // @media only screen and (max-width: 768px) {
        //     width: auto;
        // }

        // @media only screen and (min-width: 768px) and (max-width: 1280px) {
        //     width: auto;
        // }
    }

    &.unSelected {
        display: none !important;
    }
}

.td-custom {
    position: relative;
}

@media only screen and (min-width: 820px) and (max-width: 1280px) {
    .percent {
        font-size: 1.2rem;
    }

    .growth {
        right: 0.6rem !important;
    }
}

.growth {
    position: absolute;
    top: 0;
    right: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    i {
        font-size: 2.4rem;
        line-height: normal;
    }

    &--red {
        color: #ff4a55;
    }

    &--green {
        color: #27a857;
    }
}
</style>

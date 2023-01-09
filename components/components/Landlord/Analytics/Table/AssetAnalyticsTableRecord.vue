<template lang="html">
    <tr :class="`table--record ${source.id !== selectedId && selectedId !== -1 ? 'unSelected' : ''}`">
        <td data-label="Property Name">
            <span class="first-child" @click="handleClickOpenRow(source.id)">
                {{ source.propertyType === 3 ? source.propertyName : source.projectName }}
            </span>
        </td>
        <td data-label="Unit No.">
            {{ source.unitNo ? source.unitNo : '-' }}
        </td>
        <td data-label="Purchase Date">
            {{ purchasedDateFormat }}
        </td>
        <td data-label="Purchase Price">
            {{ purchasedPriceFormat }}
        </td>
        <td data-label="Current Estimated Value">
            {{ currentEstimatedValueFormat }}
        </td>
        <td data-label="Estimated Capital Gain" class="td-custom">
            <div :class="`growth growth--${source.estimatedCapitalGainRate < 0 ? 'red' : 'green'}`"
                v-if="source.estimatedCapitalGain">
                <i :class="`ri-arrow-${source.estimatedCapitalGainRate < 0 ? 'down' : 'up'}-s-fill`"></i>
                <span class="percent">{{ source.estimatedCapitalGainRate }}%</span>
            </div>
            {{ estimatedCapitalGainFormat }}
        </td>
        <td data-label="Rental Yield">
            {{ rentalYieldFormat }} %
        </td>
    </tr>
</template>
<script>
import { convertNumberToCommas } from "~/ultilities/helpers"
export default {
    name: "AssetAnalyticsTableRecord",
    props: {
        source: {
            type: Object,
            default: () => { }
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
            return this.source.purchasedDate ? this.formatDate(this.source.purchasedDate) : '-'
        },
        purchasedPriceFormat() {
            return this.source.purchasedPrice ? `SGD ${convertNumberToCommas(this.source.purchasedPrice)}` : '-'
        },
        currentEstimatedValueFormat() {
            return this.source.currentEstimatedValue ? `SGD ${convertNumberToCommas(this.source.currentEstimatedValue)}` : '-'
        },
        estimatedCapitalGainFormat() {
            return this.source.estimatedCapitalGain ? `SGD ${convertNumberToCommas(this.source.estimatedCapitalGain)}` : '-'
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
        },
    }
}
</script>
<style lang="scss" scoped>
.table--record {
    td {
        text-align: center;
    }

    td:nth-child(-n + 4) {
        text-align: left;
    }

    // td:nth-child(6) {
    //     width: 30rem;

    //     @media only screen and (max-width: 768px) {
    //         width: auto;
    //     }

    //     @media only screen and (min-width: 768px) and (max-width: 1280px) {
    //         width: auto;
    //     }
    // }

    &.unSelected {
        display: none !important;
    }
}

.td-custom {
    position: relative;
}

.growth {
    position: absolute;
    top: 0;
    right: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    &--red {
        color: #FF4A55;
    }

    &--green {
        color: #27A857;
    }
}
</style>

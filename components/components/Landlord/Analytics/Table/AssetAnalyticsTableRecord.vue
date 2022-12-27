<template lang="html">
    <tr
        :class="`table--record ${
            source.id !== selectedId && selectedId !== -1 ? 'unSelected' : ''
        }`"
    >
        <td data-label="Property Name">
            <span class="first-child" @click="handleClickOpenRow(source.id)">
                {{ source.propertyName }}
            </span>
        </td>
        <td data-label="Unit No.">
            {{ source.unitNo }}
        </td>
        <td data-label="Purchase Date">
            {{ source.purchaseDate }}
        </td>
        <td data-label="Purchase Price">
            {{ source.purchasePrice }}
        </td>
        <td data-label="Current Estimated Value">
            {{ source.currentEstimatedValue }}
        </td>
        <td data-label="Estimated Capital Gain">
            {{ source.estimatedCapitalGain }}
        </td>
        <td data-label="Rental Yield">
            {{ source.rentalYield }}
        </td>
    </tr>
</template>
<script>
export default {
    name: "AssetAnalyticsTableRecord",
    props: {
        source: {
            type: Object,
            default: () => {}
        },
        selectedId: {
            type: Number,
            default: () => -1
        }
    },
    data() {
        return {}
    },
    methods: {
        handleClickOpenRow(item) {
            this.$emit("handleClickOpenRow", item)
        }
    }
}
</script>
<style lang="scss" scss>
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
</style>

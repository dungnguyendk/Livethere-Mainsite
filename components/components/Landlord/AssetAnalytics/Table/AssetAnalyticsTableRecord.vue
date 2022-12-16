<template lang="html">
    <tr :class="`table--record ${source.id !== selectedId && selectedId !== -1 ? 'unSelected' : ''}`">
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
            default: () => { }
        },
        selectedId: {
            type: Number,
            default: () => -1
        }
    },
    data() {
        return {
        }
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
    &.unSelected {
        display: none !important;
    }
}
</style>
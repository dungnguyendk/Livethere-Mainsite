<template lang="html">
    <table class="table--responsive table--tenancy-info">
        <thead>
            <tr>
                <th id="description">Name </th>
                <th id="quantity">Quantity</th>
                <th id="totalValue">Total Value</th>
                <!-- <th id="conditionRemarks">Condition Remarks</th> -->
                <th></th>
            </tr>
        </thead>
        <tbody>
            <template v-if="inventory.length > 0">
                <TenancyInventoryRecord
                    v-for="(item, index) in inventory"
                    :source="item"
                    :key="index"
                />
            </template>
            <template v-else>
                <tr>
                    <td colspan="4">
                        <p class="empty">No record found.</p>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script>
import TenancyInventoryRecord from "./TenancyUnitInventoryRecord.vue"
import { mapState } from "vuex"
export default {
    name: "TenancyInventoryTable",
    components: { TenancyInventoryRecord },
    computed: {
        ...mapState({
            inventory: (state) => state.inventory.units
        })
    }
}
</script>
<style lang="scss" scoped>
.table--tenancy-info {
    width: 100%;
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-sizing: border-box;
    background-color: var(--color-white);
    border-width: 0px 1px 1px 1px;
    border-style: solid;
    border-color: #e5e5e5;
    thead {
        justify-content: space-between;
        tr {
            position: relative;
        }
        th {
            padding: 1.5rem 2.4rem 1.5rem;
            background-color: var(--color-menu);
            font-family: var(--font-primary);
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            color: var(--color-white);
        }
    }
    // th:nth-child(1) {
    //     min-width: 27.2rem;
    // }
    // th:nth-child(2) {
    //     min-width: 21.2rem;
    // }
    th:nth-child(3) {
        display: flex;
        flex-wrap: nowrap;
    }
}
@media (max-width: 768px) {
    .table--responsive tbody tr {
        margin-bottom: 0;
        border-top: 1px solid #e5e5e5;
    }
    table {
        width: 100%;
    }
    tr td {
        display: block;
    }
    th {
        font-size: 1.4rem;
    }
    tbody {
        display: block;
    }
    thead {
        display: none;
    }
}
</style>

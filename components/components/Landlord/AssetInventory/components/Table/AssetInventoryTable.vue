<template lang="html">
    <div class="asset-analytic">
        <table class="table--responsive table--asset">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Unit No.</th>
                    <th v-if="statusFID === 0 || statusFID === 1">Property Type</th>
                    <th v-if="statusFID === 0 || statusFID === 1">Bedroom Type</th>
                    <th v-if="statusFID === 0 || statusFID === 1">Floor Area (sqft)</th>
                    <th v-if="statusFID === 0 || statusFID === 1">Land Area (sqft)</th>
                    <th>Address</th>
                    <th v-if="statusFID === 0 || statusFID === 1">Status</th>
                    <th v-if="statusFID === 2">Estimated Market Rent</th>
                    <th v-if="statusFID === 2">Asking Rent</th>
                    <th v-if="statusFID === 3">Monthly Rent</th>
                    <th v-if="statusFID === 3">Annual Revenue</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <template v-if="inventories.length > 0">
                    <TableRecord
                        v-for="item in inventories"
                        :source="item"
                        :selectedId="selectedId"
                        :key="item.id"
                        @handleClickOpenRow="handleClickOpenRow"
                    />
                    <template v-if="(statusFID === 2 || statusFID === 3) && selectedId === -1">
                        <tr class="tr-hidden">
                            <td></td>
                        </tr>
                        <tr class="tr-total">
                            <td colspan="4">Grand Total Revenue:</td>
                            <td colspan="2"><span>$ 72,000</span></td>
                        </tr>
                    </template>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="9">
                            <p class="empty">No data found!</p>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <!--        <slide-up-down :active="showExpandedPanel" :duration="300">
            <ExpandedPanel @onClose="onCloseExpandedPanel" />
        </slide-up-down>-->
    </div>
</template>

<script>
import TableRecord from "~/components/components/Landlord/AssetInventory/components/Table/TableRecord.vue"
import ExpandedPanel from "~/components/shared/Panel/ExpandedPanel.vue"
import { mapState } from "vuex"
export default {
    name: "AssetInventoryTable",
    components: { TableRecord, ExpandedPanel },
    props: {},
    data() {
        return {
            showExpandedPanel: false,
            selectedId: -1
        }
    },
    computed: {
        ...mapState({
            inventories: (state) => state.inventories.inventories,
            statusFID: (state) => state.inventories.typeSelect
        })
    },
    created() {
        console.log("inventories::", this.inventories)
    },
    methods: {
        onCloseExpandedPanel() {
            this.selectedId = -1
            this.showExpandedPanel = false
        },
        handleClickOpenRow(item) {
            this.$emit("handleClickOpenRow", item)
            this.selectedId = item
            this.showExpandedPanel = true
        }
    },
    watch: {}
}
</script>
<style lang="scss" scoped>
.asset-analytic {
    padding: (32/1920) * 100% (278/1920) * 100% (126/1920) * 100% (278/1920) * 100%;

    @media only screen and (max-width: 768px) {
        padding: 0;
    }

    @media only screen and (min-width: 768px) and (max-width: 1280px) {
        padding: 0;
    }
}

.table--asset {
    thead {
        th {
            text-align: left;
            min-width: 10rem;
        }
    }
}

.tr-hidden {
    border: 0rem solid !important;

    td {
        padding: 1.2rem 1.6rem !important;
    }
}

.tr-total {
    border: 1px solid var(--color-menu);
    background: rgba(0, 99, 79, 0.05);

    td {
        padding: 1.6rem;
        color: var(--color-title-black);
        font-weight: 700;
        font-size: 1.8rem;
        line-height: 2.8rem;

        span {
            color: var(--color-menu);
            font-weight: 800;
            font-size: 2rem;
            line-height: 2.8rem;
        }
    }
}

@media only screen and (max-width: 768px) {
    .tr-total {
        display: flex !important;
        justify-content: space-between !important;

        td {
            font-size: 1.6rem;

            span {
                font-size: 1.6rem;
            }

            // &:last-child {
            //     display: none;
            // }
        }
    }
}

@media only screen and (min-width: 768px) and (max-width: 1280px) {
    .table--asset {
        thead {
            th {
                min-width: 0;

                &:nth-child(2) {
                    min-width: 10rem;
                }
            }
        }
    }
}

@media only screen and (min-width: 1280px) and (max-width: 1440px) {
    .tr-total {
        td {
            font-size: 1.4rem;

            span {
                font-size: 1.6rem;
            }
        }
    }
}
</style>

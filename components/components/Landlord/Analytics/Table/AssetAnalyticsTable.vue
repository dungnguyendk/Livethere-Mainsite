<template lang="html">
    <div class="asset-analytic">
        <table class="table--responsive table--asset">
            <thead>
                <tr>
                    <th>Property Name</th>
                    <th>Unit No.</th>
                    <th>Purchase Date</th>
                    <th>Purchase Price</th>
                    <th>Current Est Value</th>
                    <th>Est Capital Gain</th>
                    <th>Monthly Rental</th>
                    <th>Gross Rental Yield</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="analytics && analytics.length > 0">
                    <AssetAnalyticsTableRecord v-for="item in analytics" :source="item" :selectedId="selectedId"
                        :key="item.id" @handleClickOpenRow="handleClickOpenRow" />
                </template>
                <template v-else>
                    <tr>
                        <td colspan="8">
                            <p class="empty">No data found!</p>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <slide-up-down :active="showExpandedPanel" :duration="300">
            <ExpandedPanel @onClose="onCloseExpandedPanel" />
        </slide-up-down>
    </div>
</template>
<script>
import AssetAnalyticsTableRecord from "./AssetAnalyticsTableRecord.vue"
import ExpandedPanel from "~/components/shared/Panel/ExpandedPanel.vue"
import { mapState } from "vuex"
export default {
    name: "AssetAnalyticsTable",
    components: { AssetAnalyticsTableRecord, ExpandedPanel },
    data() {
        return {
            // items: [
            //     {
            //         id: 1,
            //         propertyName: "Lloyd Sixtyfive",
            //         unitNo: "08-10",
            //         purchaseDate: "26/11/2022",
            //         purchasePrice: "SGD 1,200,000",
            //         currentEstimatedValue: "SGD 1,500,000",
            //         estimatedCapitalGain:
            //             "SGD 120,000 - SGD 150,000 SGD 120,000 - SGD 150,000 SGD 120,000 - SGD 150,000",
            //         rentalYield: "1.2%"
            //     },
            //     {
            //         id: 2,
            //         propertyName: "Skypark @ Somerset",
            //         unitNo: "02-96",
            //         purchaseDate: "05/02/2021",
            //         purchasePrice: "SGD 1,000,000",
            //         currentEstimatedValue: "SGD 1,200,000",
            //         estimatedCapitalGain: "SGD 120,000 - SGD 150,000",
            //         rentalYield: "0.8%"
            //     },
            //     {
            //         id: 3,
            //         propertyName: "Lloyd Sixtyfive",
            //         unitNo: "08-10",
            //         purchaseDate: "26/11/2022",
            //         purchasePrice: "SGD 1,200,000",
            //         currentEstimatedValue: "SGD 1,500,000",
            //         estimatedCapitalGain: "SGD 120,000 - SGD 150,000",
            //         rentalYield: "1.2%"
            //     },
            //     {
            //         id: 4,
            //         propertyName: "Lloyd Sixtyfive",
            //         unitNo: "08-10",
            //         purchaseDate: "26/11/2022",
            //         purchasePrice: "SGD 1,200,000",
            //         currentEstimatedValue: "SGD 1,500,000",
            //         estimatedCapitalGain: "SGD 120,000 - SGD 150,000",
            //         rentalYield: "1.2%"
            //     },
            //     {
            //         id: 5,
            //         propertyName: "Lloyd Sixtyfive",
            //         unitNo: "08-10",
            //         purchaseDate: "26/11/2022",
            //         purchasePrice: "SGD 1,200,000",
            //         currentEstimatedValue: "SGD 1,500,000",
            //         estimatedCapitalGain: "SGD 120,000 - SGD 150,000",
            //         rentalYield: "1.2%"
            //     },
            //     {
            //         id: 6,
            //         propertyName: "Lloyd Sixtyfive",
            //         unitNo: "08-10",
            //         purchaseDate: "26/11/2022",
            //         purchasePrice: "SGD 1,200,000",
            //         currentEstimatedValue: "SGD 1,500,000",
            //         estimatedCapitalGain: "SGD 120,000 - SGD 150,000",
            //         rentalYield: "1.2%"
            //     }
            // ],
            showExpandedPanel: false,
            selectedId: -1
        }
    },
    computed: {
        ...mapState({
            analytics: (state) => state.analytics.analytics
        })
    },
    methods: {
        onCloseExpandedPanel() {
            this.selectedId = -1
            this.showExpandedPanel = false
        },
        handleClickOpenRow(item) {
            /* this.$emit("handleClickOpenRow", item)
             this.selectedId = item
             this.showExpandedPanel = true*/
        }
    }
}
</script>
<style lang="scss" scoped>
.table--asset {
    thead {
        th:nth-child(-n + 4) {
            text-align: left;
        }

        th {
            text-align: center;
        }
    }

    tbody {
        tr:nth-child(even) {
            background-color: var(--bg-color-white);
        }
    }
}

.asset-analytic {
    padding: (32/1920) * 100% (278/1920) * 100% (126/1920) * 100% (278/1920) * 100%;

    @media only screen and (max-width: 768px) {
        padding: 0;
    }
}
</style>

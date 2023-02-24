<template lang="html">
    <div class="container">
        <table class="table--responsive table--asset">
            <thead>
                <tr>
                    <th>Property Name</th>
                    <th>Unit No.</th>
                    <th>Purchase Date</th>
                    <th>Purchase Price</th>
                    <th>Current Est. Value <br />(AES OIS)
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon color="yellow" v-bind="attrs" v-on="on" class="icon-warning">
                                    ri-error-warning-line
                                </v-icon>
                            </template>
                            <span>Provided by AES Technologies Online Indicative System</span>
                        </v-tooltip>
                    </th>
                    <th>Est. Capital Gain</th>
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

.icon-warning {
    font-size: 1.8rem !important;
}
</style>

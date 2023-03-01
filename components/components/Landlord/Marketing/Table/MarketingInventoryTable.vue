<template lang="html">
    <div class="asset__table">
        <table class="table--responsive table--asset">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Unit No.</th>
                    <th>Property Type</th>
                    <th>Bedroom Type</th>
                    <th>Floor Area (sqft)</th>
                    <th>Land Area (sqft)</th>
                    <th>Address<br />Location</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <template v-if="marketings.length > 0">
                    <TableRecord v-for="item in marketings" :source="item" :key="item.id"
                        @handleClickOpenRow="handleClickOpenRow(item)" />
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
    </div>
</template>

<script>
import TableRecord from "~/components/components/Landlord/Marketing/Table/TableRecord.vue"
import { convertNumberToCommas } from "~/ultilities/helpers"
import { mapState } from "vuex"

export default {
    name: "MarketingInventoryTable",
    components: { TableRecord },
    props: {},
    data() {
        return {
            showExpandedPanel: false,
            selectedId: -1
        }
    },
    computed: {
        ...mapState({
            marketings: (state) => state.marketing.marketings,
        }),
    },
    created() {
    },
    methods: {
        handleClickOpenRow(item) {
            this.$router.push(`/tenancy/${item.internalID}`)
        },
        formatMoney(number) {
            if (number || number === 0) return convertNumberToCommas(number);
            return "0";
        },
    },
    watch: {}
}
</script>
<style lang="scss" scoped>
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

        @media only screen and (min-width: 768px) and (max-width: 1280px) {
            padding: 0.6rem 0.8rem !important;
        }
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

.asset__table {
    padding: 6rem 0;

    @media only screen and (max-width: 768px) {
        padding: 1rem 0;
    }

    @media only screen and (min-width: 768px) and (max-width: 1280px) {
        padding: 1rem 0;
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

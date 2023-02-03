<template>
    <tr :class="`table--record ${source.id !== selectedId && selectedId !== -1 ? 'unSelected' : ''
    }`">
        <td data-label="Property">
            <div>
                <img :src="require(`~/static/img/${source.propertyType === 1 ? 'condo' : source.propertyType === 2 ? 'apt' : 'landed'}.png`)"
                    alt="" class="table--record__img" />
                <p class="first-child" @click="handleClickOpenRow(source.internalID)">
                    {{
                        source.id ? ((source.propertyType === 1 || source.propertyType === 2) ? source.projectName :
                            source.propertyName) : "-"
                    }}
                </p>
            </div>
        </td>
        <td data-label="Unit No.">
            {{ source.unitNo ? source.unitNo : "-" }}
        </td>
        <td data-label="Property Type" v-if="statusFID === 0 || statusFID === 1">
            {{ source.propertyTypeDisplay }}
        </td>
        <td data-label="Bedroom Type" v-if="statusFID === 0 || statusFID === 1">
            {{ source.bedroomTypeDisplay ? source.bedroomTypeDisplay : "-" }}
        </td>
        <td data-label="Floor Area (sqft)" v-if="statusFID === 0 || statusFID === 1">
            {{ source.floorAreaSqft ? floorAreaSqftFormatter : "-" }}
        </td>
        <td data-label="Land Area (sqft)" v-if="statusFID === 0 || statusFID === 1">
            {{ source.landAreaSqft ? landAreaSqftFormatter : "-" }}
        </td>
        <td data-label="Address">
            {{ source.streetName }}
        </td>
        <td data-label="Status" v-if="statusFID === 0 || statusFID === 1">
            <a @click="handleClickOpenRow(source.internalID)">
                <AssetInventoryBadge :type="source.statusDisplay ? source.statusDisplay.toUpperCase() : ''"
                    :source="source" />
            </a>
        </td>
        <td data-label="Estimated Market Rent" v-if="statusFID === 2">
            {{ source.askingPrice ? askingPriceFormatter : '-' }}
        </td>
        <td data-label="Asking Rent" v-if="statusFID === 2">
            {{ source.estimatedMarketRent ? estimatedMarketRentFormatter : '-' }}
        </td>
        <td data-label="Monthly Rent" v-if="statusFID === 3">
            {{ source.tenancyDetail ? monthRentalFormatter : '-' }}
        </td>
        <td data-label="Annual Revenue" v-if="statusFID === 3">
            {{ source.tenancyDetail ? estimatedAnnualRevenueFormatter : '-' }}
        </td>
        <td data-label="Action">
            <div>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn x-small fab outlined class="more-option" v-bind="attrs" v-on="on"><i
                                class="ri-more-fill"></i></v-btn>
                    </template>
                    <v-list dense>
                        <v-list-item-group>
                            <v-list-item @click="onEditInventory(source.id)" class="list-item--custom"
                                v-if="(statusFID === 0 || statusFID === 1) && (source.statusFID === 0 || source.statusFID === 1)">
                                <v-list-item-icon>
                                    <v-icon v-text="`ri-edit-box-line`"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Edit</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item @click="onVisitInventoryUnits" class="list-item--custom--middle">
                                <v-list-item-icon>
                                    <v-icon v-text="`ri-add-box-line`"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Unit Inventory</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item @click="deleteDialog = true" class="list-item--custom"
                                v-if="(statusFID === 0 || statusFID === 1) && (source.statusFID === 0 || source.statusFID === 1)">
                                <v-list-item-icon>
                                    <v-icon v-text="`ri-delete-bin-line`"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Delete</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-menu>
            </div>
            <Dialog :open="openAddNewInventoryDialog" @close="closeDialog" :size="sizeDialog" :title="''"
                :actions="false">
                <AddInventoryForm @close="openAddNewInventoryDialog = false" v-if="openAddNewInventoryDialog"
                    :sourceDetail="source.id" />
            </Dialog>
            <DeleteDialog :open="deleteDialog" size="large" type="full" @close="deleteDialog = false"
                @onSubmit="onDeleteInventory(source.id)" />
        </td>
    </tr>
</template>

<script>
import AssetInventoryBadge from "~/components/components/Landlord/AssetInventory/components/AssetInventoryBadge.vue"
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import DeleteDialog from "~/components/elements/Dialog/DeleteDialog.vue"
import AddInventoryForm from "~/components/components/Landlord/AssetInventory/components/Dialog/Form/AddInventoryForm.vue"
import { convertNumberToCommas } from "~/ultilities/helpers"
import { mapState } from "vuex"
import qs from "qs"

export default {
    name: "TableRecord",
    components: { AssetInventoryBadge, Dialog, AddInventoryForm, DeleteDialog },
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
            openAddNewInventoryDialog: false,
            sizeDialog: "large",
            // floorAreaSqftFormatter: "",
            // landAreaFormatter: "",
            deleteDialog: false,
        }
    },
    computed: {
        ...mapState({
            statusFID: (state) => state.inventories.typeSelect
        }),
        floorAreaSqftFormatter() {
            return this.source.floorAreaSqft ? convertNumberToCommas(this.source.floorAreaSqft) : ''
        },
        landAreaSqftFormatter() {
            return this.source.landAreaSqft ? convertNumberToCommas(this.source.landAreaSqft) : ''
        },
        askingPriceFormatter() {
            return this.source.askingPrice ? "$ " + convertNumberToCommas(this.source.askingPrice) : ''
        },
        estimatedMarketRentFormatter() {
            return this.source.estimatedMarketRent ? "$ " + convertNumberToCommas(this.source.estimatedMarketRent) : ''
        },
        monthRentalFormatter() {
            return this.source.tenancyDetail.monthRental ? "$ " + convertNumberToCommas(this.source.tenancyDetail.monthRental) : ''
        },
        estimatedAnnualRevenueFormatter() {
            return this.source.tenancyDetail.estimatedAnnualRevenue ? "$ " + convertNumberToCommas(this.source.tenancyDetail.estimatedAnnualRevenue) : ''
        }

    },
    created() {
        // this.floorAreaSqftFormatter = convertNumberToCommas(this.source.floorAreaSqft)
        // this.landAreaFormatter = convertNumberToCommas(this.source.landArea)
    },
    methods: {
        handleClickOpenRow(item) {
            this.$emit("handleClickOpenRow", item)
        },
        onVisitInventoryUnits() {
            this.$router.push(`/landlord/assets/units/${this.source.internalID}`)
        },
        onEditInventory(item) {
            this.$store.dispatch("inventories/getDetailInventory", item).then(() => {
                this.openAddNewInventoryDialog = true
            })
            // console.log("OnEdit", item)
        },
        onDeleteInventory(item) {
            const param = {
                data: {
                    id: item
                }
            }
            this.$store.dispatch("inventories/deleteInventory", param).then(() => {
                const paramStatusFID = qs.stringify({
                    StatusFID: this.typeSelected
                })
                this.$store.dispatch("inventories/getInventories", paramStatusFID)
            })
        },
        closeDialog() {
            this.$store.commit("inventories/setInventoryDetail", "")
            this.openAddNewInventoryDialog = false
            // this.$router.push(`/landlord/assets/units/${this.source.internalID}`)
        }
    },
    watch: {
        // source() {
        //     this.floorAreaSqftFormatter = convertNumberToCommas(this.source.floorAreaSqft)
        //     this.landAreaFormatter = convertNumberToCommas(this.source.landArea)
        // },
    }
}
</script>
<style lang="scss" scoped>
.table--record {
    &.unSelected {
        display: none !important;
    }

    &__img {
        width: 10rem;
        height: 6.4rem;
        border-radius: 0.6rem;
    }

    p {
        line-height: unset;
        margin-top: 1.2rem;
        margin-bottom: 0 !important;
    }

    td {
        padding: 1.2rem 1.6rem !important;
        text-align: left;
        vertical-align: top;
    }
}

.more-option {
    &:before {
        background-color: rgba(236, 184, 66, 0.6);
    }

    background-color: rgba(236, 184, 66, 0.1);
    border: 1px solid var(--color-yellow);
    border-radius: 0.8rem;

    i {
        color: var(--color-yellow);
        font-size: 2.4rem;
    }
}

.list-item--custom {
    height: 3.5rem;

    &--middle {
        border-color: #e9e9e9;
        border-top: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
    }
}
</style>

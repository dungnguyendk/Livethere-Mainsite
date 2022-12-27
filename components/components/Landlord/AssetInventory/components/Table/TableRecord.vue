<template>
    <tr :class="`table--record ${source.id !== selectedId && selectedId !== -1 ? 'unSelected' : ''
    }`">
        <td data-label="Property">
            <div>
                <img
                    src="https://picsum.photos/600/400.jpg?random="
                    alt=""
                    class="table--record__img"
                />
                <p class="first-child" @click="handleClickOpenRow(source.internalID)">
                    {{ source.propertyName }}
                </p>
            </div>
        </td>
        <td data-label="Unit No.">
            {{ source.unitNo }}
        </td>
        <td data-label="Property Type" v-if="statusFID === 0 || statusFID === 1">
            {{ source.propertyTypeDisplay }}
        </td>
        <td data-label="Bedroom Type" v-if="statusFID === 0 || statusFID === 1">
            {{ source.bedroomTypeDisplay ? source.bedroomTypeDisplay : "-" }}
        </td>
        <td data-label="Floor Area (sqft)" v-if="statusFID === 0 || statusFID === 1">
            {{ source.floorAreaSqft }}
        </td>
        <td data-label="Land Area (sqft)" v-if="statusFID === 0 || statusFID === 1">
            {{ source.LandArea ? source.LandArea : "-" }}
        </td>
        <td data-label="Address">
            {{ source.streetName }}
        </td>
        <td data-label="Status" v-if="statusFID === 0 || statusFID === 1">
            <AssetInventoryBadge :type="source.statusDisplay" />
        </td>
        <td data-label="Estimated Market Rent" v-if="statusFID === 2">
            {{ source.EMR }}
        </td>
        <td data-label="Asking Rent" v-if="statusFID === 2">
            {{ source.ART }}
        </td>
        <td data-label="Monthly Rent" v-if="statusFID === 3">
            {{ source.MR }}
        </td>
        <td data-label="Annual Revenue" v-if="statusFID === 3">
            {{ source.AR }}
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
                            <v-list-item @click="onEditInventory(source.id)" class="list-item--custom">
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
                            <v-list-item @click="onDeleteInventory(source.id)" class="list-item--custom">
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
        </td>
    </tr>
</template>

<script>
import AssetInventoryBadge from "~/components/components/Landlord/AssetInventory/components/AssetInventoryBadge.vue"
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import AddInventoryForm from "~/components/components/Landlord/AssetInventory/components/Dialog/Form/AddInventoryForm.vue"
import { mapState } from "vuex"
import qs from "qs"

export default {
    name: "TableRecord",
    components: { AssetInventoryBadge, Dialog, AddInventoryForm },
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
            sizeDialog: "large"
        }
    },
    computed: {
        ...mapState({
            statusFID: (state) => state.inventories.typeSelect
        })
    },
    methods: {
        handleClickOpenRow(item) {
            this.$emit("handleClickOpenRow", item)
        },
        onVisitInventoryUnits() {
            this.$router.push(`/landlord/assets/units/${this.source.id}`)
        },
        onEditInventory(item) {
            this.$store.dispatch("inventories/getDetailInventory", item).then(() => {
                this.openAddNewInventoryDialog = true
            })
            console.log("OnEdit", item)
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
            this.$store.commit("inventories/setInventoryDetail", '')
            this.openAddNewInventoryDialog = false
            // this.$router.push(`/landlord/assets/units/${this.source.internalID}`)
        }
    },
    watch: {}
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
    border: 1px solid var(--color-more-options);
    border-radius: 0.8rem;

    i {
        color: var(--color-more-options);
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

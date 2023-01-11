<template lang="html">
    <tr>
        <td data-title="Description">
            <p>{{ source.itemName }}</p>
        </td>
        <td data-title="Quantity">
            <p>{{ source.quantity ? quantityFormat : "-" }}</p>
        </td>
        <td data-title="Total Value">
            <p> {{ source.currencyType }} {{ source.totalValue ? totalValueFormat : "-" }} </p>
        </td>
        <!-- <td data-title="Condition Remarks">
            <p>{{ source.remark }} </p>
        </td> -->
        <td data-title="Action">
            <div>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn x-small fab outlined class="more-option" v-bind="attrs" v-on="on"
                            ><i class="ri-more-fill"></i
                        ></v-btn>
                    </template>
                    <v-list dense>
                        <v-list-item-group>
                            <v-list-item
                                @click="onEditUnitInventory(source.id)"
                                style="height: 35px"
                            >
                                <v-list-item-icon>
                                    <v-icon v-text="`ri-edit-box-line`"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Edit</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item @click="deleteDialog = true" style="height: 35px">
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
        </td>
        <Dialog :title="''" :open="createDialog" :actions="false" @close="closeDialog">
            <AddUnitInventoryForm
                @close="createDialog = false"
                v-if="createDialog"
                :sourceDetail="source.id"
            />
        </Dialog>
        <DeleteDialog
            :open="deleteDialog"
            size="large"
            type="full"
            @onSubmit="onDeleteUnitInventory(source.id)"
            @close="deleteDialog = false"
        />
    </tr>
</template>

<script>
import { mapState } from "vuex"
import DeleteDialog from "~/components/elements/Dialog/DeleteDialog.vue"
import { httpEndpoint } from "~/services/https/endpoints"
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import AddUnitInventoryForm from "../../../AssetInventory/components/Form/AddUnitInventoryForm.vue"
import { convertNumberToCommas } from "~/ultilities/helpers"

export default {
    name: "TenancyInventoryRecord",
    components: { Dialog, AddUnitInventoryForm, DeleteDialog },
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        ...mapState({
            internalID: (state) => state.inventory.internalID,
            units: (state) => state.inventory.units
        }),
        totalValueFormat() {
            return this.source.totalValue ? convertNumberToCommas(this.source.totalValue) : 0
        },
        quantityFormat() {
            return this.source.quantity ? convertNumberToCommas(this.source.quantity) : 0
        }
    },
    // created() {
    //     this.totalValueFormat = convertNumberToCommas(this.source.totalValue)
    //     this.quantityFormat = convertNumberToCommas(this.source.quantity)
    // },
    data() {
        return {
            createDialog: false,
            quantity: "",
            totalValue: "",
            deleteDialog: false
        }
    },
    methods: {
        handleClickOpenRow(item) {
            this.$emit("handleClickOpenRow", item)
        },
        onEditUnitInventory(item) {
            this.$store.dispatch("inventory/getDetailUnitInventory", item).then(() => {
                this.createDialog = true
            })
        },
        onDeleteUnitInventory(item) {
            const param = {
                data: {
                    id: item
                }
            }
            this.$store.dispatch("inventory/deleteUnitInventory", param).then(() => {
                this.deleteDialog = false
                const internalID = this.internalID
                this.$store.dispatch("inventory/getUnitsByInventoryFID", internalID)
            })
        },
        closeDialog() {
            this.$store.commit("inventory/setInventoryUnitDetail", "")
            this.createDialog = false
        }
    }
}
</script>
<style lang="scss" scoped>
tr {
    position: relative;
    vertical-align: top;
}

td {
    padding: 3.3rem 2.4rem;
    border-bottom: 1px solid #e5e5e5;

    p {
        display: flex;
        justify-content: left;
        /* Body/Nunito-R/16-24 */
        margin-bottom: 0;
        font-family: var(--font-primary);
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        // line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;

        color: #0b0c0c;
    }
}

td:nth-child(4) {
    display: flex;
    justify-content: flex-end;
}

tr:nth-child(even) {
    background: #fafafa;
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

@media screen and (max-width: 768px) {
    tr:nth-child(even) {
        background: #fafafa;
    }
    td[data-title] {
        display: grid;
        justify-content: space-between;
        align-items: center;
        text-align: right;
        grid-template-columns: 1fr 1fr;
        grid-gap: 3rem;
        border: none;
        padding: 1.6rem;
        border-top: none;

        &:before {
            content: attr(data-title);
            font-weight: 700;
            color: #0b0c0c;
            font-size: 1.6rem;
            text-align: left;
        }
    }
}
</style>

<template>
    <tr :class="`table--record ${source.id !== selectedId && selectedId !== -1 ? 'unSelected' : ''}`">
        <td data-label="Property">
            <div>
                <img :src="`${source.propertyImg}`" alt="" class="table--record__img">
                <p class="first-child" @click="handleClickOpenRow(source.id)">
                    {{ source.propertyName }}
                </p>
            </div>
        </td>
        <td data-label="Unit No.">
            {{ source.unitNo }}
        </td>
        <td data-label="Property Type">
            {{ source.propertyType }}
        </td>
        <td data-label="Bedroom Type">
            {{ source.bedroomType ? source.bedroomType : "-" }}
        </td>
        <td data-label="Floor Area (sqft)">
            {{ source.floorArea }}
        </td>
        <td data-label="Land Area (sqft)">
            {{ source.LandArea }}
        </td>
        <td data-label="Address">
            {{ source.address }}
        </td>
        <td data-label="Status">
            <AssetInventoryBadge :type="source.status" />
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
                            <v-list-item style="height: 35px">
                                <v-list-item-icon>
                                    <v-icon v-text="`ri-edit-box-line`"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Edit</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item style="border-color: #E9E9E9; border: 1px solid #E9E9E9; height : 35px;">
                                <v-list-item-icon>
                                    <v-icon v-text="`ri-add-box-line`"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Add Inventory</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item style="height: 35px">
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
    </tr>
</template>

<script>
import AssetInventoryBadge from "~/components/components/Landlord/AssetInventory/components/AssetInventoryBadge.vue"
export default {
    name: "TableRecord",
    components: { AssetInventoryBadge },
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
    border: 1px solid #ECB842;
    border-radius: 8px;

    i {
        color: #ECB842;
    }
}
</style>
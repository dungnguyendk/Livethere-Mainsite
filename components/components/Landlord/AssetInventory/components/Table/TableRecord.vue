<template>
    <tr :class="`table--record ${source.id !== selectedId && selectedId !== -1 ? 'unSelected' : ''}`">
        <td data-label="Property">
            <div>
                <img src="https://picsum.photos/600/400.jpg?random=" alt="" class="table--record__img">
                <p class="first-child" @click="handleClickOpenRow(source.id)">
                    {{ source.propertyName }}
                </p>
            </div>
        </td>
        <td data-label="Unit No.">
            {{ source.unitNo }}
        </td>
        <td data-label="Property Type" v-if="typeSelectedChange === 'All' || typeSelectedChange === 'New'">
            {{ source.propertyTypeDisplay }}
        </td>
        <td data-label="Bedroom Type" v-if="typeSelectedChange === 'All' || typeSelectedChange === 'New'">
            {{ source.bedroomTypeDisplay ? source.bedroomTypeDisplay : "-" }}
        </td>
        <td data-label="Floor Area (sqft)" v-if="typeSelectedChange === 'All' || typeSelectedChange === 'New'">
            {{ source.floorAreaSqft }}
        </td>
        <td data-label="Land Area (sqft)" v-if="typeSelectedChange === 'All' || typeSelectedChange === 'New'">
            {{ source.LandArea ? source.LandArea : '-' }}
        </td>
        <td data-label="Address">
            {{ source.streetName }}
        </td>
        <td data-label="Status" v-if="typeSelectedChange === 'All' || typeSelectedChange === 'New'">
            <AssetInventoryBadge :type="source.statusDisplay" />
        </td>
        <td data-label="Estimated Market Rent" v-if="typeSelectedChange === 'Vacant'">
            {{ source.EMR }}
        </td>
        <td data-label="Asking Rent" v-if="typeSelectedChange === 'Vacant'">
            {{ source.ART }}
        </td>
        <td data-label="Monthly Rent" v-if="typeSelectedChange === 'Tenanted'">
            {{ source.MR }}
        </td>
        <td data-label="Annual Revenue" v-if="typeSelectedChange === 'Tenanted'">
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
        typeSelected: {
            type: String,
            default: () => "All"
        },
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
            typeSelectedChange: "All"
        }
    },
    methods: {
        handleClickOpenRow(item) {
            this.$emit("handleClickOpenRow", item)
        }
    },
    watch: {
        typeSelected(val) {
            this.typeSelectedChange = val
        }
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
    border: 1px solid var(--color-more-options);
    border-radius: 0.8rem;

    i {
        color: var(--color-more-options);
        font-size: 2.4rem;
    }
}
</style>
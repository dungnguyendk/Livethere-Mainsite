<template>
    <tr class="table--record">
        <td data-label="Property">
            <div>
                <img :src="require(`~/static/img/${source.propertyType === 1 ? 'condo' : source.propertyType === 2 ? 'apt' : 'landed'}.svg`)"
                    alt="" class="table--record__img" />
                <p class="first-child">
                    <!-- @click="handleClickOpenRow(source.internalID)" -->
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
        <td data-label="Property Type">
            {{ source.propertyTypeDisplay }}
        </td>
        <td data-label="Bedroom Type">
            {{ source.bedroomTypeDisplay ? source.bedroomTypeDisplay : "-" }}
        </td>
        <td data-label="Floor Area (sqft)">
            {{ source.floorAreaSqft ? floorAreaSqftFormatter : "-" }}
        </td>
        <td data-label="Land Area (sqft)">
            {{ source.landAreaSqft ? landAreaSqftFormatter : "-" }}
        </td>
        <td data-label="Address">
            {{ source.streetName ? source.streetName : "-" }} <br />
            {{ source.location ? source.location : "-" }}
        </td>
        <td data-label="Status">
            <a>
                <!-- @click="handleClickOpenRow(source.internalID)" -->
                <AssetInventoryBadge :type="source.statusDisplay ? source.statusDisplay.toUpperCase() : ''"
                    :source="source" />
            </a>
        </td>
        <td data-label="Action">
            <v-btn class="btn btn--outline btn--green btn--md add-new" @click="confirmListWithUs = true">
                List with Us
            </v-btn>
        </td>
        <ConfirmDialog :open="confirmListWithUs" content="Do you want to list with us?"
            size="large" type="full" @close="confirmListWithUs = false" :loading="loading" @onSubmit="putListWithUs" />
    </tr>
</template>

<script>
import AssetInventoryBadge from "~/components/components/Landlord/AssetInventory/components/AssetInventoryBadge.vue"
import ConfirmDialog from "~/components/elements/Dialog/ConfirmDialog.vue"
import { convertNumberToCommas } from "~/ultilities/helpers"
import { mapState } from "vuex"

export default {
    name: "TableRecord",
    components: { AssetInventoryBadge, ConfirmDialog },
    props: {
        source: {
            type: Object,
            default: () => null
        }
    },
    data() {
        return {
            loading: false,
            confirmListWithUs: false
        }
    },
    computed: {
        ...mapState({
            // statusFID: (state) => state.inventories.typeSelect,
            statusResponse: (state) => state.marketing.statusResponse
        }),
        floorAreaSqftFormatter() {
            return this.source.floorAreaSqft ? convertNumberToCommas(this.source.floorAreaSqft) : ''
        },
        landAreaSqftFormatter() {
            return this.source.landAreaSqft ? convertNumberToCommas(this.source.landAreaSqft) : ''
        }
    },
    created() {
    },
    methods: {
        handleClickOpenRow(item) {
            this.$emit("handleClickOpenRow", item)
        },
        putListWithUs() {
            this.loading = true
            this.$store.dispatch("marketing/putStatusListWithUs", this.source.id).then(() => {
                this.loading = false
                this.confirmListWithUs = false
            })
        },
    },
    watch: {
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

        @media only screen and (min-width: 768px) and (max-width: 1280px) {
            padding: 0.6rem 0.8rem !important;
        }
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

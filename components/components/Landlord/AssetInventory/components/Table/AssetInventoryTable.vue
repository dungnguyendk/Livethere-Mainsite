<template lang="html">
    <div class="asset-analytic">
        <table class="table--responsive table--asset">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Unit No.</th>
                    <th v-if="typeSelectedChange === 'All' || typeSelectedChange === 'New'">Property Type</th>
                    <th v-if="typeSelectedChange === 'All' || typeSelectedChange === 'New'">Bedroom Type</th>
                    <th v-if="typeSelectedChange === 'All' || typeSelectedChange === 'New'">Floor Area (sqft)</th>
                    <th v-if="typeSelectedChange === 'All' || typeSelectedChange === 'New'">Land Area (sqft)</th>
                    <th>Address</th>
                    <th v-if="typeSelectedChange === 'All' || typeSelectedChange === 'New'">Status</th>
                    <th v-if="typeSelectedChange === 'Vacant'">Estimated Market Rent</th>
                    <th v-if="typeSelectedChange === 'Vacant'">Asking Rent</th>
                    <th v-if="typeSelectedChange === 'Tenanted'">Monthly Rent</th>
                    <th v-if="typeSelectedChange === 'Tenanted'">Annual Revenue</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <template v-if="items.length > 0">
                    <TableRecord v-for="item in items" :source="item" :selectedId="selectedId" :key="item.id"
                        @handleClickOpenRow="handleClickOpenRow" :typeSelected="typeSelected" />
                    <template
                        v-if="(typeSelectedChange === 'Vacant' || typeSelectedChange === 'Tenanted') && selectedId === -1">
                        <tr class="tr-hidden">
                            <td></td>
                        </tr>
                        <tr class="tr-total">
                            <td colspan="4">Grand Total Revenue:</td>
                            <!-- <td></td>
                            <td></td>
                            <td></td> -->
                            <td colspan="2"><span>$ 72,000</span></td>
                            <!-- <td></td> -->
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
        <slide-up-down :active="showExpandedPanel" :duration="300">
            <ExpandedPanel @onClose="onCloseExpandedPanel" />
        </slide-up-down>
    </div>
</template>

<script>
import TableRecord from "~/components/components/Landlord/AssetInventory/components/Table/TableRecord.vue"
import ExpandedPanel from "~/components/shared/Panel/ExpandedPanel.vue"
export default {
    name: "AssetInventoryTable",
    components: { TableRecord, ExpandedPanel },
    props: {
        typeSelected: {
            type: String,
            default: () => "All"
        }
    },
    data() {
        return {
            items: [
                {
                    id: 1,
                    propertyImg: "https://picsum.photos/600/400.jpg?random=",
                    propertyName: "Lloyd Sixtyfive",
                    unitNo: "10-24",
                    propertyType: "propertyType",
                    bedroomType: "",
                    floorArea: "1,690",
                    LandArea: "",
                    address: "65 Lloyd Road, Singapore 239114",
                    status: "New",
                    EMR: "SGD 2,000 - SGD 3,500",
                    ART: "SGD 12,000",
                    MR: "SGD 8,000",
                    AR: "SGD 12,000"
                },
                {
                    id: 2,
                    propertyImg: "https://picsum.photos/600/400.jpg?random=",
                    propertyName: "Skypark @ Somerset",
                    unitNo: "06-44",
                    propertyType: "propertyType",
                    bedroomType: "",
                    floorArea: "1,690",
                    LandArea: "",
                    address: "22 Saint Thomas Walk, Singapore 238107",
                    status: "New",
                    EMR: "SGD 2,000 - SGD 3,500",
                    ART: "SGD 12,000",
                    MR: "SGD 8,000",
                    AR: "SGD 12,000"
                },
                {
                    id: 3,
                    propertyImg: "https://picsum.photos/600/400.jpg?random=",
                    propertyName: "Parkview Eclat",
                    unitNo: "10-24",
                    propertyType: "propertyType",
                    bedroomType: "",
                    floorArea: "1,690",
                    LandArea: "",
                    address: "138 Grange Road, Singapore 249617",
                    status: "Vacant",
                    EMR: "SGD 2,000 - SGD 3,500",
                    ART: "SGD 12,000",
                    MR: "SGD 8,000",
                    AR: "SGD 12,000"
                },
                {
                    id: 4,
                    propertyImg: "https://picsum.photos/600/400.jpg?random=",
                    propertyName: "Lloyd Sixtyfive",
                    unitNo: "10-24",
                    propertyType: "propertyType",
                    bedroomType: "",
                    floorArea: "1,690",
                    LandArea: "",
                    address: "65 Lloyd Road, Singapore 239114",
                    status: "Vacant",
                    EMR: "SGD 2,000 - SGD 3,500",
                    ART: "SGD 12,000",
                    MR: "SGD 8,000",
                    AR: "SGD 12,000"
                },
                {
                    id: 5,
                    propertyImg: "https://picsum.photos/600/400.jpg?random=",
                    propertyName: "Lloyd Sixtyfive",
                    unitNo: "10-24",
                    propertyType: "propertyType",
                    bedroomType: "",
                    floorArea: "1,690",
                    LandArea: "",
                    address: "65 Lloyd Road, Singapore 239114",
                    status: "Tenanted",
                    EMR: "SGD 2,000 - SGD 3,500",
                    ART: "SGD 12,000",
                    MR: "SGD 8,000",
                    AR: "SGD 12,000"
                },
                {
                    id: 6,
                    propertyImg: "https://picsum.photos/600/400.jpg?random=",
                    propertyName: "Lloyd Sixtyfive",
                    unitNo: "10-24",
                    propertyType: "propertyType",
                    bedroomType: "",
                    floorArea: "1,690",
                    LandArea: "",
                    address: "65 Lloyd Road, Singapore 239114",
                    status: "Tenanted",
                    EMR: "SGD 2,000 - SGD 3,500",
                    ART: "SGD 12,000",
                    MR: "SGD 8,000",
                    AR: "SGD 12,000"
                },
                {
                    id: 7,
                    propertyImg: "https://picsum.photos/600/400.jpg?random=",
                    propertyName: "Lloyd Sixtyfive",
                    unitNo: "10-24",
                    propertyType: "propertyType",
                    bedroomType: "",
                    floorArea: "1,690",
                    LandArea: "",
                    address: "65 Lloyd Road, Singapore 239114",
                    status: "Tenanted",
                    EMR: "SGD 2,000 - SGD 3,500",
                    ART: "SGD 12,000",
                    MR: "SGD 8,000",
                    AR: "SGD 12,000"
                },
                {
                    id: 8,
                    propertyImg: "https://picsum.photos/600/400.jpg?random=",
                    propertyName: "Waterfront Bungalow at Ocean Drive",
                    unitNo: "10-24",
                    propertyType: "propertyType",
                    bedroomType: "",
                    floorArea: "1,690",
                    LandArea: "2,172",
                    address: "65 Lloyd Road, Singapore 239114",
                    status: "New",
                    EMR: "SGD 2,000 - SGD 3,500",
                    ART: "SGD 12,000",
                    MR: "SGD 8,000",
                    AR: "SGD 12,000"
                },
            ],
            showExpandedPanel: false,
            selectedId: -1,
            typeSelectedChange: 'All'
        }
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
    watch: {
        typeSelected(val) {
            this.typeSelectedChange = val
        }
    }
}
</script>
<style lang="scss" scoped>
.asset-analytic {
    padding: (32/1920)*100% (278/1920)*100% (126/1920)*100% (278/1920)*100%;

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
    border: 1px solid #00634F;
    background: rgba(0, 99, 79, 0.05);

    td {
        padding: 1.6rem;
        color: #171717;
        font-weight: 700;
        font-size: 1.8rem;
        line-height: 2.8rem;

        span {
            color: #00634F;
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
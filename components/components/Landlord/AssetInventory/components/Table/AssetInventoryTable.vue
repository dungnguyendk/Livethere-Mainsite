<template lang="html">
    <div class="asset-analytic">
        <table class="table--responsive table--asset">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Unit No.</th>
                    <th>Property Type</th>
                    <th>Bedroom Type</th>
                    <th>Floor Area (sqft)</th>
                    <th>Land Area (sqft)</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <template v-if="items.length > 0">
                    <TableRecord v-for="item in items" :source="item" :selectedId="selectedId" :key="item.id"
                        @handleClickOpenRow="handleClickOpenRow" />
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
                    status: "New"
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
                    status: "New"
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
                    status: "Vacant"
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
                    status: "Vacant"
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
                    status: "Tenanted"
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
                    status: "Tenanted"
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
                    status: "Tenanted"
                },
                {
                    id: 8,
                    propertyImg: "https://picsum.photos/600/400.jpg?random=",
                    propertyName: "Lloyd Sixtyfive",
                    unitNo: "10-24",
                    propertyType: "propertyType",
                    bedroomType: "",
                    floorArea: "1,690",
                    LandArea: "2,172",
                    address: "65 Lloyd Road, Singapore 239114",
                    status: "New"
                },
            ],
            showExpandedPanel: false,
            selectedId: -1,
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
        }
    }
}
</style>
<template lang="html">
    <div>
        <AssetInventoryAction @changeType="changeType" />
        <AssetInventoryTable :typeSelected="typeSelected" />
    </div>
</template>

<script>
import AssetInventoryTable from "~/components/components/Landlord/AssetInventory/components/Table/AssetInventoryTable.vue"
import AssetInventoryAction from "~/components/components/Landlord/AssetInventory/components/AssetInventoryAction.vue"
export default {
    name: "AssetInventory",
    components: { AssetInventoryTable, AssetInventoryAction },
    data() {
        return {
            typeSelected: 0
        }
    },
    methods: {
        changeType(val) {
            this.typeSelected = val
        }
    }
}
</script>
<template lang="html">
    <div>
        <AssetInventoryAction />
        <AssetInventoryTable />
    </div>
</template>

<script>
import AssetInventoryTable from "~/components/components/Landlord/AssetInventory/components/Table/AssetInventoryTable.vue"
import AssetInventoryAction from "~/components/components/Landlord/AssetInventory/components/AssetInventoryAction.vue"
export default {
    name: "AssetInventory",
    components: { AssetInventoryTable, AssetInventoryAction },
}
</script>
<template lang="html">
    <div class="section--landlord">
        <div class="container">
            <div class="section__top">
                <AssetInventoryAction />
            </div>
            <div class="section__container">
                <AssetInventoryTable />
            </div>
        </div>
    </div>
</template>

<script>
import AssetInventoryTable from "~/components/components/Landlord/AssetInventory/components/Table/AssetInventoryTable.vue"
import AssetInventoryAction from "~/components/components/Landlord/AssetInventory/components/AssetInventoryAction.vue"

export default {
    name: "AssetInventory",
    components: { AssetInventoryTable, AssetInventoryAction }
}
</script>

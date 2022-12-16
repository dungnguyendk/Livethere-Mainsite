<template lang="html">
    <div class="section--marketing-inventory">
        <div class="container">
            <MarketingInventoryTable/>
        </div>
    </div>
</template>

<script>
import MarketingInventoryTable
    from "~/components/components/Landlord/MarketingInventory/Table/MarketingInventoryTable.vue";

export default {
    name: "MarketingInventory",
    components: {MarketingInventoryTable}
}
</script>
<style lang="scss" scoped>
// .section--marketing-inventory{
    
// }
</style>

<template lang="html">
    <div class="section--marketing-inventory">
        <div class="container">
            <MarketingInventoryTable />
        </div>
    </div>
</template>

<script>
import MarketingInventoryTable from "~/components/components/Landlord/Marketing/Table/MarketingInventoryTable.vue"

export default {
    name: "Marketing",
    components: { MarketingInventoryTable }
}
</script>

<style lang="scss" scoped></style>

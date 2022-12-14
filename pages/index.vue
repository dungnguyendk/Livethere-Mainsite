<template>
    <main>
        <!-- <div class="jumbotron">
            <h3>Welcome!</h3>
        </div> -->
        <MarketingInventoryTable />
    </main>
</template>

<script>
import { mapState } from "vuex"
import MarketingInventoryTable from "~/components/components/Landlord/MarketingInventory/MarketingInventoryTable.vue";
export default {
    components: {
        MarketingInventoryTable
    },
    head: {
        title: "Landing page | Livethere"
    },

    methods: {}


}
</script>

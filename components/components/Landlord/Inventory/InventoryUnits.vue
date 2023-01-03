<template lang="html">
    <div class="section--unit-inventory-details">
        <div class="container">
            <div class="section__top">
                <v-btn class="btn btn--outline btn--green btn--sm" @click="onBack">
                    <i class="ri-arrow-left-line"></i>
                    Back
                </v-btn>
                <h3> {{ inventoryDetails ? inventoryDetails.propertyName : "Untitled" }} </h3>
            </div>
            <div class="section__container">
                <InventoryInformationPanel />
                <div class="section__divider" />
                <TenancyUnitInventory :inside="true" />
            </div>
        </div>
    </div>
</template>

<script>
import TenantAgreementTable from "~/components/components/Landlord/Inventory/Table/TenancyAgreementTable.vue"
import InventoryInformationPanel from "~/components/components/Landlord/Inventory/Panel/InventoryInformationPanel.vue"
import TenancyUnitInventory from "~/components/components/Landlord/Tenancy/TenancyUnitInventory.vue"
import { mapState } from "vuex"

export default {
    name: "InventoryUnits",
    components: {
        TenancyUnitInventory,
        InventoryInformationPanel,
        TenantAgreementTable
    },
    computed: {
        ...mapState({
            inventoryDetails: (state) => state.inventory.inventoryDetails
        })
    },
    methods: {
        onBack() {
            this.$router.push("/landlord/assets")
        }
    }
}
</script>
<style lang="scss" scoped>
.section--unit-inventory-details {
    padding: 3.2rem 0;

    .section__divider {
        margin: 3.2rem -2.4rem;
        border-bottom: 1px solid var(--border-color);
    }

    .section__top {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-bottom: 3.2rem;

        h3 {
            margin-bottom: 0;
            font-size: 3.2rem;
            text-align: center;
            display: block;
            flex-basis: 100%;
        }
    }

    .section__container {
        padding: 2.6rem 2.4rem;
        border-radius: 20px;
        background-color: #fff;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    }
}
</style>

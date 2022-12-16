<template lang="html">
    <div class="asset-inventory__action">
        <div class="select-type">
            <v-select :items="typeSelections" value="All" hide-details outlined dense class="me-2"></v-select>
        </div>
        <v-btn class="btn btn--outline btn--green btn--md add-new" @click="openAddNewInventoryDialog = true">
            <v-icon left>ri-add-box-line</v-icon>
            Add New Inventory
        </v-btn>
        <AddNewInventoryDialog :open="openAddNewInventoryDialog" @close="openAddNewInventoryDialog = false" />
    </div>
</template>
<script>
import AddNewInventoryDialog from "~/components/components/Landlord/AssetInventory/components/Dialog/AddNewInventoryDialog.vue"
export default {
    name: "AssetInventoryAction",
    components: { AddNewInventoryDialog },
    data() {
        return {
            typeSelections: [
                "All", "New", "Vacant", "Tenanted"
            ],
            openAddNewInventoryDialog: false
        }
    }
}
</script>
<style lang="scss" scoped>
.asset-inventory {
    &__action {
        padding: 4.6rem (278/1920)*100% 0 (278/1920)*100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.btn {
    &.add-new {
        line-height: 2rem;
    }
}

.select-type {
    .v-select {
        width: 14rem
    }

    :deep(.v-select__selection--comma) {
        font-size: 1.6rem;
        color: var(--color-primary);
        font-weight: 700;
    }

    :deep(.v-icon) {
        color: var(--color-primary);
        font-weight: 700;
    }

    :deep(fieldset) {
        border: 0.2rem solid hsl(168, 100%, 19%) !important;
        border-radius: 0.8rem;
    }
}

@media only screen and (max-width: 768px) {
    .asset-inventory {
        &__action {
            padding: 1rem 0;
        }
    }

    .select-type {
        .v-select {
            width: auto;

        }
    }
}

@media only screen and (min-width: 768px) and (max-width: 1280px) {
    .asset-inventory {
        &__action {
            padding: 1rem 0;
        }
    }
}
</style>
<template lang="html">
    <div class="asset-inventory__action">
        <div class="select-type">
            <v-select
                v-model="typeSelected"
                :items="typeSelections"
                item-text="value"
                item-value="id"
                hide-details
                outlined
                dense
                class="me-2"
                @change="changeType"
            ></v-select>
        </div>
        <v-btn
            class="btn btn--outline btn--green btn--md add-new"
            @click="openAddNewInventoryDialog = true"
        >
            <v-icon left>ri-add-box-line</v-icon>
            Add New Inventory
        </v-btn>
        <Dialog
            :open="openAddNewInventoryDialog"
            @close="openAddNewInventoryDialog = false"
            :size="sizeDialog"
            :title="''"
            :actions="false"
        >
            <AddInventoryForm
                @close="openAddNewInventoryDialog = false"
                v-if="openAddNewInventoryDialog"
            />
        </Dialog>
    </div>
</template>
<script>
import { STATUS_DROPDOWN } from "~/ultilities/contants/asset-inventory.js"
import qs from "qs"
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import AddInventoryForm from "~/components/components/Landlord/AssetInventory/components/Dialog/Form/AddInventoryForm.vue"

export default {
    name: "AssetInventoryAction",
    components: { AddInventoryForm, Dialog },
    data() {
        return {
            typeSelections: STATUS_DROPDOWN,
            typeSelected: {
                id: 0,
                value: "All"
            },
            openAddNewInventoryDialog: false,
            sizeDialog: "large"
        }
    },
    methods: {
        changeType() {
            const params = qs.stringify({
                StatusFID: this.typeSelected
            })
            this.$store.commit("inventories/setTypeSelected", this.typeSelected)
            this.$store.dispatch("inventories/getInventories", params)
        }
    },
    watch: {}
}
</script>
<style lang="scss" scoped>
.asset-inventory {
    &__action {
        padding: 4.6rem (278/1920) * 100% 0 (278/1920) * 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.btn {
    height: 4rem !important;

    &.add-new {
        line-height: 2rem;
        height: 4rem;
    }
}

.select-type {
    height: 4rem;

    .v-select {
        width: 14rem;
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

:deep(.v-list-item__title) {
    color: var(--color-title-black) !important;
    font-weight: 500 !important;
    font-size: 1.6rem !important;
    line-height: 2.4rem !important;
}

:deep(.v-list-item) {
    &.v-list-item--active {
        .v-list-item__content {
            border-bottom: none !important;
        }
    }

    .v-list-item__content {
        border-bottom: 1px solid var(--border-color) !important;
    }

    &:last-child {
        .v-list-item__content {
            border-bottom: none !important;
        }
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

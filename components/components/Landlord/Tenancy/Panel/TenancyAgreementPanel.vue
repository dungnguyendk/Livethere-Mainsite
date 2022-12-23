<template lang="html">
    <div class="panel--landlord panel--with-to-actions panel--agreement-panel">
        <div class="panel__top">
            <h3>Tenancy Agreement</h3>
            <v-btn class="btn btn--outline btn--green btn--withIcon" @click="addNewDialog = true">
                <i class="ri-add-circle-line"></i>
                Create
            </v-btn>
        </div>
        <div class="panel__container">
            <TenancyAgreementTable />
        </div>
        <Dialog title="Create Tenancy Agreement" :open="addNewDialog" @close="addNewDialog = false">
            <template v-slot:content>
                <CreateTenancyAgreementForm />
            </template>
        </Dialog>
    </div>
</template>

<script>
import TenancyTable from "~/components/components/Landlord/Tenancy/Table/TenancyTable.vue"
import TenancyAgreementTable from "~/components/components/Landlord/Inventory/Table/TenancyAgreementTable.vue"
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import CreateTenancyAgreementForm from "~/components/components/Landlord/Inventory/Form/CreateTenancyAgreementForm.vue"

export default {
    name: "TenancyAgreementPanel",
    components: { CreateTenancyAgreementForm, Dialog, TenancyAgreementTable, TenancyTable },
    data() {
        return {
            addNewDialog: false
        }
    },
    methods: {
        onCreateNewDialog() {}
    }
}
</script>

<template lang="html">
    <div class="panel--landlord panel--agreement-panel">
        <div class="panel__top"><h3>Tenancy Agreement</h3></div>
        <div class="panel__container">
            <TenancyAgreementTable />
        </div>
    </div>
</template>

<script>
import TenancyTable from "~/components/components/Landlord/Tenancy/Table/TenancyTable.vue"
import TenancyAgreementTable from "~/components/components/Landlord/Property/Table/TenancyAgreementTable.vue"

export default {
    name: "TenancyAgreementPanel",
    components: { TenancyAgreementTable, TenancyTable }
}
</script>

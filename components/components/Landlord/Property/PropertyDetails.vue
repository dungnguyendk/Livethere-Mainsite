<template lang="html">
    <div class="section--property-details">
        <div class="section__top">
            <h3 class="section__heading">Property Details</h3>

        </div>
        <div class="section__bottom">
            <h3 class="section__heading">
                Tenancy Agreement
            </h3>
            <TenantAgreementTable/>
        </div>
    </div>
</template>

<script>
import TenantAgreementTable from "~/components/components/Landlord/Property/Table/TenancyAgreementTable.vue";

export default {
    name: "PropertyDetails",
    components: {TenantAgreementTable}
}
</script>
<style lang="scss" scoped>
.section--property-details{}
</style>

<template lang="html">
    <div>
        <TenancyAgreement />
        <TenancyDetails />
        <TenancyDocuments />
        <TenancyExpenses />
        <TenancyInfo />
        <TenancySteps />
        <TenancyUnitInventory />
    </div>
</template>
<script>
import TenancyAgreement from "~/components/components/Landlord/Tenancy/TenancyAgreement.vue"
import TenancyDetails from "~/components/components/Landlord/Tenancy/TenancyDetails.vue"
import TenancyDocuments from "~/components/components/Landlord/Tenancy/TenancyDocuments.vue"
import TenancyExpenses from "~/components/components/Landlord/Tenancy/TenancyExpenses.vue"
import TenancyInfo from "~/components/components/Landlord/Tenancy/TenancyInfo.vue"
import TenancySteps from "~/components/components/Landlord/Tenancy/TenancySteps.vue"
import TenancyUnitInventory from "~/components/components/Landlord/Tenancy/TenancyUnitInventory.vue"

export default {
    components: {
        TenancyAgreement,
        TenancyDetails,
        TenancyDocuments,
        TenancyExpenses,
        TenancyInfo,
        TenancySteps,
        TenancyUnitInventory
    }
}
</script>
<style lang="scss" scoped></style>

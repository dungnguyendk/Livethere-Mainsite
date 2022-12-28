<template lang="html">
    <TenancyWrapper @onBack="onBack">
        <template slot="content"> <TenancyExpensesPanel /></template>
    </TenancyWrapper>
</template>

<script>
import TenancyWrapper from "~/components/components/Landlord/Tenancy/TenancyWrapper"
import TenancyDocumentsPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyDocumentsPanel"
import TenancyExpensesPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyExpensesPanel"

export default {
    name: "TenancyExpenses",
    components: { TenancyExpensesPanel, TenancyDocumentsPanel, TenancyWrapper },
    methods: {
        onBack() {
            this.$router.go(-1)
        }
    }
}
</script>

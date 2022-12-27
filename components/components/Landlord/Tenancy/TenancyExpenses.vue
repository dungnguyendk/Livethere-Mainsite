<template lang="html">
    <TenancyWrapper @onBack="onBack">
        <template slot="content"> </template>
    </TenancyWrapper>
</template>

<script>
import TenancyWrapper from "~/components/components/Landlord/Tenancy/TenancyWrapper"
import TenancyDocumentsPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyDocumentsPanel"

export default {
    name: "TenancyExpenses",
    components: { TenancyDocumentsPanel, TenancyWrapper },
    methods: {
        onBack() {
            this.$router.go(-1)
        }
    }
}
</script>

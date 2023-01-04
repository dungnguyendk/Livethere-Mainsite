<template lang="html">
    <TenancyWrapper @onBack="onBack">
        <template slot="content">
            <TenancyUnitInventory />
        </template>
    </TenancyWrapper>
</template>

<script>
import TenancyWrapper from "~/components/components/Landlord/Tenancy/TenancyWrapper"
import TenancyDocumentsPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyDocumentsPanel"
import TenancyUnitInventory from "~/components/components/Landlord/Tenancy/TenancyUnitInventory"

export default {
    name: "TenancyUnits",
    components: { TenancyUnitInventory, TenancyDocumentsPanel, TenancyWrapper },
    methods: {
        onBack() {
            const internalID = this.$route.params.id
            this.$router.push(`/landlord/tenancy/${internalID}`)
            //this.$router.go(-1)
        }
    }
}
</script>

<template lang="html">
    <TenancyWrapper @onBack="onBack">
        <template slot="content">
            <TenancyDocumentsPanel />
        </template>
    </TenancyWrapper>
</template>

<script>
import TenancyWrapper from "~/components/components/Landlord/Tenancy/TenancyWrapper"
import TenancyDocumentsPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyDocumentsPanel"

export default {
    name: "TenancyAgreements",
    components: { TenancyDocumentsPanel, TenancyWrapper },
    methods: {
        onBack() {
            // this.$router.go(-1)
            const internalID = this.$route.params.id
            this.$router.push(`/landlord/tenancy/${internalID}`)
        }
    }
}
</script>

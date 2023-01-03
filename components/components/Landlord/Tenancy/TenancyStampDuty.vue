<template lang="html">
    <TenancyWrapper @onBack="onBack">
        <template slot="content"> </template>
    </TenancyWrapper>
</template>

<script>
import TenancyWrapper from "~/components/components/Landlord/Tenancy/TenancyWrapper"
import TenancyDocumentsPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyDocumentsPanel"

export default {
    name: "TenancyStampDuty",
    components: { TenancyDocumentsPanel, TenancyWrapper },
    methods: {
        onBack() {
            const internalID = this.$route.params.id
            this.$router.push(`/landlord/tenancy/${internalID}`)
            //this.$router.go(-1)
        }
    }
}
</script>

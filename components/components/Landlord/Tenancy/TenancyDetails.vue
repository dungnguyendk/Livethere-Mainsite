<template lang="html">
    <TenancyWrapper @onBack="onBack">
        <template slot="content">
            <TenancyDetailsPanel />
            <TenancyInfoPanel />
        </template>
    </TenancyWrapper>
</template>

<script>
import TenancyDetailsPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyDetailsPanel.vue"
import TenancyInfoPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyInfoPanel.vue"
import TenancyWrapper from "~/components/components/Landlord/Tenancy/TenancyWrapper"

export default {
    name: "TenancyDetails",
    components: { TenancyWrapper, TenancyInfoPanel, TenancyDetailsPanel },

    methods: {
        onBack() {
            const internalID = this.$route.params.id
            this.$router.push(`/landlord/tenancy/${internalID}`)
        }
    }
}
</script>

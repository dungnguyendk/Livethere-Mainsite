<template lang="html">
    <TenancyWrapper>
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
import { mapState } from "vuex"

export default {
    name: "TenancyDetails",
    components: { TenancyWrapper, TenancyInfoPanel, TenancyDetailsPanel },

}
</script>

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
import { mapState } from "vuex"

export default {
    name: "TenancyAgreements",
    components: { TenancyDocumentsPanel, TenancyWrapper },
    computed: {
        ...mapState({
            internalID: (state) => state.inventory.internalID
        })
    },
    methods: {
        onBack() {
            // this.$router.go(-1)
            const id = this.internalID
            this.$router.push(`/landlord/tenancy/${id}`)
        }
    }
}
</script>

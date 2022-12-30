<template lang="html">
    <TenancyWrapper @onBack="onBack">
        <template slot="content"> </template>
    </TenancyWrapper>
</template>

<script>
import TenancyWrapper from "~/components/components/Landlord/Tenancy/TenancyWrapper"
import TenancyDocumentsPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyDocumentsPanel"
import { mapState } from "vuex"

export default {
    name: "TenancyStampDuty",
    components: { TenancyDocumentsPanel, TenancyWrapper },
    computed: {
        ...mapState({
            internalID: (state) => state.inventory.internalID,
        })
    },
    methods: {
        onBack() {
            const id = this.internalID
            this.$router.push(`/landlord/tenancy/${id}`)
            //this.$router.go(-1)
        }
    }
}
</script>

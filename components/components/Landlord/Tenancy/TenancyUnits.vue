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
import { mapState } from "vuex"

export default {
    name: "TenancyUnits",
    components: { TenancyUnitInventory, TenancyDocumentsPanel, TenancyWrapper },
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

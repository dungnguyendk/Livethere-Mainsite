<template lang="html">
    <TenancyWrapper >
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
}
</script>

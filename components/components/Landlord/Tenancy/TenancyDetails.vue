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
// import TenancyNav from "~/components/components/Landlord/Tenancy/TenancyNav"
import TenancyInfoPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyInfoPanel.vue"
import TenancyWrapper from "~/components/components/Landlord/Tenancy/TenancyWrapper"
import { mapState } from "vuex"

export default {
    name: "TenancyDetails",
    components: { TenancyWrapper, TenancyInfoPanel, TenancyDetailsPanel },
    computed: {
        ...mapState({
            internalID: (state) => state.inventory.internalID,
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
<style lang="scss">
.section--tenancy {
    padding: 3.2rem 0;

    .section__top {
        padding-bottom: 3.2rem;
    }

    .section__right {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        grid-gap: 2.4rem;
    }

    .section__wrapper {
        display: grid;
        grid-template-columns: 34rem minmax(0, 1fr);
        grid-gap: 5.2rem;
    }
}
</style>

<template lang="html">
    <div class="section--tenancy">
        <div class="container">
            <div class="section__top">
                <v-btn class="btn btn--outline btn--green btn--sm" @click="onBack">
                    <i class="ri-arrow-left-line"></i>
                    Back
                </v-btn>
            </div>
            <div class="section__wrapper">
                <div class="section__left">
                    <TenancyNav />
                </div>
                <div class="section__right">
                    <TenancyDetailsPanel />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TenancyDetailsPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyDetailsPanel.vue"
import TenancyNav from "~/components/components/Landlord/Tenancy/TenancyNav"

export default {
    name: "TenancyDetails",
    components: { TenancyNav, TenancyDetailsPanel }
}
</script>
<style lang="scss" scoped>
.section--tenancy {
    .section__wrapper {
        display: grid;
        grid-template-columns: 34rem minmax(0, 1fr);
        grid-gap: 5.2rem;
    }
}
</style>

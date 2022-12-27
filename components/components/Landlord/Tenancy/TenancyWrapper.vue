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
                    <slot name="content" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TenancyDetailsPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyDetailsPanel.vue"
import TenancyNav from "~/components/components/Landlord/Tenancy/TenancyNav"
import TenancyInfoPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyInfoPanel"

export default {
    name: "TenancyWrapper",
    components: { TenancyInfoPanel, TenancyNav, TenancyDetailsPanel },
    methods: {
        onBack() {
            this.$emit("onBack")
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

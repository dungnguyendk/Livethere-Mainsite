<template lang="html">
    <div class="section--property-details">
        <div class="container">
            <div class="section__top">
                <v-btn class="btn btn--outline btn--green btn--sm">
                    <i class="ri-arrow-left-line"></i>
                    Back
                </v-btn>
                <h3> Lloyd Sixtyfive </h3>
            </div>
            <div class="section__container">
                <PropertyInformationPanel />
                <!--                <div class="section__divider" />
                <TenantAgreementTable />-->
            </div>
        </div>
    </div>
</template>

<script>
import TenantAgreementTable from "~/components/components/Landlord/Property/Table/TenancyAgreementTable.vue"
import PropertyInformationPanel from "~/components/components/Landlord/Property/Panel/PropertyInformationPanel.vue"

export default {
    name: "PropertyDetails",
    components: { PropertyInformationPanel, TenantAgreementTable }
}
</script>
<style lang="scss" scoped>
.section--property-details {
    padding: 3.2rem 0;

    .section__top {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-bottom: 3.2rem;

        h3 {
            margin-bottom: 0;
            font-size: 3.2rem;
            text-align: center;
            display: block;
            flex-basis: 100%;
        }
    }

    .section__container {
        padding: 2.6rem 2.4rem;
        border-radius: 20px;
        background-color: #fff;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    }
}
</style>

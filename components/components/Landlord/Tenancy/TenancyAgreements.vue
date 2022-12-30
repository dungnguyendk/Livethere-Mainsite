<template lang="html">
    <TenancyWrapper @onBack="onBack">
        <template slot="content">
            <TenancyAgreementUploadFilePanel />
            <TenancyDocumentsPanel />
        </template>
    </TenancyWrapper>
</template>

<script>
import TenancyWrapper from "~/components/components/Landlord/Tenancy/TenancyWrapper"
import TenancyDocumentsPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyDocumentsPanel"
import TenancyAgreementUploadFilePanel from "~/components/components/Landlord/Tenancy/Panel/TenancyAgreementUploadFilePanel.vue"

export default {
    name: "TenancyAgreements",
    components: { TenancyAgreementUploadFilePanel, TenancyDocumentsPanel, TenancyWrapper },
    methods: {
        onBack() {
            this.$router.go(-1)
        }
    }
}
</script>

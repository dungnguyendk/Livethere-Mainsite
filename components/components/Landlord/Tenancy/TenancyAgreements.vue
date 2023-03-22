<template lang="html">
    <TenancyWrapper>
        <template slot="content">
            <TenancyUploadFilePanel
                title="Tenancy Agreement"
                @onUpdateDocuments="onUpdateDocuments"
            />
            <TenancyDocumentsPanel :documentType="documentType" />
        </template>
    </TenancyWrapper>
</template>

<script>
import TenancyWrapper from "~/components/components/Landlord/Tenancy/TenancyWrapper"
import TenancyDocumentsPanel from "~/components/components/Landlord/Tenancy/Panel/TenancyDocumentsPanel"
import { mapState } from "vuex"
import TenancyUploadFilePanel from "~/components/components/Landlord/Tenancy/Panel/TenancyUploadFilePanel.vue"
import { tenancyDocumentTypes } from "~/ultilities/tenancy-helpers"

export default {
    name: "TenancyAgreements",
    components: {
        TenancyUploadFilePanel,
        TenancyDocumentsPanel,
        TenancyWrapper
    },
    computed: {
        ...mapState({
            tenancyDetails: (state) => state.tenancy.tenancyDetails,

            tenancyID: (state) => state.inventory.tenancyID
        }),
        documentType() {
            return tenancyDocumentTypes.agreement
        }
    },
    data() {
        return {
            openSnackBar: false
        }
    },
    watch: {
        snackbar(val) {
            this.openSnackBar = val
        }
    },
    methods: {
        async onUpdateDocuments(fileInfo, fileID) {
            const params = {
                tenancyContractAgreementFID: this.tenancyDetails.id,
                fileTypeFID: this.documentType.id,
                fileID: fileID,
                fileTypeName: this.documentType.label,
                originalFileName: fileInfo.data.fileName,
                systemFileName: fileInfo.data.fileName,
                contentType: "application/pdf" // pdf
            }
            await this.$store.dispatch("tenancy/createTenancyDocument", {
                params: params,
                documentType: this.documentType
            })
        }
    }
}
</script>

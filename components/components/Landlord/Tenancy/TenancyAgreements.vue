<template lang="html">
    <TenancyWrapper @onBack="onBack">
        <template slot="content">
            <!--            <pre>{{ tenancyDetails }}</pre>-->
            <TenancyUploadFilePanel
                title="Tenancy Agreement"
                @onUpdateDocuments="onUpdateDocuments"
            />
            <TenancyDocumentsPanel :documentType="documentType" />
            <v-snackbar
                v-model="openSnackBar"
                :timeout="2000"
                top
                right
                text
                color="green darken-4"
            >
                <span class="message--snackBar">
                    <i class="ri-information-line" /> {{ snackbarMessage }}
                </span>
            </v-snackbar>
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
            snackbar: (state) => state.tenancy.snackbar,
            tenancyDetails: (state) => state.tenancy.tenancyDetails,
            snackbarMessage: (state) => state.tenancy.snackbarMessage
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
        onBack() {
            this.$router.go(-1)
        },

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

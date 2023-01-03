<template lang="html">
    <TenancyWrapper @onBack="onBack">
        <template slot="content">
            <TenancyAgreementUploadFilePanel
                title="Tenancy Agreement"
                @onUpdateDocuments="onUpdateDocuments"
            />
            <TenancyDocumentsPanel />
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
import TenancyAgreementUploadFilePanel from "~/components/components/Landlord/Tenancy/Panel/TenancyAgreementUploadFilePanel.vue"
import { mapState } from "vuex"

export default {
    name: "TenancyAgreements",
    components: { TenancyAgreementUploadFilePanel, TenancyDocumentsPanel, TenancyWrapper },
    computed: {
        ...mapState({
            snackbar: (state) => state.tenancy.snackbar,
            snackbarMessage: (state) => state.tenancy.snackbarMessage
        })
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
                fileTypeFID: 1, // 1: document, 2: stamp duty
                fileID: fileID,
                fileTypeName: "Tenancy Agreement",
                originalFileName: fileInfo.data.fileName,
                systemFileName: fileInfo.data.fileName,
                contentType: "application/pdf" // pdf
            }
            await this.$store.dispatch("tenancy/createTenancyDocument", params)
        }
    }
}
</script>

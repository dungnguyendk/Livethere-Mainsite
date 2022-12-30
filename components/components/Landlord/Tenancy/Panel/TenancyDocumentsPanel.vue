<template lang="html">
    <div class="section--tenacy-document">
        <h3 class="section__label">Document</h3>
        <TenancyDocumentTable />
        <v-snackbar v-model="openSnackBar" :timeout="2000" top right text color="green darken-4">
            <span class="message--snackBar">
                <i class="ri-information-line" /> {{ snackbarMessage }}
            </span>
        </v-snackbar>
    </div>
</template>

<script>
import TenancyDocumentTable from "~/components/components/Landlord/Tenancy/Table/TenancyDocument/TenancyDocumentTable.vue"
import { mapState } from "vuex"

export default {
    name: "TenancyDocumentsPanel",
    components: { TenancyDocumentTable },
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
    }
}
</script>
<style lang="scss" scoped>
.container {
    padding-top: 2.4rem;
}

.section--tenacy-document {
    padding-bottom: 5rem;
    background-color: var(--color-white);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 20px;

    .section__label {
        padding: 2.6rem 2.4rem 3.8rem;
        font-family: var(--font-primary);
        font-style: normal;
        font-weight: 800;
        font-size: 20px;
        line-height: 28px;
        color: var(--color-menu);
        margin: 0;
    }

    @media (max-width: 768px) {
        .section__label {
            padding: 2.6rem 2.4rem 1.5rem;
            margin: 0;
        }
    }
}
</style>

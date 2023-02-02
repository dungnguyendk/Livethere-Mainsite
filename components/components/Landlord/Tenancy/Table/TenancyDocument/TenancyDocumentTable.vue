<template lang="html">
    <div>
        <table class="table--responsive table--tenancy-document">
            <thead>
                <tr>
                    <th>Document Name</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="documents && documents.length > 0">
                    <TenancyDocumentRecord
                        v-for="(item, index) in documents"
                        :source="item"
                        :key="index"
                        :documentType="documentType"
                        @onDelete="openDeleteDialog"
                    />
                </template>
                <template v-else>
                    <tr>
                        <td colspan="3">
                            <p class="empty">No record found.</p>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <DeleteDialog :open="deleteDialog" @close="deleteDialog = false" @onSubmit="deleteItem" />
    </div>
</template>

<script>
import { mapState } from "vuex"
import TenancyDocumentRecord from "./TenancyDocumentRecord.vue"
import DeleteDialog from "~/components/elements/Dialog/DeleteDialog.vue"

export default {
    name: "TenancyDocumentTable",
    components: { DeleteDialog, TenancyDocumentRecord },
    computed: {
        ...mapState({
            documents: (state) => state.tenancy.documents
        })
    },
    props: {
        documentType: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            createDialog: false,
            deleteDialog: false,
            deletedItem: null
        }
    },
    methods: {
        openDeleteDialog(item) {
            this.deletedItem = item
            this.deleteDialog = true
        },

        deleteItem() {
            this.$store
                .dispatch("tenancy/deleteTenancyDocument", {
                    documnentID: this.deletedItem.id,
                    documentType: this.documentType
                })
                .then(() => {
                    this.deleteDialog = null
                    this.deleteDialog = false
                })
        }
    }
}
</script>
<style lang="scss" scoped>
.table--tenancy-document {
    width: 100%;
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-sizing: border-box;
    background-color: var(--color-white);
    border-width: 0px 1px 1px 1px;
    border-style: solid;
    border-color: #e5e5e5;

    thead {
        tr {
            position: relative;
        }

        th {
            padding: 1.5rem 2.4rem 1.5rem;
            background-color: var(--color-menu);
            font-family: var(--font-primary);
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            color: var(--color-white);
        }
    }
}

@media (max-width: 768px) {
    .table--responsive tbody tr {
        margin-bottom: 0;
        border: 1px solid #e5e5e5;
    }
    table {
        width: 100%;
    }
    tr td {
        display: block;
    }
    th,
    tbody {
        display: block;
    }
    thead {
        display: none;
    }
}
</style>

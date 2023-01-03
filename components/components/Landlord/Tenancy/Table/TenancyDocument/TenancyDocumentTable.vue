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
    </div>
</template>

<script>
import TenancyDocumentRecord from "./TenancyDocumentRecord.vue"
import { mapState } from "vuex"

export default {
    name: "TenancyDocumentTable",
    components: { TenancyDocumentRecord },
    computed: {
        ...mapState({
            documents: (state) => state.tenancy.documents
        })
    },
    data() {
        return {
            items: [
                {
                    name: "Peter Tan",
                    passportNo: "Dxxx4567",
                    leasingType: "Corporate",
                    uploadedDate: "20/06/2001"
                },
                {
                    name: "Hung Vuong",
                    passportNo: "Dxxx4567",
                    leasingType: "Corporate",
                    uploadedDate: "20/06/2001"
                },
                {
                    name: "Hung Vuong",
                    passportNo: "Dxxx4567",
                    leasingType: "Corporate",
                    uploadedDate: "20/06/2001"
                }
            ]
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

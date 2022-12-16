<template lang="html">
    <table class="table--responsive table--tenancy-document">
        <thead>
            <tr>
                <th id="name">Tenancy Name </th>
                <th id="passport">ID / Passport No. </th>
                <th id="leasingtype">Leasing Type</th>
                <th id="uploadeddate">Uploaded Date </th>
            </tr>
        </thead>
        <tbody>
            <template v-if="items.length > 0">
                <TenancyDocumentRecord v-for="(item, index) in items" :source="item" :key="index" />
            </template>
            <template v-else>
                <tr>
                    <td colspan="2">
                        <p class="empty">No record found.</p>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script>
import TenancyDocumentRecord from "./TenancyDocumentRecord.vue"
export default {
    name: "TenancyDocumentTable",
    components: { TenancyDocumentRecord },
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
    background: #ffffff;
    border-width: 0px 1px 1px 1px;
    border-style: solid;
    border-color: #e5e5e5;
    thead {
        tr {
            position: relative;
        }
        th {
            padding: 1.5rem 2.4rem 1.5rem;
            background: #00634f;
            font-family: "Nunito";
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            color: #ffffff;
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

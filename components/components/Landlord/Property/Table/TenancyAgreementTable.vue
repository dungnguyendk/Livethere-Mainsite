<template lang="html">
    <table class="table--responsive table--tenancy-agreement">
        <thead>
            <tr>
                <th id="code">Tenancy Agreement Code </th>
                <th id="agreementdate">Agreement Date </th>
                <th id="startdate">Start date</th>
                <th id="enddate">End date</th>
                <th id="ternantname">Ternant Name</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="items.length > 0">
                <TableRecord v-for="(item, index) in items" :source="item" :key="index" />
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
import TableRecord from "~/components/components/Landlord/Property/Table/TableRecord.vue"

export default {
    name: "TenantAgreementTable",
    components: { TableRecord },
    data() {
        return {
            items: [
                {
                    tenancyAgreementCode: "1234",
                    agreementDate: "12345",
                    startDate: "Nov 26, 2012",
                    endDate: "Nov 26, 2012",
                    tenantName: "Hung Vuong"
                },
                {
                    tenancyAgreementCode: "1234",
                    agreementDate: "12345",
                    startDate: "Nov 26, 2012",
                    endDate: "Nov 26, 2012",
                    tenantName: "Hung Vuong"
                },
                {
                    tenancyAgreementCode: "1234",
                    agreementDate: "12345",
                    startDate: "Nov 26, 2012",
                    endDate: "Nov 26, 2012",
                    tenantName: "Hung Vuong"
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.table--tenancy-agreement {
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
            padding: 1.5rem 1.8rem 1.5rem;
            background: #d97706;
            font-family: "Nunito";
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            /* identical to box height, or 150% */
            color: #ffffff;
        }
    }
}
@media (max-width: 768px) {
    .table--responsive tbody tr {
        margin-bottom: 0;
        border: 1px solid #e5e5e5;
    }
    .table--tenancy-agreement {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: relative;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border: none;
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

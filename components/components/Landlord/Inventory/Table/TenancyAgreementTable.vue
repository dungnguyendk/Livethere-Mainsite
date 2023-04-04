<template lang="html">
    <div>
        <table class="table--responsive table--tenancy-agreement">
            <thead>
                <tr>
                    <th>Tenancy Agreement Code</th>
                    <th>Agreement Date</th>
                    <th>Contract Date</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <template v-if="listTenancyAgreements && listTenancyAgreements.length > 0">
                    <TableRecord v-for="(item, index) in listTenancyAgreements" :source="item" :key="item.id" />
                </template>
                <tr v-else>
                    <td colspan="5">
                        <p class="empty">No record found.</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import TableRecord from "~/components/components/Landlord/Inventory/Table/TableRecord.vue"
import { mapState } from "vuex"

export default {
    name: "TenancyAgreementTable",
    components: { TableRecord },
    computed: {
        ...mapState({
            listTenancyAgreements: (state) => state.inventory.listTenancyAgreements
        })
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
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            /* identical to box height, or 150% */
            color: #ffffff;
        }
    }
}

@media (max-width: 767px) {
    .table--responsive tbody tr {
        margin-bottom: 0;
        border-top: 1px solid #e5e5e5;
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

    th {
        font-size: 1.4rem;
    }

    tbody {
        display: block;
    }

    thead {
        display: none;
    }
}
</style>

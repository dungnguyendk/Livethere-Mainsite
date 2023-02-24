<template lang="html">
    <table class="table--responsive table--tenancy-info">
        <thead>
            <tr>
                <th id="name">Name </th>
                <th id="passport">ID / Passport No. </th>
                <th id="leasingtype">Leasing Type</th>
                <th id="companyname">Company Name</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="tenancyInfosById.length > 0">
                <TenancyInfoRecord v-for="item in tenancyInfosById" :source="item" :key="item.id" />
            </template>
            <template v-else>
                <tr>
                    <td colspan="4">
                        <p class="empty">No record found.</p>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script>
import TenancyInfoRecord from "./TenancyInfoRecord.vue"
import { mapState } from "vuex";
export default {
    name: "TenancyInfoTable",
    components: { TenancyInfoRecord },
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            tenancyInfosById: (state) => state.tenancy.tenancyInfosById
        })
    }
}
</script>
<style lang="scss" scoped>
.table--tenancy-info {
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
        border-top: 1px solid #e5e5e5;
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

<template lang="html">
    <table class="table--responsive table--tenancy-agreement">
        <thead>
            <tr>
                <th>
                    Tenancy Agreement Code
                </th>
            </tr>
        </thead>
        <tbody>
            <template v-if="items.length >0">
                <TableRecord v-for="(item, index) in items" :source="item" :key="index"/>
            </template>
            <tr>
                <td colspan="2">
                    <p class="empty">No record found.</p>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import TableRecord from "~/components/components/Landlord/Property/Table/TableRecord.vue";

export default {
    name: "TenantAgreementTable",
    components: {TableRecord},
    data() {
        return {
            items: [
                {
                    code: "1234",
                    date: "12345",
                }
            ]
        }
    },
}
</script>

<template lang="html">
    <div>
        <table class="table--responsive table--tenancy-expsense">
            <thead>
                <tr>
                    <th id="description">Description</th>
                    <th id="price">Price</th>
                    <th id="date">Date</th>
                    <th id="actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="expenses.length > 0">
                    <TenancyExpenseRecord
                        v-for="(item, index) in expenses"
                        :source="item"
                        :key="index"
                        @onDeleleteSuccess="showDeleteSuccess"
                    />
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
        <SuccessSnackBar />
    </div>
</template>

<script>
import { mapState } from "vuex"
import TenancyExpenseRecord from "./TenancyExpenseRecord.vue"
import Dialog from "~/components/elements/Dialog/Dialog"
import CreateTenancyExpenseForm from "~/components/components/Landlord/Tenancy/Form/CreateTenancyExpenseForm"
import SuccessSnackBar from "~/components/shared/Snackbar/SuccessSnackBar"

export default {
    name: "TenancyExpenseTable",
    components: { SuccessSnackBar, CreateTenancyExpenseForm, Dialog, TenancyExpenseRecord },
    computed: {
        ...mapState({
            expenses: (state) => state.tenancy.expenses
        })
    },
    data() {
        return {
            snackBar: false,
            snackBarMessage: ""
        }
    },
    methods: {
        showDeleteSuccess() {
            this.snackBar = true
            this.snackBarMessage = "Delete tenancy expense successfully!"
            setTimeout(() => {
                this.snackBar = false
            }, 2000)
        },
        showCreateSuccess() {
            this.snackBar = true
            this.snackBarMessage = "Create tenancy expense successfully!"
            setTimeout(() => {
                this.snackBar = false
            }, 2000)
        }
    }
}
</script>
<style lang="scss" scoped>
.table--tenancy-expsense {
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
        justify-content: space-between;

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

    th:nth-child(1) {
        min-width: 35.2rem;
    }

    th:nth-child(2) {
        min-width: 21.2rem;
    }
}
@media (max-width: 820) {
    .table--tenancy-expsense{
        th:nth-child(1) {
            min-width: 20rem;
        }

        th:nth-child(2) {
            min-width: 11.2rem;
        }
    }
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

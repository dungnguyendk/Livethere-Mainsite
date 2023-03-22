<template lang="html">
    <div>
        <table class="table--responsive table--tenancy-expsense" id="table-tenancy-expsense">
            <thead>
                <tr>
                    <th>
                        Date
                        <v-btn icon color="white" @click="onSortByDate">
                            <i v-if="sortByDate" class="ri-arrow-up-s-fill" />
                            <i v-else class="ri-arrow-down-s-fill" />
                        </v-btn>
                    </th>
                    <th>
                        Category
                        <v-btn icon color="white" @click="onSortByCategory">
                            <i v-if="sortByCategory" class="ri-arrow-up-s-fill" />
                            <i v-else class="ri-arrow-down-s-fill" />
                        </v-btn>
                    </th>
                    <th>Description</th>
                    <th>Price</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                <template v-if="expenses.length > 0">
                    <TenancyExpenseRecord
                        v-for="(item, index) in expenses"
                        :source="item"
                        :key="index"
                        @onDeleleteSuccess="showDeleteSuccess"
                        @open="onOpenDeleteDialog(item.id)"
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
        <DeleteDialog :open="deleteDialog" @close="deleteDialog = false" @onSubmit="deleteItem" />
    </div>
</template>

<script>
import { mapState } from "vuex"
import TenancyExpenseRecord from "./TenancyExpenseRecord.vue"
import Dialog from "~/components/elements/Dialog/Dialog"
import CreateTenancyExpenseForm from "~/components/components/Landlord/Tenancy/Form/CreateTenancyExpenseForm"
import DeleteDialog from "~/components/elements/Dialog/DeleteDialog.vue"

export default {
    name: "TenancyExpenseTable",
    components: { DeleteDialog, CreateTenancyExpenseForm, Dialog, TenancyExpenseRecord },
    computed: {
        ...mapState({
            expenses: (state) => state.tenancy.expenses,
            tenancyDetails: (state) => state.tenancy.tenancyDetails
        })
    },
    data() {
        return {
            sortByCategory: false,
            sortByDate: false,
            deleteDialog: false,
            selectedIDForDelete: ""
        }
    },
    methods: {
        onOpenDeleteDialog(id) {
            this.selectedIDForDelete = id
            this.deleteDialog = true
        },
        async deleteItem() {
            await this.$store
                .dispatch("tenancy/deleteTenancyExpense", this.selectedIDForDelete)
                .then((response) => {
                    this.deleteDialog = false
                })
        },
        onSortByCategory() {
            this.sortByCategory = !this.sortByCategory
            this.$store.dispatch("tenancy/getExpenses", {
                id: this.tenancyDetails.id,
                query: {
                    SortBy: "expenseTypeName",
                    SortDirection: this.sortByCategory ? "asc" : "desc"
                }
            })
        },

        onSortByDate() {
            this.sortByDate = !this.sortByDate
            this.$store.dispatch("tenancy/getExpenses", {
                id: this.tenancyDetails.id,
                query: {
                    SortBy: "purchaseDate",
                    SortDirection: this.sortByDate ? "asc" : "desc"
                }
            })
        },
        showDeleteSuccess() {
            this.$store.dispatch("app/showSnackBar", "Delete expense successfully! ")
        }
    }
}
</script>
<style lang="scss" scoped>
#table-tenancy-expsense {
    @media screen and (min-width: 1024px) {
        table-layout: fixed;
    }
}

.table--tenancy-expsense {
    width: 100%;
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-sizing: border-box;
    background-color: var(--color-white);
    border-width: 0 1px 1px 1px;
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

    // th:nth-child(1) {
    //     min-width: 35.2rem;
    // }

    /* th:nth-child(4) {
         display: flex;
         justify-content: flex-end;
     }*/
}

@media (max-width: 820px) {
    .table--tenancy-expsense {
        th:nth-child(1) {
            min-width: 20rem;
        }

        th:nth-child(2) {
            min-width: 11.2rem;
        }
    }
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

@media (max-width: 768px) {
    .table--responsive tbody tr {
        margin-bottom: 0;
        //border: 1px solid #e5e5e5;
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

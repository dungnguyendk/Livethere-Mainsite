<template lang="html">
    <div class="panel--landlord panel--tenancy-expenses panel--with-to-actions">
        <div class="panel__top">
            <h3> Expenses </h3>
            <v-btn class="btn btn--outline btn--green btn--withIcon" @click="createDialog = true">
                <i class="ri-add-line"></i>
                Create
            </v-btn>
        </div>
        <div class="panel__container">
            <TenancyExpenseTable @onEdit="onEdit" />
        </div>
        <Dialog
            :title="details ? 'Update Tenancy Expense' : 'Create Tenancy Expenses'"
            :open="createDialog"
            @close="onCloseDialog"
            :actions="false"
        >
            <template slot="content">
                <CreateTenancyExpenseForm @close="onCloseDialog" :source="details" />
            </template>
        </Dialog>
    </div>
</template>

<script>
import TenancyExpenseTable from "~/components/components/Landlord/Tenancy/Table/TenancyExpense/TenancyExpenseTable"
import Dialog from "~/components/elements/Dialog/Dialog"
import CreateTenancyExpenseForm from "~/components/components/Landlord/Tenancy/Form/CreateTenancyExpenseForm"
import DeleteDialog from "~/components/elements/Dialog/DeleteDialog.vue"

export default {
    name: "TenancyExpensesPanel",
    components: { CreateTenancyExpenseForm, Dialog, TenancyExpenseTable, DeleteDialog },
    data() {
        return {
            createDialog: false,
            isOpenDeleteDialog: false,
            idItem: 0,
            details: null
        }
    },
    methods: {
        onEdit(data) {
            this.details = data
            this.createDialog = true
        },
        onCloseDialog() {
            this.createDialog = false
            this.details = null
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    padding-top: 2.4rem;
}

.section--tenacy-expenses {
    padding-bottom: 5rem;
    background-color: var(--color-white);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 20px;

    .section__top {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .top--label {
            padding: 2.6rem 2.4rem 3.7rem;
            font-family: var(--font-primary);
            font-style: normal;
            font-weight: 800;
            font-size: 20px;
            line-height: 28px;
            color: var(--color-menu);
            margin: 0;
        }

        .top--button {
            padding: 2rem 2.4rem 3.2rem 2.4rem;

            a {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 13.33px 17.33px;
                gap: 5.3px;
                min-width: 16rem;
                font-family: var(--font-primary);
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 20px;
                color: var(--color-menu);
                box-sizing: border-box;
                border: 1px solid var(--color-menu);
                border-radius: 8px;
            }

            a:hover {
                background-color: var(--color-menu);
                color: var(--color-white);
                //text-decoration-line: underline;
            }
        }
    }

    @media (max-width: 768px) {
        .section__top {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            .top--label {
                padding: 2.6rem 2.4rem 1.5rem;
                margin: 0;
            }

            .top--button {
                padding-bottom: 1.5rem;
            }
        }
    }
}
</style>

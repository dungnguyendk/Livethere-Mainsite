<template lang="html">
    <tr>
        <td data-title="Tenancy Agreement Code">
            <div>
                <nuxt-link v-if="source.statusFID === 1" :to="`/tenancy/details/${source.internalID}`">
                    {{ source.tenancyRefCode }}
                </nuxt-link>
                <p v-else>
                    {{ source.tenancyRefCode }}
                </p>
            </div>
        </td>
        <td data-title="Agreement Date">
            <p>{{ formatAgreementDate }}</p>
        </td>
        <td data-title="Contract Dates">
            <p>Start: {{ formatStartDate }} </p>
            <p>End: {{ formatEndDate }}</p>
        </td>
        <td data-title="Status">
            <div>
                <p>{{ source.statusDisplay }}</p>
            </div>
        </td>
        <td data-title="End Date">
            <div class="table--action">
                <div>
                    <v-btn class="btn btn--outline btn--sm btn--green min-width--btn"
                        @click.prevent="handleClickEditDialog">
                        Edit
                    </v-btn>
                    <v-btn v-if="source.statusFID === 1" class="btn btn--sm btn--ghost btn--red min-width--btn"
                        @click="suspendDialog = true">
                        Suspend
                    </v-btn>
                </div>
                <v-btn class="btn btn--ghost btn--sm btn--red min-width--btn" @click.prevent="deleteDialog = true">
                    Delete
                </v-btn>
            </div>
        </td>
        <Dialog title="" size="small" :open="suspendDialog" @close="suspendDialog = false" :actions="false">
            <SuspendAgreementForm :contractID="source.id" @close="suspendDialog = false" />
        </Dialog>
        <DeleteDialog :open="deleteDialog" :actions="false" @close="deleteDialog = false" @onSubmit="handleDelete" />
        <Dialog title="Edit Tenancy Agreement" :open="editDialog" @close="editDialog = false" :actions="false">
            <template v-slot:content>
                <CreateTenancyAgreementForm @close="editDialog = false" :sourceDetail="tenancyAgreementDetail"
                    v-if="editDialog" />
            </template>
        </Dialog>
    </tr>
</template>

<script>
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import SuspendAgreementForm from "~/components/components/Landlord/Inventory/Form/SuspendAgreementForm"
import DeleteDialog from "~/components/elements/Dialog/DeleteDialog.vue"
import CreateTenancyAgreementForm from "~/components/components/Landlord/Inventory/Form/CreateTenancyAgreementForm.vue"
import { mapState } from "vuex"
export default {
    name: "TableRecord",
    components: { SuspendAgreementForm, Dialog, DeleteDialog, CreateTenancyAgreementForm },
    props: {
        source: {
            type: Object,
            default: () => null
        }
    },
    computed: {
        ...mapState({
            tenancyAgreementDetail: (state) => state.inventory.tenancyAgreementDetail
        }),
        formatStartDate() {
            return this.$dayjs(this.source.startDate).format("DD-MMM-YYYY")
        },
        formatAgreementDate() {
            return this.$dayjs(this.source.agreementDate).format("DD-MMM-YYYY")
        },
        formatEndDate() {
            return this.$dayjs(this.source.endDate).format("DD-MMM-YYYY")
        }
    },
    data() {
        return {
            suspendDialog: false,
            deleteDialog: false,
            editDialog: false
        }
    },
    methods: {
        handleDelete() {
            this.$store.dispatch("inventory/deleteTenancyContract", this.source.id).then(() => {
                this.deleteDialog = false
            })
        },
        handleClickEditDialog() {
            this.$store.dispatch("inventory/getTenancyContractById", this.source.id).then(() => {
                this.editDialog = true
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.record__suspend {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 10.2rem;
}

tr {
    position: relative;
    vertical-align: top;
}

td {
    padding: 3.3rem 1.8rem;
    border-bottom: 1px solid #e5e5e5;

    a {
        display: flex;
        justify-content: left;
        font-family: "Nunito";
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        text-decoration-line: underline;
        white-space: nowrap;
        margin-bottom: 0;
        color: #26a0f6;
    }

    a:hover {
        color: #26a0f6;
        //text-decoration-line: underline;
    }

    p {
        display: flex;
        justify-content: left;
        /* Body/Nunito-R/16-24 */
        margin: 0;
        font-family: "Nunito";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        /* identical to box height, or 150% */

        /* 0B0C0C paragraph txt */

        color: #0b0c0c;
    }
}

.table--action {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.min-width--btn {
    min-width: 9.2rem !important;
}

@media screen and (max-width: 768px) {
    tr:nth-child(even) {
        background: #fafafa;
    }

    td[data-title] {
        display: grid;
        justify-content: space-between;
        align-items: center;
        text-align: right;
        grid-template-columns: 1fr 1fr;
        grid-gap: 3rem;
        border: none;
        padding: 1.6rem;
        border-top: none;

        p {
            font-size: 1.4rem;
        }

        &:before {
            content: attr(data-title);
            font-weight: 700;
            color: #0b0c0c;
            font-size: 1.4rem;
            text-align: left;
        }
    }
}
</style>

<template lang="html">
    <div class="section--tenacy-info">
        <div class="section__top">
            <h3 class="top--title"> Tenancy Info </h3>
            <div class="top--button">
                <v-btn class="btn btn--green btn--outline btn--withIcon" @click="onCreateRecord">
                    <i class="ri-add-box-line" /> Add
                </v-btn>
            </div>
        </div>
        <TenancyInfoTable @onEdit="onEditRecord" @onDelete="onDeleteRecord" />
        <Dialog
            title="Create Tenancy Info"
            :open="createDialog"
            :actions="false"
            @close="onCloseCreateDialog"
        >
            <AddTenancyInfoForm
                @close="onCloseCreateDialog"
                v-if="createDialog"
                :source="details"
            />
        </Dialog>
        <DeleteDialog
            :open="deleteDialog"
            :actions="false"
            @close="deleteDialog = false"
            @onSubmit="handleDelete"
        />
    </div>
</template>

<script>
import TenancyInfoTable from "~/components/components/Landlord/Tenancy/Table/TenancyInfo/TenancyInfoTable.vue"
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import AddTenancyInfoForm from "~/components/components/Landlord/Tenancy/Form/AddTenancyInfoForm.vue"
import DeleteDialog from "~/components/elements/Dialog/DeleteDialog.vue"
import qs from "qs"
import { mapState } from "vuex"

export default {
    name: "TenancyInfoPanel",
    components: { DeleteDialog, TenancyInfoTable, AddTenancyInfoForm, Dialog },
    computed: {
        ...mapState({
            tenancyDetails: (state) => state.tenancy.tenancyDetails
        })
    },
    data() {
        return {
            createDialog: false,
            deleteDialog: false,
            details: null // selected record details
        }
    },

    methods: {
        onCloseCreateDialog() {
            this.createDialog = false
            this.$store.commit("tenancy/setStatusResponse", true)
        },

        onCreateRecord() {
            this.details = null
            this.createDialog = true
        },
        onDeleteRecord(data) {
            this.details = data
            this.deleteDialog = true
        },
        async handleDelete() {
            await this.$store
                .dispatch("tenancy/deleteTenancyInfo", this.details.id)
                .then(() => {
                    const paramAgreementFID = qs.stringify({
                        TenancyContractAgreementFID: this.tenancyDetails.id
                    })
                    this.$store.dispatch("tenancy/getTenancyInfosById", paramAgreementFID)
                })
                .then(() => {
                    if (this.statusResponse) {
                        this.onClose()
                    }
                })
            this.deleteDialog = false
        },
        onEditRecord(data) {
            this.details = data
            this.createDialog = true
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding-top: 2.4rem;
}

.section--tenacy-info {
    padding-bottom: 5rem;
    background-color: var(--color-white);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 20px;

    .section__top {
        display: flex;
        justify-content: space-between;

        .top--title {
            padding: 2.6rem 2.4rem 3.8rem;
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
                min-width: 8.5rem;
                display: flex;
                font-family: var(--font-primary);
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 20px;
                justify-content: center;
                align-items: center;
                padding: 13.33px 17.33px;
                gap: 5.3px;
                /* 26A0F6 cyan */
                box-sizing: border-box;
                border: 1px solid var(--color-menu);
                border-radius: 8px;
                color: var(--color-menu);
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

            .top--title {
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

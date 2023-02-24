<template lang="html">
    <div :class="`section--tenacy-inventory ${inside ? 'inside' : ''}`">
        <div class="section__top">
            <h3 class="section__heading"> Unit Inventory </h3>
            <div class="section__actions">
                <v-btn class="btn btn--green btn--outline btn--withIcon" @click="onSourceAddNew">
                    <i class="ri-add-box-line"></i> Add
                </v-btn>
            </div>
        </div>
        <TenancyInventoryTable />
        <Dialog title="" :open="createDialog" :actions="false" @close="onCloseDialog">
            <AddUnitInventoryForm @close="createDialog = false" v-if="createDialog" />
        </Dialog>
        <v-snackbar v-model="snackbarActive" :timeout="2000" top right text color="green darken-4">
            <span class="message--snackBar">
                <i class="ri-information-line" /> {{ snackbarMessageActive }}
            </span>
        </v-snackbar>
    </div>
</template>

<script>
import TenancyInventoryTable from "./Table/TenancyUnitInventory/TenancyUnitInventoryTable.vue"
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import AddUnitInventoryForm from "~/components/components/Landlord/AssetInventory/components/Form/AddUnitInventoryForm.vue"
import { mapState } from "vuex"

export default {
    name: "TenancyUnitInventory",
    components: { AddUnitInventoryForm, Dialog, TenancyInventoryTable },
    props: {
        inside: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState({
            snackbar: (state) => state.inventory.snackbar,
            snackbarMessage: (state) => state.inventory.snackbarMessage
        })
    },
    data() {
        return {
            createDialog: false,
            snackbarActive: false,
            snackbarMessageActive: "Your message has been sent."
        }
    },
    methods: {
        onSourceAddNew() {
            this.createDialog = true
        },
        onCloseDialog() {
            this.$store.commit("inventory/setInventoryUnitDetail", "")
            this.createDialog = false
        },
        setSnackBar() {
            this.snackbarActive = false
            if (this.snackbar) {
                this.snackbarActive = this.snackbar
                this.snackbarMessageActive = this.snackbarMessage
                setTimeout(() => {
                    this.$store.commit("inventory/setSnackbar", false)
                }, 2000)
            }
        }
    },
    watch: {
        snackbar() {
            this.setSnackBar()
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    padding-top: 2.4rem;
}

.section--tenacy-inventory {
    padding: 2.6rem 2.4rem;
    background-color: var(--color-white);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 20px;

    .section__heading {
        font-family: var(--font-primary);
        font-style: normal;
        font-weight: 700;
        font-size: 2rem;
        line-height: 1rem;
        color: var(--color-menu);
        margin: 0;
        align-self: center;
    }

    .section__actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        align-self: center;
    }

    .section__top {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-gap: 1.2rem;
        padding-bottom: 2.4rem;
    }

    &.inside {
        padding: 0;
        box-shadow: none;
        border-radius: 0;
    }

    @media (max-width: 768px) {
        .section__top {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            .section__heading {
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

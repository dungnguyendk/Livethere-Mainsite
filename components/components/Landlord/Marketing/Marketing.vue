<template lang="html">
    <div>
        <MarketingInventoryTable />
        <!-- <v-snackbar v-model="snackbarActive" :timeout="2000" top right text color="green darken-4">
            <span class="message--snackBar">
                <i class="ri-information-line" /> {{ snackbarMessageActive }}
            </span>
        </v-snackbar> -->
        <SuccessSnackBar :open="snackbarActive" :message="snackbarMessageActive" />
    </div>
</template>

<script>
import MarketingInventoryTable from "~/components/components/Landlord/Marketing/Table/MarketingInventoryTable.vue"
import SuccessSnackBar from "~/components/shared/Snackbar/SuccessSnackBar.vue"
import { mapState } from "vuex";
export default {
    name: "Marketing",
    components: { MarketingInventoryTable, SuccessSnackBar },
    data() {
        return {
            snackbarActive: false,
            snackbarMessageActive: "Your message has been sent.",
        }
    },
    computed: {
        ...mapState({
            snackbar: (state) => state.marketing.snackbar,
            snackbarMessage: (state) => state.marketing.snackbarMessage
        }),
    },
    methods: {
        setSnackBar() {
            this.snackbarActive = false
            if (this.snackbar) {
                this.snackbarActive = this.snackbar
                this.snackbarMessageActive = this.snackbarMessage
                setTimeout(() => {
                    this.$store.commit("marketing/setSnackbar", false)
                }, 2000)
            }
        }
    },
    watch: {
        snackbar() {
            this.setSnackBar()
        },
    }
}
</script>

<style lang="scss" scoped></style>

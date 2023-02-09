<template lang="html">
    <div>
        <MarketingInventoryTable />
        <v-snackbar v-model="snackbarActive" :timeout="2000" top right text color="green darken-4">
            <span class="message--snackBar">
                <i class="ri-information-line" /> {{ snackbarMessageActive }}
            </span>
        </v-snackbar>
    </div>
</template>

<script>
import MarketingInventoryTable from "~/components/components/Landlord/Marketing/Table/MarketingInventoryTable.vue"
import { mapState } from "vuex";
export default {
    name: "Marketing",
    components: { MarketingInventoryTable },
    data() {
        return {
            snackbarActive: false,
            snackbarMessageActive: "Your message has been sent.",
        }
    },
    computed: {
        ...mapState({
            snackbar: (state) => state.inventories.snackbar,
            snackbarMessage: (state) => state.inventories.snackbarMessage
        }),
    },
    methods: {
        setSnackBar() {
            this.snackbarActive = false
            if (this.snackbar) {
                this.snackbarActive = this.snackbar
                this.snackbarMessageActive = this.snackbarMessage
                setTimeout(() => {
                    this.$store.commit("inventories/setSnackbar", false)
                }, 2000)
            }
        }
    },
    watch: {
        snackbar() {
            // console.log("snackbar:::", this.snackbar);
            this.setSnackBar()
        },
        // snackbarMessage() {
        //     this.snackbarMessageActive = this.snackbarMessage
        // }
    }
}
</script>

<style lang="scss" scoped>

</style>

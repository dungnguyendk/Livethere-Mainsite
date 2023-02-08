<template>
    <v-app>
        <v-main>
            <nuxt />
            <SuccessSnackBar :open="snackBar.show" :message="snackBar.message" />
        </v-main>
    </v-app>
</template>

<script>
import SuccessSnackBar from "~/components/shared/Snackbar/SuccessSnackBar.vue"
import { mapState } from "vuex"

export default {
    components: { SuccessSnackBar },
    layout: "default",
    computed: {
        ...mapState({
            snackBar: (state) => state.app.snackBar
        })
    }
}
</script>

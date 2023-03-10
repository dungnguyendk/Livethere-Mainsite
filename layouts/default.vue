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
import { APP_NAME, LANDLORDS_SEO_URL } from "~/ultilities/seo-configs"

export default {
    components: { SuccessSnackBar },
    layout: "default",
    computed: {
        ...mapState({
            snackBar: (state) => state.app.snackBar
        }),
        customLinks() {
            const path = this.$route.path
            return [{ rel: "canonical", href: `${LANDLORDS_SEO_URL}${path}` }]
        }
    },
    head() {
        return {
            title: APP_NAME,
            link: [...this.customLinks]
        }
    }
}
</script>

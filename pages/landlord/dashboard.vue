<template lang="html">
    <main>
        <template v-if="loggedIn">
            <LandlordPortal>
                <LandlordDashboard />
            </LandlordPortal>
        </template>
    </main>
</template>

<script>
import LandlordPortal from "~/components/components/Landlord/LandlordPortal.vue"
import LandlordDashboard from "~/components/components/Landlord/Dashboard/LandlordDashboard.vue"
import { appSettings } from "~/app-settings"
import { generateLandlordsSEOMetaTags } from "~/ultilities/seo-configs"

export default {
    components: { LandlordPortal, LandlordDashboard },
    layout: "landlord",
    head: {
        title: `Landlord | ${appSettings.siteName}`
    },

    computed: {
        loggedIn() {
            return this.$auth.loggedIn
        }
    },
    created() {
        if (!this.loggedIn) {
            this.$router.push("/landlord/signin")
        }
    },
    async asyncData({ app, store }) {
        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
        try {
            await store.dispatch("dashboard/getDashBoards")
        } catch (e) {
            console.log({ Error: e.message })
            return false
        }
    }
}
</script>

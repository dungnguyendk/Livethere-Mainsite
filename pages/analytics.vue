<template lang="html">
    <main>
        <template v-if="loggedIn">
            <LandlordPortal>
                <Analytics />
            </LandlordPortal>
        </template>
    </main>
</template>

<script>
import LandlordPortal from "~/components/components/Landlord/LandlordPortal.vue"

import { appSettings } from "~/app-settings"
import Analytics from "~/components/components/Landlord/Analytics/Analytics.vue"
import { generateLandlordsSEOMetaTags } from "~/ultilities/seo-configs"

export default {
    layout: "landlord",
    components: { Analytics, LandlordPortal },
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
            await store.dispatch("analytics/getAnalytics")
        } catch (e) {
            console.log({ Error: e.message })
            return false
        }
    }
}
</script>

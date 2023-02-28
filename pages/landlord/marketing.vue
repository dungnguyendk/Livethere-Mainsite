<template lang="html">
    <main>
        <template v-if="loggedIn">
            <LandlordPortal>
                <Marketing />
            </LandlordPortal>
        </template>
    </main>
</template>

<script>
import { appSettings } from "~/app-settings"
import Marketing from "~/components/components/Landlord/Marketing/Marketing.vue"
import LandlordPortal from "~/components/components/Landlord/LandlordPortal.vue"
import { generateLandlordsSEOMetaTags } from "~/ultilities/seo-configs"

export default {
    components: {
        LandlordPortal,
        Marketing
    },
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
            await store.dispatch("marketing/getMarketings")
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
</script>

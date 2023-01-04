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
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"
import { appSettings } from "~/app-settings"
import Analytics from "~/components/components/Landlord/Analytics/Analytics.vue"

export default {
    layout: "landlord",
    components: { Analytics, LandlordHeader, LandlordPortal },
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
    }
}
</script>

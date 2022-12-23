<template lang="html">
    <main>
        <LandlordHeader />
        <template v-if="loggedIn">
            <LandlordPortal>
                <Marketing />
            </LandlordPortal>
        </template>
    </main>
</template>

<script>
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"
import { appSettings } from "~/app-settings"
import Marketing from "~/components/components/Landlord/Marketing/Marketing.vue"
import LandlordPortal from "~/components/components/Landlord/LandlordPortal.vue"

export default {
    components: {
        LandlordPortal,
        Marketing,
        LandlordHeader
    },
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

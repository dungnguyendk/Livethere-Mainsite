<template lang="html">
    <main>
        <template v-if="loggedIn">
            <LandlordPortal>
                <AssetInventory />
            </LandlordPortal>
        </template>
    </main>
</template>

<script>
import LandlordPortal from "~/components/components/Landlord/LandlordPortal.vue"

import { appSettings } from "~/app-settings"
import AssetInventory from "~/components/components/Landlord/AssetInventory/AssetInventory.vue"
import qs from "qs"

export default {
    components: { AssetInventory, LandlordPortal },
    layout: "landlord",
    head: {
        title: `Assets | ${appSettings.siteName}`
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
        try {
            const param = qs.stringify({
                StatusFID: 0
            })
            await store.dispatch("inventories/getInventories", param)
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
</script>

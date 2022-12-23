<template lang="html">
    <nav class="nav--landlord">
        <nuxt-link
            v-for="item in navigation"
            :to="item.value"
            :class="path === item.path ? 'active' : ''"
            @click.prevent="onSelectPanel(item)"
        >
            {{ item.label }}
        </nuxt-link>
    </nav>
</template>
<script>
import LandlordDashboard from "~/components/components/Landlord/Dashboard/LandlordDashboard.vue"
import AssetInventory from "~/components/components/Landlord/AssetInventory/AssetInventory.vue"
import Analytics from "~/components/components/Landlord/Analytics/Analytics.vue"
import Insights from "~/components/components/Landlord/Insights/Insights.vue"
import MarketingInventory from "~/components/components/Landlord/MarketingInventory/MarketingInventory.vue"
import PropertyDetails from "~/components/components/Landlord/Property/PropertyDetails.vue"

export default {
    name: "LandlordNavigation",
    components: {
        PropertyDetails,
        MarketingInventory,
        Insights,
        Analytics,
        AssetInventory,
        LandlordDashboard
    },
    computed: {
        path() {
            return this.$route.path
        }
    },

    data() {
        return {
            activePanel: "dashboard",
            navigation: [
                {
                    label: "Dashboard",
                    path: "/landlord",
                    value: ""
                },
                {
                    label: "Assets",
                    path: "/landlord/assets",
                    value: "/landlord/assets"
                },
                {
                    label: "Analytics",
                    path: "/landlord/analytics",
                    value: "/landlord/analytics"
                },
                {
                    label: "Marketing",
                    path: "/landlord/marketing",
                    value: "/landlord/marketing"
                },
                {
                    label: "Insights",
                    path: "/landlord/insights",
                    value: "/landlord/insights"
                }
            ]
        }
    },
    methods: {
        onSelectPanel(panel) {
            this.activePanel = panel.value
        }
    }
}
</script>
<style lang="scss" scoped>
.nav--landlord {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-gap: 3.2rem;
    gap: 3.2rem;

    a {
        font-size: 1.6rem;
        font-weight: 500;

        &:hover,
        &:focus {
            color: var(--color-primary);
        }

        &.active {
            font-weight: 700;
            color: var(--color-primary);
        }
    }

    @media screen and (max-width: 1366px) {
        gap: 2.4rem;
        grid-gap: 2.4rem;
    }
}
</style>

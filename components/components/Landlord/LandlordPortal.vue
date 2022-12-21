<template lang="html">
    <div class="page--landlord">
        <div class="page__top">
            <nav class="nav--top">
                <a
                    v-for="item in navigation"
                    href="#"
                    :class="activePanel === item.value ? 'active' : ''"
                    @click.prevent="onSelectPanel(item)"
                >
                    {{ item.label }}
                </a>
            </nav>
        </div>
        <div class="page__container">
            <LandlordDashboard v-if="activePanel === 'dashboard'" />
            <AssetInventory v-if="activePanel === 'assets'" />
            <Analytics v-if="activePanel === 'analytics'" />
            <MarketingInventory v-if="activePanel === 'marketing'" />
            <Insights v-if="activePanel === 'insights'" />
        </div>
    </div>
</template>

<script>
import LandlordDashboard from "~/components/components/Landlord/Dashboard/LandlordDashboard.vue"
import AssetInventory from "~/components/components/Landlord/AssetInventory/AssetInventory.vue"
import Analytics from "~/components/components/Landlord/Analytics/Analytics.vue"
import Insights from "~/components/components/Landlord/Insights/Insights.vue"
import MarketingInventory from "~/components/components/Landlord/MarketingInventory/MarketingInventory.vue"

export default {
    name: "LandlordPortal",
    components: { MarketingInventory, Insights, Analytics, AssetInventory, LandlordDashboard },
    data() {
        return {
            activePanel: "dashboard",
            navigation: [
                {
                    label: "Dashboard",
                    value: "dashboard"
                },
                {
                    label: "Assets",
                    value: "assets"
                },
                {
                    label: "Analytics",
                    value: "analytics"
                },
                {
                    label: "Marketing",
                    value: "marketing"
                },
                {
                    label: "Insights",
                    value: "insights"
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
.nav--top {
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

.page--landlord {
    .page__top {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 6rem;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.08);
    }
}
</style>

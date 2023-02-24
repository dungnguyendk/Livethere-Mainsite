<template lang="html">
    <nav class="nav--landlord">
        <nuxt-link
            v-for="(item, index) in navigation"
            :to="item.value"
            :class="handleActive(item) ? 'active' : ''"
            @click.prevent="onSelectPanel(item)"
            :key="index"
        >
            {{ item.label }}
        </nuxt-link>
    </nav>
</template>
<script>
export default {
    name: "LandlordNavigation",

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
                    path: "/landlord/dashboard",
                    value: "/landlord/dashboard"
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
                }
                /*{
                    label: "Insights",
                    path: "/landlord/insights",
                    value: "/landlord/insights"
                }*/
            ]
        }
    },
    methods: {
        handleActive(menuItem) {
            if (this.path === menuItem.path) return true
            if (this.path.includes("/landlord/tenancy") && menuItem.path === "/landlord/assets")
                return true
            if (
                this.path.includes("/landlord/assets/units") &&
                menuItem.path === "/landlord/assets"
            )
                return true
        },
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

    @media screen and (max-width: 768px) {
        grid-gap: 1.2rem;
        gap: 1.2rem;
        a {
            font-size: 1.4rem;
        }
    }
}
</style>

<template lang="html">
    <nav class="nav--landlord">
        <nuxt-link v-for="(item, index) in navigation" :to="item.value" :class="handleActive(item) ? 'active' : ''"
            @click.prevent="onSelectPanel(item)" :key="index">
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
                    value: "/landlord"
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
            // if (this.path.includes("/landlord/tenancy") && menuItem.path === "/landlord/assets")
            //     return true
            // if (
            //     this.path.includes("/landlord/assets/units") &&
            //     menuItem.path === "/landlord/assets"
            // )
            //     return true
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

        &:before {
            content: "";
            position: absolute;
            top: 100%;
            left: 0;
            width: 75%;
            height: 1px;
            background-color: var(--color-primary);
            visibility: hidden;
            opacity: 0;
            transform: scale3d(0, 1, 1);
            transition: transform 0.25s ease;
            transform-origin: 100% 0%;
        }

        &:hover,
        &:focus {
            color: var(--color-primary);

            &:before {
                visibility: visible;
                opacity: 1;
                transform: scale3d(1, 1, 1);
                transform-origin: 0 100%;
            }
        }

        &.active {
            font-weight: 700;
            color: var(--color-primary);

            &:before {
                content: "";
                width: 100%;
                height: 1px;
                top: 100%;
                background-color: var(--color-primary);
                transform: none;
                transition: none;
                transform-origin: 0;
                visibility: visible;
                position: absolute;
                opacity: 1;
            }
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

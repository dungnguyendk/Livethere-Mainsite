<template lang="html">
    <div v-if="source !== null" class="headerWrapper">
        <header class="header header--landing">
            <div class="container">
                <div class="header__container">
                    <div class="header__left">
                        <SiteLogo />
                    </div>
                    <div class="header__center">
                        <ul class="menu--top">
                            <MenuItem v-for="(item, index) in menus" :source="item" :key="index" />
                            <!--                            <nuxt-link
                                                            v-for="(item, index) in menus"
                                                            :to="`/${item.linkURL}`"
                                                            :class="item.linkURL === path ? 'active' : ''"
                                                            :key="index"
                                                        >
                                                            {{ item.defaultName }}
                                                        </nuxt-link>-->
                        </ul>
                    </div>
                    <div class="header__right">
                        <nuxt-link to="/signin" class="header__link"> Login</nuxt-link>
                    </div>
                </div>
            </div>
        </header>
        <div class="mobile">
            <MobileHeader />
        </div>
    </div>
</template>

<script>
import SiteLogo from "~/components/shared/Logo/SiteLogo.vue"
import MobileHeader from "~/components/shared/Header/MobileHeader.vue"
import { httpEndpoint } from "~/services/https/endpoints"
import { defaultMenu } from "~/ultilities/menus"
import MenuItem from "~/components/shared/Header/components/Menu/MenuItem.vue"

export default {
    name: "LandingHeader",
    components: { MenuItem, MobileHeader, SiteLogo },
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        name() {
            return this.data
        },
        path() {
            return this.$router.path
        }
    },

    data() {
        return {
            menus: defaultMenu,
            menuID: 0
        }
    },

    methods: {
        async getData() {
            if (this.source && this.source.details) {
                const menuData = this.source.details.find((item) => item.fieldName === "menu")
                if (menuData) {
                    const rawMenuID = menuData !== "" ? JSON.parse(menuData.fieldValue)[0] : 0
                    if (rawMenuID && rawMenuID !== 0) {
                        try {
                            const response = await this.$axios.$get(
                                `${httpEndpoint.menus.getEntryById}?id=${rawMenuID}&LanguageId=1`
                            )
                            if (response) {
                                this.menus = response.menuItems
                            }
                        } catch (e) {
                            this.menus = []
                        }
                    }
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.header.header--landing {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
}

.menu--top {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-gap: 2.4rem;
    gap: 2.4rem;

    a {
        font-family: var(--font-second);
        font-size: 2rem;
        color: #fff;
        font-weight: 700;

        &:before {
            content: "";
            position: absolute;
            top: 100%;
            left: 0;
            width: 75%;
            height: 1px;
            background-color: #fff;
            visibility: hidden;
            opacity: 0;
            transform: scale3d(0, 1, 1);
            transition: transform 0.25s ease;
            transform-origin: 100% 0%;
        }

        &:hover,
        &:focus {
            &:before {
                visibility: visible;
                opacity: 1;
                transform: scale3d(1, 1, 1);
                transform-origin: 0 100%;
            }
        }

        &.active {
            /* &:before {
                 visibility: visible;
                 opacity: 1;
                 transform: scale3d(1, 1, 1);
                 transform-origin: 0 100%;
             }*/
        }
    }
}

.header--landing {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8rem;
    background-color: var(--color-primary);

    .header__container {
        display: grid;
        grid-template-columns: 12rem minmax(0, 1fr) 12rem;
    }

    .header__center {
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: center;
    }

    .header__right {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        a {
            font-family: var(--font-second);
            font-size: 2rem;
            color: #fff;
            font-weight: 700;

            &:hover,
            &:focus {
                color: #fff;
            }
        }
    }
}

@media screen and (max-width: 1279px) {
    .header--landing {
        display: none;
    }
}

@media screen and (min-width: 1280px) {
    .mobile {
        display: none;
    }
}
</style>

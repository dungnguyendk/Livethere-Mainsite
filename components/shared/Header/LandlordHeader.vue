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
                            <nuxt-link
                                v-for="(item, index) in menus"
                                :to="`/${item.linkURL}`"
                                :class="item.linkURL === path ? 'active' : ''"
                            >
                                {{ item.defaultName }}
                            </nuxt-link>
                        </ul>
                    </div>
                    <div class="header__right">
                        <template v-if="loggedIn">
                            <v-menu v-if="userInfo" offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        class="btn--account"
                                        color="primary"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                        outlined
                                    >
                                        {{ userInfo.displayName }}
                                        <i class="ri-arrow-drop-down-line"></i>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item>
                                        <nuxt-link to="/landlord"> Dashboard</nuxt-link>
                                    </v-list-item>
                                    <v-list-item>
                                        <a href="/" @click.prevent="onChangePassword">
                                            Change password
                                        </a>
                                    </v-list-item>
                                    <v-list-item>
                                        <a href="/" @click.prevent="onLogout">Logout</a>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </template>
                        <template v-else>
                            <div class="header__actions">
                                <nuxt-link to="/landlord/signin" class="header__link">
                                    Login
                                </nuxt-link>
                                <nuxt-link to="/register" class="header__link"> Register</nuxt-link>
                            </div>
                        </template>
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
import { mapState } from "vuex"

export default {
    name: "LandlordHeader",
    components: { MobileHeader, SiteLogo },
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },

    computed: {
        ...mapState({
            userInfo: (state) => state.app.userInfo
        }),
        name() {
            return this.data
        },
        path() {
            return this.$router.path
        },
        loggedIn() {
            return this.$auth.loggedIn
        }
    },

    data() {
        return {
            menus: defaultMenu,
            menuID: 0
        }
    },
    created() {
        if (!this.userInfo) {
            this.$store.dispatch("app/getUserInfo")
        }
    },

    methods: {
        onChangePassword() {
            this.$router.push("/landlord/change-password")
        },
        async onLogout() {
            await this.$auth.logout().then(() => {
                window.location.href = "/landlord/signin"
            })
        },

        async getData() {
            const menuData = this.source.details.find((item) => item.fieldName === "menu")
            const rawMenuID = menuData !== "" ? JSON.parse(menuData.fieldValue)[0] : 0
            if (rawMenuID && rawMenuID !== 0) {
                const response = await this.$axios.$get(
                    `${httpEndpoint.menus.getEntryById}?id=${rawMenuID}&LanguageId=1`
                )
                if (response) {
                    this.menus = response.menuItems
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.btn--account {
    border: none;
    box-shadow: none;
    min-width: 12rem;
}

.menu--top {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-gap: 2.4rem;
    gap: 2.4rem;
    margin-bottom: 0;

    a {
        font-family: var(--font-second);
        font-size: 1.8rem;
        color: #fff;
        font-weight: 600;

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

    .btn--account::v-deep .v-btn__content {
        display: flex;
        justify-content: center;
        align-items: center;
        grid-gap: 0.8rem;
        gap: 0.8rem;
        min-width: 10rem;
        color: #fff;
        text-transform: capitalize;
        font-size: 1.8rem;
        font-weight: 500;
    }

    .header__container {
        display: grid;
        grid-template-columns: 12rem minmax(0, 1fr) 12rem;
    }

    .header__actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        grid-gap: 1.2rem;
        gap: 1.2rem;
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
        grid-gap: 1.2rem;
        gap: 1.2rem;

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

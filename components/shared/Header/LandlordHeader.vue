<template lang="html">
    <div v-if="source !== null" class="headerWrapper">
        <header class="header header--landing">
            <div class="container">
                <div class="header__container">
                    <div class="header__left">
                        <SiteLogo />
                    </div>
                    <div class="header__center">
                        <ul class="menu--top" v-for="(item, index) in menus">
                            <a
                                :href="item.linkURL"
                                :class="item.linkURL === path ? 'active' : ''"
                                :key="index"
                            >
                                {{ item.defaultName }}
                            </a>
                        </ul>
                        <ul class="menu--top">
                            <a
                                :class="openContactUsDialog ? 'active' : ''"
                                @click="openContactUsDialog = true"
                            >
                                Contact us
                            </a>
                            <Dialog
                                :open="openContactUsDialog"
                                @close="closeDialog"
                                :actions="false"
                                :size="sizeDialog"
                                :title="''"
                            >
                                <ContactUsForm
                                    @close="openContactUsDialog = false"
                                    :isContactUs="true"
                                    titleContact="Contact Us"
                                    v-if="openContactUsDialog"
                                />
                            </Dialog>
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
                                        <nuxt-link to="/dashboard"> Dashboard</nuxt-link>
                                    </v-list-item>
                                    <v-list-item>
                                        <a
                                            href="/change-password"
                                            @click.prevent="onChangePassword"
                                        >
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
                                <nuxt-link to="/signin" class="header__link"> Login</nuxt-link>
                                <nuxt-link to="/register/start" class="header__link">
                                    Register
                                </nuxt-link>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </header>
        <div class="mobile">
            <LandlordMobileHeader />
        </div>
    </div>
</template>

<script>
import SiteLogo from "~/components/shared/Logo/SiteLogo.vue"
import MobileHeader from "~/components/shared/Header/MobileHeader.vue"
import { httpEndpoint } from "~/services/https/endpoints"
import { defaultMenu } from "~/ultilities/menus"
import { mapState } from "vuex"
import LandlordMobileHeader from "~/components/shared/Header/LandlordMobileHeader.vue"
import Dialog from "~/components/elements/Dialog/Dialog.vue"
import ContactUsForm from "~/components/shared/Header/Form/ContactUsForm.vue"

export default {
    name: "LandlordHeader",
    components: { LandlordMobileHeader, MobileHeader, SiteLogo, Dialog, ContactUsForm },
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
        loggedIn() {
            return this.$auth.loggedIn
        }
    },

    data() {
        return {
            path: this.$router.currentRoute.path,
            menus: defaultMenu,
            menuID: 0,
            sizeDialog: "medium",
            openContactUsDialog: false
        }
    },
    created() {
        /*console.log({ userInfos: this.userInfo, loggedIn: this.loggedIn })
        if (!this.userInfo && this.loggedIn) {
            this.$store.dispatch("app/getUserInfo")
        }*/
    },

    methods: {
        onChangePassword() {
            this.$router.push("/change-password")
        },
        async onLogout() {
            await this.$auth.logout().then(() => {
                window.location.href = "/signin"
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
        },
        closeDialog() {
            this.openContactUsDialog = false
        }
    },
    watch: {
        $route(to, from) {
            this.path = to.path
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

        &.active {
            &:before {
                content: "";
                width: 100%;
                height: 1px;
                background-color: #fff;
                transform: none;
                transition: none;
                transform-origin: 0;
                visibility: visible;
                position: absolute;
                opacity: 2;
            }
        }

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
            color: #fff;

            &:before {
                visibility: visible;
                opacity: 1;
                transform: scale3d(1, 1, 1);
                transform-origin: 0 100%;
            }
        }
    }
}

.header--landing {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8rem;
    background-color: var(--color-primary);

    .btn--account::v-deep(.v-btn__content) {
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

    .header__link {
        font-family: var(--font-second);
        font-size: 1.8rem;
        color: #fff;
        font-weight: 700;

        &:hover,
        &:focus {
            color: #fff;
        }
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

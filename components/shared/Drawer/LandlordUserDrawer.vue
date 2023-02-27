<template lang="html">
    <v-navigation-drawer class="drawer ps-drawer" v-model="open" absolute temporary>
        <div>
            <v-btn class="ps-drawer__close" @click.stop="onClose">
                <i class="icon-svg svg-close" />
            </v-btn>
        </div>
        <div class="ps-drawer__content">
            <template v-if="loggedIn">
                <v-list v-if="userInfo" class="ps-drawer__user">
                    <v-list-item>
                        <nuxt-link to="/landlord"> Dashboard</nuxt-link>
                    </v-list-item>
                    <v-list-item>
                        <a href="/landlord/change-password" @click.prevent="onChangePassword">
                            Change password
                        </a>
                    </v-list-item>
                    <v-list-item>
                        <a href="/" @click.prevent="onLogout">Logout</a>
                    </v-list-item>
                </v-list>
            </template>
            <template v-else>
                <v-list class="ps-drawer__user">
                    <v-list-item>
                        <nuxt-link to="/landlord/signin" class="header__link"> Login</nuxt-link>
                    </v-list-item>
                    <v-list-item>
                        <nuxt-link to="/register" class="header__link"> Register</nuxt-link>
                    </v-list-item>
                </v-list>
            </template>
        </div>
    </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex"

export default {
    name: "LandlordUserDrawer",
    computed: {
        ...mapState({
            appDrawer: (state) => state.app.appDrawer,
            userInfo: (state) => state.app.userInfo
        }),
        loggedIn() {
            return this.$auth.loggedIn
        }
    },
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onClose() {
            this.$emit("close")
        },
        onChangePassword() {
            this.$router.push("/landlord/change-password")
        },
        async onLogout() {
            await this.$auth.logout().then(() => {
                window.location.href = "/landlord/signin"
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.ps-drawer {
    width: 100% !important;
    background-color: #0b0c0c;
    z-index: 98;
    position: fixed;

    .ps-drawer__close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background-color: transparent;
        padding: 0;
        min-width: 4.4rem;

        i {
            font-size: 3.8rem;
            color: white;
        }
    }

    .ps-drawer__content {
        display: flex;
        flex-direction: column;
        padding-top: 4rem;

        a {
            font-size: 2rem;
            color: white;
            // line-height: 4.8rem;
            padding: 1.2rem 0;
        }
    }

    .ps-drawer__user {
        padding: 0 1.6rem 1.6rem;
        position: relative;

        .v-list-item {
            color: white;
            font-size: 2rem;
            padding: 0;
        }

        .ri-user-line {
            font-size: 2rem;
            margin-right: 0.8rem;
        }

        .user-header {
            display: flex;
            align-items: center;
            color: white;
            font-size: 2rem;
            display: block;
            padding: 0 0.8rem;
        }

        :deep(.v-list-group__header) {
            position: absolute;
            top: -0.6rem;
            left: 0;
            right: 0;
        }

        :deep(.v-list-group) {
            .mdi.mdi-chevron-down {
                color: white;
                position: absolute;
                top: 1rem;
                right: 1rem;
            }

            a {
                padding: 1.2rem;
            }
        }
    }

    .ps-drawer__bottom {
        padding-top: 3.2rem;
    }
}
</style>

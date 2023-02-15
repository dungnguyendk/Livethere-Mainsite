<template lang="html">
    <v-navigation-drawer class="drawer ps-drawer" v-model="drawer" absolute temporary>
        <div>
            <v-btn class="ps-drawer__close" @click.prevent="handleCloseDrawer()" variant="text">
                <i class="icon-svg svg-close"></i>
            </v-btn>
        </div>
        <div class="ps-drawer__content">
            <template v-if="loggedIn">
                <v-list v-if="userInfo" class="ps-drawer__user">
                    <v-list-subheader class="user-header"><i class="ri-user-line"></i>{{ userInfo.displayName }}</v-list-subheader>
                    <v-list-group>
                        <v-list-item>
                            <nuxt-link to="/landlord"> Dashboard</nuxt-link>
                        </v-list-item>
                        <v-list-item>
                            <a href="/" @click.prevent="onChangePassword"> Change password </a>
                        </v-list-item>
                        <v-list-item>
                            <a href="/" @click.prevent="onLogout">Logout</a>
                        </v-list-item>
                    </v-list-group>
                </v-list>
            </template>
            <nuxt-link
                v-for="(item, index) in menus"
                :to="`/${item.linkURL}`"
                :class="item.linkURL === path ? 'active' : ''"
                :key="index"
            >
                {{ item.defaultName }}
            </nuxt-link>
            <template v-if="loggedIn === false">
                <div class="ps-drawer__bottom">
                    <nuxt-link to="/landlord/signin" class="header__link"> Login </nuxt-link>
                    <nuxt-link to="/register" class="header__link"> Register</nuxt-link>
                </div>
            </template>
        </div>
    </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex"
import SiteLogo from "~/components/shared/Logo/SiteLogo.vue"
import { defaultMenu } from "~/ultilities/menus"
export default {
    name: "MobileNavigation",
    components: { SiteLogo },
    computed: {
        ...mapState({
            appDrawer: (state) => state.app.appDrawer,
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
        },
    },
    data() {
        return {
            drawer: false,
            menus: defaultMenu,
            menuID: 0
        }
    },

    methods: {
        handleCloseDrawer() {
            this.$store.commit("app/setAppDrawer", !this.appDrawer)
        },
        async onLogout() {
            await this.$auth.logout().then(() => {
                window.location.href = "/landlord/signin"
            })
        }
    },
    created() {
        this.drawer = this.appDrawer
    },
    watch:{
        appDrawer(){
            this.drawer = this.appDrawer
        },
    }
}
</script>

<style lang="scss" scoped>
.ps-drawer {
    width: 100% !important;
    background-color: #0b0c0c;
    .ps-drawer__close {
        position: absolute;
        top: 0;
        right: 0;
        background-color: transparent;
        padding: 0;
        min-width: 4.4rem;
        i {
            font-size: 3.8rem;
            color: white;
        }
    }
    .ps-drawer__content {
        display: block;
        display: flex;
        flex-direction: column;
        padding-top: 3.4rem;
        a {
            font-size: 2rem;
            color: white;
            // line-height: 4.8rem;
            padding: 1.2rem 3.2rem;
        }
    }
    .ps-drawer__user {
        padding: 0 1.6rem 1.6rem;
        position: relative;
        border-bottom: 1px solid white;
        .v-list-item {
            color: white;
            font-size: 2rem;
        }
        .ri-user-line {
            font-size: 2rem;
            margin-right: 0.8rem;
        }
        .user-header{
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

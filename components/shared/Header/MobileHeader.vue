<template lang="html">
    <header  id="mobile-sticky" class="header--mobile" :class="appDrawer ? 'header--mobile' : 'header--mobile open-drawer'">
        <div class="header__left">
            <a href="#" class="header__toggle" @click.prevent="handleOpenMenuDrawer">
                <i class="ri-menu-line" />
            </a>
        </div>
        <div class="header__content">
            <SiteLogo />
        </div>
        <div class="header__right">
            <!--            <v-btn icon class="btn&#45;&#45;search" @click="onOpenExternalSearch">
                <i class="ri-search-line"></i>
            </v-btn>-->
            <v-dialog
                v-model="dialogSearch"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon class="btn--search" v-bind="attrs" v-on="on" elevation="0">
                        <i class="ri-user-line"></i>
                    </v-btn>
                </template>
                <v-card class="dialog-search">
                    <v-btn icon @click="dialogSearch = false">
                        <i class="icon-svg svg-close"></i>
                    </v-btn>
                    <v-card-text>
                        <v-text-field
                            prepend-inner-icon="icon-svg svg-map"
                            placeholder="Where do you want to live?"
                            outlined
                            dense
                        ></v-text-field>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
        <MobileNavigation />
    </header>
</template>

<script>
import { mapState } from "vuex"
import SiteLogo from "~/components/shared/Logo/SiteLogo.vue"
import MobileNavigation from "~/components/shared/Drawer/MobileNavigation.vue"

export default {
    name: "MobileHeader",
    components: { SiteLogo, MobileNavigation },
    computed: {
        ...mapState({
            appDrawer: (state) => state.app.appDrawer
        })
    },
    data() {
        return {
            dialogSearch: false
        }
    },

    methods: {
        onOpenExternalSearch() {
            window.open("https://www.livethere.com/search/results?from=home")
        },
        handleOpenMenuDrawer() {
            this.$store.commit("app/setAppDrawer", !this.appDrawer)
            // console.log("handleOpenMenuDrawer",this.appDrawer);
        }
    }
}
</script>

<style lang="scss" scoped>
.btn--search {
    color: #fff;

    i {
        font-size: 2rem;
        color: #fff;
    }
}

.header--mobile {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 10px 16px;
    background-color: var(--color-primary);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;

    > * {
        flex-basis: 100%;
    }

    .header__toggle {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;

        i {
            font-size: 20px;
        }

        &:hover,
        &:focus,
        &:active {
            background-color: rgba(#fff, 0.5);
        }
    }

    .header__content {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        flex: 1 1 100%;

        .og-logo {
            display: inline-block;
        }
    }

    .header__right {
        display: flex;
        justify-content: flex-end;
    }

    &.mobile--sticky {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
    }

    @media screen and (min-width: 768px) {
    }
    @media screen and (min-width: 1280px) {
        display: none;
    }
}
.header--mobile.open-drawer {
position: static;
    margin-bottom: -6.4rem;
    transition: none;
}
.dialog-search {
    border-radius: 0;
    margin: 0;
    .v-btn--icon {
        border-radius: 0.4px;
        position: absolute;
        top: 1rem;
        right: 1rem;
        .icon-svg {
            background-color: #828586;
        }
    }
    .v-card__text {
        padding-top: 6.5rem;
    }
    :deep(.v-input) {
        fieldset {
            // color: #DFE0E0;
        }
        .svg-map {
            background-color: #e7b242;
        }
        .v-label {
            font-size: 1.6rem;
            color: #001327;
        }
        ::placeholder {
            font-size: 1.6rem;
            color: #001327;
        }
        .v-input__slot {
            min-height: 4.8rem !important;
        }
        .v-input__prepend-inner {
            margin-top: 1.2rem;
            margin-right: 0.4rem;
        }
    }
}

.v-dialog--fullscreen {
    margin: 0;
}
</style>

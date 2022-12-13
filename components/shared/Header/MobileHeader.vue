<template lang="html">
    <header class="header--mobile" id="mobile-sticky">
        <div class="header__left">
            <a href="#" class="header__toggle" @click.prevent="handleOpenMenuDrawer">
                <i class="feather icon icon-menu" />
            </a>
        </div>
        <div class="header__content">
            <SiteLogo />
        </div>
        <div class="header__right">
            <v-btn icon class="btn--search">
                <i class="ri-search-line"></i>
            </v-btn>
        </div>
    </header>
</template>

<script>
import { mapState } from "vuex"
import SiteLogo from "~/components/shared/Logo/SiteLogo.vue"

export default {
    name: "MobileHeader",
    components: { SiteLogo },
    computed: {
        ...mapState({
            appDrawer: (state) => state.app.appDrawer
        })
    },

    methods: {
        handleOpenMenuDrawer() {
            this.$store.commit("app/setAppDrawer", !this.appDrawer)
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
        padding-left: calc((100% - 600px) / 2);
        padding-right: calc((100% - 600px) / 2);
    }
    @media screen and (min-width: 1200px) {
        display: none;
    }
}
</style>

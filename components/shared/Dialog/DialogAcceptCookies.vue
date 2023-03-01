<template lang="html">
    <div :class="`dialog--accept-cookies ${isActive && 'active'}`">
        <!-- <a class="section__close op-btn--close" @click.prevent="handleCloseDialog">
            <i class="feather icon icon-x"></i>
        </a> -->
        <div class="container">
            <div class="section__wrapper">
                <div class="section__left">
                    <p>
                        Livethere uses necessary cookies to operate our website. We will also use
                        cookies to enhance your experience with Livethere, including to show you more
                        personalised content and tailored advertisements, if you select “Allow all
                        cookies”.
                        <a
                            href="https://www.livethere.com/privacy-policy#19Cookies"
                            target="_blank"
                            class="font-weight-bold text-decoration-underline"
                            >More Info</a
                        >
                    </p>
                </div>
                <div class="section__right">
                    <v-btn class="btn btn--primary btn--green" @click.prevent="handleAcceptDialog">
                        Allow all cookies
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from "js-cookie"

export default {
    name: "DialogAcceptCookies",
    data() {
        return {
            isActive: true
        }
    },
    mounted() {
        const acceptCookies = Cookies.get("accept_cookies")
        if (acceptCookies && acceptCookies === "1") {
            this.isActive = false
        }
    },
    methods: {
        handleCloseDialog() {
            Cookies.set("accept_cookies", 0)
            this.isActive = false
        },
        handleAcceptDialog() {
            Cookies.set("accept_cookies", 1)
            this.isActive = false
        }
    }
}
</script>

<style lang="scss" scoped>
.dialog--accept-cookies {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    padding: 1.5rem 0;
    z-index: 9999;
    background-color: #1d2a30;
    transform: translateY(100%);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

    p {
        margin-bottom: 0;
        color: white;
        font-size: 1.6rem;
    }

    a {
        font-size: 1.6rem;
        &:hover {
            color: var(--color-primary);
        }
    }

    .section__right {
        // padding-right: 4rem;
        padding-left: 1rem;
    }

    .section__close {
        position: absolute;
        top: 30px;
        right: 30px;
    }

    .section__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &.active {
        transform: translateY(0);
    }

    @media screen and (max-width: 1024px) {
        .section__left {
            text-align: justify;
        }
        .section__right {
            padding-right: 0;
        }

        .section__wrapper {
            display: grid;
            grid-row-gap: 10px;
        }
    }
}
</style>

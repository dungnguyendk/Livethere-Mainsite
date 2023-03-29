<template>
    <div class="banner--policy-terms">
        <div class="banner__container">
            <div class="banner__background-image">
                <img :src="imgURLFirst" alt="" />
            </div>
            <div class="banner__overlay"></div>
            <div class="banner__content">
                <h3 class="banner__content-title">
                    <slot />
                </h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PolicyTermsBanner",

    data() {
        return {
            imgURLFirst: "/img/static/home-cta-bg.png"
        }
    },

    mounted() {},

    methods: {}
}
</script>

<style lang="scss" scoped>
.banner--policy-terms {
    height: 25.4rem;
    margin-top: -0.5rem;
    .banner__container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 100%;
    }
    .banner__overlay {
        position: absolute;
        background-color: #000000;
        opacity: 0.55;
        width: 100%;
        height: 100%;
    }
    .banner__background-image {
        position: absolute;
        height: 100%;
        width: 100%;
        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }
    .banner__content {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .banner__content-title {
        font-weight: 900;
        font-size: 2.8rem;
        line-height: 3.8rem;
        text-align: center;
        color: var(--color-white);
        margin-bottom: 3.3rem;
        text-transform: capitalize;
    }
    @media screen and (max-width: 768px) {
        .banner__content {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .banner__content-title {
            font-weight: 900;
            font-size: 1.8rem;
            line-height: 2.8rem;
            text-align: center;
            color: var(--color-white);
            margin-bottom: 3.3rem;
        }
    }
}
</style>
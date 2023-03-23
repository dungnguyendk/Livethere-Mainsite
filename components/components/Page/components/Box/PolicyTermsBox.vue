<template>
    <div class="box--policy-terms">
        
    </div>
</template>

<script>
export default {
    name: "PolicyTermsBox",

    data() {
        return {}
    },

    mounted() {},

    methods: {}
}
</script>

<style lang="scss" scoped>

.box--policy-terms {
    background-color: var(--bg-color-white);
    padding: 3.2rem 0;
    border-bottom: 0.1rem solid var(--border-color);
    .box__title {
        font-weight: 800;
        font-size: 2rem;
        line-height: 2.8rem;
        color: var(--bg-green);
    }
}
.box__content-main {
    .box__content-main--left {
        .box__ordinal-numbers {
            font-weight: 700;
            font-size: 1.6rem;
            line-height: 2.4rem;
        }
    }
    .box__content-main--right {
        .box__text {
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: var(--color-title-black);
        }
    }
}
</style>
<template lang="html">
    <div class="section--call-to-action">
        <h2 class="section__title"> {{ heading }} </h2>

        <p class="section__content">{{ content }}</p>

        <div class="section__bottom">
            <button class="section__bottom__action"> {{ buttonText }} </button>
            <div class="section__bottom__text">
                <NuxtLink to="/">
                    <img src="@/static/img/projectlist-sections/livethere.png" alt="" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SectionCallToAction",
    props: {
        heading: {
            type: String,
            default: " We have help 321 Buyer"
        },
        content: {
            type: String,
            default:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        },
        buttonText: {
            type: String,
            default: "Get Tailored Help"
        },
        buttonLink: {
            type: String,
            default: "/"
        }
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
.section--call-to-action {
    background-color: #fafafa;
    border-radius: 2rem;
    padding: 3.1rem 1.6rem 2.8rem;

    @media screen and (max-width: 1279px) {
        margin-bottom: 2.4rem;
    }
}

.section__title {
    font-size: 2.4rem;
    line-height: 2.8rem;
    font-weight: 700;
    color: var(--color-text-black);
}

.section__content {
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: var(--color-text-black);
    margin-bottom: 2.6rem !important;
}

.section__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__action {
        background-color: var(--bg-btn);
        color: var(--color-white);
        font-size: 1.6rem;
        text-align: center;
        font-weight: 700;
        line-height: 2.2rem;
        padding: 1.1rem 7rem;
        margin-left: -2.2rem;

        &:hover {
            background-color: var(--color-menu);
        }

        @media screen and (max-width: 767px) {
            margin-bottom: 2.5rem;
        }
    }

    &__text {
        align-self: end;
    }

    @media screen and (max-width: 767px) {
        flex-flow: column;
        align-items: start;
    }
}
</style>

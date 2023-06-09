<template lang="html">
    <section class="section--home-latest-projects" v-if="articles">
        <div class="container">
            <div class="section-container">
                <div class="section__top">
                    <h3 class="section__top-title">Latest Projects</h3>
                </div>
                <div class="section__body">
                    <swiper class="swiper swiper-item" :options="swiperOption">
                        <swiper-slide class="swiper-box" v-for="article in articles" :key="article.id">
                            <div class="article-wrapper">
                                <ArticleGrid :article="article" />
                            </div>
                        </swiper-slide>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-pagination" slot="pagination"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                    <div class="swiper-fraction">
                        <span class="fraction-to">{{ this.fractionTo }}</span>
                        <span class="fraction-form" >{{ this.fractionForm  }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ArticleGrid from "~/components/components/Landlord/Insights/Article/ArticleGrid.vue"
import { mapState } from "vuex"
export default {
    name: "HomeLatestProjectsSection",
    components: { ArticleGrid },
    computed: {
        ...mapState({
            articles: (state) => state.project.latestProjects
        }),
    },
    data() {
        const self = this
        return {
            swiperOption: {
                loop: false,
                duration: 5000,
                speed: 750,
                arrows: true,
                autoplay: false,
                slidesPerView: 1,
                spaceBetween: 10,
                preloadImages: false, 
                lazy: true, 
                pagination: {
                    el: ".swiper-pagination",
                    type: "progressbar"
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                breakpoints: {
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 16
                    }
                },
                on: {
                    slideChange: function () {
                        let lastVisibleItem = this.realIndex + this.params.slidesPerView
                        let slidesLength = this.slides.length - 2
                        let lastVisibleIndex = this.realIndex + this.params.slidesPerView
                        lastVisibleIndex === Number(self.fractionForm)
                            ? (self.activeColorArrow = true)
                            : (self.activeColorArrow = false)
                    }
                }
            },
            preNumber: 1,
            nextNumber: 3,
            fractionTo: 1,
            fractionForm: 3,
            activeColorArrow: false
        }
    },
    mounted() {
        this.fractionForm = this.articles.length.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        this.fractionTo = this.fractionTo.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
    }
}
</script>

<style lang="scss" scoped>
.section--home-latest-projects {
    padding: 6rem 0 8rem;
    @media screen and (max-width: 960px) {
        padding: 5rem 0;
    }
    @media screen and (max-width: 768px) {
        .section__top {
            bottom: -2.5rem;
        }
    }
    @media screen and (max-width: 720px) {
        padding: 5rem 0 4rem;
        .section__top {
            bottom: 2rem;
        }
        .section__body {
            display: flex;
            justify-content: center;
        }
        .swiper-item {
            padding-top: 4rem;
        }
    }
}
.section__top {
    position: relative;
    bottom: -2.75rem;
    text-align: center;
    .section__top-title {
        font-weight: 800;
        font-size: 2rem;
        line-height: 2.8rem;
        color: var(--color-primary);
        margin-bottom: 0;
        text-align: center;
    }
}
.section__body {
    position: relative;

    .swiper-button-prev,
    .swiper-button-next {
        width: 1.8rem;
        height: 2.8rem;
        top: 2rem;
        right: 0;

        left: auto;
        &::after {
            font-size: 1.8rem;
            color: var(--color-primary);
            display: none;
        }
        &::before {
            content: "\ea6e";
            font-family: "remixicon" !important;
            font-style: normal;
            font-size: 1.8rem;
            color: var(--color-primary);
        }
    }
    .swiper-button-prev {
        right: 20.5rem;
        &::before {
            content: "\ea64";
        }
    }
    .swiper-pagination-progressbar {
        position: absolute;
        top: 1rem;
        right: 6.8rem;
        left: auto;
        width: 9rem;
        height: 0.2rem;
        background-color: var(--border-color);
        :deep(.swiper-pagination-progressbar-fill) {
            background: var(--color-primary);
        }
    }
    .swiper-fraction {
        z-index: 10;
        position: absolute;
        top: -0.1rem;
        right: 4rem;
        span {
            font-size: 1.6rem;
            color: var(--color-title-black);
        }
        .fraction-to {
            color: var(--color-primary);
            position: absolute;
            top: 0;
            right: 12.6rem;
        }
    }
}
.section__top-process {
    position: absolute;
    top: -4rem;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
        display: flex;
        align-items: center;
        i {
            font-size: 1.8rem;
            color: var(--color-primary);
        }
    }

    .section__top-ruler-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 2.85rem;
        p {
            margin-bottom: 0;
            font-weight: 700;
            font-size: 1.6rem;
            line-height: 2.8rem;
            color: var(--color-primary);
        }
        .section__top-ruler {
            margin: 0 0.8rem;
            width: 9rem;
            background-color: var(--border-color);
            border-radius: 10rem;
            height: 0.2rem;
            overflow: hidden;
            position: relative;
        }
    }
    .section__top-scroll {
        height: 0.2rem;
        background-color: var(--color-primary);
        border-radius: 10rem;
        position: absolute;
        z-index: 8;
        left: 0;
    }
}

.swiper-item {
    padding-top: 6rem;
    padding-bottom: 2.6rem;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));

    .swiper-box{
        &:not(:nth-child(1), :nth-child(2), :nth-child(3)){
            display: none;
        }
    }
}
.swiper-container{ 
    .swiper-box{
        &:not(:nth-child(1), :nth-child(2), :nth-child(3)){
            display: inline-block;
        }
    }
}
.article-wrapper {
    padding: 0 1rem;
}
.swiper-button-active {
    opacity: 1;
}

</style>



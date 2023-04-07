<template>
    <div class="swiper--project">
        <div class="swiper__top">
            <h3>
               {{ title }}
            </h3>
        </div>
        <div class="swiper__content" v-if="latestProjects.length > 0">
            <swiper class="swiper swiper-item" :options="swiperOption">
                <swiper-slide class="swiper-box" v-for="(element, index) in latestProjects" :key="index">
                    <!-- <pre>
                        <code>
                            {{ element }}
                        </code>
                    </pre> -->
                    <SwiperCard :item="element"/>
                    
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
            <div class="swiper-fraction">
                <span class="fraction-to">{{ this.fractionTo }}</span>
                <span class="fraction-form">{{ this.fractionForm }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import SwiperCard from "~/components/components/Projects/components/Card/SwiperCard.vue"
import { mapState } from "vuex"

export default {
    name: "ProjectDetailSwiper",
    components: {
        SwiperCard
    },
    props:{
        title:{
            type: String,
            default: "Project D",
        }
    },
    computed: {
        ...mapState({
            popularListing: (state) => state.project.popularListings,
            latestProjects: (state) => state.project.latestProjects
        }),
        // currentSlugId(){
        //     return this.popularListing.id;
        // }
    },
    data() {
        const self = this
        return {
            imageURL: "/img/banner/topbannertwo.jpg",
            swiperOption: {
                loop: false,
                duration: 5000,
                speed: 750,
                arrows: true,
                autoplay: false,
                slidesPerView: 1,
                spaceBetween: 10,
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
                        spaceBetween: 26
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
            activeColorArrow: false,
        }
    },
    mounted() {
        this.fractionForm = this.popularListing.length.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        this.fractionTo = this.fractionTo.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        
    },
    created(){
        console.log("Created",this.popularListing)
    }
   
}
</script>

<style lang="scss" scoped>
.swiper--project {
    padding: 0 1.2rem;
    .swiper__top {
        position: relative;
        bottom: -2.75rem;
        text-align: center;
        h3 {
            font-weight: 800;
            font-size: 2rem;
            line-height: 2.8rem;
            color: var(--color-primary);
            margin-bottom: 0;
            text-align: center;
            text-transform: capitalize;
        }
    }
    .swiper__content {
        position: relative;
    }
    @media only screen and (max-width: 767px) {
        .swiper-item {
            padding-top: 10rem;
        }
        .swiper-pagination-progressbar {
            top: 6.5rem;
        }
        .swiper-button-prev,
        .swiper-button-next {
            top: 7.5rem;
        }
        .swiper-fraction {
            top: 5.5rem;
        }
        .swiper__content {
            max-width: 42rem;
            margin: 0 auto;
        }
    }
}
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

.swiper-button-active {
    opacity: 1;
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
</style>

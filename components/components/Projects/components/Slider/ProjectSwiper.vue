<template>
    <div class="swiper--project">
        <div class="swiper__top">
            <h3>
                <slot />
            </h3>
        </div>
        <div class="swiper__content">
            <swiper class="swiper swiper-container" :options="swiperOption">
                <swiper-slide
                 v-for="(element, index) in popularListing"
                 :key="index"
                >
                    <SwiperCard :item="element"/>
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-next" slot="button-next" :class="{'swiper-button-active' : activeColorArrow}"></div>
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
import SwiperCard from '../Card/SwiperCard.vue'
export default {
    name: "ProjectSwiper",
    components: {
        SwiperCard
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
            popularListing: [
                {
                    id: 1,
                    title: "Waterfront Bungalow at Ocean Drive",
                    imgURL: require(`../../../../../static/img/static/listing1.png`),
                    address: "Ocean Drive, Singapore 098314",
                    totalBed: 4,
                    totalBath: 4
                },
                {
                    id: 2,
                    title: "Skypark @ Somerset",
                    imgURL: require(`../../../../../static/img/static/listing2.png`),
                    address: "Ocean Drive, Singapore 098314",
                    totalBed: 4,
                    totalBath: 4
                },
                {
                    id: 3,
                    title: "Soleil @ Sinaran",
                    imgURL: require(`../../../../../static/img/static/listing3.png`),
                    imgURLIconFirst: require(`../../../../../static/img/home-icon1.png`),
                    imgURLIconSecond: require(`../../../../../static/img/home-icon2.png`),
                    imgURLIconThird: require(`../../../../../static/img/home-icon3.png`),
                    address: "Ocean Drive, Singapore 098314",
                    totalBed: 4,
                    totalBath: 4
                },
                {
                    id: 4,
                    title: "Skypark @ Somerset",
                    imgURL: require(`../../../../../static/img/static/listing2.png`),
                    address: "Ocean Drive, Singapore 098314",
                    totalBed: 4,
                    totalBath: 4
                },
                {
                    id: 5,
                    title: "Soleil @ Sinaran",
                    imgURL: require(`../../../../../static/img/static/listing3.png`),
                    address: "Ocean Drive, Singapore 098314",
                    totalBed: 4,
                    totalBath: 4
                }
            ],
            preNumber: 1,
            nextNumber: 3,
            fractionTo: 1,
            fractionForm: 3,
            activeColorArrow: false
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
    }
}
</script>

<style lang="scss" scoped>
.swiper--project {
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
        .swiper-container {
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
.swiper-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 6rem;
    padding-bottom: 2.6rem;
}
</style>

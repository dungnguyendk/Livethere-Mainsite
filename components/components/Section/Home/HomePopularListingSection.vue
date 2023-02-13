<template lang="html">
    <section class="section--home-popular-listing">
        <div class="container">
            <div class="section__container">
                <div class="section__top">
                    <h3 class="section__top-title">Popular listings</h3>
                    <!-- <div class="section__top-right">
                        <div class="section__top-process">
                            <button @click="onPreviousSlide()">
                                <i class="ri-arrow-left-s-line"></i>
                            </button>
                            <div class="section__top-ruler-wrapper">
                                <p>{{ preNumber }}</p>
                                <div class="section__top-ruler">
                                <div class="section__top-scroll" :style="{'width' : width + '%'}"></div>
                                </div>
                                <p>{{ nextNumber }}</p>
                            </div>
                            <button @click="onNextSlide()">
                                <i class="ri-arrow-right-s-line"></i>
                            </button>
                        </div>
                    </div> -->
                </div>
                <!-- <div class="section__body">
                        <div class="swiper-item" v-for="item in popularListing" :key="item.id" >
                        <div class="swiper-box" v-for="element in item.subListing" :key="element.id">
                            <div class="swiper-box__top">
                                <div class="swiper-box__image">
                                    <img :src="element.imgURL" alt=""/>
                                </div>
                                <div class="swiper-box__title">
                                    <nuxt-link to="/" class="swiper-box__title-link"> {{ element.title }} </nuxt-link>
                                </div>
                            </div>
                            <div class="swiper-box__content">
                                <div class="swiper-box__content-first">
                                    <img :src="element.imgURLIconFirst" alt=""/>
                                    <p>{{ element.address }}</p>
                                </div>
                                <div class="swiper-box__content-second">
                                    <div>
                                        <img :src="element.imgURLIconSecond" alt=""/>
                                        <p>{{ element.totalBed }}</p>
                                    </div>
                                    <div>
                                        <img :src="element.imgURLIconThird" alt=""/>
                                        <p>{{ element.totalBath }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>             
                    </div>
                </div> -->


                <div class="section__body">
                    <swiper class="swiper swiper-item" :options="swiperOption">
                        <swiper-slide class="swiper-box" v-for="element in popularListing" :key="element.id">
                            <div class="swiper-box__top">
                                <div class="swiper-box__image">
                                    <img :src="element.imgURL" alt=""/>
                                </div>
                                <div class="swiper-box__title">
                                    <nuxt-link to="/" class="swiper-box__title-link"> {{ element.title }} </nuxt-link>
                                </div>
                            </div>
                            <div class="swiper-box__content">
                                <div class="swiper-box__content-first">
                                    <img :src="element.imgURLIconFirst" alt=""/>
                                    <p>{{ element.address }}</p>
                                </div>
                                <div class="swiper-box__content-second">
                                    <div>
                                        <img :src="element.imgURLIconSecond" alt=""/>
                                        <p>{{ element.totalBed }}</p>
                                    </div>
                                    <div>
                                        <img :src="element.imgURLIconThird" alt=""/>
                                        <p>{{ element.totalBath }}</p>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-pagination" slot="pagination"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                        

                    </swiper>
                    <div class="swiper-fraction">
                        <span class="fraction-to">0{{ this.fractionTo }}</span>
                        <span class="fraction-form">{{ this.fractionForm  }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "HomePopularListingSection",
    data() {
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
                    el: '.swiper-pagination',
                    type: 'progressbar'
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    768: {
                    slidesPerView: 3,
                    spaceBetween: 26
                    },
                }
            },
            popularListing: [
                {
                    id: 1,
                    title: "Waterfront Bungalow at Ocean Drive",
                    imgURL: require(`../../../../static/img/listing1.png`),
                    imgURLIconFirst: require(`../../../../static/img/home-icon1.png`),
                    imgURLIconSecond: require(`../../../../static/img/home-icon2.png`),
                    imgURLIconThird: require(`../../../../static/img/home-icon3.png`),
                    address: "Ocean Drive, Singapore 098314",
                    totalBed: 4,
                    totalBath: 4
                },
                {
                    id: 2,
                    title: "Skypark @ Somerset",
                    imgURL: require(`../../../../static/img/listing2.png`),
                    imgURLIconFirst: require(`../../../../static/img/home-icon1.png`),
                    imgURLIconSecond: require(`../../../../static/img/home-icon2.png`),
                    imgURLIconThird: require(`../../../../static/img/home-icon3.png`),
                    address: "Ocean Drive, Singapore 098314",
                    totalBed: 4,
                    totalBath: 4
                },
                {
                    id: 3,
                    title: "Soleil @ Sinaran",
                    imgURL: require(`../../../../static/img/listing3.png`),
                    imgURLIconFirst: require(`../../../../static/img/home-icon1.png`),
                    imgURLIconSecond: require(`../../../../static/img/home-icon2.png`),
                    imgURLIconThird: require(`../../../../static/img/home-icon3.png`),
                    address: "Ocean Drive, Singapore 098314",
                    totalBed: 4,
                    totalBath: 4
                },
                {
                    id: 4,
                    title: "Skypark @ Somerset",
                    imgURL: require(`../../../../static/img/listing2.png`),
                    imgURLIconFirst: require(`../../../../static/img/home-icon1.png`),
                    imgURLIconSecond: require(`../../../../static/img/home-icon2.png`),
                    imgURLIconThird: require(`../../../../static/img/home-icon3.png`),
                    address: "Ocean Drive, Singapore 098314",
                    totalBed: 4,
                    totalBath: 4
                },
                {
                    id: 5,
                    title: "Soleil @ Sinaran",
                    imgURL: require(`../../../../static/img/listing3.png`),
                    imgURLIconFirst: require(`../../../../static/img/home-icon1.png`),
                    imgURLIconSecond: require(`../../../../static/img/home-icon2.png`),
                    imgURLIconThird: require(`../../../../static/img/home-icon3.png`),
                    address: "Ocean Drive, Singapore 098314",
                    totalBed: 4,
                    totalBath: 4
                }
            ],
            preNumber: 1,
            nextNumber: 3,
            fractionTo: 1,
            fractionForm: 3,

        }
    },
    methods: {
    },
    // computed: {
    //     fractionForm(){
    //         return this.fractionForm.
    //     }
    // },
    mounted(){
        this.fractionForm = this.popularListing.length.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        
    }
}
</script>
<style lang="scss" scoped>
.section--home-popular-listing {
    padding: 5.9rem 0;
    background-color: var(--bg-color-white);
    
    @media screen and (max-width: 768px) {
        .section__top{
            margin-bottom: 3rem;
        }
        .section__body{
            .swiper-item{

            }
        }
    }
}
.section__top {
    margin-bottom: -2.5rem;
    text-align: center;
    .section__top-left {
        width: 23.7rem;
    }
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
            font-family: 'remixicon' !important;
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
        height: .2rem;
        background-color: var(--border-color);
        :deep(.swiper-pagination-progressbar-fill) {
            background: var(--color-primary);
        }
    }
    .swiper-fraction {
       
        position: absolute;
        top: -.1rem;
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
            .section__top-scroll {
                height: 0.2rem;
                background-color: var(--color-primary);
                border-radius: 10rem;
                position: absolute;
                z-index: 8;
                left: 0;
            }
        }
    }
}

.swiper-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding-top: 
    padding-top: 60px;
}

.swiper-box {
    .swiper-box__top {
        position: relative;
        padding: 0 1.2rem;
        .swiper-box__image {
            img {
                width: 100%;
                object-fit: cover;
                border-radius: 2rem;
            }
        }
        .swiper-box__title {
            position: absolute;
            background-color: #edb842;
            padding: 2.2rem 1.6rem 2.5rem;
            bottom: 2.3rem;
            margin-bottom: 0;
            display: flex;
            align-items: center;
            left: -1.2rem;
            width: 85.9%;
            max-height: 7.5rem;
            box-sizing: border-box;
            .swiper-box__title-link {
                color: var(--color-white);
                font-size: 2rem;
                line-height: 2.8rem;
                text-align: left;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
    }
    .swiper-box__content {
        padding-top: 0.9rem;
        .swiper-box__content-first {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            p {
                margin-bottom: 0;
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2.4rem;
                color: var(--color-title-black);
                padding-left: 1rem;
            }
        }
        .swiper-box__content-second {
            display: flex;
            align-items: center;
            div {
                display: flex;
                align-items: center;
                p {
                    margin-bottom: 0;
                    margin-left: 0.8rem;
                    color: var(--color-title-black);
                }
                img {
                }
                &:first-child {
                    margin-right: 4.6rem;
                }
            }
        }
    }
}
</style>

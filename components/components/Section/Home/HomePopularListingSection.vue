<template lang="html">
    <section class="section--home-popular-listing">
        <div class="container">
            <div class="section__container">
                <div class="section__top">
                    <div class="section__top-left">&nbsp;</div>
                    <h3 class="section__top-title">Popular listings</h3>
                    <div class="section__top-right">
                        <div class="section__top-right-process">
                            <button>
                                <i class="ri-arrow-left-s-line"></i>
                            </button>
                            <div>
                                <p>01</p>
                                <div class="section__top-right-ruler">
                                <div class="section__top-right-scroll"></div>
                                </div>
                                <p>03</p>
                            </div>
                            <button>
                                <i class="ri-arrow-right-s-line"></i>
                            </button>
                        </div>
                   </div>
                    </div>
                </div>
                <div class="section__body">
                   

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
                loop: true,
                duration: 5000,
                speed: 750,
                arrows: true,
                autoplay: false,
                slidesPerView: 1,
                spaceBetween: 0,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                }
            },
            popularListing: [
                {
                    id: 1,
                    subListing: [
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
                        }
                    ]
                },
                {
                    id: 2,
                    subListing: [
                        {
                            id: 4,
                            title: "Skypark @ Somerset",
                            imgURL: require(`../../../../static/img/listing3.png`),
                            imgURLIconFirst: require(`../../../../static/img/home-icon1.png`),
                            imgURLIconSecond: require(`../../../../static/img/home-icon2.png`),
                            imgURLIconThird: require(`../../../../static/img/home-icon3.png`),
                            address: "Ocean Drive, Singapore 098314",
                            totalBed: 4,
                            totalBath: 4
                        },
                        {
                            id: 5,
                            title: "Waterfront Bungalow at Ocean Drive",
                            imgURL: require(`../../../../static/img/listing2.png`),
                            imgURLIconFirst: require(`../../../../static/img/home-icon1.png`),
                            imgURLIconSecond: require(`../../../../static/img/home-icon2.png`),
                            imgURLIconThird: require(`../../../../static/img/home-icon3.png`),
                            address: "Ocean Drive, Singapore 098314",
                            totalBed: 5,
                            totalBath: 3
                        },
                        {
                            id: 6,
                            title: "Waterfront Bungalow at Ocean Drive",
                            imgURL: require(`../../../../static/img/listing1.png`),
                            imgURLIconFirst: require(`../../../../static/img/home-icon1.png`),
                            imgURLIconSecond: require(`../../../../static/img/home-icon2.png`),
                            imgURLIconThird: require(`../../../../static/img/home-icon3.png`),
                            address: "Ocean Drive, Singapore 098314",
                            totalBed: 6,
                            totalBath: 9
                        }
                    ]
                },
                {
                    id: 3,
                    subListing: [
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
                        }
                    ]
                }
            ],
            width: 2
        }
    }
}
</script>
<style lang="scss" scoped>
.section--home-popular-listing {
    margin-top: 16.3rem;
    .container {
        .section__container {
        }
    }
}
.section__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3.4rem;
    .section__top-left {
    }
    .section__top-title {
        font-weight: 800;
        font-size: 2rem;
        line-height: 2.8rem;
        color: var(--color-primary);
    }
    .section__top-right {
    }
}
.section__body {
}
.section__top-right-process {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
        display: flex;
        align-items: center;
    }
    .section__top-right-ruler {
        width: 9rem;
        background-color: var(--border-color);
        border-radius: 10rem;
        height: 1rem;
        overflow: hidden;
        position: relative;
        .section__top-right-scroll {
            height: 1rem;
            width: 2rem;
            background-color: var(--color-primary);
            border-radius: 10rem;
            position: absolute;
            z-index: 8;
            right: 1rem;
        }
    }
}
.swiper {
    .swiper-item {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.swiper-box {
    width: 30.77%;
    .swiper-box__top {
        position: relative;

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
            color: var(--color-white);
            font-size: 2rem;
            line-height: 2.8rem;
            padding: 2.2rem 1.6rem 2.5rem;
            bottom: 2.3rem;
            margin-bottom: 0;
            left: -1.2rem;
            width: 85.9%;
        }
    }
    .swiper-box__content {
        .swiper-box__content-first {
        }
        .swiper-box__content-second {
        }
    }
    &:nth-child(2) {
        margin: 0 3.8rem;
    }
}
</style>

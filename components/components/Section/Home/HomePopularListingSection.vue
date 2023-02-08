<template lang="html">
    <section class="section--home-popular-listing">
        <div class="container">
            <div class="section__container">
                <div class="section__top">
                    <div class="section__top-left">&nbsp;</div>
                    <h3 class="section__top-title">Popular listings</h3>
                    <div class="section__top-right">
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
                    </div>
                </div>
                <div class="section__body">
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
            ],
            width: 14.3, //14.3 giá trị này tùy thuộc vào số lượng slide có trong carousel
            preNumber: 1, 
            nextNumber: 7
        }
    }, 
    methods: {
        onPreviousSlide(){
            if(this.width > 14.3){
                let plusNumber = (((9 / this.nextNumber) / 9) * 100)
                this.width = Number(this.width.toFixed(1)) - Number(plusNumber.toFixed(1)) 
                console.log("this.width: ", this.width)
            }
        }, 
        onNextSlide(){
            if(this.width < 100){
                let plusNumber = (((9 / this.nextNumber) / 9) * 100)
                this.width = Number(this.width.toFixed(1)) + Number(plusNumber.toFixed(1)) 
                console.log("this.width: ", this.width)

            }
        }
    }
}
</script>
<style lang="scss" scoped>
.section--home-popular-listing {
    padding:  5.9rem 0; 
    background-color: var(--bg-color-white);
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
    .section__top-right {
    }
}
.section__body {
}
.section__top-process {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
        display: flex;
        align-items: center;
        i {
            font-size: 1.8rem;
        }
    }

    .section__top-ruler-wrapper {
        display: flex; 
        align-items: center;
        justify-content: space-between;
        margin: 0 2.85rem;
        p{
            margin-bottom: 0;
            font-weight: 400; 
            font-size: 1.6rem;
            line-height: 2.8rem;
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
            padding: 2.2rem 1.6rem 2.5rem;
            bottom: 2.3rem;
            margin-bottom: 0;
            display: flex;
            align-items: center;
            left: -1.2rem;
            width: 85.9%;
            max-height: 7.5rem;
            box-sizing: border-box;
            .swiper-box__title-link{
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
        margin-top: 0.95rem;
        .swiper-box__content-first {
            display: flex;
            align-items: center;
            margin-bottom: 1.8rem;
            p{
                margin-bottom: 0;
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2.4rem;
                color: var(--color-title-black); 
                margin-left: 0.8rem;
            }
        }
        .swiper-box__content-second {
            display: flex;
            align-items: center;
            div{
                display: flex;
                align-items: center;
                p{
                    margin-bottom: 0;
                    margin-left: 0.8rem;
                }
                img{

                }
                &:first-child{
                    margin-right: 5.279rem;
                }
            }
        }
    }
    &:nth-child(2) {
        margin: 0 3.8rem;
    }
}
</style>

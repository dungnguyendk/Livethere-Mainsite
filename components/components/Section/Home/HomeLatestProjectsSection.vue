<template lang="html">
    <section class="section--home-latest-projects">
        <div class="container">
            <div class="section-container">
                <div class="section__top">
                    <div class="section__top-left">&nbsp;</div>
                    <h3 class="section__top-title">Latest Projects</h3>
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
                    <ArticleGrid  v-for="article in articles" :key="article.id" :article="article" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ArticleGrid from "~/components/components/Landlord/Insights/Article/ArticleGrid.vue"
export default {
    name: "HomeLatestProjectsSection",
    components: { ArticleGrid},
    data() {
        return {
            width: 14.3, //14.3 giá trị này tùy thuộc vào số lượng slide có trong carousel
            preNumber: 1,
            nextNumber: 7, 
            articles: [
                {
                    id: 1,
                    urlImage: "https://picsum.photos/600/400.jpg?random=",
                    title: "Closers Group Real Estate",
                    content:
                        "Nestled in the prestigious District 11 at Novena, Soleil @ Sinaran is an award"
                },
                {
                    id: 2,
                    urlImage: "https://picsum.photos/600/400.jpg?random=",
                    title: "Stellar Property Advisors",
                    content: "Nassim Jade is a 10-storey boutique styled freehold development."
                },
                {
                    id: 3,
                    urlImage: "https://picsum.photos/600/400.jpg?random=",
                    title: "Keller Williams Exclusive Properties",
                    content:
                        "Residents at Watermark @ Robertson Quay can enjoy a leisure swim in the pool"
                }
            ]
        }
    },
    methods: {
        onPreviousSlide() {
            if (this.width > 14.3) {
                let plusNumber = (9 / this.nextNumber / 9) * 100
                this.width = Number(this.width.toFixed(1)) - Number(plusNumber.toFixed(1))
                console.log("this.width: ", this.width)
            }
        },
        onNextSlide() {
            if (this.width < 100) {
                let plusNumber = (9 / this.nextNumber / 9) * 100
                this.width = Number(this.width.toFixed(1)) + Number(plusNumber.toFixed(1))
                console.log("this.width: ", this.width)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.section--home-latest-projects {
    padding: 8rem;
    margin-bottom: 2.6rem;
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
    }
    .section__top-right {
    }
}
.section__body {
    display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        width: 100%;
        grid-gap: 2.4rem;
        margin: 3.2rem auto 8rem;
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
        p {
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
        margin-top: 0.95rem;
        .swiper-box__content-first {
            display: flex;
            align-items: center;
            margin-bottom: 2.134rem;
            p {
                margin-bottom: 0;
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2.4rem;
                color: var(--color-title-black);
                margin-left: 1.25rem;
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
                    margin-left: 1.25rem;
                }
                img {
                }
                &:first-child {
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



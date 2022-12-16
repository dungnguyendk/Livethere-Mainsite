<template lang="html">
    <div class="section--landing-service">
        <div class="container">
            <div class="section__container">
                <div class="section__header">
                    <h3 class="section__header-title">Your Personal Property Concierge Managing All your property needs</h3>
                    <p class="section__header-text">
                        We also help you find the right tenant with ease through our expansive database as well as gain high visibility for your property with our marketing services.
                    </p>
                </div>
                <div class="section__content" 
                >
                    <div class="section__box"
                        v-for="box in listBoxes"
                        :key="box.id"
                    >
                        <div class="section__box-icon">
                            <img :src="box.imgURL" alt="">
                        </div>
                        <p class="section__box-text">{{box.text}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LandlordLandingServices",
    data() {
        return {
            listBoxes: [
                {
                    id: 1,
                    imgURL: "/img/icon-1.png",
                    text: "Personal Property Concierge"
                },
                {
                    id: 2,
                    imgURL: "/img/icon-2.png",
                    text: "Assistance via Digital Platform with Good Customer Service"
                },
                {
                    id: 3,
                    imgURL: "/img/icon-3.png",
                    text: "Easy Search for Rental Properties"
                },
                {
                    id: 4,
                    imgURL: "/img/icon-4.png",
                    text: "Home Rental Journey Tailored to Your Lifestyle"
                },
                {
                    id: 5,
                    imgURL: "/img/icon-5.png",
                    text: "Seamless Rental Experience & Aftercare"
                },
                {
                    id: 6,
                    imgURL: "/img/icon-6.png",
                    text: "Dedicated End-to-End Customer Support"
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.section--landing-service {
    padding: 4.2rem 0 6.8rem;
    .section__container {
        .section__header {
            margin-bottom: 3.6rem;
            .section__header-title {
                font-weight: 800;
                font-size: 2rem;
                line-height: 2.8rem;
                color: var(--color-primary);
                margin-bottom: 1.6rem;
                text-align: center;
            }
            .section__header-text {
                text-align: center;
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2.4rem;
                margin-bottom: 0;
                color: #171717;
            }
        }

        .section__content {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            grid-gap: 2.4rem;
            .section__box {
                flex-wrap: wrap;
                justify-content: center;
                padding: 2.4rem 1.6rem;
                .section__box-icon {
                    margin-bottom: 1.2rem;
                    img {
                        width: 6rem;
                        height: 6rem;
                        display: block;
                        margin: 0 auto;
                    }
                }
                .section__box-text {
                    font-weight: 500;
                    font-size: 1.6rem;
                    line-height: 2.4rem;
                    color: #000000;
                    text-align: center;
                    margin-bottom: 0;
                }
            }
        }
    }
    @media screen and (max-width: 992px) {
        .section__container {
            .section__content {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }
    }
    @media screen and (max-width: 768px) {
        max-width: 42rem;
        margin: 0 auto;
        padding-bottom: 0;
        .section__container {
            .section__header {
                margin-bottom: 3.6rem;
                .section__header-title {
                    font-weight: 800;
                    font-size: 2rem;
                    line-height: 2.8rem;
                    color: var(--color-primary);
                    margin-bottom: 1.6rem;
                    text-align: center;
                }
                .section__header-text {
                    text-align: justify;
                    font-weight: 500;
                    font-size: 1.6rem;
                    line-height: 2.4rem;
                    margin-bottom: 0;
                    color: #171717;
                }
            }

            .section__content {
                display: grid;
                grid-template-columns: repeat(1, minmax(0, 1fr));
                grid-gap: 2.4rem;
                .section__box {
                    flex-wrap: wrap;
                    justify-content: center;
                    padding: 2.4rem 1.6rem;
                    .section__box-icon {
                        margin-bottom: 1.2rem;
                        img {
                            width: 6rem;
                            height: 6rem;
                            display: block;
                            margin: 0 auto;
                        }
                    }
                    .section__box-text {
                        font-weight: 500;
                        font-size: 1.6rem;
                        line-height: 2.4rem;
                        color: #000000;
                        text-align: center;
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
</style>
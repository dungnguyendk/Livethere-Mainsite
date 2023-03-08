<template lang="html">
    <div class="section--landing-service">
        <div class="container">
            <div class="section__container">
                <h3>Our Services</h3>
                <div class="section__content">
                    <div class="section__box" v-for="box in listBoxes" :key="box.id">
                        <div class="section__box-icon">
                            <img :src="box.imgURL" alt="" />
                        </div>
                        <p class="section__box-text">{{ box.text }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Services",
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
                    imgURL: "/img/home.png",
                    text: "Good Tenant Database"
                },
                {
                    id: 4,
                    imgURL: "/img/tenant-database.png",
                    text: "Good Tenant Database"
                },
                {
                    id: 5,
                    imgURL: "/img/icon-6.png",
                    text: "Dedicated End-to-End Customer Support"
                },
                {
                    id: 6,
                    imgURL: "/img/home.png",
                    text: "Professional Property Marketing Services"
                },
                {
                    id: 7,
                    imgURL: "/img/marketing-service.png",
                    text: "Professional Property Marketing Services"
                },
                {
                    id: 8,
                    imgURL: "/img/icon-5.png",
                    text: "Seamless Renting Experience & Aftercare"
                },
                {
                    id: 9,
                    imgURL: "/img/market-trends.png",
                    text: "Insights into Latest Residential Market Trends"
                },
                {
                    id: 10,
                    imgURL: "/img/invest-divest.png",
                    text: "Invest & Divest in Residential Market"
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.section--landing-service {
    padding: 4.2rem 0 5.8rem;
    background-color: var(--bg-color-white);
    .section__container {
        h3 {
            font-weight: 800;
            font-size: 2rem;
            line-height: 2.8rem;
            color: var(--color-primary);
            margin-bottom: 2.4rem;
            text-align: center;
        }

        .section__content {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-gap: 2.4rem;
            padding-bottom: 2.8rem;
            .section__box {
                flex-wrap: wrap;
                justify-content: center;
                padding: 2.4rem;
                background-color: white;
                grid-column-end: span 3;
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
        .section__box:nth-child(n + 5) {
            grid-column-end: span 4;

            // grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }
    @media screen and (max-width: 820px) {
        .section__content {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-gap: 2.4rem;
            .section__box {
                flex-wrap: wrap;
                justify-content: center;
                padding: 2.4rem;
                background-color: white;
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
        .section__box:nth-child(n + 5) {
            grid-column-end: span 4;

            // grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }
    @media screen and (max-width: 768px) {
        margin: 0 auto;
        padding-bottom: 0;
        .section__container {
            .section__content {
                display: grid;
                grid-template-columns: repeat(6, minmax(0, 1fr));
                grid-gap: 2.4rem;
                .section__box {
                    flex-wrap: wrap;
                    justify-content: center;
                    padding: 2.4rem 1.6rem;
                    grid-column-end: span 3;

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
    @media screen and (max-width: 425px) {
        margin: 0 auto;
        padding-bottom: 0;
        .section__container {
            .section__content {
                display: grid;
                grid-template-columns: repeat(1, minmax(0, 1fr));
                grid-gap: 2.4rem;
                .section__box {
                    flex-wrap: wrap;
                    justify-content: center;
                    padding: 2.4rem 1.6rem;
                    // grid-column-end: span 4;

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

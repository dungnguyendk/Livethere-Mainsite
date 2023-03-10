<template lang="html">
    <div class="section--landing-service">
        <div class="container">
            <div class="section__container">
                <div class="section__header">
                    <h3 class="section__header-title"
                        >Providing you greater convenience to managing your property portfolio with
                        access to digital tools and personal concierge</h3
                    >
                    <p class="section__header-text">
                        Finding the right match to your property is easy with our global tenant
                        database and marketing services
                    </p>
                </div>
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
    name: "LandlordLandingServices",
    data() {
        return {
            listBoxes: [
                {
                    id: 1,
                    imgURL: "/img/invest-divest.png",
                    text: "Manage Property Portfolio Digitally"
                },
                {
                    id: 2,
                    imgURL: "/img/icon-2.png",
                    text: "Lease Expiry Notification"
                },
                {
                    id: 3,
                    imgURL: "/img/icon-5.png",
                    text: "Digital Contracts"
                },

                {
                    id: 4,
                    imgURL: "/img/market-trends.png",
                    text: "Latest Market Insights"
                },
                {
                    id: 5,
                    imgURL: "/img/icon-1.png",
                    text: "Personal Property Concierge"
                },
                {
                    id: 6,
                    imgURL: "/img/marketing-service.png",
                    text: "Professional Property Marketing"
                },

                {
                    id: 7,
                    imgURL: "/img/tenant-database.png",
                    text: "Rich Tenant Database"
                },

                {
                    id: 8,
                    imgURL: "/img/icon-6.png",
                    text: "Dedicated End-to-End Services"
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.section--landing-service {
    padding: 4.2rem 0 6.8rem;
    background-color: var(--bg-color-white);

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
                padding: 0 24.4rem;
            }

            .section__header-text {
                text-align: center;
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2.4rem;
                margin-bottom: 0;
                padding: 0 18rem;
                color: var(--color-title-black);
                font-style: italic;
            }
        }

        .section__content {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
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
            .section__box:nth-child(1) {
                .section__box-text {
                    padding: 0 3.2rem;
                }
            }
        }
    }

    @media screen and (max-width: 992px) {
        .section__container {
            .section__content {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .section__header {
                .section__header-text {
                    padding: 0;
                }
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
                    padding: 0;
                }

                .section__header-text {
                    text-align: justify;
                    font-weight: 500;
                    font-size: 1.6rem;
                    line-height: 2.4rem;
                    margin-bottom: 0;
                    color: var(--color-title-black);
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

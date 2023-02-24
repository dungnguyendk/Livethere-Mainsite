<template lang="html">
    <div class="section--landing-intro">
        <div class="container">
            <div class="section__container">
                <div class="section__left">
                    <div class="image-first">
                        <img :src="imgURLFirst" alt="" />
                    </div>
                    <div class="image-second">
                        <img :src="imgURLSecond" alt="" />
                    </div>
                </div>
                <div class="section__right">
                    <p>
                        There’s no better time than now to make the most out of your property. It’s
                        easy.
                    </p>
                    <p>
                        With our expansive pool of ready tenants from all over the globe, we’ll find
                        you the right match specific to your requirements, grow your income as well
                        as manage your property. We take you through the process start to finish.
                        And it doesn’t end there, we’ll be with you the entire journey.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LandlordLandingIntro",
    data() {
        return {
            imgURLFirst: "/img/landlords/landing-intro-1.png",
            imgURLSecond: "/img/landlords/landing-intro-2.png"
        }
    }
}
</script>
<style lang="scss" scoped>
.section--landing-intro {
    padding: 5.1rem 0;

    .section__container {
        display: flex;
        justify-content: center;
        align-items: center;

        .section__left {
            width: 54.77%;
            display: flex;
            z-index: 1;

            .image-first {
                width: 46.5%;
                border: 0.8rem solid #ffffff;
                border-radius: 2rem;
                filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.04))
                    drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.08));
                overflow: hidden;
                height: fit-content;

                img {
                    width: 100%;
                    object-fit: cover;
                }
            }

            .image-second {
                width: 58.41%;
                border: 0.8rem solid #ffffff;
                border-radius: 2rem;
                overflow: hidden;
                margin-top: 5.8rem;
                position: relative;
                right: 6.8rem;
                z-index: -1;
                filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.04))
                    drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.08));

                img {
                    width: 100%;
                    object-fit: cover;
                }
            }
        }

        .section__right {
            width: 45.22%;

            p {
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2.4rem;
                color: #171717;
                margin-bottom: 0;

                &:first-child {
                    margin-bottom: 1.5rem;
                }
            }
        }
    }

    @media screen and(max-width: 768px) {
        max-width: 42rem;
        margin: 0 auto;
        padding-bottom: 0;
        .section__container {
            display: block;

            .section__left {
                width: 100%;
                display: flex;
                z-index: 1;

                .image-first {
                    width: 46.5%;
                    border: 0.8rem solid #ffffff;
                    border-radius: 2rem;
                    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.04))
                        drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.08));
                    overflow: hidden;
                    height: fit-content;

                    img {
                        width: 100%;
                        object-fit: cover;
                    }
                }

                .image-second {
                    width: 100%;
                    border: 0.8rem solid #ffffff;
                    border-radius: 2rem;
                    overflow: hidden;
                    margin-top: 5.8rem;
                    position: relative;
                    right: 6.8rem;
                    z-index: 1;
                    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.04))
                        drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.08));

                    img {
                        width: 100%;
                        object-fit: cover;
                    }
                }
            }

            .section__right {
                width: 100%;
                margin-top: 1.5rem;

                p {
                    font-weight: 500;
                    font-size: 1.6rem;
                    line-height: 2.4rem;
                    color: #171717;
                    margin-bottom: 0;
                    text-align: justify;

                    &:first-child {
                        margin-bottom: 1.5rem;
                    }
                }
            }
        }
    }
}
</style>

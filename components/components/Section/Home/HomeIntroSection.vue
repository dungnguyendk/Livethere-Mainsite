<template lang="html">
    <section class="section--home-intro">
        <div class="container">
            <div class="section__container">
                <div class="section__left">
                    <div class="image-first">
                        <img :src="imgURLFirst" alt="">
                    </div>
                    <div class="image-second">
                        <img :src="imgURLSecond" alt="">
                    </div>
                </div>
                <div class="section__right">
                    <div class="section__right-image">
                        <img :src="imgURLThird" alt="">
                    </div>
                    <h3 class="section__right-title">Cost guide to renting a room or home</h3>
                    <div class="section__right-content">
                        <p>Trust our agents to get you the best lease as we turn your space into extra income.</p>
                        <p>We care to find you good and reliable ten-ants who will keep your property well-maintained. Because at Ohmyhome, we’re always by your side, always on your side.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "HomeIntroSection",
    data() {
        return {
            imgURLFirst: "/img/home-intro1.png",
            imgURLSecond: "/img/home-intro2.png",
            imgURLThird: "/img/home-text.png"
        }
    }
}
</script>

<style lang="scss" scoped>
.section--home-intro {
    padding: 10.4rem 0;
    .container {
        .section__container {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    @media screen and (max-width: 768px) {
        .container {
            .section__container {
                display: block;
                .section__left {
                    width: 100%;
                    padding: 0 2.4rem;
                    margin-bottom: 7rem;
                }
                .section__right {
                    width: 100%;
                    padding: 0 2.4rem;
                    .section__right-image {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        
                    }
                    .section__right-content {
                        text-align: justify;
                    }
                }
            }
        }
    }
}
.section__left {
    width: 54.57%;
    display: flex;
    .image-first {
        width: 100%;
        img {
            object-fit: cover;
            border-radius: 2rem;
            width: 100%;
        }
    }
    .image-second {
        margin: 7.2rem 3rem 0;
        width: 100%;
        img {
            object-fit: cover;
            border-radius: 2rem;
            width: 100%;
        }
    }
}
.section__right {
    width: 45.43%;
    padding-left: 4rem;
    .section__right-image {
        margin-bottom: 6rem;
        img {
            object-fit: cover;
        }
    }
    .section__right-title {
        font-weight: 800;
        font-size: 2rem;
        line-height: 2.8rem;
        text-transform: capitalize;
        color: var(--color-primary);
        margin-bottom: 1.9rem;
    }
    .section__right-content {
        p {
            color: var(--color-title-black);
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 2.4rem;
            margin-bottom: 0;
        }
    }
}
</style>

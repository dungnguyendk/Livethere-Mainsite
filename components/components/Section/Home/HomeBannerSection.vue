<template lang="html">
    <section class="section--home-banner">
        <div class="section__container">
            <div class="section__background-image">
                <v-carousel :interval="interval" :show-arrows="false" hide-delimiters cycle height="540">
                    <v-carousel-item
                        v-for="image in listImageBanner"
                        :key="image.id"
                        :src="image.imgURLBanner"
                        reverse-transition="fade-transition"
                        transition="fade-transition"></v-carousel-item>
                </v-carousel>
            </div>
            <div class="section__overlay"></div>
            <div class="section__text-top">
                <img :src="imgURLTextTop" alt="">
            </div>
            <div class="section__text-bottom">
                <img :src="imgURLTextImage" alt="">
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "HomeBannerSection",
    data() {
        return {
            interval: 7000,
            imgURLTextTop: "/img/home-text-top.png",
            imgURLTextImage: "/img/home-text-bottom.png",
            listImageBanner: [
                {
                    id: 1,
                    imgURLBanner: require(`../../../../static/img/home-banner-01.png`)
                },
                {
                    id: 2,
                    imgURLBanner: require(`../../../../static/img/home-banner-02.png`)
                },
                {
                    id: 3,
                    imgURLBanner: require(`../../../../static/img/home-banner-03.png`)
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.section--home-banner {
    height: 54rem;
    margin-bottom: 8.1rem;
    .section__container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 100%;
        width: 100%;
    }
    @media screen and (max-width: 768px) {

        .section__text-top {
            position: absolute;
            opacity: 0.4;
            right: 5rem;
            margin: 0 auto;
            top: 3.5rem;
            width: 60%;
        }
        .section__text-bottom {
            position: absolute;
            bottom: 6.3rem;
            width: 60%;
        }
    }
}
.section__background-image {
    position: absolute;
    height: 100%;
    width: 100%;

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}
.section__overlay {
    position: absolute;
    background-color: #000000;
    opacity: 0.4;
    width: 100%;
    height: 100%;
}
.section__text-top {
    position: absolute;
    opacity: 0.4;
    right: 7.1rem;
    top: 3.5rem;
}
.section__text-bottom {
    position: absolute;
    bottom: 6.3rem;
}
</style>

<template lang="html">
    <section class="section--home-banner">
        <div class="section__container">
            <div class="section__background-image">
                <v-carousel
                    ref="carouselBanner"
                    :interval="interval"
                    :show-arrows="false"
                    hide-delimiters
                    cycle
                    :touchless="true"
                >
                    <v-carousel-item
                        v-for="image in listImageBanner"
                        :key="image.id"
                        :src="image.imgURLBanner"
                        reverse-transition="fade-transition"
                        transition="carousel-transition"
                    ></v-carousel-item>
                </v-carousel>
            </div>
            <div class="section__overlay"></div>
            <div class="section__text-top">
                <img :src="imgURLTextTop" alt="" />
            </div>
            <div class="section__text-bottom">
                <!-- <img :src="imgURLTextImage" alt="" /> -->
                <strong>Experience</strong>vibrant city life
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "HomeBannerSection",
    data() {
        return {
            carouselBanner: 0,
            interval: 3000,
            imgURLTextTop: "/img/static/home-text-top.png",
            imgURLTextImage: "/img/static/home-text-bottom.png",
            listImageBanner: [
                {
                    id: 1,
                    imgURLBanner: require(`../../../../static/img/static/home-banner-01.png`)
                },
                {
                    id: 2,
                    imgURLBanner: require(`../../../../static/img/static/home-banner-02.png`)
                },
                {
                    id: 3,
                    imgURLBanner: require(`../../../../static/img/static/home-banner-03.png`)
                }
            ]
        }
    },
    methods: {

        
    },
}
</script>
<style lang="scss" scoped>
.section--home-banner {
    position: relative;
    z-index: 1;
    .section__container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 100%;
        width: 100%;
    }
    
    

}
.section__text-bottom {
    font-size: 3.2rem;
    color: white;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    strong {
        font-family: 'Almonde' ,"Nunito", sans-serif;
        font-size: 7rem;
        font-weight: 400;
        margin-right: 1.2rem;
    }
}
.section__background-image {
    height: 100%;
    width: 100%;

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    :deep(.v-window__container) {
        transition: 1.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        transition: none;
    }
}
.section__overlay {
    position: absolute;
    background-color: #000000;
    opacity: 0.4;
    width: 100%;
    height: 100%;
    z-index: 5;
}
.section__text-top {
    position: absolute;
    opacity: 0.4;
    right: 7.1rem;
    top: 3.5rem;
    z-index: 6;
}
.section__text-bottom {
    position: absolute;
    bottom: 2rem;
    z-index: 6;
}
// .fade-transition {
//     &-enter-active,
//     &-leave,
//     &-leave-to {
//         transition: 500ms; /* here you can define your desired time for transition */
//     }
// }
.v-window {
    height: 100% !important;
    position: relative;
    :deep(.v-window__container) {
        transform: none !important;
        position: relative;
        padding-bottom: 31.25%;
    }
    .v-window-item {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: all 1s;
        z-index: 2;
    }
    :deep(.v-carousel__item) {
        height: 100% !important;
    }
    .carousel-transition-enter {
        transform: none !important;
        opacity: 0 !important;
    }
    .carousel-transition-enter-to {
        transform: none !important;
        opacity: 1 !important;
    }
    .carousel-transition-leave {
        transform: none !important;
        opacity: 1 !important;
    }
    .carousel-transition-leave-to {
        transform: none !important;
        opacity: 0 !important;
    }
}
@media screen and (max-width: 768px) {
    .section__text-top {
        position: absolute;
        opacity: 0.4;
        margin: 0 auto;
        top: 3.5rem;
        right: 0;
        width: 60%;
    }
    .section__text-bottom {
        position: absolute;
        font-size: 2.2rem;
        strong {
            font-size: 4.4rem;
        }
    }
}
</style>

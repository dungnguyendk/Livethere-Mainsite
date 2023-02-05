<template lang="html">
    <section class="section--home-banner">
        <div class="section__container">
            <div class="section__background-image">
                <img :src="imgURLBanner" alt=""/>
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
    data(){
        return {
            imgURLBanner: "/img/home-banner.png", 
            imgURLTextTop: "/img/home-text-top.png", 
            imgURLTextImage: "/img/home-text-bottom.png"
        }
    }
}
</script>

<style lang="scss" scoped>
.section--home-banner{ 
    height: 54rem;
    margin-bottom: 18.5rem;
    .section__container{ 
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 100%;
        .section__background-image{ 
            position: absolute;
            height: 100%;
            width: 100%;
            img{
                height: 100%;
                width: 100%; 
                object-fit: cover;
                
            }
        }
        .section__overlay{ 
            position: absolute;
            background-color: #000000;
            opacity: 0.4;
            width: 100%; 
            height: 100%;
        }
        .section__text-top{
            position: absolute;
            opacity: 0.4;
            right: 7.1rem;
            top: 3.5rem;

        }
        .section__text-bottom{
            position: absolute;
            bottom: 6.3rem;

        }
    }
}
</style>

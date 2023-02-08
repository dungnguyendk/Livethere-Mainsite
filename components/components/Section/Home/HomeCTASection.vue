<template lang="html">
    <section class="section--home-cta">
        <div class="section__container">
            <div class="section__background-image">
                <img :src="imgURLFirst" alt="">
            </div>
            <div class="section__overlay"></div>
            <div class="section__content">
                <h3 class="section__content-title">Find your perfect home in the heart of Singapore</h3>
                <button class="btn btn--primary section__content-button">List with Livethere Today</button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "HomeCTASection", 
    data(){
        return {
            imgURLFirst: "/img/home-cta-bg.png"
        }
    }
}
</script>

<style lang="scss" scoped>
.section--home-cta{
    height: 25.4rem;
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
                object-fit: cover;
                width: 100%;
                height: 100%;
            }
        }
        .section__overlay{
            position: absolute;
            background-color: #000000;
            opacity: 0.55;
            width: 100%; 
            height: 100%;
        }
        .section__content{
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .section__content-title{
                font-weight: 900;
                font-size: 2.8rem; 
                line-height: 3.8rem;
                text-align: center;
                color: var(--color-white); 
                margin-bottom: 3.3rem;

            }
            .section__content-button{
               background-color: #EDB842;
               width: 22rem;
               margin: 0 auto;
            }
        }
    }
}
</style>

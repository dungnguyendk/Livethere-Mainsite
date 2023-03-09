<template>
    <div class="container">
        <div class="section--inspired-us">
            <div class="section__left">
                <h4> Inspired Us </h4>
                <p>
                    We recognised that renting a property or letting one can be a lengthy and
                    time-consuming process, especially with countless options on a multitude of
                    property portals and listings sites. </p
                ><p>
                    We aim to cut out all of this noise and provide a tailored rental journey, using
                    technology and good customer service</p
                >
            </div>
            <div class="section__right">
                <img src="/img/Rectangle 1121.png" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "InspireUs"
}
</script>

<style lang="scss" scoped>
.section--inspired-us {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: center;
    .section__left {
        h4 {
            font-family: var(--font-primary);
            color: var(--color-menu);
            margin-bottom: 0;
        }
        p {
            padding-top: 1.6rem;
            margin-bottom: 0.8rem;
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: var(--color-title-black);
        }
    }
}
@media screen and (max-width: 768px) {
    .section--inspired-us {
        // display: block;
        .section__left {
            p {
                font-weight: 500;
                font-size: 1.4rem;
                line-height: 1.8rem;
            }
        }
        .section__right {
            display: flex;
            justify-content: center;
            img {
                width: 37.4rem;
            }
        }
    }
}
@media screen and (max-width: 425px) {
    .section--inspired-us {
        display: flex;
        flex-direction: column-reverse;

        .section__left {
            h4 {
                padding-top: 1.2rem;
                display: flex;
                justify-content: center;
            }
            p {
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 1.2rem;
            }
        }
        .section__right {
            display: flex;
            justify-content: center;
            
            
        }
    }
}
</style>

<template>
    <div class="block--list">
        <div class="block__img">
            <NuxtLink to="/">
                <img :src="imgUrl" alt="" />
            </NuxtLink>
        </div>

        <div class="block__info">
            <h4>
                <NuxtLink to="/">
                    {{ title }}
                </NuxtLink>
            </h4>

            <span>
                {{ date }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "SectionProjectLaunchesList",

    props: {
        imgUrl: {
            type: String,
            default: ""
        },

        title: {
            type: String,
            default: ""
        },

        date: {
            type: String,
            default: ""
        }
    }
}
</script>

<style lang="scss" scoped>
.block--list {
    @media screen and (max-width: 1279px) {
        margin-bottom: 1.8rem;
    }

    @media screen and (max-width: 767px) {
        margin-bottom: 1.2rem;
    }
    .block__img {
        position: relative;
        padding-bottom: 61.7%;
        a {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
        img {
            border-radius: 1.2rem;
            border: 1px solid #e5e5e5;
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            max-width: 100%;
        }

        &:hover {
            opacity: 0.8;
        }

        @media screen and (max-width: 1279px) {
            margin-bottom: 0.8rem;
        }
    }
    .block__info {
        h4 {
            a {
                padding-top: 0.8rem;
                font-size: 1.6rem;
                font-weight: 700;
                line-height: 2.4rem;
                color: #0b0c0c;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;

                &:hover {
                    color: var(--color-menu);
                }
            }
        }

        span {
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: #828586;
        }
    }
}
</style>

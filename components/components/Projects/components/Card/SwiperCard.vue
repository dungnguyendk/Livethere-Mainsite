<template>
    <div class="card--swiper">
        <div class="card__header" @click="onRouteToDetails()">
            <div class="card__header-image">
                <img :src="item.imgURL" alt="" />
                <div class="card__header-image-hover">
                    <div class="card__header-image-circle">
                        <p>View</p>
                        <i class="ri-arrow-right-line"></i>
                    </div>
                </div>
            </div>
            <div class="card__header-title">
                <nuxt-link to="/projects/details" class="card__header-link">{{
                    item.title
                }}</nuxt-link>
            </div>
        </div>
        <div class="card__content">
            <div class="card__content-first">
                <img src="../../../../../static/img/home-icon1.png" alt="" />
                <p>{{ item.address }}</p>
            </div>
            <div class="card__content-second">
                <div>
                    <img src="../../../../../static/img/home-icon2.png" alt="" />
                    <p>{{ item.totalBed }}</p>
                </div>
                <div>
                    <img src="../../../../../static/img/home-icon3.png" alt="" />
                    <p>{{ item.totalBath }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SwiperCard",
    props: {
        item: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {}
    },

    mounted() {},

    methods: {
        onRouteToDetails() {
            this.$router.push("/projects/details")
        }
    }
}
</script>

<style lang="scss" scoped>
.card--swiper {
    cursor: pointer;
    .card__header {
        position: relative;
        padding: 0 1.2rem;
        .card__header-image {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                width: 100%;
                object-fit: cover;
                border-radius: 2rem;
            }

        }
        .card__header-title {
            position: absolute;
            background-color: #edb842;
            padding: 2.2rem 1.6rem 2.5rem;
            bottom: 2.3rem;
            margin-bottom: 0;
            display: flex;
            align-items: center;
            left: -1.2rem;
            width: 85.9%;
            max-height: 7.5rem;
            box-sizing: border-box;
            transition: none;
            .card__header-link {
                color: var(--color-white);
                font-size: 2rem;
                line-height: 2.8rem;
                text-align: left;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
        &:hover,
            &:active {
                .card__header-image-hover {
                    visibility: visible;
                    opacity: 1;
                }
                .card__header-title {
                    display: flex;
                    justify-content: center;
                    visibility: visible;
                    opacity: 1;
                    background: transparent;
                    position: absolute;
                    left: 0;
                    right: 0;
                    width: 100%;
                    bottom: auto;
                    top: 9rem;
                    padding: 0 4.2rem;
                   

                    .card__header-link {
                        text-align: center;
                        margin-bottom: 5rem;
                        font-weight: 800;
                        font-size: 2.4rem;
                        line-height: 3rem;
                    }
                }
            }
    }
    .card__content {
        padding-top: 0.9rem;
        .card__content-first {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            p {
                margin-bottom: 0;
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2.4rem;
                color: var(--color-title-black);
                padding-left: 1rem;
            }
        }
        .card__content-second {
            display: flex;
            align-items: center;
            div {
                display: flex;
                align-items: center;
                p {
                    margin-bottom: 0;
                    margin-left: 0.8rem;
                    color: var(--color-title-black);
                }
                img {
                }
                &:first-child {
                    margin-right: 4.6rem;
                }
            }
        }
    }

    @media only screen and (max-width: 767px) {
        .card__content-second {
            p {
                font-weight: 500;
                font-size: 1.6rem;
                line-height: 2.4rem;
                color: var(--color-title-black);
            }
        }
    }
}
.card__header-image-hover {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    top: 0;
    left: 0;
    border-radius: 2rem;
    visibility: hidden;
    opacity: 0;
    transition: all 0.2s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    h3 {
        font-weight: 800;
        font-size: 2.4rem;
        line-height: 3rem;
        color: var(--color-white);
        text-align: center;
        margin: 0 auto 6.5rem;
    }
    .card__header-image-circle {
        width: 11rem;
        height: 11rem;
        border-radius: 50%;
        border-width: 0.01rem;
        border-style: solid;
        border-color: rgba(255, 255, 255, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 0 auto;
        position: relative;
        top: 5rem;
        z-index: 8;

        i {
            color: var(--color-white);
            font-size: 2.4rem;
        }
        p {
            font-weight: 700;
            font-size: 1.6rem;
            line-height: 3rem;
            color: var(--color-white);
            margin-bottom: 0;
        }
        &::after {
            content: "";
            width: 11rem;
            height: 11rem;
            border-radius: 50%;
            position: absolute;
            border-width: 0.1rem;
            border-style: solid;
            border-color: var(--color-white) transparent transparent;
            position: absolute;
            z-index: 10;
            animation: spin 8s linear infinite;
        }
    }
}
@keyframes spin {
    100% {
        transform: rotate(-360deg);
    }
}
</style>

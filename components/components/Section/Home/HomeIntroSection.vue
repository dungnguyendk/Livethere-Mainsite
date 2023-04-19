<template lang="html">
    <section v-if="source" class="section--home-intro">
        <div class="container">
            <div class="section__container">
                <div class="section__left">
                    <div class="image-first">
                        <img :src="firstImageURL" alt="" />
                    </div>
                    <div class="image-second">
                        <img :src="secondImageURL" alt="" />
                    </div>
                </div>
                <div class="section__right">
                    <h3 class="section__right-title">{{ primaryHeading }}</h3>
                    <h4 class="section__right-subtitle">{{ secondaryHeading }}</h4>
                    <div class="section__right-content" v-html="description"> </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { getImageURLByFieldName, getStringByFieldName } from "~/ultilities/fieldHelper"

export default {
    name: "HomeIntroSection",
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        rawJSON() {
            return this.source ? this.source.details : []
        },
        primaryHeading() {
            return getStringByFieldName(this.rawJSON, "primary_heading") ?? "Primary heading"
        },
        secondaryHeading() {
            return getStringByFieldName(this.rawJSON, "second_heading") ?? "Secondary heading"
        },
        description() {
            return getStringByFieldName(this.rawJSON, "description") ?? "Description"
        },
        firstImageURL() {
            return (
                getImageURLByFieldName(this.rawJSON, "first_image") ??
                "https://placehold.co/300x400"
            )
        },
        secondImageURL() {
            return (
                getImageURLByFieldName(this.rawJSON, "second_image") ??
                "https://placehold.co/300x400"
            )
        }
    },
    data() {
        return {
            imgURLFirst: "/img/static/home-intro1.png",
            imgURLSecond: "/img/static/home-intro2.png",
            imgURLThird: "/img/static/home-text.png"
        }
    }
}
</script>

<style lang="scss" scoped>
.section--home-intro {
    padding: 10.4rem 0;
    .section__container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.section__left {
    width: 54.57%;
    display: flex;
    .image-first {
        width: 100%;
        margin: 0 1.5rem;
        img {
            object-fit: cover;
            border-radius: 2rem;
            width: 100%;
        }
    }
    .image-second {
        margin: 7rem 1.5rem 0;
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
    padding-left: 5.8rem;
    padding-top: 4.2rem;
    .section__right-image {
        margin-bottom: 4.3rem;
        img {
            object-fit: cover;
        }
    }
    .section__right-title {
        font-family: "Almonde", "Nunito", sans-serif;
        font-weight: 400;
        color: var(--color-primary);
        font-size: 6.2rem;
        margin-bottom: 3.7rem;
    }
    .section__right-subtitle {
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
@media screen and (max-width: 1024px) {
    .section__right {
        .section__right-title {
            font-size: 4rem;
        }
    }
}
@media screen and (max-width: 992px) {
    .section__right {
        .section__right-content {
            text-align: justify;
        }
    }
}
@media screen and (max-width: 768px) {
    .section--home-intro {
        padding-bottom: 4.5rem;
        padding-top: 4.5rem;
        .section__container {
            display: block;
        }
    }
    .section__left {
        width: 100%;
        padding: 0;
        margin-bottom: 3.5rem;
    }
    .section__right {
        width: 100%;
        padding: 0;
        .section__right-image {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .section__right-content {
            text-align: center;
        }
        .section__right-title {
            text-align: center;
        }
    }
}
</style>

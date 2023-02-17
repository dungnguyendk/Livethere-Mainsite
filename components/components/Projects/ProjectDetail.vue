<template lang="html">
    <div class="container">
        <section class="project--detail-top">
            <div class="project--detail-gallery">
                <div class="gallery-container" v-if="listGallery">
                    <div
                        class="gallery-item"
                        v-for="(gallery, index) in listGallery.slice(0, 4)"
                        :key="index"
                    >
                        <img :src="gallery.imgURL" alt="" />
                    </div>
                </div>
            </div>
            <div class="project-detail--map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8233709700994!2d103.8484674152801!3d1.2795892621523093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1911ff0cbdc1%3A0x57e6c26a1be98171!2s1%20Shenton%20Way%2C%20One%20Shenton%20Way%2C%20Singapore%20068803!5e0!3m2!1sen!2s!4v1676608374966!5m2!1sen!2s"
                    style="border: 0"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </section>
        <div>
            <v-btn class="btn--outline btn--green">
                <i class="icon-svg svg-arrow-left"></i>Back to Result
            </v-btn>
        </div>
        <section class="project--detail-info">
            <div class="detail-info">
                <div class="detail-info__head">
                    <h2 class="detail-info__title">
                        <img :src="require(`~/static/img/logos/logo-project.svg`)" alt="" />
                        Eden Residences Capitol
                    </h2>
                    <div class="detail-info__action">
                        <v-btn icon>
                            <v-icon>icon-svg svg-export</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>ri-heart-3-line</v-icon>
                        </v-btn>
                    </div>
                </div>
                <!-- <div class="detail-info__more">
                    <div class="detail-info__more-price">S$ 30000/month</div>
                    <div class="detail-info__more-location">
                        <i class="icon-svg svg-location"></i>
                        <span>2 Sinaran Drive, Singapore 307467</span>
                    </div>
                    <div class="detail-info__more-bb">
                        <span>
                            <i class="icon-svg svg-bedroom"></i>3</span>
                        <span><i class="icon-svg svg-bathroom"></i>2</span>
                    </div
                </div> -->
            </div>
            <div class="detail-contact"> </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "ProjectListing",
    components: {},
    data() {
        return {
            listGallery: [
                {
                    id: 1,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_1.jpeg`)
                },
                {
                    id: 2,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_2.jpeg`)
                },
                {
                    id: 3,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_3.jpeg`)
                },
                {
                    id: 4,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_4.jpeg`)
                },
                {
                    id: 5,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_5.jpeg`)
                },
                {
                    id: 6,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_6.jpeg`)
                },
                {
                    id: 7,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_7.jpeg`)
                },
                {
                    id: 8,
                    imgURL: require(`../../../static/img/static/One-Shenton-DSC_8.jpeg`)
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.btn--outline {
    font-weight: bold;
    text-transform: none;
    height: 4rem !important;
    border-radius: 0.8rem;
    box-shadow: none;
    .icon-svg {
        width: 1.6rem;
        height: 1.6rem;
        margin-right: 0.4rem;
    }
    &:hover {
        .icon-svg {
            background-color: white;
        }
    }
    :deep(.v-btn__content) {
        font-weight: bold;
    }
}
.project--detail-top {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 2.4rem;
    margin-bottom: 2.8rem;
}
.project--detail-gallery {
    .gallery-container {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-gap: 0.8rem;
        border-radius: 2rem;
        overflow: hidden;
    }
    .gallery-item {
        &:first-child {
            grid-column-start: 1;
            grid-column-end: 4;
            grid-row-start: 1;
            grid-row-end: 4;
        }
    }
}
.project-detail--map {
    border-radius: 2rem;
    overflow: hidden;
    iframe {
        width: 100%;
        height: 100%;
    }
}
.project--detail-info {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-row-gap: 2.4rem;
    margin-bottom: 2.8rem;
}
</style>

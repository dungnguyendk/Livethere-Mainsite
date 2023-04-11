<template>
    <div>
        <div class="section--listing-light-box" v-if="listImagesLimited && listImagesLimited.length > 0">
            <div
                class="section__listing-image-column"
                v-for="(image, idx) in listImagesLimited"
                :key="idx"
                @click="index = idx"
                :class="{
                    'active-total-images': idx === 4 && images.length > 4
                }"
            >
                <img :src="image ? image : 'https://fakeimg.pl/688x387/?text=No%20Image'" alt="" />
                <span v-if="idx === 4 && images.length > 4">+{{ totalImagesSlider }} photos</span>
            </div>
            <Tinybox
                v-model="index"
                :images="images"
                :loop="loopCheckbox"
                :no-thumbs="!thumbsCheckbox"
            ></Tinybox>
        </div>
        <div v-else class="section--listing-light-box no-img">
            <img src="https://fakeimg.pl/764x547/?text=No%20Image" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    name: "LightBoxListing",
    props: {
        images: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            index: null,
            loopCheckbox: false,
            thumbsCheckbox: true
        }
    },
    computed: {
        listImagesLimited() {
            return this.images.slice(0, 4)
        },
        totalImagesSlider() {
            return Number(this.images.length) - 4
        }
    },
    created() {
        console.log("listImagesLimited", this.listImagesLimited)
    }
}
</script>

<style lang="scss" scoped>
.section--listing-light-box {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 0.8rem;
    row-gap: 0.8rem;
    .section__listing-image-column {
        cursor: pointer;

        &:nth-child(1) {
            grid-column-start: 1;
            grid-column-end: 4;
            grid-row-start: 1;
            grid-row-end: 2;
            img {
                // position: absolute;
                // z-index: 1;
                height: auto;
                border-radius: 2rem 2rem 0 0;
                width: 100%;
                object-fit: cover;
            }
        }
        &:nth-child(2) {
            img {
                border-radius: 0 0 0 2rem;
            }
        }
        &:nth-child(4) {
            img {
                border-radius: 0 0 2rem 0;
            }
        }
    }
    .section__listing-image-column:not(:nth-child(1)) {
        width: 100%;
            position: relative;
            padding-bottom: 55.8%;
            cursor: pointer;
        img {
            position: absolute;
                z-index: 2;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                max-width: 100%;
                object-fit: cover;
                // object-fit: contain;
        }
    }
    &.no-img {
        display: block;
    }
}
.active-total-images {
    &:nth-child(4) {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            border-radius: 0 0 2rem 0;
        }
        span {
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: var(--color-white);
            position: absolute;
            z-index: 10;
        }
        &::after {
            content: "";
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 0 0 2rem 0;
            z-index: 7;
        }
    }
}
</style>

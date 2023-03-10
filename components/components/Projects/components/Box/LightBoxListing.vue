<template>
    <div class="section--listing-light-box">
        <div
            class="section__listing-image-column"
            v-for="(image, idx) in listImagesLimited"
            :key="idx"
            @click="index = idx"
            :class="{
                'active-total-images': image.id === 4 && listImages.length > 4
            }"
        >
            <img :src="image.src" alt="" />
            <span v-if="image.id === 4 && listImages.length > 4"
                >+{{ totalImagesSlider }} photos</span
            >
        </div>
        <Tinybox
            v-model="index"
            :images="listImages"
            :loop="loopCheckbox"
            :no-thumbs="!thumbsCheckbox"
        ></Tinybox>
    </div>
</template>

<script>
export default {
    name: "LightBoxListing",
    data() {
        return {
            listImages: [
                {
                    id: 1,
                    src: "https://picsum.photos/600/400.jpg?random="
                },
                {
                    id: 2,
                    src: "https://picsum.photos/600/400.jpg?random="
                },
                {
                    id: 3,
                    src: "https://picsum.photos/600/400.jpg?random="
                },
                {
                    id: 4,
                    src: "https://picsum.photos/600/400.jpg?random="
                },
                {
                    id: 5,
                    src: "https://picsum.photos/600/400.jpg?random="
                },
                {
                    id: 6,
                    src: "https://picsum.photos/600/400.jpg?random="
                },
                {
                    id: 7,
                    src: "https://picsum.photos/600/400.jpg?random="
                },
                {
                    id: 8,
                    src: "https://picsum.photos/600/400.jpg?random="
                },
                {
                    id: 9,
                    src: "https://picsum.photos/600/400.jpg?random="
                },
                {
                    id: 10,
                    src: "https://picsum.photos/600/400.jpg?random="
                }
            ], 
            index: null,
            loopCheckbox: false,
            thumbsCheckbox: true,
        }
    }, 
    computed: {
        listImagesLimited() {
            return this.listImages.slice(0, 4)
        },
        totalImagesSlider() {
            return Number(this.listImages.length) - 4
        }
    }
}
</script>

<style lang="scss" scoped>
.section--listing-light-box {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 0.8rem;
    row-gap: 0.8rem;
    .section__listing-image-column{
        cursor: pointer;

        &:nth-child(1) {
            grid-column-start: 1;
            grid-column-end: 4;
            grid-row-start: 1;
            grid-row-end: 2;
            img {
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

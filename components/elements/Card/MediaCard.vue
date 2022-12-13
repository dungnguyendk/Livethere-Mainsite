<template>
    <div class="items" v-if="items" @click="handleSelectFile(items)">
        <img :src="`${baseURL_Img}${items.url}`" alt="img" />
        <div class="items--info">
            <span :title="`${items.displayName}`">{{ items.displayName }}</span>
            <p>{{ items.extension.replace(".", "").toUpperCase() }} - {{ items.width }}x{{
                    items.height
            }}</p>
        </div>
        <input type="checkbox" class="check-box__media" hide-details v-model="mediaSelected" :value="items"
            @click="handleSelect(items)" v-if="!checkComponent" />
        <!-- <span class="btn btn--outline btn--green btn--sm mr-4" @click="handleSelectFile(items)">
            Dialog Media</span> -->
        <!-- {{ pictureSelected.id }} -->
    </div>
</template>
<script>
import { appMedia_img_url } from "~/app-settings"
import { MEDIA } from "~/ultilities/contants/media"
import { FORM_CREATE_BLOG } from "~/ultilities/contants/blog-management.js"

export default {
    name: "MediaCard",
    props: {
        items: {
            type: Object,
            default: () => { }
        },
        checkComponent: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            mediaSelected: MEDIA.mediaSelected,
            // pictureSelected: MEDIA.pictureSelected,
            formCreateBlog: FORM_CREATE_BLOG,
            baseURL_Img: appMedia_img_url.baseURL,
        }
    },
    methods: {
        handleSelect(item) {
            const index = this.mediaSelected.indexOf(item)
            if (index === -1) {
                this.mediaSelected.push(item)
            } else if (index !== -1) {
                this.mediaSelected.splice(index, 1)
            }
            return this.mediaSelected
        },
        handleSelectFile(item) {
            this.$emit("selectedFile", item)
            if (item) {
                this.formCreateBlog.blogImg = `${this.baseURL_Img}${item.url}`
            }
            // console.log({ pictureSelected: this.formCreateBlog.blogImg })
        },
        // onSelectFile(item) {
        //     if (this.mediaSelected) {
        //         // console.log({ itemsSelected: items })
        //         this.$emit("onSelectFile", item)
        //     } else {
        //         this.$emit("onRemoveFile", item)
        //     }
        // }
    }
}
</script>
<style lang="scss" scoped>
.items {
    display: flex;
    cursor: pointer;

    img {
        width: 6.4rem;
        height: 6.4rem;
        background-color: var(--color-bg-gray);
        border-radius: 4px;
    }

    .btn {
        margin-left: auto;
    }

    &--info {
        padding-left: 1.2rem !important;
        max-width: 20rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        span {
            font-size: 14px;
            font-weight: 500;
        }

        p {
            font-size: 12px;
            font-weight: 400;
        }
    }
}

.check-box__media {
    width: 2rem;
    margin-left: auto;

}
</style>

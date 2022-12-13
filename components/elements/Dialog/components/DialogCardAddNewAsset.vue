<template>
    <div class="card--dialog">
        <div class="card__header">
            <h4 v-if="type === 'header' || type === 'full'">{{ title }}</h4>
            <div v-else />
            <button class="btn--close" @click="onClose()">
                <i class="ri-close-fill" />
            </button>
        </div>
        <div class="card__selectedForm">
            <slot name="selectedForm"></slot>
        </div>
        <div class="card__search">
            <slot name="search"></slot>
        </div>
        <div class="card__content--items" v-if="mediaItems && mediaItems.length">
            <slot name="contentItems"></slot>
        </div>
        <div class="card__content--items" v-if="mediaSelected && mediaSelected.length">
            <slot name="contentItemsSelected"></slot>
        </div>
        <div
            class="card__content--items"
            style="justify-content: center"
            v-if="mediaSelected && !mediaSelected.length"
        >
            <slot name="contentItemsSelectedNoData"></slot>
            <!-- <p>No data found!</p> -->
        </div>
        <div class="card__pagination">
            <slot name="pagination"></slot>
        </div>
        <div class="card__footer" v-if="type === 'footer' || type === 'full'">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script>
import { MEDIA } from "~/ultilities/contants/media"
export default {
    name: "DialogCardAddNewAsset",
    props: {
        title: {
            type: String,
            default: "Dialog title"
        },
        type: {
            type: String,
            default: "full"
        },
        open: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            openCard: false,
            mediaItems: [],
            //mediaSelected: MEDIA.mediaSelected
            mediaSelected: []
        }
    },
    computed: {
        sizeDialog() {
            if (this.size === "small") return 480
            if (this.size === "medium") return 640
            if (this.size === "large") return 830
        }
    },
    methods: {
        onClose() {
            this.$emit("close")
        }
    }
}
</script>

<style lang="scss" scoped>
.align-elements--center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.full-width {
    width: 100%;
}
.card--dialog {
    // position: relative;
    .card__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.1rem 2.4rem;
        border-top: 1px solid alpha(var(--color-gray), var(--level-1));

        h4 {
            font-size: 1.8rem;
            margin-bottom: 0;
            font-weight: 600;
        }
    }
    .card__selectedForm {
        border-top: 1px solid alpha(var(--color-gray), var(--level-1));
        border-bottom: 1px solid alpha(var(--color-gray), var(--level-1));
        padding: 1.1rem 2.4rem;
        text-align: justify;
    }
    .card__search {
        padding: 1.2rem 2.4rem;
    }
    .card__content--items {
        padding: 1.2rem 1.8rem;
        display: flex;
        flex-wrap: wrap;
        max-height: 35rem;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0.5rem;
        }

        &::-webkit-scrollbar-track {
            background: #e6e6e6;
            border-left: 1px solid #dadada;
        }

        &::-webkit-scrollbar-thumb {
            background: var(--color-primary);
            border: solid 1px #e6e6e6;
            border-radius: 1rem;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: black;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .card__pagination {
        padding: 1.2rem 1.8rem;
        display: flex;
    }
    .card__footer {
        // position: absolute;
        // bottom: 0;
        // width: 100%;
        background-color: var(--color-bg-gray);
        padding: 1.2rem 2.4rem;
        .btn-group {
            justify-content: space-between;
        }
    }
}

.btn--close {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: none;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    transition: all 0.4s ease;
    position: relative;
    left: 1.74rem;
    &:hover,
    &:focus {
        background-color: alpha(var(--color-red), var(--level-1));
        i {
            color: var(--color-red);
        }
    }
    i {
        font-size: 2rem;
    }
}
</style>

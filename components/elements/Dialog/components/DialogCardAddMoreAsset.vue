<template>
    <div class="card--dialog">
        <div class="card__header">
            <h4 v-if="type === 'header' || type === 'full'">{{ titleAddMoreAsset }}</h4>
            <div v-else />
            <button class="btn--close" @click="onClose()">
                <i class="ri-close-fill" />
            </button>
        </div>
        <div class="card__upload-file">
            <slot name="sectionUploadFile"></slot>
        </div>
        <div class="card__footer" v-if="type === 'footer' || type === 'full'">
            <slot name="actionsUpload"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "DialogCardAddMoreAsset",
    props: {
        titleAddMoreAsset: {
            type: String,
            default: "Upload new file"
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
            openCard: false
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
    .card__upload-file {
        border-top: 1px solid alpha(var(--color-gray), var(--level-1));
    }
    .card__footer {
        background-color: var(--color-bg-gray);
        padding: 1.2rem 2.4rem;
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

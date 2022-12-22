<template>
    <div class="card--dialog">
        <div class="card__header">
            <button class="btn--close" @click="onClose()">
                <i class="ri-close-fill" />
            </button>
        </div>
        <div class="card__title">
            <h4>{{ title.toLocaleUpperCase() }}</h4>
        </div>
        <div class="card__form">
            <slot name="formAddInventory"></slot>
        </div>
        <!-- <div class="card__footer" v-if="type === 'footer' || type === 'full'">
            <slot name="actions"></slot>
        </div> -->
    </div>
</template>

<script>
export default {
    name: "DialogAddNewInventory",
    props: {
        title: {
            type: String,
            default: "Add new inventory"
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
            openDialog: false
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
        justify-content: flex-end;
        padding: 1.1rem 2.4rem;
        border-top: 1px solid alpha(var(--color-gray), var(--level-1));
    }

    .card__title {
        text-align: center;

        h4 {
            margin-bottom: 0;
            font-weight: 700;
            font-size: 2.4rem;
            line-height: 2.8rem;
            color: var(--color-title-black);
        }
    }

    .card__footer {
        padding: 0 5rem 5rem 5rem;

        @media only screen and (max-width: 768px) {
            padding: 0 3rem 3rem 3rem;
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

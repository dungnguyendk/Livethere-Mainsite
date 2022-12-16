<template lang="html">
    <div class="expanded-panel">
        <div class="expanded-panel__header">
            <button @click.prevent="onClose" class="btn--close">
                <i class="ri-arrow-drop-down-fill"></i>
            </button>
        </div>
        <div class="expanded-panel__container">
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    name: "ExpandedPanel",
    props: {
    },

    methods: {
        onClose() {
            this.$emit("onClose")
        }
    }
}
</script>
<style lang="scss" scoped>
.btn--close {
    align-self: center;
    color: #00634F;
    min-width: 6.4rem;
    min-height: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFF;

    i {
        font-size: 3rem;
    }
}

.expanded-panel {
    overflow: hidden;
    padding-top: 1.2rem;

    &__header {
        align-items: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        grid-gap: 0.2rem;
        gap: 0.2rem;
        position: relative;
        min-height: 3.2rem;

        .btn--close {
            position: absolute;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
        }

        &:before,
        &:after {
            content: "";
            width: 100%;
            height: 1px;
            background-color: #00634F;
        }
    }

    &__container {
        margin-top: 2.6rem;
        padding: 2.4rem;
        background-color: #FAFAFA;
    }
}

// .expanded {
//     // border: 1px solid alpha(var(--color-gray), 0.1);

//     &--border {}

//     &--padding {
//         padding-top: 1.2rem;
//         padding-bottom: 5.7rem;
//     }
// }
</style>
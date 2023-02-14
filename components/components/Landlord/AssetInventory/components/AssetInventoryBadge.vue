<template lang="html">
    <div :class="`badge--inventory badge--inventory__type-${source.statusFID}`">
        <span>{{ source.statusDisplay.toUpperCase() }}</span>
    </div>
</template>

<script>
export default {
    name: "AssetInventoryBadge",

    props: {
        type: {
            type: String,
            default: "new" // 'new' || 'vacant' || 'Tenanted'
        },
        source: {
            type: Object,
            default: () => { }
        }
    },
    created() {
        // console.log("source::", this.source);
    }
}
</script>
<style lang="scss" scoped>
@mixin typeInventory($colorType, $borderType, $backgroundType) {
    color: $colorType;
    border: 1px solid $borderType;
    background: $backgroundType;
}

.badge {
    &--inventory {
        padding: 0.5rem 1.6rem;
        border-radius: 0.8rem;
        text-align: center;
        width: max-content;
        height: 3.4rem;

        span {
            font-weight: 600;
        }

        @media only screen and (max-width: 768px) {
            margin-left: auto;
        }

        &__type {
            &-1 {
                @include typeInventory(var(--color-type-new),
                    var(--color-type-new),
                    rgba(39, 168, 87, 0.1));
            }

            &-2 {
                @include typeInventory(var(--color-type-vacant),
                    var(--color-type-vacant),
                    rgba(15, 170, 222, 0.1));
            }

            &-3 {
                @include typeInventory(var(--color-type-tenanted),
                    var(--color-type-tenanted),
                    rgba(93, 95, 239, 0.1));
            }

            &-4 {
                @include typeInventory(var(--color-type-sold),
                    var(--color-type-sold),
                    rgba(93, 95, 239, 0.1));
            }
        }

    }
}
</style>

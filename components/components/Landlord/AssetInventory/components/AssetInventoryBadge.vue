<template lang="html">
    <div :class="`badge--inventory ${type.toLowerCase()}`">
        <span>{{ type }}</span>
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
    },
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
        width: fit-content;
        height: 3.4rem;

        span {
            font-weight: 600;
        }

        @media only screen and (max-width: 768px) {
            margin-left: auto;
        }

        &.new {
            @include typeInventory(#27A857, #27A857, rgba(39, 168, 87, 0.1));
        }

        &.vacant {
            @include typeInventory(#0FAADE, #0FAADE, rgba(15, 170, 222, 0.1));
        }

        &.tenanted {
            @include typeInventory(#5D5FEF, #5D5FEF, rgba(93, 95, 239, 0.1));
        }
    }
}
</style>

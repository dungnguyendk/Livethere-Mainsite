<template lang="html">
    <div :class="`badge--inventory ${type.toLowerCase()}`">
        <span>{{ (type.toLowerCase() === "new" || type.toLowerCase() === "vacant" || type.toLowerCase() === "tenanted") ? type : "N/A"}}</span>
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
            @include typeInventory(var(--color-type-new), var(--color-type-new), rgba(39, 168, 87, 0.1));
        }

        &.vacant {
            @include typeInventory(var(--color-type-vacant), var(--color-type-vacant), rgba(15, 170, 222, 0.1));
        }

        &.tenanted {
            @include typeInventory(var(--color-type-tenanted), var(--color-type-tenanted), rgba(93, 95, 239, 0.1));
        }
    }
}
</style>

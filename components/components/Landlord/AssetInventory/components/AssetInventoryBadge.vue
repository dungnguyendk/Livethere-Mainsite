<template lang="html">
    <span class="badge--inventory">
        {{ type }}
    </span>
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
.badge {

}
</style>

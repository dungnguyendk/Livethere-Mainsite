<template lang="html">
    <div class="page--landlord-auth">
        <slot />
    </div>
</template>

<script>
export default {
    name: "LandlordAuth"
}
</script>
<style lang="scss" scoped>
.page--landlord-auth {
    padding: 2.4rem 0 4.8rem;
    @media screen and (max-width: 768px) {
        padding: 2.4rem 1.6rem;
    }
}
</style>

<template lang="html">
    <div class="page--landlord">
        <div class="page__top">
            <LandlordNavigation />
        </div>
        <div class="page__container">
            <slot />
        </div>
    </div>
</template>
<script>
import LandlordNavigation from "~/components/components/Landlord/LandlordNavigation.vue"

export default {
    name: "LandlordPortal",
    components: {
        LandlordNavigation
    }
}
</script>
<style lang="scss" scoped>
.page--landlord {
    background-color: #fafafa;
    min-height: 100vh;

    .page__top {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 6rem;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.08);
        background-color: #ffff;
    }
    @media screen and (max-width: 768px) {
        padding: 0 1.2rem;
    }
}
</style>

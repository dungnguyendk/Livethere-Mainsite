<template lang="html">
    <div class="section--register">
        <LandlordTerms />
    </div>
</template>

<script>
import LandlordTerms from "~/components/components/Landlord/Auth/Register/LandlordTerms.vue"
import LandlordRegisterForm from "~/components/components/Landlord/Auth/Register/components/Form/LandlordRegisterForm.vue"

export default {
    name: "LandlordRegister",
    components: { LandlordTerms, LandlordRegisterForm }
}
</script>
<style lang="scss" scoped>
.section--register {
    padding: 0 9rem;

    @media only screen and (max-width: 768px) {
        padding: 0;
    }

    @media only screen and (min-width: 768px) and (max-width: 1280px) {
        padding: 0 3rem;
    }
}
</style>

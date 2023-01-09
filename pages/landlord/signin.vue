<template>
    <div>
        <LandlordSignIn />
    </div>
</template>

<script>
import LandlordSignIn from "~/components/components/Landlord/Auth/SignIn/LandlordSignIn.vue"


export default {
    layout:'landlord',
    components: {

        LandlordSignIn
    }
}
</script>

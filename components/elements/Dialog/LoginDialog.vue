<template>
    <v-dialog v-model="openDialog" :width="sizeDialog" persistent   content-class="dialog--login">
            <button class="btn--close" text @click="onClose()"><i data-v-7bb398b7="" class="ri-close-fill"></i></button>
            <LandordSignInForm />
    </v-dialog>
</template>
<script>
import LandordSignInForm from "~/components/components/Landlord/Auth/SignIn/components/Form/LandordSignInForm.vue"
export default {
    name: "LoginDialog",
    components: {LandordSignInForm },
    props: {
        open: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: "medium" // small, medium, large
        },
        actions: {
            type: Boolean,
            default: true
        },
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
            this.openDialog = false
            this.$emit("close")
        }
    },
    watch: {
        open(val) {
            this.openDialog = val
        }
    }

}
</script>
<style lang="scss" scoped>
::v-deep(.dialog--login) {
    position: relative;
    padding: 3.2rem 0;
}
.dialog--login {
    position: relative;
    .btn--close {
        box-shadow: none;
    width: 2.667rem;
    height: 2.667rem;
    border: 1.5px solid #737373;
    border: 1.5px solid var(--color-label);
    position: absolute;
    top: 2rem;
    right: 3.2rem;
    left: auto;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    }
    .form--signin {
        padding-top: 0;
    }
}
</style>
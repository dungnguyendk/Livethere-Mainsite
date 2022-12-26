<template lang="html">
    <v-snackbar v-model="open" :timeout="2000" top right text color="green darken-4">
            <span class="message--snackBar">
                <i class="ri-information-line"/> {{ message }}
            </span>
    </v-snackbar>
</template>

<script>
export default {
    name: "SuccessSnackBar",
    props: {
        open: {
            type: Boolean,
            default: 0
        },
        message: {
            type: String,
            default: "Successfully!"
        },
    },
}
</script>

<template lang="html">
    <v-snackbar v-model="open" :timeout="2000" top right text color="red darken-4">
        <span class="message--snackBar">
            <i class="ri-close-circle-line" /> {{ message }}
        </span>
    </v-snackbar>
</template>

<script>
export default {
    name: "FailSnackBar",
    props: {
        open: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: "Something went wrong, please try again !"
        },
    },
}
</script>

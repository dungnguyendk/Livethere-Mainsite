<template lang="html">
    <nuxt-link to="/">
        <img src="/img/logos/logo.svg" alt="App Logo" />
    </nuxt-link>
</template>

<script>
export default {
    name: "SiteLogo",
    props: {
        dark: {
            type: Boolean,
            default: false
        }
    }
}
</script>

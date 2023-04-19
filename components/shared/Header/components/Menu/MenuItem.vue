<template lang="html">
    <nuxt-link v-if="source.linkType === 'internal'" :to="source.linkURL">
        {{ source.defaultName }}
    </nuxt-link>
    <a
        v-else-if="source.linkType === 'external'"
        :href="source.linkURL"
        :target="source.linkOpenNewTab ? '_blank' : '_self'"
    >
        {{ source.defaultName }}
    </a>
    <a v-else-if="source.linkType === 'others'" :href="`/${source.linkURL}`" @click.prevent>
        {{ source.defaultName }}
    </a>
</template>

<script>
export default {
    name: "MenuItem",
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },
}
</script>

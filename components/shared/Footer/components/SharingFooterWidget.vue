<template lang="html">
    <div class="widget widget--footer widget--sharing">
        <div class="widget__top">
            <h3 class="widget__title">Follow us on socials</h3>
        </div>
        <div class="widget__container">
            <a href="#" @click.prevent>
                <InstagramIcon />
            </a>
            <a href="/">
                <FacebookIcon />
            </a>
        </div>
    </div>
</template>

<script>
import InstagramIcon from "~/components/shared/Icon/InstagramIcon.vue"
import FacebookIcon from "~/components/shared/Icon/FacebookIcon.vue"

export default {
    name: "SharingFooterWidget",
    components: { FacebookIcon, InstagramIcon }
}
</script>

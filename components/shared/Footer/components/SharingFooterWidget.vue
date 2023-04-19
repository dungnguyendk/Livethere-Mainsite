<template lang="html">
    <div class="widget widget--footer widget--sharing">
        <div class="widget__top">
            <h3 class="widget__title">Follow us on socials</h3>
        </div>
        <div class="widget__container">
            <a :href="instagramLink" target="_blank" @click.prevent>
                <InstagramIcon />
            </a>
            <a :href="facebookLink" target="_blank" @click.prevent>
                <FacebookIcon />
            </a>
            <!--            <a href="https://www.facebook.com/livetheresingapore" target="_blank">
                            <FacebookIcon />
                        </a>-->
        </div>
    </div>
</template>

<script>
import InstagramIcon from "~/components/shared/Icon/InstagramIcon.vue"
import FacebookIcon from "~/components/shared/Icon/FacebookIcon.vue"

export default {
    name: "SharingFooterWidget",
    components: { FacebookIcon, InstagramIcon },
    props: {
        facebookLink: {
            type: String,
            default: "" //https://www.facebook.com/livetheresingapore,
        },
        instagramLink: {
            type: String,
            default: "" //https://www.instagram.com/livethere.sg
        }
    }
}
</script>

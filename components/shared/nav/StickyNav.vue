<template lang="html">
    <nav class="nav--sticky">
        <a
            @click.prevent
            class="btn--nav"
            href="#landing-top-banner"
            v-smooth-scroll="{ duration: 80, offset: 0 }"
        >
            <HomeIcon />
        </a>

        <a
            @click.prevent
            class="btn--nav"
            href="#landing-intro"
            v-smooth-scroll="{ duration: 80, offset: 0 }"
        >
            <LifestyleIcon />
        </a>
        <a
            @click.prevent
            class="btn--nav"
            href="#landing-listing"
            v-smooth-scroll="{ duration: 80, offset: 0 }"
        >
            <ListingIcon />
        </a>
        <a
            @click.prevent
            class="btn--nav"
            href="#landing-videos"
            v-smooth-scroll="{ duration: 80, offset: 0 }"
        >
            <VideoIcon />
        </a>
        <a
            @click.prevent
            class="btn--nav"
            href="#landing-contact-form"
            v-smooth-scroll="{ duration: 80, offset: 0 }"
        >
            <ContactIcon />
        </a>
    </nav>
</template>

<script>
import HomeIcon from "~/components/shared/nav/components/HomeIcon.vue"
import LifestyleIcon from "~/components/shared/nav/components/LifestyleIcon.vue"
import ListingIcon from "~/components/shared/nav/components/ListingIcon.vue"
import VideoIcon from "~/components/shared/nav/components/VideoIcon.vue"
import ContactIcon from "~/components/shared/nav/components/ContactIcon.vue"

export default {
    name: "StickyNav",
    components: { ContactIcon, VideoIcon, ListingIcon, LifestyleIcon, HomeIcon }
}
</script>

<style lang="scss" scoped>
.btn--nav {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 6rem;
    height: 6rem;
    border-radius: 0.8rem;
    background-color: #fff;
}

.nav--sticky {
    position: fixed;
    top: 50%;
    right: 6rem;
    z-index: 99;
    width: 3rem;
    display: flex;
    flex-flow: column wrap;
    grid-gap: 0.8rem;
    gap: 0.8rem;
    transform: translateY(-50%);
    //background-color: rgba(red, 0.06);
    @media screen and (max-width: 1279px) {
        display: none;
    }
}
</style>

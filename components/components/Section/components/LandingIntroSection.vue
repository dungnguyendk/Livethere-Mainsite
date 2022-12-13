<template lang="html">
    <div v-if="source" class="section--landing section--landing-intro" id="landing-intro">
        <div class="container">
            <div class="section__top">
                <nav v-if="menus" class="nav--intro">
                    <a
                        v-for="(item, index) in menus"
                        :key="index"
                        @click.prevent
                        class="btn--nav"
                        :href="item.section ? `#${item.section}` : ''"
                        v-smooth-scroll="{ duration: 80, offset: 0 }"
                    >
                        {{ item.text }}
                    </a>
                </nav>
            </div>
            <div class="section__container">
                <div class="section__content">
                    <div class="section__left">
                        <img v-if="image !== ''" :src="image" alt="" />
                    </div>
                    <div class="section__right">
                        <div v-if="description !== ''" class="section__desc" v-html="description">
                        </div>
                        <p v-else>No data found</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getImageURLByFieldName, getStringByFieldName } from "~/ultilities/fieldHelper"
import { httpEndpoint } from "~/services/https/endpoints"

export default {
    name: "LandingIntroSection",
    props: {
        title: {
            type: String,
            default: "Video"
        },
        source: {
            type: Object,
            default: () => {}
        }
    },

    data() {
        return {
            nav: [
                {
                    href: "#top-banner",
                    label: "The Sentosa Collection"
                },
                {
                    href: "#top-banner",
                    label: "Lifestyle"
                },
                {
                    href: "#listing",
                    label: "Listings"
                },
                {
                    href: "#video",
                    label: "Videos"
                },
                {
                    href: "#contact",
                    label: "Speak to Our Consultants"
                }
            ],
            image: "",
            features: [],
            description: "",
            menus: []
        }
    },

    async created() {
        const rawJSON = this.source ? this.source.details : []

        if (rawJSON.length > 0) {
            this.image = getImageURLByFieldName(rawJSON, "image")
            //console.log({ image: this.image })
            this.description = getStringByFieldName(rawJSON, "description")

            const menuArr = rawJSON.find((s) => s.fieldName === "menu")

            if (menuArr !== null) {
                const menuRaw = JSON.parse(menuArr.fieldValue)
                //console.log({ menu: menuRaw })
                this.menus = menuRaw.map((item) => {
                    return {
                        text: getStringByFieldName(item.fields, "Text"),
                        section: getStringByFieldName(item.fields, "section")
                    }
                })

                //console.log({ menus: this.menus })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.nav--intro {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row nowrap;
    grid-gap: 0.7rem;
    gap: 0.7rem;

    a {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.6rem;
        height: 4.4rem;
        font-weight: 700;
        color: var(--color-primary);
        padding: 0 1.2rem;

        &:after {
            content: "";
            width: 1px;
            height: 2.8rem;
            background-color: var(--color-primary);
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
        }

        &:hover,
        &:focus {
            background-color: var(--color-primary);
            color: #fff;
        }

        &:last-child {
            &:after {
                display: none;
            }
        }

        &.active {
            background-color: var(--color-primary);
            color: #fff;
        }
    }

    @media screen and (max-width: 479px) {
        flex-flow: row wrap;
    }
}

.section--landing-intro {
    position: relative;
    background-color: #f7ebe3;
    padding: 3.2rem 0;

    .section__left {
        img {
            width: 100%;
            height: 100%;
        }
    }

    .section__content {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-gap: 3rem;
    }

    .section__right {
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
    }

    @media screen and (max-width: 991px) {
        .section__content {
            grid-template-columns: repeat(1, minmax(0, 1fr));
            grid-gap: 2.4rem;
        }
    }
}
</style>
<style lang="scss">
.section__desc {
    p,
    ul > li {
        font-size: 1.6rem;
        font-weight: 400;
        color: var(--color-heading);
    }

    p {
        line-height: 1.4em;
        color: var(--color-heading) !important;
    }
}
</style>

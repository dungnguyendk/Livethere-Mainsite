<template lang="html">
    <footer class="footer--landing">
        <div class="container">
            <div class="footer__content">
                <div class="footer__left">
                    <InformationFooterWidget />
                </div>
                <div class="footer__right">
                    <LinksFooterWidget :source="menus" />
                    <SharingFooterWidget />
                </div>
            </div>
        </div>
        <div class="footer__bottom">
            <div class="container">
                <div class="footer__bottomLeft">
                    <p>&copy; Copyright 2022 Savills Singapore. All rights reserved.</p>
                </div>
                <div class="footer__bottomRight">
                    <p>
                        Powered by
                        <img src="~/static/img/logos/savills_logo.svg" alt="Savills logo" />
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import SiteLogo from "~/components/shared/Logo/SiteLogo.vue"
import InstagramIcon from "~/components/shared/Icon/InstagramIcon.vue"
import FacebookIcon from "~/components/shared/Icon/FacebookIcon.vue"
import InformationFooterWidget from "~/components/shared/Footer/components/InformationFooterWidget.vue"
import LinksFooterWidget from "~/components/shared/Footer/components/LinksFooterWidget.vue"
import SharingFooterWidget from "~/components/shared/Footer/components/SharingFooterWidget.vue"
import { httpEndpoint } from "~/services/https/endpoints"
import { getImageURLByFieldName, getStringByFieldName } from "~/ultilities/fieldHelper"

export default {
    name: "LandingFooter",
    components: {
        SharingFooterWidget,
        LinksFooterWidget,
        InformationFooterWidget,
        FacebookIcon,
        InstagramIcon,
        SiteLogo
    },
    props: {
        source: {
            type: Object,
            default: () => {}
        }
    },

    data() {
        return {
            menus: [],
            menuID: 0
        }
    },
    created() {
        //this.getData()
    },
    methods: {
        // each section has different getData() method

        async getData() {
            const rawJSON = this.source ? this.source.details : []
            this.imageURL = getImageURLByFieldName(rawJSON, "image")
            this.description = getStringByFieldName(rawJSON, "description")
            this.title = getStringByFieldName(rawJSON, "title")

            const menuData = this.source.details
                .filter((item) => item.fieldName === "menu")
                .find((m) => m.fieldValue !== "")
            const rawMenuID = menuData !== "" ? JSON.parse(menuData.fieldValue)[0] : 0

            if (rawMenuID && rawMenuID !== 0) {
                const response = await this.$axios.$get(
                    `${httpEndpoint.menus.getEntryById}?id=${rawMenuID}&LanguageId=1`
                )
                if (response) {
                    this.menus = response.menuItems
                    console.log({ menus: this.menus })
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.footer--landing {
    background-color: #35444b;

    .footer__content {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
        grid-gap: 1.2rem;
        padding: 3rem 0;
    }

    .footer__right {
        display: grid;
        grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
        grid-gap: 1.2rem;
    }

    .footer__bottomLeft {
        p {
            margin-bottom: 0;
            font-size: 1.4rem;
            font-weight: 400;
            color: var(--color-white);
        }
    }

    .footer__bottomRight {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        grid-gap: 0.8rem;
        gap: 0.8rem;

        p {
            margin-bottom: 0;
            font-size: 1.4rem;
            font-weight: 400;
            color: var(--color-white);
        }
    }

    .footer__bottom {
        background-color: #202b2f;
        height: 5.8rem;
        display: flex;
        justify-content: center;
        align-items: center;

        .container {
            display: grid;
            grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
            grid-gap: 2.4rem;
        }
    }

    @media screen and (max-width: 1279px) {
        .footer__content {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            grid-gap: 4.6rem;
            .footer__right {
            }
        }
    }

    @media screen and (max-width: 767px) {
        .footer__right {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            grid-gap: 2.4rem;
        }

        .footer__content {
            grid-gap: 2.4rem;
        }

        .footer__bottom {
            height: auto;
            padding: 1.2rem 0;

            .footer__bottomLeft {
                justify-content: center;
            }

            .footer__bottomRight {
                justify-content: center;
            }

            .container {
                grid-template-columns: minmax(0, 1fr);
                grid-gap: 0.4rem;
            }
        }
    }
}
</style>

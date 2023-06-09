<template lang="html">
    <footer v-if="source" class="footer--landing">
        <div class="container">
            <div class="footer__content">
                <div class="footer__left">
                    <InformationFooterWidget :address="address" :agency-no="agencyNo" />
                </div>
                <div class="footer__right">
                    <LinksFooterWidget :source="menus" :heading="menuHeading" />
                    <SharingFooterWidget
                        :facebook-link="facebookLink"
                        :instagram-link="instagramLink"
                    />
                </div>
            </div>
        </div>
        <div class="footer__bottom">
            <div class="container">
                <div class="footer__bottomLeft">
                    <p>{{ copyrightText }}</p>
                </div>
                <div class="footer__bottomRight">
                    <p>
                        Powered by
                        <img src="~/static/img/logos/savills_logo.png" alt="Savills logo" />
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
import { getStringByFieldName } from "~/ultilities/fieldHelper"

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
    computed: {
        rawJSON() {
            return this.source ? this.source.details : []
        },
        menuHeading() {
            return getStringByFieldName(this.rawJSON, "menu_headings") ?? "About livethere"
        },
        facebookLink() {
            return getStringByFieldName(this.rawJSON, "facebook_link")
        },
        instagramLink() {
            return getStringByFieldName(this.rawJSON, "instagram_link")
        },
        copyrightText() {
            return (
                getStringByFieldName(this.rawJSON, "copyright_text") ??
                "&copy; Copyright 2023 Savills Singapore. All rights reserved."
            )
        },
        address() {
            return getStringByFieldName(this.rawJSON, "address")
        },
        agencyNo() {
            return getStringByFieldName(this.rawJSON, "agency_no")
        }
    },
    created() {
        this.getData()
    },
    methods: {
        // each section has different getData() method
        async getData() {
            if (this.source && this.source.details) {
                try {
                    const menuData = this.source.details
                        .filter((item) => item.fieldName === "menu")
                        .find((m) => m.fieldValue !== "")
                    //console.log({ menuData, raw: JSON.parse(menuData.fieldValue)[0] })
                    const rawMenuID = menuData !== "" ? JSON.parse(menuData.fieldValue)[0] : 0
                    if (rawMenuID && rawMenuID !== 0) {
                        const response = await this.$apiCmsPublic.$get(
                            `${httpEndpoint.menus.getEntryById}?id=${rawMenuID}&LanguageId=1`
                        )
                        console.log({ menuResponse: response })
                        if (response) {
                            this.menus = response.menuItems
                        }
                    }
                } catch (e) {
                    this.menus = []
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.footer--landing {
    background-color: #33454d;

    .footer__content {
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(0, 2fr);
        grid-gap: 1.2rem;
        padding: 13vh 0 14vh;
    }

    .footer__right {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
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

        img {
            margin-left: 1.2rem;
        }
    }

    .footer__bottom {
        background-color: #202b2f;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 2vh;
        padding-bottom: 2vh;

        .container {
            display: grid;
            grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
            grid-gap: 2.4rem;
            align-items: center;
        }
    }

    @media screen and (max-width: 1279px) {
        .footer__content {
            // grid-template-columns: minmax(0, 1fr);
            // grid-gap: 4.6rem;
            .footer__right {
            }
        }
    }
    @media screen and (max-width: 991px) {
        .footer__content {
            grid-template-columns: minmax(0, 1fr);
            grid-gap: 4.6rem;

            .footer__right {
            }
        }
    }

    @media screen and (max-width: 767px) {
        .footer__content {
            padding: 5rem 0;
        }
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
                justify-content: flex-start;
            }

            .container {
                grid-template-columns: minmax(0, 1fr);
                grid-gap: 0.4rem;
            }
        }
    }
}
</style>

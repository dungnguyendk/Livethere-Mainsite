export const APP_NAME = "Livethere"
export const LANDLORDS_SEO_URL = "https://landlords.livethere.com"
export const LANDLORDS_SEO_METADATA = {
    title: "Landlords",
    description:
        "The digital platform that helps you manage, track and optimise your property portfolio's performance",
    imageURL: "",
    url: LANDLORDS_SEO_URL
}

export function generateLandlordsSEOMetaTags(appMeta) {
    return appMeta.map((i) => {
        if (i && i.hid) {
            if (i.hid === "title") {
                i.content = LANDLORDS_SEO_METADATA.title
            }
            if (i.hid === "description") {
                i.content = LANDLORDS_SEO_METADATA.description
            }
            if (i.hid === "twitter:image") {
                i.content = LANDLORDS_SEO_METADATA.imageURL
            }
            if (i.hid === "twitter:title") {
                i.content = LANDLORDS_SEO_METADATA.title
            }
            if (i.hid === "twitter:description") {
                i.content = LANDLORDS_SEO_METADATA.description
            }
            if (i.hid === "twitter:url") {
                i.content = LANDLORDS_SEO_METADATA.url
            }
            if (i.hid === "og:image") {
                i.content = LANDLORDS_SEO_METADATA.imageURL
            }
            if (i.hid === "og:title") {
                i.content = LANDLORDS_SEO_METADATA.title
            }
            if (i.hid === "og:description") {
                i.content = LANDLORDS_SEO_METADATA.title
            }
            if (i.hid === "og:url") {
                i.content = LANDLORDS_SEO_METADATA.url
            }
        }
        return i
    })
}

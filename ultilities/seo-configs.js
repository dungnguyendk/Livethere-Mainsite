export const APP_NAME = "Livethere"
export const LANDLORDS_SEO_URL = "https://www.landlords.livethere.com"
export const LANDLORDS_SEO_METADATA = {
    title: "Landlords",
    description: "Livethere is a landlords website",
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

export function generateSEOTagContent(appMeta, seoData) {
    return appMeta.map((i) => {
        if (i && i.hid) {
            if (i.hid === "title" && seoData?.meta_Title) {
                i.content = seoData.meta_Title
            }
            if (i.hid === "description" && seoData?.meta_Des) {
                i.content = seoData.meta_Des
            }
            if (i.hid === "twitter:image" && seoData?.meta_Img_URL) {
                i.content = seoData.meta_Img_URL
            }
            if (i.hid === "twitter:title" && seoData?.meta_Title) {
                i.content = seoData.meta_Title
            }
            if (i.hid === "twitter:description" && seoData?.meta_Des) {
                i.content = seoData.meta_Des
            }
            if (i.hid === "twitter:url") {
                i.content = seoData.meta_URL
            }
            if (i.hid === "og:image" && seoData?.meta_Img_URL) {
                i.content = seoData.meta_Img_URL
            }
            if (i.hid === "og:title" && seoData?.meta_Title) {
                i.content = seoData.meta_Title
            }
            if (i.hid === "og:description" && seoData?.meta_Des) {
                i.content = seoData.meta_Des
            }
            if (i.hid === "og:url") {
                i.content = seoData?.meta_URL
            }
        }
        return i
    })
}

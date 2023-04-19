const settings = [
    {
        env: "develop",
        media_url: "http://vnapi.asiaesolutions.com/publiccontentapi",
        postal_url: "https://apivo.aestechgroup.com/aespostal",
        mediaURLPath: "http://vnapi.asiaesolutions.com/content",
        landlord: "http://vnapi.asiaesolutions.com/erppublicapi",
        // landlord: "http://vnapi.asiaesolutions.com/cmspublic",

        projects: "http://vnapi.asiaesolutions.com/cmspublic"
    },
    {
        env: "beta",
        media_url: "https://livethereapi.asiaesolutions.com/assetfileapi",
        postal_url: "https://apivo.aestechgroup.com/aespostal",
        mediaURLPath: "https://livethereapi.asiaesolutions.com/content/asset/",
        landlord: "https://livethereapi.asiaesolutions.com/erppublic",
        projects: "https://livethereapi.asiaesolutions.com/cmspublic"
    },
    {
        env: "production",
        media_url: "https://api.livethere.com/landlordfileapi",
        postal_url: "https://apivo.aestechgroup.com/aespostal",
        mediaURLPath: "https://api.livethere.com/content/asset/", // need update
        landlord: "https://api.livethere.com/landlord",
        projects: "http://vnapi.asiaesolutions.com/cmspublic"
    }
]
export const CURRENT_ENV = "beta"
export const currentSettings = settings.find((item) => item.env === CURRENT_ENV)
export const appSettings = {
    baseURL: currentSettings.landlord,
    siteName: "Livethere"
}
export const appMedia = {
    baseURL: currentSettings.media_url,
    siteName: "Livethere"
}
export const appVo = {
    baseURL: currentSettings.postal_url,
    siteName: "Livethere"
}
export const mediaSettings = {
    baseURL: currentSettings.mediaURLPath
}
export const projectSettings = {
    baseURL: currentSettings.projects,
    siteName: "Livethere"
}
export const ACTIVE_SITE_FID = 1

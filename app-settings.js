const settings = [
    {
        env: "develop",
        base_url: "http://vnapi.asiaesolutions.com/cmspublicapi",
        media_url: "http://vnapi.asiaesolutions.com/publiccontentapi",
        postal_url: "https://apivo.aestechgroup.com/aespostal",
        mediaURLPath: "http://vnapi.asiaesolutions.com/content",
        landlord: "http://vnapi.asiaesolutions.com/erppublicapi"
    },
    {
        env: "beta",
        base_url: "https://livethereapi.asiaesolutions.com/erppublic",
        media_url: "https://livethereapi.asiaesolutions.com/assetfileapi",
        postal_url: "https://apivo.aestechgroup.com/aespostal",
        mediaURLPath: "https://livethereapi.asiaesolutions.com/content/asset/",
        landlord: "https://livethereapi.asiaesolutions.com/erppublic"
    },
    {
        env: "production",
        base_url: "https://livethereapi.asiaesolutions.com/erppublic",
        media_url: "https://livethereapi.asiaesolutions.com/assetfileapi", // need update
        postal_url: "https://apivo.aestechgroup.com/aespostal",
        mediaURLPath: "https://livethereapi.asiaesolutions.com/content/asset/", // need update
        landlord: "https://api.livethere.com/landlord"
    }
]
export const CURRENT_ENV = "develop"
export const currentSettings = settings.find((item) => item.env === CURRENT_ENV)

export const appSettings = {
    baseURL: currentSettings.landlord,
    siteName: "Livethere"
}
export const appMedia = {
    baseURL: currentSettings.media_url,
    siteName: "Livethere "
}
export const appVo = {
    baseURL: currentSettings.postal_url,
    siteName: "Livethere "
}
export const mediaSettings = {
    baseURL: currentSettings.mediaURLPath
}

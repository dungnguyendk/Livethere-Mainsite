const settings = [
    {
        env: "develop",
        base_url: "http://vnapi.asiaesolutions.com/cmspublicapi",
        media_url: "http://vnapi.asiaesolutions.com/",
        mediaURL: "http://vnapi.asiaesolutions.com/content",
        landlord: "http://vnapi.asiaesolutions.com/erppublicapi"
    },
    {
        env: "beta",
        base_url: "https://livethereapi.asiaesolutions.com/cmspublic",
        media_url: "https://livethereapi.asiaesolutions.com/mediaapi",
        mediaURL: "https://livethereapi.asiaesolutions.com/content",
        landlord: ""
    },
    {
        env: "production",
        base_url: ""
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
export const mediaSettings = {
    baseURL: currentSettings.mediaURL
}

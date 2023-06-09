import { appMedia, appVo, projectSettings } from "~/app-settings"
export default function ({ $axios, redirect }, inject) {
    $axios.onRequest((config) => {
        console.log("Making request to " + config.url)
    })

    $axios.onError((error) => {
        const code = parseInt(error.response && error.response.status)
        console.log(error.response)
        return error.response.data
        // if (code === 400) {
        //     redirect("/400")
        // }
    })
    const api = $axios.create({
        headers: {
            common: {
                Accept: "text/plain, */*"
            },
            LMApiKey: "YWljb2tleW5heW1vaWR1b2N0cnV5Y2FwdmFvZGF5"
        }
    })

    const apivo = $axios.create({
        // headers: {
        //     "Access-Control-Allow-Origin": "*"
        // },
        auth: {
            username: "livethere",
            password: "il0lE31Ozbu63rzfEbNUayLZeBXFaOBd"
        }
    })

    const apiCmsPublic = $axios.create({
        headers: {
            common: {
                Accept: "text/plain, */*"
            },
            LMApiKey: "YWljb2tleW5heW1vaWR1b2N0cnV5Y2FwdmFvZGF5"
        }
    })

    // Set baseURL to something different
    api.setBaseURL(`${appMedia.baseURL}`)
    // Set baseURL to something different
    apivo.setBaseURL(`${appVo.baseURL}`)

    // Set baseURL to something different
    apiCmsPublic.setBaseURL(`${projectSettings.baseURL}`)

    // Inject to context as $api
    inject("api", api)
    // Inject to context as $apivo
    inject("apivo", apivo)
    // Inject to context as $apiCmsPublic
    inject("apiCmsPublic", apiCmsPublic)
}

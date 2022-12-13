import { appMedia } from "~/app-settings"
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

    // Set baseURL to something different
    api.setBaseURL(`${appMedia.baseURL}`)

    // Inject to context as $api
    inject("api", api)
}

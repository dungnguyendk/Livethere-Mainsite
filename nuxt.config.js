import {appSettings} from "./app-settings"
import {httpEndpoint} from "./services/https/endpoints"

export default {
    ssr: true,
    head: {
        meta: [
            {charset: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1"},
            {
                hid: "description",
                name: "description",
                content: process.env.npm_package_description || ""
            }
        ],
        link: [
            {rel: "icon", type: "image/x-icon", href: "/favicon.png"},
            {
                rel: "apple-touch-icon-precomposed",
                href: "~/static/favicon.png"
            },
            {
                rel: "stylesheet",
                href: "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
            }
        ]
    },

    css: [
        "~/static/feather-font/css/iconfont.css",
        "~/static/fonts/remixIcon/remixicon.css",
        "~/assets/scss/index.scss"
    ],

    plugins: [
        {src: "~plugins/vueliate.js", ssr: false},
        {src: "~plugins/vue-side-up-down.js", ssr: false},
        {src: "~plugins/axios.js", ssr: true},
        {src: "~plugins/vue-smooth-scroll.js", ssr: true}
    ],

    components: true,

    buildModules: [
        "@nuxtjs/vuetify",
        "@nuxtjs/style-resources",
        "@nuxtjs/moment",
        "@nuxtjs/google-fonts",
        "@nuxtjs/dayjs"
    ],
    googleFonts: {
        preconnect: true,
        useStylesheet: true,
        families: {
            "Crimson+Text": [400, 700],
            Nunito: [300, 400, 500, 600, 700],
        }
    },

    styleResources: {
        scss: "./assets/scss/env.scss"
    },

    modules: ["cookie-universal-nuxt", "@nuxtjs/axios", "vue2-editor/nuxt", "@nuxtjs/auth-next"],

    axios: {
        baseURL: appSettings.baseURL
    },
    auth: {
        redirect: {
            login: false,
            logout: "/",
            //callback: "/auth/signin"*/
            home: false
        },
        //redirect: false,
        rewriteRedirects: false,
        strategies: {
            local: {
                token: {
                    property: "jwt",
                    global: true,
                    required: true,
                    type: "Bearer",
                    maxAge: 36000
                },
                user: {
                    property: false,
                    autoFetch: false
                },
                endpoints: {
                    login: {url: httpEndpoint.auth.login, method: "post"},
                    logout: false,
                    user: false
                }
            }
        }
    },

    vuetify: {
        theme: {
            themes: {
                light: {
                    primary: "#009a79"
                }
            }
        }
    },

    router: {
        linkActiveClass: "",
        linkExactActiveClass: "active",
        middleware: ["auth", "before-route-changed"]
    },

    server: {
        port: 3001,
        host: "localhost"
    }
}

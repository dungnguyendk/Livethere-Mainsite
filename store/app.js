import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    appDrawer: false,
    userDrawer: false,
    sidebarCollapse: false,
    token: null,
    appLoading: false,
    appLoadingMessage: "Loading...",
    userInfo: null,
    snackBar: {
        show: false,
        message: ""
    }
})

export const mutations = {
    setUserInfo(state, payload) {
        state.userInfo = payload
    },
    setSnackBar(state, payload) {
        state.snackBar = payload
    },
    setAppDrawer(state, payload) {
        state.appDrawer = payload
    },
    setUserDrawer(state, payload) {
        state.userDrawer = payload
    }
}

export const actions = {
    async getUserInfo({ commit }) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.user.getLandlordUserInfo}`)

            if (response) {
                commit("setUserInfo", response)
            } else {
                commit("setUserInfo", null)
                await this.$auth.logout().then(() => {
                    window.location.href = "/signin"
                })
                commit("setUserInfo", null)
            }
        } catch (e) {
            commit("setUserInfo", null)
            await this.$auth.logout().then(() => {
                window.location.href = "/signin"
            })
        }
    },

    async showSnackBar({ commit }, payload) {
        commit("setSnackBar", {
            show: true,
            message: payload
        })
        setTimeout(() => {
            commit("setSnackBar", {
                show: false,
                message: ""
            })
        }, 2500)
    }
}

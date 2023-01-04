import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    appDrawer: false,
    token: null,
    appLoading: false,
    appLoadingMessage: "Loading...",
    userInfo: null
})

export const mutations = {
    setUserInfo(state, payload) {
        state.userInfo = payload
    }
}

export const actions = {
    async getUserInfo({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.user.getLandlordUserInfo}`)
            console.log({ userInfo: response })
            if (response) {
                commit("setUserInfo", response)
            } else {
                commit("setUserInfo", null)
            }
        } catch (e) {
            commit("setUserInfo", null)
        }
    }
}

import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    analytics: null
})
export const mutations = {
    setAnalytics(state, payload) {
        state.analytics = payload
    }
}
export const actions = {
    async getAnalytics({ commit }) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.analytics.getEntries}`)
            if (response) {
                commit("setAnalytics", response)
            } else {
                commit("setAnalytics", null)
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setAnalytics", null)
        }
    }
}

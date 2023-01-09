import { httpEndpoint } from "~/services/https/endpoints"
export const state = () => ({
    analytics: null
})
export const mutations = {
    setAnalytics(state, payload) {
        state.analytics = payload
        // console.log("state.analytics::", state.analytics)
    }
}
export const actions = {
    async getAnalytics({ commit }, payload) {
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

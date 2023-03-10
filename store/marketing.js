import { httpEndpoint } from "~/services/https/endpoints"
export const state = () => ({
    marketings: [],
    statusResponse: true
})
export const mutations = {
    setMarketings(state, payload) {
        state.marketings = payload
    },
    setStatusResponse(state, payload) {
        state.statusResponse = payload
    }
}
export const actions = {
    async getMarketings({ commit }) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.marketing.getEntries}`)
            if (response) {
                commit("setMarketings", response)
            } else {
                commit("setMarketings", [])
            }
        } catch (e) {
            commit("setMarketings", [])
            console.log({ Error: e.message })
        }
    },
    async putStatusListWithUs({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$post(
                `${httpEndpoint.marketing.postEntriesListWithUs}?inventoryID=${payload}`
            )
            if (response.valid) {
                commit("setStatusResponse", true)
                dispatch("app/showSnackBar", response.message || "Create successful", {
                    root: true
                })
            } else {
                commit("setStatusResponse", false)
            }
        } catch (e) {
            commit("setStatusResponse", false)
            console.log({ Error: e.message })
        }
    }
}

import { httpEndpoint } from "~/services/https/endpoints"
export const state = () => ({
    marketings: [],
    snackbar: false,
    snackbarMessage: "Your message has been sent.",
    statusResponse: true
})
export const mutations = {
    setMarketings(state, payload) {
        state.marketings = payload
    },
    setSnackbar(state, payload) {
        state.snackbar = payload
    },
    setSnackbarMessage(state, payload) {
        state.snackbarMessage = payload
    },
    setStatusResponse(state, payload) {
        state.statusResponse = payload
    }
}
export const actions = {
    async getMarketings({ commit }, payload) {
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
    async putStatusListWithUs({ commit }, payload) {
        try {
            const response = await this.$axios.$post(
                `${httpEndpoint.marketing.postEntriesListWithUs}?inventoryID=${payload}`
            )
            if (response) {
                commit("setStatusResponse", true)
                commit("setSnackbar", true)
                commit("setSnackbarMessage", "Sent request success")
            } else {
                commit("setStatusResponse", false)
                commit("setSnackbar", false)
                commit("setSnackbarMessage", "Your message has been sent not success.")
            }
        } catch (e) {
            commit("setStatusResponse", false)
            commit("setSnackbar", false)
            commit("setSnackbarMessage", "Your message has been sent not success.")
            console.log({ Error: e.message })
        }
    }
}

import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    dashBoards: null
})
export const mutations = {
    setDashBoards(state, payload) {
        state.dashBoards = payload
    }
}
export const actions = {
    async getDashBoards({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.dashBoard.getEntries}`)
            if (response) {
                commit("setDashBoards", response)
            } else {
                commit("setDashBoards", null)
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setDashBoards", null)
        }
    }
}

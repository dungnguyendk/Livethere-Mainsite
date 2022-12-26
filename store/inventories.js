import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    inventories: [],
    typeSelect: 0
})

export const mutations = {
    setInventories(state, payload) {
        state.inventories = payload
    },
    setTypeSelected(state, payload) {
        state.typeSelect = payload
    }
}

export const actions = {
    async createInventories({ commit }, payload) {
        try {
            await this.$axios.$post(`${httpEndpoint.inventories.createEntry}`, payload)
        } catch (e) {
            console.log(e)
        }
    },
    async getInventories({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.inventories.getEntries}?${payload}`
            )
            if (response) {
                commit("setInventories", response.length ? response : [])
            } else {
                commit("setInventories", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setInventories", [])
        }
    }
}

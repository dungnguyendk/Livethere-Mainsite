import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    inventories: []
})

export const mutations = {
    setInventories(state, payload) {
        state.inventories = payload
        // console.log("state.inventories::", state.inventories)
    }
}

export const actions = {
    // async createInventories({ commit }, payload) {
    //     // console.log("createInventories::", payload)
    //     try {
    //         await this.$axios.$post(`${httpEndpoint.inventories.createEntry}`, payload)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // },
    async getInventories({ commit }, payload) {
        // console.log("getInventories", payload)
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.inventories.getEntries}`,
                payload
            )
            console.log(response)
            if (response) {
                commit("setInventories", response)
            }
        } catch (e) {
            console.log(e)
        }
    }
}

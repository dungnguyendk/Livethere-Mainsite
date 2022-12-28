import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    postalDetails: {}
})

export const mutations = {
    setPostalDetails(state, payload) {
        state.postalDetails = payload
        console.log("state.postalDetails::", state.postalDetails)
    }
}

export const actions = {
    async getPostalDetails({ commit }, payload) {
        try {
            const response = await this.$apivo.$get(
                `${httpEndpoint.postal.getEntryByPostalCode}`,
                payload
            )
            if (response) {
                commit("setPostalDetails", response.length ? response : [])
            } else {
                commit("setPostalDetails", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setPostalDetails", [])
        }
    }
}

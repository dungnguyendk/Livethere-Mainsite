import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    tenancyDetails: null,
    tenancyInfosById: []
})

export const mutations = {
    setTenancyDetails(state, payload) {
        state.tenancyDetails = payload
        console.log("state.tenancyDetails::", state.tenancyDetails)
    },
    setTenancyInfosById(state, payload) {
        state.tenancyInfosById = payload
        console.log("state.tenancyInfosById::", state.tenancyInfosById)
    }
}

export const actions = {
    async getTenancyDetails({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.tenancies.getTenancyById}/${payload}`
            )

            if (response) {
                commit("setTenancyDetails", response)
            } else {
                commit("setTenancyDetails", null)
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setTenancyDetails", null)
        }
    },
    async getTenancyInfosById({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.tenancies.getTenancyInfosById}?${payload}`
            )
            console.log("response::", response)
            if (response) {
                commit("setTenancyInfosById", response)
            } else {
                commit("setTenancyInfosById", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setTenancyInfosById", [])
        }
    }
}

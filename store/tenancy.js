import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    tenancyDetails: null,
    tenancyDetailByInternalID: null,
    tenancyInfosById: []
})

export const mutations = {
    setTenancyDetails(state, payload) {
        state.tenancyDetails = payload
        // console.log("state.tenancyDetails::", state.tenancyDetails)
    },
    setTenancyDetailByInternalID(state, payload) {
        state.tenancyDetailByInternalID = payload
        // console.log("state.setTenancyDetailByInternalID::", state.tenancyDetailByInternalID)
    },
    setTenancyInfosById(state, payload) {
        state.tenancyInfosById = payload
        // console.log("state.tenancyInfosById::", state.tenancyInfosById)
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
    async getTenancyDetailsByInternalID({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.tenancies.getTenancyByInternalID}/${payload}`
            )

            if (response) {
                commit("setTenancyDetailByInternalID", response)
            } else {
                commit("setTenancyDetailByInternalID", null)
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setTenancyDetailByInternalID", null)
        }
    },
    async getTenancyInfosById({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.tenancies.getTenancyInfosById}?${payload}`
            )
            // console.log("response::", response)
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

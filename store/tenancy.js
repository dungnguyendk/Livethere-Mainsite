import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    expenses: null,
    tenancyAgreementsDetails: null
})

export const mutations = {
    setExpenses(state, payload) {
        state.expenses = payload
    },

    setTenancyAgreementDetails(state, payload) {
        state.tenancyAgreementsDetails = payload
    }
}

export const actions = {
    async getTenancyAgreementDetails({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.tenancyAgreements.getByInternalID}/${payload}`
            )
            if (response) {
                commit("setTenancyAgreementDetails", response)
            } else {
                commit("setTenancyAgreementDetails", null)
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setTenancyAgreementDetails", null)
        }
    }
}

import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    tenancyDetails: null,
    tenancyDetailByInternalID: null,
    tenancyInfosById: [],
    snackbar: false,
    snackbarMessage: "Your message has been sent.",
    expenses: null
})

export const mutations = {
    setExpanses(state, payload) {
        state.expenses = payload
    },
    setTenancyDetails(state, payload) {
        state.tenancyDetails = payload
    },
    setTenancyDetailByInternalID(state, payload) {
        state.tenancyDetailByInternalID = payload
    },
    setTenancyInfosById(state, payload) {
        state.tenancyInfosById = payload
    },
    setSnackbar(state, payload) {
        state.snackbar = payload
    },
    setSnackbarMessage(state, payload) {
        state.snackbarMessage = payload
    }
}

export const actions = {
    async getExpanses({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.tenancies.expenses.getEntryByID}/${payload}`
            )

            if (response) {
                commit("setExpanses", response)
            } else {
                commit("setExpanses", null)
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setExpanses", null)
        }
    },

    async getTenancyDetails({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.tenancies.getTenancyByInternalID}/${payload}`
            )

            if (response) {
                commit("setTenancyDetails", response)
                await dispatch("getExpanses", response.id)
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
            if (response) {
                commit("setTenancyInfosById", response)
            } else {
                commit("setTenancyInfosById", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setTenancyInfosById", [])
        }
    },
    async createTenancyTenantInfos({ commit }, payload) {
        try {
            const response = await this.$axios.$post(
                `${httpEndpoint.tenancies.createTenancyInfosEntry}`,
                payload
            )
            if (response && response !== 0) {
                commit("setSnackbar", true)
                commit("setSnackbarMessage", "Create new tenancy info success")
            } else {
                commit("setSnackbar", false)
                commit("setSnackbarMessage", "Your message has been sent.")
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setSnackbar", false)
            commit("setSnackbarMessage", "Your message has been sent.")
        }
    }
}

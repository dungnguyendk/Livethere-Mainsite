import { httpEndpoint } from "~/services/https/endpoints"
import qs from "qs"

export const state = () => ({
    tenancyDetails: null,
    tenancyDetailByInternalID: null,
    tenancyInfosById: [],
    snackbar: false,
    snackbarMessage: "Your message has been sent.",
    expenses: [],
    documents: []
})

export const mutations = {
    setDocuments(state, payload) {
        state.documents = payload
    },
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
                `${httpEndpoint.tenancies.expenses.getEntries}?TenancyContractAgreementFID=${payload}`
            )

            if (response) {
                console.log({ expensesResponse: response })
                commit("setExpanses", response)
            } else {
                commit("setExpanses", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setExpanses", [])
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
                return response
            } else {
                commit("setTenancyDetails", null)
                return null
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setTenancyDetails", null)
            return null
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
                s
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
    },
    async createTenancyExpense({ commit, rootState, dispatch }, payload) {
        try {
            const response = await this.$axios.$post(
                httpEndpoint.tenancies.expenses.createEntry,
                payload
            )
            if (response && response !== 0) {
                dispatch("getExpanses", parseInt(rootState.tenancy.tenancyDetails.id))
            } else {
            }
        } catch (e) {
            console.log({ Error: e.message })
        }
    },
    async deleteTenancyExpense({ commit, rootState, dispatch }, payload) {
        try {
            const response = await this.$axios.$delete(
                httpEndpoint.tenancies.expenses.createEntry,
                {
                    data: { id: payload }
                }
            )
            if (response && response !== 0) {
                dispatch("getExpanses", parseInt(rootState.tenancy.tenancyDetails.id))
                return true
            }
        } catch (e) {
            console.log({ Error: e.message })
            return false
        }
    },

    async getTenancyDocuments({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.tenancies.document}?${payload}`)
            if (response) {
                commit("setDocuments", response)
            } else {
                commit("setDocuments", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setExpanses", [])
        }
    },

    async createTenancyDocument({ commit, rootState, dispatch }, payload) {
        try {
            const response = await this.$axios.$post(httpEndpoint.tenancies.document, payload)
            if (response && response !== 0) {
                const documentQueries = qs.stringify({
                    TenancyContractAgreementFID: rootState.tenancy.tenancyDetails.id,
                    FileTypeFID: 1
                })
                console.log({ documentQueries })
                await dispatch("getTenancyDocuments", documentQueries)
            } else {
            }
        } catch (e) {
            console.log({ Error: e.message })
        }
    },

    async deleteTenancyDocument({ commit, rootState, dispatch }, payload) {
        try {
            const response = await this.$axios.$delete(httpEndpoint.tenancies.document, {
                data: { id: payload }
            })
            if (response) {
                const documentQueries = qs.stringify({
                    TenancyContractAgreementFID: rootState.tenancy.tenancyDetails.id,
                    FileTypeFID: 1
                })
                await dispatch("getTenancyDocuments", documentQueries)
                commit("setSnackbar", true)
                commit("setSnackbarMessage", "Delete file successfully!")
                setTimeout(() => {
                    commit("setSnackbar", false)
                }, 2000)
            }
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}

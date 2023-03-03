import { httpEndpoint } from "~/services/https/endpoints"
import qs from "qs"

export const state = () => ({
    tenancyDetails: null,
    tenancyDetailByInternalID: null,
    tenancyInfosById: [],
    expenses: [],
    documents: [],
    statusResponse: true,
    tenancyLinks: "details"
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
    setStatusResponse(state, payload) {
        state.statusResponse = payload
    }
}

export const actions = {
    async getExpenses({ commit }, payload) {
        try {
            const query = payload.query ? qs.stringify(payload.query) : ""

            const response =
                query !== ""
                    ? await this.$axios.$get(
                          `${httpEndpoint.tenancies.expenses.getEntries}?TenancyContractAgreementFID=${payload.id}&${query}`
                      )
                    : await this.$axios.$get(
                          `${httpEndpoint.tenancies.expenses.getEntries}?TenancyContractAgreementFID=${payload.id}`
                      )
            if (response) {
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
                commit("setStatusResponse", true)
                commit("setTenancyDetails", response)
                await dispatch("getExpenses", { id: response.id })
                return response
            } else {
                commit("setStatusResponse", false)
                commit("setTenancyDetails", null)
                return null
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setStatusResponse", false)
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
                commit("setTenancyInfosById", response)
            } else {
                commit("setTenancyInfosById", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setTenancyInfosById", [])
        }
    },
    async createTenancyTenantInfos({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$post(
                `${httpEndpoint.tenancies.createTenancyInfosEntry}`,
                payload
            )
            if (response && response !== 0) {
                dispatch("app/showSnackBar", "Create tenancy info successful", { root: true })
            } else {
                console.log("Error!")
            }
        } catch (e) {
            console.log({ Error: e.message })
        }
    },
    async createTenancyExpense({ commit, rootState, dispatch }, payload) {
        try {
            const response = await this.$axios.$post(
                httpEndpoint.tenancies.expenses.createEntry,
                payload
            )
            if (response && response !== 0) {
                dispatch("getExpenses", {
                    id: parseInt(rootState.tenancy.tenancyDetails.id)
                })
                dispatch("app/showSnackBar", "Create expense successful", { root: true })
            } else {
                console.log("Error!")
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
                dispatch("app/showSnackBar", "Expense successfully deleted", { root: true })
                dispatch("getExpenses", { id: parseInt(rootState.tenancy.tenancyDetails.id) })

                return true
            } else {
                console.log("Error!")
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
                return response
            } else {
                commit("setDocuments", [])
                return []
            }
        } catch (e) {
            console.log({ Error: e.message })
            return []
        }
    },

    async createTenancyDocument({ commit, rootState, dispatch }, payload) {
        try {
            const response = await this.$axios.$post(
                httpEndpoint.tenancies.document,
                payload.params
            )
            if (response && response !== 0) {
                const documentQueries = qs.stringify({
                    TenancyContractAgreementFID: rootState.tenancy.tenancyDetails.id,
                    FileTypeFID: payload.documentType.id
                })
                await dispatch("getTenancyDocuments", documentQueries)
            } else {
                console.log("Error!")
            }
        } catch (e) {
            console.log({ Error: e.message })
        }
    },

    async deleteTenancyDocument({ commit, rootState, dispatch }, payload) {
        try {
            const response = await this.$axios.$delete(httpEndpoint.tenancies.document, {
                data: { id: payload.documnentID }
            })
            if (response) {
                const documentQueries = qs.stringify({
                    TenancyContractAgreementFID: rootState.tenancy.tenancyDetails.id,
                    FileTypeFID: payload.documentType.id
                })
                await dispatch("getTenancyDocuments", documentQueries)
                dispatch("app/showSnackBar", "The document has been deleted successfully", {
                    root: true
                })
                setTimeout(() => {
                    commit("setSnackbar", false)
                }, 2000)
            } else {
                console.log("Error!")
            }
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}

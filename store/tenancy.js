import { httpEndpoint } from "~/services/https/endpoints"
import qs from "qs"

export const state = () => ({
    tenancyDetails: null,
    tenancyDetailByInternalID: null,
    tenancyInfosById: [],
    snackbar: false,
    snackbarMessage: "Your message has been sent.",
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
    setSnackbar(state, payload) {
        state.snackbar = payload
    },
    setSnackbarMessage(state, payload) {
        state.snackbarMessage = payload
    },
    setStatusResponse(state, payload) {
        state.statusResponse = payload
    },
    setTenancyLink(state, payload) {
        state.tenancyLinks = payload
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
            console.log({ tenancyDetailsResponse: response })

            if (response) {
                commit("setStatusResponse", true)
                commit("setTenancyDetails", response)
                await dispatch("getExpanses", response.id)
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
                dispatch("app/showSnackBar", "Create expense successfull", { root: true })
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
                console.log({ documentQueries })
                await dispatch("getTenancyDocuments", documentQueries)
                commit("setSnackbar", true)
                commit("setSnackbarMessage", "Delete file successfully!")
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

import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    inventoryDetails: null,
    unitInventoryDetail: "",
    units: [],
    createEntries: {},
    internalID: {},
    entriesID: {},
    listTenancyAgreements: null,
    tenancyID: ""
})

export const mutations = {
    setInventoryDetails(state, payload) {
        state.inventoryDetails = payload
    },
    setInventoryUnitDetail(state, payload) {
        state.unitInventoryDetail = payload
    },
    setUnits(state, payload) {
        state.units = payload
    },
    setCreateUnitInventory(state, payload) {
        state.createEntries = payload
    },
    setInternalID(state, payload) {
        state.internalID = payload
    },
    setEntriesID(state, payload) {
        state.entriesID = payload
    },
    setListTenancyAgreements(state, payload) {
        state.listTenancyAgreements = payload
    },
    setTenancyID(state, payload) {
        state.tenancyID = payload
    }
}

export const actions = {
    async getUnitsByInventoryID({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.unit.getEntries}?AssetInventoryFID=${payload}`
            )

            if (response) {
                console.log({ response })
                commit("setUnits", response.length > 0 ? response : [])
            } else {
                commit("setUnits", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setUnits", [])
        }
    },

    async getUnitsByContractInternalID({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.unit.getByTenancyContrastInternalID}/${payload}`
            )
            if (response) {
                commit("setUnits", response.length ? response : [])
                return true
            } else {
                commit("setUnits", [])
            }
        } catch (e) {
            commit("setUnits", [])
        }
    },

    async createUnitInventory({ commit, dispatch }, payload) {
        try {
            console.log({ Called: `${httpEndpoint.unit.getEntries}` })
            const response = await this.$axios.$post(`${httpEndpoint.unit.getEntries}`, payload)
            if (response) {
                dispatch("app/showSnackBar", "Create unit inventory successfully", { root: true })
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setCreateUnitInventory", [])
            return false
        }
    },
    //get detail
    async getDetailUnitInventory({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.unit.getEntryByID}/${payload}`)
            if (response) {
                commit("setInventoryUnitDetail", response ? response : "")
            } else {
                commit("setInventoryUnitDetail", "")
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setInventoryUnitDetail", "")
        }
    },
    async updateUnitInventory({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$put(`${httpEndpoint.unit.updateEntry}`, payload)
            if (response) {
                dispatch("app/showSnackBar", "Update unit inventory successfully", { root: true })
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log({ Error: e.message })
        }
    },
    async deleteUnitInventory({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$delete(
                `${httpEndpoint.unit.deleteEntryByID}`,
                payload
            )
            if (response) {
                dispatch("app/showSnackBar", "Delete unit inventory successfully", { root: true })
            } else {
                return false
            }
        } catch (e) {
            console.log({ Error: e.message })
            return false
        }
    },

    async getInventoryDetails({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.inventories.getByInternalID}/${payload}`
            )

            if (response) {
                await commit("setInventoryDetails", response)
                await dispatch("getUnitsByInventoryID", response.id)
            } else {
                commit("setInventoryDetails", null)
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setInventoryDetails", null)
        }
    },

    async createTenancyAgreement({ commit, dispatch }, payload) {
        try {
            const responseMain = await this.$axios.$post(
                `${httpEndpoint.tenancyAgreements.createEntry}`,
                payload
            )
            if (responseMain) {
                if (responseMain.id !== 0) {
                    dispatch(
                        "app/showSnackBar",
                        responseMain.responseMessage || "Create contract success",
                        { root: true }
                    )
                    const responseSub = await this.$axios.$get(
                        `${httpEndpoint.tenancyAgreements.getEntries}?AssestInventoryFID=${payload.assestInventoryFID}`
                    )

                    if (responseSub) {
                        commit("setListTenancyAgreements", responseSub)
                    }
                    return responseMain
                } else {
                    console.log({ Error: responseMain.responseMessage })
                    return responseMain
                }
            } else {
                return null
            }
        } catch (e) {
            console.log({ Error: e.message })
            return null
        }
    },

    async suspendContractAgreement({ commit, dispatch, state }, payload) {
        try {
            const response = await this.$axios.$put(
                `${httpEndpoint.tenancyAgreements.updateEntry}`,
                payload
            )

            if (response) {
                await dispatch("getListTenancyAgreements", state.inventoryDetails.id)
                commit("setSnackbar", true)
                commit("setSnackbarMessage", "This contract agreement has been suspended.")
                return response
            } else {
                return false
            }
        } catch (e) {
            return false
        }
    },

    async getListTenancyAgreements({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.tenancyAgreements.getEntries}?AssestInventoryFID=${payload}`
            )

            if (response) {
                commit("setListTenancyAgreements", response)
            } else {
                commit("setListTenancyAgreements", null)
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setListTenancyAgreements", null)
        }
    }
}

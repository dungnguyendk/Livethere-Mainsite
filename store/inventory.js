import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    inventoryDetails: null,
    unitInventoryDetail: "",
    units: [],
    createEntries: {},
    internalID: {},
    entriesID: {},
    listTenancyAgreements: null,
    snackbar: false,
    snackbarMessage: "Your message has been sent.",
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
    setSnackbar(state, payload) {
        state.snackbar = payload
    },
    setSnackbarMessage(state, payload) {
        state.snackbarMessage = payload
    },
    setTenancyID(state, payload) {
        state.tenancyID = payload
    }
}

export const actions = {
    async getUnitsByInventoryFID({ commit }, payload) {
        try {
            const detail = await this.$axios.$get(
                `${httpEndpoint.inventories.getByInternalID}/${payload}`
            )

            if (detail) {
                const response = await this.$axios.$get(
                    `${httpEndpoint.unit.getEntries}?AssetInventoryFID=${detail.id}`
                )
                commit("setInternalID", detail.internalID)
                commit("setEntriesID", detail.id)
                if (response) {
                    commit("setUnits", response.length ? response : [])
                    return true
                } else {
                    commit("setUnits", [])
                }
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setUnits", [])
        }
    },
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

    async createUnitInventory({ commit }, payload) {
        try {
            console.log({ Called: `${httpEndpoint.unit.getEntries}` })
            const response = await this.$axios.$post(`${httpEndpoint.unit.getEntries}`, payload)
            if (response) {
                commit("setSnackbar", true)
                commit("setSnackbarMessage", "Create new unit inventory success")
                return true
            } else {
                commit("setSnackbar", false)
                commit("setSnackbarMessage", "Your message has been sent.")
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
    async updateUnitInventory({ commit }, payload) {
        try {
            const response = await this.$axios.$put(`${httpEndpoint.unit.updateEntry}`, payload)
            if (response) {
                commit("setSnackbar", true)
                commit("setSnackbarMessage", "Update unit inventory success")
                return true
            } else {
                commit("setSnackbar", false)
                commit("setSnackbarMessage", "Your message has been sent.")
                return false
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setSnackbar", false)
            commit("setSnackbarMessage", "Your message has been sent.")
        }
    },
    async deleteUnitInventory({ commit }, payload) {
        try {
            const response = await this.$axios.$delete(
                `${httpEndpoint.unit.deleteEntryByID}`,
                payload
            )
            if (response) {
                commit("setSnackbar", true)
                commit("setSnackbarMessage", "Delete unit inventory success")
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

    async createTenancyAgreement({ commit }, payload) {
        try {
            const responseMain = await this.$axios.$post(
                `${httpEndpoint.tenancyAgreements.createEntry}`,
                payload
            )
            if (responseMain) {
                if (responseMain.id !== 0) {
                    const responseSub = await this.$axios.$get(
                        `${httpEndpoint.tenancyAgreements.getEntries}?AssestInventoryFID=${payload.assestInventoryFID}`
                    )
                    if (responseSub) {
                        commit("setListTenancyAgreements", responseSub)
                    }
                    commit("setSnackbar", true)
                    commit("setSnackbarMessage", responseMain.responseMessage)
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

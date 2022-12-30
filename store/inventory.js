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
    inventoryDetails: null
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
    }
}

export const actions = {
    async getInventoryDetails({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.inventories.getByInternalID}/${payload}`
            )
            if (response) {
                commit("setInventoryDetails", response)
            } else {
                commit("setInventoryDetails", null)
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setInventoryDetails", null)
        }
    },
    async getUnitsByInventoryFID({ commit }, payload) {
        try {
            const detail = await this.$axios.$get(
                `${httpEndpoint.inventories.getByInternalID}/${payload}`
            )

            if (detail) {
                const response = await this.$axios.$get(
                    `${httpEndpoint.unit.getEntries}?AssestInventoryFID=${detail.id}`
                )
                commit("setInternalID", detail.internalID)
                commit("setEntriesID", detail.id)
                if (response) {
                    commit("setUnits", response.length ? response : {})
                    return true
                } else {
                    commit("setUnits", {})
                }
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setUnits", [])
        }
    },
    async createUnitInventory({ commit }, payload) {
        try {
            const response = await this.$axios.$post(`${httpEndpoint.unit.getEntries}`, payload)
            if (response && response !== 0) {
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
    async deleteUnitInventory({ commit }, payload) {
        try {
            const response = await this.$axios.$delete(
                `${httpEndpoint.unit.deleteEntryByID}`,
                payload
            )
            if (response) {
                commit("setSnackbar", true)
                commit("setSnackbarMessage", "Delete inventory success")
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
    async getInventoryDetails({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.inventories.getByInternalID}/${payload}`
            )

            if (response) {
                commit("setInventoryDetails", response)
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
                const responseSub = await this.$axios.$get(
                    `${httpEndpoint.tenancyAgreements.getEntries}?AssestInventoryFID=${payload.assestInventoryFID}`
                )
                if (responseSub) {
                    commit("setListTenancyAgreements", responseSub)
                }
            }
        } catch (e) {
            console.log(e)
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

import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    unitInventoryDetail: "",
    units: [],
    createEntries: {},
    internalID: {},
    entriesID: {},
    listTenancyAgreements: null,
    snackbar: false,
    snackbarMessage: "Your message has been sent."
})

export const mutations = {
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
    async getUnitsByInventoryFID({ commit }, payload) {
        try {
            const detail = await this.$axios.$get(
                `${httpEndpoint.inventories.getByInternalID}/${payload}`
            );

            if (detail) {
                const response = await this.$axios.$get(`${httpEndpoint.unit.getEntries}?AssestInventoryFID=${detail.id}`)
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
            } else {
                commit("setSnackbar", false)
                commit("setSnackbarMessage", "Your message has been sent.")
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setCreateUnitInventory", [])
        }
    },
    //get detail
    async getDetailUnitInventory({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.unit.getEntryByID}/${payload}`
            )
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
            const response = await this.$axios.$put(
                `${httpEndpoint.unit.updateEntry}`,
                payload
            )
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
    }

}

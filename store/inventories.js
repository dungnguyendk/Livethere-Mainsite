import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    inventories: [],
    inventoryDetail: null,
    typeSelect: 0,
    snackbar: false,
    snackbarMessage: "Your message has been sent.",
    statusResponse: true
})

export const mutations = {
    setInventories(state, payload) {
        state.inventories = payload
    },
    setInventoryDetail(state, payload) {
        state.inventoryDetail = payload
    },
    setTypeSelected(state, payload) {
        state.typeSelect = payload
    },
    setSnackbar(state, payload) {
        state.snackbar = payload
    },
    setSnackbarMessage(state, payload) {
        state.snackbarMessage = payload
    },
    setStatusResponse(state, payload) {
        state.statusResponse = payload
    }
}

export const actions = {
    async createInventories({ commit }, payload) {
        try {
            const response = await this.$axios.$post(
                `${httpEndpoint.inventories.createEntry}`,
                payload
            )
            if (response && response !== 0) {
                commit("setStatusResponse", true)
                commit("setSnackbar", true)
                commit("setSnackbarMessage", "Create new inventory success")
            } else {
                commit("setStatusResponse", false)
                commit("setSnackbar", false)
                commit("setSnackbarMessage", "Your message has been sent.")
            }
        } catch (e) {
            commit("setStatusResponse", false)
            commit("setSnackbar", false)
            commit("setSnackbarMessage", "Your message has been sent.")
            console.log({ Error: e.message })
        }
    },
    async getInventories({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.inventories.getEntries}?${payload}`
            )
            if (response) {
                commit("setInventories", response.length ? response : [])
            } else {
                commit("setInventories", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setInventories", [])
        }
    },
    async getInventoriesByTenanted({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.inventories.getEntriesByTenanted}`
            )
            if (response) {
                commit("setInventories", response.length ? response : [])
            } else {
                commit("setInventories", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setInventories", [])
        }
    },
    async getInventoriesByVacant({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.inventories.getEntriesByVacant}`
            )
            if (response) {
                commit("setInventories", response.length ? response : [])
            } else {
                commit("setInventories", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setInventories", [])
        }
    },
    async getDetailInventory({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.inventories.getEntryById}/${payload}`
            )
            if (response) {
                commit("setInventoryDetail", response ? response : null)
            } else {
                commit("setInventoryDetail", null)
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setInventoryDetail", null)
        }
    },
    async updateInventory({ commit }, payload) {
        try {
            const response = await this.$axios.$put(
                `${httpEndpoint.inventories.updateEntry}`,
                payload
            )
            if (response) {
                commit("setStatusResponse", true)
                commit("setSnackbar", true)
                commit("setSnackbarMessage", "Update inventory success")
            } else {
                commit("setStatusResponse", false)
                commit("setSnackbar", false)
                commit("setSnackbarMessage", "Your message has been sent.")
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setStatusResponse", false)
            commit("setSnackbar", false)
            commit("setSnackbarMessage", "Your message has been sent.")
        }
    },
    async deleteInventory({ commit }, payload) {
        try {
            const response = await this.$axios.$delete(
                `${httpEndpoint.inventories.deleteEntryByID}`,
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
    async putSoldOut({ commit }, payload) {
        try {
            if (payload) {
                const response = await this.$axios.$put(
                    `${httpEndpoint.inventories.putSoldOut}`,
                    payload
                )
                if (response) {
                    commit("setSnackbar", true)
                    commit("setSnackbarMessage", "Update sold out successfully")
                } else {
                    commit("setSnackbar", false)
                    commit("setSnackbarMessage", "Your message has been sent.")
                }
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setSnackbar", false)
            commit("setSnackbarMessage", "Your message has been sent.")
        }
    }
}

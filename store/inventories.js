import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    inventories: [],
    inventoryDetail: null,
    typeSelect: 0,
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
    setStatusResponse(state, payload) {
        state.statusResponse = payload
    }
}

export const actions = {
    async createInventories({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$post(
                `${httpEndpoint.inventories.createEntry}`,
                payload
            )
            if (response && response !== 0) {
                commit("setStatusResponse", true)
                dispatch("app/showSnackBar", "Create successful", { root: true })
            } else {
                commit("setStatusResponse", false)
            }
        } catch (e) {
            commit("setStatusResponse", false)
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
    async updateInventory({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$put(
                `${httpEndpoint.inventories.updateEntry}`,
                payload
            )
            if (response) {
                commit("setStatusResponse", true)
                dispatch("app/showSnackBar", "Update successful", { root: true })
            } else {
                commit("setStatusResponse", false)
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setStatusResponse", false)
        }
    },
    async deleteInventory({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$delete(
                `${httpEndpoint.inventories.deleteEntryByID}`,
                payload
            )
            if (response) {
                dispatch("app/showSnackBar", "Delete successful", { root: true })
            }
        } catch (e) {
            console.log({ Error: e.message })
        }
    },
    async putSold({ commit, dispatch }, payload) {
        try {
            if (payload) {
                const response = await this.$axios.$put(
                    `${httpEndpoint.inventories.putSold}`,
                    payload
                )
                if (response) {
                    dispatch("app/showSnackBar", "Update successful", { root: true })
                } else {
                    console.log("Error")
                }
            }
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}

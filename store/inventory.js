import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    inventoryDetails: null,
    units: [],
    createEntries: {},
    internalID: {},
    entriesID: {},
})

export const mutations = {
    setInventoryDetails(state, payload) {
        state.inventoryDetails = payload
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
            );
            const response = await this.$axios.$get(`${httpEndpoint.unit.getEntries}?AssestInventoryFID=${detail.id}`)
            commit("setEntriesID", detail.id)
            if (response) {
                commit("setUnits", response.length ? response : {})
            } else {
                commit("setUnits", {})
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setUnits", [])
        }
    },
    async createUnitInventory({ commit }, payload) {
        
        try {
            const response = await this.$axios.$post(`${httpEndpoint.unit.getEntries}`, payload)
            if (response) {
                commit("setCreateUnitInventory", response.length ? response : [])
            } else {
                commit("setCreateUnitInventory", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setCreateUnitInventory", [])
        }
    }
}

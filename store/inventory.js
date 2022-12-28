import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    inventoryDetails: null,
    units: [],
    createEntries: {},
    internalID: {},
    entriesID: {},
    listTenancyAgreements: null
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
    },
    setListTenancyAgreements(state, payload) {
        state.listTenancyAgreements = payload
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
            if (response) {
                commit("setCreateUnitInventory", response.length ? response : [])
            } else {
                commit("setCreateUnitInventory", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setCreateUnitInventory", [])
        }
    },

}

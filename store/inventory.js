import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    inventoryDetails: null,
    listTenancyAgreements: null
})

export const mutations = {
    setInventoryDetails(state, payload) {
        state.inventoryDetails = payload
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
    }
}

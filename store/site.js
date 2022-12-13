import {httpEndpoint} from "~/services/https/endpoints"

export const state = () => ({
    siteDetails: null,
    publishedEntries: [],
    isUpdating: false,
    success: false, // successfull status, use for notification
    error: false // error status, use for notification
})

export const mutations = {
    setSiteDetails(state, payload) {
        state.siteDetails = payload
    },
}

export const actions = {
    async getDetails({commit}, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.sites.getEntryByID}?SiteId=${payload}`)

            if (response) {
                commit("setSiteDetails", response)
            }
        } catch (e) {
            console.log(e)
        }
    },
}

import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    popularListings: [],
    searchListings: [],
    latestProjects: [],
    statusResponse: true
})

export const mutations = {
    setPopularListings(state, payload) {
        state.popularListings = payload
    },
    setLatestProjects(state, payload) {
        state.latestProjects = payload
    },
    setSearchListing(state, payload){
        state.searchListings = payload
    }
}

export const actions = {
    async getPopularListing({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint}`)
            if (response) {
                commit("setPopularListings", response.length ? response : [])
            } else {
                commit("setPopularListings", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setPopularListings", [])
        }
    },
    async getLatestProject({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint}`)
            if (response) {
                commit("setLatestProjects", response.length ? response : [])
            } else {
                commit("setLatestProjects", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setLatestProjects", [])
        }
    },
    async searchListing({ commit }, payload) {
        try {
            const response = await this.$axios.$post(`${httpEndpoint}`, payload)
            if(response){
                commit("setSearchListing", response.data)
            }else{
                commit("setSearchListing", [])
            }
        } catch (e) {
            console.log({Error: e.message})
            commit("setSearchListing", [])
        }
    }, 
    
}

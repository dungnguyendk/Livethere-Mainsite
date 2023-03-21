import { stat } from "fs"
import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    popularListings: [],
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
    setStatusResponse(state, payload){
        state.statusResponse = payload
    }
}

export const actions = {
    async getPopularListing({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint}`
            )
            if(response){
                commit("setPopularListings", response.length ? response : [])
            }else{
                commit("setPopularListings", [])
            }
        } catch (e) {
            console.log({Error: e.message})
            commit("setPopularListings", [])
        }
    }, 
    async getLatestProject({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint}`
            )
            if(response){
                commit("setLatestProjects", response.length ? response : [])
            }else{
                commit("setLatestProjects", [])
            }
        } catch (e) {
            console.log({Error: e.message})
            commit("setLatestProjects", [])
        }
    }, 
    async filterProject({commit, dispatch}, payload){
        try{
            const response = await this.$axios.$post(
                `${httpEndpoint}`
            )
            if(response && response !== 0){
                commit("setStatusResponse", true)
                dispatch("app/showSnackBar", "Filter success !")
            }else{ 
                commit("setStatusResponse", false)
            }
        }catch(e){
            commit("setStatusResponse", false)
            console.log({Error: e.message})
        }
    }
}

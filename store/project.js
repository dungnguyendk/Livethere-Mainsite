import { httpEndpoint } from "~/services/https/endpoints"
import { PROJECT_LISTING, HOME_AGENT_INFO, PROJECT_DETAILS } from "~/ultilities/contants/dummy-data"

export const state = () => ({
    popularListings: [],
    searchListings: [],
    latestProjects: [],
    mostViewedListings: [],
    homeAgent: {},
    projectDetails: {}
})

export const mutations = {
    setPopularListings(state, payload) {
        state.popularListings = payload
    },
    setLatestProjects(state, payload) {
        state.latestProjects = payload
    },
    setSearchListing(state, payload) {
        state.searchListings = payload
    },
    setHomeAgent(state, payload) {
        state.homeAgent = payload
    },
    setProjectDetails(state, payload) {
        state.projectDetails = payload
    }, 
    setMostViewedListings(state, payload){
        state.mostViewedListings = payload
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
            if (response) {
                commit("setSearchListing", response.data)
            } else {
                commit("setSearchListing", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setSearchListing", PROJECT_LISTING)
        }
    },
    async filterListing({ commit }, payload) {
        try {
            const response = await this.$axios.$post(`${httpEndpoint}`, payload)
            if (response) {
                commit("setSearchListing", response.data)
            } else {
                commit("setSearchListing", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setSearchListing", PROJECT_LISTING)
        }
    },
    async homeAgentInfo({ commit }, payload) {
        try {
            const response = await this.$axios.$post(`${httpEndpoint}`, payload)
            if (response) {
                commit("setHomeAgent", response.data)
            } else {
                commit("setHomeAgent", {})
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setHomeAgent", HOME_AGENT_INFO)
        }
    },
    async enquireUser({ commit }, payload) {
        try {
            const response = await this.$axios.$post(`${httpEndpoint}`, payload)
            if (response) {
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log({ Error: e.message })
            return true
        }
    },
    async projectDetails({ commit }, payload) {
        try {
            const response = await this.$axios.$post(`${httpEndpoint}`, payload)
            if (response) {
                commit("setProjectDetails", response.data)
            } else {
                commit("setProjectDetails", PROJECT_DETAILS)
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setProjectDetails", PROJECT_DETAILS)
        }
    },
    async contactDetails({ commit }, payload) {
        try {
            const response = await this.$axios.$post(`${httpEndpoint}`, payload)
            if (response) {
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log({ Error: e.message })
            return true
        }
    },
    async confirmDetails({ commit }, payload) {
        try {
            const response = await this.$axios.$post(`${httpEndpoint}`, payload)
            if (response) {
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log({ Error: e.message })
            return true
        }
    }, 
    async getMostViewedListing({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint}`)
            if (response) {
                commit("setMostViewedListings", response.length ? response : [])
            } else {
                commit("setMostViewedListings", [])
            }
        } catch (e) {
            console.log({ Error: e.message })
            commit("setMostViewedListings", [])
        }
    },
}

import { httpEndpoint } from "~/services/https/endpoints"
import { PROJECT_LISTING, HOME_AGENT_INFO, PROJECT_DETAILS } from "~/ultilities/contants/dummy-data"

export const state = () => ({
    popularListings: [],
    searchListings: {},
    latestProjects: [],
    mostViewedListings: [],
    projectDetails: {},
    paramsSearch: {
        amenities:"",
        bathRooms:"0;-1",
        bedRooms:"0;-1",
        category:"",
        districts:"",
        livethereChecked:"true",
        mrt:"",
        page: 1,
        perPage: 4,
        propertyType:"All",
        rentPerMonth:"1000;-1",
        search:"",
        sortBy:"Relevant",
        unitSize:"100;-1",
        projectId: null,

    },
    linesMrt: [],
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
    setProjectDetails(state, payload) {
        state.projectDetails = payload
    }, 
    setMostViewedListings(state, payload){
        state.mostViewedListings = payload
    },
    setParamsSearch(state, payload){
        state.paramsSearch = payload
    },
    setLinesMrt(state, payload){
        state.linesMrt = payload
    },
}

export const actions = {
    async getHomePage({ commit }, payload) {
        try {
            const responsePopularListing = await this.$apiCmsPublic.$get(`${httpEndpoint.projects.getPopularListing}`)
            if(responsePopularListing){
                commit("setPopularListings", responsePopularListing)
            }else {
                commit("setPopularListings", [])
            }
            const responseMrtLine = await this.$apiCmsPublic.$get(`${httpEndpoint.projects.linesMrt}`)
            if(responseMrtLine){
                commit("setLinesMrt", responseMrtLine)
            }else{
                commit("setLinesMrt", [])
            }

        } catch (e) {
            console.log({ Error: e.message })
        }
    },
    async getPopularListing({ commit }, payload) {
        try {
            const response = await this.$apiCmsPublic.$get(`${httpEndpoint}`)
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
            const response = await this.$apiCmsPublic.$get(`${httpEndpoint.projects.getEntries}/${payload}`)
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
            // const response = await this.$apiCmsPublic.$get(`${httpEndpoint.projects.getListings}`,{
            //     params: payload
            // })
            const response = await this.$apiCmsPublic.$get(`${httpEndpoint.projects.getListings}?${payload}`)
            if (response) {
                commit("setSearchListing", response)
                return true
            } else {
                commit("setSearchListing", {})
                return false
            }
        } catch (e) {
            console.log({ Error: e.message })
            return false
        }
    },
    async filterListing({ commit }, payload) {
        try {
            const response = await this.$apiCmsPublic.$post(`${httpEndpoint}`, payload)
            if (response) {
                commit("setSearchListing", response)
            } else {
                commit("setSearchListing", {})
            }
        } catch (e) {
            console.log({ Error: e.message })
        }
    },
    async enquireUser({ commit }, payload) {
        try {
            const response = await this.$apiCmsPublic.$post(`${httpEndpoint.projects.postEnquiries}`, payload)

            if (response.succeeded) {
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log({ Error: e.message })
            return false
        }
    },
    async projectDetails({ commit }, payload) {
        try {
            const response = await this.$apiCmsPublic.$post(`${httpEndpoint}`, payload)
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
            const response = await this.$apiCmsPublic.$post(`${httpEndpoint}`, payload)
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
            const response = await this.$apiCmsPublic.$post(`${httpEndpoint}`, payload)
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
            const response = await this.$apiCmsPublic.$get(`${httpEndpoint.projects.getMostViewListing}`)
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

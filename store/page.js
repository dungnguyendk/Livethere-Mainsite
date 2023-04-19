import { httpEndpoint } from "~/services/https/endpoints"
import { sortByOrder } from "~/ultilities/helpers"
import { ACTIVE_SITE_FID } from "~/app-settings"
import qs from "qs"

export const state = () => ({
    pageDetails: null,
    sections: [],
    site: null,
    homepage: null,
    mainSiteDetails: null
})

export const mutations = {
    setPageDetails(state, payload) {
        state.pageDetails = payload
    },

    setSections(state, payload) {
        state.sections = payload
    },
    setSite(state, payload) {
        state.site = payload
    },
    setHomepage(state, payload) {
        state.homepage = payload
    },
    setMainSiteDetails(state, payload) {
        state.mainSiteDetails = payload
    }
}

export const actions = {
    async getPageDetails({ commit }, payload) {
        try {
            const response = await this.$apiCmsPublic.$get(
                `${httpEndpoint.pages.getEntryBySlug}?${payload}`
            )
            console.log({ payload, response })
            if (response) {
                const { sectionMappings } = response
                commit("setPageDetails", response)
                if (sectionMappings.length > 0) {
                    const sectionData = sectionMappings.map((s) => {
                        return {
                            active: s.active,
                            details: s.section.details,
                            sectionName: s.section.sectionName,
                            slug: s.section.templateSlug,
                            order: s.orderBy
                        }
                    })
                    commit("setSections", sectionData.sort(sortByOrder))
                }
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log({ Error: e.message })
            return false
        }
    },
    async getCurrentSite({ commit }, payload) {
        try {
            const response = await this.$apiCmsPublic.$get(
                `${httpEndpoint.sites.getSiteById}?SiteId=${payload}`
            )
            if (response) {
                commit("setSite", response)
                return response
            } else {
                return null
            }
        } catch (e) {
            console.log({ Error: e.message })
            return null
        }
    },

    async getHomepageDetails({ commit }, payload) {
        try {
            const response = await this.$apiCmsPublic.$get(
                `${httpEndpoint.pages.getById}?${payload}`
            )
            if (response) {
                const { sectionMappings } = response
                commit("setPageDetails", response)
                if (sectionMappings.length > 0) {
                    const sectionData = sectionMappings.map((s) => {
                        return {
                            active: s.active,
                            details: s.section.details,
                            sectionName: s.section.sectionName,
                            slug: s.section.templateSlug,
                            order: s.orderBy
                        }
                    })
                    commit("setSections", sectionData.sort(sortByOrder))
                }
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log({ Error: e.message })
            return false
        }
    },

    async getHomepage({ commit, rootState, dispatch }) {
        try {
            await dispatch("getCurrentSite", ACTIVE_SITE_FID).then(async () => {
                const homepageFID = rootState.page.site.defaultHomePageFID
                if (homepageFID) {
                    const params = qs.stringify({ Id: homepageFID, LanguageId: 1 })

                    await dispatch("getHomepageDetails", params)
                }
            })
        } catch (e) {
            console.log({ Error: e.message })
            return null
        }
    },
    async getMainSiteDetails({ dispatch }) {
        try {
            const mainSiteParams = qs.stringify({
                SiteId: 1,
                LanguageId: 1,
                Slug: "mainsite"
            })
            await dispatch("getPageDetails", mainSiteParams)
        } catch (e) {
            //console.log({ Error: e.message })
            return null
        }
    }

    /*async getMainSiteBySlug({ commit, rootState, dispatch }) {
        try {
            await dispatch("getCurrentSite", ACTIVE_SITE_FID).then(async () => {
                const homepageFID = rootState.page.site.defaultHomePageFID
                if (homepageFID) {
                    const params = qs.stringify({ Id: homepageFID, LanguageId: 1 })

                    await dispatch("getHomepageDetails", params)
                }
            })
        } catch (e) {
            console.log({ Error: e.message })
            return null
        }
    }*/
}

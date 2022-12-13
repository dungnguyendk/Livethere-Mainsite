import { httpEndpoint } from "~/services/https/endpoints"
import { sortByOrder } from "~/ultilities/helpers"

export const state = () => ({
    pageDetails: null,
    sections: []
})

export const mutations = {
    setPageDetails(state, payload) {
        state.pageDetails = payload
    },

    setSections(state, payload) {
        state.sections = payload
    }
}

export const actions = {
    async getDetails({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.pages.getEntryBySlug}?${payload}`
            )
            if (response) {
                const { sectionMappings } = response
                commit("setPageDetails", response)
                if (sectionMappings.length > 0) {
                    const sectionData = sectionMappings.map((s) => {
                        /* console.log({ sectionData: s })*/
                        return {
                            active: s.active,
                            details: s.section.details,
                            //fields: s.section.details,
                            sectionName: s.section.sectionName,
                            slug: s.section.sectionTemplateMetadata,
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
    }
}

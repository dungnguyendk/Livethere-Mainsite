import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    inventoryDetails: null, 
    // tenancyAgreements: null
})

export const mutations = {
    setInventoryDetails(state, payload) {
        state.inventoryDetails = payload
    }, 
    // setTenancyAgreements(state, payload){
    //     state.tenancyAgreements = payload
    // }
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
    // async getTenancyAgreements({commit, payload}){
    //     try{
    //         const response = await this.$axios.$get(`${httpEndpoint.tenancyAgreements.getEntries}?AssestInventoryFID=${id}`)
    //         if(response){
    //             commit("setTenancyAgreements", response)
    //         }else{
    //             commit("setTenancyAgreements", null)
    //         }

    //     }catch(e){
    //         console.log({Error: e.message})
    //         commit("setTenancyAgreements", null)
    //     }
    // }
}

export const state = () => ({
    userID: 0,
    registerDetails: null
})

export const mutations = {
    setUserID(state, payload) {
        state.userID = payload
    },
    setRegisterDetails(state, payload) {
        state.registerDetails = payload
    }
}

export const actions = {
    setRegisterDetails({ commit }, payload) {
        commit("setRegisterDetails", payload)
    }
}

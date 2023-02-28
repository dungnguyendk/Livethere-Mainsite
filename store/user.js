export const state = () => ({
    userID: 0,
    registerDetails: null,
    signInDetails: null
})

export const mutations = {
    setUserID(state, payload) {
        state.userID = payload
    },
    setRegisterDetails(state, payload) {
        state.registerDetails = payload
    },
    setSignInDetails(state, payload) {
        state.signInDetails = payload
    }
}

export const actions = {
    setRegisterDetails({ commit }, payload) {
        commit("setRegisterDetails", payload)
    },
    setSignInDetails({ commit }, payload) {
        commit("setSignInDetails", payload)
    }
}

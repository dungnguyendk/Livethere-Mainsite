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
    setSignInDetails({ commit }, payload) {
        commit("setSignInDetails", payload)
    }
}

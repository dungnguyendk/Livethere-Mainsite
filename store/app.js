export const state = () => ({
    appDrawer: false,
    token: null,
    appLoading: false,
    appLoadingMessage: "Loading...",
    sidebarCollapse: false, 
    createNewUserEditForm: false,
})

export const mutations = {
    setAppDrawer(state, payload) {
        state.appDrawer = payload
    },

    setToken(state, payload) {
        state.token = payload
    },

    setSidebarCollapse(state, payload) {
        state.sidebarCollapse = payload
    },

    setAppLoading(state, payload) {
        state.appLoading = payload
    },

    setApploadingMessage(state, payload) {
        state.appLoadingMessage = payload
    }, 
    
    setCreateNewUserEditForm(state, payload){
        state.createNewUserEditForm = payload
    }
}

export const actions = {}

import { httpEndpoint } from "~/services/https/endpoints"
import { appPagination } from "~/services/https/httpServices"

const initialUserDetais = {
    id: 0,
    userGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    username: "",
    regionFID: 0,
    siteFID: 0,
    roleFID: 0,
    roleDisplayName: "Developer",
    displayName: "",
    email: "",
    active: false,
    deleted: false,
    password: "",
    passwordSalt: "",
    accessMultiSites: false,
    loginMethod: "",
    initAccount: false
}

export const state = () => ({
    allEntries: {},
    createEntries: {},
    updateEntry: {},
    deleteEntry: {}
})

export const mutations = {
    setAllEntries(state, payload) {
        state.allEntries = payload
    },
    setCreateEntries(state, payload) {
        state.createEntries = payload
    },
    setUpdateEntry(state, payload) {
        state.updateEntry = payload
    },
    setDeleteEntry(state, payload) {
        state.deleteEntry = payload
    }
}

export const actions = {
    async getAllEntries({ commit }, payload) {
        try {
            const response = await this.$axios.$post(`${httpEndpoint.users.getEntries}`, payload)
            if (response) {
                commit("setAllEntries", response)
            } else {
                commit("setAllEntries", [])
            }
        } catch (e) {
            console.log(e)
            commit("setAllEntries", [])
        }
    },
    async createNewEntry({ commit }, payload) {
        try {
            const response = await this.$axios.$post(
                `${httpEndpoint.users.createEntry}`,
                payload.params
            )
            if (response) {
                commit("setCreateEntries", response.data)
            }
        } catch (e) {
            console.log(e)
        }
    },

    async updateEntry({ commit }, payload) {
        try {
            const response = await this.$axios.$put(
                `${httpEndpoint.users.updateEntry}`,
                payload.params
            )
            if (response) {
                commit("setUpdateEntry", response.data)
            }
        } catch (e) {
            console.log(e.message)
        }
    },

    async trashEntry({ commit }, payload) {
        try {
            const response = await this.$axios.$delete(
                `${httpEndpoint.users.deleteEntry}?Id=${payload}`
            )
            if (response.success) {
                commit("setDeleteEntry", response)
                const params = {
                    page: 1,
                    pageSize: appPagination.defaultPageSize,
                    data: {
                        deleted: false
                    }
                }
                const responseAllEntries = await this.$axios.$post(
                    `${httpEndpoint.users.getEntries}`,
                    params
                )
                if (responseAllEntries) {
                    commit("setAllEntries", responseAllEntries)
                }
            }
        } catch (e) {
            console.log({ error: e.message })
        }
    }
}

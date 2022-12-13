export const httpEndpoint = {
    auth: {
        login: "/api/Authen/Login",
        logout: "/api/Authen/logout"
    },
    sites: {
        getEntries: "api/Sites/Search",
        getEntryByID: "api/Site/get-by-id",
        updateEntry: "api/Sites/Update",
        createEntry: "api/Sites/Create",
        trashEntry: "api/Sites/MarkDelete"
    },

    languages: {
        getEntries: "api/CommonLanguages/Search"
    },
    pages: {
        getEntryBySlug: "api/Page/get-by-slug"
    },
    menus: {
        getEntryById: "api/Menu/get-by-id"
    },

    enquiry: {
        sendEnquiry: "/api/Enquiries"
    }
}

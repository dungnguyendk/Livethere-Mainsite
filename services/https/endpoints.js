export const httpEndpoint = {
    sites: {
        getEntries: "api/Sites/Search",
        getEntryByID: "api/Site/get-by-id"
    },

    pages: {
        getEntryBySlug: "api/Page/get-by-slug"
    },
    menus: {
        getEntryById: "api/Menu/get-by-id"
    },

    enquiry: {
        sendEnquiry: "/api/Enquiries"
    },
    auth: {
        login: "/api/Authen"
    },
    inventories: {
        getEntryByPostalCode: "",
        getEntries: "/api/asset-inventories",
        getEntryById: "/api/asset-inventories",
        createEntry: "/api/asset-inventories",
        deleteEntryByID: "/api/asset-inventories"
    }
}

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
        createEntry: "/api/asset-inventories",
        getByInternalID: "/api/asset-inventories/by-internalID",
    },
    unit: {
        getEntryByID: "/api/asset-unit-inventories",
        getEntries:"/api/asset-unit-inventories",
        createEntry:"/api/asset-unit-inventories"
    }
}

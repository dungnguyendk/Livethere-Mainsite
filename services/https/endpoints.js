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
        getEntries: "/api/asset-inventories",
        getEntryById: "/api/asset-inventories",
        createEntry: "/api/asset-inventories",
        updateEntry: "/api/asset-inventories",
        deleteEntryByID: "/api/asset-inventories"
    },
    postal: {
        getEntryByPostalCode: "/api/properties/details",
        createEntry: "/api/asset-inventories",
        getByInternalID: "/api/asset-inventories/by-internalID"
    },
    tenancies: {
        getTenancyById: "/api/tenancy-contract-agreements",
        getTenancyInfosById: "/api/tenancy-tenant-infos"
    }, 
    tenancyAgreements: {
        getByID: "/api/tenancy-contract-agreements",
        getByInternalID: "/api/tenancy-contract-agreements/by-internalID",
        getEntries: "/api/tenancy-contract-agreements", 
        createEntry: "/api/tenancy-contract-agreements", 
        updateEntry: "/api/tenancy-contract-agreements", 
        deleteEntry: "/api/tenancy-documents", 

    }
}

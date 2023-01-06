export const httpEndpoint = {
    sites: {
        getEntries: "api/Sites/Search",
        getEntryByID: "api/Site/get-by-id"
    },
    user: {
        getLandlordUserInfo: "api/User/LogonUser"
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
        login: "/api/Authen",
        register: "/api/Registration",
        checkEmail: "/api/Registration/check-email",
        checkPhoneNumber: "/api/Registration/check-contactno",
        checkUsername: "/api/Registration/check-username"
    },
    inventories: {
        getEntries: "/api/asset-inventories",
        getEntryById: "/api/asset-inventories",
        createEntry: "/api/asset-inventories",
        updateEntry: "/api/asset-inventories",
        deleteEntryByID: "/api/asset-inventories",
        getByInternalID: "/api/asset-inventories/by-internalID"
    },
    postal: {
        getEntryByPostalCode: "/api/properties/details",
        createEntry: "/api/asset-inventories",
        getByInternalID: "/api/asset-inventories/by-internalID"
    },
    unit: {
        getEntryByID: "/api/asset-unit-inventories",
        updateEntry: "/api/asset-unit-inventories",
        getEntries: "/api/asset-unit-inventories",
        createEntry: "/api/asset-unit-inventories",
        getByInternalID: "/api/asset-inventories/by-internalID",
        deleteEntryByID: "/api/asset-unit-inventories"
    },
    tenancies: {
        getTenancyById: "/api/tenancy-contract-agreements",
        getTenancyByInternalID: "/api/tenancy-contract-agreements/by-internalID",
        getTenancyInfosById: "/api/tenancy-tenant-infos",
        createTenancyInfosEntry: "api/tenancy-tenant-infos",
        expenses: {
            getEntryByID: "api/tenancy-inventory-expenses",
            createEntry: "api/tenancy-inventory-expenses",
            getEntries: "api/tenancy-inventory-expenses"
        },
        document: "api/tenancy-documents"
    },
    tenancyAgreements: {
        getByID: "/api/tenancy-contract-agreements",
        getByInternalID: "/api/tenancy-contract-agreements/by-internalID",
        getEntries: "/api/tenancy-contract-agreements",
        createEntry: "/api/tenancy-contract-agreements",
        updateEntry: "/api/tenancy-contract-agreements",
        deleteEntry: "/api/tenancy-documents"
    },
    documents: "api/documents",
    dashBoard: {
        getEntries: "api/Analytic/my-dashboard"
    },
    analytics: {
        getEntries: "api/Analytic/analytic-dashboard"
    }
}

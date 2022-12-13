export const httpEndpoint = {
    sites: {
        getEntries: "api/Sites/Search",
        getEntryByID: "api/Site/get-by-id",
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

export const SUBMISSION_PAGE_SIZE_DEFAULT = 99999

export const SUBMISION_TRANSACTION_TYPE = [
    {
        text: "NEW LAUNCH (ECB)",
        value: "PRIMARY"
    },
    {
        text: "SALE",
        value: "SALE"
    },
    {
        text: "LEASE",
        value: "LEASE"
    }
]

export const SUBMISION_TENURE_TYPE = [
    {
        text: "Leasehold",
        value: "0"
    },
    {
        text: "Freehold",
        value: "1"
    },
    {
        text: "Other",
        value: "OTHER"
    }
]

export const SUBMISION_SOURCE_OF_LEADS_TYPE = [
    {
        text: "Please select",
        value: "NONE"
    },
    {
        text: "Property Guru",
        value: "PROPERTY_GURU"
    },
    {
        text: "Online Portal",
        value: "ONLINE_PORTAL"
    },
    {
        text: "Referral",
        value: "REFERRAL"
    },
    {
        text: "Print Media",
        value: "PRINT_MEDIA"
    },
    {
        text: "Social Media",
        value: "SOCIAL_MEDIA"
    }
]

export const SUBMISION_ROOM_TYPE = [
    {
        text: "Studio",
        value: "Studio"
    },
    {
        text: "1 Beth room",
        value: "OneBedroom"
    },
    {
        text: "2 Beth room",
        value: "Twoedroom"
    },
    {
        text: "3 Beth room",
        value: "ThreeBedroom"
    },
    {
        text: "4 Beth room",
        value: "FourBedroom"
    },
    {
        text: "Penthouse",
        value: "Penthouse"
    }
]

export const SUBMISSION_GST_TYPE = [
    {
        text: "Exclusive of GST",
        value: "SUBJGST"
    },
    {
        text: "Inclusive of GST",
        value: "INCLGST"
    },
    {
        text: "Rezo Rated GST",
        value: "ZEROGST"
    }
]

export const SUBMISSION_PARTY_TYPE = {
    SALE: [
        {
            text: "Seller",
            value: "SELLER"
        },
        {
            text: "Seller Rep",
            value: "SELLER REP"
        },
        {
            text: "Buyer",
            value: "Buyer"
        }
    ],
    RESALE: [
        {
            text: "Seller",
            value: "SELLER"
        },
        {
            text: "Seller Rep",
            value: "SELLER REP"
        },
        {
            text: "Buyer",
            value: "Buyer"
        }
    ],
    LEASE: [
        {
            text: "Landlord",
            value: "LANDLORD"
        },
        {
            text: "Landlord Rep",
            value: "LANDLORD REP"
        },
        {
            text: "Tenant",
            value: "TENANT"
        },
        {
            text: "Assistor",
            value: "ASSISTOR"
        },
        {
            text: "Assignee",
            value: "Assignee"
        }
    ]
}

export const SUBMISSION_VERIFICATION_OF_DOCUMENT = {
    INDIVIDUAL: [
        { text: "Identity Card", value: "ID" },
        { text: "Passport", value: "PASSPORT" }
    ],
    COMPANY: [
        { text: "Reg. of Company Cert", value: "REG_OF_COMPANY_CERT" },
        { text: "Business Card", value: "BUSINESS_CARD" },
        { text: "Business License", value: "BUSINESS_LICENSE" }
    ]
}

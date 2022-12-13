export const PRIMARY_MENU = [
    {
        id: 1,
        icon: "ri-home-5-line",
        text: "Home",
        url: "/"
    },
    {
        id: 13,
        icon: "ri-global-line",
        text: "Sites",
        url: "/sites",
        subMenu: [
            {
                id: 1,
                icon: null,
                text: "All Sites",
                url: "/sites"
            },
            {
                id: 2,
                icon: null,
                text: "Create new site",
                url: "/sites/create"
            }
            /*{
                id: 3,
                icon: null,
                text: "Trash",
                url: "/sites/trash"
            }*/
        ]
    },
    {
        id: 2,
        icon: "ri-pages-line",
        text: "Page",
        url: "/pages",
        subMenu: [
            {
                id: 1,
                icon: null,
                text: "Pages",
                url: "/pages"
            },
            {
                id: 2,
                icon: null,
                text: "Create new",
                url: "/pages/create"
            }
            // {
            //     id: 3,
            //     icon: null,
            //     text: "Create new page",
            //     url: "/pages/create-new-page"
            // }
        ]
    },
    {
        id: 3,
        icon: "ri-table-line",
        text: "Sections",
        url: "/sections"
        /*subMenu: [
            {
                id: 1,
                icon: null,
                text: "All sections",
                url: "/sections"
            },
            {
                id: 2,
                icon: null,
                text: "Create new",
                url: "/sections/create"
            }
        ]*/
    },
    {
        id: 4,
        icon: "ri-table-line",
        text: "Section Template",
        url: "/section-templates"
    },

    {
        id: 5,
        icon: "ri-newspaper-line",
        text: "Blog",
        url: "/blog",
        subMenu: [
            {
                id: 1,
                icon: null,
                text: "All posts",
                url: "/blog"
            },
            {
                id: 2,
                icon: null,
                text: "Create new post",
                url: "/blog/create"
            },
            {
                id: 3,
                icon: null,
                text: "Categories",
                url: "/blog/categories"
            }
        ]
    },
    {
        id: 7,
        icon: "ri-microsoft-line",
        text: "Menus",
        url: "/menu",
        subMenu: [
            {
                id: 1,
                icon: null,
                text: "All Menus",
                url: "/menus"
            },
            {
                id: 2,
                icon: null,
                text: "Create new",
                url: "/menus/categories"
            }
        ]
    },
    {
        id: 8,
        icon: "ri-image-2-line",
        text: "Media library",
        url: "/media-library"
    },
    /*{
        id: 12,
        icon: "ri-user-settings-line",
        text: "User Management",
        url: "/users"
    },*/
    {
        id: 14,
        icon: "ri-settings-3-line",
        text: "Settings",
        url: "/settings"
    }
    /*{
        id: 99,
        icon: "ri-briefcase-2-fill",
        text: "Components",
        url: "/components",
        subMenu: [
            {
                id: 1,
                icon: null,
                text: "Buttons",
                url: "/elements/buttons"
            },
            {
                id: 2,
                icon: null,
                text: "Dialogs",
                url: "/elements/dialogs"
            },
            {
                id: 3,
                icon: null,
                text: "Alert",
                url: "/elements/alert"
            },
            {
                id: 4,
                icon: null,
                text: "Accordion",
                url: "/elements/accordion"
            }
        ]
    }*/
]

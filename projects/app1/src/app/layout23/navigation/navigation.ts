import { FuseNavigation23 } from "projects/app1/src/@fuse23/types/fuse-navigation";

export const navigation: any[] = [
    {
        id: "modules",
        title: 'Modules23',
        type: "group",
        children: [
            {
                id: "home",
                title: "Home",
                type: "item",
                icon: 'home',
                url: "/app/home",
            },
            {
                id: "manage_users",
                title: "User management",
                type: "collapsable",
                icon: "people",
                children: [
                    {
                      id: 'users management',
                      title: 'Users',
                      type: 'item',
                      icon: 'people',
                      url: "/app/manage-users/users",
                    },
                    {
                      id: 'users crops',
                      title: 'Crops',
                      type: 'item',
                      icon: 'people',
                      url: "/app/manage-users/products",
                    }
                ]
            },
            {
                id: "home22",
                title: "Home22",
                type: "item22",
                icon: 'home22',
                url: "/app/home",
            }
        ]
    }
]

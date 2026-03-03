
interface MenuItem {
    id: number;
    title: string;
    link: string;
    has_dropdown: boolean;
    sub_menus?: {
        title: string;
        link: string;
    }[];
}

// Simplified navbar: remove demo/options dropdowns and keep only core links
const menu_data: MenuItem[] = [
    {
        id: 1,
        title: "Home",
        link: "/",
        has_dropdown: false,
    },
    {
        id: 4,
        title: "Blogs",
        link: "/blog-grid",
        has_dropdown: false,
    },
    {
        id: 5,
        title: "Contact",
        link: "/contact",
        has_dropdown: false,
    },
];

export default menu_data;
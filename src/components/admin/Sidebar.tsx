import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  currentLocation: string
}
const menu = [
  {
    label: "Dashboard",
    link: "/admin",
    icon: 'home.svg',
  },
  {
    label: "Category",
    link: "/admin/category-lessons",
    icon: 'building.svg',
  },
  {
    label: "Users",
    icon: 'user-box.svg',
    links: [
      { label: "User", link: "/admin/users", icon: 'user-circle.svg' },
      { label: "Role", link: "/admin/roles", icon: 'ghost.svg' },
      { label: "Permission", link: "/admin/permissions", icon: 'key.svg' },
    ],
  },
];

const Sidebar = ({currentLocation} : SidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[250px] bg-pink-900 text-white">
      <Link to={'/'}>
        <div className="w-full px-[50px] py-[10px]">
          <img src="/logo.png" alt="logo" className="h-full w-full object-cover" />
        </div>
      </Link>
      <nav className="mt-4 space-y-1 px-3">
        {menu.map((item) => (
          <SidebarItem key={item.label} item={item} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

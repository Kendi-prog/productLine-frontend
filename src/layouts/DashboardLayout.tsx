import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

import { Icons } from "../components/Icons";


const navItems = [
    {name: "Home", path: "/", icon: "home"},
    {name: "Products", path: "/products", icon: "products"},
    {name: "Customers", path: "/customers", icon: "customers"},
    {name: "Orders", path: "/orders", icon: "orders"},
    {name: "Payments", path: "/payments", icon: "payments"},
    {name: "Employees", path: "/employees", icon: "employees"},
    {name: "Offices", path: "/offices", icon: "offices"},
]


const DashboardLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => setCollapsed(prev => !prev);

    return (
        <div className={`flex w-screen h-screen`}>
            {/* Sidebar */}
            <aside 
                className={`transition-all duration-300 bg-[#1A2F43] shadow-md flex h-full flex-col
                    ${collapsed ? "w-20" : "w-64"}`}
            >
                <div className={`flex items-center justify-between p-2`}>
                    {!collapsed && (
                        <div className={"p-4 text-2xl font-bold text-white"}>Dashboard</div>
                    )} 
                    <button
                        onClick={toggleSidebar}
                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        className="mr-2"
                    >
                        {collapsed 
                            ? <Icons.collapseRight size={10} /> 
                            : <Icons.collapseLeft size={15}/>}
                    </button>    
                </div>
                <nav className={` flex flex-col gap-4`}>
                    {navItems.map((item) => {
                        const Icon = Icons[item.icon as keyof typeof Icons];
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                title={collapsed ? item.name : ""}
                                className={({ isActive }) =>
                                    `flex gap-3 items-center px-6 py-3 text-lg font-medium transition-colors duration-200 
                                    ${isActive ? "bg-[#234566] !text-white" : "text-[#28B5FB] hover:!text-white"}
                                    ${collapsed ? "justify-center" : "justify-start"}`}
                                >
                                    <Icon />
                                    {!collapsed && <span>{item.name}</span>}
                            </NavLink>
                        )})}
                </nav>
            </aside>
            {/* Main COntent */}
            <main className="flex-1 p-6 overflow-y-auto bg-red-100"> 
                <Outlet />
            </main>

        </div>
    )
}

export default DashboardLayout;
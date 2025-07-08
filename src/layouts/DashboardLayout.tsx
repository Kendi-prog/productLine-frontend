import { NavLink, Outlet } from "react-router-dom";

const navItems = [
    {name: "Home", path: "/"},
    {name: "Products", path: "/products"},
    {name: "Customers", path: "/customers"},
    {name: "Orders", path: "/orders"},
    {name: "Payments", path: "/payments"},
    {name: "Employees", path: "/employees"},
    {name: "Offices", path: "/offices"},
]


const DashboardLayout = () => {
    return (
        <div className="flex w-screen h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-[#1A2F43] shadow-md">
                <div className="p-4 text-xl font-bold text-white">Dashboard</div>
                <nav className="mt-4 flex flex-col">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                                isActive
                                    ? "bg-[#234566] !text-white"
                                    : "text-[#28B5FB] hover:!text-white"
                                }`}>
                                {item.name}
                        </NavLink>
                    ))}
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
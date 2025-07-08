import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";
import Customers from "../pages/Customers";
import Orders from "../pages/Orders";
import Payments from "../pages/Payments";
import Employees from "../pages/Employees";
import Offices from "../pages/Offices";
import DashboardLayout from "../layouts/DashboardLayout";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/offices" element={<Offices />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;


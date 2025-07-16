import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/HomePage"
import Products from "../pages/Products/ProductsPage";
import Customers from "../pages/Customers/CustomersPage";
import Orders from "../pages/Orders/OrdersPage";
import Payments from "../pages/Payments/PaymentsPage";
import Employees from "../pages/Employees/EmployeesPage";
import Offices from "../pages/Offices/OfficesPage";
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


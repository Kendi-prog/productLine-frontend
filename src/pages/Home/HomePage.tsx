import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { Icons } from "../../components/Icons";

const stats = [
  { label: "Products", count: 120, route: "/products", icon: "products" },
  { label: "Orders", count: 45, route: "/orders", icon: "orders" },
  { label: "Customers", count: 89, route: "/customers", icon: "customers" },
];


const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <PageHeader title="Dashboard" subtitle="Welcome back, Joy 👋"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {stats.map(({ label, count, route, icon }) => {
                    const Icon = Icons[icon as keyof typeof Icons];
                    return (
                        <div key={label} className="flex flex-col gap-2">
                            <Card className="p-24 mb-10 relative">
                                <div className="absolute top-6 left-10 flex items-center gap-4">
                                    <Icon className="text-[#28B5FB] text-2xl" />
                                    <p className="text-xl font-semibold text-[#1A2F43]">{label}</p>
                                </div>
                                <div className="text-6xl font-bold text-[#1A2F43] animate-bounce">
                                    {count}
                                </div> 
                              
                                
                            </Card>
                            <Button 
                                onClick={() => navigate(route)} 
                                className="self-center"
                            >
                                View {label}
                            </Button>
                        </div>
                )})}
            </div> 
        </div>
    )
}

export default Home;
import FlipCard from "../../components/FlipCard";
import BaseLayout from "../../layouts/BaseLayout";
import { Icons } from "../../components/Icons";

const offices = [
  {
    id: 1,
    name: "Nairobi Office",
    location: "Nairobi, Kenya",
    phone: "+254-700-123456",
    address: "Junction Mall, Ngong Rd",
    code: "NBO-01",
  },
  {
    id: 2,
    name: "Mombasa Office",
    location: "Mombasa, Kenya",
    phone: "+254-711-654321",
    address: "City Mall, Nyali",
    code: "MSA-02",
  },
  {
    id: 3,
    name: "Kampala Office",
    location: "Kampala, Uganda",
    phone: "+256-772-334455",
    address: "Garden City Mall",
    code: "KLA-03",
  },
  {
    id: 4,
    name: "Dar es Salaam Office",
    location: "Dar es Salaam, Tanzania",
    phone: "+255-745-556677",
    address: "Mlimani City Mall",
    code: "DAR-04",
  },
  {
    id: 5,
    name: "Kigali Office",
    location: "Kigali, Rwanda",
    phone: "+250-789-112233",
    address: "Kigali Heights",
    code: "KGL-05",
  },
  {
    id: 6,
    name: "Addis Ababa Office",
    location: "Addis Ababa, Ethiopia",
    phone: "+251-911-445566",
    address: "Bole Road",
    code: "ADD-06",
  },
];


const Offices = () => {
    return (
        <BaseLayout title="Offices" subtitle="See your offices" className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {offices.map((office) => (
                    <FlipCard
                    key={office.id}
                    front={
                        <div className="flex flex-col items-center justify-center h-full">
                        <Icons.offices className="text-[#28B5FB] text-4xl mb-2" />
                        <p className="text-xl font-semibold text-[#1A2F43]">{office.name}</p>
                        <p className="text-sm text-gray-600">{office.location}</p>
                        </div>
                    }
                    back={
                        <div className="flex flex-col items-center justify-center h-full text-center text-sm text-gray-700">
                        <p><strong>Phone:</strong> {office.phone}</p>
                        <p><strong>Address:</strong> {office.address}</p>
                        <p><strong>Postal Code:</strong> {office.code}</p>
                        </div>
                    }
                    />
                ))}
                </div>

        </BaseLayout>
    )
}

export default Offices;
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { fetchOffices } from "../../api/offices";
import FlipCard from "../../components/FlipCard";
import BaseLayout from "../../layouts/BaseLayout";
import { Icons } from "../../components/Icons";
import { useState } from "react";
import OfficeForm from "./OfficeForm";
import Modal from "../../components/Modal";

type Office = {
  officeCode: string;
  city: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  state?: string;
  country: string;
  postalCode: string;
  territory: string;
};


const Offices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q")?.toLowerCase() || "";

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["/offices"],
    queryFn: fetchOffices,
  });

  const filteredOffices = data.filter((office: Office) =>
    office.officeCode.toLowerCase().includes(search) ||
    office.city.toLowerCase().includes(search) ||
    office.country.toLowerCase().includes(search) 
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed Loading Offices!!</div>;

  return (
    <div>
      <BaseLayout
        title="Offices"
        subtitle="Your global footprint — locations that make it happen."
        onAddClick={() => setIsModalOpen(true)}
        className="p-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredOffices.map((office: Office) => (
            <FlipCard
              key={office.officeCode}
              className="h-72"
              front={
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <img
                    src={`https://picsum.photos/200/200?random=${office.officeCode}`}
                    alt={office.city}
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#28B5FB]"
                  />
                  <p className="text-lg font-semibold text-[#1A2F43]">
                    Office {office.officeCode}
                  </p>
                  <p className="text-sm text-gray-600">
                    {office.city}, {office.country}
                  </p>
                  <p className="text-xs text-[#28B5FB]">
                    {office.territory}
                  </p>
                </div>
              }
              back={
                <div className="flex flex-col justify-center h-full gap-2 text-sm text-[#1A2F43]">
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {office.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {office.addressLine1}
                  </p>
                  {office.addressLine2 && (
                    <p>
                      <span className="font-semibold">Address 2:</span>{" "}
                      {office.addressLine2}
                    </p>
                  )}
                  {office.state && (
                    <p>
                      <span className="font-semibold">State:</span>{" "}
                      {office.state}
                    </p>
                  )}
                  <p>
                    <span className="font-semibold">Postal Code:</span>{" "}
                    {office.postalCode}
                  </p>
                </div>
              }
            />
          ))}
        </div>
      </BaseLayout>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <OfficeForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Offices;

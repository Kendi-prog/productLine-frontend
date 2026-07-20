import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import BaseLayout from "../../layouts/BaseLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import CustomerForm from "./CustomerForm";
import { fetchCustomers } from "../../api/customers";

type Customer = {
  customerNumber: number;
  customerName: string;
  contactLastName: string;
  contactFirstName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  salesRepEmployeeNumber?: {
    employeeNumber: number;
  };
  creditLimit?: number;
};


const columns: { label: string; accessor: string }[] = [
  { label: "Customer No.", accessor: "customerNumber" },
  { label: "Customer Name", accessor: "customerName" },
  { label: "Last Name", accessor: "contactLastName" },
  { label: "First Name", accessor: "contactFirstName" },
  { label: "Phone", accessor: "phone" },
  { label: "Address Line 1", accessor: "addressLine1" },
  // { label: "Address Line 2", accessor: "addressLine2" },
  { label: "City", accessor: "city" },
  // { label: "State", accessor: "state" },
  { label: "Postal Code", accessor: "postalCode" },
  { label: "Country", accessor: "country" },
  { label: "Sales Rep No.", accessor: "salesRepEmployeeNumber.employeeNumber" },
  { label: "Credit Limit", accessor: "creditLimit" },
];





const Customers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q")?.toLowerCase() || "";

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['/customers'],
    queryFn: fetchCustomers
  });

  const filteredCustomers = data.filter((customer: Customer) =>
    customer.customerNumber.toString().includes(search) ||
    customer.customerName.toLowerCase().includes(search) ||
    customer.contactLastName.toLowerCase().includes(search) ||
    customer.contactFirstName.toLowerCase().includes(search) ||
    customer.phone.includes(search) ||
    customer.addressLine1.toLowerCase().includes(search) ||
    customer.city.toLowerCase().includes(search)
  );

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed Loading Customers!!</div>

  return (
    <div>
      <BaseLayout
        title="Customers" 
        subtitle="Know your people — every relationship starts here."
        onAddClick={() => setIsModalOpen(true)}
      >
          <Table columns={columns} data={filteredCustomers} />
      </BaseLayout> 
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
        <CustomerForm onClose={() => setIsModalOpen(false)}/>
      </Modal>
    </div>
             
  )
}

export default Customers;
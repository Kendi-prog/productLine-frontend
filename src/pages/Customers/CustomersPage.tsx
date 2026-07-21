import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import BaseLayout from "../../layouts/BaseLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import CustomerForm from "./CustomerForm";
import { fetchCustomers, deleteCustomer } from "../../api/customers";
import Button from "../../components/Button";

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
    firstName: string;
    lastName: string;
  };
  creditLimit?: number;
};


const columns: { label: string; accessor: string; type?: "date" | "money"; }[] = [
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
  { label: "Credit Limit", accessor: "creditLimit", type: "money" },
]





const Customers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [viewCustomer, setViewCustomer] = useState<Customer | null>(null);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q")?.toLowerCase() || "";

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
      mutationFn: deleteCustomer,

      onSuccess: () => {
          queryClient.invalidateQueries({
              queryKey: ["/customers"],
          });

          toast.success("Customer deleted successfully!");
      },

      onError: (error: any) => {
          toast.error(
              error.response?.data ||
              "Cannot delete customer because it has related records."
          );
      }
  });

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

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleView = (customer: Customer) => {
      console.log(customer);
      setViewCustomer(customer);
  };

  const handleDelete = (customer: Customer) => {
    if (
        window.confirm(
            `Delete customer "${customer.customerName}"?`
        )
    ) {
        deleteMutation.mutate(customer.customerNumber);
    }
};

  return (
    <div>
      <BaseLayout
        title="Customers" 
        subtitle="Know your people — every relationship starts here."
        onAddClick={() => {
            setSelectedCustomer(null);
            setIsModalOpen(true);
        }}
      >
          <Table 
            columns={columns} 
            data={filteredCustomers} 
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
          />
      </BaseLayout> 
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
        <CustomerForm
            customer={selectedCustomer ?? undefined as any}
            onClose={() => {
                setSelectedCustomer(null);
                setIsModalOpen(false);
            }}
        />
      </Modal>
      <Modal
            isOpen={!!viewCustomer}
            onClose={() => setViewCustomer(null)}
        >
            {viewCustomer && (
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-[#1A2F43]">
                        Customer Details
                    </h2>

                    <p><strong>Customer Number:</strong> {viewCustomer.customerNumber}</p>
                    <p><strong>Customer Name:</strong> {viewCustomer.customerName}</p>
                    <p><strong>Contact:</strong> {viewCustomer.contactFirstName} {viewCustomer.contactLastName}</p>
                    <p><strong>Phone:</strong> {viewCustomer.phone}</p>
                    <p><strong>Address:</strong> {viewCustomer.addressLine1}</p>
                    <p><strong>City:</strong> {viewCustomer.city}</p>
                    <p><strong>Postal Code:</strong> {viewCustomer.postalCode}</p>
                    <p><strong>Country:</strong> {viewCustomer.country}</p>
                    <p><strong>Credit Limit:</strong> ${viewCustomer.creditLimit}</p>

                    <p>
                        <strong>Sales Representative:</strong>{" "}
                        {viewCustomer.salesRepEmployeeNumber?.firstName}{" "}
                        {viewCustomer.salesRepEmployeeNumber?.lastName}
                    </p>

                    <div className="flex justify-end mt-6">
                        <Button onClick={() => setViewCustomer(null)}>
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    </div>
             
  )
}

export default Customers;
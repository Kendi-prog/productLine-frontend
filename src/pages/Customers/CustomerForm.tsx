import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { fetchEmployees } from "../../api/employees_api";
import { createCustomer, updateCustomer } from "../../api/customers_api";
import { Icons } from "../../components/Icons";
import Button from "../../components/Button";


type Customer = {
    customerNumber: number;
    customerName: string;
    contactFirstName: string;
    contactLastName: string;
    phone: string;
    addressLine1: string;
    city: string;
    postalCode: string;
    country: string;
    salesRepEmployeeNumber: any;
    creditLimit: number;
};

type CustomerFormProps = {
    customer?: Customer;
    onClose: () => void;
};



export default function CustomerForm ({ customer, onClose }: CustomerFormProps) {
  const [formData, setFormData] = useState({
        customerNumber: customer?.customerNumber ?? 0,
        customerName: customer?.customerName ?? "",
        contactFirstName: customer?.contactFirstName ?? "",
        contactLastName: customer?.contactLastName ?? "",
        phone: customer?.phone ?? "",
        addressLine1: customer?.addressLine1 ?? "",
        city: customer?.city ?? "",
        postalCode: customer?.postalCode ?? "",
        country: customer?.country ?? "",
        salesRepEmployeeNumber:
            customer?.salesRepEmployeeNumber?.employeeNumber ?? "",
        creditLimit: customer?.creditLimit ?? 0,
    });

    const queryClient = useQueryClient();
    const saveMutation = useMutation({
        mutationFn: (data: any) =>
            customer ? updateCustomer(data) : createCustomer(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["/customers"],
            });

        toast.success(
            customer
                ? "Customer updated successfully!"
                : "Customer added successfully!"
        );

        onClose();
        },

        onError: () => {
            toast.error(
                customer
                    ? "Failed to update customer."
                    : "Failed to add customer."
            );
        },
    });

    const { data: employees = [] } = useQuery({
        queryKey: ["/employees"],
        queryFn: fetchEmployees,
    });

    const handleChange = (e: React.ChangeEvent <HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    saveMutation.mutate({
        ...formData,
        salesRepEmployeeNumber: {
            employeeNumber: Number(formData.salesRepEmployeeNumber),
        },
    });
};

    return(
        <> 
            {/* Header part */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4 text-[#1A2F43] text-xl font-bold">
                    <Icons.customers className="text-[#28B5FB]"/>
                    {customer ? "Edit Customer" : "Add New Customer"}
                </div>
                <Button onClick={onClose} title="Close">
                    <Icons.close />
                </Button>
            </div>
            {/* Form part */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Customer Number:</label>
                    <input 
                        type="text"
                        name="customerNumber"
                        value={formData.customerNumber}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Customer Name:</label>
                    <input 
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Contact First Name:</label>
                    <input 
                        type="text"
                        name="contactFirstName"
                        value={formData.contactFirstName}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Contact Last Name:</label>
                    <input 
                        type="text"
                        name="contactLastName"
                        value={formData.contactLastName}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Address Line1:</label>
                    <input 
                        type="text"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">City:</label>
                    <input 
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Postal Code:</label>
                    <input 
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Country:</label>
                    <input 
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Sales Representative: </label>
                    <select 
                        name="salesRepEmployeeNumber"
                        value={formData.salesRepEmployeeNumber}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    >
                        <option value="">Select the sales representative</option>
                        {employees.map((employee: any) => (
                            <option
                                key={employee.employeeNumber}
                                value={employee.employeeNumber}
                            >
                                {employee.firstName} {employee.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Credit Limit:</label>
                    <input 
                        type="number"
                        name="creditLimit"
                        value={formData.creditLimit}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <Button type="submit">{customer ? "Update Customer" : "Add Customer"}</Button>
            </form>
        </>
    )
}
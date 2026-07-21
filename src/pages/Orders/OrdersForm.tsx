import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Icons } from "../../components/Icons";
import Button from "../../components/Button";
import {fetchCustomers} from "../../api/customers";
import { createOrder, updateOrder } from "../../api/orders";

type Order = {
    orderNumber: number;
    orderDate: number[];
    requiredDate: number[];
    shippedDate?: number[];
    status: string;
    customer: {
        customerNumber: number;
    };
};

type OrderFormData = {
    orderNumber: number;
    orderDate: string;
    requiredDate: string;
    shippedDate: string;
    status: string;
    customer: string;
};

type OrderFormProps = {
    order?: Order;
    onClose : () => void;
}

const formatDate = (date?: number[]) => {
    if (!date) return "";
    const [year, month, day] = date;

    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

export default function OrderForm ({ order, onClose }: OrderFormProps) {
    const [formData, setFormData] = useState<OrderFormData>({
        orderNumber:  order?.orderNumber ?? 0,
        orderDate: formatDate(order?.orderDate),
        requiredDate: formatDate(order?.requiredDate),
        shippedDate: formatDate(order?.shippedDate),
        status: order?.status ?? "",
        customer: order?.customer.customerNumber.toString() ?? "",
    });

    const queryClient = useQueryClient();
    const saveMutation = useMutation({
        mutationFn: (data: OrderFormData | any) =>
                    order ? updateOrder(data) : createOrder(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/orders"] });
            toast.success(
                order 
                ? "Order updated successfully!" 
                : "Order created successfully!"
            );
            onClose();
        },

        onError: () => {
            toast.error(
                order 
                ? "Failed to update order."
                : "Failed to create order."
            );
        }
    });

    const handleChange = (e: React.ChangeEvent <HTMLInputElement | HTMLSelectElement>  ) => {
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
            customer: {
                customerNumber: Number(formData.customer),
            },
        });
    };

    const { data: customers = [] } = useQuery({
        queryKey: ["/customers"],
        queryFn: fetchCustomers,
    });

    return(
        <>
            {/* Header part */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4 text-[#1A2F43] text-xl font-bold">
                    <Icons.orders className="text-[#28B5FB]"/>
                    {order ? "Edit Order" : "Add Order"}
                </div>
                <Button onClick={onClose} title="Close">
                    <Icons.close />
                </Button>
            </div>
            {/* Form part */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Order Number:</label>
                    <input 
                        type="text"
                        name="orderNumber"
                        value={formData.orderNumber}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Order Date:</label>
                    <input
                        type="date"
                        name="orderDate"
                        value={formData.orderDate}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Required Date:</label>
                    <input 
                        type="date"
                        name="requiredDate"
                        value={formData.requiredDate}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Shipped Date:</label>
                    <input 
                        type="date"
                        name="shippedDate"
                        value={formData.shippedDate}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Status:</label>
                    <input 
                        type="text"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Customer:</label>
                    <select
                        name="customer"
                        value={formData.customer}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                    >
                        <option value="">Select Customer</option>

                        {customers.map((customer: any) => (
                            <option
                                key={customer.customerNumber}
                                value={customer.customerNumber}
                            >
                                {customer.customerName}
                            </option>
                        ))}
                    </select>
                </div>
                <Button type="submit">{order ? "Update Order" : "Add Order"}</Button>
            </form> 
        </>
    )
}
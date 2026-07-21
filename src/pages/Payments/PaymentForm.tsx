import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {createPayment, updatePayment} from "../../api/payments";
import { Icons } from "../../components/Icons";
import Button from "../../components/Button";

type Payment = {
    id: {
        customerNumber: number;
        checkNumber: string;
    }
    paymentDate: number[];
    amount: number;
};

type PaymentFormData = {    
    customerNumber: string;
    checkNumber: string;
    paymentDate: string;
    amount: number;
};

type PaymentFormProps = {
    payment?: Payment;
    onClose : () => void;
}

const formatDate = (date?: number[]) => {
    if (!date) return "";
    const [year, month, day] = date;

    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

export default function PaymentForm ({ payment, onClose }: PaymentFormProps) {
    const [formData, setFormData] = useState<PaymentFormData>({
        customerNumber: payment?.id.customerNumber.toString() ?? "",
        checkNumber: payment?.id.checkNumber ?? "",
        paymentDate: formatDate(payment?.paymentDate),
        amount: payment?.amount ?? 0,    
    });

    const queryClient = useQueryClient();
    const saveMutation = useMutation({
        mutationFn: (data: PaymentFormData | any) =>
                    payment ? updatePayment(data) : createPayment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/payments"] });
            toast.success(
                payment 
                ? "Payment updated successfully!" 
                : "Payment created successfully!"
            );
            onClose();
        },

        // onError: () => {
        //     toast.error(
        //         payment 
        //         ? "Failed to update payment."
        //         : "Failed to create payment."
        //     );
        // }

        onError: (error: any) => {
            console.log("Status:", error.response?.status);
            console.log("Data:", error.response?.data);

            toast.error(
                error.response?.data?.message ??
                error.response?.data ??
                "Failed to create payment."
            );
        }
    });

    const handleChange = (e: React.ChangeEvent <HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        saveMutation.mutate({
            id: {
                customerNumber: Number(formData.customerNumber),
                checkNumber: formData.checkNumber,
            },
            customerNumber: {
                customerNumber: Number(formData.customerNumber),
            },
            paymentDate: formData.paymentDate,
            amount: Number(formData.amount),
        });
    };
    return(
        <>
            {/* Header part */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4 text-[#1A2F43] text-xl font-bold">
                    <Icons.payments className="text-[#28B5FB]"/>
                    {payment ? "Edit Payment" : "Add Payment"}
                </div>
                <Button onClick={onClose} title="Close">
                    <Icons.close />
                </Button>
            </div>
            {/* Form part */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Customer ID:</label>
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
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Check Number:</label>
                    <input
                        type="text"
                        name="checkNumber"
                        value={formData.checkNumber}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Date:</label>
                    <input 
                        type="date"
                        name="paymentDate"
                        value={formData.paymentDate}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Amount:</label>
                    <input 
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <Button type="submit">{payment ? "Update Payment" : "Add Payment"}</Button>
            </form>
        </>
    )
}
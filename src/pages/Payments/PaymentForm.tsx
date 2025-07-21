import { useState } from "react";
import { Icons } from "../../components/Icons";
import Button from "../../components/Button";

type PaymentFormProps = {
    onClose : () => void;
}

export default function PaymentForm ({ onClose }: PaymentFormProps) {
    const [formData, setFormData] = useState({
        customerId : "",
        checkNumber: "",
        date: "",
        amount: "",
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
        console.log("Payment submitted:", formData);
        onClose();
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl border border-[#28B5FB] shadow-xl w-full max-w-xl p-6 relative">
                {/* Header part */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-[#1A2F43] text-xl font-bold">
                        <Icons.payments className="text-[#28B5FB]"/>
                        Add New Payment
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
                            name="customerId"
                            value={formData.customerId}
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
                            name="date"
                            value={formData.date}
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
                    <Button type="submit">Add Payment</Button>
                </form>
            </div>
        </div>
    )
}
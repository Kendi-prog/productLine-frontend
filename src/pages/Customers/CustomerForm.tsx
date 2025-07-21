import { useState } from "react";
import { Icons } from "../../components/Icons";
import Button from "../../components/Button";

type CustomerFormProps = {
    onClose : () => void;
}

export default function CustomerForm ({ onClose }: CustomerFormProps) {
    const [formData, setFormData] = useState({
        customerName : "",
        phone: "",
        addressLine: "",
        state: "",
        salesRepId: "",
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
        console.log("Customer submitted:", formData);
        onClose();
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl border border-[#28B5FB] shadow-xl w-full max-w-xl p-6 relative">
                {/* Header part */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-[#1A2F43] text-xl font-bold">
                        <Icons.customers className="text-[#28B5FB]"/>
                        Add New Customer
                    </div>
                    <Button onClick={onClose} title="Close">
                        <Icons.close />
                    </Button>
                </div>
                {/* Form part */}
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <label className="block text-sm font-medium text-[#1A2F43] mb-1">Address Line:</label>
                        <input 
                            type="text"
                            name="addressLine"
                            value={formData.addressLine}
                            onChange={handleChange}
                            className="w-full border border-[#28B5FB] rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1A2F43] mb-1">State:</label>
                        <input 
                            type="number"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full border border-[#28B5FB] rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1A2F43] mb-1">Sales Representative: </label>
                        <select 
                            name="salesRepId"
                            value={formData.salesRepId}
                            onChange={handleChange}
                            className="w-full border border-[#28B5FB] rounded px-3 py-2"
                            required
                        >
                            <option value="">Select the sale representative --</option>
                            <option value="Classic Cars">Classic Cars</option>
                            <option value="Vehicles">Vehicles</option>
                            <option value="Planes">Planes</option>
                        </select>
                    </div>
                    <Button type="submit">Add Customer</Button>
                </form>
            </div>
        </div>
    )
}
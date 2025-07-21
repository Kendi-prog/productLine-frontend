import { useState } from "react";
import toast from "react-hot-toast";
import { Icons } from "../../components/Icons";
import Button from "../../components/Button";

type OfficeFormProps = {
    onClose : () => void;
}

export default function OfficeForm ({ onClose }: OfficeFormProps) {
    const [formData, setFormData] = useState({
        city : "",
        state: "",
        phone: "",
        addressLine: "",
        postalCode: "",
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
        console.log("Office submitted:", formData);
        toast.success("New Office added successfully!!")
        onClose();
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl border border-[#28B5FB] shadow-xl w-full max-w-xl p-6 relative">
                {/* Header part */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4 text-[#1A2F43] text-xl font-bold">
                        <Icons.offices className="text-[#28B5FB]"/>
                        New Office
                    </div>
                    <Button onClick={onClose} title="Close">
                        <Icons.close />
                    </Button>
                </div>
                {/* Form part */}
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <label className="block text-sm font-medium text-[#1A2F43] mb-1">State:</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
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
                    
                    <Button type="submit">Add Office</Button>
                </form>
            </div>
        </div>
    )
}
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { createOffice, fetchOffices } from "../../api/offices";
import { Icons } from "../../components/Icons";
import Button from "../../components/Button";

type OfficeFormProps = {
    onClose : () => void;
}

export default function OfficeForm ({ onClose }: OfficeFormProps) {
    const [formData, setFormData] = useState({
        officeCode: "",
        city: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        state: "",
        country: "",
        postalCode: "",
        territory: "",
    });

    const queryClient = useQueryClient();
    const saveMutation = useMutation({
        mutationFn: createOffice,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["/offices"],
            });

            toast.success("Office created successfully!");
            onClose();
        },

        onError: () => {
            toast.error("Failed to create office.");
        },
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
        saveMutation.mutate(formData);
    }

    return(
        <>
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
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Office Code:</label>
                    <input 
                        type="text"
                        name="officeCode"
                        value={formData.officeCode}
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
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Address Line 1:</label>
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
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Address Line 2:</label>
                    <input 
                        type="text"
                        name="addressLine2"
                        value={formData.addressLine2}
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
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Territory:</label>
                    <input 
                        type="text"
                        name="territory"
                        value={formData.territory}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                
                <Button type="submit">Add Office</Button>
            </form>
        </>
    )
}
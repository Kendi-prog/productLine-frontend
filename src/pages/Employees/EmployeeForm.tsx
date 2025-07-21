import { useState } from "react";
import { Icons } from "../../components/Icons";
import Button from "../../components/Button";

type EmployeeFormProps = {
    onClose : () => void;
}

export default function EmployeeForm ({ onClose }: EmployeeFormProps) {
    const [formData, setFormData] = useState({
        employeeName : "",
        phone: "",
        jobTitle: "",
        email: "",
        reportsTo: "",
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
        console.log("Employee submitted:", formData);
        onClose();
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl border border-[#28B5FB] shadow-xl w-full max-w-xl p-6 relative">
                {/* Header part */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-[#1A2F43] text-xl font-bold">
                        <Icons.products className="text-[#28B5FB]"/>
                        Add Product
                    </div>
                    <Button onClick={onClose} title="Close">
                        <Icons.close />
                    </Button>
                </div>
                {/* Form part */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#1A2F43] mb-1">Employee Name:</label>
                        <input 
                            type="text"
                            name="employeeName"
                            value={formData.employeeName}
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
                        <label className="block text-sm font-medium text-[#1A2F43] mb-1">Job Title:</label>
                        <input 
                            type="text"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            className="w-full border border-[#28B5FB] rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1A2F43] mb-1">Email:</label>
                        <input 
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-[#28B5FB] rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1A2F43] mb-1">Reports To:</label>
                        <select 
                            name="reportsTo"
                            value={formData.reportsTo}
                            onChange={handleChange}
                            className="w-full border border-[#28B5FB] rounded px-3 py-2"
                            required
                        >
                            <option value="">Select whom the employee reports to --</option>
                            <option value="Classic Cars">Classic Cars</option>
                            <option value="Vehicles">Vehicles</option>
                            <option value="Planes">Planes</option>
                        </select>
                    </div>
                    <Button type="submit">Add Employee</Button>
                </form>
            </div>
        </div>
    )
}
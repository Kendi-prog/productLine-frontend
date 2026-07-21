import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEmployee, fetchEmployees } from "../../api/employees_api";
import { fetchOffices } from "../../api/offices_api";
import { Icons } from "../../components/Icons";
import Button from "../../components/Button";

type EmployeeFormProps = {
    onClose : () => void;
}

export default function EmployeeForm ({ onClose }: EmployeeFormProps) {
    const [formData, setFormData] = useState({
        employeeNumber: 0,
        firstName: "",
        lastName: "",
        extension: "",
        email: "",
        officeCode: "",
        reportsTo: "",
        jobTitle: "",
    });

    const { data: offices = [] } = useQuery({
        queryKey: ["/offices"],
        queryFn: fetchOffices,
    });

    const { data: employees = [] } = useQuery({
        queryKey: ["/employees"],
        queryFn: fetchEmployees,
    });

    const queryClient = useQueryClient();

    const saveMutation = useMutation({
        mutationFn: createEmployee,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["/employees"],
            });

            toast.success("Employee created successfully!");
            onClose();
        },

        onError: () => {
            toast.error("Failed to create employee.");
        },
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
        employeeNumber: Number(formData.employeeNumber),
        firstName: formData.firstName,
        lastName: formData.lastName,
        extension: formData.extension,
        email: formData.email,

        officeCode: {
            officeCode: formData.officeCode,
        },

        reportsTo: formData.reportsTo
            ? {
                  employeeNumber: Number(formData.reportsTo),
              }
            : null,

        jobTitle: formData.jobTitle,
    });
};

    return(
        <>
            {/* Header part */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4 text-[#1A2F43] text-xl font-bold">
                    <Icons.employees className="text-[#28B5FB]"/>
                    New Employee
                </div>
                <Button onClick={onClose} title="Close">
                    <Icons.close />
                </Button>
            </div>
            {/* Form part */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Employee Number:</label>
                    <input 
                        type="number"
                        name="employeeNumber"
                        value={formData.employeeNumber}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Employee First Name:</label>
                    <input 
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Employee Last Name:</label>
                    <input 
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Employee Email:</label>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Extension:</label>
                    <input
                        type="text"
                        name="extension"
                        value={formData.extension}
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
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Office Code:</label>
                    <select 
                        name="officeCode"
                        value={formData.officeCode}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    >
                        <option value="">Select Office</option>
                            {offices.map((office: any) => (
                                <option
                                    key={office.officeCode}
                                    value={office.officeCode}
                                >
                                    {office.city}
                                </option>
                            ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Reports To:</label>
                    <select 
                        name="reportsTo"
                        value={formData.reportsTo}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                    >
                        <option value="">None</option>
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
                <Button type="submit">Add Employee</Button>
            </form>
        </>
    )
}
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import BaseLayout from "../../layouts/BaseLayout";
import FlipCard from "../../components/FlipCard";
import Modal from "../../components/Modal";
import EmployeeForm from "./EmployeeForm";
import { fetchEmployees } from "../../api/employees_api";

type Employees = {
  employeeNumber : number;
  lastName : string;      
  firstName : string;     
  extension : string;    
  email  : string;        
  officeCode: {
    officeCode: string;
    phone: string;
    city: string;
  };   
  reportsTo?: {
    employeeNumber: number;
  };   
  jobTitle : string;
}


const Employees = () => {
  const[isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q")?.toLowerCase() || "";

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['/employees'],
    queryFn: fetchEmployees
  });

  const filteredEmployees = data.filter((emp: Employees) =>
    emp.employeeNumber.toString().includes(search) ||
    emp.firstName.toLowerCase().includes(search) ||
    emp.lastName.toLowerCase().includes(search) ||
    emp.jobTitle.toLowerCase().includes(search)
  );

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed Loading Customers!!</div>

  return (
    <div>
      <BaseLayout 
        title="Employees" 
        subtitle="Meet the team behind the magic — your internal heroes."
        onAddClick={() => setIsModalOpen(true)}
      >
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {filteredEmployees.map((emp: Employees) => (
            <FlipCard
              key={emp.employeeNumber}
              className="h-64"
              front={
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <img
                  src={`https://i.pravatar.cc/200?u=${emp.employeeNumber}`}
                  alt={`${emp.firstName} ${emp.lastName}`}
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#28B5FB]"
                />
                <p className="text-lg font-semibold text-[#1A2F43]">{emp.firstName}</p>
                <p className="text-sm text-gray-600">{emp.jobTitle}</p>
              </div>
              }
              back={
              <div className="flex flex-col justify-center h-full gap-2 text-sm text-[#1A2F43]">
                <p><span className="font-semibold">Email:</span> {emp.email}</p>
                <p><span className="font-semibold">Phone:</span> {emp.officeCode?.phone}</p>
                <p><span className="font-semibold">Office Code:</span> {emp.officeCode?.officeCode}</p>
                <p><span className="font-semibold">City:</span> {emp.officeCode?.city}</p>
                <p><span className="font-semibold">Reports To:</span> {emp.reportsTo?.employeeNumber || "N/A"}</p>
              </div>
              }
            />
            ))}
        </div>
      </BaseLayout>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EmployeeForm onClose={() => setIsModalOpen(false)}/>
      </Modal>
    </div>
      
  )
}

export default Employees;
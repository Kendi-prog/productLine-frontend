import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import BaseLayout from "../../layouts/BaseLayout";
import FlipCard from "../../components/FlipCard";
import Modal from "../../components/Modal";
import EmployeeForm from "./EmployeeForm";
import { fetchEmployees } from "../../api/employees";

type Employees = {
  employeeNumber : number;
  lastName : string;      
  firstName : string;     
  extension : string;    
  email  : string;        
  officeCode : string;    
  reportsTo  : number;    
  jobTitle : string;
}


const Employees = () => {
  const[isModalOpen, setIsModalOpen] = useState(false);

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['/employees'],
    queryFn: fetchEmployees
  });

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
            {data.map((emp: Employees) => (
            <FlipCard
              key={emp.employeeNumber}
              className="h-64"
              front={
              <div className="flex flex-col items-center justify-center h-full gap-2">
                {/* <img
                src={`https://ui-avatars.com/api/?name=${emp.firstName}+${emp.lastName}&background=random`}
                alt={`${emp.firstName} ${emp.lastName}`}
                className="w-24 h-24 rounded-full object-cover"
                /> */}
                <p className="text-lg font-semibold text-[#1A2F43]">{emp.firstName}</p>
                <p className="text-sm text-gray-600">{emp.jobTitle}</p>
              </div>
              }
              back={
              <div className="flex flex-col justify-center h-full gap-2 text-sm text-[#1A2F43]">
                <p><span className="font-semibold">Email:</span> {emp.email}</p>
                <p><span className="font-semibold">Phone:</span> {emp.extension}</p>
                <p><span className="font-semibold">Department:</span> {emp.officeCode}</p>
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
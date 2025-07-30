import BaseLayout from "../../layouts/BaseLayout";
import FlipCard from "../../components/FlipCard";
import Modal from "../../components/Modal";
import { useState } from "react";
import EmployeeForm from "./EmployeeForm";

const employees = [
  {
    id: 1,
    name: "Joy Leila",
    position: "Frontend Developer",
    image: "https://i.pravatar.cc/150?img=3",
    email: "joy@example.com",
    phone: "+254-700-123456",
    department: "Engineering",
  },
  {
    id: 2,
    name: "John Doe",
    position: "Backend Developer",
    image: "https://i.pravatar.cc/150?img=5",
    email: "john@example.com",
    phone: "+254-711-987654",
    department: "Engineering",
  },
  {
    id: 3,
    name: "Amina Yusuf",
    position: "UI/UX Designer",
    image: "https://i.pravatar.cc/150?img=12",
    email: "amina@example.com",
    phone: "+254-702-112233",
    department: "Design",
  },
  {
    id: 4,
    name: "Brian Otieno",
    position: "DevOps Engineer",
    image: "https://i.pravatar.cc/150?img=8",
    email: "brian@example.com",
    phone: "+254-733-445566",
    department: "Operations",
  },
  {
    id: 5,
    name: "Cynthia Wanjiku",
    position: "QA Engineer",
    image: "https://i.pravatar.cc/150?img=10",
    email: "cynthia@example.com",
    phone: "+254-744-556677",
    department: "Quality Assurance",
  },
  {
    id: 6,
    name: "David Kimani",
    position: "Full Stack Developer",
    image: "https://i.pravatar.cc/150?img=15",
    email: "david@example.com",
    phone: "+254-755-667788",
    department: "Engineering",
  },
  {
    id: 7,
    name: "Emily Njeri",
    position: "Product Manager",
    image: "https://i.pravatar.cc/150?img=7",
    email: "emily@example.com",
    phone: "+254-766-778899",
    department: "Product",
  },
  {
    id: 8,
    name: "George Mwangi",
    position: "Technical Writer",
    image: "https://i.pravatar.cc/150?img=13",
    email: "george@example.com",
    phone: "+254-777-889900",
    department: "Documentation",
  },
];


const Employees = () => {
  const[isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <BaseLayout 
        title="Employees" 
        subtitle="Meet the team behind the magic — your internal heroes."
        onAddClick={() => setIsModalOpen(true)}
      >
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {employees.map((emp) => (
          <FlipCard
              key={emp.id}
              className="h-64"
              front={
              <div className="flex flex-col items-center justify-center h-full gap-2">
                  <img
                  src={emp.image}
                  alt={emp.name}
                  className="w-24 h-24 rounded-full object-cover"
                  />
                  <p className="text-lg font-semibold text-[#1A2F43]">{emp.name}</p>
                  <p className="text-sm text-gray-600">{emp.position}</p>
              </div>
              }
              back={
              <div className="flex flex-col justify-center h-full gap-2 text-sm text-[#1A2F43]">
                  <p><span className="font-semibold">Email:</span> {emp.email}</p>
                  <p><span className="font-semibold">Phone:</span> {emp.phone}</p>
                  <p><span className="font-semibold">Department:</span> {emp.department}</p>
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
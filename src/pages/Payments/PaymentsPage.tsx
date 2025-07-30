import { useState } from "react";
import BaseLayout from "../../layouts/BaseLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import PaymentForm from "./PaymentForm";

const columns: { label: string; accessor: "name" | "price" | "category" }[] = [
  { label: "Payment Name", accessor: "name" },
  { label: "Price", accessor: "price" },
  { label: "Category", accessor: "category" },
];

const data = [
  { name: "Laptop", price: "$999", category: "Electronics" },
  { name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
];



const Payments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
       <BaseLayout 
        title="Payments" 
        subtitle="Stay on top of transactions — organized and secure."
        onAddClick={() => setIsModalOpen(true)}
      >
          <Table columns={columns} data={data} />
      </BaseLayout>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PaymentForm onClose={() => setIsModalOpen(false)}/>
      </Modal> 
    </div>
            
  )
}

export default Payments;
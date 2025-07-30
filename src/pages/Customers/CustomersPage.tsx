import { useState } from "react";
import BaseLayout from "../../layouts/BaseLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import CustomerForm from "./CustomerForm";

const columns: { label: string; accessor: "name" | "price" | "category" }[] = [
  { label: "Customer Name", accessor: "name" },
  { label: "Price", accessor: "price" },
  { label: "Category", accessor: "category" },
];

const data = [
  { name: "Laptop", price: "$999", category: "Electronics" },
  { name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
];



const Customers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <BaseLayout
        title="Customers" 
        subtitle="Know your people — every relationship starts here."
        onAddClick={() => setIsModalOpen(true)}
      >
          <Table columns={columns} data={data} />
      </BaseLayout> 
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
        <CustomerForm onClose={() => setIsModalOpen(false)}/>
      </Modal>
    </div>
             
  )
}

export default Customers;
import { useState } from "react";
import BaseLayout from "../../layouts/BaseLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import OrderForm from "./OrdersForm";

const columns: { label: string; accessor: "name" | "price" | "category" }[] = [
  { label: "Order Name", accessor: "name" },
  { label: "Price", accessor: "price" },
  { label: "Category", accessor: "category" },
];

const data = [
  { name: "Laptop", price: "$999", category: "Electronics" },
  { name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
];



const Orders = () => {
  const[isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <BaseLayout 
        title="Orders" 
        subtitle="Manage your Ooders"
        onAddClick={() => setIsModalOpen(true)}
      >
          <Table columns={columns} data={data} />
      </BaseLayout> 
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <OrderForm onClose={() => setIsModalOpen(false)}/>
      </Modal>
    </div>
             
  )
}

export default Orders;
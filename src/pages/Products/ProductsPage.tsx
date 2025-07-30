import { useState } from "react";
import BaseLayout from "../../layouts/BaseLayout";
import Table from "../../components/Table";
import ProductForm from "./ProductForm";
import Modal from "../../components/Modal";

const columns: { label: string; accessor: "name" | "price" | "category" }[] = [
  { label: "Product Name", accessor: "name" },
  { label: "Price", accessor: "price" },
  { label: "Category", accessor: "category" },
];

const data = [
  { name: "Laptop", price: "$999", category: "Electronics" },
  { name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
  {name: "Chair", price: "$49", category: "Furniture" },
];



const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <BaseLayout 
        title="Products" 
        subtitle="Manage your inventory effortlessly and keep your catalog sharp."
        onAddClick={() => setIsModalOpen(true)}
      >
        <Table columns={columns} data={data} />
        
      </BaseLayout> 
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
        <ProductForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
       
  )
}

export default Products;
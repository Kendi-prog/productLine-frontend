import { useState } from "react";
import BaseLayout from "../../layouts/BaseLayout";
import Table from "../../components/Table";
import ProductForm from "./ProductForm";

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
  const [showForm, setShowForm] = useState(false);
    return (
        <BaseLayout title="Products" subtitle="Manage your products">
            <Table columns={columns} data={data} />
            <ProductForm onClose={() => setShowForm(false)} />
        </BaseLayout>        
    )
}

export default Products;
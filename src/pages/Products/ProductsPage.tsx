import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BaseLayout from "../../layouts/BaseLayout";
import Table from "../../components/Table";
import ProductForm from "./ProductForm";
import Modal from "../../components/Modal";
import { fetchProducts } from "../../api/products";

const columns: { label: string; accessor: string }[] = [
  { label: "Product Code", accessor: "productCode" },
  { label: "Product Name", accessor: "productName" },
  { label: "Product Line", accessor: "productLine" },
  { label: "Product Scale", accessor: "productScale" },
  { label: "Vendor", accessor: "productVendor" },
  { label: "Description", accessor: "productDescription" },
  { label: "In Stock", accessor: "quantityInStock" },
  { label: "Buy Price", accessor: "buyPrice" },
  { label: "MSRP", accessor: "MSRP" },
];



const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['/products'],
    queryFn: fetchProducts
  });

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed Loading Products!!</div>


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
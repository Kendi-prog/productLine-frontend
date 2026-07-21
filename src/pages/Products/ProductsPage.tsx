import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import BaseLayout from "../../layouts/BaseLayout";
import Table from "../../components/Table";
import ProductForm from "./ProductForm";
import Modal from "../../components/Modal";
import { deleteProduct,fetchProducts } from "../../api/products_api";
import Button from "../../components/Button";

type Product = {
  productCode: string;
  productName: string;
  productLine: string;
  productScale: string;
  productVendor: string;
  productDescription: string;
  quantityInStock: number;
  buyPrice: number;
  msrp: number;
};


const columns: { label: string; accessor: keyof Product; type?: "date" | "money"; }[] = [
  { label: "Product Code", accessor: "productCode" },
  { label: "Product Name", accessor: "productName" },
  { label: "Product Line", accessor: "productLine" },
  { label: "Product Scale", accessor: "productScale" },
  { label: "Vendor", accessor: "productVendor" },
  { label: "In Stock", accessor: "quantityInStock" },
  { label: "Buy Price", accessor: "buyPrice", type: "money" },
  { label: "MSRP", accessor: "msrp", type: "money" },
];


const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q")?.toLowerCase() || "";
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (productCode: string) => deleteProduct(productCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/products"] });
      alert("✅ Product deleted successfully.");
    },

    onError: (error: any) => {
      alert(error.response?.data || "Failed to delete product.");
    },
  });

  const handleDelete = (product: Product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.productName}"?`
    );

    if (!confirmed) return;

    deleteMutation.mutate(product.productCode);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleView = (product: Product) => {
    setViewProduct(product);
};

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['/products'],
    queryFn: fetchProducts
  });

  const filteredProducts = data.filter((product: Product) =>
    product.productName.toLowerCase().includes(search) ||
    product.productCode.toLowerCase().includes(search) ||
    product.productVendor.toLowerCase().includes(search)
  );

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed Loading Products!!</div>


  return (
    <div>
      <BaseLayout 
        title="Products" 
        subtitle="Manage your inventory effortlessly and keep your catalog sharp."
        onAddClick={() => {
          setSelectedProduct(null);
          setIsModalOpen(true);
        }}  
      >
        <Table 
          columns={columns} 
          data={filteredProducts} 
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        /> 
      </BaseLayout> 
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
        <ProductForm
          product={selectedProduct ?? undefined}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      </Modal>
      <Modal
          isOpen={!!viewProduct}
          onClose={() => setViewProduct(null)}
      >
          {viewProduct && (
              <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-[#1A2F43]">
                      Product Details
                  </h2>

                  <p><strong>Product Code:</strong> {viewProduct.productCode}</p>
                  <p><strong>Product Name:</strong> {viewProduct.productName}</p>
                  <p><strong>Product Line:</strong> {viewProduct.productLine}</p>
                  <p><strong>Scale:</strong> {viewProduct.productScale}</p>
                  <p><strong>Vendor:</strong> {viewProduct.productVendor}</p>
                  <p><strong>Quantity:</strong> {viewProduct.quantityInStock}</p>
                  <p><strong>Buy Price:</strong> ${viewProduct.buyPrice}</p>
                  <p><strong>MSRP:</strong> ${viewProduct.msrp}</p>

                  <div className="flex justify-end mt-6">
                      <Button onClick={() => setViewProduct(null)}>
                          Close
                      </Button>
                  </div>
              </div>
          )}
      </Modal>
    </div>
       
  )
}

export default Products;
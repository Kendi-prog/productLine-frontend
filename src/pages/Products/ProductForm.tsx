import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProduct, updateProduct } from "../../api/products_api";
import { Icons } from "../../components/Icons";
import Button from "../../components/Button";


type Product = {
  productCode: string;
  productName: string;
  productLine: string;
  productScale: string;
  productVendor: string;
  quantityInStock: number;
  buyPrice: number;
  msrp: number;
};

type ProductFormProps = {
    onClose : () => void;
    product?: Product;
}

export default function ProductForm ({ onClose, product }: ProductFormProps) {
   const [formData, setFormData] = useState(
    product ??{
        productCode: "",
        productName: "",
        productLine: "",
        productScale: "",
        productVendor: "",
        quantityInStock: 0,
        buyPrice: 0,
        msrp: 0,
    });

    const queryClient = useQueryClient();
    const saveMutation = useMutation({
        mutationFn: (data: Product) =>
            product ? updateProduct(data) : createProduct(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/products"] });
            toast.success(
            product ? "Product updated successfully!" : "Product added successfully!"
            );
            onClose();
        },

        onError: () => {
            toast.error("Operation failed.");
        },
    });

    const handleChange = (e: React.ChangeEvent <HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
    };

    return(
        <>
            {/* Header part */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-[#1A2F43] text-xl font-bold">
                    <Icons.products className="text-[#28B5FB]"/>
                    {product ? "Edit Product" : "Add New Product"}
                </div>
                <Button onClick={onClose} title="Close">
                    <Icons.close />
                </Button>
            </div>
            {/* Form part */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Product Code:</label>
                    <input 
                        type="text"
                        name="productCode"
                        value={formData.productCode}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Product Name:</label>
                    <input 
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Product Vendor:</label>
                    <input
                        type="text"
                        name="productVendor"
                        value={formData.productVendor}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Product Scale:</label>
                    <input 
                        type="text"
                        name="productScale"
                        value={formData.productScale}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div> 
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Product Line:</label>
                    <select 
                        name="productLine"
                        value={formData.productLine}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    >
                        <option value="">Select a product line</option>
                        <option value="Classic Cars">Classic Cars</option>
                        <option value="Motorcycles">Motorcycles</option>
                        <option value="Planes">Planes</option>
                        <option value="Ships">Ships</option>
                        <option value="Trains">Trains</option>
                        <option value="Trucks and Buses">Trucks and Buses</option>
                        <option value="Vintage Cars">Vintage Cars</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Quantity in Stock:</label>
                    <input 
                        type="number"
                        name="quantityInStock"
                        value={formData.quantityInStock}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">Buy Price:</label>
                    <input 
                        type="number"
                        name="buyPrice"
                        value={formData.buyPrice}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2F43] mb-1">MSRP:</label>
                    <input 
                        type="number"
                        name="msrp"
                        value={formData.msrp}
                        onChange={handleChange}
                        className="w-full border border-[#28B5FB] rounded px-3 py-2"
                        required
                    />
                </div>
                <Button type="submit">{product ? "Update Product" : "Add Product"}</Button>
            </form>
        </>
    )
}
import { useState } from "react";
import { Icons } from "../../components/Icons";
import Button from "../../components/Button";

type ProductFormProps = {
    onClose : () => void;
}

export default function ProductForm ({ onClose }: ProductFormProps) {
    const [formData, setFormData] = useState({
        name : "",
        vendor: "",
        scale: "",
        price: "",
        productLine: "",
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
        console.log("Product submitted:", formData);
        onClose();
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl border border-[#28B5FB] shadow-xl w-full max-w-xl p-6 relative">
                {/* Header part */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-[#1A2F43] text-xl font-bold">
                        <Icons.products className="text-[#28B5FB]"/>
                        Add New Product
                    </div>
                    <Button onClick={onClose} title="Close">
                        <Icons.close />
                    </Button>
                </div>
                {/* Form part */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#1A2F43] mb-1">Product Name:</label>
                        <input 
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-[#28B5FB] rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1A2F43] mb-1">Vendor:</label>
                        <input
                            type="text"
                            name="vendor"
                            value={formData.vendor}
                            onChange={handleChange}
                            className="w-full border border-[#28B5FB] rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1A2F43] mb-1">Scale</label>
                        <input 
                            type="text"
                            name="scale"
                            value={formData.scale}
                            onChange={handleChange}
                            className="w-full border border-[#28B5FB] rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1A2F43] mb-1">Price</label>
                        <input 
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border border-[#28B5FB] rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1A2F43] mb-1">Product Line</label>
                        <select 
                            name="productLine"
                            value={formData.productLine}
                            onChange={handleChange}
                            className="w-full border border-[#28B5FB] rounded px-3 py-2"
                            required
                        >
                            <option value="">Select a product line</option>
                            <option value="Classic Cars">Classic Cars</option>
                            <option value="Vehicles">Vehicles</option>
                            <option value="Planes">Planes</option>
                        </select>
                    </div>
                    <Button type="submit">Add Product</Button>
                </form>
            </div>
        </div>
    )
}
import BaseLayout from "../layouts/BaseLayout";
import Table from "../components/Table";

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
    return (
        <BaseLayout title="Products" subtitle="Manage your products">
            <Table columns={columns} data={data} />
        </BaseLayout>        
    )
}

export default Products;
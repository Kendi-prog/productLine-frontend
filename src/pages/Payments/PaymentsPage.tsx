import BaseLayout from "../../layouts/BaseLayout";
import Table from "../../components/Table";

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
    return (
        <BaseLayout title="Payments" subtitle="Manage your payments">
            <Table columns={columns} data={data} />
        </BaseLayout>        
    )
}

export default Payments;
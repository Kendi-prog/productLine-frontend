import SearchBar from "../components/SearchBar";
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
        <div className="p-4 text-lg font-semibold">
            <h1>Products Page</h1>
            <SearchBar placeholder="Search Products..."/>
            <Table columns={columns} data={data} />
        </div>
    )
}

export default Products;
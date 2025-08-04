import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BaseLayout from "../../layouts/BaseLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import OrderForm from "./OrdersForm";
import { fetchOrders } from "../../api/orders";

type Order = {
  orderNumber: number;
  orderDate: string;      
  requiredDate: string;
  shippedDate?: string;   
  status: string;
  comments?: string;
  customerNumber: number;
};

const columns: { label: string; accessor: keyof Order }[] = [
  { label: "Order Number", accessor: "orderNumber" },
  { label: "Order Date", accessor: "orderDate" },
  { label: "Required Date", accessor: "requiredDate" },
  { label: "Shipped Date", accessor: "shippedDate" },
  { label: "Status", accessor: "status" },
  { label: "Customer Number", accessor: "customerNumber" },
];


const Orders = () => {
  const[isModalOpen, setIsModalOpen] = useState(false);

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['/customers'],
    queryFn: fetchOrders
  });

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed Loading Customers!!</div>

  return (
    <div>
      <BaseLayout 
        title="Orders" 
        subtitle="Track orders with ease and never miss a delivery."
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
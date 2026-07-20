import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

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
  customer: {
    customerNumber: number;
  };
};

const columns: { label: string; accessor: string }[] = [
  { label: "Order Number", accessor: "orderNumber" },
  { label: "Order Date", accessor: "orderDate" },
  { label: "Required Date", accessor: "requiredDate" },
  { label: "Shipped Date", accessor: "shippedDate" },
  { label: "Status", accessor: "status" },
  { label: "Customer Number", accessor: "customer.customerNumber" },
];


const Orders = () => {
  const[isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q")?.toLowerCase() || "";

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['/orders'],
    queryFn: fetchOrders
  });

  const filteredOrders = data.filter((order: Order) =>
    order.orderNumber.toString().includes(search) ||
    order.status.toLowerCase().includes(search) ||
    order.customer.customerNumber.toString().includes(search)
  );

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed Loading Orders!!</div>


  return (
    <div>
      <BaseLayout 
        title="Orders" 
        subtitle="Track orders with ease and never miss a delivery."
        onAddClick={() => setIsModalOpen(true)}
      >
          <Table columns={columns} data={filteredOrders} />
      </BaseLayout> 
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <OrderForm onClose={() => setIsModalOpen(false)}/>
      </Modal>
    </div>
             
  )
}

export default Orders;
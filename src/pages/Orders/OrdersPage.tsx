import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import BaseLayout from "../../layouts/BaseLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import OrderForm from "./OrdersForm";
import { fetchOrders, deleteOrder } from "../../api/orders_api";
import Button from "../../components/Button";

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

const columns: { label: string; accessor: string; type?: "date" | "money"; }[] = [
  { label: "Order Number", accessor: "orderNumber" },
  { label: "Order Date", accessor: "orderDate", type: "date" },
  { label: "Required Date", accessor: "requiredDate", type: "date" },
  { label: "Shipped Date", accessor: "shippedDate", type: "date" },
  { label: "Status", accessor: "status" },
  { label: "Customer Number", accessor: "customer.customerNumber" },
];


const Orders = () => {
  const[isModalOpen, setIsModalOpen] = useState(false);
  const[selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const[viewOrder, setViewOrder] = useState<Order | null>(null);
  
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q")?.toLowerCase() || "";

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/orders'] });
      toast.success("Order deleted successfully!");
    },
   onError: (error: any) => {
      toast.error(
          error.response?.data?.message ??
          "Cannot delete order because it has related records."
      );
    }
  });

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

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  }
  
  const handleView = (order: Order) => {
    console.log(order);
    setViewOrder(order);
  }

  const handleDelete = (order: Order) => {
    if (
        window.confirm(
          `Delete order #${order.orderNumber}?
      `)
    ) {
        deleteMutation.mutate(order.orderNumber);
    }
  };

  return (
    <div>
      <BaseLayout 
        title="Orders" 
        subtitle="Track orders with ease and never miss a delivery."
        onAddClick={() => 
          {
            setSelectedOrder(null);
            setIsModalOpen(true)}
          }    
      >
          <Table 
            columns={columns} 
            data={filteredOrders}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete} 
          />
      </BaseLayout> 
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <OrderForm 
            order={selectedOrder ?? undefined as any}
            onClose={() => {
              setSelectedOrder(null);
              setIsModalOpen(false)}
            }       
        />
      </Modal>
      <Modal 
        isOpen={!!viewOrder} 
        onClose={() => setViewOrder(null)}
        >
          {viewOrder && (
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-[#1A2F43]">Order Details</h2>
              <p><strong>Order Number:</strong> {viewOrder.orderNumber}</p>
              <p><strong>Order Date:</strong> {viewOrder.orderDate}</p>
              <p><strong>Required Date:</strong> {viewOrder.requiredDate}</p>
              <p><strong>Shipped Date:</strong> {viewOrder.shippedDate || "N/A"}</p>
              <p><strong>Status:</strong> {viewOrder.status}</p>
              <p><strong>Customer Number:</strong> {viewOrder.customer.customerNumber}</p>
              <div className="flex justify-end mt-6">
                  <Button onClick={() => setViewOrder(null)}>
                      Close
                  </Button>
              </div>
            </div>
          )}
      </Modal>
    </div>
  );
}


export default Orders;
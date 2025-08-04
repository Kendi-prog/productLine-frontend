import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BaseLayout from "../../layouts/BaseLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import PaymentForm from "./PaymentForm";
import { fetchPayments } from "../../api/payments";

type Payments = {
  customerNumber: number;
  checkNumber: String;
  paymentDate: String;
  amount: number;
}

const columns: { label: string, accessor: keyof Payments} [] = [
  {label: "Customer No.", accessor: "customerNumber"},
  {label: "Check No.", accessor: "checkNumber"},
  {label: "Payment Date.", accessor: "paymentDate"},
  {label: "Amount", accessor: "amount"}
]


const Payments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data = [], isLoading, isError } = useQuery({
      queryKey: ['/customers'],
      queryFn: fetchPayments
    });
  
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed Loading Customers!!</div>

  return (
    <div>
       <BaseLayout 
        title="Payments" 
        subtitle="Stay on top of transactions — organized and secure."
        onAddClick={() => setIsModalOpen(true)}
      >
          <Table columns={columns} data={data} />
      </BaseLayout>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PaymentForm onClose={() => setIsModalOpen(false)}/>
      </Modal> 
    </div>
            
  )
}

export default Payments;
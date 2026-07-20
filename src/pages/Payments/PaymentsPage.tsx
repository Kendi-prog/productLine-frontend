import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import BaseLayout from "../../layouts/BaseLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import PaymentForm from "./PaymentForm";
import { fetchPayments } from "../../api/payments";

type Payments = {
  // customerNumber: number;
  // checkNumber: String;
  id: {
    customerNumber: number;
    checkNumber: string;
  }
  paymentDate: string;
  amount: number;
}

const columns: { label: string, accessor: string} [] = [
  {label: "Customer No.", accessor: "id.customerNumber"},
  {label: "Check No.", accessor: "id.checkNumber"},
  {label: "Payment Date.", accessor: "paymentDate"},
  {label: "Amount", accessor: "amount"}
]


const Payments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q")?.toLowerCase() || "";

  const { data = [], isLoading, isError } = useQuery({
      queryKey: ['/payments'],
      queryFn: fetchPayments
    });

  const filteredPayments = data.filter((payment: Payments) =>
    payment.id.customerNumber.toString().includes(search) ||
    payment.id.checkNumber?.toLowerCase().includes(search) ||
    String(payment.paymentDate).toLowerCase().includes(search)
  );

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed Loading Customers!!</div>

  return (
    <div>
       <BaseLayout 
        title="Payments" 
        subtitle="Stay on top of transactions — organized and secure."
        onAddClick={() => setIsModalOpen(true)}
      >
          <Table columns={columns} data={filteredPayments} />
      </BaseLayout>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PaymentForm onClose={() => setIsModalOpen(false)}/>
      </Modal> 
    </div>
            
  )
}

export default Payments;
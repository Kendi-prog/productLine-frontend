import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import BaseLayout from "../../layouts/BaseLayout";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import PaymentForm from "./PaymentForm";
import { fetchPayments, deletePayment } from "../../api/payments";
import Button from "../../components/Button";

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

type DeletePaymentData = {
    customerNumber: number;
    checkNumber: string;
};

const columns: { label: string, accessor: string} [] = [
  {label: "Customer No.", accessor: "id.customerNumber"},
  {label: "Check No.", accessor: "id.checkNumber"},
  {label: "Payment Date.", accessor: "paymentDate"},
  {label: "Amount", accessor: "amount"}
]


const Payments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payments | null>(null);
  const [viewPayment, setViewPayment] = useState<Payments | null>(null);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q")?.toLowerCase() || "";

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: ({ customerNumber, checkNumber }: DeletePaymentData) =>
        deletePayment(customerNumber, checkNumber),

    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/payments"] });
        toast.success("Payment deleted successfully!");
    },

    onError: (error: any) => {
        toast.error(
            error.response?.data ??
            "Cannot delete payment because it has related records."
        );
    },
  });

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

  const handleEdit = (payment: Payments) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  }

  const handleView = (payment: Payments) => {
    setViewPayment(payment);
  }

  const handleDelete = (payment: Payments) => {
    if (
      window.confirm(
        "Are you sure you want to delete this payment?"
      )
    ) {
         deleteMutation.mutate({
            customerNumber: payment.id.customerNumber,
            checkNumber: payment.id.checkNumber,
        });
    }
  }

  return (
    <div>
       <BaseLayout 
        title="Payments" 
        subtitle="Stay on top of transactions — organized and secure."
        onAddClick={() => {
          setSelectedPayment(null);
          setIsModalOpen(true)}}
      >
          <Table 
            columns={columns} 
            data={filteredPayments}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete} />
      </BaseLayout>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PaymentForm 
            payment={selectedPayment ?? undefined as any} 
            onClose={() => setIsModalOpen(false)}/>
      </Modal> 
      <Modal 
        isOpen={!!viewPayment} 
        onClose={() => setViewPayment(null)   
        }>
          {viewPayment && (
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-[#1A2F43]">Payment Details</h2>
              <p><strong>Customer Number:</strong> {viewPayment.id.customerNumber}</p>
              <p><strong>Check Number:</strong> {viewPayment.id.checkNumber}</p>
              <p><strong>Payment Date:</strong> {viewPayment.paymentDate}</p>
              <p><strong>Amount:</strong> {viewPayment.amount}</p>  
              <div className="flex justify-end mt-6">
                  <Button onClick={() => setViewPayment(null)}>
                      Close
                  </Button>
              </div>
            </div>  
          )}
      </Modal>
    </div>
  );
}


export default Payments;
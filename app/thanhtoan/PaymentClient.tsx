'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import { SDonThue, SUsers } from "../types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import { useCallback, useState } from "react";
import CarPayment from "../components/cars/CarPayment";

interface PaymentClientProps {
    donThues: SDonThue[];
    currentUser?: SUsers | null;
}
const PaymentClient: React.FC<PaymentClientProps>= ({
    donThues,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.post(`/api/payments/${id}`, {
            paymentId: donThues.find(donThue => donThue.id)?.id,
            tongTien: donThues.find(donThue => donThue.id)?.tongTien
        })
        axios.delete(`/api/payments/${id}`)
        .then(() =>{
            toast.success("Thanh toán thành công");
            router.refresh();
        })
        .catch(() => {
            toast.error('Hỏng');
        })
        .finally(()=>{
            setDeletingId('');
        })
        
    },[router]);
    return (
     <Container>
        <Heading 
            title="Các xe giao"
            subtitle="Hãy giao xe đến khách hàng!!!"
        />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {donThues.map((donThue) => (
                <CarPayment
                key={donThue.id}
                data={donThue.xe}
                donThue={donThue}
                users={donThue.users}
                actionId={donThue.id}
                onAction={onCancel}
                disabled={deletingId === donThue.id}
                actionLabel="Xác nhận thanh toán"
                currentUser={currentUser}
                />
            ))}

        </div>
     </Container>
    )
}
export default PaymentClient;
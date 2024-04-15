import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getAllReserve from "../actions/getAllReserve";
import PaymentClient from "./PaymentClient";
const PaymentPage = async() =>{
    const currentUser= await getCurrentUser();

    if(!currentUser) {
        return(
            <ClientOnly>
                <EmptyState
                    title="Chưa đăng nhập"
                    subtitle="Đăng nhập ngay"
                />
            </ClientOnly>
        );
    }

    const donThues = await getAllReserve();

    if(donThues.length === 0){
        return(
            <ClientOnly>
                <EmptyState 
                    title="Không tìm thấy xe đặt"
                    subtitle="Chưa có khách đặt rồi!!!"
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <PaymentClient
                donThues={donThues}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
};
export default PaymentPage;
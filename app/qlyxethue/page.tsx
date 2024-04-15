import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationClient";
const ReservationPage = async() =>{
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

    const donThues = await getReservations({
        authorId: currentUser.id
    });

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
            <ReservationsClient
                donThues={donThues}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
};
export default ReservationPage;
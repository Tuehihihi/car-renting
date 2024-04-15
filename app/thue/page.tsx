import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import RentClient from "./RentClient";
const RentsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Chưa đăng nhập"
                    subtitle="Đăng nhập ngay"
                />
            </ClientOnly>
        )
    }
    const donThues = await getReservations({
        userId: currentUser.id
    });
    if(donThues.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Không có danh sách thuê"
                    subtitle="Có vẻ bạn chưa thuê xe nào nhỉ!!!"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <RentClient 
                donThues = {donThues}
                currentUser = {currentUser}
            />
        </ClientOnly>
    )
}

export default RentsPage;
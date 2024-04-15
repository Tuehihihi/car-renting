
import getCarById from "@/app/actions/getCarById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import CarClient from "./CarClient";
import getReservations from "@/app/actions/getReservations";
interface IParams {
    xeId?:string;
}

const CarPage = async({params}: {params: IParams}) => {
    const xe = await getCarById(params);
   const donThues = await getReservations(params)
    const currentUser = await getCurrentUser();

    if(!xe) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <CarClient 
                xe = {xe}
                donThues={donThues}
                currentUser = {currentUser}
            />
        </ClientOnly>
    );
}
export default CarPage
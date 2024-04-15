import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import FavoritesClient from "./FavoriteClient";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteCars from "../actions/getFavoriteCars";

const CarPage = async () => {

    const xes = await getFavoriteCars();
    const currentUser = await getCurrentUser();
    if(xes.length === 0){
    return(
        <ClientOnly>
            <EmptyState
                title="Không tìm thấy mục yêu thích"
                subtitle="Có vẻ không có xe nào mà bạn thích rồi :("
            />
        </ClientOnly>
    )
    }
    return(
        <ClientOnly>
            <FavoritesClient 
                xes = {xes}
                currentUser = {currentUser}
            />
        </ClientOnly>
    )
}

export default CarPage;
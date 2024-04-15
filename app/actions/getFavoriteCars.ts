import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteCars() {
    try{
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return [];
        }
        const yeuthichs = await prisma.xe.findMany({
            where: {
                id: {
                    in: [ ... (currentUser.ids_YeuThich || [])]
                }
            }
        });

        const safeFavorites = yeuthichs.map((yeuthich) => ({
            ... yeuthich,
            ngayTao: yeuthich.ngayTao.toISOString()
        }));

        return safeFavorites;
    } catch(error: any) {
        throw new Error(error);
    }
}
import prisma from "@/app/libs/prismadb"

interface IParams {
    xeId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(
    params: IParams
) {
    try{
    const { xeId,  userId, authorId} = params;

    const query: any = {};

    if(xeId) {
        query.xeId = xeId; 
    }

    if(userId){
        query.userId =userId
    }

    if(authorId) {
        query.xe = {userId: authorId}
    }

    const donThues = await prisma.donThue.findMany({
        where: query,
        include: {
            xe: true,
            users: true,
        },
        orderBy: {
            ngayTao: 'desc'
        }
    });

    const safeReservation = donThues.map(
        (donThue) => ({
            ...donThue,
            ngayTao: donThue.ngayTao.toISOString(),
            ngayBatDau: donThue.ngayBatDau.toISOString(),
            ngayKetThuc: donThue.ngayKetThuc.toISOString(),
            xe: {
                ...donThue.xe,
                ngayTao: donThue.xe.ngayTao.toISOString()
            },
            users: {
                ...donThue.users,
                ngayTao: donThue.users.ngayTao.toISOString(),
            }
            
        })
    );

    return safeReservation;
    } catch(error: any) {
        throw new Error(error);
    }
}
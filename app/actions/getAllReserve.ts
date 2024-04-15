import prisma from "@/app/libs/prismadb"


export default async function getAllReserve() {
    try{
   

    const donThues = await prisma.donThue.findMany({
        orderBy: {
            ngayBatDau: 'asc'
        },
        include: {
            xe: true,
            users: true,
        }
    });

    const sThue = donThues.map(
        (donThue) => ({
            ...donThue,
            ngayBatDau: donThue.ngayBatDau.toISOString(),
            ngayKetThuc: donThue.ngayKetThuc.toISOString(),
            ngayTao: donThue.ngayTao.toISOString(),
            xe: {
                ...donThue.xe,
                ngayTao: donThue.xe.ngayTao.toISOString(),
            },
            users: {
                ...donThue.users,
                ngayTao: donThue.users.ngayTao.toISOString(),
            }
        })
    );

    return sThue;
    } catch(error: any) {
        throw new Error(error);
    }
}
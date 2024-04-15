import prisma from "@/app/libs/prismadb"

export default async function getComments() {
    try{
    
    const danhGias = await prisma.danhGia.findMany({
        include: {
            users: true,
        },
        orderBy: {
            ngayTao: 'desc'
        } 
    });
 
    const sDanhGia = danhGias.map(
        (danhGia) => ({
            ...danhGia,
            ngayTao: danhGia.ngayTao.toISOString(),
            users : {
                ...danhGia.users,
                createdAt: danhGia.users.ngayTao.toISOString(),
            }
        })
    );

    return sDanhGia;
    } catch(error: any) {
        throw new Error(error);
    }
}
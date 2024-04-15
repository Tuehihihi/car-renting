import prisma from "@/app/libs/prismadb"


export default async function getUsers() {
    try{
   

    const users = await prisma.users.findMany({
        orderBy: {
            ngayTao: 'desc'
        }
    });

    const safeUser = users.map(
        (user) => ({
            ...user,
            ngayTao: user.ngayTao.toISOString(),
        })
    );

    return safeUser;
    } catch(error: any) {
        throw new Error(error);
    }
}
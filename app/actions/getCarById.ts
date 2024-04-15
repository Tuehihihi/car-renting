import prisma from "@/app/libs/prismadb";

interface IParams {
    xeId?: string;
}

export default async function getCarById(
    params: IParams
) {
    try{
        const {xeId} = params;

        const xe = await prisma.xe.findUnique({
            where: {
                id: xeId
            },
            include: {
                users: true
            }
        });
        if(!xe){
            return null;
        }

        return {
            ... xe,
            ngayTao: xe.ngayTao.toISOString(),
            users: {
                ...xe.users,
                ngayTao: xe.users.ngayTao.toISOString(),
            }
        };
    } catch(error: any){
        throw new Error(error);
    }
}
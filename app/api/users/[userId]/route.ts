
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    userId?: string;
};

export async function DELETE (
    request: Request,
    {params} : {params: IParams}
){
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const {userId} = params;
    if(!userId || typeof userId !== 'string'){
        throw new Error('Id không tồn tại');
    }

    const user = await prisma.users.deleteMany({
        where: {
            id: userId,
        }
        
    });
    return NextResponse.json(user);
}

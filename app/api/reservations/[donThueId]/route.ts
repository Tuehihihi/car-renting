import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    donThueId?: string;
};

export async function DELETE (
    request: Request,
    {params} : {params: IParams}
){
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const {donThueId} = params;
    if(!donThueId || typeof donThueId !== 'string'){
        throw new Error('Id không tồn tại');
    }

    const donThue = await prisma.donThue.deleteMany({
        where: {
            id: donThueId,
            OR: [
                {userId:currentUser.id},
                {xe: {userId: currentUser.id}}
            ]
        }
        
    });
    return NextResponse.json(donThue);
}


import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { IoDocumentAttachOutline } from "react-icons/io5";

interface IParams {
    paymentId?: string; 
};

export async function DELETE (
    request: Request,
    {params} : {params: IParams}
){
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const {paymentId} = params;
    if(!paymentId || typeof paymentId !== 'string'){
        throw new Error('Id không tồn tại');
    }

    const donThue = await prisma.donThue.deleteMany({
        where: {
            id: paymentId,
        }
        
    });
    return NextResponse.json(donThue);
}

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        paymentId,
        tongTien
    } = body;

    const donThue = await prisma.donThue.update({
        where:{
            id: paymentId
        },
        data: {
            hoadon: {
                create: { 
                    userId: currentUser.id,
                    tongTien
                }
            }
        }
    });

    return NextResponse.json(donThue);
}
import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    xeId?: string,
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error()
    }

    const { xeId } = params;

    if(!xeId || typeof xeId !== 'string'){
        throw new Error('Id không tồn tại');

    }
    const xe = await prisma.xe.deleteMany({
        where: {
            id: xeId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(xe);
}
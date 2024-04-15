import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    xeId?: string;
}

export async function POST (
    request: Request,
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }
    const {xeId} = params;
    if(!xeId || typeof xeId !==  'string'){
        throw new Error('Id không tồn tại')
    }

    let ids_YeuThich = [ ...(currentUser.ids_YeuThich || [])];

    ids_YeuThich.push(xeId);
    const user = await prisma.users.update({
        where: {
            id: currentUser.id
        },
        data: {
            ids_YeuThich
        }
    });

    return NextResponse.json(user);
}

export async function DELETE (
    request: Request,
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const { xeId } = params;
    if(!xeId ||typeof xeId !== 'string') {
        throw new Error('Id không tồn tại');
    }

    let ids_YeuThich = [ ...(currentUser.ids_YeuThich || [])];

    ids_YeuThich = ids_YeuThich.filter((id) => id !== xeId);

    const user = await prisma.users.update({
        where: {
            id: currentUser.id
        },
        data: {
            ids_YeuThich
        }
    });

    return NextResponse.json(user);
}
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error()
    }

    const body = await request.json();

    const{
        binhLuan
    } = body;

    if(!binhLuan){
        return NextResponse.error();
    }

    const messageSubmit = await prisma.danhGia.create({
        data: {
            binhLuan,
            userId: currentUser.id,
        }
    }) ;

    return NextResponse.json(messageSubmit)
}
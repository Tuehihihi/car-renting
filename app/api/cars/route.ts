import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request:Request
){
    const currentUser = await getCurrentUser();
    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        maXe,
        mieuTa ,
        anh ,
        phanLoai,
        soKhach,
        soChoNgoi,
        viTri,
        gia 
    } = body;

    const xe = await prisma.xe.create({
        data: {
            maXe,
            mieuTa,
            anh,
            phanLoai,
            soChoNgoi,
            soKhach,
            viTri: viTri.value,
            gia: parseInt(gia, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(xe);
}




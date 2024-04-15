import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        xeId,
        ngayBatDau,
        ngayKetThuc,
        diemDon,
        tongTien
    } = body;

    if(!xeId || !ngayBatDau || !ngayKetThuc || !diemDon || !tongTien) {
        return NextResponse.error();
    }

    const carAndReservation = await prisma.xe.update({
        where:{
            id: xeId
        },
        data: {
            donThues: {
                create: {
                    userId: currentUser.id,
                    ngayBatDau,
                    ngayKetThuc,
                    diemDon,
                    tongTien
                }
            }
        }
    });

    return NextResponse.json(carAndReservation);
}
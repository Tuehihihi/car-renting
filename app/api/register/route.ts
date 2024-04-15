import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";
export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        email,
        ten,
        soDienThoai,
        password,
    } = body;
    const matKhau = await bcrypt.hash(password, 12);

    const users = await prisma.users.create({
        data: {
            email,
            ten,
            soDienThoai,
            matKhau
        }
    });

    return NextResponse.json(users);
}

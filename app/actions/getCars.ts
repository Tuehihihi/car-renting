import prisma from "@/app/libs/prismadb";

export interface ICarsParams {
    userId?: string;
    soKhach?: number;
    soChoNgoi?: number;
    ngayBatDau?: string;
    ngayKetThuc?: string;
    viTri?: string;
    phanLoai?: string;
}

export default async function getCars(
    params: ICarsParams
) {
    const {
        userId,
        soChoNgoi,
        soKhach,
        ngayBatDau,
        ngayKetThuc,
        viTri,
        phanLoai
    } = params
    try{
        const { userId} = params;
        let query: any = {};

        if(userId) {
            query.userId = userId;
        }

        if(phanLoai) {
            query.phanLoai = phanLoai;
        }

        if(soKhach) {
            query.soKhach = {
                gte: +soKhach
            }
        }
        if(soChoNgoi) {
            query.soChoNgoi = {
                gte: +soChoNgoi
            }
        }

        if(viTri) {
            query.viTri = viTri;
        }

        if( ngayBatDau && ngayKetThuc) {
            query.NOT ={
                donThues: {
                    some: {
                        OR: [
                            {
                                ngayKetThuc: {gte: ngayBatDau},
                                ngayBatDau: {lte: ngayKetThuc},
                            },
                            {
                                ngayBatDau: {lte: ngayKetThuc},
                                ngayKetThuc: {gte: ngayBatDau},
                            }
                        ]
                    }
                }
            }
        }
        const xes = await prisma?.xe.findMany({
           where: query,
            orderBy: {
                ngayTao: 'desc'
            }
        });
        const sXes = xes?.map((xe) => ({
            ...xe,
            ngayTao: xe.ngayTao.toISOString(),
        }));
        return sXes;
    }catch(error: any){
        throw new Error(error);
    }

}
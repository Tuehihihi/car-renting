'use client';

import { SUsers } from "@/app/types";
import { IconType } from "react-icons";

import Avatar from "../Avatar";
import CarCategory from "./CarCategory";

interface CarInfoProps {
    users: SUsers;
    mieuTa: string;
    soKhach: number;
    soChoNgoi: number;
    phanLoai: {
        icon: IconType;
        label: string;
        description: string
    } | undefined
    viTri: string;
}

const CarInfo: React.FC<CarInfoProps> = ({
    users,
    mieuTa,
    soKhach,
    soChoNgoi,
    phanLoai,
    viTri
}) => {
    
    return (
     <div className="col-span-4 flex flex-col gap-5">
        <div className="flex flex-col gap-5">
            <div className="text-xl font-semibold flex flex-row items-center gap-2">
                <div>Chủ sở hữu {users?.ten}</div>
                <Avatar src={users?.anh} />
                
            </div>
            <div className="flex flex-row items-center gap-2 font-light text-neutral-500">
                <div>{soChoNgoi} Chỗ</div>
                <div>{soKhach} Khách</div>
            </div>
        </div>
        {phanLoai && (
            <CarCategory 
                icon ={phanLoai.icon}
                label = {phanLoai.label}
                description = {phanLoai.description}
            />
        )}
        <hr />
        <div className="text=lg font-light text-neutral-500">
            {mieuTa}            
        </div>
        <hr />
        
     </div>
    )
}
export default CarInfo;
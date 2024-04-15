'use client';

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { SDonThue, SUsers, SXe } from "../../types";
interface CarCardProps {
    data: SXe;
    donThue?: SDonThue;
    onAction?: (id:string) => void;
   users: SUsers
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
   
    currentUser?: SUsers | null;
}

const CarCard: React.FC<CarCardProps>= ({
    data,
    donThue,
    onAction,
    disabled,
    users,
    actionLabel,
    
    actionId = "",
   
    currentUser
}) => {

    const router = useRouter();
    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) =>{
            e.stopPropagation();

            if(disabled) {
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled]
    )
    const check = currentUser && (currentUser.email === 'manager@gmail.com' || currentUser.email?.includes('employee'));
    
    const gia = useMemo(() => {
        if(donThue) {
            return donThue.tongTien;
        }

        return data.gia;
    }, [donThue, data.gia]);

    const reservationDate = useMemo(() => {
        if(!donThue) {
            return null;
        }

        const start = new Date(donThue.ngayBatDau);
        const end = new Date(donThue.ngayKetThuc);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    },[donThue]);
    return(
     
        <div onClick={() => router.push(`/cars/${data.id}`)}
         className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-1 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image 
                    fill
                    alt = "Xe"
                    src={data.anh}
                    className="object-cover h-full w-full group-hover:scale-110 transition"
                    />
                    
                    <div className="absolute top-3 right-3">
                        <HeartButton 
                            xeId = {data.id}
                            currentUser = {currentUser}
                        />

                    </div>
                </div>
                <div className="font-semibold text-[15px]">
                    {!donThue && (
                        <div>{data.viTri}</div>
                     )}
                    {donThue && (
                    <div className="flex flex-col">
                        <div>{users.soDienThoai}</div>
                        <div>{donThue.diemDon}</div>
                    </div>
                        
                    )}
                    </div>

                <div className="font-light text-neutral-500 text-[12px]">
                    {/* cais nayf laf show reservationDate hoac category nhung o day reservationDate ko co nen ko hien */}
                    {reservationDate || data.phanLoai}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        đ {gia}
                    </div>
                    <div >
                        {!donThue && (
                            <div className="font-light">/ ngay</div>
                        )}
                    </div>
                </div> 
                <div className="flex flex-row gap-3">
                {onAction && actionLabel && (
                        <Button
                        disable = {disabled}
                        small
                        outline
                        label={actionLabel}
                        onClick={handleCancel}
                        />
                        
                    )}
                
                </div>
            </div>
         </div>
    )
}
export default CarCard;
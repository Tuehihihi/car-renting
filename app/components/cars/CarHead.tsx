'use client';

import { SUsers } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface CarHeadProps {
    maXe: string;
    viTri: string;
    anh: string;
    id: string;
    currentUser?: SUsers | null
}

const CarHead: React.FC<CarHeadProps> = ({
    maXe,
    viTri,
    anh,
    id,
    currentUser,
}) => {
    
    return (
        <>
        <Heading 
            title={maXe}
            subtitle={viTri}
        />
        <div className="w-full h-[85vh] overflow-hidden rounded-xl relative">
            <Image 
            alt="image"
            src={anh}
            fill
            className="object-cover w-full"
            />
            <div className="absolute top-5 right-5">
                <HeartButton 
                    xeId={id}
                    currentUser={currentUser}
                />
            </div>
        </div>
        </>
    );
}
export default CarHead;
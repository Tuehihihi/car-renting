'use client';

import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
const Search = () => {
    const searchModal = useSearchModal();
    const params = useSearchParams();

    const viTri = params?.get('viTri');
    const ngayBatDau = params?.get('ngayBatDau');
    const ngayKetThuc = params?.get('ngayKetThuc');
    const soKhach = params?.get('soKhach');

    const locationLabel = useMemo(() =>{
        if(viTri) {
            return viTri as string
        }

        return 'Cơ sở';
    },[viTri])

    const durationLabel = useMemo(() => {
        if(ngayBatDau && ngayKetThuc){
            const start =  new Date(ngayBatDau as string);
            const end = new Date(ngayKetThuc as string);
            let diff = differenceInDays(end, start);

            if(diff === 1){
                diff =1
            }

            return `${(diff+1)} Ngày`;
        }

        return 'Thời gian'
    },[ngayBatDau, ngayKetThuc])
    

    const guestLabel = useMemo(() =>{
        if(soKhach) {
            return `${soKhach} Khách`;
        }

        return 'Khách'
    }, [soKhach]);
    return(
        <div onClick={searchModal.onOpen} className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    {locationLabel}
                </div>
                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                    {durationLabel}
                </div>
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block">{guestLabel}</div>
                    <div className="p-2 bg-green-500 rounded-full text-white">
                    <BiSearch size ={18} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Search;

'use client'

import { categories } from "@/app/components/navbar/Categories";
import { SDonThue, SUsers, SXe } from "@/app/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import CarHead from "@/app/components/cars/CarHead";
import Container from "@/app/components/Container";
import CarInfo from "@/app/components/cars/CarInfo";
import CarReservation from "@/app/components/cars/CarReservation";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Range } from "react-date-range";
import axios from "axios";
import toast from "react-hot-toast";
const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};
interface CarClientProps{
    donThues?: SDonThue[];
    xe: SXe & {
        users: SUsers
    };
    currentUser?: SUsers | null
}
const CarClient: React.FC<CarClientProps> =({
    xe,
    donThues = [],
    currentUser
}) => {
    const category = useMemo(() => {
        return categories.find((item) => 
        item.label ===xe.phanLoai);
    },[xe.phanLoai])
    const loginModal = useLoginModal();
    const router = useRouter();
    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        donThues.forEach((donThues) => {
            const range = eachDayOfInterval({
                start: new Date(donThues.ngayBatDau),
                end: new Date(donThues.ngayKetThuc)
            })
            dates = [ ...dates, ...range];
        });
        return dates
    },[donThues]);

    const [isLoading,setIsLoading] = useState(false);
    const [tongTien, setTongTien] = useState(xe.gia);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [diemDon, setDiemDon] = useState('');

    const onCreateReservation = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);
        axios.post('/api/reservations',{
            tongTien,
            ngayBatDau: dateRange.startDate,
            ngayKetThuc: dateRange.endDate,
            diemDon,
            xeId: xe?.id
        })
        .then(() => {
            toast.success('Thuê thành công')
            setDateRange(initialDateRange);
            
            router.push('/thue');
        })
        .catch(() => {
            toast.error('Hỏng');
        })
        .finally(() => {
            setIsLoading(false);
        })
    },[tongTien,dateRange,xe?.id, router,currentUser,loginModal,diemDon])

    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate,
            );
            
            if(dayCount && xe.gia) {
                setTongTien((dayCount + 1) * xe.gia);
            }else{
                setTongTien(xe.gia);
            }
        }
    },[dateRange, xe.gia])
    return(
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-5">
                    <CarHead
                        maXe = {xe.maXe}
                        anh = {xe.anh}
                        viTri = {xe.viTri}
                        id = {xe.id}
                        currentUser= {currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 mt-5">
                        <div className="flex flex-col md:w-full">
                        <CarInfo 
                        users= {xe.users}
                        phanLoai = {category}
                        mieuTa = {xe.mieuTa}
                        soKhach = {xe.soKhach}
                        soChoNgoi = {xe.soChoNgoi}
                        viTri = {xe.viTri}
                        />  
                        <hr />
                        <input id="diemDon" placeholder="Điểm đón" 
                        className="peer w-full p-1 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed" 
                        onChange={(event) => setDiemDon(event.target.value)}
                        />    
                        </div>
                        <div className="order-first mb-9 md:order-last md:col-span-1">
                        <CarReservation 
                            gia= {xe.gia}
                            tongTien = {tongTien}
                            onChangeDate = {(value) => setDateRange(value)}
                            dateRange = {dateRange}
                            onSubmit = {onCreateReservation}
                            disabled = {isLoading}
                            disabledDates = {disabledDates}
                        />
                    </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default CarClient;
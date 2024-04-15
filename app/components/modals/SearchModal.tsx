'use client';
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useCallback, useMemo, useState } from "react";
import { DateRange, Range } from "react-date-range";

import ProvinceSelect, {ProvinceSelectValue} from "./ProvinceSelect";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
    VITRI = 0,
    NGAY = 1,
    THONGTIN = 2,
}
const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const [viTri, setViTri] = useState<ProvinceSelectValue>()

    const [step, setStep] = useState(STEPS.VITRI);
    const [soKhach, setSoKhach] = useState(1);
    const [soChoNgoi, setSoChoNgoi] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key : 'selection'
    });

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() =>{
        setStep((value) => value + 1)
    }, []);

    const onSubmit = useCallback(async () => {
        if(step !==STEPS.THONGTIN){
            return onNext();
        }

        let currentQuery = {};

        if(params) {
            currentQuery =qs.parse(params.toString())
        }

        const updateQuery: any = {
            ... currentQuery,
            viTri: viTri?.value,
            soKhach,
            soChoNgoi,
        };

        if(dateRange.startDate) {
            updateQuery.ngayBatDau = formatISO(dateRange.startDate);
        }

        if(dateRange.endDate) {
            updateQuery.ngayKetThuc = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updateQuery
        }, {skipNull: true});

        setStep(STEPS.VITRI);
        searchModal.onClose();

        router.push(url);
    },[ step,searchModal,viTri,router,soKhach,soChoNgoi,dateRange,onNext,params]);

    const actionLabel = useMemo(() => {
        if(step === STEPS.THONGTIN) {
            return 'Tìm kiếm';
        }

        return 'Tiếp';
    },[step]);
    
    const secondaryActionLabel = useMemo(() => {
        if(step ===STEPS.VITRI){
            return undefined;
        }

        return 'Trở lại'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-6" >
            <Heading 
                title="Chỗ bạn ở gần đâu"
                subtitle="Hãy để chúng tôi biết và chọn cơ sở gần bạn"
            />
            <ProvinceSelect 
                value={viTri}
                onChange={(value)=>
                setViTri(value as ProvinceSelectValue) 
                }
            />
        </div>
    )

    if(step === STEPS.NGAY){
        bodyContent = (
         <div className="flex flex-col gap-6">
            <Heading 
                title="Khi nào bạn sẽ dùng"
                subtitle="Chúng tôi sẽ tìm xe trống cho bạn!"
            />
            <Calendar 
                value={dateRange}
                onChange={(value) => setDateRange(value.selection)}
            />
         </div>
        )
    }

    if(step === STEPS.THONGTIN) {
        bodyContent = (
            <div className="flex flex-col gap-6">
                <Heading 
                    title="Thêm thông tin"
                    subtitle="Chúng tôi sẽ tìm xe phù hợp cho bạn"
                />
                <Counter 
                title="Guests"
                subtitle="Có bao nhiêu người"
                value={soKhach}
                onChange={(value) => setSoKhach(value)}
                />
                 <Counter 
                title="Seats"
                subtitle="Có bao nhiêu chỗ"
                value={soChoNgoi}
                onChange={(value) => setSoChoNgoi(value)}
                />
                
            </div>
        )
    }
    return(
        <Modal 
            isOpen = {searchModal.isOpen}
            onClose= {searchModal.onClose}
            onSubmit={onSubmit}
            title="Tìm kiếm"
            actionLable={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.VITRI ? undefined: onBack}
            body={bodyContent}
        />
    );
}



export default SearchModal
'use client';
import React from 'react';
import { Range } from 'react-date-range';
import Calendar from '../inputs/Calendar';
import Button from '../Button';
interface CarReservationProps {
    gia: number;
    dateRange: Range;
    tongTien: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[]
}
const CarReservation: React.FC<CarReservationProps> = ({
    gia,
    dateRange,
    tongTien,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates
}) => {
    return(
        <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
            <div className='flex flex-row items-center gap-1 p-4'>
                <div className='text-2xl font-semibold'>
                    {gia} đ
                </div>
                <div className='font-light text-neutral-500'>/ ngày</div>

            </div>
            <hr />
            <Calendar 
                value = {dateRange}
                disabledDates = {disabledDates}
                onChange = {(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className='p-4'>
            <Button 
                    disable = {disabled}
                    label='Thuê'
                    onClick={onSubmit}
                />
            </div>
            <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
                <div>Tổng</div>
                <div>đ {tongTien}</div>
            </div>

        </div>
    )
}
export default CarReservation;
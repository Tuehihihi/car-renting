'use client'
import useRentModal from "@/app/hooks/useRentModal"
import Heading from "../Heading";
import Modal from "./Modal"
import CategoryInput from "../inputs/CategoryInput";
import ProvinceSelect from "./ProvinceSelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { categories } from "../navbar/Categories";
import axios from "axios";
import toast from "react-hot-toast";

enum STEPS {
    PHANLOAI = 0,
    VITRI = 1,
    THONGTIN = 2,
    ANH =3,
    MIEUTA = 4,
    GIA = 5,
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.PHANLOAI);
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    }=useForm<FieldValues>({
        defaultValues: {
            phanLoai : '',
            viTri: null,
            soKhach: 1,
            soChoNgoi: 1,
            
            anh: '',
            gia: 1,
            maXe: '',
            mieuTa: ''
        }
    });
    const phanLoai = watch('phanLoai');
    const viTri = watch('viTri');
    const soChoNgoi = watch('soChoNgoi');
    const soKhach = watch('soKhach');
    const anh = watch('anh')
    const setCustomValue = (id: string, value: any) =>{
        setValue(id,value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
         
        })
    }
    const onBack = () => {
        setStep((value) => value - 1);
    };
    const onNext = () =>{
        setStep((value) => value + 1);
    };
    const actionLable = useMemo(() =>{
        if(step === STEPS.GIA){
            return 'Tạo'
        }
        return 'Tiếp'
    },[step])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(step !== STEPS.GIA){
            return onNext();
        }

        setIsLoading(true);
        axios.post ('/api/cars', data)
        .then(() => {
            toast.success('Thêm thành công');
            router.refresh();
            reset();
            setStep(STEPS.PHANLOAI);
            rentModal.onClose()
        })
        .catch(() =>{
            toast.error('Hỏng!');
        }).finally(() =>{
            setIsLoading(false);
        })
    }
    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.PHANLOAI){
            return undefined
        }
        return 'Trở lại'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-6">
            <Heading 
                title = "Xe bạn phù hợp với loại hình nào???"
                subtitle = "Chọn một phân loại!"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                        onClick={(category) => setCustomValue('phanLoai', category) }
                        selected = {phanLoai ===item.label}
                        label = {item.label}
                        icon = {item.icon}
                        />
                    </div>

                ))}
            </div>
        </div>
    )
    if(step ===STEPS.VITRI){
        bodyContent = (
            <div className="flex flex-col gap-6">
            <Heading 
                title="Cơ sở của bạn ở đâu?"
                subtitle="Điều này sẽ giúp khách hàng dễ dàng thuê xe"
            />
            <ProvinceSelect value={viTri}
            onChange={(value) => setCustomValue('viTri', value)} />
            </div>
        )
    }
    if(step === STEPS.THONGTIN){
        bodyContent = (
            <div className=" flex flex-col gap-7">
                <Heading
                    title="Hãy chia sẻ một chút về xe"
                    subtitle="Xe có những gì"
                />
                <Counter
                 title="Seats"
                 subtitle="Có bao nhiêu ghế?"
                 value={soChoNgoi}
                 onChange={(value) => setCustomValue('soChoNgoi', value)}
                />
                <Counter
                 title="Guests"
                 subtitle="Bao nhiêu khách có thể ngồi vừa?"
                 value={soKhach}
                 onChange={(value) => setCustomValue('soKhach', value)}
                />
             </div>
         )
     }
     if(step === STEPS.ANH){
        bodyContent = (
         <div className="flex flex-col gap-7">
            <Heading 
                title="Thêm ảnh xe nào!!!"
                subtitle="Thêm ảnh"
            />
            <ImageUpload 
                value={anh}
                onChange={(value) => setCustomValue('anh', value)}
            />
         </div>
        )
    }
    if(step === STEPS.MIEUTA){
        bodyContent = (
            <div className=" flex flex-col gap-7">
                <Heading 
                    title="Miêu tả xe của bạn "
                    subtitle="Càng ngắn càng tốt"
                />
                <Input
                    id= "maXe"
                    label="Mã"
                    disabled= {isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id= "mieuTa"
                    label="Miêu tả"
                    disabled= {isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }
    if(step === STEPS.GIA){
        bodyContent = (
            <div className="flex flex-col gap-7">
                <Heading 
                    title="Định giá xe"
                    subtitle="Bạn muốn định giá bao nhiêu một ngày"
                />
                <Input 
                id="gia"
                label="Giá"
                formatPrice 
                type="number"
                disabled= {isLoading}
                register={register}
                errors={errors}
                required
                />
            </div>
        )
    }
    return(
        <Modal 
        isOpen= {rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLable={actionLable}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.PHANLOAI ? undefined : onBack}
        title="Gocar 4everywhere"
        body={bodyContent}
        />
    )
}
export default RentModal;
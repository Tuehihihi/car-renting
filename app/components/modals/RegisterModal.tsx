'use client';

import { useCallback, useState } from "react";
import axios from "axios";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
const  registerModal = useRegisterModal();
const loginModal = useLoginModal()
  const [ isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
        errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
        ten: '',
        email: '',
        password: '',
        soDienThoai: '',
    }
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
    .then(() =>{
        toast.success("Đăng kí thành công")
        registerModal.onClose();
        loginModal.onOpen();
    })
    .catch((error) =>{
     toast.error('Thất bại');
    })
    .finally(()=>{
        setIsLoading(false);
    })
  }
  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen()
  },[registerModal, loginModal]);
  const bodyContent =(
    <div className='flex flex-col gap-4'>
        <Heading  
        title="Chào mừng bạn đến với Gocar"
        subtitle="Tạo tài khoản"
        />
        <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/>
        <Input id="ten" label="Tên đăng nhập" disabled={isLoading} register={register} errors={errors} required/>
        <Input id="soDienThoai" label="Số điện thoại" disabled={isLoading} register={register} errors={errors} required/>
        <Input id="password" type="password" label="Mật khẩu" disabled={isLoading} register={register} errors={errors} required/>
    </div>
  );
  const footerContent =(
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>
            Đã có tài khoản rồi?
          </div>
          <div onClick={toggle}
          className='text-neutral-800 cursor-pointer hover:underline' > 
            Đăng nhập
          </div>
        </div>
      </div>
    </div>
  )
    return(
        <Modal 
            disabled= {isLoading}
            isOpen= {registerModal.isOpen}
            title="Đăng kí"
            actionLable="Đăng kí"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}
export default RegisterModal
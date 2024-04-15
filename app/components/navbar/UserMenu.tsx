'use client';

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";
import { SUsers } from "@/app/types";
interface UserMenuProps{
    currentUser?: SUsers | null
}
const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) =>{
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal()
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() =>{
        setIsOpen((value) => !value);
    }, []);

    return(
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer" >
                    Gocar 4everywhere
                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src= {currentUser?.anh}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                    {currentUser ? (
    <>
        {currentUser.email === 'manager@gmail.com' ? (
            <>
                <div className="px-4 py-3 font-semibold cursor-default"> Xin chào quản lý </div>
                <MenuItem onClick={() => router.push("/qlyxethue")} label="Xe được đặt" />
                <MenuItem onClick={() => router.push("/xecuatoi")} label="Xe của tôi" />
                <MenuItem onClick={() => router.push("/qlynguoidung")} label="Quản lý người dùng" />
                <MenuItem onClick={() => router.push("/danhgia")} label="Đánh giá" />
                <MenuItem onClick={rentModal.onOpen} label="Thêm xe" />
                <MenuItem onClick={() => {}} label="Gocar 4everywhere" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Đăng xuất" />
            </>
        ) : currentUser.email?.includes('employee') ? (
            <>
                <div className="px-4 py-3 font-semibold cursor-default"> Xin chào nhân viên </div>
                <MenuItem onClick={() => router.push("/thanhtoan")} label="Quản lý thanh toán" />
                <MenuItem onClick={() => router.push("/danhgia")} label="Đánh giá" />
                <MenuItem onClick={() => {}} label="Gocar 4everywhere" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Đăng xuất" />
            </>
        ) : (
            <>
                <div className="px-4 py-3 font-semibold cursor-default">Xin chào {currentUser.ten} </div>
                <MenuItem onClick={() => router.push("/thue")} label="Xe thuê" />
                <MenuItem onClick={() => router.push("/yeuthich")} label="Yêu thích" />
                <MenuItem onClick={() => router.push("/danhgia")} label="Đánh giá" />
                <MenuItem onClick={() => {}} label="Gocar 4everywhere" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Đăng xuất" />
            </>
        )}
    </>
) : (
    <>
        <MenuItem onClick={loginModal.onOpen} label="Đăng nhập" />
        <MenuItem onClick={registerModal.onOpen} label="Đăng kí" />
    </>
)}

                    </div>
                </div>
            )}
        </div>
    );
}
export default UserMenu;
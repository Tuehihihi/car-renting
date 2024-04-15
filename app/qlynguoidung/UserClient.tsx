'use client';
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import { SUsers } from "../types";
import Image from "next/image";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
interface UserClientProps{
    data: SUsers,
    onAction?: (id:string) => void;
    disabled?: boolean;
    actionLable?: string;
    actionId?: string;
    currentUser?: SUsers | null
}
const UserClient: React.FC<UserClientProps> = ({
    data,
    onAction,
    disabled,
    actionId = "",
    actionLable,
    currentUser
}) => {
    const router = useRouter();
    
        const [deletingId, setDeletingId] = useState('');
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/users/${id}`)
        .then(() =>{
            toast.success("Xóa người dùng");
            router.refresh()
        })
        .catch(() => {
            toast.error('Hỏng');
        })
        .finally(()=>{
            setDeletingId('');
        })
    },[router]);

    return(
        <div className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image 
                        height="100"
                        width="100"
                        alt="user"
                        src="/images/placeholder.jpg"
                        className="object-cover h-full w-full group-hover:scale-110"
                    />
                </div>
                <div className="font-semibold text-lg">
                    {data.ten}
                </div>
                <div className="font-light text-neutral-500">
                    {data.email}
                </div>
                <div className="flex flex-row items-center gap-1">
                    {data.soDienThoai}
                </div>
                <Button 
                    outline
                    small
                    label="Xóa người dùng"
                    onClick={() => onCancel(data.id)}
                />
            </div>
        </div>
    )
}
export default UserClient
'use client'
import { useRouter } from "next/navigation";
import { SDanhGia, SUsers } from "@/app/types";
import { useCallback, useState } from "react";

import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";

interface CommentInputProps{
    danhGias: SDanhGia,
    currentUser: SUsers | null, 
    disabled?: boolean;
}
const CommentInput: React.FC<CommentInputProps> = ({
    danhGias,
    currentUser,
    disabled,
}) => {
    const loginModal = useLoginModal()
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [binhLuan,setBinhLuan] = useState('');

    const onCreateComment = useCallback(() =>{
        if(!currentUser){
            return loginModal.onOpen();
        }

        setIsLoading(true);
        axios.post('/api/comments', {
            binhLuan,
            danhGiaId: danhGias?.id
        })
        .then(()=> {
            toast.success('Gửi đánh giá');
            setBinhLuan('');
            router.refresh();
        })
        .catch(() => {
            toast.error('Hỏng');
        })
        .finally(() =>{
            setIsLoading(false);
        })
    },[binhLuan, danhGias.id, loginModal])
    return(
       
            <div className="max-w-screen mx-auto">
                <div className="flex flex-row">
                    <input id="binhLuan" placeholder="Hãy cho chúng tôi biết bạn nghĩ gì..." 
                    className="peer w-full p-5 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed" 
                    onChange={(event) => setBinhLuan(event.target.value)}
                    style={{ flex: 9 }}
                    />
                    <div style={{ flex: 1}} className="h-peer w-full p-5">
                    <Button 
                        onClick={onCreateComment}
                        label="Gửi"
                        
                        disable ={disabled}
                    />
                    </div>
                </div>
            </div> 
            
       
    );
}
export default CommentInput;
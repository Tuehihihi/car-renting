import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from "react-hot-toast";
import { SUsers } from '../types';
import useLoginModal from './useLoginModal';

interface IUseFavorite {
    xeId: string;
    currentUser?: SUsers | null
}

const useFavorite = ({
    xeId,
    currentUser
}: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.ids_YeuThich || [];
        
        return list.includes(xeId)
    }, [currentUser,xeId]);

    const toggleFavorite = useCallback(async(
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if(!currentUser){
            return loginModal.onOpen();
        }
        try{
            let request;

            if(hasFavorited) {
                request = () => axios.delete(`/api/favorites/${xeId}`);
            }
            else {
                request = () => axios.post(`api/favorites/${xeId}`);
            }

            await request();
            router.refresh();
            toast.success('Thành công');

        }catch(error){
            toast.error('Hỏng!');
        }
    },[
        currentUser,
        hasFavorited,
        xeId,
        loginModal,
        router
    ]);

    return{
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;
'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SUsers} from "../types";
import useFavorite from "../hooks/useFavorite";


interface HeartButtonProps {
    xeId: string;
    currentUser?: SUsers | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
    xeId,
    currentUser
}) => {
    const { hasFavorited,toggleFavorite } = useFavorite({
        xeId,
        currentUser
    })
    return (
        <div  onClick = {toggleFavorite}
         className="relative hover:opacity-80 transition cursor-pointer">
            <AiOutlineHeart
            size={24}
            className="fill-white  absolute -top-[2px] -right-[2px]" />
            <AiFillHeart size={20}
             className={hasFavorited ? 'fill-rose-500' : ' fill-neutral-500/70'} 
             />
        </div>
    )
}
export default HeartButton;
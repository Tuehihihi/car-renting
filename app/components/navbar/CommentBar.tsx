import { SDanhGia, SUsers } from "@/app/types";
import Avatar from "../Avatar";
interface CommentBarProps{
    users: SUsers 
    danhGias: SDanhGia 
}
const CommentBar: React.FC<CommentBarProps> = ({
    users,
    danhGias
}) => {
    return(
         <div className='bg-white rounded-xl border-[1px] border-neutral-100 overflow-hidden'>
                <div className="w-full bg-gray-200 rounded-lg">
                    <div className="flex flex-col gap-3">
                        <div className="mx-8 my-2 text-xl font-semibold flex flex-row items-center gap-2">
                            <Avatar src={users.anh} />
                            <div> {users.ten}</div>
                    
                        </div>
                        <div className="mx-8 flex flex-row items-center gap-1 font-light text-black pb-2">
                            <div>{danhGias.binhLuan}</div>
                            <hr />
                    
                        </div>
                    </div>
                </div>
                </div>
    )
}
export default CommentBar;
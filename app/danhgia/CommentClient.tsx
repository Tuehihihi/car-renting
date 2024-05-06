'use client'
import { SDanhGia, SUsers } from "@/app/types";
import Container from "../components/Container";

import CommentInput from "../components/inputs/CommentInput";
import Heading from "../components/Heading";
import CommentBar from "../components/navbar/CommentBar";
interface CommentClientProps{
    danhGias: SDanhGia[],
    currentUser: SUsers | null, 
    disabled?: boolean;
}
const CommentClient: React.FC<CommentClientProps> = ({
    danhGias = [],
    currentUser,
    disabled,
}) => {
    const check = currentUser && (currentUser.email === 'manager@gmail.com' || currentUser.email?.includes('employee'));
    return( 
      <Container>
        {check ? (
        <Heading 
        title="Đánh giá"
        subtitle="Sau đây là đánh giá của khách hàng"
        />
    ): (
        <Heading 
        title="Bình luận"
        subtitle="Hãy đánh giá dịch vụ của chúng tôi"
        />
    )}

        <CommentInput 
        currentUser={currentUser}
        disabled={disabled} 
            />
        
        <div className="mt-6 flex flex-col w-full gap-4">
        {danhGias?.map((danhGia) => {
            return(
                <CommentBar 
                    danhGias = {danhGia}
                    users = {danhGia.users}
                />
               
            )
        })}

        </div>
      </Container>
    );
}
export default CommentClient
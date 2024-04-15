'use client';

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";


interface EmptyState {
    title?: string;
    subtitle?: string;
    showReset?:boolean
}
const EmptyState: React.FC<EmptyState> =({
    title= "Không tìm thấy dữ liệu",
    subtitle= "Thử tìm cái khác xem",
    showReset
}) => {
    const router = useRouter();
    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Heading 
                center
                title={title}
                subtitle={subtitle}
            />
            <div className="mt-2 w-36">
                {showReset && (
                    <Button 
                        outline
                        label="Bỏ"
                        onClick={() => router.push('/')}
                    />
                )}
            </div>
        </div>
    )
}
export default EmptyState
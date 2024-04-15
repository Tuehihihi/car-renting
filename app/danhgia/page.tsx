import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import CommentClient from "./CommentClient";
import getComments from "../actions/getComments";
const CommentPage = async() =>{
    const currentUser= await getCurrentUser();
    if(!currentUser) {
        return(
            <ClientOnly>
                <EmptyState
                    title="Chưa đăng nhập"
                    subtitle="Đăng nhập ngay"
                />
            </ClientOnly>
        );
    }

    const danhGias = await getComments();


    return(
        <ClientOnly>
            <CommentClient
                danhGias={danhGias}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
};
export default CommentPage;
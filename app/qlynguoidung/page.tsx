import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import Container from "../components/Container";
import getUser from "../actions/getUser";
import UserClient from "./UserClient";
const UserManage = async() =>{
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

    const users = await getUser();

    if(users.length === 0){
        return(
            <ClientOnly>
                <EmptyState 
                    title="Không có người dùng"
                    subtitle="Đừng buồn!!!"
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <Container>
                <div className="pt- grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {users.map((user: any) => {
                        if (user.email !== 'manager@gmail.com') {
                            return (
                                <UserClient 
                                    key={user.id}
                                    currentUser={currentUser}
                                    data={user}
                                />
                            );
                        } else {
                        
                            return null;
                        }
                    })}
                </div>
            </Container>
        </ClientOnly>
    )
};
export default UserManage;
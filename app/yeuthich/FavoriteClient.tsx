'use client'

import Container from "../components/Container";
import Heading from "../components/Heading";
import CarCard from "../components/cars/CarCard";
import { SUsers, SXe } from "../types";

interface FavoritesClientProps {
    xes: SXe[];
    currentUser?: SUsers | null 
}
const FavoritesClient: React.FC<FavoritesClientProps> = ({
    xes,
    currentUser
}) => {
    return (
        <Container>
            <Heading 
            title="Yêu thích"
            subtitle="Hãy cho chúng tôi biết bạn thích xe nào!"
            />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {xes.map((xe) =>(
                    <CarCard 
                        currentUser={currentUser}
                        key={xe.id}
                        data={xe}
                        users={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}
export default FavoritesClient
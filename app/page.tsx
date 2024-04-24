import getCars, { ICarsParams } from "./actions/getCars";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import CarCard from "./components/cars/CarCard";
import EmptyState from "./components/EmptyState";
import getCurrentUser from "./actions/getCurrentUser";
interface HomeProps{
  searchParams: ICarsParams
}
const Home = async({searchParams}: HomeProps) => {
  const isEmpty = true;
  const xes = await getCars(searchParams);
  const currentUser = await getCurrentUser();
  if(xes.length === 0) {
    return(
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {xes.map((xe) =>{
            return(
              <CarCard 
               key = {xe.id}
               data = {xe}
               currentUser={currentUser}
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
export default Home

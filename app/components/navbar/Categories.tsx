'use client';

import { TbMountain } from "react-icons/tb";
import Container  from "../Container";
import {  GiForestCamp, GiPathDistance } from "react-icons/gi";
import { MdHandshake, MdOutlineFamilyRestroom, MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaLeaf } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { FaPerson } from "react-icons/fa6";
import { LuHeart } from "react-icons/lu";
export const categories = [
    {
        label: 'Solo',
        icon: FaPerson,
        description: 'Phù hợp với chuyến du lịch một mình'
    },
    { 
        label: 'Family',
        icon: MdOutlineFamilyRestroom,
        description: 'Phù hợp với du lịch cùng gia đình'
    },
    {
        label: 'Distance',
        icon: GiPathDistance,
        description: 'Phù hợp với đi du lịch đường dài'
    },
    {
      label: 'Mountain',
      icon: TbMountain,
      description: 'Phù hợp đi du lịch trên núi'
  },
  {
    label: 'Ecotourism',
    icon: FaLeaf,
    description: 'Trải nghiệm du lịch xanh'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'Phù hợp cho du lịch dã ngoại'
  },
  {
    label: 'Bussiness',
    icon: MdHandshake,
    description: 'Phù hợp với chuyến du lịch kết hợp công việc'
  },
  {
    label: 'Luxury',
    icon: IoDiamond,
    description: 'Bạn muốn flexing với bạn bè'
  },
  {
    label: 'Wedding',
    icon: LuHeart,
    description: 'Phù hợp tổ chức đám cưới'
  },
  
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('phanLoai');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if(!isMainPage){
    return null;
  }
    return (
      <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
           {categories.map((item)=> (
            <CategoryBox
                key = {item.label}
                label = {item.label}
                selected = {category === item.label}
                icon = {item.icon}
                />
           ))}
        </div>
      </Container>
    );
}
export default Categories;
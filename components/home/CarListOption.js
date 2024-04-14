"use Client"
import React, { useState } from "react";
import { CarListData } from "/utils/CarListData";
import CarListItem from "./CarListItem";
import { useRouter } from "next/navigation";
const CarListOption = ({distance}) => {
  const [activeIndex,setActiveIndex] = useState()
  const [selectedCar,setSelectedCar] = useState([]);
  const router = useRouter()
  return (
    <div className="p-5 mt-5 overflow-auto h-[280px]">
      <h2 className="text-[22px] font-bold">Recommeded</h2>
      {CarListData.map((item,index) => (
        <div key={index} className={`cursor-pointer p-2 px-4 rounded-lg border-black ${activeIndex == index? 'border-[2px]':null}`} onClick={()=>{setActiveIndex(index); setSelectedCar(item)}}>
          <CarListItem car={item} distance={distance}/>
        </div>
      ))}
      {selectedCar?.name ?<div className="flex justify-between fixed w-full md:w-[30%] shadow-xl p-3 bottom-5 bg-white border-[1px] items-center rounded-lg">
        <h2>Make Payment For</h2>
        <button className="p-3 bg-black text-white rounded-lg text-center" onClick={()=>router.push('/payment?amount='+(selectedCar.amount * distance).toFixed(2))}>Request {selectedCar.name}</button>
      </div>:null}
    </div>
  );
};

export default CarListOption;

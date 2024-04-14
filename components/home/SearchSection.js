"use client";
import React, { useContext, useEffect, useState } from "react";
import InputItem from "./InputItem";
import { SourceContext } from "/context/SourceContext";
import { DestinationContext } from "/context/DestinationContext";
import CarListOption from "./CarListOption";

const SearchSection = () => {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [distance, setDistance] = useState();
  // useEffect(()=>{
  //   if(source){
  //     console.log(source);
  //   }
  //   if(destination){
  //     console.log(destination);
  //   }
  // },[source,destination]);
  const calculateDistance = () => {
    const dist = google.maps.geometry.spherical.computeDistanceBetween(
      { lat: source.lat, lng: source.lng },
      { lat: destination.lat, lng: destination.lng }
    );
    // console.log(dist*0.000621374);
    setDistance(dist * 0.000621374);
  };
  return (
    <div>
      <div className="border-[2px] rounded-xl p-2 md:p-6 ">
        <p className="text-[25px] font-bold">Get a ride</p>
        <InputItem type="source" />
        <InputItem type="destination" />
        <button
          className="bg-black mt-5 p-3 text-white w-full text-[22px] rounded-xl"
          onClick={() => calculateDistance()}
        >
          Search
        </button>
      </div>
      {distance ? <CarListOption  distance={distance}/> : null}
    </div>
  );
};

export default SearchSection;

"use client";
import GoogleMapSection from "../components/home/GoogleMapSection";
import SearchSection from "../components/home/SearchSection";
import { DestinationContext } from "../context/DestinationContext";
import { SourceContext } from "../context/SourceContext";
import { LoadScript } from "@react-google-maps/api";
import React, { useState } from "react";

const Page = () => {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript
        libraries={['places']} 
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <SearchSection />
            </div>
            <div className="col-span-2">
              <GoogleMapSection />
            </div>
          </div>
        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
};

export default Page;

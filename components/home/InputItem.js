"use client";
import { DestinationContext } from "/context/DestinationContext";
import { SourceContext } from "/context/SourceContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const InputItem = ({ type }) => {
  const [value, setValue] = useState(null);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const getLatandLang = (place, type) => {
    if (!place || !place.value) {
      // Handle the case where place or place.value is null
      return;
    }
    const placeId = place.value.place_id;
    // console.log(placeId);
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId }, (place, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        place.geometry &&
        place.geometry.location
      ) {
        console.log(place.geometry.location.lat());
        if (type === "source") {
          setSource({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        } else {
          setDestination({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        }
      } else {
        console.error("Error fetching place details:", status);
      }
    });
  };
  return (
    <div className="bg-slate-300 mt-6 rounded-lg p-4  flex items-center gap-5">
      <Image
        src={type === "source" ? "/source.png" : "/destination.png"}
        width={24}
        height={24}
        alt="logo"
      />
      {/* <input type='text' placeholder={type === 'source'?'Pickup Location':'Destination Location'} className='bg-transparent w-full outline-none'/> */}
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: (place) => {
            getLatandLang(place, type);
            setValue(place);
          },
          placeholder:
            type === "source" ? "Pickup Location" : "Destination Location",
          isClearable: true,
          className: "w-full",
          components: {
            DropdownIndicator: false,
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
              border: "none",
            }),
          },
        }}
      />
    </div>
  );
};

export default InputItem;

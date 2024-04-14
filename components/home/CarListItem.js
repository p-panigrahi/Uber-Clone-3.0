import Image from "next/image";
import React from "react";
import { TiUser } from "react-icons/ti";
const CarListItem = ({ car , distance}) => {
  return (
    <div>
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center gap-3">
          <Image src={car.image} width={100} height={100} />
          <div>
            <h2 className="text-[18px] font-semibold flex items-center gap-3">{car.name}
            <span className="flex items-center gap-3">
              <TiUser/>{car.seat}
            </span>
            </h2>
            <p>{car.desc}</p>
          </div>
        </div>

        <h2 className="text-[18px] font-semibold">
          ${(car.amount * distance).toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

export default CarListItem;

import { useState } from "react";
import { trpc } from "../utils/trpc";

interface DeskProps {
  deskId: number;
  selectedDate: string;
  userId: string;
  userName: string;
}

const ConferenceRoom: React.FC<DeskProps> = ({ deskId, selectedDate }) => {
  const { data: reservations } = trpc.getReservations.useQuery();
  const reservation = reservations?.find(
    (res) => res.deskId === deskId && res.dateFrom.startsWith(selectedDate)
  );

  console.warn(reservation);

  const [selectedDesk, setSelectedDesk] = useState<number>();

  const handleDeskClick = (deskNumber: number) => {
    setSelectedDesk(deskNumber);
  };

  return (
    <div className="relative bg-black h-screen flex flex-col items-center justify-between pt-20">
      <div className="absolute right-10 top-20 bg-blue-500 w-5 h-48 rounded-full text-white text-xs flex justify-center items-center">
        <span className="rotate-90">window</span>
      </div>
      <div className="absolute right-10 top-80 bg-blue-500 w-5 h-48 rounded-full text-white text-xs flex justify-center items-center">
        <span className="rotate-90">window</span>
      </div>

      <div className="absolute bottom-10 left-10 bg-blue-500 w-5 h-48 rounded-full text-white text-xs flex justify-center items-center">
        <span className="rotate-90">doors</span>
      </div>

      <div className="flex flex-col gap-12 w-full items-end mr-36">
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => {
            const deskNumber = index + 1;
            return (
              <div
                key={deskNumber}
                onClick={() => handleDeskClick(deskNumber)}
                className={`shadow-xl rounded-lg transform transition-all cursor-pointer w-48 hover:scale-105 h-24 bg-yellow-700 rounded-lg flex justify-center items-center text-white text-lg ${
                  selectedDesk === deskNumber ? "bg-blue-500" : ""
                }`}
              >
                {deskNumber}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => {
            const deskNumber = index + 1;
            return (
              <div
                key={deskNumber}
                onClick={() => handleDeskClick(deskNumber)}
                className={`cursor-pointer w-48 h-24 bg-yellow-700 rounded-lg flex justify-center items-center text-white text-lg ${
                  selectedDesk === deskNumber ? "bg-blue-500" : ""
                }`}
              >
                {deskNumber}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => {
            const deskNumber = index + 1;
            return (
              <div
                key={deskNumber}
                onClick={() => handleDeskClick(deskNumber)}
                className={`cursor-pointer w-48 h-24 bg-yellow-700 rounded-lg flex justify-center items-center text-white text-lg ${
                  selectedDesk === deskNumber ? "bg-blue-500" : ""
                }`}
              >
                {deskNumber}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => {
            const deskNumber = index + 1;
            return (
              <div
                key={deskNumber}
                onClick={() => handleDeskClick(deskNumber)}
                className={`cursor-pointer w-48 h-24 bg-yellow-700 rounded-lg flex justify-center items-center text-white text-lg ${
                  selectedDesk === deskNumber ? "bg-blue-500" : ""
                }`}
              >
                {deskNumber}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConferenceRoom;

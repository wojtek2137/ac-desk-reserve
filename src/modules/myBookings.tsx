import React from "react";
import { useSession } from "next-auth/react";
import { RemoveIcon } from "@/Icons/RemoveIcon";
import { PinIcon } from "@/Icons/PinIcon";
import { CalendarIcon } from "@/Icons/CalendarIcon";

export interface Reservation {
  userId: string;
  id: number;
  deskId: number;
  dateFrom: string;
  dateTo: string;
  userName: string;
}

interface MyBookingsProps {
  reservations: Reservation[] | undefined;
  onRemove: (deskId: number, dateFrom: string) => void;
}

const MyBookings = ({ reservations, onRemove }: MyBookingsProps) => {
  const { data: session } = useSession();
  const userId = session?.user?.email || "";

  console.warn(reservations);
  const test = [
    {
      userId: "string",
      id: 1,
      deskId: 1,
      dateFrom: "2020-10-10",
      dateTo: "2020-10-10",
      userName: "tring",
    },
    {
      userId: "string",
      id: 2,
      deskId: 2,
      dateFrom: "2020-10-10",
      dateTo: "2020-10-10",
      userName: "tring",
    },
    {
      userId: "string",
      id: 3,
      deskId: 3,
      dateFrom: "2020-10-10",
      dateTo: "2020-10-10",
      userName: "tring",
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-black border-b-2">
          My Reservations
        </h2>
        <div className="flex gap-2 text-black">
          <PinIcon />
          <p>Brain Park Fabryczna 1, 31-553 Kraków</p>
        </div>
      </div>
      {test?.filter((reservation) => reservation.userId === userId).length === 0 ? (
        <p className="text-black w-full mt-5 flex gap-2 items-center ml-1">
          <CalendarIcon /> You don`t have any reservations yet
        </p>
      ) : (
        <ul className="flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="flex flex-col gap-2 mt-10">
            {test?.map((reservation) => {
              const {
                deskId,
                id,
                dateFrom,
                userId: reservationUserId,
              } = reservation;
              const formattedDate = new Date(dateFrom)
                .toISOString()
                .split("T")[0];

              if (userId === reservationUserId) {
                return (
                  <li
                    key={id}
                    className="p-2 flex text-black justify-between items-center border rounded shadow-xl hover:bg-gray-100 transition-colors bg-white cursor-pointer text-gray-900 font-medium"
                  >
                    <div>
                      <span className="font-semibold">When: </span>
                      <span>{formattedDate}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Desk: </span>
                      <span>{deskId}</span>
                    </div>
                    <button onClick={() => onRemove(deskId, dateFrom)}>
                      <RemoveIcon />
                    </button>
                  </li>
                );
              }

              return null;
            })}
          </div>
        </ul>
      )}
    </>
  );
};

export default MyBookings;

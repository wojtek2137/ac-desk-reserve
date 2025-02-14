import React from "react";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { RemoveIcon } from "@/Icons/RemoveIcon";
import { PinIcon } from "@/Icons/PinIcon";

const MyBookings = () => {
  const { data: reservations, refetch } = trpc.getReservations.useQuery();
  const { data: session } = useSession();
  const userId = session?.user?.email || '';

  const removeReservation = trpc.removeReservation.useMutation({
    onSuccess: () => refetch(),
  });
  
  const handleRelease = (deskId: number, dateFrom: string) => {
    removeReservation.mutate({ deskId, dateFrom });
  };


  return (
    <>
        <h2 className="text-2xl font-bold text-black">My Reservations</h2>
        <div className="flex gap-2 text-black">
            <PinIcon />
            <p>Brain Park Fabryczna 1, 31-553 Kraków</p>
        </div>
      {/* TODO Remove if needed */}
      {/* <button
        onClick={resetToToday}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
      >
        Reset to Today
      </button> */}
        {reservations?.filter(reservation => reservation.userId === userId).length === 0 ? (
          <p className="text-black w-full mt-38">You don`t have any reservation yet</p>
        ) : (
            <ul className="flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {reservations?.map((reservation) => {
          const { deskId, id, dateFrom, userId: reservationUserId } = reservation;
          const formattedDate = new Date(dateFrom).toISOString().split('T')[0];
          
          if (userId === reservationUserId) {
          
          return (
            <li key={id}
            className="p-2 flex text-black justify-between items-center border rounded shadow-sm hover:bg-gray-100 transition-colors bg-white cursor-pointer text-gray-900 font-medium"
            >
             <div>
                <span className="font-semibold">When: </span>
                <span>{formattedDate}</span>
              </div>
              <div>
                <span className="font-semibold">Desk: </span>
                <span>{deskId}</span>
              </div>
              <button
                onClick={() => handleRelease(deskId, dateFrom)}
              >
                <RemoveIcon />
              </button>
            </li>
          );
        }

        return null;
        })}
      </ul>)}
    </>
  );
};

export default MyBookings;
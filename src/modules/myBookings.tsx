import React from 'react';
import { useSession } from 'next-auth/react';
import { PinIcon } from '@/Icons/PinIcon';
import { trpc } from '@/utils/trpc';
import ReservationRow from './ReservationRow';
import { CalendarIcon } from '@/Icons/CalendarIcon';

const MyBookings = () => {
  const { data: session } = useSession();
  const userId = session?.user?.email || '';
  const { data: reservations} = trpc.getReservations.useQuery();

  return (
    <>
      <h2 className='text-2xl font-bold text-black border-b-2'>My Reservations</h2>
      <div className='flex gap-2 text-black mt-4'>
        <PinIcon />
        <p>Brain Park Fabryczna 1, 31-553 Kraków</p>
      </div>
      {reservations?.filter((reservation) => reservation.userId === userId)
        .length === 0 ? (
          <p className="text-black w-full mt-5 flex gap-2 items-center ml-1">
          <CalendarIcon /> You don`t have any reservations yet
        </p>
      ) : (
        <ul className='flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto'>
          <div className="flex flex-col gap-2 mt-10">
          {reservations?.map((reservation) => {
            if (userId === reservation.userId) {
              return (
                <ReservationRow
                  key={reservation.id}
                  reservation={reservation}
                />
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

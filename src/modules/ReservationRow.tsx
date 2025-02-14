import React from 'react';
import { trpc } from '@/utils/trpc';

import { Spinner } from '@/components/Spinner';
import { RemoveIcon } from '@/Icons/RemoveIcon';

export interface ReservationType {
  userId: string;
  id: number;
  deskId: number;
  dateFrom: string;
  dateTo: string;
  userName: string;
}
interface ReservationRowProps {
    reservation: ReservationType;
}

const ReservationRow = ({ reservation }: ReservationRowProps) => {
  const { deskId, id, dateFrom } = reservation;
  const formattedDate = new Date(dateFrom).toISOString().split('T')[0];
    const { refetch } = trpc.getReservations.useQuery();

  const removeReservation = trpc.removeReservation.useMutation({
    onSuccess: () => refetch(),
  });

  const handleRelease = (deskId: number, dateFrom: string) => {
    removeReservation.mutate({ deskId, dateFrom });
  };

  return (
    <li
      key={id}
      className='p-2 flex text-black justify-between items-center border rounded shadow-xl hover:bg-gray-100 transition-colors bg-white cursor-pointer font-medium'
    >
      <div>
        <span className='font-semibold'>When: </span>
        <span>{formattedDate}</span>
      </div>
      <div>
        <span className='font-semibold'>Desk: </span>
        <span>{deskId}</span>
      </div>
      <button onClick={() => handleRelease(deskId, dateFrom)} className='flex items-center justify-center'>
        {removeReservation.status === 'pending' ? <Spinner /> : <RemoveIcon />}
      </button>
    </li>
  );
};

export default ReservationRow;

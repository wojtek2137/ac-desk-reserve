import React, { useState } from 'react';
import { addDays, getShortFormattedDate } from '@/utils/date';
import { trpc } from '@/utils/trpc';
import Desk from '@/components/Desk';
import Sidebar from '@/components/Sidebar';
import DatePicker from '@/components/DatePicker';
import MyBookings from './myBookings';
import RoomWindows from '@/components/RoomWindows';
import { Spinner } from '@/components/Spinner';

interface BookingProps {
  userId: string;
}

const Booking = ({ userId }: BookingProps) => {
  const [active, setActive] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    getShortFormattedDate(new Date())
  );
  const { data: desks } = trpc.getDesks.useQuery();
  const { refetch: refetchReservations, isLoading } =
    trpc.getReservations.useQuery();

  const setSelectedDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    refetchReservations();
  };

  const changeDateByDay = (step: number) => {
    const newDate = addDays(new Date(selectedDate), step);
    setSelectedDate(getShortFormattedDate(newDate));
    refetchReservations();
  };

  return (
    <div className='p-4 relative grid grid-flow-col gap-3 mt-[90px]'>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen text-[#3b82f6]'>
          <Spinner size={64} />
        </div>
      ) : (
        <div className='col-span-4 h-full flex flex-col items-center justify-between relative'>
          <RoomWindows />
          <div className='flex flex-col w-full items-end mr-36'>
            <div className='grid grid-cols-4 gap-4'>
              {desks?.map((deskId) => (
                <Desk
                  key={deskId}
                  deskId={deskId}
                  selectedDate={selectedDate}
                  userId={userId}
                  onCheckIn={() => setActive(true)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <Sidebar onClick={() => setActive((prev) => !prev)} isActive={active}>
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDateHandler={setSelectedDateHandler}
          incrementalDateChangeHandler={changeDateByDay}
        />
        <MyBookings />
      </Sidebar>
    </div>
  );
};

export default Booking;

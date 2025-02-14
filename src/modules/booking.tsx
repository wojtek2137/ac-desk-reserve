import React, { useState } from "react";
import { trpc } from "@/utils/trpc";
import NewDesk from "@/components/NewDesk";
import Sidebar from "@/components/Sidebar";
import DatePicker from "@/components/DatePicker";
import MyBookings from "./myBookings";
import RoomWindows from "@/components/RoomWindows";

interface BookingProps {
  userId: string;
}

const Booking = ({ userId }: BookingProps) => {
  const [active, setActive] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { data: desks } = trpc.getDesks.useQuery();
  const { refetch: refetchReservations } = trpc.getReservations.useQuery();

  const setSelectedDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    refetchReservations();
  };

  const { data: reservations, refetch } = trpc.getReservations.useQuery();

  const removeReservation = trpc.removeReservation.useMutation({
    onSuccess: () => refetch(),
  });

  const handleRelease = (deskId: number, dateFrom: string) => {
    removeReservation.mutate({ deskId, dateFrom });
  };

  return (
    <div className="p-4 relative grid grid-flow-col gap-3 mt-[90px]">
      <div className="col-span-4 h-full flex flex-col items-center justify-between relative">
        <RoomWindows />
        <div className="flex flex-col w-full items-end mr-36">
          <div className="grid grid-cols-4 gap-4">
            {desks?.map((deskId) => (
              <NewDesk
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
      <Sidebar onClick={() => setActive((prev) => !prev)} isActive={active}>
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDateHandler={setSelectedDateHandler}
        />
        <MyBookings reservations={reservations} onRemove={handleRelease} />
      </Sidebar>
    </div>
  );
};

export default Booking;
